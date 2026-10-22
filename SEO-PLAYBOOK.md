# SEO playbook: blog.howtowinatmath.com

Read this before every run. SEO-QUEUE.md holds the state (what's done, what's next, the numbers). The newest decisions in SEO-QUEUE.md override this file.

## Goal
Bring readers from Google and AI assistants to the $5 *How to Win at Mathematics* ebook at https://howtowinatmath.com/. One sale a day needs roughly 2,500 sales-page visits a month.

## Product facts
Confirm anything beyond this list on the live sales page before stating it.
- Book: *How to Win at Mathematics* by Sahil Bora, first published 2014. Amazon title: "How to win at Mathematics: A guide to turn yourself from a poor math student into an outstanding one". Amazon listing used in schema: https://www.amazon.com/dp/B00JC0Y8KW (to be confirmed by Sahil).
- Sales page: $5 ebook, "risk-free for 30 days". Posts mention only the $5 ebook, not the order bump or upsell.
- Never claim student counts ("thousands of students"), testimonials, ratings or results the sales page does not show.

## Readers
| `audience` | Reader | Call-to-action angle | Hub |
| --- | --- | --- | --- |
| parents | Parents of struggling teens (the buyer) | "Buying this for your son or daughter?" | /for-parents |
| senior-high | High school students, grades 11-12 focus | "Studying hard and still failing tests?" | /for-high-school-students |
| university | College and university students, adults returning to math | Sahil's story: poor high school results to top marks in university engineering maths | /for-college-students |
| all | Everyone | One system for mindset, study method and test strategy | home page |

Every post carries an `audience` field; the CTA copy lives in `app/blog/[slug]/page.tsx`. Add every new post to the matching list in `lib/hubs.ts`.

## Market
US English first (53% of search impressions). Use "maths" only where the query does (Singapore and UK searchers).

## Writing standard (extraction shape)
- Answer the target question in the first 60 words.
- H2s in question form. Each H2 section is 120-180 words and self-contained: no "as mentioned above", restate the subject.
- 4-6 FAQs, each answer quotable on its own.
- One unique asset per post: a worked example, a decision table, a checklist, or an embedded Short (`{ type: 'video', id, title }`).
- 3+ internal links to real slugs, plus one link back from an existing post; 1-2 links to https://howtowinatmath.com/.
- Honest limits: say when a teacher or tutor is the better answer.
- First-person detail only from STORIES below. No invented statistics, testimonials or student counts.
- Commercial posts ("best X", "X vs Y"): 2,500+ words, a `ranking` array and a real comparison `table`.
- Fields: metaTitle 55 characters or less; metaDescription 150-160; excerpt under 160. `publishedAt` = real date from `date -u`. Set `updatedAt` only on meaningful edits.

## Gates
- New post only when 3 or fewer live posts are "Discovered" or "Crawled - currently not indexed" in Search Console, and no new post shipped in the last 7 days.
- Keyword: US keyword difficulty 10 or less in Ahrefs; otherwise label the pick "unvalidated".
- Before writing, check slugs, keywords AND the redirect sources in `next.config.mjs`. Never recreate a merged topic.
- Merges: keep any page with clicks or rising impressions over the last 3 months. A merge moves the material into the keeper, deletes the entry, adds a permanent redirect and repoints internal links.

## Data and indexing
- Search Console: sc-domain:howtowinatmath.com. GA4: property 516900514 (account 58784224).
- IndexNow: `https://api.indexnow.org/indexnow?url=<encoded URL>&key=6385cfb34d5e4f5103084bd51a7211b8` (key file in `public/`).
- Verify with `npm install && npx next build`. The repo has no package-lock.json; don't commit one.

## Publishing
- `main` deploys to Vercel automatically.
- Push from the session's clone. Cloud sessions can read this repo, but pushes are refused (HTTP 403) until the Claude GitHub app is installed on it. Record here when that changes.
- If the push is refused: create a git bundle and a patch of the commit in the outputs folder, send both to Sahil, and stop. He pushes them himself.
- Never look for, read or use GitHub tokens or other credentials.

## STORIES
Sahil adds true stories here. Use only these for first-person detail.
- From the published bio: struggled with math in his final years of high school, spent months researching how to learn it, went from poor high school results to outstanding marks in university engineering mathematics, and wrote the book (first published 2014).
