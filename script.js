/* ---------- Procedural artwork (placeholders, swap for real images) ---------- */
const svg = (inner, bg) =>
  `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="${bg}"/>${inner}</svg>`;

const ART = {
  swirl: () => svg(`<g fill="none" stroke="#bfe0b4" stroke-width="1.4" opacity=".8"><circle cx="50" cy="52" r="40"/><circle cx="50" cy="52" r="32"/><path d="M12 30c20 14 56-6 76 8M10 70c24-14 52 8 82-6"/></g><circle cx="50" cy="48" r="17" fill="#b8c7ad"/><path d="M30 38c4-18 36-18 40 0z" fill="#33503a"/><rect x="26" y="36" width="48" height="5" rx="2" fill="#33503a"/><path d="M20 100c2-24 18-30 30-30s28 6 30 30z" fill="#d6e2cf"/>`, "#2f6a3d"),
  sketch: () => svg(`<g fill="none" stroke="#3b57d6" stroke-width="1"><path d="M10 20c20-8 30 10 50 2s26-6 30 8M14 52c16 8 30-8 46 2s26 8 28-6M10 80c18-6 30 10 50 0"/><circle cx="62" cy="40" r="14"/></g><circle cx="38" cy="58" r="14" fill="#1b1b2a"/><path d="M20 100c2-22 12-28 18-28s16 6 18 28z" fill="#e9e3d2"/>`, "#eef0f7"),
  man: () => svg(`<rect y="55" width="100" height="45" fill="#16315e"/><circle cx="50" cy="42" r="19" fill="#caa07b"/><path d="M30 44c0 26 40 26 40 0 0 14-8 30-20 30S30 58 30 44z" fill="#e4dcd0"/><path d="M30 34c4-22 36-22 40 0-8-10-32-10-40 0z" fill="#e4dcd0"/>`, "#162a50"),
  can: () => svg(`<rect x="8" y="42" width="38" height="46" rx="3" fill="#d8322a"/><rect x="8" y="38" width="38" height="8" rx="3" fill="#eee"/><g fill="#fff"><rect x="56" y="30" width="10" height="64"/><rect x="72" y="30" width="10" height="64"/></g><path d="M52 24h34l4 10H48z" fill="#d8322a"/>`, "#fbe62b"),
  peach: () => `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="pg" cx="50%" cy="70%" r="60%"><stop offset="0" stop-color="#ee8268"/><stop offset=".6" stop-color="#f4b49a"/><stop offset="1" stop-color="#f7d3c0"/></radialGradient></defs><rect width="100" height="100" fill="url(#pg)"/></svg>`,
  hand: () => `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"><defs><pattern id="st" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="#fff"/><rect width="6" height="12" fill="#e5412b"/></pattern></defs><rect width="100" height="100" fill="url(#st)"/><circle cx="52" cy="54" r="26" fill="#e6a07a"/><path d="M26 50c10-24 44-24 50 4-12-12-38-12-50-4z" fill="#8c2a1d"/><circle cx="62" cy="52" r="5" fill="#fff"/><circle cx="62" cy="52" r="2.4" fill="#222"/><path d="M30 92c4-16 14-26 24-26 4 0 8 4 8 10 0 12-4 16-14 16z" fill="#e6a07a"/></svg>`,
  shoe: () => svg(`<path d="M0 70c30-10 40-60 60-60l20 4-6 40z" fill="#1d3fd8"/><path d="M14 66c4-14 20-18 30-16 8 4 14 12 34 8 8 0 12 10 8 16-4 6-34 10-52 6z" fill="#f4f4f4" stroke="#bbb" stroke-width=".6"/><path d="M60 8l16 6-4 26z" fill="#111"/>`, "#e5412b"),
  cloud: () => svg(`<defs><filter id="bl"><feGaussianBlur stdDeviation="1.2"/></filter></defs><text x="50" y="76" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="92" fill="#fff" filter="url(#bl)">S</text><text x="50" y="73" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="92" fill="#e8eefe" opacity=".7">S</text>`, "#2438d8"),
  coat: () => svg(`<rect y="70" width="100" height="30" fill="#dccdb9"/><circle cx="50" cy="26" r="10" fill="#e8c06a"/><path d="M26 92l6-52c2-8 34-8 36 0l6 52z" fill="#d6491e"/><rect x="40" y="88" width="8" height="10" fill="#fff"/><rect x="54" y="88" width="8" height="10" fill="#fff"/>`, "#ebe0d2"),
  grass: () => svg(`<rect y="45" width="100" height="55" fill="#68993b"/><g stroke="#8dbb55" stroke-width="1.2" opacity=".7"><path d="M5 60l4-6M20 80l4-8M45 92l5-8M70 70l4-8M88 85l4-8M60 58l4-6"/></g><rect x="62" y="48" width="4" height="12" fill="#fff"/><circle cx="64" cy="44" r="3" fill="#c9a07a"/>`, "#b8d3a0"),
  shadow: () => svg(`<path d="M0 88h100" stroke="#111" stroke-width="2"/><path d="M40 86c4-10 2-24 8-32l2-8-4-4 8-2 4 6-2 6c2 10 4 24 8 34z" fill="#111"/><circle cx="62" cy="38" r="2" fill="#111"/>`, "#fbe62b"),
  perfume: () => svg(`<g fill="none" stroke="#9aa3b8" stroke-width=".8"><path d="M10 20h30M12 30h24M10 90c14-16 30-18 46-6"/></g><rect x="38" y="46" width="30" height="40" rx="6" fill="#3b1a8a"/><rect x="46" y="36" width="14" height="12" fill="#222"/><rect x="42" y="52" width="10" height="26" rx="4" fill="#7b55d8" opacity=".6"/>`, "#f6f2e8"),
  duo: () => svg(`<rect x="3" y="3" width="94" height="94" rx="6" fill="#cfd0cc"/><circle cx="36" cy="44" r="12" fill="#d9ae8c"/><circle cx="64" cy="46" r="12" fill="#e4bb98"/><path d="M22 40c2-18 28-18 28 0M54 42c2-18 24-16 24 0z" fill="#3a2a22"/><path d="M14 96c2-24 14-30 22-30s20 6 22 30zM42 96c2-24 14-30 22-30s20 6 22 30z" fill="#4a5a64"/>`, "#e5412b"),
  david: () => svg(`<g fill="none" stroke="#3b57d6" stroke-width=".8"><path d="M6 14h88M6 22h88M10 90h80"/><path d="M14 30v60M86 30v60"/></g><path d="M30 92c0-20 6-26 20-26s20 6 20 26z" fill="#e8e6e0" stroke="#999" stroke-width=".6"/><circle cx="50" cy="46" r="16" fill="#efede7" stroke="#999" stroke-width=".6"/><path d="M34 38c4-14 28-14 32 0-8-6-24-6-32 0z" fill="#bdbab0"/>`, "#eef0f7"),
  comic: () => svg(`<g fill="#222"><rect x="0" y="0" width="14" height="14"/><rect x="28" y="0" width="14" height="14"/><rect x="14" y="14" width="14" height="14"/><rect x="0" y="28" width="14" height="14"/></g><path d="M0 70c20-12 40 12 60 0s30-10 40 0v30H0z" fill="#ff6bb0"/><circle cx="62" cy="52" r="20" fill="#7fe0c0"/><circle cx="56" cy="50" r="2" fill="#222"/><circle cx="70" cy="50" r="2" fill="#222"/><path d="M54 60c4 5 12 5 16 0" stroke="#222" fill="none"/><circle cx="82" cy="20" r="8" fill="#9b5de5"/>`, "#fff44f"),
  phone: () => svg(`<rect x="28" y="6" width="44" height="88" rx="8" fill="#1a1a1a"/>`, "#f3f1ea"),
  abstract: (a, b, c) => svg(`<circle cx="30" cy="30" r="34" fill="${b}"/><circle cx="78" cy="76" r="40" fill="${c}"/><path d="M0 60c30-30 60 30 100-10v50H0z" fill="${a}" opacity=".7"/>`, a),
};

