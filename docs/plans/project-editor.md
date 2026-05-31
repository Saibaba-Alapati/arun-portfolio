# Project Editor — Implementation Plan

**Status:** Locked — ready for implementation  
**Last updated:** 2026-05-31

---

## 1. Where content lives today

All project content is a single TypeScript file:

```
data/projects.ts
```

It exports a typed `projects` array with the following shape per project:

| Field | Type | Purpose |
|---|---|---|
| `slug` | `string` | URL key (`/projects/keventers`) |
| `title` | `string` | Brand name |
| `category` | `string` | E.g. "Beverage Brand" |
| `thumbnail` | `string` | Path to hero image |
| `year` | `string` | Year of work |
| `tags` | `string[]` | Pill tags shown on cards |
| `tagline` | `string` | One-line hook on gallery card |
| `caseNumber` | `string` | E.g. "Case Study 01" |
| `context` | `string?` | Optional context box text |
| `heading` | `string` | H2 text (multi-line, `\n` separated) |
| `headingEm` | `string` | Italic part of the H2 |
| `framework` | `FwCard[]` | 2–4 cards (label + body HTML) |
| `images` | `string[]` | Array of image paths |
| `learning` | `string` | Learning card quote |
| `stats` | `{value,label}[]?` | Optional stat highlight boxes |
| `campaignLink` | `{label,url}?` | Optional play-button link strip |
| `externalLink` | `{label,url}?` | Optional "Watch Reel" tag |

This file is **compiled at build time** by Next.js. The portfolio is fully static — no database, no server. Changing `projects.ts` and running `npm run build` (or pushing to Vercel) updates the live site.

---

## 2. The problem the editor solves

Editing `projects.ts` directly requires:
- Opening a code editor
- Knowing TypeScript syntax
- Manually updating every field
- Risk of syntax errors breaking the build

The editor gives a **visual page-builder UI** to update any project field, then writes the result back to disk as valid JSON — no code editing required.

---

## 3. Architecture

### 3a. Data format migration

**Change data source from TypeScript to JSON.**

Before (current): `data/projects.ts` — a TypeScript module  
After: `data/projects.json` — pure JSON file

Types move to a separate `data/types.ts` (types only, no data).

Why JSON:
- A Node.js script (the editor server) can read/write JSON with `fs.readFileSync` / `fs.writeFileSync` in two lines
- Writing valid TypeScript from a server is fragile (template strings, escaping, etc.)
- Next.js imports JSON natively (`import projects from './projects.json'`)
- Git diffs of JSON are clean and readable

### 3b. Editor placement

The editor lives **inside the portfolio repository** — pushed to GitHub, but excluded from Vercel deploys via `.vercelignore`.

```
my-portfolio-next/
├── app/                      ← Next.js portfolio (deployed to Vercel)
├── data/
│   ├── projects.json         ← shared data source (read by portfolio + editor)
│   └── types.ts              ← TypeScript types only
├── editor/                   ← LOCAL ONLY — in GitHub, never deployed to Vercel
│   ├── package.json          ← separate dependencies (express, grapesjs, etc.)
│   ├── server.js             ← Node.js server
│   └── ui/
│       └── index.html        ← Single-page editor UI (GrapesJS embedded)
├── .vercelignore             ← tells Vercel to skip editor/
└── package.json              ← adds "editor" script
```

`.vercelignore`:
```
editor/
docs/
```

Vercel literally never sees the `editor/` files — it's not a runtime check, just a file exclusion at upload time. The full code is safely version-controlled on GitHub.

### 3c. No authentication

The editor runs exclusively on `localhost:3001`. Since it is never reachable over the network and never deployed, no passkey, login screen, or session management is needed. The server accepts all requests unconditionally.

### 3d. Editor server

A minimal **Express.js** server (`editor/server.js`):

- Reads `../data/projects.json` on startup
- Serves `editor/ui/index.html` (the GrapesJS UI)
- Exposes a REST API:
  - `GET  /api/projects` — returns current JSON
  - `PUT  /api/projects/:slug` — updates one project, writes file
  - `POST /api/projects` — adds a new project
  - `DELETE /api/projects/:slug` — removes a project
  - `PATCH /api/projects/reorder` — saves new project order
  - `POST /api/publish` — runs `git add → git commit → git push` via `child_process`
- Handles image uploads: `POST /api/upload` — saves file to `../public/assets/`

### 3e. Running the editor

Add to `my-portfolio-next/package.json`:

```json
"scripts": {
  "editor": "cd editor && node server.js"
}
```

Workflow:
```
npm run dev      ← starts portfolio on localhost:3000
npm run editor   ← starts editor on localhost:3001 (second terminal)
```

Open `localhost:3001` — no login, straight into the editor.

