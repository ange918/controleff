/* =====================================================================
   Gesso landing — procedural artwork (placeholders: swap for real images)
   ===================================================================== */
const svg = (inner, bg, defs = "") =>
  `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${defs ? `<defs>${defs}</defs>` : ""}<rect width="100" height="100" fill="${bg}"/>${inner}</svg>`;

const svgW = (inner, bg, w = 200, h = 100) =>
  `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg"><rect width="${w}" height="${h}" fill="${bg}"/>${inner}</svg>`;

function cloudS() {
  const pts = [];
  for (let a = -35; a >= -270; a -= 12) { const r = (a * Math.PI) / 180; pts.push([50 + 16 * Math.cos(r), 33 + 15 * Math.sin(r)]); }
  for (let a = -90; a <= 150; a += 12) { const r = (a * Math.PI) / 180; pts.push([50 + 16 * Math.cos(r), 65 + 15 * Math.sin(r)]); }
  const shade = pts.map(([x, y], i) => `<circle cx="${x + 1.6}" cy="${y + 2.4}" r="${9 + (i % 3) * 0.4}" fill="#9fb0ec"/>`).join("");
  const body = pts.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${8.4 + (i % 3) * 0.5}" fill="#f4f7ff"/>`).join("");
  const hi = pts.map(([x, y]) => `<circle cx="${x - 2}" cy="${y - 2.4}" r="4.2" fill="#fff"/>`).join("");
  return svg(shade + body + hi, "#2338d6");
}

function halftone() {
  let d = "";
  for (let i = 0; i < 15; i++) for (let j = 0; j < 15; j++) {
    const x = 6 + i * 6.4, y = 6 + j * 6.4, dx = (x - 50) / 46, dy = (y - 50) / 46, dist = Math.hypot(dx, dy);
    const r = dist < 1 ? Math.max(0.5, 3.1 * (1 - dist * dist * 0.35) * Math.cos(dist * 1.2)) : 0.4;
    d += `<circle cx="${x}" cy="${y}" r="${r.toFixed(2)}" fill="#fff"/>`;
  }
  return svg(d, "#0c0c0d");
}

function spectrum() {
  const cols = ["#ff3b30", "#ff9500", "#ffd60a", "#34c759", "#0a84ff", "#7d3cff"];
  const bands = cols.map((c, i) => `<path d="M-10 ${96 + i * 8} L30 ${72 + i * 8} L8 ${54 + i * 8} L56 ${30 + i * 8} L38 ${14 + i * 8} L112 ${-18 + i * 8}" fill="none" stroke="${c}" stroke-width="8.5" stroke-linejoin="miter"/>`).join("");
  return svg(bands, "#2b0a5e", `<linearGradient id="spg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4a1aa8"/><stop offset="1" stop-color="#14052e"/></linearGradient>`).replace('fill="#2b0a5e"', 'fill="url(#spg)"');
}

function burst() {
  const cols = ["#e8321e", "#0a56c8", "#ffd60a", "#1d9b4a", "#ff7b00", "#111", "#fff"];
  let s = "";
  for (let i = 0; i < 46; i++) {
    const a = (i / 46) * Math.PI * 2, r1 = 6 + (i % 5) * 3, r2 = 46 + (i % 7) * 4;
    s += `<path d="M${50 + r1 * Math.cos(a)} ${50 + r1 * Math.sin(a)} L${50 + r2 * Math.cos(a + 0.12)} ${50 + r2 * Math.sin(a + 0.12)}" stroke="${cols[i % cols.length]}" stroke-width="${3 + (i % 4)}" stroke-linecap="round" fill="none"/>`;
  }
  return svg(s, "#f6e27a");
}

