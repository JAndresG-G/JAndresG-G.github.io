# SB 840 Research Notes

Prepared for GitHub Pages publication.

Open `index.html` in a browser to review the series landing page. The folder is designed to publish as `sb840-notes/` inside the academic GitHub Pages project.

## Files

- `index.html`: series landing page.
- `post-1.html`: housing context and SB 840 setup.
- `post-2.html`: legal geography and zoning applicability.
- `post-3.html`: conversion likelihood and financial-gap results.
- `assets/sb840-notes.css`: shared series styles.
- `assets/sb840-notes.js`: small shared script for active navigation and optional lazy embeds.
- `assets/images/`: copied chart and static map previews used by the series.
- `assets/charts/interactive/`: self-contained Plotly HTML for Post 1 affordability charts (~19 MB total).
- `maps/affected/`: interactive affected-parcel viewers for the 18 study cities.
- `maps/results/`: interactive CLI and financial-gap result viewers for the 18 study cities.
- `maps/pmtiles/`: PMTiles archives used by the interactive map viewers.

## Notes

- These files are static and can be opened directly from disk, though the PMTiles viewers should be checked through a local web server before publication.
- The series uses WebP previews for charts and selected static map exports.
- Post 1 interactive chart links use `assets/charts/interactive/` inside this folder.
- Static charts and maps use click-to-enlarge lightboxes with fit-to-view open, zoom, and drag pan (`assets/sb840-notes.js`).
- Regenerate chart copies before publication if the underlying source charts change.
