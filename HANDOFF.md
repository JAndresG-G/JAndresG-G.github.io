# JAG Online â€” Agent Handoff Guide

Site owner: **J. Andres Gamez-Gonzalez** (display: Andres Gamez)  
Repo: `JAndresG-G/JAndresG-G.github.io` (GitHub Pages, auto-deploys from `main`)  
Live URL: https://jandresg-g.github.io  
Local project root: `C:/Users/jorge/JAG_Online`

---

## Owner Status (as of May 2026)

Andres **graduated May 9, 2026** with dual degrees:
- Bachelor of Arts in History
- Bachelor of Science in Geography
- Texas Christian University, AddRan College of Liberal Arts

He is a working professional, not a student. All bio language should reflect this. Do **not** use:
- "Senior at TCU", "finishing degrees", "expecting to graduate"
- "seeking", "actively seeking", "looking for opportunities", "eager to translate", "ready to grow"

Present him as a credentialed GIS Analyst and Cartographer. Let the degrees and work speak.

---

## Deployment

All changes deploy automatically when pushed to `main`. No build step. No CI config needed.

```bash
git add <file(s)>
git commit -m "$(cat <<'EOF'
Short description of change

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
EOF
)"
git push
```

Always use the heredoc commit format above. GitHub Pages typically reflects changes within 30â€“60 seconds.

---

## Dev Server

Configured in `.claude/launch.json`. Start with:

```bash
python -m http.server 3000
```

Or use the `preview_start` tool with name `"JAG Online"` (port 3000).

---

## Site Structure

```
JAG_Online/
â”œâ”€â”€ index.html                          # Hero landing page
â”œâ”€â”€ about.html
â”œâ”€â”€ projects.html                       # Signature cards + collections index
â”œâ”€â”€ resume.html
â”œâ”€â”€ blog.html                           # Blog index
â”œâ”€â”€ css/style.css                       # All shared styles
â”œâ”€â”€ js/main.js                          # Year footer, mobile nav, active link
â”œâ”€â”€ favicon.png
â”œâ”€â”€ assets/resume.pdf
â”œâ”€â”€ photos/
â”‚   â”œâ”€â”€ layout_images/JAG_logo.png      # Nav logo
â”‚   â”œâ”€â”€ headshot/JAG_headshot_2.jpeg    # Active headshot (index + about)
â”‚   â””â”€â”€ projects/                       # Card thumbnails
â”œâ”€â”€ blog/
â”‚   â”œâ”€â”€ graduated.html                  # Post-graduation reflection (May 2026)
â”‚   â”œâ”€â”€ graduation-2026.html            # Pre-graduation invitation (March 2026, archived)
â”‚   â”œâ”€â”€ site-launch.html
â”‚   â””â”€â”€ grad_blog_photos/               # Photos used in graduated.html
â””â”€â”€ projects/
    â”œâ”€â”€ data-visualization.html         # Data viz card collection page
    â”œâ”€â”€ digital-cartography.html
    â”œâ”€â”€ research-projects.html
    â”œâ”€â”€ storymaps.html
    â”œâ”€â”€ montserrat.html
    â”œâ”€â”€ full.html                        # "Secret" full project repository
    â”œâ”€â”€ data_visualization/
    â”‚   â”œâ”€â”€ index.html                  # Denver Transit web app
    â”‚   â”œâ”€â”€ FW_Light_Rail_Project_Final_Report.docx
    â”‚   â”œâ”€â”€ Fort_Worth_Light_Rail/
    â”‚   â”‚   â”œâ”€â”€ index.html              # FW Light Rail web app
    â”‚   â”‚   â”œâ”€â”€ Fort_Worth_Logo.png
    â”‚   â”‚   â””â”€â”€ Trinity_Metro_Logo.png
    â”‚   â””â”€â”€ FWNC_Final_Deliverables/
    â”‚       â”œâ”€â”€ Documentation/FWNC_Project_Report.docx
    â”‚       â””â”€â”€ Final_Maps/             # PNG + PDF for each of 3 maps
    â”œâ”€â”€ maps/                           # Digital cartography map images
    â””â”€â”€ research_projects/              # Research docs + site analysis images
```