const HERO_ART = ["david", "man", "can", "peach", "hand", "shoe", "swirl"];
const CASCADE_ART = ["hand", "comic", "sketch", "shoe", "man", "can"];
const STAGE_ART = ["sketch", "coat", "grass", "cloud", "duo", "shadow"];
const TAB_A = ["cloud", "coat", "grass", "shadow", "perfume", "duo"];
const TAB_B = ["swirl", "shoe", "comic", "can", "david", "hand"];

/* ---------- Procedural faces / avatars ---------- */
const SKIN = ["#f1c9a6", "#d9a37c", "#a8704a", "#7a4a2e", "#f4d6bd", "#c98d65"];
const BGS = ["#9fa9d6", "#e9c9a8", "#f6d84a", "#2d7a5a", "#55c3c0", "#d8613a", "#b7b0d0", "#9dacc2", "#3a3a44", "#e6d9c4", "#c8e0a6", "#e59ac0"];
const PAINT = ["#ff3d9a", "#2a52ff", "#ff9a2a", "#a24fe0", "#e8e53a", "#1fc0b0"];
const rnd = (seed) => { let s = seed * 9301 + 49297; return () => ((s = (s * 9301 + 49297) % 233280) / 233280); };

function face(i) {
  const r = rnd(i + 3);
  const bg = BGS[i % BGS.length], skin = SKIN[Math.floor(r() * SKIN.length)];
  const hair = ["#1c1512", "#e8e0d0", "#2a1a14", "#7a5a3c", "#33c0c8", "#ddd"][Math.floor(r() * 6)];
  const p = PAINT[Math.floor(r() * PAINT.length)], p2 = PAINT[Math.floor(r() * PAINT.length)];
  return svg(`<path d="M10 100c2-22 18-28 40-28s38 6 40 28z" fill="${skin}"/><ellipse cx="50" cy="46" rx="21" ry="26" fill="${skin}"/><path d="M27 42c-2-30 44-30 46 0-8-12-38-12-46 0z" fill="${hair}"/><path d="M${28 + r() * 10} ${34 + r() * 8}q14 ${-8 + r() * 16} ${26 + r() * 10} ${4}" stroke="${p}" stroke-width="${5 + r() * 4}" fill="none" stroke-linecap="round" opacity=".9"/><rect x="${32 + r() * 6}" y="${44 + r() * 4}" width="${24 + r() * 8}" height="6" fill="${p2}" opacity=".85" rx="2"/>`, bg);
}

