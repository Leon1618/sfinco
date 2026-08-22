# Sfinco Website — Claude Code Starter Package

This is the Sfinco context package for building the website with Claude Code and hosting it on GitHub. Everything Claude Code needs to understand Sfinco is in here — you don't need to re-explain the business.

## What's in this folder

- `CLAUDE.md` — the main brief. Claude Code reads this automatically as soon as you open it in this folder.
- `docs/pillars-and-guides.md` — full detail on the four pillars, the Sfinco Guides series, and the roadmap.
- `docs/brand-guidelines.md` — voice, tone, colours, audience.
- `docs/business-context.md` — regulatory flags to keep in mind, plus a note on C.S.A.R.I.S. (kept separate from the site scope for now).

## Steps

**1. Create your project folder and repo**

```
mkdir sfinco-website
cd sfinco-website
git init
```

Copy everything from this package (`CLAUDE.md`, `docs/`) into that folder.

**2. Create the GitHub repo**

If you've got the GitHub CLI (`gh`) set up already:

```
gh repo create sfinco-website --public --source=. --remote=origin
```

If not, create a repo called `sfinco-website` at github.com/new, then:

```
git remote add origin https://github.com/<your-username>/sfinco-website.git
```

**3. Open Claude Code in that folder**

```
claude
```

It will pick up `CLAUDE.md` automatically.

**4. Kick off the build**

A good first prompt:

> Build the Sfinco marketing website as described in CLAUDE.md — start with the homepage, the Sfinco Guides page, and the SMB Cyber Audits contact page. Keep it static HTML/CSS, mobile-first, no build tooling. Once it looks right, set it up for GitHub Pages hosting.

Claude Code will scaffold the site, and you can iterate from there page by page — treat it like a conversation, not a one-shot request.

**5. Push and enable GitHub Pages**

Once you're happy with a first pass:

```
git add .
git commit -m "Initial Sfinco website"
git push -u origin main
```

Then in the GitHub repo: **Settings → Pages → Deploy from a branch → main → / (root)**. GitHub will give you a live URL (`https://<your-username>.github.io/sfinco-website`) within a minute or two.

**6. Point sfinco.com.au at it**

Once you're happy with the site and ready to go live on your own domain:

- Add a `CNAME` file to the repo root containing just `sfinco.com.au`.
- In VentraIP, add a `CNAME` DNS record pointing `www` at `<your-username>.github.io`, and an `A` record for the root domain pointing at GitHub's Pages IPs (GitHub's docs list the current ones — search "GitHub Pages custom domain DNS" if Claude Code doesn't already know them, since these can change).
- Back in GitHub repo Settings → Pages, enter `sfinco.com.au` as the custom domain and enable "Enforce HTTPS" once the certificate provisions.

This last step needs your VentraIP login, so it's the one part you'll do outside Claude Code.

## A note on scope

`CLAUDE.md` deliberately scopes this to a static marketing site — no SfincoAssist app, no Digital Estate Vault, no C.S.A.R.I.S. features. Those show up as "coming soon" at most. If you want to expand scope later, just update `CLAUDE.md` and tell Claude Code what's changed.
