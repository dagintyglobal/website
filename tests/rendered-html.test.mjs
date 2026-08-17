import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the Dāginty ecosystem homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Personal data control for the AI economy/);
  assert.match(html, /Reduce human-driven risk/);
  assert.match(html, /More control for people\. Less risk for organizations/);
  assert.match(html, /Individual \/ Employee/);
  assert.match(html, /Journalist \/ Researcher/);
  assert.match(html, /Scan/);
  assert.match(html, /Review/);
  assert.match(html, /Cleanse/);
  assert.match(html, /Track/);
  assert.match(html, /Employee data wellness as cybersecurity/);
  assert.match(html, /Attackers do not need to breach your firewall if they can breach your people/);
  assert.match(html, /\$76,950/);
  assert.match(html, /Modeled ROI/);
  assert.match(html, /minimum target participation threshold of 25% yielding nearly a 5x ROI/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/);
});

test("server-renders the Dāginty Research Lab with the whitepaper as default", async () => {
  const response = await render("/research");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /DĀGINTY RESEARCH LAB/);
  assert.match(html, /Employee Data Wellness as Cybersecurity/);
  assert.match(html, /Whitepaper/);
  assert.match(html, /ROI Calculator/);
});