function avatar(i) {
  const r = rnd(i + 11);
  const bg = BGS[(i * 5) % BGS.length], skin = SKIN[Math.floor(r() * SKIN.length)];
  const hair = ["#1c1512", "#f2c230", "#d33", "#2a6df0", "#7a5a3c", "#eee"][Math.floor(r() * 6)];
  return svg(`<circle cx="50" cy="44" r="20" fill="${skin}"/><path d="M28 42c0-22 44-22 44 0-10-8-34-8-44 0z" fill="${hair}"/><circle cx="43" cy="46" r="2" fill="#222"/><circle cx="57" cy="46" r="2" fill="#222"/><path d="M14 100c2-22 16-30 36-30s34 8 36 30z" fill="${["#fff", "#e55", "#3a7", "#58f", "#fa3"][i % 5]}"/>`, bg);
}

const portrait = (bg = "#2f6b4b") => svg(`<ellipse cx="50" cy="38" rx="12" ry="14" fill="#a06a4a"/><path d="M36 34c0-22 28-22 28 0l4 38c-4 10-28 10-32 0z" fill="#241713"/><ellipse cx="50" cy="42" rx="10" ry="12" fill="#b77a58"/><path d="M26 100c2-26 12-34 24-34s22 8 24 34z" fill="#3f5a3c"/>`, bg);