function rider() {
  let sw = "";
  for (let r = 6; r < 70; r += 5.5) sw += `<circle cx="${70 - r * 0.2}" cy="${28 + r * 0.1}" r="${r}" fill="none" stroke="${["#1f4fa8", "#2b8a9a", "#17306e", "#1f6a4a"][Math.floor(r / 5.5) % 4]}" stroke-width="3.2" opacity=".9"/>`;
  const stars = [[16, 14], [34, 10], [84, 12], [52, 22]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#f7e36a"/>`).join("");
  const horse = `<path d="M24 74c4-14 10-22 20-24 6-8 14-14 22-12l-2 8c4 0 8 2 10 6l-8 2c-2 8-4 14-10 18l6 18h-8l-6-14-14 2-4 14h-8l4-16c-4 2-8 2-12 0z" fill="#e0322a" stroke="#7a1010" stroke-width="1"/><circle cx="68" cy="42" r="1.4" fill="#111"/>`;
  return svg(sw + stars + horse, "#12306b");
}

function softHours() {
  return svg(`<circle cx="62" cy="38" r="20" fill="#f6e9d2" opacity=".8"/><path d="M0 70c20-12 40 8 60-2s30-8 40 2v30H0z" fill="#d1a678" opacity=".7"/><path d="M0 82c24-10 44 6 66-2s24-4 34 2v18H0z" fill="#b98558" opacity=".7"/>`, "#ead9bd");
}
function lowTide() {
  return svg(`<path d="M0 60c20-8 40 6 60-2s30-6 40 0v40H0z" fill="#3a86a6"/><path d="M0 76c24-8 44 6 66-2s24-4 34 2v24H0z" fill="#25607f"/><circle cx="72" cy="30" r="12" fill="#fbe9b8"/>`, "#bfe3ea");
}

const ART = {
  swirl: () => {
    let l = "";
    for (let i = 0; i < 9; i++) l += `<path d="M${-5 + i * 3} ${20 + i * 9} C ${25} ${6 + i * 8}, ${60} ${34 + i * 6}, ${105} ${14 + i * 8}" fill="none" stroke="#a9d3a2" stroke-width="1.1" opacity=".55"/>`;
    return svg(`${l}<g fill="none" stroke="#c6e6bc" stroke-width="1.5"><circle cx="18" cy="82" r="9"/><circle cx="84" cy="22" r="8"/><path d="M6 60c6-8 14-4 12 4s-12 4-10-4"/></g><path d="M18 100c2-20 16-26 32-26s30 6 32 26z" fill="#d7e3cf"/><ellipse cx="50" cy="52" rx="16" ry="18" fill="#c0cdb4"/><path d="M30 44c0-12 8-26 20-26s20 14 20 26c-10-6-30-6-40 0z" fill="#31503a"/><rect x="26" y="42" width="48" height="5" rx="2.5" fill="#31503a"/><path d="M42 58q8 5 16 0" stroke="#33503a" fill="none" stroke-width="1.3"/>`, "#2c6a3c");
  },
  sketch: () => svg(`<g fill="none" stroke="#3b57d6" stroke-width=".9"><path d="M6 18c20-10 32 10 52 2s28-8 36 6M8 46c16 8 30-8 46 2s28 8 38-6M6 74c18-6 32 8 52-2"/><circle cx="66" cy="38" r="14"/><path d="M52 14l14 22M30 30l24 30"/></g><circle cx="36" cy="58" r="13" fill="#1d1d2c"/><path d="M16 100c2-22 12-28 20-28s18 6 20 28z" fill="#ebe5d4"/><circle cx="74" cy="76" r="5" fill="#f5e04d"/>`, "#eef0f7"),
  man: () => svg(`<rect y="58" width="100" height="42" fill="#13305e"/><path d="M0 30c20 4 30-8 50-6s34 8 50 2v10H0z" fill="#e8c34c" opacity=".35"/><ellipse cx="50" cy="42" rx="19" ry="22" fill="#c89a76"/><path d="M26 40c-6 40 14 56 24 56s30-16 24-56c-4 16-12 30-24 30S30 56 26 40z" fill="#e6ded2"/><path d="M28 32c4-24 40-24 44 0-10-10-34-10-44 0z" fill="#e6ded2"/><path d="M38 44q4-3 8 0M54 44q4-3 8 0" stroke="#333" stroke-width="1.4" fill="none"/>`, "#162a50"),
  can: () => svg(`<defs><linearGradient id="cg" x1="0" x2="1"><stop offset="0" stop-color="#b8201a"/><stop offset=".5" stop-color="#ec4a3a"/><stop offset="1" stop-color="#b8201a"/></linearGradient></defs><ellipse cx="30" cy="84" rx="22" ry="5" fill="rgba(0,0,0,.25)"/><rect x="8" y="42" width="44" height="42" rx="3" fill="url(#cg)"/><ellipse cx="30" cy="42" rx="22" ry="5" fill="#eee"/><rect x="8" y="48" width="44" height="6" fill="#f4f4f4"/><g fill="#fff"><rect x="60" y="32" width="9" height="56" transform="skewX(-6)"/><rect x="76" y="32" width="9" height="56" transform="skewX(-6)"/></g><path d="M56 24h34l5 10H52z" fill="#d8322a"/>`, "#fbe62b"),
  peach: () => svg(`<defs><radialGradient id="pg" cx="50%" cy="85%" r="75%"><stop offset="0" stop-color="#ee7a5e"/><stop offset=".5" stop-color="#f4a98d"/><stop offset="1" stop-color="#f8d9c8"/></radialGradient></defs><rect width="100" height="100" fill="url(#pg)"/>`, "#f6c7b0"),
  hand: () => {
    let rings = "";
    for (let r = 120, k = 0; r > 4; r -= 7, k++) rings += `<circle cx="22" cy="30" r="${r}" fill="${k % 2 ? "#fff" : "#e5412b"}"/>`;
    return svg(`${rings}<ellipse cx="56" cy="60" rx="24" ry="30" fill="#e8a27b"/><path d="M30 50c6-24 40-26 50 0-12-10-34-10-50 0z" fill="#6a2418"/><ellipse cx="62" cy="54" rx="7" ry="5" fill="#fff"/><circle cx="62" cy="54" r="3.4" fill="#5d8b3a"/><circle cx="62" cy="54" r="1.6" fill="#111"/><path d="M54 46q8-5 17 0" stroke="#4a1a10" stroke-width="1.6" fill="none"/><path d="M52 78q8 5 16 0" stroke="#a8453a" stroke-width="2" fill="none"/><g fill="#eab08a" stroke="#c9825c" stroke-width=".6"><rect x="26" y="44" width="9" height="34" rx="4.5" transform="rotate(-8 30 60)"/><rect x="36" y="38" width="9" height="40" rx="4.5" transform="rotate(-2 40 60)"/><rect x="46" y="40" width="9" height="36" rx="4.5" transform="rotate(8 50 60)"/><path d="M26 98c2-14 10-26 24-26s20 8 18 26z"/></g>`, "#e5412b");
  },
  shoe: () => svg(`<path d="M-4 66c24-6 34-54 56-60l24 4-6 38z" fill="#1d3fd8"/><path d="M60 4l22 8-6 30z" fill="#111"/><path d="M10 72c3-14 18-18 28-16 8 4 14 12 34 8 8 0 14 10 8 18-6 8-36 10-56 6z" fill="#f2f2f2" stroke="#b0b0b0" stroke-width=".7"/><path d="M12 80c20 6 50 4 66-2" stroke="#d4d4d4" stroke-width="3" fill="none"/><path d="M34 60l8 4M40 56l8 4M46 54l8 4" stroke="#999" stroke-width="1"/>`, "#e5412b"),
  cloud: cloudS,
  coat: () => svg(`<ellipse cx="50" cy="90" rx="30" ry="4" fill="rgba(0,0,0,.12)"/><path d="M28 94l5-48c1-8 8-12 17-12s16 4 17 12l5 48z" fill="#d6491e"/><path d="M50 36v58M40 40l10 16 10-16" stroke="#9c2f10" stroke-width="1.2" fill="none"/><rect x="38" y="90" width="9" height="8" fill="#f4f4f4"/><rect x="53" y="90" width="9" height="8" fill="#f4f4f4"/><circle cx="50" cy="22" r="12" fill="#f7f3ea"/><ellipse cx="56" cy="26" rx="8" ry="3.4" fill="#f0a42a"/><circle cx="48" cy="19" r="1.5" fill="#111"/>`, "#e8dccb"),
  grass: () => {
    let g = "";
    for (let i = 0; i < 40; i++) g += `<path d="M${(i * 37) % 100} ${48 + ((i * 13) % 50)}l${(i % 3) - 1} -7" stroke="${i % 2 ? "#92c05a" : "#4f7d2a"}" stroke-width="1.1"/>`;
    return svg(`<rect y="42" width="100" height="58" fill="#6c9c3c"/>${g}<rect x="64" y="46" width="3" height="10" fill="#fff"/><circle cx="65.5" cy="43" r="2.6" fill="#c9a07a"/><path d="M60 44l-6 -2" stroke="#fff"/>`, "#b4d39b");
  },
  shadow: () => svg(`<path d="M0 90h100" stroke="#111" stroke-width="2"/><path d="M38 88c3-10 1-22 6-30l-3-10 6-6 6 4-2 8c4 8 6 22 8 34z" fill="#111"/><circle cx="50" cy="38" r="5" fill="#111"/><path d="M58 52l14-14M72 38l8 -6" stroke="#111" stroke-width="1.5"/><circle cx="82" cy="30" r="3.4" fill="#111"/>`, "#fbe62b"),
  perfume: () => svg(`<g fill="none" stroke="#a7aebf" stroke-width=".7"><path d="M8 16h34M8 24h26M8 32h40M6 92c14-18 30-20 46-8M60 14h30M60 22h22"/><path d="M12 40v50M20 40v50"/></g><defs><linearGradient id="pf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7c4fe0"/><stop offset=".5" stop-color="#3d1a96"/><stop offset="1" stop-color="#1c0a52"/></linearGradient></defs><rect x="36" y="42" width="34" height="46" rx="7" fill="url(#pf)"/><rect x="45" y="30" width="16" height="14" rx="2" fill="#2a2a30"/><rect x="48" y="26" width="10" height="6" rx="1.5" fill="#3b3b44"/><rect x="42" y="50" width="9" height="28" rx="4" fill="#fff" opacity=".28"/><rect x="48" y="62" width="16" height="12" fill="#fff" opacity=".85"/>`, "#f6f2e8"),
  duo: () => svg(`<rect x="4" y="4" width="92" height="92" rx="4" fill="#cdc9c1"/><ellipse cx="34" cy="46" rx="11" ry="14" fill="#d8ac88"/><ellipse cx="64" cy="47" rx="11" ry="14" fill="#e6bd9a"/><path d="M22 42c0-18 24-18 24 0-6-6-18-6-24 0zM52 44c-2-18 24-18 24 0-6-6-18-6-24 0z" fill="#3a2a22"/><path d="M12 96c2-24 12-32 22-32s22 8 24 32zM42 96c2-24 12-32 22-32s22 8 24 32z" fill="#55656e"/>`, "#e5412b"),
  david: () => svg(`<g fill="none" stroke="#3b57d6" stroke-width=".7"><path d="M6 12h88M6 20h88M8 90h84M12 28v62M88 28v62M6 28h88"/><path d="M20 38l14 -6 14 6" /></g><path d="M26 94c0-22 8-30 24-30s24 8 24 30z" fill="#ecebe5" stroke="#8a8a8a" stroke-width=".6"/><ellipse cx="50" cy="46" rx="15" ry="19" fill="#f2f0ea" stroke="#8a8a8a" stroke-width=".6"/><path d="M33 40c2-16 32-16 34 0-6-6-28-6-34 0z" fill="#c9c6bb"/><path d="M42 52q8 5 16 0M42 44h5M53 44h5" stroke="#777" stroke-width=".9" fill="none"/>`, "#eef0f7"),
  comic: () => svg(`<g fill="#222"><rect x="0" y="0" width="12" height="12"/><rect x="24" y="0" width="12" height="12"/><rect x="12" y="12" width="12" height="12"/><rect x="36" y="12" width="12" height="12"/><rect x="0" y="24" width="12" height="12"/><rect x="24" y="24" width="12" height="12"/></g><path d="M0 78c20-14 40 10 60-2s30-10 40 0v24H0z" fill="#ff6bb0"/><ellipse cx="62" cy="52" rx="22" ry="24" fill="#f1c9a6"/><path d="M38 48c0-22 48-24 48 0-10-10-38-10-48 0z" fill="#7fe0c0"/><circle cx="56" cy="54" r="2" fill="#222"/><circle cx="70" cy="54" r="2" fill="#222"/><path d="M54 64c5 6 12 6 16 0" stroke="#222" fill="none" stroke-width="1.5"/><circle cx="84" cy="16" r="8" fill="#9b5de5"/><circle cx="22" cy="60" r="6" fill="#fff" stroke="#222"/>`, "#fff44f"),
  candy: () => {
    return svg(`<g stroke="#fff" stroke-width="2.2" opacity=".75" stroke-linecap="round"><path d="M2 36h30M0 46h38M4 56h30M8 64h20"/></g><circle cx="58" cy="50" r="30" fill="none" stroke="#fff" stroke-width="18"/><circle cx="58" cy="50" r="30" fill="none" stroke="#e5412b" stroke-width="18" stroke-dasharray="11 11"/><circle cx="58" cy="50" r="19" fill="#f6f6f6"/><circle cx="60" cy="50" r="13" fill="#111"/><circle cx="60" cy="50" r="13" fill="none" stroke="#d9c07a" stroke-width="1.6" stroke-dasharray="1.5 1.5"/><circle cx="54" cy="44" r="3.4" fill="#fff"/>`, "#2339d8");
  },
  clouds: () => svg(`<path d="M20 30c-8 0-12-10-4-14 2-8 14-8 16-2 8-2 12 8 6 12z" fill="#fff" stroke="#222" stroke-width="1.2"/><circle cx="40" cy="80" r="14" fill="none" stroke="#fff" stroke-width="2"/><g fill="#fff" stroke="#222" stroke-width="1.2"><circle cx="82" cy="30" r="5"/></g><ellipse cx="60" cy="68" rx="20" ry="22" fill="#f4c6a0"/><path d="M40 62c0-22 40-24 40 2-8-12-32-12-40-2z" fill="#6ce0c8"/><circle cx="54" cy="68" r="2" fill="#222"/><circle cx="68" cy="68" r="2" fill="#222"/><path d="M54 78q7 7 15 0" stroke="#222" stroke-width="1.6" fill="none"/>`, "#ffd23f"),
  halftone, spectrum, burst, rider, softHours, lowTide,
};

const SKIN = ["#f1c9a6", "#d9a37c", "#a8704a", "#7a4a2e", "#f4d6bd", "#c98d65"];
const BGS = ["#9fa9d6", "#e9c9a8", "#f6d84a", "#2d7a5a", "#55c3c0", "#d8613a", "#b7b0d0", "#9dacc2", "#3a3a44", "#e6d9c4", "#c8e0a6", "#e59ac0"];
const PAINT = ["#ff3d9a", "#2a52ff", "#ff9a2a", "#a24fe0", "#e8e53a", "#1fc0b0", "#e8452c"];
const rnd = (seed) => { let s = seed * 9301 + 49297; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); };

