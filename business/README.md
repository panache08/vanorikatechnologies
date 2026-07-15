# Vanorika: Business Core Files

The 9-step "use Claude to start a business" guide, applied to Vanorika Technologies with real numbers instead of a template.

Built 2026-07-15. Decisions baked in: **30-day goal = land paying clients now.** **Primary ICP = Harare SMEs that already have a live website.**

---

## The files

```
business/
├── about-me.md          ← core file 1: what the business is, ICP, stage, goals, prices, say-no's, constraints
├── brand-voice.md       ← core file 2: how Vanorika writes, extracted from the live site copy
├── settings.json        ← model defaults + house rules
├── daily-brief.md       ← step 9: the morning brief prompt
├── projects/
│   ├── strategy.md      ← Project instructions: positioning, pricing, hard calls
│   ├── content.md       ← Project instructions: blog, social, newsletter, page copy
│   └── operations.md    ← Project instructions: proposals, reports, delivery, Shield runbook
└── sales/
    ├── cold-outreach.md ← scan first, lead with a real finding, don't pitch
    ├── follow-up.md     ← day 3 / 10 / 30 sequence + objection answers
    └── call-framework.md← the free 20 to 30 min consult
```

**`about-me.md` and `brand-voice.md` are the two that matter.** Everything else inherits from them. Get those wrong and every output downstream is wrong.

---

## How to use them

1. Go to claude.ai → **Projects** → create three: `Vanorika Strategy`, `Vanorika Content`, `Vanorika Operations`.
2. In each, upload `about-me.md`, `brand-voice.md`, `settings.json`.
3. Paste the matching `projects/*.md` into that Project's custom instructions.
4. Start every session inside the relevant Project, never in a blank chat.

Keep the core files current. When a price changes, a client signs, or the 30-day goal moves, edit `about-me.md` **first**, then re-upload. A stale core file silently poisons everything.

---

## The 9 steps: what's done, what's on you

| # | Step | Status |
|---|---|---|
| 01 | Validate the idea before building | **N/A**. Vanorika is live with real clients and real revenue. The step-1 devil's-advocate prompt is baked into `projects/strategy.md` and pointed at *new* bets (Zenvora, Shield) instead. |
| 02 | Create two core files | ✅ **Done**: `about-me.md`, `brand-voice.md` |
| 03 | Build a Project per function | ✅ **Instructions written**: you create the three Projects on claude.ai and upload |
| 04 | Artifacts for first business assets | ⚠️ **Mostly already exists**: see below |
| 05 | Sales scripts and outreach | ✅ **Done**: `sales/` |
| 06 | Connect the tools | 🔲 **You**: claude.ai → Settings → Connectors |
| 07 | Cowork for real documents | 🔲 **You**: claude.ai product surface |
| 08 | Claude Code to build the product | ✅ **Already how the site was built** |
| 09 | Daily business brief | ✅ **Done**: `daily-brief.md` |

---

### On step 4: you already have the assets

The guide's step-4 list is landing page copy, brand positioning, content calendar, pricing page, pitch deck, financial model. Most of it exists:

- **Landing page copy, pricing page**: live and published with real prices
- **Brand positioning**: that's `about-me.md` + `brand-voice.md`
- **Sales collateral**: flyer, sales sheet, 3 case-study one-pagers, business cards, LinkedIn banner, social pack, QR poster, WhatsApp Business catalogue. All built, all hosted.
- **Content strategy**: 3 pillars defined, 11 posts live, remaining topics scoped in `projects/content.md`

**Deliberately not built: the financial model.** It needs real revenue, costs, and runway: numbers only you have. A financial model with invented inputs is worse than none, because it looks authoritative and it's fiction. Give me the actuals and I'll build it.

This is the honest read on step 4: **your problem is not a shortage of assets.** ~20 tools, 11 posts, a research index, a full marketing kit, and the domain returns zero Google results. Building more is the comfortable move. It isn't the useful one.

---

### On step 6: what's actually connectable

The guide says "Google Drive, Notion, Slack, 50+ others." You don't run Notion or Slack. What's live in your setup already: **Google Drive, Gmail, Google Calendar, Todoist, Supabase, Vercel, Figma, Adobe.** Several others need authorising before use.

The realistic version for Vanorika: **the outreach log is the missing input, not a connector.** A markdown table or spreadsheet of who you scanned, what you found, and whether they replied would do more for the daily brief than any integration. Format in `daily-brief.md`.

---

## Corrections to the guide

Two things in that infographic are wrong, noted so they don't get copied forward:

1. **The `settings.json` model is stale.** It pins `claude-3-5-sonnet-20241022`, long superseded. Current: `claude-opus-4-8`, `claude-sonnet-5`, `claude-haiku-4-5-20251001`.
2. **`"permissions": "all"` is not real.** No Claude config has that field. The Messages API has no permissions key; Claude Code uses allow/deny rule lists. It's dropped from `settings.json` rather than copied.

---

## Unresolved: answer these, they're load-bearing

Currently marked as unverified in `about-me.md`, and the Projects are instructed not to state them as fact:

- [ ] **"17+ businesses assessed"**: used across the site, never verified. Confirm the real number or remove it.
- [ ] **Enterpro**: real paid engagement? If not, remove the portfolio entry and the K.D. testimonial.
- [ ] **The annual research report**: currently contains placeholder statistics. Cannot be promoted until it's rebuilt on real data, or dropped.

And the three that cost nothing and block the most:

- [ ] **One named testimonial** (Beauty by Nyasha is the likely yes). Biggest credibility gap in the business.
- [ ] **Search Console** → submit sitemap → Request Indexing, and create the Google Business Profile (copy already written at `marketing/google-business-profile.md`)
- [ ] **Fix the LinkedIn profile**: no photo, no headline, ~30 connections, still says Dubai. It's the first thing a prospect checks, and step 5's LinkedIn channel is dead until it's fixed.