const studioArt = () => svg(`<ellipse cx="68" cy="62" rx="12" ry="20" fill="#c98a6a" transform="rotate(8 68 62)"/><g fill="#3a1f18"><circle cx="58" cy="42" r="9"/><circle cx="68" cy="36" r="10"/><circle cx="78" cy="42" r="9"/><circle cx="56" cy="54" r="8"/><circle cx="80" cy="54" r="8"/></g><ellipse cx="68" cy="52" rx="10" ry="13" fill="#d09474"/><g fill="#d89a3a" stroke="#6a3b10" stroke-width=".6"><circle cx="63" cy="50" r="3.4"/><circle cx="73" cy="50" r="3.4"/></g><path d="M64 60c3 2 6 2 8 0" stroke="#b02a2a" stroke-width="1.4" fill="none"/><path d="M40 100c4-24 16-30 28-30s26 8 30 30z" fill="#f2b9a8"/>`, "#2f56b8");

/* ---------- Helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => 1 - Math.pow(1 - t, 3);
const vh = () => window.innerHeight;

function makeCard(art, i, extra = "") {
  const el = document.createElement("div");
  el.className = "card " + extra;
  el.style.setProperty("--i", i);
  el.innerHTML = ART[art]();
  return el;
}

/* split headings into blurred words */
$$("[data-split]").forEach((h) => {
  let n = 0;
  const walk = (node) => {
    [...node.childNodes].forEach((c) => {
      if (c.nodeType === 3) {
        const frag = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach((t) => {
          if (!t.trim()) return frag.append(t);
          const s = document.createElement("span");
          s.className = "w"; s.style.setProperty("--i", n++); s.textContent = t;
          frag.append(s);
        });
        c.replaceWith(frag);
      } else if (c.nodeType === 1 && c.tagName !== "BR") walk(c);
    });
  };
  walk(h);
});

/* reveal on view */
const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.25 });
$$(".blur-words, .reveal").forEach((el) => io.observe(el));

/* ---------- HERO: stack → fan ---------- */
const heroFan = $("#heroFan");
const heroCards = HERO_ART.map((a, i) => {
  const c = makeCard(a, i);
  c.style.setProperty("--r", `${(i - 3) * 3}deg`);
  c.style.zIndex = i;
  c.style.transitionDelay = `${i * 70}ms`;
  heroFan.append(c);
  return c;
});
const heroTags = ["@tola", "@sera"];
const FAN = [[-1, 0.9, -8], [-0.67, 0.12, -6], [-0.34, -0.02, -3], [0, 0, 0], [0.3, 0.03, 4], [0.63, -0.04, 8], [0.97, 0.04, 6]];
function spreadHero() {
  const w = heroFan.clientWidth;
  heroCards.forEach((c, i) => {
    const [x, y, r] = FAN[i];
    c.style.setProperty("--x", `${x * w * 0.46}px`);
    c.style.setProperty("--y", `${y * 22}px`);
    c.style.setProperty("--r", `${r}deg`);
  });
}
heroCards[0].insertAdjacentHTML("beforeend", `<span class="tag" style="background:#3340e8">${heroTags[0]}</span>`);
heroCards[6].insertAdjacentHTML("beforeend", `<span class="tag" style="background:#2f7a52">${heroTags[1]}</span>`);
// start stacked, falling in, then spread
heroCards.forEach((c, i) => { c.style.setProperty("--y", "-30px"); c.style.opacity = i === 6 ? 1 : 0; });
setTimeout(() => heroCards[6].style.setProperty("--y", "0px"), 200);
setTimeout(() => { heroCards.forEach((c) => (c.style.opacity = 1)); }, 900);
setTimeout(spreadHero, 1500);
window.addEventListener("resize", spreadHero);

/* ---------- CASCADE (scroll driven) ---------- */
const cascade = $("#cascade");
const cascCards = CASCADE_ART.map((a, i) => { const c = makeCard(a, i, "live"); c.style.zIndex = CASCADE_ART.length - i; cascade.append(c); return c; });
const tagC = [["@erin", "#e8452c", 0], ["@lena", "#111", 2]];
tagC.forEach(([t, bg, k]) => cascCards[k].insertAdjacentHTML("beforeend", `<span class="tag" style="background:${bg}">${t}</span>`));