function face(i) {
  const r = rnd(i + 3);
  const bg = BGS[i % BGS.length], skin = SKIN[Math.floor(r() * SKIN.length)];
  const hair = ["#1c1512", "#e8e0d0", "#2a1a14", "#7a5a3c", "#33c0c8", "#9a9a9a"][Math.floor(r() * 6)];
  const p = PAINT[Math.floor(r() * PAINT.length)], p2 = PAINT[Math.floor(r() * PAINT.length)];
  const style = i % 4;
  const hairShape = [
    `<path d="M26 46c-6-34 54-34 48 0-6-14-42-14-48 0z" fill="${hair}"/>`,
    `<path d="M24 48c-4-36 56-36 52 0l4 30c-4-20-8-26-8-30-10-10-30-10-40 0 0 6-4 10-8 30z" fill="${hair}"/>`,
    `<g fill="${hair}"><circle cx="34" cy="26" r="9"/><circle cx="50" cy="20" r="10"/><circle cx="66" cy="26" r="9"/><circle cx="28" cy="38" r="7"/><circle cx="72" cy="38" r="7"/></g>`,
    `<path d="M28 40c2-20 42-20 44 0-8-8-36-8-44 0z" fill="${hair}"/>`,
  ][style];
  return svg(`<path d="M8 100c2-20 18-28 42-28s40 8 42 28z" fill="${skin}"/><rect x="43" y="62" width="14" height="14" fill="${skin}"/>${style === 1 ? hairShape : ""}<ellipse cx="50" cy="46" rx="21" ry="26" fill="${skin}"/>${style !== 1 ? hairShape : ""}<circle cx="42" cy="46" r="1.6" fill="#2a1a14"/><circle cx="58" cy="46" r="1.6" fill="#2a1a14"/><path d="M44 60q6 4 12 0" stroke="#a04a3a" stroke-width="1.6" fill="none"/><path d="M${28 + r() * 8} ${30 + r() * 4}q16 ${-6 + r() * 12} ${30 + r() * 8} ${2 + r() * 4}" stroke="${p}" stroke-width="${4 + r() * 4}" fill="none" stroke-linecap="round" opacity=".92"/><path d="M${30 + r() * 8} ${58 + r() * 6}q12 ${6 + r() * 6} ${26 + r() * 8} ${-2 + r() * 4}" stroke="${p2}" stroke-width="${3 + r() * 4}" fill="none" stroke-linecap="round" opacity=".88"/>`, bg);
}

