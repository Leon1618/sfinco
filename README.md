# Sfinco: Claude Code Project

This is the Sfinco project home: the marketing website plus early MVP work for individual pillars. Everything Claude Code needs to understand Sfinco is in here, so you don't need to re-explain the business.

## Repo layout

- `index.html`, `guides.html`, `audits.html`, `css/`, `favicon.svg`: the marketing website (repo root, so GitHub Pages serves it with no extra config).
- `smb-audits/`: the SMB Cyber Audits product build (methodology, intake, reporting), separate from the `audits.html` enquiry page.
- `sfincoassist/`: the SfincoAssist Phase 1 prototype (alert/reminder engine, no live bank data).
- `docs/pillars-and-guides.md`: full detail on the four pillars, the Sfinco Guides series, and the roadmap.
- `docs/brand-guidelines.md`: voice, tone, colours, audience.
- `docs/business-context.md`: regulatory flags to keep in mind, plus a note on C.S.A.R.I.S. (kept separate from the site scope for now).
- `CLAUDE.md`: the main brief. Claude Code reads this automatically as soon as you open it in this folder.

## Publishing the website

**Push and enable GitHub Pages**

```
git add .
git commit -m "Update Sfinco site"
git push -u origin main
```

Then in the GitHub repo: **Settings → Pages → Deploy from a branch → main → / (root)**. GitHub will give you a live URL (`https://<your-username>.github.io/sfinco`) within a minute or two.

**Point sfinco.com.au at it**

Once you're happy with the site and ready to go live on your own domain:

- Add a `CNAME` file to the repo root containing just `sfinco.com.au`.
- In VentraIP, add a `CNAME` DNS record pointing `www` at `<your-username>.github.io`, and an `A` record for the root domain pointing at GitHub's Pages IPs. (GitHub's docs list the current ones; search "GitHub Pages custom domain DNS" if Claude Code doesn't already know them, since these can change.)
- Back in GitHub repo Settings → Pages, enter `sfinco.com.au` as the custom domain and enable "Enforce HTTPS" once the certificate provisions.

This last step needs your VentraIP login, so it's the one part you'll do outside Claude Code.

## A note on scope

The website stays the shopfront. No live SfincoAssist or Digital Estate Vault features get wired into it. `smb-audits/` and `sfincoassist/` are where product work happens, kept out of the site until each is actually ready to launch. `CLAUDE.md` still calls the website the current priority; if that's changed, update it so it stays accurate.
