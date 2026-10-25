# The Phuket Edit

Independent, unofficial planning guide for a generic five-night early-December stay at The Pavilions Phuket.

## Architecture

Static HTML, CSS and vanilla JavaScript; no build, dependencies, analytics, backend or credentials. Content lives in `content.js`. Serve the repository root to preview, for example `python -m http.server 8766 --bind 127.0.0.1`.

Implemented: responsive navigation; activity search plus effort, journey, boat and rain filters; device-local favourites; printable six-day/five-night itinerary; dining inclusion badges; practical disclosures; sources; optional attributed photography gallery.

## Content

Includes 18 optional outings, three resort dining venues, nine nearby restaurants, a six-day/five-night itinerary, dated package benchmarks, practical checklists and six licensed destination photographs. Sources were researched 25 October 2026. Quotes are not held or booked; allowances and estimates are labelled separately.

The public guide contains no traveller names, exact trip dates, booking references, private financial arrangements or personal health information.

## Photos

Original CSS/SVG artwork is included. Official hotel photographs must not be republished without permission. `photos` may be added to `content.js` with `src`, `alt`, `caption`, `author`, `source`, `license`, `licenseUrl`, `changes`, `width` and `height`. Preserve attribution beside each photo and applicable share-alike terms; label scenery accurately.

## GitHub Pages

Target: Settings → Pages → Deploy from a branch → `main` → `/ (root)`. `.nojekyll` is included. Relative asset paths support the project URL. No custom domain, workflow token or credential change is needed. The production target is https://zombiez4git.github.io/pavilions-phuket-guide/.

## Verification before publication

- Check desktop and 390px/320px layouts, overflow, image loading and keyboard focus.
- Exercise combined filters, search, empty state, save/un-save and persistence.
- Check print layout, internal anchors and external destinations.
- Verify the repository has no private input packs, credentials or research notes.
- Verify the actual GitHub Pages URL returns the final guide.