function avatar(i) {
  const r = rnd(i + 11);
  const bg = BGS[(i * 5) % BGS.length], skin = SKIN[Math.floor(r() * SKIN.length)];
  const hair = ["#1c1512", "#f2c230", "#d33", "#2a6df0", "#7a5a3c", "#eee"][Math.floor(r() * 6)];
  const kind = i % 6;
  const acc = [
    `<path d="M30 40c2-18 38-18 40 0z" fill="${hair}"/>`,
    `<circle cx="42" cy="46" r="6" fill="none" stroke="#222" stroke-width="1.6"/><circle cx="58" cy="46" r="6" fill="none" stroke="#222" stroke-width="1.6"/><path d="M28 38c4-16 40-16 44 0z" fill="${hair}"/>`,
    `<path d="M26 44c-4-28 52-28 48 0-8-8-40-8-48 0z" fill="${hair}"/><path d="M26 44l-2 18M74 44l2 18" stroke="${hair}" stroke-width="5"/>`,
    `<path d="M22 20l10 16-14 2zM78 20L68 36l14 2z" fill="${skin}"/>`,
    `<rect x="30" y="18" width="40" height="8" rx="3" fill="#222"/><rect x="36" y="10" width="28" height="10" rx="3" fill="#222"/>`,
    `<path d="M28 42c0-22 44-22 44 0z" fill="#d9d9d9"/><circle cx="50" cy="22" r="3" fill="#e33"/>`,
  ][kind];
  return svg(`<path d="M14 100c2-22 16-30 36-30s34 8 36 30z" fill="${["#fff", "#e55", "#3a7", "#58f", "#fa3", "#222"][i % 6]}"/><circle cx="50" cy="46" r="21" fill="${skin}"/>${acc}<circle cx="43" cy="48" r="2" fill="#222"/><circle cx="57" cy="48" r="2" fill="#222"/><path d="M45 58q5 3 10 0" stroke="#222" stroke-width="1.4" fill="none"/>`, bg);
}

