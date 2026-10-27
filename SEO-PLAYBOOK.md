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
- The Claude GitHub app is installed on this repo (since 22 Oct 2026), so sessions can push.
- Update SEO-QUEUE.md in the same commit: tick the item, add new candidates, append this run's Step 0 numbers to the run log.
- Commit on a new branch named `seo-run-YYYY-MM-DD` and push it.
- Open a pull request into main with `gh api repos/sahil885/howtowinatmath-blog/pulls --method POST`, then merge it with `gh api repos/sahil885/howtowinatmath-blog/pulls/<number>/merge --method PUT`.
- If the merge is refused or blocked, leave the pull request open, send Sahil its link, and stop. If the push itself is refused, write a git bundle and a patch of the commit to the outputs folder, send both to Sahil, and stop.
- After a successful merge, wait until `gh api repos/sahil885/howtowinatmath-blog/commits/main/status` reports success, load each changed URL to confirm it renders, then submit the changed URLs to IndexNow: in Chrome, open https://www.bing.com/indexnow and from that page POST JSON to /indexnow with host `blog.howtowinatmath.com`, key `6385cfb34d5e4f5103084bd51a7211b8`, keyLocation `https://blog.howtowinatmath.com/6385cfb34d5e4f5103084bd51a7211b8.txt` and urlList (200 or 202 = accepted).
- Never look for, read or use GitHub tokens or other credentials.

## STORIES
Sahil's own account, from the first chapter of the book. Use only these for first-person detail, and keep them accurate. For US readers, explain the Australian terms in passing: VCE is the Year 11-12 certificate in Victoria, Mathematical Methods is the VCE subject covering functions, calculus and probability, and the ATAR is the university entry rank.

1. He struggled with maths through high school, especially his last two years. Entry to engineering and computer science required VCE Mathematical Methods.
2. He wanted to take Specialist Maths, the highest level of high school maths, in Year 11. The maths coordinator saw his average Year 10 grades and made him drop it.
3. In Year 12 Mathematical Methods he failed almost every test despite trying his best. His teacher thought he wasn't trying and didn't expect him to pull through.
4. Before the final exams he had one-on-one tutoring outside school. Through September and October his life was school, tutoring, exam study and a part-time job, with no social life.
5. He worked through more than 50 practice exams, about one a day from September until the day before the first exam.
6. Exam 1 (no calculator): he felt confident until question 4, a probability question that needed thinking outside the box. Two later probability questions he could have done on a calculator had to be done by hand, and he couldn't write the steps because he didn't understand them.
7. Exam 2 (calculator and notes allowed) went worse. The questions were long, wordy and full of jargon. He tried to apply concepts he didn't deeply understand and ended up writing memorized solutions from practice exams. His hopes for the subject went down the drain.
8. He finished VCE in 2012 with disappointing results but still got into RMIT University. University was a fresh start: nobody cared about his ATAR, which is just a number to get into a course.
9. At RMIT he experimented with ways to learn, taking notes on what worked, what didn't and which methods helped most. Those notes became the book's guidelines. He went from failing maths in high school to doing well in university mathematics (outstanding marks in engineering mathematics, per his bio).

Leave out how he got the practice exams (a shared file of commercial papers): posts must not suggest sharing paid exam papers.
