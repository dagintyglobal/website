"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import whitepaperSource from "../content/whitepaper-full.json";

type View = "calculator" | "whitepaper";
type Inputs = {
  headcount: number;
  revenue: number;
  evmultiple: number;
  aro: number;
  err: number;
  humanfrac: number;
  brokerfrac: number;
  participation: number;
  benefitsStipend: number;
};

type Block = {
  type: string;
  title?: string;
  eyebrow?: string;
  text?: string;
  content?: string[];
  items?: Array<{ title?: string; text?: string } | string>;
  columns?: string[];
  rows?: string[][];
  lines?: string[];
};

type Whitepaper = {
  title: string;
  subtitle: string;
  deck: string;
  publisher: string;
  date: string;
  sections: Array<{
    id: string;
    number: string;
    title: string;
    lead: string;
    blocks: Block[];
  }>;
  references: Array<{ n: number; label: string; url: string }>;
};

const whitepaper = whitepaperSource as Whitepaper;
const referenceByNumber = new Map(whitepaper.references.map((reference) => [reference.n, reference]));
const COST_PER_EMPLOYEE = 160;
const DEFAULTS: Inputs = {
  headcount: 100,
  revenue: 20_000_000,
  evmultiple: 1.5,
  aro: 50,
  err: 19,
  humanfrac: 60,
  brokerfrac: 30,
  participation: 25,
  benefitsStipend: 0,
};

const fields: Array<{
  key: keyof Inputs;
  label: string;
  min: number;
  max: number;
  step: number;
  hint: string;
  tooltip: string;
  format: (value: number) => string;
}> = [
  { key: "headcount", label: "Headcount", min: 50, max: 500, step: 1, hint: "Range: 50-500 employees", tooltip: "Number of employees covered by the program. Platform cost is calculated at $160 per employee annually.", format: (v) => Math.round(v).toLocaleString("en-US") },
  { key: "revenue", label: "Annual revenue", min: 5_000_000, max: 100_000_000, step: 500_000, hint: "Range: $5M-$100M", tooltip: "The organization’s annual revenue, used with the enterprise value multiple to estimate enterprise value.", format: (v) => fmtUSD(v) },
  { key: "evmultiple", label: "Enterprise value multiple", min: 0.5, max: 5, step: 0.1, hint: "Range: 0.5x-5x revenue", tooltip: "The revenue multiple used to estimate enterprise value based on the organization’s industry and financial profile. This is the value potentially lost due to bankruptcy when a breach is involved.", format: (v) => `${v.toFixed(1)}×` },
  { key: "aro", label: "Annual Rate of Occurrence", min: 5, max: 95, step: 1, hint: "Range: 5%-95%", tooltip: "The estimated annual probability of a material cyber event occurring.", format: (v) => `${v.toFixed(1)}%` },
  { key: "err", label: "Existential Risk Rate", min: 1, max: 99, step: 1, hint: "Range: 1%-99%", tooltip: "The probability that the organization suffers a breach that contributes to bankruptcy. This does not mean the breach causes the bankruptcy, and the model does not estimate a degree of responsibility.", format: (v) => `${v.toFixed(1)}%` },
  { key: "humanfrac", label: "Human-element fraction", min: 5, max: 95, step: 1, hint: "Range: 5%-95%", tooltip: "The estimated share of cyber incidents involving human actions, decisions, or exposure.", format: (v) => `${v.toFixed(1)}%` },
  { key: "brokerfrac", label: "Broker-data contribution", min: 10, max: 90, step: 1, hint: "Range: 10%-90%", tooltip: "The estimated portion of human-driven risk enabled by exposed, brokered, or publicly available personal data.", format: (v) => `${v.toFixed(1)}%` },
  { key: "participation", label: "Employee participation", min: 0, max: 100, step: 1, hint: "Range: 0%-100%", tooltip: "The percentage of employees actively participating in data wellness. Greater participation increases modeled risk reduction.", format: (v) => `${v.toFixed(1)}%` },
];

