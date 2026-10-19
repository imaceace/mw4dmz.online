# Deployment and operations

Canonical origin: https://mw4dmz.online. Public support address: support@mw4dmz.online.

## Source and release gate

Run `npm run build` and `npm test`, complete desktop/mobile and interaction review, then inspect the exact staged file list and new file sizes. Commit only source, reusable checks, configuration, and maintained documentation. `.local/`, `dist/`, credentials, screenshots, captured HTML, and generated reports are ignored.

Push the reviewed release commit to the selected GitHub `main` branch. Confirm `git ls-remote origin refs/heads/main` equals `git rev-parse HEAD` and `git status --porcelain` is empty before deployment. Build from that clean commit. Reuse a configured Git automatic deployment when available; no existing pipeline was found in this new repository.

Use the Cloudflare MCP to upload `dist/worker.mjs` as the ES module `worker.mjs`, with `main_module: worker.mjs` and the compatibility date from `wrangler.jsonc`. Record the returned version/deployment identity. Keep workers.dev and preview URLs disabled. Bind both mw4dmz.online and www.mw4dmz.online to the production Worker only after the source release gate passes.

## Domain migration

Registrar: Spaceship. Initial complete Spaceship DNS inventory was empty (0 records). Original nameservers: launch2.spaceship.net, launch1.spaceship.net. Initial parent DS: key tag 37556, algorithm 13, digest type 2. Do not switch nameservers while this old-provider DS remains.

Cloudflare account: 7b73f9b584a0a88458a6dda0e9138eab. Zone: 7149969fc8ff3a24827a2eb5e77b787c. Assigned nameservers: davina.ns.cloudflare.com, tom.ns.cloudflare.com. At preparation the zone is pending; no production service has been deployed.

Coordinate removal of old Spaceship DNSSEC before NS migration, confirm parent DS state with validating public resolvers, then set the assigned Cloudflare nameservers using Spaceship MCP. Confirm authoritative and public NS, active Cloudflare zone, then configure new Cloudflare DNSSEC and its registrar DS if supported. Never report unsigned DNS as DNSSEC enabled. Preserve the original settings for rollback; restoring old signed DNS requires coordinated matching nameservers and DS.

The Worker handles scheme, host, and known page slash normalization in one 308 redirect, preserving query parameters. Avoid an edge HTTPS redirect that introduces an extra hop for www. HTTPS www requires valid TLS before the redirect can be tested. Verify all four scheme/host combinations for home, an inner page, a query URL, and a static resource; final canonical responses must be direct 200. Check `/llms.txt`, `/sitemap.xml`, raw HTML metadata/body, 404 responses, browser interactions, and actual current CSS/JS bytes.

## Support email

The forwarding target imacehu@foxmail.com is already verified in the Cloudflare account. After zone activation, inspect current records again, enable Cloudflare Email Routing, and create an exact `support@mw4dmz.online` forward to that target. Preserve existing MX/SPF/DKIM records if any appeared since preparation; do not enable catch-all. This is inbound forwarding, not an SMTP mailbox. Enabling routing was initially rejected because the zone is pending; no email usability is claimed until configuration/DNS is rechecked. Real test delivery remains distinct from configuration.

## Google and maintenance

The previous template's unrelated GA4 ID was removed. The owner confirmed G-LBK736WMGX for this site on 19 October 2026. The shared layout loads that measurement ID once; browser delivery and GA backend receipt are separate checks. GSC property verification and sitemap submission require this site's verified property. No ranking or indexing claim follows from deployment. Observe each canonical page with its target keyword group, date interval, country and device filters; a new property with no data remains pending observation.

Routes/content generate the sitemap, search index, language alternates, page plan and llms.txt. Maintain source citations and revision dates when facts change. Do not refresh content dates merely because a build ran.

## Environments and rollback

No remote staging or paid AI model capability is needed for this static wiki. Local review outputs stay under `.local/`. Roll back using a prior verified pushed source commit and its matching production Worker version; retain domain/mail configuration unless it caused the incident. Never deploy unpushed local fixes.

## Release ledger

Production deployment: pending. Source commit and exact remote branch SHA: pending. Domain migration: waiting for old DNSSEC coordination. Email Routing: waiting for active zone. GA4: G-LBK736WMGX confirmed by owner; integration verification pending. GSC: no mw4dmz.online property visible to the connected credential; verification/submission pending. GitHub repository confirmed by owner: https://github.com/imaceace/mw4dmz.online, main branch.