---

## 4. Page builder — GrapesJS

### Why GrapesJS

After evaluating open source options:

| Option | Notes |
|---|---|
| **GrapesJS** | ✅ Chosen. Vanilla JS, 25k+ GitHub stars, 10+ years in production, 100+ plugins, embeds in plain HTML with no framework dependency |
| Puck | React-only — would require adding React to the editor. Less mature. |
| Craft.js | React-only. No advantage over Puck for this use case. |
| Build our own | Significant effort with no benefit over GrapesJS. |

### How GrapesJS is used here

The project page has a **fixed template** — we're not doing free-form layout building. GrapesJS is configured in **constrained mode**:

- The canvas renders a live preview of the project page using the real portfolio CSS
- The template structure is locked (users cannot drag sections around or delete layout blocks)
- Each data field (heading, framework cards, stats, etc.) is a GrapesJS component with its content editable
- GrapesJS's built-in style manager and layer panel are hidden — only the content editor is exposed
- On save, GrapesJS exports the content values (not raw HTML) and the server maps them back to the `projects.json` schema

This gives the feel of editing a live page without the complexity of a free-form builder.

### CRUD operations supported

- ✅ Edit existing projects (all fields)
- ✅ Add new project (clones a blank template)
- ✅ Delete project (with confirmation dialog)
- ✅ Reorder projects (drag handles in the sidebar — changes gallery display order)

---

## 5. Image management

Images are managed **inside the editor** via drag-and-drop upload:

- The editor UI has an image drop zone / file picker
- Dropped files are sent to `POST /api/upload` on the server
- The server saves them to `../public/assets/` and returns the public path
- The path is inserted into the relevant field (`thumbnail` or `images[]`)
- Existing images are shown as previews in the editor

No manual file management in Finder/Explorer required.

---

## 6. Publish flow

A **"Publish" button** in the editor UI triggers a full deploy:

```
Click "Publish" in editor UI
     ↓
POST /api/publish (editor server)
     ↓
server runs via child_process:
  git add data/projects.json
  git commit -m "content: update projects [editor]"
  git push
     ↓
Vercel detects push → rebuilds → live site updated (~30s)
     ↓
Editor UI shows "Published ✓" or error message
```

Server-side implementation (~10 lines):
```js
const { execSync } = require('child_process');
app.post('/api/publish', (req, res) => {
  try {
    execSync('git add ../data/projects.json', { cwd: __dirname });
    execSync('git commit -m "content: update projects [editor]"', { cwd: __dirname });
    execSync('git push', { cwd: __dirname });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
```

---

## 7. What's NOT in scope

- Passkey / authentication (not needed — local only)
- Rich text beyond bold/italic in framework card bodies
- Multi-user support
- Cloud hosting of the editor
- Editing the portfolio's visual design or layout

---

## 8. Implementation phases

### Phase 1 — Data migration
- [ ] Create `data/types.ts` (move types out of `projects.ts`)
- [ ] Convert `data/projects.ts` → `data/projects.json`
- [ ] Update all portfolio imports to use the JSON file
- [ ] Verify build still passes

### Phase 2 — Editor server
- [ ] Create `editor/package.json` with express + multer dependencies
- [ ] Write `editor/server.js` with full REST API (CRUD + upload + publish)
- [ ] Add `"editor"` script to root `package.json`

### Phase 3 — GrapesJS UI
- [ ] Build `editor/ui/index.html` with GrapesJS embedded
- [ ] Define fixed project page template as GrapesJS canvas
- [ ] Lock template structure; expose only content editing
- [ ] Wire sidebar: project list, add, delete, reorder
- [ ] Wire save (auto-save on blur + explicit Save button)
- [ ] Wire Publish button → `/api/publish`

### Phase 4 — Image management
- [ ] Add image drop zone / file picker in editor UI
- [ ] Wire to `POST /api/upload`
- [ ] Show image previews for `thumbnail` and `images[]`

### Phase 5 — Polish
- [ ] Add "Reorder projects" drag handles in sidebar
- [ ] Add `.vercelignore` with `editor/` and `docs/`
- [ ] Test all CRUD operations end-to-end
- [ ] Test Publish flow (git commit + push)
- [ ] Document usage in README

---

## 9. Decisions log

| Question | Decision |
|---|---|
| CRUD scope | Full: edit + add + delete + reorder |
| Image management | Upload via editor UI (drag-and-drop → `public/assets/`) |
| Page builder | GrapesJS — open source, vanilla JS, fixed-template constrained mode |
| Deploy trigger | "Publish" button → `git commit + push` via `child_process` |
| Session / auth | None — local only, no auth needed |
| GitHub | Editor pushed to GitHub; excluded from Vercel via `.vercelignore` |
