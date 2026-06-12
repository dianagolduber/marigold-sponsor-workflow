# Marigold

Find sponsors for the community you're growing.

Marigold is a sponsorship workflow prototype for founders and community builders who run IRL events. It recommends best-fit sponsors, explains why each brand fits, suggests an ask range, and drafts outreach.

## What the Prototype Shows

- Dynamic sponsor recommendations by event type and event goal
- Sponsor ask ranges that adjust by audience size and event strategy
- A sponsor detail panel with contact route, proof, and official path
- Mock contact discovery with Apollo/Hunter/Clay-style enrichment states, demo work-email fields, and contact-personalized drafts
- Email drafts for sponsor outreach
- Luma-style market signals that show comparable sponsored event patterns and can influence future recommendations

## Mock Data Note

The contact finder uses mock/demo contacts and `.example` email domains. Production should connect an approved enrichment provider such as Apollo, Hunter, Clay, or another compliant source before showing real work emails.

## Run Locally

Open `index.html` in a browser, or serve the folder locally:

```bash
python3 -m http.server 5173
```

Then visit:

```text
http://127.0.0.1:5173/index.html
```
