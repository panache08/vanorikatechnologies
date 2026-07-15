# about-me.md: Vanorika Technologies

> Core context file. Upload this to every Claude Project.
> If something here is wrong, fix it here first. Every output downstream inherits it.
> Last updated: 2026-07-15

---

## My Business

**Vanorika Technologies** is a one-person cybersecurity and web development practice based in Harare, Zimbabwe.

- Founder: Donovan Mudarikwa (Founder & CEO, and currently the entire delivery team)
- Certifications: CompTIA A+, Security+, PenTest+
- Bug bounty: HackerOne (`panashesec`), Bugcrowd (`donovanmudarikwa1`)
- Site: https://www.vanorikatechnologies.co.zw
- Contact: +263 77 690 2542 (WhatsApp is the primary channel), donovanmudarikwa@vanorikatechnologies.co.zw
- Hours: Mon to Fri, 08:00 to 18:00. Sat 09:00 to 14:00 (CAT)
- Tagline: **Enterprise Security. Zero Compromise.**

The one-line version: *I test Zimbabwean businesses' websites the way an attacker would, then either hand them a plain-English report or fix it myself.*

---

## What We Do

Five services, in order of how much they actually earn:

| Service | What it is | Price |
|---|---|---|
| Penetration testing | Manual test of a web app/system, written remediation report | from **$400** |
| Security audit / assessment | Vulnerability scan + risk-ranked written report | from **$150** |
| Website development | Business sites, delivered in 1 to 2 weeks | from **$300** (packages $299 / $799 / $1,999) |
| Security & maintenance retainer | Monitoring, patching, support | from **$50/month** |
| Custom software / mobile / AI automation | Built to order | quoted |

Also: **Zenvora** (AI-powered ERP, $49 SME / $99 Enterprise / $200 Casino Suite per month). It's currently a portfolio piece and demo, not a revenue line. Treat it as a side bet, not the business.

**The free scan is the front door.** A passive security scan at `/report` and `/tools/*` gives any visitor a grade out of 100 plus their top findings, then gates a full branded PDF behind name + WhatsApp + email. That is the lead magnet. Everything else is downstream of it.

---

## Ideal Customer Profile (ICP)

**Primary: a Harare SME that already has a live website.**

- 5 to 50 staff, owner-operated, the owner makes the buying decision personally
- Already online, so they already have exposure, which means the free scan produces a real, specific, undeniable finding about *their* domain
- Sectors that have actually converted or engaged so far: e-commerce/auctions, beauty/salon, travel, professional services
- Budget: comfortable with $150 to $800 for a one-off, hesitant above ~$1,000 without a referral
- Pays via EcoCash, InnBucks, USD cash, bank transfer, or Wise

**Why this ICP and not another:** every real client to date fits it. GlowTrack Auctions (auction platform, found a critical auth bypass pre-launch), Beauty by Nyasha (salon site + 8 findings resolved), Pearlsard Travel (10 findings across 2 domains, including a broken Instagram bio link that was costing them leads daily). The free-scan funnel only works on someone who already has a domain to scan.

**Secondary (higher ticket, longer cycle):** regulated or high-stakes ZW orgs, meaning law firms, healthcare, travel agencies, licensed casinos. Landing pages already exist for these. The wedge is Data Protection Act 2021 compliance, not fear.

**Not the ICP:** businesses with no website and no budget; anyone shopping purely on price; international clients who found me cold (I *can* serve them, but they don't convert and they're not the focus).

---

## Stage

**Growth, but early and lumpy.** Not idea, not pre-revenue.

What's real:
- Site is live on a custom .co.zw domain with valid SSL, A+ security headers, Lighthouse 100/100/100
- ~20 free security tools, 11 blog posts, service + industry landing pages, a Zimbabwe Web Security Index, an annual research report
- A full marketing kit exists: flyer, social pack, LinkedIn banner, sales sheet, business cards, 3 case-study one-pagers, QR poster, WhatsApp Business catalogue
- 3 to 4 real engagements delivered (GlowTrack, Beauty by Nyasha, Enterpro, Pearlsard as a prospect)
- 2 real testimonials, but both still anonymised (T.M., K.D.)

**The honest read: the assets are done. The bottleneck is distribution, not more building.** The site returns zero Google results (domain is new and not yet indexed). Nobody is coming to the front door. That is the whole problem.

---

## Key Goals

