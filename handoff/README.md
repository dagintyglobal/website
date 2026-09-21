# Dāginty digital handoff

This package gives Dāginty the source and deployment materials for the six public Dāginty and Cluzy sites created in ChatGPT Sites.

## Included sites

| Site | Live URL | Package | Type |
| --- | --- | --- | --- |
| Dāginty + Cluzy | https://daginty-cluzy.jaymandel.chatgpt.site | `sites/daginty-cluzy.tar.gz.part-*.b64` | Vinext / Cloudflare Worker |
| Meet Cluzy | https://meet-cluzy.jaymandel.chatgpt.site | `sites/meet-cluzy.tar.gz.part-*.b64` | Static HTML |
| Cluzy Data Wellness | https://cluzy-data-wellness.jaymandel.chatgpt.site | `sites/cluzy-data-wellness.tar.gz.part-*.b64` | Vinext / Cloudflare Worker |
| Cluzy Delivery Model | https://cluzy-delivery-model.jaymandel.chatgpt.site | `sites/cluzy-delivery-model.tar.gz.part-*.b64` | Static HTML |
| Dāginty | https://daginty-website.jaymandel.chatgpt.site | `sites/daginty-website.tar.gz.part-*.b64` | Vinext / Cloudflare Worker |
| Clarity to Conversion | https://clarity-to-conversion.jaymandel.chatgpt.site | `sites/clarity-to-conversion.tar.gz.part-*.b64` | Vinext / Cloudflare Worker |

The private Cluzy EYECON handoff is deliberately excluded. It contains internal source and handoff materials intended for a specific collaborator.

## What each package contains

- Complete site source or static deployment output
- Images, PDFs, fonts and other public assets used by that site
- Dependency lockfiles where applicable
- Existing ChatGPT Sites hosting manifest
- Build scripts and tests already present in the project

No passwords, access tokens, personal chat history, recovery codes or personal-account data are included.

## Restore a source-based site

1. Clone or download this repository.
2. Run `bash handoff/assemble-sites.sh` from the repository root. This recreates and verifies the six archives in `handoff/assembled-sites/`.
3. Extract the relevant archive.
4. Open a terminal in the extracted site directory.
5. Use Node.js 22.13 or later.
6. Run `npm ci`.
7. Run `npm run build`.
8. Connect the directory to the company-controlled ChatGPT Sites project or another compatible Cloudflare Worker hosting process.
9. Add any required domain and runtime settings through the hosting platform, not in source control.

The four source-based sites were build-checked on 2026-09-21.

## Restore a static site

The static packages contain a `dist/index.html` file. Extract the archive and publish the `dist` directory through ChatGPT Sites or another static host.

## Ownership transfer

Source availability and account ownership are separate. GitHub preserves the files, but it does not transfer ownership of ChatGPT Sites, Canva, Substack, domains or personal accounts. Follow `OWNERSHIP-TRANSFER.md` for those steps.

## Integrity checks

Compare downloaded archives with `SHA256SUMS.txt` before deployment.
