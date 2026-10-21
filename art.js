/* =====================================================================
   Sonance — procedural "photographs" (placeholders: swap for real images)
   Every scene is an SVG string. Portrait scenes are 100x125, landscape 160x90.
   ===================================================================== */
let _uid = 0;
const GRAIN = `<filter id="G" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .55 0"/></filter>`;

function scene({ w = 100, h = 125, bg, body = "", blur = 0.8, vignette = 0.35, grain = 0.18, extraDefs = "" }) {
  const u = "s" + _uid++;
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
<defs>${bg.defs || ""}${extraDefs.replace(/#U/g, "#" + u).replace(/id="U/g, `id="${u}`)}
<filter id="${u}b" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="${blur}"/></filter>
<radialGradient id="${u}v" cx="50%" cy="50%" r="75%"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="${vignette}"/></radialGradient>
<filter id="${u}n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .5  0 0 0 0 .5  0 0 0 .9 0"/></filter></defs>
<rect width="${w}" height="${h}" fill="${bg.fill}"/>
<g filter="url(#${u}b)">${body.replace(/#U/g, "#" + u)}</g>
<rect width="${w}" height="${h}" fill="url(#${u}v)"/>
<rect width="${w}" height="${h}" filter="url(#${u}n)" opacity="${grain}" style="mix-blend-mode:overlay"/></svg>`;
}
const lin = (id, c1, c2, x2 = 0, y2 = 1) => ({ defs: `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`, fill: `url(#${id})` });
const solid = (c) => ({ fill: c, defs: "" });
let _g = 0;
const lg = (c1, c2, x2 = 0, y2 = 1) => lin("lg" + _g++, c1, c2, x2, y2);
const glow = (id, cx, cy, r, c, o = 0.9) => `<radialGradient id="${id}" cx="${cx}%" cy="${cy}%" r="${r}%"><stop offset="0" stop-color="${c}" stop-opacity="${o}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;

/* generic person (portrait box 100x125) */
function person({ bg, skin = "#d9a88a", hair = "#1b1410", style = "short", shirt = "#222", glasses = null, beard = false, cx = 50, cy = 46, s = 1, light = null, collar = null, blur = 1.1 }) {
  const id = "p" + _uid++;
  const rx = 17 * s, ry = 21 * s;
  const hairBack = {
    short: `<ellipse cx="${cx}" cy="${cy - 6 * s}" rx="${21 * s}" ry="${23 * s}" fill="${hair}"/>`,
    bob: `<path d="M${cx - 25 * s} ${cy + 24 * s}c-7-42 6-54 ${25 * s}-54s${32 * s} 12 ${25 * s} 54l-7 3c0-16-2-32-${18 * s}-32s-${18 * s} 16-${18 * s} 32z" fill="${hair}"/>`,
    white: `<ellipse cx="${cx}" cy="${cy - 8 * s}" rx="${25 * s}" ry="${24 * s}" fill="${hair}"/>`,
    curly: `<g fill="${hair}"><circle cx="${cx - 14 * s}" cy="${cy - 14 * s}" r="${10 * s}"/><circle cx="${cx}" cy="${cy - 20 * s}" r="${12 * s}"/><circle cx="${cx + 14 * s}" cy="${cy - 14 * s}" r="${10 * s}"/><circle cx="${cx - 21 * s}" cy="${cy}" r="${9 * s}"/><circle cx="${cx + 21 * s}" cy="${cy}" r="${9 * s}"/><circle cx="${cx - 22 * s}" cy="${cy + 14 * s}" r="${8 * s}"/><circle cx="${cx + 22 * s}" cy="${cy + 14 * s}" r="${8 * s}"/></g>`,
    none: "",
  }[style];
  const defs = `<radialGradient id="${id}f" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".38"/></radialGradient><linearGradient id="${id}n" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>` + (light ? `<linearGradient id="${id}l" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${light[0]}" stop-opacity=".6"/><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="${light[1]}" stop-opacity=".65"/></linearGradient>` : "");
  const neckW = 17 * s;
  const body = `<path d="M${cx - 52 * s} 130c2-${24 * s} ${20 * s}-${34 * s} ${52 * s}-${36 * s}s${50 * s} ${12 * s} ${52 * s} ${36 * s}z" fill="${shirt}"/><path d="M${cx - 52 * s} 130c2-${24 * s} ${20 * s}-${34 * s} ${52 * s}-${36 * s}s${50 * s} ${12 * s} ${52 * s} ${36 * s}z" fill="#000" opacity=".18"/>${collar ? `<path d="M${cx - 22 * s} ${cy + 36 * s}l${22 * s} ${26 * s} ${22 * s}-${26 * s}z" fill="${collar}"/>` : ""}<path d="M${cx - neckW / 2} ${cy + 14 * s}h${neckW}l${4 * s} ${26 * s}h-${neckW + 8 * s}z" fill="${skin}"/><path d="M${cx - neckW / 2} ${cy + 14 * s}h${neckW}l${4 * s} ${26 * s}h-${neckW + 8 * s}z" fill="url(#${id}n)"/>`;
  const face = `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${skin}"/><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${id}f)"/>`;
  const front = style === "short" || style === "white" ? `<path d="M${cx - 18 * s} ${cy - 6 * s}c0-22 ${36 * s}-22 ${36 * s} 0c-${6 * s}-8-${30 * s}-8-${36 * s} 0z" fill="${hair}"/>` : style === "curly" ? `<path d="M${cx - 17 * s} ${cy - 10 * s}c4-12 ${30 * s}-12 ${34 * s} 0c-${8 * s}-5-${26 * s}-5-${34 * s} 0z" fill="${hair}"/>` : "";
  const eyes = `<g fill="#1a110c" opacity=".55"><ellipse cx="${cx - 7 * s}" cy="${cy + 1 * s}" rx="${2.2 * s}" ry="${1 * s}"/><ellipse cx="${cx + 7 * s}" cy="${cy + 1 * s}" rx="${2.2 * s}" ry="${1 * s}"/></g><path d="M${cx - 1 * s} ${cy + 3 * s}q${1.4 * s} ${5 * s} ${-1 * s} ${6 * s}" stroke="#000" stroke-opacity=".18" stroke-width="${1 * s}" fill="none"/><ellipse cx="${cx}" cy="${cy + 13 * s}" rx="${4.4 * s}" ry="${1.2 * s}" fill="#6a2c28" opacity=".6"/>`;
  const gl = glasses ? `<g fill="none" stroke="${glasses}" stroke-width="${2 * s}"><rect x="${cx - 15 * s}" y="${cy - 5 * s}" width="${13 * s}" height="${9 * s}" rx="${2.5 * s}"/><rect x="${cx + 2 * s}" y="${cy - 5 * s}" width="${13 * s}" height="${9 * s}" rx="${2.5 * s}"/><path d="M${cx - 2 * s} ${cy - 1 * s}h${4 * s}"/></g>` : "";
  const bd = beard ? `<path d="M${cx - 16 * s} ${cy + 4 * s}c2 ${22 * s} ${30 * s} ${22 * s} ${32 * s} 0c-${4 * s} ${8 * s}-${28 * s} ${8 * s}-${32 * s} 0z" fill="${hair}" opacity=".92"/>` : "";
  const inner = `${hairBack}${body}${face}${front}${eyes}${gl}${bd}${light ? `<rect width="100" height="125" fill="url(#${id}l)" style="mix-blend-mode:screen"/>` : ""}`;
  return scene({ bg: typeof bg === "string" ? solid(bg) : bg, body: inner, blur, extraDefs: defs });
}

const ART = {
  /* ---------------- hero (landscape) ---------------- */
  hero: () => scene({ w: 160, h: 90, bg: lg("#2f7aa0", "#173f5e", 1, 0.2), blur: 1.6, grain: 0.22, vignette: 0.45,
    extraDefs: `<radialGradient id="U g1" cx="55%" cy="45%" r="50%"><stop offset="0" stop-color="#cfe6f2" stop-opacity=".85"/><stop offset="1" stop-color="#cfe6f2" stop-opacity="0"/></radialGradient>`.replace('id="U g1"', 'id="Ug1"'),
    body: `<rect width="160" height="90" fill="url(#Ug1)"/><path d="M70 20c4-14 40-14 46 6l6 36c-4 14-14 10-18 4l-4-26c-8-8-20-6-28 2z" fill="#1d2a38" opacity=".92"/><ellipse cx="94" cy="46" rx="19" ry="25" fill="#8eaec4"/><path d="M72 40c0-22 44-24 44 4-6-14-34-14-44-4z" fill="#1b2634"/><path d="M80 48q4-3 8 0M98 48q4-3 8 0" stroke="#27394a" stroke-width="1.4" fill="none"/><path d="M89 62q6 3 12 0" stroke="#6b6f86" stroke-width="1.6" fill="none"/><rect x="0" y="0" width="30" height="90" fill="#9ec5da" opacity=".25"/><rect x="130" y="0" width="30" height="90" fill="#0c2236" opacity=".35"/>` }),

  /* ---------------- gallery (portrait) ---------------- */
  g1: () => scene({ bg: lg("#f2f2f2", "#b4b4b4"), blur: 1.8, body: `<path d="M-6 82c10-18 30-24 44-16 8 4 8 12 2 16 10-6 22-2 20 8-14-4-24 2-30 10-10 6-26 4-36-18z" fill="#0b0b0c"/><path d="M20 70c14-6 30-2 36 6-14-2-26 2-36-6z" fill="#000" opacity=".6"/>`, grain: 0.14 }),
  g2: () => scene({ bg: lg("#d8ecff", "#5c8fe0", 0.2, 1), blur: 1.1, body: `<ellipse cx="42" cy="34" rx="23" ry="27" fill="#07090e"/><path d="M26 56c-4 16 4 36 14 46h40V70c-10 2-22-2-28-10z" fill="#0a0c12"/><g fill="#13205c" opacity=".95"><path d="M62 44c4-8 12-14 20-12l-4 14c4 2 8 4 8 10-2 8-12 6-20 4z"/><path d="M76 52l16-6 2 8-16 8z" opacity=".8"/></g><rect x="10" y="60" width="80" height="40" fill="#2f55d6" opacity=".25" style="mix-blend-mode:screen"/><ellipse cx="32" cy="30" rx="9" ry="12" fill="#3d70ff" opacity=".7" style="mix-blend-mode:screen"/>` }),
  g3: () => scene({ bg: lg("#f1f1f1", "#c6c6c6"), blur: 1.3, body: `<path d="M40 22c6-6 14-4 16 2 2 4-2 10-8 12l6 10c10 2 14 8 16 16-6 4-12 2-18-2l2 18c4 10 0 22-6 30h-8c0-8 2-14 0-22-6 4-12 4-18 0 2-12 8-20 14-26-2-10 0-24 4-38z" fill="#0d0d10"/><path d="M30 70c-10-4-20 0-26 8 8 2 18 2 26-2z" fill="#222" opacity=".55"/>`, grain: 0.14 }),
  g4: () => scene({ bg: lg("#c78bea", "#6f7be6", 0.3, 1), blur: 1.6, body: `<path d="M68 14c4-4 10-2 10 4l-2 14c6 6 4 16-2 22l-6 10c4 8 4 18 0 30h-8c2-10 0-18-2-24-10 4-22 2-28-4 8-2 14-6 18-14-4-8-2-18 2-26l-8-10c4-6 12-6 16 0 4-8 4-14 10-2z" fill="#3a3dc2" opacity=".85"/><ellipse cx="62" cy="40" rx="30" ry="36" fill="#e6bfff" opacity=".35" style="mix-blend-mode:screen"/>` }),

  /* ---------------- archive tiles ---------------- */
  a1: () => scene({ bg: lg("#2f95c7", "#1a6d9f"), blur: 0.9, body: `<path d="M22 125c0-24 8-34 22-40l4-6c-10-4-14-12-14-22 0-16 10-24 22-24 14 0 22 10 22 24 0 6-2 10-4 12l6 2-6 6 4 4-6 4 2 8c-4 6-10 6-14 4-6 8-10 20-12 32z" fill="#0a1420"/><path d="M72 36c4-6 12-8 14-4" stroke="#7fd0ff" stroke-width="1.2" fill="none" opacity=".7"/>` }),
  a2: () => scene({ bg: lg("#0c3a5a", "#051a2c"), blur: 0.8, body: `<path d="M10 125c4-28 20-34 40-34s36 6 40 34z" fill="#111820"/><ellipse cx="50" cy="52" rx="22" ry="30" fill="#1a1f27"/><path d="M26 40c0-20 48-20 48 0-8-6-40-6-48 0z" fill="#aab3bd"/><path d="M30 44c8-4 32-4 40 0" stroke="#d9e2ea" stroke-width="2" fill="none"/><path d="M38 52q5 3 10 0M54 52q5 3 10 0" stroke="#0a0e14" stroke-width="1.6" fill="none"/><ellipse cx="50" cy="72" rx="7" ry="3" fill="#3a2a30"/><ellipse cx="40" cy="44" rx="8" ry="14" fill="#9bb7cc" opacity=".35"/>` }),
  a3: () => scene({ bg: lg("#37f09a", "#18c473"), blur: 0.8, body: `<rect y="100" width="100" height="25" fill="#17924f"/><path d="M50 16c-5 0-8 4-8 9 0 4 2 7 5 8l-14 6-18-8-2 6 18 12 6 14-12 36 8 2 14-26 6 26h9l-6-30 12-4 14 24 8-4-12-30 8-12 14-4-2-8-14 2-12 6 2-6c4-1 6-5 6-9 0-5-3-9-8-9z" fill="#0a0e10"/>` }),
  a4: () => person({ bg: lg("#d0d1c2", "#9c9e8a", 1, 0), skin: "#e6c9b4", hair: "#3a2418", style: "bob", shirt: "#26261f", cx: 56, s: 1.05, blur: 1 }),
  a5: () => scene({ bg: lg("#14507e", "#0b2f52"), blur: 0.9, body: `<path d="M14 110c-8-40 8-86 40-90 30-4 44 30 34 70-4 14-14 24-30 26z" fill="#69a9d8" opacity=".85"/><ellipse cx="52" cy="62" rx="14" ry="18" fill="#2a2c34"/><path d="M38 54c0-12 28-12 28 0-6-4-22-4-28 0z" fill="#111"/><path d="M20 40c14 8 20 20 20 40M70 24c8 10 12 24 8 44" stroke="#c9e6ff" stroke-width="1.2" fill="none" opacity=".6"/>` }),
  popup: () => person({ bg: lg("#3c6f90", "#1b3e58"), skin: "#c99a82", hair: "#2a1a16", style: "curly", shirt: "#20252b", cx: 50, cy: 50, s: 1.15, blur: 0.8 }),

  /* ---------------- projects (landscape) ---------------- */
  vortex: () => scene({ w: 160, h: 90, bg: lg("#2a0b0b", "#0b0303", 1, 1), blur: 1, grain: 0.22, vignette: 0.5,
    extraDefs: `<radialGradient id="Ur" cx="30%" cy="70%" r="55%"><stop offset="0" stop-color="#ff3a2a" stop-opacity=".7"/><stop offset="1" stop-color="#ff3a2a" stop-opacity="0"/></radialGradient>`,
    body: `<rect width="160" height="90" fill="url(#Ur)"/><g><path d="M-4 90c2-36 14-52 30-52s24 16 22 52z" fill="#e0322a"/><path d="M42 90c2-30 12-44 26-44s20 14 18 44z" fill="#c9261f"/><ellipse cx="22" cy="58" rx="8" ry="5" fill="#2de0c8" opacity=".6"/><ellipse cx="62" cy="62" rx="6" ry="4" fill="#2de0c8" opacity=".5"/></g><path d="M80 0c20 6 44 4 80 0v50c-30 10-60 10-80 0z" fill="#06100f"/><path d="M96 38c8-4 20-4 30 0l-6 18c-10 2-20 0-26-4z" fill="#0b1a18"/><rect x="86" y="46" width="16" height="6" fill="#7ef0e0" opacity=".7" transform="rotate(-12 94 49)"/><path d="M110 60l30 20" stroke="#ff2a1f" stroke-width="1.2"/>` }),
  prism: () => scene({ w: 160, h: 90, bg: solid("#1550b6"), blur: 0.8, grain: 0.2,
    body: `<path d="M64 -4h40l8 40 14 20 6 40H36l8-40 14-14z" fill="#0b1326"/><path d="M62 18h40l2 8H60z" fill="#e8f2ff"/><path d="M60 34h44l2 9H58z" fill="#e8f2ff"/><g stroke="#8fa8e0" stroke-width=".7" fill="none" opacity=".6"><path d="M44 70c20-8 50-8 76 0M42 78c22-8 54-8 80 0M46 62c18-6 44-6 68 0"/></g><rect x="108" y="26" width="3" height="14" fill="#ff3a2a" opacity=".7"/>` }),
  silk: () => scene({ w: 160, h: 90, bg: lg("#27527a", "#10233a", 1, 1), blur: 0.9, grain: 0.22, vignette: 0.5,
    body: `<path d="M70 30c16-14 50-14 64 8 8 12 8 40 2 60H60c4-20 6-40 10-68z" fill="#04080e"/><ellipse cx="86" cy="52" rx="22" ry="26" fill="#0d1218"/><g fill="#0a0d12" stroke="#4a6a86" stroke-width="1.2"><circle cx="82" cy="50" r="9"/><circle cx="104" cy="46" r="9.5"/></g><path d="M91 48h4" stroke="#4a6a86" stroke-width="1.2"/><path d="M80 70q8 4 18 0" stroke="#40242a" stroke-width="2.6" fill="none"/><path d="M62 54c-4 4-6 10-4 16" stroke="#5a86aa" stroke-width="1" fill="none" opacity=".6"/>` }),
  rift: () => scene({ w: 160, h: 90, bg: lg("#0e3c3c", "#133632", 0, 1), blur: 0.9, grain: 0.25, vignette: 0.5,
    extraDefs: `<radialGradient id="Uy" cx="60%" cy="64%" r="32%"><stop offset="0" stop-color="#ffd35a" stop-opacity=".85"/><stop offset="1" stop-color="#ffd35a" stop-opacity="0"/></radialGradient><linearGradient id="Uf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f8a85" stop-opacity=".7"/><stop offset="1" stop-color="#0a1f20" stop-opacity="0"/></linearGradient>`,
    body: `<rect width="160" height="90" fill="url(#Uf)"/><rect x="38" y="22" width="30" height="48" fill="none" stroke="#9ad0cc" stroke-width="1.4"/><rect x="42" y="26" width="22" height="42" fill="#4a7f7a" opacity=".35"/><path d="M34 22h40" stroke="#9ad0cc" stroke-width="3"/><rect x="96" y="40" width="34" height="18" rx="3" fill="#e8c23a"/><rect x="100" y="43" width="26" height="6" fill="#2a3a38"/><rect width="160" height="90" fill="url(#Uy)" style="mix-blend-mode:screen"/><ellipse cx="86" cy="52" rx="2" ry="10" fill="#1a1a1a"/><path d="M80 44q6-6 12 0z" fill="#222"/><path d="M0 64h160v26H0z" fill="#07201f" opacity=".6"/><path d="M96 64v22M118 64v22" stroke="#ffd35a" stroke-width="2" opacity=".35"/>` }),
  mirage: () => scene({ w: 160, h: 90, bg: lg("#2e2f26", "#171812", 0, 1), blur: 1.1, grain: 0.25, vignette: 0.55,
    body: `<g fill="#0c0d0b">${[[10, 40, 18], [34, 26, 14], [52, 18, 20], [78, 30, 16], [98, 12, 18], [124, 34, 14], [144, 24, 18]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${90 - y}"/>`).join("")}</g><g fill="#e8d25a" opacity=".8">${Array.from({ length: 26 }, (_, i) => `<rect x="${14 + ((i * 29) % 130)}" y="${34 + ((i * 17) % 40)}" width="3.4" height=".9"/>`).join("")}</g><g fill="#ff2e22"><rect x="84" y="32" width="6" height="3"/><rect x="132" y="48" width="4" height="2.4"/><rect x="40" y="52" width="4" height="2"/></g><rect y="60" width="160" height="30" fill="#4a4a3c" opacity=".45"/>` }),
  glaire: () => scene({ w: 160, h: 90, bg: lg("#0b6c78", "#0f2a3c", 0, 1), blur: 1, grain: 0.22, vignette: 0.5,
    extraDefs: `<radialGradient id="Ub" cx="50%" cy="10%" r="60%"><stop offset="0" stop-color="#e8ffff" stop-opacity=".95"/><stop offset=".4" stop-color="#4fe0e6" stop-opacity=".55"/><stop offset="1" stop-color="#4fe0e6" stop-opacity="0"/></radialGradient>`,
    body: `<rect width="160" height="90" fill="url(#Ub)"/><g stroke="#aef8ff" stroke-width="2" opacity=".8"><path d="M20 90L62 40M140 90L98 40M2 80L40 44M158 80L120 44"/></g><path d="M62 90c0-20 4-34 18-36s18 16 18 36z" fill="#050c12"/><path d="M70 56c2-8 18-8 20 0" fill="#050c12"/>` }),

  /* ---------------- method collage ---------------- */
  lips: () => scene({ bg: lg("#9aa2b0", "#6c7280", 1, 1), blur: 1.2, body: `<path d="M8 70c14-12 30-14 42-4 12-10 30-8 42 4-10 22-26 32-42 32S18 92 8 70z" fill="#a54a52"/><path d="M12 70c14 4 26 4 38 0 12 4 24 4 38 0" stroke="#4a1a22" stroke-width="2.4" fill="none"/><ellipse cx="62" cy="58" rx="9" ry="14" fill="#e9eef4" transform="rotate(20 62 58)"/><ellipse cx="62" cy="52" rx="4" ry="6" fill="#fff" opacity=".6"/>` }),
  blueabs: () => scene({ bg: solid("#1a4fe6"), blur: 1.2, body: `<path d="M10 100c10-30 30-50 60-60-6 20-2 40 14 60z" fill="#6a9cff" opacity=".8"/><path d="M20 60c20-4 40-14 50-34" stroke="#cfe0ff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/><path d="M40 100c4-20 20-30 40-30" stroke="#0a2aa0" stroke-width="8" fill="none" opacity=".6"/>` }),
  sunglass: () => scene({ bg: lg("#5fb4e2", "#2f86c0"), blur: 0.9, body: `<g fill="#e6f4ff">${[[22, 44, 16], [34, 28, 18], [50, 22, 20], [66, 28, 18], [78, 44, 16], [26, 64, 14], [74, 66, 14], [18, 82, 14], [84, 84, 14], [50, 96, 18]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join("")}</g><ellipse cx="54" cy="64" rx="17" ry="24" fill="#efc2ae"/><g fill="#d8ecf6" stroke="#f6fbff" stroke-width="3"><circle cx="45" cy="56" r="9" opacity=".75"/><circle cx="66" cy="54" r="9" opacity=".75"/></g><path d="M48 76q6 4 12 0" stroke="#b5655a" stroke-width="2.4" fill="none"/>` }),

  /* ---------------- team ---------------- */
  t1: () => person({ bg: lg("#6c7b87", "#3b4752"), skin: "#d6ab90", hair: "#18120e", style: "short", shirt: "#b9bec2", cx: 38, cy: 28, s: 0.9, blur: 1.1 }),
  t2: () => person({ bg: lg("#8696a2", "#4b5a65"), skin: "#e4c3ad", hair: "#f1f1ee", style: "white", shirt: "#f4f4f2", glasses: "#c6ff2a", collar: "#fff", cx: 50, cy: 44, s: 1 }),
  t3: () => person({ bg: lg("#2a7a80", "#c9553a", 1, 0), skin: "#c98a6a", hair: "#2a160f", style: "short", shirt: "#16171a", light: ["#2fe0d8", "#ff5a36"], cx: 52, cy: 46, s: 1.05 }),
  t4: () => person({ bg: lg("#4a4a4a", "#2a2a2a"), skin: "#e2bda2", hair: "#7a5636", style: "short", shirt: "#1d1d1f", glasses: "#111", cx: 46, cy: 50, s: 1.1, blur: 1 }),
  t5: () => person({ bg: lg("#5a5a58", "#34342f"), skin: "#c99e84", hair: "#2a1a12", style: "short", shirt: "#141416", beard: true, cx: 50, cy: 42, s: 1 }),
  t6: () => person({ bg: lg("#17b484", "#d4543a", 1, 0.2), skin: "#e1b49a", hair: "#caa24a", style: "short", shirt: "#26332f", light: ["#00f0b0", "#ff4a2a"], cx: 56, cy: 50, s: 1.1 }),
};
