# SEO queue: blog.howtowinatmath.com

Newest first in each log. Decisions here override SEO-PLAYBOOK.md.

## Decisions
- 2026-10-26: Chrome/Claude extension was offline this run (built-in browser not signed into Google either), so Search Console (unindexed list, target positions) and GA4 (sessions, purchases) could not be pulled. STEP 1 item 1 needs real GSC queries, so the main change fell to STEP 1 item 2: an unindexed post still missing its asset.
- 2026-10-26: Playbook Publishing section updated to match STEP 4 (branch/PR/merge via gh api, commit-status wait, IndexNow via Bing page). First-run housekeeping.
- 2026-10-22: STORIES in SEO-PLAYBOOK.md filled from the book's first chapter. Publishing now goes through pull requests (Claude GitHub app installed).
- 2026-10-22: what-science-says-about-being-bad-at-math stays a separate post (it had a click, and the rule keeps pages with clicks). Re-angled to "Will I ever get better at math?".
- 2026-10-22: CTA copy no longer claims "thousands of students" (unverified).

## Merges
Done 2026-10-22 (16), each with a permanent redirect:
- why-am-i-so-bad-at-math <- stop-being-bad-at-math, youre-not-a-math-person-myth
- how-to-overcome-math-anxiety <- math-anxiety-adults, how-to-build-confidence-in-math
- signs-child-has-math-anxiety <- back-to-school-math-anxiety
- what-to-do-when-failing-math-class <- how-to-not-fail-math, how-to-pass-summer-school-math
- how-to-stop-failing-math-tests <- understand-math-in-class-fail-tests, real-reason-you-freeze-on-math-tests
- how-to-pass-math-exam-last-minute <- how-to-pass-math-test-without-studying, why-cramming-doesnt-work-for-math
- how-to-prepare-for-math-final-exam <- how-to-study-for-math-test
- how-to-get-better-at-math-fast <- how-to-raise-math-grade-fast
- how-to-help-child-with-math <- help-child-math-homework
- how-to-pass-precalculus <- why-is-precalculus-so-hard
- how-to-pass-calculus <- how-to-prepare-for-calculus
Earlier: why-youre-not-bad-at-math -> why-am-i-so-bad-at-math; how-to-catch-up-in-math-after-falling-behind -> how-to-catch-up-in-math.

## Near-page-1 targets
- [x] how-to-pass-geometry: test and final section with checklist, meta for tests and finals (2026-10-22). Baseline position 12.1 over 16 months, 4.3 in September.
- [x] why-am-i-so-bad-at-math: 2 posts merged in, Short embedded (2026-10-22). Baseline page 25.4; query "why am I so bad at math" about 10.
- [x] how-to-stop-failing-math-tests: 2 posts merged in, test-day checklist, Short (2026-10-22). Baseline 25.7.
- [x] what-to-do-when-failing-math-class: 2 posts merged in, weeks-left table, Short (2026-10-22). Baseline 31.5.
- [ ] Pull each target's real queries from Search Console and tune headings and FAQs (Chrome was offline during the sprint).
- [ ] Re-check the four on 5 Nov and 19 Nov. If still past position 15, add links before rewriting.
- [ ] my-teenager-hates-math (11.0, parents)
- [ ] sat-vs-act-math ("act math vs sat math" at 16)
- [ ] how-to-pass-math-without-tutor (30.4)
- [ ] how-to-pass-college-math (33.8, university)

## Unindexed live posts
Baseline: 13 on 12 Oct; 6 left after the merges. Links added 2026-10-22; Sahil to request indexing after the deploy.
- [ ] best-math-books-struggling-students (discovered): links from how-to-help-child-with-math, math-tutor-vs-math-book and the parents hub
- [ ] how-to-memorize-the-unit-circle (discovered): links from precalculus, trigonometry, calculus and two hubs
- [ ] how-to-pass-math-placement-test (discovered): links from college math, college algebra, adult skills and the college hub
- [x] how-to-do-geometry-proofs: full two-column proof table added (midpoint + vertical angles → SAS, with the CPCTC finish explained), updatedAt bumped (2026-10-26). Back-link from how-to-pass-geometry and high-school hub already in place. Sahil to request indexing.
- [ ] how-to-get-better-at-math-word-problems (crawled): links from get-better-fast, algebra 1 and the high school hub; still needs a worked example
- [ ] how-to-stop-procrastinating-on-math-homework (crawled): links from catch-up, study guide, teenager-hates-math and two hubs; still needs a checklist

