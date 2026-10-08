# CSV cleanup and live-update offerings

Prepared September 27, 2026. Both complete listings and covers are prepared locally for manual entry into Upwork. Return the CSV listing first, then Live Updates when the user asks for the next one.

| Offering | Complete listing | Cover | Price | Days | Revisions |
|---|---|---|---|---|---|
| CSV Cleanup & Record Matching | [Guide](csv-cleanup-record-matching-listing.md) | [PNG](csv-cleanup-record-matching-cover.png) | $500 | 5 | 1 |
| Live Updates & In-App Notifications | [Guide](live-updates-notifications-listing.md) | [PNG](live-updates-notifications-cover.png) | $1,000 | 7 | 2 |

Both use one tier, no add-ons, and maximum simultaneous projects of 1 per listing.

- CSV: two files, 10,000 combined rows, 20 columns per file, 20 MB combined, one record type, five cleanup rules, three matching fields. Uncertain matches remain review candidates. Deliver cleaned files, row/match accounting, exceptions, a summary, and a reusable Python script. One revision uses the same input files.
- Live updates: one existing app view and event source, up to three event types, one selected streaming transport, existing auth/read API, an in-app alert component, access/reconnection checks, and a staging demonstration. Open-app updates only. Durable history, offline replay, push/email/SMS, new infrastructure, scaling, and production deployment are separate.

Source material checked: the user's analytics experience and SolPulse real-time work in the local portfolio; current Upwork data-cleaning category; pandas CSV/merge documentation; MDN SSE and Socket.IO delivery documentation. No unsupported GERS or customer-results claims were added.

The guides include exact form copy, requirements, steps, summaries, five FAQs, conditional checkbox guidance, and scope limits. All constrained fields were validated.

## Cover prompts

Both covers use built-in image generation. Exact prompts:
- [CSV prompt](csv-cleanup-record-matching-cover.prompt.txt)
- [Live-updates prompt](live-updates-notifications-cover.prompt.txt)

Original portfolio media and earlier listing files are preserved.