---

## Relative Paths â€” Critical Rule

- Pages in `/projects/` use `../css/style.css`, `../js/main.js`, `../favicon.png`
- Pages in `/blog/` use `../css/style.css`, `../js/main.js`
- Pages in `/projects/data_visualization/Fort_Worth_Light_Rail/` use `../../..` to reach root â€” but this app has its own self-contained styles, no dependency on site CSS

---

## Updating Text on Existing Pages

Edit the HTML file directly. Every page is plain HTML â€” no templating, no framework. Nav and footer are copy-pasted across pages, not shared components.

**Do not modify** `css/style.css` or `js/main.js` without understanding their global effect. The CSS uses custom properties (`--accent`, `--bg-card`, `--border`, `--text`, `--text-muted`) defined at root level.

---

## Headshot

Active file: `photos/headshot/JAG_headshot_2.jpeg`  
Used in: `index.html` (`.home-intro-photo`) and `about.html` (`.about-photo`)

When replacing: copy new file with a new filename (do not reuse old names), update both HTML references, commit both.

---

## Signature Project Cards (projects.html)

Three cards in `.signature-grid`. Each is an `<a class="project-card project-card--link">` with:
- `href` pointing to the project URL
- `<img class="project-thumbnail">` pointing to `photos/projects/<filename>`
- `<h3>` title, `<p>` description, `.tag-list` with `.tag` spans

Current cards (in order):
1. TCU Neighborhood Commercial District â€” links to ArcGIS StoryMap (external)
2. Montserrat Mountains Map â€” links to `projects/montserrat.html`
3. Fort Worth Light Rail â€” links to `projects/data_visualization/Fort_Worth_Light_Rail/`

To swap a card: replace the `<a>` block between the `<!-- comment -->` and the next card. Keep the comment updated.

---

## Thumbnail Images (photos/projects/)

| File | Used for |
|------|----------|
| `TCU_Neighborhood_Commercial_Analysis.png` | TCU StoryMap |
| `Gamez_Montserrat_Map_5_40.jpg` | Montserrat |
| `FW_Light_Rail_Map.png` | FW Light Rail (active) |
| `FW_Light_Rail_SS.png` | FW Light Rail (old, stale â€” do not reuse this name) |
| `Denver_Proj_SS.png` | Denver app (not currently on signature cards) |
| `NCTCOG_StoryMap.png` | NCTCOG trail StoryMap |
| `Garmin_Vicoactive_6_Supply_Chain_Storymap.png` | Garmin StoryMap |
| `Los_Glaciares_StoryMap.png` | Los Glaciares StoryMap |
| `Samuel_Guy_Inman_StoryMap.png` | Samuel Guy Inman StoryMap |
| `Consumption_Analysis_StoryMap.png` | Consumption Analysis StoryMap |
| `HEB_DFW_StoryMap.png` | H-E-B DFW Locations StoryMap |

### GitHub Pages CDN Cache â€” Important

GitHub Pages aggressively caches images. If you update an image file in place (same filename), the live site may serve the old version for hours.

**The only reliable fix: rename the file.**

If replacing a thumbnail:
1. Copy the new image to `photos/projects/` with a **new filename**
2. Update the `src` in the HTML to the new filename
3. Commit and push both files
4. Do NOT reuse the old filename

---

## ArcGIS Web App Pages

The Denver and Fort Worth apps are self-contained HTML files with embedded JavaScript. They load ArcGIS Maps SDK from CDN and connect to ArcGIS Online feature layers and WebMaps.

### Fort Worth Light Rail App â€” Key Config (index.html lines 347â€“358)