/* ---------- STAGE fan ---------- */
const stageFan = $("#stageFan");
const stageCards = STAGE_ART.map((a, i) => { const c = makeCard(a, i, "live tall"); c.style.zIndex = i === 3 ? 9 : i; stageFan.append(c); return c; });
// statement words
const stEl = $("#statementText");
(function wrapWords(node) {
  [...node.childNodes].forEach((c) => {
    if (c.nodeType === 3) {
      const f = document.createDocumentFragment();
      c.textContent.split(/(\s+)/).forEach((t) => {
        if (!t.trim()) return f.append(t);
        const s = document.createElement("span"); s.className = "wd"; s.textContent = t; f.append(s);
      });
      c.replaceWith(f);
    } else if (c.nodeType === 1 && c.classList.contains("g")) {
      const t = c.textContent; c.textContent = "";
      t.split(/\s+/).forEach((w) => { const s = document.createElement("span"); s.className = "wd g"; s.textContent = w; c.append(s); });
    }
  });
})(stEl);
const stWords = $$(".wd", stEl);

/* ---------- STUDIO ---------- */
$(".studio-art").innerHTML = studioArt();
const frame = $("#studioFrame");

/* ---------- VISION: tabs + tools ---------- */
const grid = $("#grid3");
let tabIdx = 0;
function fillGrid(k) { grid.innerHTML = (k ? TAB_B : TAB_A).map((a, i) => `<div class="cell" style="--i:${i}">${ART[a]()}</div>`).join(""); }
fillGrid(0);
function setTab(k) {
  if (k === tabIdx) return;
  grid.classList.add("swap");
  setTimeout(() => { tabIdx = k; fillGrid(k); grid.classList.add("swap"); requestAnimationFrame(() => requestAnimationFrame(() => grid.classList.remove("swap"))); }, 450);
  $$(".tab").forEach((t) => t.classList.toggle("on", +t.dataset.tab === k));
}
$$(".tab").forEach((t) => t.addEventListener("click", () => { setTab(+t.dataset.tab); clearInterval(tabTimer); }));
let tabTimer = setInterval(() => { if (inView($(".panel"))) setTab(tabIdx ? 0 : 1); }, 3800);
const TOOLS = [
  ["M12 3l5 6-5 12-5-12z", 62, 30], ["M4 20l4-1 11-11-3-3L5 16z", 8, 80], ["M12 4a8 8 0 100 16 8 8 0 000-16z", 52, 70],
  ["M5 20L12 4l7 16M8 14h8", 108, 112], ["M12 3c4 5 6 8 6 11a6 6 0 01-12 0c0-3 2-6 6-11z", 6, 140],
  ["M4 8l8-5 8 5-8 5zM4 13l8 5 8-5", 40, 130], ["M6 6l12 12M18 6L6 18", 88, 150], ["M5 19L19 5", 150, 100],
];
$("#tools").innerHTML = TOOLS.map(([d, x, y], i) => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" style="left:${x}px;top:${y}px;animation-delay:${i * -.6}s"><path d="${d}"/></svg>`).join("");

/* ---------- COMMUNITY avatars ---------- */
$$(".avatars").forEach((row, r) => { row.innerHTML = Array.from({ length: 16 }, (_, i) => `<div class="av">${avatar(i + r * 7)}</div>`).join(""); });

/* ---------- STORIES ---------- */
const story = (art, t, d, l) => `<article class="story"><div class="story-img">${ART[art]()}</div><h3>${t}</h3><p>${d}</p><a href="#">${l} →</a></article>`;
$("#colA").innerHTML =
  story("david", "Make, show, sell", "Give buyers a way to own a piece of the story behind each work.", "How it works") +
  story("comic", "Turn your practice into income", "Prints, originals and commissions from one studio page, restocked every week.", "Join us now") +
  `<article class="story dark"><b>Your artist profile</b><small>Studio · Shop · Stories</small></article>`;
$("#colB").innerHTML =
  `<article class="story"><div class="story-img">${svg(`<defs><pattern id="cs" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><rect width="10" height="10" fill="#fff"/><rect width="5" height="10" fill="#e5412b"/></pattern></defs><g stroke="#fff" stroke-width="2" opacity=".7"><path d="M0 40h30M0 50h26M0 60h34"/></g><circle cx="58" cy="50" r="28" fill="url(#cs)"/><circle cx="60" cy="50" r="15" fill="#f4f4f4"/><circle cx="62" cy="50" r="9" fill="#111"/>`, "#2438d8")}</div><h3>Where craft meets commerce</h3><p>Work made with care, sold with fair fees, to buyers who came for it.</p><a href="#">Read more →</a></article>` +
  story("swirl", "Studio sessions", "Step inside artists' studios and meet the people behind the work.", "Watch now") +
  story("shoe", "Collect with confidence", "Every piece verified, every artist paid fairly.", "Learn more");

/* ---------- CAROUSEL ---------- */
const ITEMS = [
  ["Grid Study", "Ines Okafor · $340", `<div style="background:#0f0f10 radial-gradient(circle,#fff 0 24%,transparent 25%) 0 0/12px 12px;filter:contrast(1.2)"></div>`],
  ["Spectrum Fold", "Teo Marsh · $380", `<div style="background:linear-gradient(135deg,#2a0f5a 0%,#2a0f5a 25%,#ff3b30 25%,#ff9500 38%,#ffd60a 50%,#34c759 62%,#0a84ff 75%,#2a0f5a 75%)"></div>`],
  ["Burst No. 4", "Mila Sato · $520", `<div style="background:repeating-conic-gradient(from 10deg,#e8321e 0 12deg,#0a56c8 12deg 24deg,#ffd60a 24deg 36deg,#1d9b4a 36deg 48deg)"></div>`],
  ["Night Rider", "Arlo Benn · $1,260", `<div style="background:radial-gradient(circle at 40% 55%,#e03a2a 0 18%,transparent 19%),repeating-radial-gradient(circle at 70% 20%,#1a3a8a 0 6px,#2c6fb0 6px 12px,#1f6a4a 12px 18px)"></div>`],
  ["Soft Hours", "Juno K · $290", `<div style="background:linear-gradient(160deg,#f1e2c8,#e6c9a0 60%,#d8b184)"></div>`],
  ["Low Tide", "Pia Rao · $410", `<div style="background:linear-gradient(180deg,#bfe1e8,#6eb3c4 55%,#2d6a8a)"></div>`],
];
$("#track").innerHTML = ITEMS.map(([t, s, a]) => `<div class="item"><div class="im">${a}</div><b>${t}</b><small>${s}</small></div>`).join("");
const track = $("#track"), fill = $("#barFill");
const step = () => ($(".item", track).offsetWidth + 18);
$("#next").onclick = () => track.scrollBy({ left: step(), behavior: "smooth" });
$("#prev").onclick = () => track.scrollBy({ left: -step(), behavior: "smooth" });
track.addEventListener("scroll", () => {
  const max = track.scrollWidth - track.clientWidth || 1, p = track.scrollLeft / max;
  fill.style.width = 30 + p * 70 + "%";
});

/* ---------- FINALE ---------- */
$(".hero-card-art").innerHTML = portrait();
const facesL = $("#facesL"), facesR = $("#facesR");
facesL.innerHTML = Array.from({ length: 6 }, (_, i) => `<div class="face">${face(i)}</div>`).join("");
facesR.innerHTML = Array.from({ length: 6 }, (_, i) => `<div class="face">${face(i + 6)}</div>`).join("");
const heroCard = $("#heroCard");

/* ---------- Scroll engine ---------- */
function inView(el) { const r = el.getBoundingClientRect(); return r.top < vh() && r.bottom > 0; }
const secProgress = (el) => { const r = el.getBoundingClientRect(); return clamp(-r.top / (r.height - vh())); };
const viewProgress = (el) => { const r = el.getBoundingClientRect(); return clamp((vh() - r.top) / (vh() + r.height)); };

const CASC = [[0, 0, -4], [0.34, 0.2, 4], [0.68, 0.38, -3], [1.02, 0.56, 5], [1.36, 0.74, -2], [1.7, 0.92, 4]];

function frameUpdate() {
  // cascade
  if (inView(cascade)) {
    const p = ease(clamp(viewProgress(cascade) * 2 - 0.2));
    const cw = cascade.clientWidth, ch = cascade.clientHeight;
    cascCards.forEach((c, i) => {
      const [x, y, r] = CASC[i];
      c.style.setProperty("--x", `${lerp(i * 6, x * cw * 0.34, p)}px`);
      c.style.setProperty("--y", `${lerp(i * 4, y * ch * 0.5, p)}px`);
      c.style.setProperty("--r", `${lerp(0, r, p)}deg`);
    });
  }
  // studio frame
  frame.style.setProperty("--sc", lerp(0.9, 1, ease(clamp(viewProgress(frame) * 2.2 - 0.2))));
  // statement
  const st = $("#statement");
  if (inView(st)) {
    const t = secProgress(st);
    const spread = ease(clamp(t * 2.2));
    const w = stageFan.clientWidth;
    const SP = [-0.95, -0.62, -0.3, 0, 0.3, 0.6];
    stageCards.forEach((c, i) => {
      c.style.setProperty("--x", `${lerp((i - 3) * 6, SP[i] * w * 0.42, spread)}px`);
      c.style.setProperty("--y", `${lerp(0, Math.abs(i - 3) * -4, spread)}px`);
      c.style.setProperty("--r", `${lerp(0, (i - 3) * 4, spread)}deg`);
    });
    const n = Math.round(clamp((t - 0.05) / 0.5) * stWords.length);
    stWords.forEach((wd, i) => wd.classList.toggle("on", i < n));
  }
  // avatars drift
  $$(".avatars").forEach((row) => {
    const p = viewProgress(row), dir = +row.dataset.dir;
    row.style.transform = `translateX(${(p - 0.5) * 360 * dir}px)`;
  });
  // stories parallax
  $$(".col").forEach((col) => { const p = viewProgress($(".stories-cols")) - 0.5; col.style.transform = `translateY(${p * 160 * +col.dataset.speed * -10 / 10}px)`; });
  // finale: card shrinks, faces fade in
  const fin = $("#finale");
  if (inView(fin)) {
    const t = secProgress(fin);
    const s = ease(clamp((t - 0.05) / 0.55));
    const vw = window.innerWidth, H = vh();
    const small = vw < 860;
    const endW = small ? 120 : clamp(vw * 0.11, 120, 170), endH = endW * 1.45;
    heroCard.style.setProperty("--cw", `${lerp(vw * 0.86, endW, s)}px`);
    heroCard.style.setProperty("--ch", `${lerp(H * 0.62, endH, s)}px`);
    heroCard.style.setProperty("--cr", `${lerp(22, 12, s)}px`);
    const fo = clamp((s - 0.35) / 0.65);
    fin.style.setProperty("--fo", fo);
    $$(".faces, .like, .artist, .by", fin).forEach((e) => e.style.setProperty("--fo", fo));
    $$(".face", fin).forEach((e) => e.style.setProperty("--fo", fo));
    $("#toolbar").style.opacity = 1 - clamp(s * 1.6);
    // slow vertical drift of grid after fully formed
    const drift = clamp((t - 0.65) / 0.35);
    $$(".faces", fin).forEach((e, i) => (e.style.transform = `translateY(calc(-50% - ${drift * (i ? 90 : 60)}px))`));
  }
}
let ticking = false;
const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { frameUpdate(); ticking = false; }); } };
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
frameUpdate();
