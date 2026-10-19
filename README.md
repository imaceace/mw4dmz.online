# DMZ MW4 Wiki

Independent multilingual player wiki for Call of Duty: Modern Warfare 4 DMZ. Production origin: https://mw4dmz.online. English is the default, with complete Chinese, French, Italian, Korean and Japanese editions.

## Run and validate

Requires Node.js 20 or later. No runtime package installation is required.

```sh
npm run build
npm test
npm run dev
```

The local server binds to http://127.0.0.1:4173. Build output is generated in ignored `dist/`; do not commit it. Local screenshots, browser results, logs and release evidence belong under ignored `.local/`. The checks exercise complete initial HTML, localized content, links, canonical/hreflang, support contact, Worker responses, permanent origin redirects and query preservation.

## Content and navigation

- `src/config.mjs`: single origin, support email, route and language configuration.
- `src/content.mjs`: localized content, confirmed weapon records and source-based gameplay details.
- `src/render.mjs`: shared header, footer, guides, SEO, source links and video cards.
- `src/assets/`: original CSS schematic art, interaction code and favicon.
- `scripts/build.mjs`: static HTML, text resources and self-contained Cloudflare Worker.
- `scripts/sync-page-plan.mjs`: regenerates the maintained URL and keyword plan with `npm run plan`.

The Hajin view combines an explicitly illustrative concept schematic with a searchable, paginated directory of 13 official points of interest, regions and initial AI threat levels. It is not a geographic navigation map. Seven named weapons are listed from official FOB guidance; no unsupported damage, ranking or attachment statistics are invented. Four mission categories and source-confirmed extraction instructions are available. The official video shows the owner-supplied image as its cover, with separate attribution to the embedded video and loads an embedded privacy-enhanced YouTube player after a click; chapter links open the original video. Cover bytes are fingerprinted and served as a binary PNG by the Worker. Embedded playback remains subject to YouTube regional and browser restrictions.

## Publication and updates

Use the account’s existing authorized Cloudflare deployment flow with `wrangler.jsonc`, after required validation, reviewed commit, push and remote SHA verification. `workers_dev` and preview URLs are disabled. Both apex and www custom domains must have DNS and active TLS before the Worker can normalize them. The Worker returns a single 308 to HTTPS non-www, retaining path and query and normalizing known page slashes in the same response. Validate all four HTTP/HTTPS and www/apex variants after binding the domains. DNS, TLS, mail forwarding and external service setup are separate from a passing local build.

`/llms.txt`, `/sitemap.xml`, `/robots.txt` and locale search indexes are generated from the same route/configuration data. Update localized facts and the actual editorial review date when facts change, run build and tests, then check raw HTTP HTML and desktop/mobile behavior. Privacy and terms are noindex. Support is fixed at support@mw4dmz.online; displaying it does not prove mail delivery.

Google Analytics 4 uses the user-supplied measurement ID `G-LBK736WMGX` in the shared layout. Its privacy disclosure is translated. No unrelated tracking ID remains. Page request transmission and Google’s reporting receipt must be verified separately; tracking protection may suppress collection. This site does not request game credentials, accept payments, provide accounts or invoke paid AI models. Search Console verification and sitemap submission require the property’s actual authorization; no placeholder verification is shipped.

Refer to [page plan](docs/page-plan.md), [design decisions](docs/design.md) and project deployment notes for handoff. Fact sources are visible on the public sources page and linked in the guides.