```javascript
const WEBMAP_IDS = {
  network:      "38dd6a722a42471fb614bf47db2124f4",
  stations:     "85f55e4729e24bb4877110521841a14c",
  demand:       "130153a9c13640a183acbbdb8e4368b7",
  connectivity: "4b80e5b403114773a86e864fd1dc8761",
};
const CATCHMENT_URL  = "https://services.arcgis.com/Ywxx29kRZEPq7K5N/arcgis/rest/services/FW_Stations_Stats_WFL1/FeatureServer/0";
const RL_STATIONS_URL = "https://services.arcgis.com/Ywxx29kRZEPq7K5N/arcgis/rest/services/FW_Rail_Stations/FeatureServer/2";
```

Sidebar narratives are in the `MAP_CONTENT` object (lines ~370â€“491). Each tab has `title`, `subtitle`, `accent` (hex color), `step` (number), and `narrative` (HTML string). Edit those to update sidebar text.

### ArcGIS Canvas Screenshot Limitation

ArcGIS maps render on a WebGL canvas. **You cannot capture this with `canvas.toDataURL()`** â€” it returns a black image. Headless Chrome also fails to load ArcGIS WebMaps (they require a full authenticated browser session).

**The only working method for a screenshot:**
- User takes a screenshot manually (Windows: Win+Shift+S or Snipping Tool) and saves to `C:/Users/jorge/Downloads/`
- Agent finds it with: `ls -t "C:/Users/jorge/Downloads/"*.png | head -3`
- Copy to `photos/projects/` under a new filename, update HTML reference, push

---

## Data Visualization Page (projects/data-visualization.html)

Cards are `.dv-card` divs inside `.dv-grid`. Card order in the HTML is display order.

Current card order:
1. Fort Worth Light Rail â€” web app link + Project Report download (`data_visualization/FW_Light_Rail_Project_Final_Report.docx`)
2. Fort Worth Nature Center iNaturalist Biodiversity Mapping â€” map gallery + 4 doc links (report + 3 map PDFs)
3. Denver RTD Transit Network â€” web app + Experience Builder links
4. Fort Worth Urban Infill â€” map image gallery
5. Chicago Industry Location Quotients â€” map image gallery
6. Elderly Infrastructure Site Analysis â€” map image gallery
7. DFW Drinking Establishments â€” map image gallery

Cards with image galleries use `.dv-map-grid` â€” images are clickable and open in a lightbox. Do not remove the `data-caption` attribute or the lightbox JS at the bottom of the file will break.

To add a new card: copy an existing `.dv-card` block, paste it in the desired position, update all content. To reorder: cut and paste the entire `<div class="dv-card">...</div>` block.

---

## StoryMaps Page (projects/storymaps.html)

Cards are `<a class="project-card project-card--link">` inside `.projects-grid`. Each links directly to the published ArcGIS StoryMap.

Current card order:
1. Samuel Guy Inman â€” Biographical Portfolio (`storymaps.arcgis.com/stories/d869e5de6ac14655907f8387686a4ca4`)
2. TCU Neighborhood Commercial District Analysis
3. Garmin VÃ­voactive 6 â€” Global Supply Chain Analysis
4. H-E-B DFW Locations Analysis (`storymaps.arcgis.com/stories/9b3cd6a379624534a02c69ce128541c4`)
5. Consumption Analysis â€” 7 Days of Spending (`storymaps.arcgis.com/stories/775a80026a5c416eab0ae81266e5c397`)
6. Los Glaciares National Park, Argentina
7. DFW Regional Trail Use â€” 2024â€“2025 (NCTCOG)

---

## Full Repository (projects/full.html)

The full repository is the single source of truth for every project. Whenever a project is added to any collection page, it must also be added to the corresponding section in `full.html`.

