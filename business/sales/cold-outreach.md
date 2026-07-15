# Cold Outreach

> Step 5 of the guide. This is the part founders put off longest, and for Vanorika it's the whole 30-day goal.
> Voice rules in `brand-voice.md` apply to every word here.

---

## The core insight

**Vanorika should never send a generic cold message.** It has something almost no other business has: a free passive scanner that produces a real, specific, true finding about the prospect's actual domain in about ten seconds.

So the sequence is always:

> **Scan first. Lead with what you found. Don't pitch.**

A message that says "I help businesses with cybersecurity" gets ignored. A message that says "your booking page loads over HTTP, so anything your customers type is sent unencrypted" gets a reply, because it's about them, it's true, and they can check it in thirty seconds.

**Do the scan before you write the message. Every time. No exceptions.** Run `/report` or `/tools/security-check` on their domain and pull one finding.

---

## Rules

1. **One finding, not five.** A list is a report, and reports are what you're selling. Give one, keep the rest.
2. **The finding must be real, checkable, and theirs.** Never generalise ("most sites like yours…"). Never invent.
3. **No fear.** State the fact and its business consequence. "Anything your customers type is sent unencrypted," not "you're one click away from disaster."
4. **Don't pitch in message one.** No price, no service list, no calendar link. The ask is permission, not a sale.
5. **Business consequence, not technical severity.** They don't care about HSTS. They care that Chrome shows their customers a "Not secure" warning.
6. **Short.** WhatsApp: under 60 words. If it needs scrolling, it's dead.
7. **Never mass-send.** Same message to 40 people is spam, reads like spam, and burns the number. 5 well-scanned prospects a day beats 50 blasted.
8. **No dashes.** Not one, anywhere in the message. A dash is the single loudest signal that a machine wrote this, and it gets the message deleted before the finding lands. Comma, colon, or full stop instead. `brand-voice.md` rule 11.

---

## Channel priority

**WhatsApp is the channel.** This is Zimbabwe. WhatsApp is where business happens, Donovan's whole site is built around a WhatsApp handoff, and the number is already on every asset.

LinkedIn is second, and honestly weak right now: the profile has no photo, no headline, ~30 connections, and still says Dubai instead of Harare. **Fix the profile before using the channel.** A cold DM from an empty profile is worse than no DM.

Email is third: good for a follow-up with the PDF attached, poor as an opener.

---

## WhatsApp: opener

> Hi [Name], Donovan here. I run a small security practice in Harare.
>
> I ran a free passive scan on [domain] this morning (nothing intrusive, just what's publicly visible) and one thing stood out: [ONE SPECIFIC FINDING].
>
> [ONE LINE ON WHAT THAT MEANS FOR THEM IN BUSINESS TERMS.]
>
> Want me to send the full breakdown? It's free either way, no pitch.

**Worked example (real, from the Pearlsard assessment):**

> Hi [Name], Donovan here. I run a small security practice in Harare.
>
> I ran a free passive scan on pearlsard.com this morning and one thing stood out: the site is returning a 500 error, and the link in your Instagram bio points straight at it.
>
> So anyone tapping that link right now sees an error page instead of your business. That's live leads going nowhere, today.
>
> Want me to send the full breakdown? It's free either way, no pitch.

That's the pattern. It's specific, it's true, it's costing them money *today*, and there is no ask beyond "shall I send it."

---

## WhatsApp: the referral opener (highest conversion)

Use this whenever there's any connection at all. In this market a warm intro outperforms everything else by a distance.

> Hi [Name], Donovan Mudarikwa here. [Mutual] mentioned you're running [business].
>
> I did the security work for [GlowTrack / Beauty by Nyasha], and found a critical login bypass on GlowTrack's platform before it went live.
>
> I ran a quick free scan on [domain] and found [ONE FINDING]. Happy to send you the full report, no charge. Worth a look?

---

## LinkedIn DM

Only after the profile is fixed. Adapted from the guide's step-5 prompt: lead with value, don't mention the product until they reply.

> Hi [Name], I work with Harare businesses on website security.
>
> I ran a free passive scan on [domain] and found [ONE FINDING]. [Business consequence in one line.]
>
> No pitch. Happy to just send you the breakdown so you can hand it to whoever manages your site. Want it?

---

## Email: follow-up only, with the PDF

**Subject:** `Security scan results for [domain]`

> Hi [Name],
>
> As promised, the full scan of [domain] is attached: [N] findings, ranked by how much they actually matter to your business, in plain English rather than tech gibberish.
>
> The one worth your attention today is [FINDING], because [CONSEQUENCE].
>
> No obligation. If you want it fixed I can quote you, and if you'd rather hand it to your existing developer that's completely fine. The report is written so they can act on it.
>
> Donovan Mudarikwa
> Vanorika Technologies · +263 77 690 2542

---

## The Security Index opener

For bigger organisations. Uses the original research as the hook, not a pitch.

> Hi [Name], I published the Zimbabwe Web Security Index recently: I scanned 17 Zimbabwean organisations across six sectors and graded them A to F. Seven scored an F. The national average was a D.
>
> Names are anonymised by sector, so nobody's named and shamed. [Their org / sector] is in the dataset.
>
> Happy to send you your organisation's individual breakdown privately, free. Interested?

---

## The prompt to generate these

Paste into the Content or Strategy Project with `about-me.md` + `brand-voice.md` attached:

> Here's a real passive scan result for [domain]: [paste findings].
>
> Write a WhatsApp cold opener to the owner. Lead with the single most business-relevant finding. Explain the consequence in one line, in plain English. Do not pitch, do not price, do not list services. Under 60 words. End by asking permission to send the full breakdown. Voice per brand-voice.md: no fear-selling, no buzzwords, and no dashes of any kind (rule 11).

---

## Tracking

Every lead already lands in `donovanmudarikwa@gmail.com` via Web3Forms with a source tag (e.g. `Homepage scanner (host: score%)`, `Tool: SSL checker (domain)`). Cold outreach is currently untracked, so **log it manually**: domain, date, finding used, channel, reply y/n.

Without this you can't tell which finding types actually convert, and you'll be guessing in 30 days.
