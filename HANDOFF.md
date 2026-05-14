# JAG Online — Agent Handoff Guide

Site owner: **J. Andres Gamez-Gonzalez** (display: Andres Gamez)  
Repo: `JAndresG-G/JAndresG-G.github.io` (GitHub Pages, auto-deploys from `main`)  
Live URL: https://jandresg-g.github.io  
Local project root: `C:/Users/jorge/JAG_Online`

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

Always use the heredoc commit format above. GitHub Pages typically reflects changes within 30–60 seconds.

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
├── index.html                          # Hero landing page
├── about.html
├── projects.html                       # Signature cards + collections index
├── resume.html
├── blog.html                           # Blog index
├── css/style.css                       # All shared styles
├── js/main.js                          # Year footer, mobile nav, active link
├── favicon.png
├── assets/resume.pdf
├── photos/
│   ├── layout_images/JAG_logo.png      # Nav logo
│   └── projects/                       # Signature card thumbnails
├── blog/
│   ├── graduation-2026.html
│   └── site-launch.html
└── projects/
    ├── data-visualization.html         # Data viz card collection page
    ├── digital-cartography.html
    ├── research-projects.html
    ├── storymaps.html
    ├── montserrat.html
    ├── full.html                        # "Secret" full project repository
    ├── data_visualization/
    │   ├── index.html                  # Denver Transit web app
    │   └── Fort_Worth_Light_Rail/
    │       ├── index.html              # FW Light Rail web app
    │       ├── Fort_Worth_Logo.png
    │       └── Trinity_Metro_Logo.png
    ├── maps/                           # Digital cartography map images
    └── research_projects/              # Research docs + site analysis images
```

---

## Relative Paths — Critical Rule

- Pages in `/projects/` use `../css/style.css`, `../js/main.js`, `../favicon.png`
- Pages in `/blog/` use `../css/style.css`, `../js/main.js`
- Pages in `/projects/data_visualization/Fort_Worth_Light_Rail/` use `../../..` to reach root — but this app has its own self-contained styles, no dependency on site CSS

---

## Updating Text on Existing Pages

Edit the HTML file directly. Every page is plain HTML — no templating, no framework. Nav and footer are copy-pasted across pages, not shared components.

**Do not modify** `css/style.css` or `js/main.js` without understanding their global effect. The CSS uses custom properties (`--accent`, `--bg-card`, `--border`, `--text`, `--text-muted`) defined at root level.

---

## Signature Project Cards (projects.html)

Three cards in `.signature-grid`. Each is an `<a class="project-card project-card--link">` with:
- `href` pointing to the project URL
- `<img class="project-thumbnail">` pointing to `photos/projects/<filename>`
- `<h3>` title, `<p>` description, `.tag-list` with `.tag` spans

Current cards (in order):
1. TCU Neighborhood Commercial District — links to ArcGIS StoryMap (external)
2. Montserrat Mountains Map — links to `projects/montserrat.html`
3. Fort Worth Light Rail — links to `projects/data_visualization/Fort_Worth_Light_Rail/`

To swap a card: replace the `<a>` block between the `<!-- comment -->` and the next card. Keep the comment updated.

---

## Thumbnail Images (photos/projects/)

Current thumbnails:
| File | Used for |
|------|----------|
| `TCU_Neighborhood_Commercial_Analysis.png` | TCU StoryMap |
| `Gamez_Montserrat_Map_5_40.jpg` | Montserrat |
| `FW_Light_Rail_Map.png` | FW Light Rail (active) |
| `FW_Light_Rail_SS.png` | FW Light Rail (old, stale — do not reuse this name) |
| `Denver_Proj_SS.png` | Denver app (not currently on signature cards) |
| `NCTCOG_StoryMap.png` | NCTCOG trail StoryMap |
| `Garmin_Vicoactive_6_Supply_Chain_Storymap.png` | Garmin StoryMap |
| `Los_Glaciares_StoryMap.png` | Los Glaciares StoryMap |

### GitHub Pages CDN Cache — Important

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

### Fort Worth Light Rail App — Key Config (index.html lines 347–358)

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

Sidebar narratives are in the `MAP_CONTENT` object (lines ~370–491). Each tab has `title`, `subtitle`, `accent` (hex color), `step` (number), and `narrative` (HTML string). Edit those to update sidebar text.

### ArcGIS Canvas Screenshot Limitation

ArcGIS maps render on a WebGL canvas. **You cannot capture this with `canvas.toDataURL()`** — it returns a black image. Headless Chrome also fails to load ArcGIS WebMaps (they require a full authenticated browser session).

**The only working method for a screenshot:**
- User takes a screenshot manually (Windows: Win+Shift+S or Snipping Tool) and saves to `C:/Users/jorge/Downloads/`
- Agent finds it with: `ls -t "C:/Users/jorge/Downloads/"*.png | head -3`
- Copy to `photos/projects/` under a new filename, update HTML reference, push

---

## Data Visualization Page (projects/data-visualization.html)

Cards are `.dv-card` divs inside `.dv-grid`. Card order in the HTML is display order.

Current card order:
1. Fort Worth Light Rail (with "View Web App" link to `data_visualization/Fort_Worth_Light_Rail/`)
2. Denver RTD Transit Network (with links to web app and Experience Builder)
3. Fort Worth Urban Infill (map image gallery)
4. Chicago Industry Location Quotients (map image gallery)
5. Elderly Infrastructure Site Analysis (map image gallery)
6. DFW Drinking Establishments (map image gallery)

Cards with image galleries use `.dv-map-grid` — images are clickable and open in a lightbox. Do not remove the `data-caption` attribute or the lightbox JS at the bottom of the file will break.

To add a new card: copy an existing `.dv-card` block, paste it in the desired position, update all content. To reorder: cut and paste the entire `<div class="dv-card">...</div>` block.

---

## Adding a New Web App Page

Follow the pattern used for Fort Worth Light Rail:

1. Create a folder: `projects/data_visualization/<AppName>/`
2. Place `index.html` and any local assets (images, etc.) inside it
3. The app URL will be: `https://jandresg-g.github.io/projects/data_visualization/<AppName>/`
4. Add a `.dv-card` to `data-visualization.html` with a `doc-link` pointing to `data_visualization/<AppName>/`
5. Optionally add a signature card to `projects.html`

---

## Adding a Blog Post

1. Copy an existing post from `/blog/` as a template
2. Use `../css/style.css` and `../js/main.js` (one level up from `/blog/`)
3. Add a new `<li>` entry to `blog.html`

---

## Writing Style Notes (for content edits)

- No em dashes (—). Replace with commas, colons, or restructured sentences.
- Do not bold arbitrary words for emphasis — bold is reserved for colored line names in the FW Light Rail app.
- Avoid AI writing patterns: no "precisely," no dramatic concluding sentences, no "X is the gap this Y aims to close"-style constructions.
- Professional planning report voice: declarative, direct, data-grounded.

---

## Git Identity

```
user.name:  JAndresG-G
user.email: jorgegamez221@gmail.com
```

Do not modify git config. Remote is `https://github.com/JAndresG-G/JAndresG-G.github.io.git`.

---

## What Does Not Work

| Approach | Why it fails |
|----------|-------------|
| `canvas.toDataURL()` on ArcGIS maps | WebGL canvas blocks cross-origin reads |
| Headless Chrome screenshot of ArcGIS app | WebMaps require full authenticated browser session to load tiles |
| Updating an image in-place and expecting GitHub Pages to serve it | CDN caches by filename — must rename to bust |
| `python -m playwright` or `puppeteer` | Not installed on this machine |
