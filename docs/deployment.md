# Deployment and operations

Canonical origin: https://mw4dmz.online. Public support address: support@mw4dmz.online.

## Source and release gate

Run `npm run build` and `npm test`, complete desktop/mobile and interaction review, then inspect the exact staged file list and new file sizes. Commit only source, reusable checks, configuration, and maintained documentation. `.local/`, `dist/`, credentials, screenshots, captured HTML, and generated reports are ignored.

Push the reviewed release commit to the selected GitHub `main` branch. Confirm `git ls-remote origin refs/heads/main` equals `git rev-parse HEAD` and `git status --porcelain` is empty before deployment. Build from that clean commit. Production uses Cloudflare Workers Builds connected to `imaceace/mw4dmz.online`, watching `main`. The root directory is `/`, the build command is `npm run build && npm test`, and the deploy command is `npx wrangler deploy`. All paths trigger builds; preview builds are disabled. Cloudflare stores the existing build credential; no token is stored in this repository.

Push starts the production build from the committed GitHub source. Confirm the build commit matches the pushed release SHA, wait for successful build and deployment, then record its build UUID and deployed Worker version. A failed build or test must prevent deployment. Manual MCP uploads are a recovery path only after the same source release gate. Keep workers.dev and preview URLs disabled. Bind both mw4dmz.online and www.mw4dmz.online to the production Worker only after the source release gate passes.

## Domain migration

Registrar: Spaceship. Initial complete Spaceship DNS inventory was empty (0 records). Original nameservers: launch2.spaceship.net, launch1.spaceship.net. Initial parent DS: key tag 37556, algorithm 13, digest type 2. Do not switch nameservers while this old-provider DS remains.

Cloudflare account: 7b73f9b584a0a88458a6dda0e9138eab. Zone: 7149969fc8ff3a24827a2eb5e77b787c. Assigned nameservers: davina.ns.cloudflare.com, tom.ns.cloudflare.com. The production Worker mw4dmz-wiki is uploaded; apex and www custom domains are bound, with workers.dev and preview URLs disabled. The zone became active on 19 October 2026 after the nameserver change. Both custom domains serve the production Worker with valid TLS.

Coordinate removal of old Spaceship DNSSEC before NS migration, confirm parent DS state with validating public resolvers, then set the assigned Cloudflare nameservers using Spaceship MCP. Confirm authoritative and public NS, active Cloudflare zone, then configure new Cloudflare DNSSEC and its registrar DS if supported. Never report unsigned DNS as DNSSEC enabled. Preserve the original settings for rollback; restoring old signed DNS requires coordinated matching nameservers and DS.

The Worker handles scheme, host, and known page slash normalization in one 308 redirect, preserving query parameters. Avoid an edge HTTPS redirect that introduces an extra hop for www. HTTPS www requires valid TLS before the redirect can be tested. Verify all four scheme/host combinations for home, an inner page, a query URL, and a static resource; final canonical responses must be direct 200. Check `/llms.txt`, `/sitemap.xml`, raw HTML metadata/body, 404 responses, browser interactions, and actual current CSS/JS bytes.

## Support email

The forwarding target imacehu@foxmail.com is verified in the Cloudflare account. After zone activation, records were rechecked and Cloudflare Email Routing was enabled with an exact `support@mw4dmz.online` forward to that target. Preserve existing MX/SPF/DKIM records if any appeared since preparation; do not enable catch-all. This is inbound forwarding, not an SMTP mailbox. Initial routing setup waited for zone activation; configuration and MX/SPF/DKIM were then read back. Real test delivery remains distinct from configuration.

## Google and maintenance

The previous template's unrelated GA4 ID was removed. The owner confirmed G-LBK736WMGX for this site on 19 October 2026. The shared layout loads that measurement ID once; browser delivery and GA backend receipt are separate checks. GSC property verification and sitemap submission require this site's verified property. No ranking or indexing claim follows from deployment. Observe each canonical page with its target keyword group, date interval, country and device filters; a new property with no data remains pending observation.

Routes/content generate the sitemap, search index, language alternates, page plan and llms.txt. Maintain source citations and revision dates when facts change. Do not refresh content dates merely because a build ran.

## Environments and rollback

No remote staging or paid AI model capability is needed for this static wiki. Local review outputs stay under `.local/`. Roll back using a prior verified pushed source commit and its matching production Worker version; retain domain/mail configuration unless it caused the incident. Never deploy unpushed local fixes.

## Release ledger

Worker upload: f5b5d057a15940bf9a7a429ea94fbe6b, from clean source 0c045beb4d988d57a1727aeea68bddd009c92439 verified on origin/main before upload. That initial release was followed by successful public HTTP/TLS and desktop/mobile browser checks. The final media/icon/CSP update is recorded by its pushed Git commit and Worker source tag. Domain migration: old Spaceship DNSSEC disabled, old DS cleared in Cloudflare and Google public resolvers, then assigned Cloudflare NS applied through Spaceship MCP. All 20 HTTP origin checks passed: canonical 200 and all alternatives one-hop 308, preserving paths and query strings. New Cloudflare DS was saved through the owner-authorized Spaceship DNSSEC interface (key tag 2371, algorithm 13, digest type 2, digest 64175AFA6656426214A112B2B197427704FDD3179B8E7130659F5262967A2057). Google and Cloudflare public resolvers both returned this exact DS with authenticated data after propagation. Email Routing is ready; exact support forward to the previously verified imacehu@foxmail.com is enabled, catch-all disabled. Real email delivery has not been tested. GA4: G-LBK736WMGX confirmed by owner; the exact built Worker CSP was tested in Chrome and a g/collect request with the correct ID and canonical page URL was observed. Google backend receipt is unverified because the Analytics MCP has no application credentials. GSC: no mw4dmz.online property visible to the connected credential; verification/submission pending. GitHub repository confirmed by owner: https://github.com/imaceace/mw4dmz.online, main branch.

## GitHub automatic build verification — 20 October 2026

GitHub push event for main commit `58f760b9eeb813a953dbbc0326827d567b676cba` automatically started build `b0349101-93ba-455e-b797-c3a229790bb4`. Cloudflare ran build and all 1950 checks successfully, then deployed Worker version `ae43c43c-861b-452f-9422-84c0a4e92639` at 100% traffic. The six live language homepages include the supplied Plausible script and permitted CSP origin; served analytics code matches source after platform newline normalization. All 20 live origin checks passed, including query preservation and llms.txt. Browser loading returned HTTP 200 for the Plausible script. Analytics dashboard receipt is a separate observation. Preview builds, workers.dev and preview URLs remain disabled; no staging environment or paid AI capability was created. Verification outputs remain under ignored `.local/`.
