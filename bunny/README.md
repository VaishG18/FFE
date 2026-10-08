# Hosting: Bunny CDN (Bunny Sites + Edge Script)

Everything is served by Bunny so visitors in China get the same CDN path as everyone else.
When the site moves to WordPress, point the `ffe` pull zone's origin at the WordPress server;
DNS, SSL and the domain stay as they are.

| Piece | Bunny resource | URL |
|---|---|---|
| Live domain (coming-soon page now) | Site `ffe` (storage 1977351, pull zone 6764453, SG) | https://sites-ffe-yla75m.b-cdn.net → freshfoodexpoasiapacific.com, www |
| Client preview (full site) | Site `ffe-preview` (storage 1977353, pull zone 6764456, SG) | https://sites-ffe-preview-yc7f5d.b-cdn.net |
| Contact form → email | Edge Script `ffe-contact` (95863, standalone) | https://ffe-contact.bunny.run |
| DNS | Asked helpdesk@biz-era.net for A (preferred) or B | **A:** nameservers → `kiki.bunny.net`, `coco.bunny.net` (Bunny DNS zone already holds every record). **B:** stay on GoDaddy: `www` CNAME → sites-ffe-yla75m.b-cdn.net, bare domain 301-forwarded to https://www., ZeptoMail DKIM TXT + `bounce-zem` CNAME. If B, delete the Bunny DNS zone and the bare-domain hostname on `ffe`. |

## Deploying

Needs `BUNNYNET_API_KEY` in the environment (or `npx @bunny.net/cli login` once).

```bash
npm run deploy:preview      # build + publish the full site to the preview (adds a Disallow robots.txt)
npm run deploy:coming-soon  # publish coming-soon/ to the live domain (any path shows it)
npm run deploy:live         # build + publish the full site to the live domain (after client sign-off)
npx -y @bunny.net/cli@0.19.0 sites deployments publish --previous --site ffe   # instant rollback
```

Contact form script: `npx -y @bunny.net/cli@0.19.0 scripts deploy bunny/contact-form.ts 95863`.
Its env (Bunny dashboard → Edge Scripting → ffe-contact → Env):
`ZEPTOMAIL_TOKEN` (secret, ZeptoMail Send Mail token), `CONTACT_TO` (comma-separated inboxes),
`MAIL_FROM` (`noreply@freshfoodexpoasiapacific.com`), `ALLOWED_ORIGINS` (sites allowed to post).

## SSL

A: Bunny DNS issues certificates automatically once the nameservers switch.
B: once the `www` CNAME is live, run `npx -y @bunny.net/cli@0.19.0 sites domains ssl www.freshfoodexpoasiapacific.com ffe`.

## Search engines

Both pull zones carry an edge rule adding `X-Robots-Tag: noindex, nofollow` to every response, and
both sites serve a `robots.txt` with `Disallow: /`. Nothing is indexable until launch.

## Go-live checklist (after client confirmation)

1. `npm run deploy:live`
2. Pull zone `sites-ffe-yla75m` → Edge Rules: delete "Pre-launch: keep out of search engines".
   Leave the preview's rule on.
3. Add a real `robots.txt` / sitemap if wanted (`src/app/robots.ts`), then redeploy.
4. Check https://freshfoodexpoasiapacific.com and the contact form.