function CalculatorTooltip({ id, label, text, open, onOpen, onClose }: {
  id: string;
  label: string;
  text: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const tooltipId = `${id}-tooltip`;
  return (
    <span className="calculator-tooltip" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        className="calculator-tooltip-button"
        type="button"
        aria-label={`About ${label}`}
        aria-expanded={open}
        aria-controls={tooltipId}
        onClick={onOpen}
        onFocus={onOpen}
        onBlur={onClose}
      >
        <span aria-hidden="true">i</span>
      </button>
      {open && <span className="calculator-tooltip-bubble" id={tooltipId} role="tooltip">{text}</span>}
    </span>
  );
}

function fmtUSD(value: number) {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

function fmtPercent(value: number, digits = 1) {
  return `${value.toFixed(digits)}%`;
}

type JsPdfNamespace = { jsPDF: typeof import("jspdf").jsPDF };

async function loadJsPdf() {
  const browserWindow = window as Window & { jspdf?: JsPdfNamespace };
  if (browserWindow.jspdf) return browserWindow.jspdf;

  await new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-cluzy-jspdf]');
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Unable to load the PDF generator.")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "/vendor/jspdf.umd.min.js";
    script.async = true;
    script.dataset.cluzyJspdf = "true";
    script.addEventListener("load", () => resolve(), { once: true });
    script.addEventListener("error", () => reject(new Error("Unable to load the PDF generator.")), { once: true });
    document.head.appendChild(script);
  });

  if (!browserWindow.jspdf) throw new Error("The PDF generator did not initialize.");
  return browserWindow.jspdf;
}

function calculate(inputs: Inputs, includeBenefitsStipend = false) {
  const baselineRisk = (inputs.aro / 100) * (inputs.err / 100);
  const addressableShare = (inputs.humanfrac / 100) * (inputs.brokerfrac / 100);
  const enterpriseValue = inputs.revenue * inputs.evmultiple;
  const platformCost = inputs.headcount * COST_PER_EMPLOYEE;

  const atParticipation = (participation: number) => {
    const tsri = Math.min(0.6, Math.max(0, participation / 100) * 0.6);
    const adjustedRisk = baselineRisk * (1 - tsri);
    const riskReduced = baselineRisk - adjustedRisk;
    const valueProtected = enterpriseValue * riskReduced * addressableShare;
    const stipendCost = includeBenefitsStipend
      ? inputs.headcount * Math.max(0, participation / 100) * inputs.benefitsStipend
      : 0;
    const annualCost = platformCost + stipendCost;
    const roi = annualCost ? valueProtected / annualCost : 0;
    return { participation, tsri, adjustedRisk, valueProtected, platformCost, stipendCost, annualCost, roi };
  };

  const annualCost = atParticipation(inputs.participation).annualCost;
  return { baselineRisk, addressableShare, enterpriseValue, platformCost, annualCost, atParticipation };
}