const closeup = () => svgW(`<path d="M52 100c4-18 22-24 48-24s44 6 48 24z" fill="#9a6a4a"/><rect x="90" y="70" width="20" height="14" fill="#a8744f"/><ellipse cx="100" cy="68" rx="19" ry="23" fill="#b3805a"/><path d="M72 76c-9-34 8-52 28-52s37 18 28 52l-3 14c-4-4-5-12-5-26-10-8-34-8-40 0 0 14-1 22-5 26z" fill="#1d120d"/><path d="M89 68q5-3 10 0M107 68q5-3 10 0" stroke="#2a1a14" stroke-width="1.6" fill="none"/><path d="M93 82q7 4 14 0" stroke="#7a3a30" stroke-width="2" fill="none"/>`, "#2f6b4b");
const backView = () => svg(`<defs><linearGradient id="dr" x1="0" x2="1"><stop offset="0" stop-color="#4a5a3a"/><stop offset=".5" stop-color="#6c7c52"/><stop offset="1" stop-color="#3a4a2e"/></linearGradient></defs><path d="M36 100l6-48c2-8 14-8 16 0l6 48z" fill="url(#dr)"/><path d="M40 50l20 0-2 14H42z" fill="#a8704f"/><path d="M38 14c6-10 18-10 22 0l6 56c-4 6-8 6-12 6 0-8-2-22-4-34-2 14-4 26-4 34-4 0-8 0-10-6z" fill="#241510"/><ellipse cx="50" cy="22" rx="8" ry="10" fill="#a8704f"/><path d="M42 50l-6 10M58 50l6 10" stroke="#a8704f" stroke-width="3"/>`, "#2f6b4b");

const studioArt = () => svgW(`<path d="M96 100c6-24 22-32 44-32s38 8 44 32z" fill="#f0b6a4"/><path d="M122 70c12 6 24 6 36 0l4 12-22 8-22-8z" fill="#e6a08e"/><path d="M128 66l12 14 12-14z" fill="#d79a78"/><g fill="#34190f"><circle cx="124" cy="34" r="9"/><circle cx="133" cy="25" r="10"/><circle cx="147" cy="25" r="10"/><circle cx="156" cy="34" r="9"/><circle cx="121" cy="46" r="8"/><circle cx="158" cy="46" r="8"/><circle cx="140" cy="22" r="9"/></g><ellipse cx="140" cy="46" rx="16" ry="21" fill="#d79a78"/><g fill="#e6a53a" stroke="#6a3b10" stroke-width="1" opacity=".95"><circle cx="133" cy="44" r="5.5"/><circle cx="147" cy="44" r="5.5"/></g><path d="M138 44h4" stroke="#6a3b10" stroke-width="1"/><path d="M134 58q6 4 12 0" stroke="#b02828" stroke-width="2.4" fill="none"/>`, "#2f56b4");

/* =====================================================================
   Helpers
   ===================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => 1 - Math.pow(1 - t, 3);
const easeIO = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const vh = () => window.innerHeight;
const vw = () => window.innerWidth;
const inView = (el) => { const r = el.getBoundingClientRect(); return r.top < vh() && r.bottom > 0; };
const secProgress = (el) => { const r = el.getBoundingClientRect(); return clamp(-r.top / (r.height - vh())); };
const viewProgress = (el) => { const r = el.getBoundingClientRect(); return clamp((vh() - r.top) / (vh() + r.height)); };

function makeCard(art, i, cls = "") {
  const el = document.createElement("div");
  el.className = "card " + cls;
  el.style.setProperty("--i", i);
  el.innerHTML = ART[art]();
  return el;
}

/* split headings into blurred words */
$$("[data-split]").forEach((h) => {
  let n = 0;
  const walk = (node) => [...node.childNodes].forEach((c) => {
    if (c.nodeType === 3) {
      const f = document.createDocumentFragment();
      c.textContent.split(/(\s+)/).forEach((t) => {
        if (!t.trim()) return f.append(t);
        const s = document.createElement("span"); s.className = "w"; s.style.setProperty("--i", n++); s.textContent = t; f.append(s);
      });
      c.replaceWith(f);
    } else if (c.nodeType === 1 && c.tagName !== "BR") walk(c);
  });
  walk(h);
});
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.3 });
$$(".blur-words, .reveal").forEach((el) => io.observe(el));