### Next 30 days: land paying clients now
1. **Get cash in the door.** Cold outreach using the free scan as the opener: scan first, lead with a real finding on their actual domain, no generic pitch.
2. **Close Pearlsard Travel.** Phase 1 is $350; the audit, pricing, delivery plan, agreement and invoice are already written. Their site is *currently down with a 500 error*. This is the warmest lead in the pipeline.
3. **Get one named testimonial.** Beauty by Nyasha is the most likely yes. Anonymous "T.M." converts far worse than a real name and face. This is the single biggest credibility gap.
4. **Fix indexing.** Search Console → submit sitemap → Request Indexing. Create the Google Business Profile (copy is already written at `marketing/google-business-profile.md`). Free, and it's the difference between existing and being findable.

### Next 12 months
- Move from one-off project income to **recurring revenue**. Vanorika Shield ($30 to $50/mo per client) is built and deployed but not activated. It needs client sites added, `CRON_SECRET` + `RESEND_API_KEY` set, and a redeploy.
- Become the default answer to "who do I call about website security in Harare."
- Decide Zenvora's fate: real product with paying users, or retire it to portfolio. Don't leave it half-alive.

---

## Pricing Tiers

**Security**
- Passive scan: **free** (lead magnet, self-serve at `/report`)
- Security audit / vulnerability assessment: **from $150**
- Penetration test: **from $400** (single web app; scope factors published openly on `/pricing`)
- Security & maintenance retainer: **from $50/month**

**Web**
- Starter: **$299** once-off (5 pages, mobile, contact form, basic SEO, 1 month support)
- Business: **$799** once-off (15 pages, CMS, e-commerce to 100 products, blog, 3 months support) ← most popular
- Professional: **$1,999** once-off (custom web app, auth, admin dashboard, API, payments, 6 months support)
- Enterprise: **custom** (mobile app, cloud, AI, SLA, 12 months support)

**Terms:** 50% upfront, 50% on completion. Milestone billing on larger jobs. Fixed price, never hourly.

---

## Say No's

- **No hourly billing.** Fixed scope, fixed price, agreed before work starts.
- **No scope creep.** New scope is a new quote, not a favour.
- **No middlemen.** The client talks to Donovan. There are no account managers to hide behind.
- **No fake urgency, no fear-selling.** The findings are real and specific; they don't need dramatising. Never invent a threat to close a deal.
- **No naming clients or scan targets publicly without permission.** The Security Index anonymises by sector ("Bank A") deliberately. That's a legal safety line, not a style choice.
- **No claiming grades or results I haven't measured.** If an external scanner isn't run, don't assert a score.
- **No $200 "pentests" that are really an automated scan.** I publicly call this out, so I can't do it.
- **No AI attribution anywhere in client repos or deliverables.** Commits are authored `Panashe Party` only.
- **Don't take work I can't deliver solo and on time.** One person, finite hours.

---

## Resources & Constraints

**Resources**
- Full marketing kit, done and hosted (flyer, socials, sales sheet, cards, case studies, QR, WhatsApp catalogue)
- ~20 free security tools + an open-source repo (`panache08/vanorika-security-tools`, MIT) as a credibility and backlink asset
- The Zimbabwe Web Security Index: a genuinely original dataset (17 ZW orgs, 7 scored F, national average D). Real PR angle: Techzim, NewsDay.
- Calendly booking live at `/book`; Zoho email live with SPF/DKIM/DMARC at 100%
- 3 to 4 delivered engagements to point at

**Constraints**
- **One person.** Sales, delivery, marketing, support: all Donovan. This is the binding constraint on everything.
- **New domain, zero Google presence.** No inbound at all right now.
- **No named testimonials.** Both real ones are initials-only.
- **Free/hobby infrastructure.** Vercel Hobby (cron is daily-minimum), Zoho free tier, no paid API budget. Architecture is deliberately backend-light: forms hand off to WhatsApp.
- **Zimbabwe market realities.** USD pricing, multi-currency, mobile money, WhatsApp as the default business channel. Trust travels by referral, not by ads.
- **LinkedIn profile is bare:** no photo, no headline, ~30 connections, and still says Dubai instead of Harare. It's the first thing a prospect checks.
- **No photo of Donovan on the site:** `/about` still shows a "DM" monogram.

---

## Open Questions / To Verify

These are unresolved. Don't state them as fact in any output until confirmed:

- The **"17+ businesses assessed"** stat is used across the site but has never been verified. Confirm the real number or stop using it.
- **Enterpro** appears in the portfolio with a testimonial (K.D.). Confirm it was a real paid engagement, or remove both.
- The **annual research report** (`/research/zimbabwe-web-security-2026`) currently contains *representative placeholder statistics*. It must be edited to real anonymised data before it is promoted anywhere.