function RiskChart({ inputs, includeBenefitsStipend = false }: { inputs: Inputs; includeBenefitsStipend?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const model = useMemo(() => calculate(inputs, includeBenefitsStipend), [inputs, includeBenefitsStipend]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.round(rect.width * ratio));
      canvas.height = Math.max(1, Math.round(rect.height * ratio));
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(ratio, ratio);

      const width = rect.width;
      const height = rect.height;
      const pad = { top: 24, right: 22, bottom: 46, left: 64 };
      const plotWidth = width - pad.left - pad.right;
      const plotHeight = height - pad.top - pad.bottom;
      const points = Array.from({ length: 21 }, (_, i) => model.atParticipation(i * 5));
      const maxValue = Math.max(
        ...points.map((point) => point.valueProtected),
        ...points.map((point) => point.annualCost),
        1,
      ) * 1.08;

      ctx.clearRect(0, 0, width, height);
      ctx.font = "11px Arial";
      ctx.fillStyle = "#667074";
      ctx.strokeStyle = "#dce2e3";
      ctx.lineWidth = 1;

      for (let i = 0; i <= 4; i++) {
        const y = pad.top + (plotHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(width - pad.right, y);
        ctx.stroke();
        const value = maxValue * (1 - i / 4);
        ctx.fillText(value >= 1_000_000 ? `$${(value / 1_000_000).toFixed(1)}M` : `$${Math.round(value / 1000)}K`, 8, y + 4);
      }

      const xFor = (p: number) => pad.left + (p / 100) * plotWidth;
      const yFor = (v: number) => pad.top + plotHeight - (v / maxValue) * plotHeight;
      [0, 25, 50, 75, 100].forEach((p) => {
        ctx.fillStyle = "#667074";
        ctx.textAlign = p === 0 ? "left" : p === 100 ? "right" : "center";
        ctx.fillText(`${p}%`, xFor(p), height - 18);
      });

      ctx.beginPath();
      points.forEach((point, index) => {
        const x = xFor(point.participation);
        const y = yFor(point.valueProtected);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.lineTo(xFor(100), yFor(0));
      ctx.lineTo(xFor(0), yFor(0));
      ctx.closePath();
      const gradient = ctx.createLinearGradient(0, pad.top, 0, height - pad.bottom);
      gradient.addColorStop(0, "rgba(32, 91, 255, .28)");
      gradient.addColorStop(1, "rgba(32, 91, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      points.forEach((point, index) => {
        const x = xFor(point.participation);
        const y = yFor(point.valueProtected);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = "#205bff";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.setLineDash([7, 6]);
      ctx.beginPath();
      points.forEach((point, index) => {
        const x = xFor(point.participation);
        const y = yFor(point.annualCost);
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = "#f5c842";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.setLineDash([]);

      const current = model.atParticipation(inputs.participation);
      const cx = xFor(inputs.participation);
      const cy = yFor(current.valueProtected);
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fillStyle = "#f5c842";
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 3;
      ctx.stroke();
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [inputs, model]);

  return (
    <canvas
      ref={canvasRef}
      className="risk-chart"
      role="img"
      aria-label={`Value protected rises with participation. At ${inputs.participation}% participation the modeled value is ${fmtUSD(model.atParticipation(inputs.participation).valueProtected)}.`}
    />
  );
}

export function CalculatorChartPreview() {
  const model = calculate(DEFAULTS);
  const current = model.atParticipation(DEFAULTS.participation);

  return (
    <div className="roi-mini" aria-label={`Default calculator scenario at ${DEFAULTS.participation}% participation`}>
      <div className="roi-mini-heading">
        <div><span>VALUE PROTECTED VS. PARTICIPATION</span><h3>See how participation changes value.</h3></div>
        <b>{DEFAULTS.participation}%</b>
      </div>
      <RiskChart inputs={DEFAULTS} />
      <div className="roi-mini-metrics">
        <div><span>Value protected</span><strong>{fmtUSD(current.valueProtected)}</strong></div>
        <div><span>Modeled ROI</span><strong>{current.roi.toFixed(1)}×</strong></div>
      </div>
      <small>Illustrative SMB scenario at a minimum target participation threshold of 25% yielding nearly a 5x ROI.</small>
    </div>
  );
}

function Calculator() {
  const [inputs, setInputs] = useState(DEFAULTS);
  const [includeBenefitsStipend, setIncludeBenefitsStipend] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);
  const model = useMemo(() => calculate(inputs, includeBenefitsStipend), [inputs, includeBenefitsStipend]);
  const current = model.atParticipation(inputs.participation);
  const rows = [0, 25, 50, 75, 100].map(model.atParticipation);

  const update = (key: keyof Inputs, value: number) => {
    setInputs((previous) => ({ ...previous, [key]: value }));
  };

  const setBenefitsStipendMode = (enabled: boolean) => {
    if (!enabled) {
      setIncludeBenefitsStipend(false);
      update("benefitsStipend", 0);
      return;
    }

    setIncludeBenefitsStipend(true);
    update("benefitsStipend", 250);
  };

  useEffect(() => {
    if (!openTooltip) return;
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest(".calculator-tooltip")) return;
      setOpenTooltip(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenTooltip(null);
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [openTooltip]);

  const downloadScenario = async () => {
    setExporting(true);
    try {
      const { jsPDF } = await loadJsPdf();
      const pdf = new jsPDF({ unit: "pt", format: "letter" });
      const navy = "#102449";
      const blue = "#205bff";
      const yellow = "#f5c842";
      pdf.setFillColor(navy);
      pdf.rect(0, 0, 612, 112, "F");
      pdf.setTextColor("#ffffff");
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(19);
      pdf.setTextColor(blue);
      pdf.text("CLU", 42, 38);
      pdf.setTextColor(yellow);
      pdf.text("ZY", 82, 38);
      pdf.setFontSize(7);
      pdf.setTextColor("#ffffff");
      pdf.text("EMPLOYEE DATA WELLNESS", 42, 51);
      pdf.setFontSize(24);
      pdf.text("Expected Loss Reduction Scenario", 42, 76);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor("#b9c6de");
      pdf.text(`Generated ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`, 42, 96);

      pdf.setTextColor(navy);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.text("SCENARIO INPUTS", 42, 142);
      let y = 162;
      const scenarioInputs = [
        ...fields.map((field) => [field.label, field.format(inputs[field.key])] as const),
        ["Cost model", includeBenefitsStipend ? "Platform + benefits stipend" : "Platform only"] as const,
        ...(includeBenefitsStipend
          ? [["Benefits stipend", `${fmtUSD(inputs.benefitsStipend)} per participating employee / year`] as const]
          : []),
      ];
      scenarioInputs.forEach(([label, value], index) => {
        if (index % 2 === 0) {
          pdf.setFillColor("#f2f5f5");
          pdf.rect(40, y - 13, 532, 23, "F");
        }
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor("#596368");
        pdf.text(label, 48, y);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(navy);
        pdf.text(value, 564, y, { align: "right" });
        y += 23;
      });

      y += 20;
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.text("RESULTS", 42, y);
      y += 17;
      const results = [
        ["Baseline risk", fmtPercent(model.baselineRisk * 100)],
        ["Adjusted risk", fmtPercent(current.adjustedRisk * 100)],
        ["Company TSRI", fmtPercent(current.tsri * 100)],
        ["Value protected", fmtUSD(current.valueProtected)],
        ["Annual program cost", fmtUSD(model.annualCost)],
        ["Modeled ROI", `${current.roi.toFixed(1)}x`],
      ];
      results.forEach(([label, value], index) => {
        const col = index % 3;
        const row = Math.floor(index / 3);
        const x = 42 + col * 179;
        const boxY = y + row * 70;
        pdf.setFillColor(index === 5 ? navy : "#f2f5f5");
        pdf.roundedRect(x, boxY, 165, 56, 5, 5, "F");
        pdf.setFontSize(8);
        pdf.setTextColor(index === 5 ? "#b9c6de" : "#667074");
        pdf.text(label.toUpperCase(), x + 10, boxY + 18);
        pdf.setFontSize(17);
        pdf.setTextColor(index === 5 ? yellow : blue);
        pdf.text(value, x + 10, boxY + 43);
      });

      y += 160;
      pdf.setFontSize(9);
      pdf.setTextColor("#667074");
      pdf.setFont("helvetica", "normal");
      const disclaimer = "Illustrative model based on the Dāginty Research Lab whitepaper, Employee Data Wellness as Cybersecurity. This scenario supports discussion and is not a formal actuarial or underwriting assessment.";
      pdf.text(pdf.splitTextToSize(disclaimer, 520), 42, y);
      pdf.save(`Cluzy-ROI-${Math.round(inputs.headcount)}-employees-${Math.round(inputs.participation)}-participation.pdf`);
    } finally {
      setExporting(false);
    }
  };

  return (
    <section className="calculator" aria-labelledby="calculator-title">
      <div className="calculator-intro">
        <img className="research-brand-icon research-brand-icon--calculator" src="/brand/cluzy/neutral-yellow.svg" alt="" aria-hidden="true" />
        <div>
          <p className="eyebrow">Expected loss reduction</p>
          <h2 id="calculator-title">The Existential Risk Buy-Down Model.</h2>
        </div>
        <p>
          Adjust the assumptions. The model updates instantly and claims no value at
          zero engagement. Defaults reproduce the illustrative SMB scenario.
        </p>
      </div>

      <div className={`calculator-grid ${includeBenefitsStipend ? "is-blended-cost" : ""}`}>
        <aside className="input-panel">
          <div className="panel-heading">
            <span>MODEL YOUR SCENARIO</span>
            <button type="button" onClick={() => { setInputs(DEFAULTS); setIncludeBenefitsStipend(false); }}>Reset defaults</button>
          </div>
          {fields.map((field) => {
            const value = inputs[field.key];
            const progress = ((value - field.min) / (field.max - field.min)) * 100;
            return (
              <div className="range-field" key={field.key}>
                <div className="range-label">
                  <span className="range-label-name">
                    <label htmlFor={field.key}>{field.label}</label>
                    <CalculatorTooltip
                      id={field.key}
                      label={field.label}
                      text={field.tooltip}
                      open={openTooltip === field.key}
                      onOpen={() => setOpenTooltip(field.key)}
                      onClose={() => setOpenTooltip((current) => current === field.key ? null : current)}
                    />
                  </span>
                  <output htmlFor={field.key}>{field.format(value)}</output>
                </div>
                <input
                  id={field.key}
                  type="range"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={value}
                  style={{ "--range-progress": `${progress}%` } as React.CSSProperties}
                  onChange={(event) => update(field.key, Number(event.target.value))}
                />
                <span className="range-hint">{field.hint}</span>
              </div>
            );
          })}
          <div className="pricing-note">
            <span>PLATFORM PRICING</span>
            <strong>$160 per employee / year</strong>
            <p>The employer-funded benefits stipend is separate from platform cost.</p>
            <div className="blended-cost-model">
              <div className={`cost-model-toggle ${includeBenefitsStipend ? "is-active" : ""}`}>
                <span className="cost-model-toggle-copy">
                  <span className="cost-model-label">
                    <b>Blended cost model</b>
                    <CalculatorTooltip
                      id="blended-cost-model"
                      label="Blended cost model"
                      text="Adds the employer-funded benefits stipend to platform cost when calculating total program cost and ROI."
                      open={openTooltip === "blended-cost-model"}
                      onOpen={() => setOpenTooltip("blended-cost-model")}
                      onClose={() => setOpenTooltip((current) => current === "blended-cost-model" ? null : current)}
                    />
                  </span>
                  <small>Include the benefits stipend for participating employees.</small>
                </span>
                <input
                  className="toggle-control"
                  type="range"
                  min={0}
                  max={1}
                  step={1}
                  value={includeBenefitsStipend ? 1 : 0}
                  aria-label="Use the blended cost model"
                  aria-valuetext={includeBenefitsStipend ? "On" : "Off"}
                  onChange={(event) => setBenefitsStipendMode(event.target.value === "1")}
                />
              </div>
              {includeBenefitsStipend && (
                <div className="range-field range-field--stipend">
                  <div className="range-label">
                    <span className="range-label-name">
                      <label htmlFor="benefitsStipend">Benefits Stipend</label>
                      <CalculatorTooltip
                        id="benefits-stipend"
                        label="Benefits Stipend"
                        text="The annual employer-funded amount for each participating employee. It is included only when the blended cost model is enabled."
                        open={openTooltip === "benefits-stipend"}
                        onOpen={() => setOpenTooltip("benefits-stipend")}
                        onClose={() => setOpenTooltip((current) => current === "benefits-stipend" ? null : current)}
                      />
                    </span>
                    <output htmlFor="benefitsStipend">{fmtUSD(inputs.benefitsStipend)}</output>
                  </div>
                  <input
                    id="benefitsStipend"
                    type="range"
                    min={0}
                    max={500}
                    step={10}
                    value={inputs.benefitsStipend}
                    style={{ "--range-progress": `${inputs.benefitsStipend / 5}%` } as React.CSSProperties}
                    onChange={(event) => update("benefitsStipend", Number(event.target.value))}
                  />
                  <span className="range-hint">$0-$500 per participating employee / year</span>
                </div>
              )}
            </div>
          </div>
        </aside>

        <div className="results-panel">
          <div className="kpi-grid">
            <article><span>Baseline risk</span><strong>{fmtPercent(model.baselineRisk * 100)}</strong><p>ARO × ERR</p></article>
            <article><span>Adjusted risk</span><strong>{fmtPercent(current.adjustedRisk * 100)}</strong><p>After TSRI</p></article>
            <article><span>Company TSRI</span><strong>{fmtPercent(current.tsri * 100)}</strong><p>Threat surface reduction</p></article>
            <article><span>Value protected</span><strong>{fmtUSD(current.valueProtected)}</strong><p>Annualized estimate</p></article>
            <article><span>Annual cost</span><strong>{fmtUSD(model.annualCost)}</strong><p>{includeBenefitsStipend ? "Platform + participating stipend" : "$160 × headcount"}</p></article>
            <article className="kpi-featured"><span>Modeled ROI</span><strong>{current.roi.toFixed(1)}×</strong><p>Protected value ÷ cost</p></article>
          </div>

          <div className="chart-card">
            <div className="chart-heading">
              <div>
                <h3>Value Protected vs. Participation</h3>
                <p>Modeled across the full 0-100% engagement curve at your current inputs. Your current participation rate is highlighted.</p>
              </div>
              <div className="chart-legend"><span className="legend-value">Value protected</span><span className="legend-cost">Annual cost</span></div>
            </div>
            <RiskChart inputs={inputs} includeBenefitsStipend={includeBenefitsStipend} />
          </div>

          <div className="scenario-card">
            <div className="scenario-heading">
              <div><span>SCENARIO TABLE</span><h3>From baseline to Data Genius.</h3></div>
              <button className="button button--small button--dark" type="button" disabled={exporting} onClick={downloadScenario}>
                {exporting ? "Preparing…" : "Download scenario PDF"}
              </button>
            </div>
            <div className="table-scroll">
              <table>
                <thead><tr><th>Participation</th><th>TSRI</th><th>Adjusted risk</th><th>Value protected</th><th>Cost</th><th>ROI</th></tr></thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.participation} className={row.participation === Math.round(inputs.participation / 25) * 25 ? "is-current" : ""}>
                      <td>{fmtPercent(row.participation)}</td><td>{fmtPercent(row.tsri * 100)}</td><td>{fmtPercent(row.adjustedRisk * 100)}</td><td>{fmtUSD(row.valueProtected)}</td><td>{fmtUSD(row.annualCost)}</td><td>{row.participation ? `${row.roi.toFixed(1)}×` : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <p className="model-disclaimer">
        Illustrative scenario model based on published whitepaper assumptions. It supports
        risk discussion and is not a formal actuarial, legal, or underwriting assessment.
      </p>
    </section>
  );
}

function researchHref(view: View, homeHref: string) {
  return `/research?view=${view}&from=${encodeURIComponent(homeHref)}`;
}

function renderRichText(text: string, homeHref: string) {
  const linkText = "companion interactive ROI calculator";
  const tokenPattern = /(\[\[cite:\d+(?:,\d+)*\]\]|companion interactive ROI calculator)/g;

  return text.split(tokenPattern).map((part, index) => {
    if (part === linkText) {
      return (
        <a className="paper-inline-link" href={researchHref("calculator", homeHref)} key={`${part}-${index}`}>
          {linkText} <span aria-hidden="true">↗</span>
        </a>
      );
    }

    const citation = part.match(/^\[\[cite:(\d+(?:,\d+)*)\]\]$/);
    if (!citation) return part;

    const numbers = citation[1].split(",").map(Number);
    return (
      <sup className="paper-citation" key={`${part}-${index}`}>
        {numbers.map((number, citationIndex) => {
          const reference = referenceByNumber.get(number);
          if (!reference) return <span key={number}>{citationIndex > 0 ? "," : ""}{number}</span>;
          return (
            <span className="paper-citation-item" key={number}>
              {citationIndex > 0 && <span aria-hidden="true">,</span>}
              <a
                href={reference.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Citation ${number}: ${reference.label}`}
                title={reference.label}
              >
                {number}
              </a>
            </span>
          );
        })}
      </sup>
    );
  });
}

function renderBlock(block: Block, index: number, homeHref: string) {
  if (block.type === "paragraphs" || block.type === "subsection") {
    return (
      <div className={`paper-block ${block.type === "subsection" ? "paper-subsection" : ""}`} key={index}>
        {block.title && <h3>{block.title}</h3>}
        {block.content?.map((paragraph) => <p key={paragraph}>{renderRichText(paragraph, homeHref)}</p>)}
      </div>
    );
  }
  if (block.type === "bullets") {
    return (
      <div className="paper-block paper-bullets" key={index}>
        {block.title && <h3>{block.title}</h3>}
        <ul>{block.items?.map((item) => <li key={String(item)}>{renderRichText(String(item), homeHref)}</li>)}</ul>
      </div>
    );
  }
  if (block.type === "cards") {
    return (
      <div className="paper-block" key={index}>
        {block.title && <h3>{block.title}</h3>}
        <div className="paper-card-grid">
          {block.items?.map((item) => typeof item === "string" ? <p key={item}>{renderRichText(item, homeHref)}</p> : (
            <article key={item.title}><strong>{item.title}</strong><p>{renderRichText(item.text ?? "", homeHref)}</p></article>
          ))}
        </div>
      </div>
    );
  }
  if (block.type === "table") {
    return (
      <div className="paper-block paper-table" key={index}>
        {block.title && <h3>{block.title}</h3>}
        <div className="table-scroll">
          <table>
            <thead><tr>{block.columns?.map((column) => <th key={column}>{column}</th>)}</tr></thead>
            <tbody>{block.rows?.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{renderRichText(cell, homeHref)}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </div>
    );
  }
  if (block.type === "callout") {
    return <aside className="paper-callout" key={index}><span>{block.eyebrow}</span><h3>{block.title}</h3><p>{renderRichText(block.text ?? "", homeHref)}</p></aside>;
  }
  if (block.type === "quote") {
    return <blockquote key={index}>{renderRichText(block.text ?? "", homeHref)}</blockquote>;
  }
  if (block.type === "formula") {
    return <div className="paper-formula" key={index}>{block.lines?.map((line, lineIndex) => <p key={line}><span>0{lineIndex + 1}</span>{renderRichText(line, homeHref)}</p>)}</div>;
  }
  return null;
}

function WhitepaperView({ homeHref }: { homeHref: string }) {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(whitepaper.sections[0]?.id ?? "");

  useEffect(() => {
    const updateProgress = () => {
      const root = document.documentElement;
      const distance = root.scrollHeight - window.innerHeight;
      setProgress(distance > 0 ? Math.min(100, (window.scrollY / distance) * 100) : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    const sectionElements = whitepaper.sections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));
    let animationFrame = 0;

    const updateActiveSection = () => {
      animationFrame = 0;
      const readingLine = Math.min(240, window.innerHeight * 0.32);
      let currentSection = sectionElements[0]?.id ?? "";

      for (const section of sectionElements) {
        if (section.getBoundingClientRect().top <= readingLine) {
          currentSection = section.id;
        } else {
          break;
        }
      }

      setActiveSection((current) => current === currentSection ? current : currentSection);
    };

    const scheduleUpdate = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section className="whitepaper-view" aria-labelledby="whitepaper-title">
      <div className="reading-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <header className="paper-hero">
        <div className="paper-hero-grid" aria-hidden="true" />
        <img className="research-brand-icon research-brand-icon--whitepaper" src="/brand/cluzy/stars-yellow.svg" alt="" aria-hidden="true" />
        <p className="eyebrow eyebrow--bright">Dāginty research / August 2026</p>
        <h2 id="whitepaper-title">{whitepaper.title}</h2>
        <p className="paper-subtitle">{whitepaper.subtitle}</p>
        <p className="paper-deck">{whitepaper.deck}</p>
        <div className="paper-actions">
          <a className="button button--signal" href="/cluzy-employee-data-wellness-whitepaper.pdf" download>Download whitepaper PDF <span aria-hidden="true">↓</span></a>
          <span>Web-native edition · Selectable text · Linked sources</span>
        </div>
      </header>

      <div className="paper-layout">
        <aside className="paper-toc" aria-label="Whitepaper contents">
          <span>CONTENTS</span>
          <nav>{whitepaper.sections.map((section) => (
            <a
              className={activeSection === section.id ? "is-active" : undefined}
              href={`#${section.id}`}
              key={section.id}
              aria-current={activeSection === section.id ? "location" : undefined}
            >
              <b>{section.number}</b>{section.title}
            </a>
          ))}</nav>
          <a className="toc-download" href="/cluzy-employee-data-wellness-whitepaper.pdf" download>Download PDF ↓</a>
        </aside>

        <article className="paper-article">
          {whitepaper.sections.map((section) => (
            <section className="paper-section" id={section.id} key={section.id}>
              <header>
                <span>{section.number}</span>
                <div><p>SECTION {section.number}</p><h2>{section.title}</h2><p className="section-lead">{section.lead}</p></div>
              </header>
              {section.blocks.map((block, index) => renderBlock(block, index, homeHref))}
            </section>
          ))}

          <section className="paper-section paper-references" id="references">
            <header><span>R</span><div><p>SOURCES</p><h2>References</h2></div></header>
            <ol>{whitepaper.references.map((reference) => (
              <li id={`reference-${reference.n}`} key={reference.n}>
                <a className="reference-number" href={reference.url} target="_blank" rel="noreferrer" aria-label={`Reference ${reference.n}: ${reference.label}`}>{reference.n}.</a>
                <a className="reference-source" href={reference.url} target="_blank" rel="noreferrer">{reference.label} <span aria-hidden="true">↗</span></a>
              </li>
            ))}</ol>
          </section>
        </article>
      </div>
    </section>
  );
}

export function ResearchExperience({ initialView, homeHref }: { initialView: View; homeHref: string }) {
  const [view, setView] = useState<View>(initialView);

  const selectView = (next: View) => {
    setView(next);
    const url = new URL(window.location.href);
    url.searchParams.set("view", next);
    window.history.replaceState({}, "", url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="research-main">
      <div className="research-switcher-wrap">
        <div className="research-title">
          <span>DĀGINTY RESEARCH LAB</span>
          <p>Explore the complete research and model its financial impact.</p>
        </div>
        <div className="view-switcher" role="tablist" aria-label="Research view">
          <button role="tab" aria-selected={view === "whitepaper"} className={view === "whitepaper" ? "is-active" : ""} onClick={() => selectView("whitepaper")}>Whitepaper</button>
          <button role="tab" aria-selected={view === "calculator"} className={view === "calculator" ? "is-active" : ""} onClick={() => selectView("calculator")}>ROI Calculator</button>
        </div>
      </div>
      {view === "calculator" ? <Calculator /> : <WhitepaperView homeHref={homeHref} />}
    </main>
  );
}
