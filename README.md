# PROJECT ECLIPSE — WebGL Field Edition

PROJECT ECLIPSE is an original third-person sci-fi exploration/action game designed to run in a modern desktop or mobile browser. It uses procedural geometry, physically based Three.js materials, real-time lighting/shadows, fog, particle VFX, synthesized Web Audio, deterministic mission logic, browser saves, controller support, and an Android-friendly touch control layer.

## What is inside

The ZIP is intentionally **flat**. There is no `src/`, `public/`, or outer project folder. Every project file is at the repository root so files can be uploaded individually from GitHub's mobile interface.

Runtime files:

- `index.html` — game shell and UI
- `styles.css` — cinematic interface and responsive mobile HUD
- `game.js` — complete game runtime, missions, AI, combat, puzzles, save system, VFX, audio, mobile controls
- `three` — Three.js 0.186.1 is loaded from its official jsDelivr distribution at runtime (MIT licensed)
- `server.mjs` — production/static server for Render and local Node use
- `build.mjs` — production build validation/copy step

## Requirements

- Node.js 20+ (Render configuration uses Node 24)
- Modern browser with WebGL
- Desktop: keyboard + mouse or gamepad
- Phone/tablet: touch controls are enabled automatically
- No account, API key, or database is required

## Local installation

```bash
npm install
npm run dev
```

Open the address printed by Node. For a production-style local run:

```bash
npm run build
npm start
```

The production server binds to `0.0.0.0` and reads `PORT`, matching Render's web-service requirements.

## GitHub upload — Android/mobile friendly

1. Download and extract the ZIP on your phone.
2. Create a new GitHub repository.
3. On the repository page choose **Add file → Upload files**.
4. Select **all files in the extracted ZIP at once**. Because the project is flat, there are no folders to preserve.
5. Commit directly to `main`.

Do not upload the ZIP itself as the game repository. Upload the files inside it.

## Render deployment

Create a Render **Web Service** connected to the GitHub repository.

Build command:

```text
npm install && npm run build
```

Start command:

```text
npm start
```

The included `render.yaml` also describes these settings. Render web services must bind to `0.0.0.0`; this server does exactly that and uses the platform `PORT` variable.

## Environment variables

None are required. Render automatically provides `PORT`. `.env.example` documents the default local value.

## Controls

Desktop:

- `WASD` move
- `Shift` sprint
- `Space` jump
- `Ctrl` crouch
- `E` interact
- `F` scanner
- `R` energy recharge
- `Tab` inventory
- `Esc` pause
- Left mouse: fire
- Right mouse: aim

Controller: left stick movement, right stick camera, right trigger fire, left trigger aim, A jump, D-pad/face-button interactions vary by browser mapping.

Mobile: left virtual stick moves, right virtual stick looks, and on-screen FIRE / AIM / JUMP / SCAN / USE / CROUCH buttons are available.

## Gameplay

The campaign contains eight connected missions:

1. The Silent Facility — reach the Helix gate
2. Power Restoration — activate field relays
3. Signal Lost — synchronize the communications array
4. The Lower Levels — descend to the laboratories
5. Blackout — restore emergency circuits
6. The Archive — recover the Eclipse record
7. The Core — interface with the reactor
8. Eclipse — defeat the Core Warden and stabilize the facility

Enemies use patrol, alert, chasing, attacking, searching/positioning behaviors and a multi-phase boss pattern. The game has an interaction framework, scanner, checkpoints, upgrades, inventory, mission state, an ending, and credits.

## Graphics

Presets: LOW / MEDIUM / HIGH / ULTRA.

The renderer uses ACES filmic tone mapping, adaptive pixel ratio, PBR-style `MeshStandardMaterial` surfaces, directional shadow mapping, emissive lighting, atmospheric fog, instanced/reusable modular geometry, and a performance-conscious particle system. Mobile devices are intentionally capped to a lower pixel ratio to reduce thermal and GPU pressure.

## Save system

Progress is stored in browser `localStorage`. Autosaves occur at mission/checkpoint changes. No account is needed.

## Accessibility

The UI includes scalable typography, subtitles/mission communication support, adjustable master/music/SFX levels, and a reduced-motion setting. Color is not the only way mission state is communicated.

## Asset and license policy

The game does **not** use copyrighted AAA game assets, ripped content, proprietary music, or scraped game files. Major environment pieces, materials, VFX and audio are generated procedurally/originally in code.

Three.js is an open-source JavaScript 3D library distributed under the MIT license. See https://threejs.org/ and the license text included with the Three.js project.

## Troubleshooting

**Blank/black screen:** use a current browser with WebGL hardware acceleration enabled. The game displays a system-fault panel instead of silently failing.

**No sound:** browsers require a user gesture before Web Audio can start. Press a menu button or tap the screen once.

**Slow performance:** open Settings and choose MEDIUM or LOW. The biggest performance levers are resolution/pixel ratio, shadow quality, particles, and post-processing-style lighting load.

**Render 502 / deploy failure:** confirm the service is a Node Web Service using `npm install && npm run build` and `npm start`. The server binds to `0.0.0.0` and reads `PORT`.

## Quality notes

The project is deliberately asset-light and code-driven. That is what keeps a browser game portable on GitHub/Render and uploadable from Android without a `src/` or `public/` directory. The visual target is achieved through procedural geometry, material variation, cinematic lighting, atmospheric depth, animated machinery details, VFX, responsive controls, and authored mission staging rather than a giant AAA asset dump.