## Audience backlog (new posts, gated)
- University: how to pass calculus 1 in college; failing a college math class: withdraw, retake or push on; how to study for a university math exam; keeping up in engineering maths; college algebra vs precalculus; ways to learn calculus on your own (honest comparison)
- Senior high: how to pass AP Calculus AB; Algebra 2 final exam study plan; how to get an A in precalculus; how to study for IB Math exams
- Parents: my teenager is failing math in senior year; helping with math when you're bad at it yourself; my college student is failing math; how to talk to your teen about a failing grade
- AI-citation comparisons: best math books for college students; tutor vs online course vs book for a struggling teen (refresh math-tutor-vs-math-book); free calculus resources vs a structured book

## Baseline (21 Oct 2026)
- Search Console as of 12 Oct: 49 indexed, 27 not indexed (11 discovered, 11 crawled, 5 redirects); 13 live blog posts not indexed.
- September: 1 click, 462 impressions, average position 57.9. 1-18 October: 0 clicks, 231 impressions, position 58.8. 16 months: 10 clicks, 4.85k impressions.
- GA4, 1 June to 20 October: 100 sessions (77 Direct, 1 Organic Search, 2 AI Assistant).
- Bots read "Math Mastery" as the sales page title (Base44 fix pending).

## AI panel log
(monthly; mentions out of 36)

## Outreach log
(Phase 5, not started)

## Run log
- 2026-10-26 run: main change = worked two-column proof table added to how-to-do-geometry-proofs (crawled-not-indexed; keyword "how to do geometry proofs"; reader senior-high; US geometry finals season). Gives the post the canonical extractable asset it was missing. Small fixes: trimmed over-length metaTitles on college-algebra-help (56→49) and math-study-guide-struggling-students (58→40); trimmed that post's metaDescription (161→153) and the signs-child-needs-math-tutor excerpt (176→148) into spec. Updated playbook Publishing section to STEP 4. Build passed (`npx next build`); 0 hard field/link/slug violations; all /blog/ links resolve.
  - Step 0a: sales-page `<title>`/`og:title` = "How to Win at Mathematics - Master Math Learning | $5 eBook"; meta description present; "Math Mastery" is GONE (Base44 fix landed).
  - Step 0b: IndexNow key file at /6385cfb34d5e4f5103084bd51a7211b8.txt returns `6385cfb34d5e4f5103084bd51a7211b8` (matches filename).
  - Step 0c/0d/0e: NOT retrieved — Claude in Chrome offline and built-in browser not signed into Google. Unindexed-post link additions (0c) and the four target positions (0d) and GA4 sessions/purchases (0e) deferred to a run with Chrome connected.
  - Spare-edit backlog (needs query data): 20 posts have metaDescription under 150 chars (121-148): how-to-pass-algebra-1-high-school, what-to-do-when-failing-math-class, how-to-pass-college-math, how-to-prepare-for-math-final-exam, how-to-overcome-math-anxiety, i-used-to-hate-math-heres-what-changed, how-to-remember-math-formulas, best-way-to-practice-math-at-home, how-to-help-child-with-math, signs-child-has-math-anxiety, how-to-pass-algebra-2, how-to-pass-sat-math, college-algebra-help, my-teenager-hates-math, how-to-pass-trigonometry, math-anxiety-middle-school, sat-vs-act-math, how-to-pass-act-math, how-to-pass-math-without-tutor, what-to-do-when-you-dont-understand-math.
- 2026-10-22 setup sprint: 16 merges with redirects (60 to 44 posts); audience tags on all posts and audience CTAs; hubs at /for-parents, /for-high-school-students and /for-college-students; Book schema; llms.txt grouped by audience with book facts; video block and 4 Shorts embedded; links to the 6 unindexed posts; meta updates (geometry, failing tests, last-minute, what-science-says). Build passed.
