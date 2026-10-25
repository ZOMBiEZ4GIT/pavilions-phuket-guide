# The Phuket Edit

Independent, unofficial planning guide for a generic five-night early-December stay at The Pavilions Phuket.

## Architecture

Static HTML, CSS and vanilla JavaScript; no build, dependencies, analytics, backend or credentials. Content lives in `content.js`. Serve the repository root to preview, for example `python -m http.server 8766 --bind 127.0.0.1`.

Implemented: responsive navigation; activity search plus effort, journey, boat and rain filters; device-local favourites; printable six-day/five-night itinerary; dining inclusion badges; practical disclosures; sources; optional attributed photography gallery.

## Content status

The layout and initial resort sections are implemented. The researched activity catalog, wider restaurant list, licensed photographs and final practical content still need integration before publication. The activity array is intentionally empty until verified content is available. Do not treat this draft as a complete holiday guide.

All prices are indicative planning estimates, never confirmed bookings. Never add traveller names, booking references, private financial arrangements, private addresses or personal medical information.

## Photos

Original CSS/SVG artwork is included. Official hotel photographs must not be republished without permission. `photos` may be added to `content.js` with `src`, `alt`, `caption`, `author`, `source`, `license`, `licenseUrl`, `changes`, `width` and `height`. Preserve attribution beside each photo and applicable share-alike terms; label scenery accurately.

## GitHub Pages

Target: Settings → Pages → Deploy from a branch → `main` → `/ (root)`. `.nojekyll` is included. Relative asset paths support the project URL. No custom domain, workflow token or credential change is needed. Enable only once the complete content and responsive checks pass.

## Verification before publication

- Check desktop and 390px/320px layouts, overflow, image loading and keyboard focus.
- Exercise combined filters, search, empty state, save/un-save and persistence.
- Check print layout, internal anchors and external destinations.
- Verify the repository has no private input packs, credentials or research notes.
- Verify the actual GitHub Pages URL returns the final guide.