/* =====================================================================
   HERO: one card drops in, then fans out into 7
   ===================================================================== */
const heroFan = $("#heroFan");
const HERO_ART = ["sketch", "man", "can", "peach", "hand", "shoe", "swirl"];
const heroCards = HERO_ART.map((a, i) => {
  const c = makeCard(a, i);
  c.style.zIndex = i;
  c.style.transitionDelay = `${(6 - i) * 60}ms`;
  c.style.setProperty("--y", "40vh");
  c.style.setProperty("--r", "-14deg");
  c.style.setProperty("--o", i === 6 ? 0 : 0);
  heroFan.append(c);
  return c;
});
heroCards[0].insertAdjacentHTML("beforeend", `<span class="tag" style="background:#3340e8">@lola</span>`);
heroCards[6].insertAdjacentHTML("beforeend", `<span class="tag" style="background:#2f7a52">@mei</span>`);
const FANX = [-32, -21.3, -10.7, 0, 10.7, 21.3, 32], FANY = [1.5, -.5, 0, 0, 0, .5, 1.5], FANR = [-8, -5, -2, 1, 4, 7, 5];
// 1) green card drops to centre
setTimeout(() => { const c = heroCards[6]; c.style.transitionDelay = "0ms"; c.style.setProperty("--o", 1); c.style.setProperty("--y", "0vh"); c.style.setProperty("--r", "8deg"); }, 500);
// 2) fan out
setTimeout(() => {
  heroCards.forEach((c, i) => {
    c.style.transitionDelay = `${(6 - i) * 55}ms`;
    c.style.setProperty("--o", 1);
    c.style.setProperty("--x", `${FANX[i]}vw`);
    c.style.setProperty("--y", `${FANY[i]}vh`);
    c.style.setProperty("--r", `${FANR[i]}deg`);
  });
}, 1700);
setTimeout(() => { $("#heroSub").classList.add("in"); $("#heroCta").classList.add("in"); }, 2700);

/* =====================================================================
   MARKETPLACE cascade (scroll driven)
   ===================================================================== */
const cascade = $("#cascade");
const CASC_ART = ["hand", "comic", "sketch", "shoe", "man", "can"];
const CASC_R = [-6, 5, -4, 5, -3, 4];
const cascCards = CASC_ART.map((a, i) => { const c = makeCard(a, i, "live"); c.style.zIndex = i; cascade.append(c); return c; });
cascCards[0].insertAdjacentHTML("beforeend", `<span class="tag" style="background:#e8452c">@erin</span>`);
cascCards[4].insertAdjacentHTML("beforeend", `<span class="tag" style="background:#111">@lena</span>`);
cascCards[1].insertAdjacentHTML("beforeend", `<span class="tag" style="background:#3340e8">@juno</span>`);

/* =====================================================================
   STUDIO + logos
   ===================================================================== */
$(".studio-art").innerHTML = studioArt();
const frame = $("#studioFrame");
const LOGOS = [
  `<b style="font-weight:600;letter-spacing:-.02em">Northwall</b>`, `<i style="font-family:Georgia,serif">✦ Linden &amp; Co</i>`, `<span style="font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.2em">ATLAS PAINT</span>`,
  `<b>▲ Fieldhouse</b>`, `<span style="font-size:8px;letter-spacing:.14em;font-weight:600">— MORROW STUDIO</span>`, `<span style="font-style:italic">⎍ Paperplane</span>`, `<span style="font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.2em">KILN HOUSE</span>`, `<b>Bright &amp; Sons</b>`,
];
$("#logos").innerHTML = [...LOGOS, ...LOGOS].map((l) => `<span>${l}</span>`).join("");

/* =====================================================================
   STATEMENT: single card → fan → staircase  (sticky, scroll scrubbed)
   ===================================================================== */
const stageCards = $("#stageCards");
const SC = [ // order in DOM: perfume, coat, grass, S, duo, yellow
  { art: "perfume", fan: [-26, -19.5, -7, 12.5], stair: [-29, -21, -5, 11.5], zf: 1, zs: 1 },
  { art: "coat", fan: [-15.5, -17.5, -4, 12.5], stair: [-12.5, -7.4, -3, 11.5], zf: 2, zs: 2 },
  { art: "grass", fan: [-7.5, -16.5, -1, 12.5], stair: [-3, -3.7, 0, 11.5], zf: 3, zs: 3 },
  { art: "cloud", fan: [2.5, -19.5, -2, 15], stair: [20.8, 22, 2, 11.5], zf: 9, zs: 9, hero: true },
  { art: "duo", fan: [14, -16.5, 4, 13], stair: [12.5, 11, 3, 11.5], zf: 4, zs: 6 },
  { art: "shadow", fan: [22.5, -15.5, 8, 13], stair: [7.3, 5.6, 2, 11.5], zf: 5, zs: 5 },
];
const P1 = { S: [0, -19.5, 0, 15], duo: [1.6, -19, 6.5, 15], other: [0, -19.5, 0, 9] };
const sCards = SC.map((d, i) => { const c = makeCard(d.art, i, "live tall"); c.style.opacity = 0; stageCards.append(c); return c; });
// word-by-word text
const stEl = $("#statementText");
(function wrap(node, green = false) {
  [...node.childNodes].forEach((c) => {
    if (c.nodeType === 3) {
      const f = document.createDocumentFragment();
      c.textContent.split(/(\s+)/).forEach((t) => {
        if (!t.trim()) return f.append(t);
        const s = document.createElement("span"); s.className = "wd" + (green ? " gw" : ""); s.textContent = t; f.append(s);
      });
      c.replaceWith(f);
    } else if (c.nodeType === 1 && c.classList.contains("g")) wrap(c, true);
  });
})(stEl);
const stItems = $$(".wd, .ico", stEl);