Each project appears exactly once in `full.html`. Some projects are cross-listed on multiple collection pages (e.g. Elderly Infrastructure is on both `research-projects.html` and `data-visualization.html`; the NCTCOG trail StoryMap is on both `storymaps.html` and the collaborations section of `projects.html`). In the full repository each is placed in a single section: Elderly Infrastructure lives under Research Projects; DFW Regional Trail Use (NCTCOG) lives under Professional Research Collaborations.

There is no Signature Projects section in `full.html`. The signature projects shown on `projects.html` (currently the SB 840 tile, Montserrat, and Fort Worth Light Rail) each already appear in another section here, so they are not duplicated into a signature block.

Sections in order:
1. **StoryMaps** â€” thumbnail cards (`.sig-grid`) â€” mirrors `storymaps.html` (minus the NCTCOG trail StoryMap, which lives under Collaborations)
2. **Digital Cartography** â€” map gallery (`.map-gallery`)
3. **Research Projects** â€” `.repo-card` with doc links
4. **Data Visualization** â€” `.repo-card` with doc links and/or image grids â€” mirrors `data-visualization.html` (minus Elderly Infrastructure, which lives under Research Projects)
5. **Professional Research Collaborations** â€” `.collab-card`

Image grids in full.html use `.repo-map-grid` (not `.dv-map-grid`). Lightbox JS is at the bottom of the file and handles both grid types.

---

## Resume Page (resume.html)

Section order:
1. Education
2. Relevant Experience
3. Honors & Awards (honor societies as named entries with initiation dates, then awards bullet list)
4. Campus Involvement
5. Skills

### Honor Societies (in Honors & Awards)
These are lifetime memberships â€” displayed as named entries with initiation date only, not date ranges.
- Phi Beta Kappa â€” Delta of Texas Chapter (Initiated May 2026)
- Gamma Theta Upsilon â€” Kappa Epsilon Chapter (Initiated 2023)
- Phi Alpha Theta â€” Eta-Kappa Chapter (Initiated 2023)

### Adding a New Entry
Copy an existing `.resume-entry` block. Each entry has a `.resume-entry-header` with `<h3>` and `.date`, followed by `.role` and content.

---

## Adding a Blog Post

1. Copy an existing post from `/blog/` as a template
2. Use `../css/style.css` and `../js/main.js` (one level up from `/blog/`)
3. Add a new `<li>` entry at the **top** of the list in `blog.html`

Current posts (newest first):
1. `graduated.html` â€” I Graduated (May 2026)
2. `site-launch.html` â€” The Site is Live! (March 2026)
3. `graduation-2026.html` â€” Graduating May 2026 (March 2026, pre-graduation invitation â€” archived, do not update content)

### Blog Photos
Store post-specific photos in a subfolder under `/blog/`, e.g. `blog/grad_blog_photos/`. Reference them with a relative path from the post file. Use URL encoding for filenames with spaces (`%20`).

---

## Writing Style Notes (for content edits)

- No em dashes (â€”). Replace with commas, colons, or restructured sentences.
- Do not bold arbitrary words for emphasis â€” bold is reserved for colored line names in the FW Light Rail app.
- Avoid AI writing patterns: no "precisely," no dramatic concluding sentences, no "X is the gap this Y aims to close"-style constructions.
- Professional planning report voice: declarative, direct, data-grounded.
- Do not use "seeking", "looking for opportunities", or any language that frames Andres as a job-hunter.

---

## Git Identity

```
user.name:  JAndresG-G
user.email: j.andres.gamez.g@gmail.com
```

Do not modify git config. Remote is `https://github.com/JAndresG-G/JAndresG-G.github.io.git`.

---

## What Does Not Work

| Approach | Why it fails |
|----------|-------------|
| `canvas.toDataURL()` on ArcGIS maps | WebGL canvas blocks cross-origin reads |
| Headless Chrome screenshot of ArcGIS app | WebMaps require full authenticated browser session to load tiles |
| Updating an image in-place and expecting GitHub Pages to serve it | CDN caches by filename â€” must rename to bust |
| `python -m playwright` or `puppeteer` | Not installed on this machine |