/* =====================================================================
   VISION: tabs + tools
   ===================================================================== */
const TAB_A = ["cloud", "coat", "grass", "shadow", "perfume", "duo"];
const TAB_B = ["swirl", "shoe", "clouds", "can", "david", "hand"];
const grid = $("#grid3");
let tabIdx = 0, tabTimer;
const fillGrid = (k) => (grid.innerHTML = (k ? TAB_B : TAB_A).map((a, i) => `<div class="cell" style="--i:${i}">${ART[a]()}</div>`).join(""));
fillGrid(0);
function setTab(k) {
  if (k === tabIdx) return;
  grid.classList.add("swap");
  $$(".tab").forEach((t) => t.classList.toggle("on", +t.dataset.tab === k));
  setTimeout(() => { tabIdx = k; fillGrid(k); grid.classList.add("swap"); requestAnimationFrame(() => requestAnimationFrame(() => grid.classList.remove("swap"))); }, 650);
}
$$(".tab").forEach((t) => t.addEventListener("click", () => { setTab(+t.dataset.tab); clearInterval(tabTimer); }));
tabTimer = setInterval(() => { if (inView($(".panel"))) setTab(tabIdx ? 0 : 1); }, 4200);
const TOOLS = [
  ["M12 3l5 6-5 12-5-12z", 62, 28], ["M4 20l4-1 11-11-3-3L5 16z", 4, 70], ["M12 4a8 8 0 100 16 8 8 0 000-16z", 44, 62],
  ["M5 20L12 4l7 16M8 14h8", 92, 100], ["M12 3c4 5 6 8 6 11a6 6 0 01-12 0c0-3 2-6 6-11z", 2, 112],
  ["M4 8l8-5 8 5-8 5zM4 13l8 5 8-5", 30, 118], ["M6 6l12 12M18 6L6 18", 70, 136], ["M5 19L19 5", 112, 90],
];
$("#tools").innerHTML = TOOLS.map(([d, x, y], i) => `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.7" style="left:${x}px;top:${y}px;animation-delay:${i * -.6}s"><path d="${d}"/></svg>`).join("");

/* =====================================================================
   COMMUNITY
   ===================================================================== */
$$(".avatars").forEach((row, r) => { row.innerHTML = Array.from({ length: 18 }, (_, i) => `<div class="av">${avatar(i + r * 7)}</div>`).join(""); });

/* =====================================================================
   STORIES
   ===================================================================== */
const story = (img, t, d, l, chip = "") => `<article class="story"><div class="story-img">${img}${chip}</div><h3>${t}</h3><p>${d}</p><a href="#">${l} →</a></article>`;
const stack = svg(`<g transform="rotate(-8 50 50)"><rect x="26" y="40" width="46" height="40" fill="#f5d442"/><rect x="34" y="44" width="46" height="40" fill="#2c4fd0"/></g><g transform="rotate(8 50 50)"><rect x="30" y="20" width="40" height="52" fill="#f4f2ec" stroke="#222" stroke-width="1"/><ellipse cx="50" cy="42" rx="12" ry="15" fill="#bbb"/><path d="M38 38c2-12 22-12 24 0-6-4-18-4-24 0z" fill="#666"/></g>`, "#dedcd8");
$("#colA").innerHTML =
  story(stack, "Make, show, sell", "Give buyers a way to own a piece of the story behind each work.", "How it works", `<span class="chip chip-blue">@maya</span>`) +
  story(ART.comic(), "Turn your practice into income", "Prints, originals and commissions from one studio page, restocked every week.", "Join us now");
$("#colB").innerHTML =
  story(ART.candy(), "Where craft meets commerce", "Work made with care, sold with fair fees, to buyers who came for it.", "Read more") +
  `<article class="story dark"><small>Studio pass</small><b>Your artist<br>profile</b><span>Prints · Originals · Stories</span><i>↗</i></article>`;

/* =====================================================================
   MARKET carousel
   ===================================================================== */
const ITEMS = [
  ["Grid Study", "Inès Okafor · $340", "halftone"], ["Spectrum Fold", "Teo Marsh · $380", "spectrum"], ["Burst No. 4", "Mila Sato · $520", "burst"],
  ["Night Rider", "Arlo Benn · $1,260", "rider"], ["Soft Hours", "Juno K · $290", "softHours"], ["Low Tide", "Pia Rao · $410", "lowTide"],
];
$("#track").innerHTML = ITEMS.map(([t, s, a]) => `<div class="item"><div class="im">${ART[a]()}</div><b>${t}</b><small>${s}</small></div>`).join("");
const track = $("#track"), fill = $("#barFill");
const step = () => $(".item", track).offsetWidth + parseFloat(getComputedStyle(track).columnGap || 0);
let userTouched = false, autoN = 0;
$("#next").onclick = () => { userTouched = true; track.scrollBy({ left: step() }); };
$("#prev").onclick = () => { userTouched = true; track.scrollBy({ left: -step() }); };
track.addEventListener("scroll", () => { const max = track.scrollWidth - track.clientWidth || 1; fill.style.width = 30 + (track.scrollLeft / max) * 70 + "%"; });
setInterval(() => { if (!userTouched && autoN < 3 && inView($("#market")) && $("#market").getBoundingClientRect().top < vh() * 0.2) { autoN++; track.scrollBy({ left: step() }); } }, 2600);

/* =====================================================================
   FINALE
   ===================================================================== */
$(".hc-close").innerHTML = closeup();
$(".hc-back").innerHTML = backView();
$("#facesL").innerHTML = Array.from({ length: 6 }, (_, i) => `<div class="face">${face(i)}</div>`).join("");
$("#facesR").innerHTML = Array.from({ length: 6 }, (_, i) => `<div class="face">${face(i + 6)}</div>`).join("");
const heroCard = $("#heroCard"), zoomEl = $("#zoom"), toolbar = $("#toolbar");

/* =====================================================================
   Scroll engine
   ===================================================================== */
function frameUpdate() {
  const W = vw(), H = vh();

  // marketplace cascade
  const mk = $("#marketplace");
  if (inView(mk)) {
    const p = ease(clamp((viewProgress(mk) - 0.3) / 0.28));
    cascCards.forEach((c, i) => {
      const fx = 49 + i * 8.4, fy = 30 + i * 8.6, fw = 10.5 + i * 1.3;
      c.style.left = `${lerp(62, fx, p)}vw`;
      c.style.top = `${lerp(40, fy, p)}vh`;
      c.style.setProperty("--w", `${lerp(10, fw, p)}vw`);
      c.style.setProperty("--r", `${lerp(0, CASC_R[i], p)}deg`);
      c.style.opacity = i === 0 ? clamp(p * 4 + 0.15) : clamp(p * 3 - i * 0.12);
    });
  }

  // studio frame
  frame.style.setProperty("--sc", lerp(0.93, 1, ease(clamp(viewProgress(frame) * 2.2 - 0.15))));

  // statement timeline
  const st = $("#statement");
  if (inView(st)) {
    const t = secProgress(st);
    const appear = ease(clamp(t / 0.07));
    const spread = ease(clamp((t - 0.1) / 0.22));
    const stair = easeIO(clamp((t - 0.58) / 0.22));
    sCards.forEach((c, i) => {
      const d = SC[i];
      const hide = d.hero ? P1.S : d.art === "duo" ? P1.duo : P1.other;
      const a = hide.map((v, k) => lerp(v, d.fan[k], spread));
      const b = a.map((v, k) => lerp(v, d.stair[k], stair));
      c.style.setProperty("--x", `${b[0]}vw`);
      c.style.setProperty("--y", `${b[1] + (1 - appear) * 6}vh`);
      c.style.setProperty("--r", `${b[2]}deg`);
      c.style.setProperty("--w", `${b[3]}vw`);
      c.style.zIndex = stair > 0.5 ? d.zs : d.zf;
      const vis = d.hero || d.art === "duo" ? appear : spread;
      c.style.opacity = clamp(vis * 1.5);
    });
    const textIn = clamp((t - 0.04) / 0.07), textOut = clamp((t - 0.55) / 0.08);
    const wrapOp = textIn * (1 - textOut);
    $("#stWrap").style.opacity = wrapOp;
    $("#stWrap").style.filter = `blur(${(1 - textIn) * 8 + textOut * 8}px)`;
    $("#pinL").style.setProperty("--po", wrapOp); $("#pinR").style.setProperty("--po", wrapOp);
    const n = Math.round(clamp((t - 0.14) / 0.22) * stItems.length);
    stItems.forEach((w, i) => w.classList.toggle("on", i < n));
    const tip = clamp((stair - 0.5) * 2.2);
    $("#tip").style.setProperty("--to", tip); $("#tipTag").style.setProperty("--to", tip);
  }

  // avatars drift
  $$(".avatars").forEach((row) => {
    const p = viewProgress(row), dir = +row.dataset.dir;
    row.style.transform = `translateX(${(p - 0.5) * 420 * dir - W * 0.04}px)`;
  });
  // stories parallax
  const sp = viewProgress($(".stories-cols")) - 0.5;
  $$(".col").forEach((col) => (col.style.transform = `translateY(${sp * -160 * +col.dataset.speed * 10}px)`));

  // finale
  const fin = $("#finale");
  if (inView(fin)) {
    const t = secProgress(fin);
    const rise = ease(clamp(t / 0.16));
    const s = easeIO(clamp((t - 0.3) / 0.24));
    const endW = W * 0.18, endH = W * 0.255;
    heroCard.style.setProperty("--cw", `${lerp(W * 0.86, endW, s)}px`);
    heroCard.style.setProperty("--ch", `${lerp(H * 0.64, endH, s)}px`);
    heroCard.style.setProperty("--cr", `${lerp(16, 9, s)}px`);
    heroCard.style.setProperty("--cy", `${(1 - rise) * H * 0.6 + s * H * 0.0}px`);
    heroCard.style.setProperty("--cl", String(1 - clamp(s * 2.4)));
    const fo = clamp((s - 0.3) / 0.6);
    zoomEl.style.setProperty("--fo", fo);
    $$(".faces, .like, .artist, .by", zoomEl).forEach((e) => e.style.setProperty("--fo", fo));
    $$(".face", zoomEl).forEach((e) => (e.style.transform = `scale(${0.82 + 0.18 * fo})`));
    toolbar.style.transform = `translate(-50%, ${(1 - rise) * H * 0.7}px)`;
    toolbar.style.opacity = 1 - clamp((s - 0.1) * 2);
    const z1 = easeIO(clamp((t - 0.64) / 0.14)), z2 = easeIO(clamp((t - 0.84) / 0.14));
    zoomEl.style.transform = `scale(${1 + 1.35 * z1 - 1.35 * z2})`;
  }
}
let ticking = false;
const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { frameUpdate(); ticking = false; }); } };
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
frameUpdate();
