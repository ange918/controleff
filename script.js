/* =====================================================================
   Sonance Studio — interactions
   ===================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => 1 - Math.pow(1 - t, 3);
const easeIO = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const W = () => window.innerWidth;
const H = () => window.innerHeight;
const isM = () => window.innerWidth < 760;
const vwpx = (v) => (W() * v) / 100;
const secProgress = (el) => { const r = el.getBoundingClientRect(); return clamp(-r.top / Math.max(1, r.height - H())); };
const viewProgress = (el) => { const r = el.getBoundingClientRect(); return clamp((H() - r.top) / (H() + r.height)); };
const inView = (el, pad = 0) => { const r = el.getBoundingClientRect(); return r.top < H() + pad && r.bottom > -pad; };

/* ---------------------------------------------------------------------
   Content
   --------------------------------------------------------------------- */
$$("[data-art]").forEach((el) => (el.innerHTML = ART[el.dataset.art]()));

const rowA = ["a1", "a2", "a3", "a4", "a5", "a2", "a1", "a3"], rowB = ["a5", "a4", "a2", "a3", "a1", "a4", "a5", "a2"];
$("#row1").innerHTML = rowA.map((a) => `<div class="at">${ART[a]()}</div>`).join("");
$("#row2").innerHTML = rowB.map((a) => `<div class="at">${ART[a]()}</div>`).join("");

const PROJECTS = [
  ["VORTEX", "Fashion Film / Kinetic / Avant-Garde / Choreography", "Shot inside an abandoned warehouse. The movement was improvised to a custom ambient score played on-set.", "vortex"],
  ["PRISM", "Experimental / Color / Projection / Lightplay", "Light mapping on moving surfaces — no repeatable setups, all fluid and reactive.", "prism"],
  ["SILK", "Femininity / Fabric / Softness / Grace", "Entire shoot was handheld to mimic human intimacy; no soundtrack, only ambient room tone.", "silk"],
  ["RIFT", "Geometry / Architecture / Tension / Concept", "Practical glass breaks and collapses were shot in-camera — no VFX.", "rift"],
  ["MIRAGE", "Surreal / Water / Reflection / Dream", "The studio floor was flooded, all light bounced off ripples to distort reality.", "mirage"],
  ["GLAIRE", "Streetwear / Neon / Urban / Motion", "We shot in real urban locations during nightfall — no permits, real-time crowd interaction.", "glaire"],
];
$("#panels").innerHTML = PROJECTS.map(([t, tags, d, a], i) => `<article class="panel" style="z-index:${i + 1}"><div class="pimg">${ART[a]()}</div><p class="pdesc rv">${d}</p><div class="ptitle"><h3 class="glitch" data-glitch>${t}</h3><p class="rv">${tags}</p></div></article>`).join("");

const PEOPLE = [["Felix Hart", "Creative Director", "t1"], ["Isla Kent", "Lead Photographer", "t2"], ["Theo Blake", "Cinematographer", "t3"], ["Poppy Green", "Art & Styling Director", "t4"], ["Hugo Ellis", "Post-Production Artist", "t5"], ["Ava Monroe", "Studio Producer", "t6"]];
$("#people").innerHTML = PEOPLE.map(([n, r, a]) => `<figure class="person rv"><div class="ph">${ART[a]()}</div><figcaption class="who"><b>${n}</b><span>${r}</span></figcaption></figure>`).join("");

const FAQ = [
  ["What type of clients do you work with?", "Fashion houses, independent labels, musicians, galleries and studios of every size. If the idea is bold, we are interested."],
  ["Do you offer full-service production?", "Yes. From concept and casting to location, crew, shoot and post-production, with one team and one point of contact."],
  ["Can we book just one service, like photography or editing?", "Absolutely. Every service can be booked on its own, and we can scale up to a full production whenever you need it."],
  ["How far in advance should we book?", "Four to six weeks is ideal for a full production. Smaller shoots can often be scheduled within two weeks."],
  ["Do you work internationally?", "We are based in London and travel worldwide. Travel and local crew are quoted separately."],
  ["What's your pricing structure?", "Flexible packages shaped around the scale, style and ambition of the project. Every quote is tailored."],
];
$("#qa").innerHTML = FAQ.map(([q, a]) => `<div class="q rv"><button aria-expanded="false"><span>${q}</span><i>+</i></button><div class="a"><p>${a}</p></div></div>`).join("");
$$(".q button").forEach((b) => b.addEventListener("click", () => {
  const q = b.parentElement, a = $(".a", q), open = q.classList.toggle("open");
  b.setAttribute("aria-expanded", open);
  a.style.maxHeight = open ? a.scrollHeight + "px" : "0px";
}));

/* collage pops for the method section */
const POPS = [
  { art: "lips", x: 3, w: 36, h: 24, y0: 22, y1: -10, a: 0.2, b: 0.52 },
  { art: "blueabs", x: 72, w: 21, h: 23, y0: 24, y1: -4, a: 0.28, b: 0.58 },
  { art: "sunglass", x: 46, w: 29, h: 28, y0: 26, y1: -8, a: 0.4, b: 0.74 },
  { art: "prism", x: 3, w: 29, h: 17, y0: 30, y1: 8, a: 0.44, b: 0.78 },
];
$("#pops").innerHTML = POPS.map((p) => `<div class="pop">${ART[p.art]()}</div>`).join("");
const popEls = $$(".pop");

/* ---------------------------------------------------------------------
   Glitch headings
   --------------------------------------------------------------------- */
function prepGlitch(el) {
  const lines = el.innerHTML.split(/<br\s*\/?>/i);
  el.innerHTML = lines.map((t) => `<span class="gl-line"><span class="gl-base">${t}</span></span>`).join("");
}
function playGlitch(el) {
  if (el._played) return;
  el._played = true;
  const fs = parseFloat(getComputedStyle(el).fontSize);
  const t0 = performance.now();
  const N = 6;
  const all = [];
  $$(".gl-line", el).forEach((line, li) => {
    const txt = $(".gl-base", line).textContent;
    for (let i = 0; i < N; i++) {
      const s = document.createElement("span");
      s.className = "gl-slice";
      s.textContent = txt;
      s.style.clipPath = `inset(${(i / N) * 100}% 0 ${100 - ((i + 1) / N) * 100}% 0)`;
      line.appendChild(s);
      all.push({ s, i, li, seed: Math.random() * 100 });
    }
  });
  const dur = 1000;
  const tick = (now) => {
    let alive = false;
    all.forEach((o) => {
      const p = clamp((now - t0 - o.li * 140) / dur);
      if (p <= 0) { o.s.style.opacity = 0; alive = true; return; }
      if (p >= 1) { o.s.style.opacity = 0; return; }
      alive = true;
      const k = 1 - ease(p);
      const n = Math.sin(now * 0.035 + o.seed) * Math.cos(now * 0.021 + o.seed * 2);
      const dx = n * k * fs * 0.55;
      const dy = (o.i % 2 ? 1 : -1) * k * fs * (0.15 + Math.abs(Math.sin(o.seed)) * 0.75);
      o.s.style.transform = `translate(${dx}px,${dy}px)`;
      const flick = p < 0.12 ? 0 : Math.sin(now * 0.05 + o.seed * 5) > -0.7 ? 1 : 0;
      o.s.style.opacity = flick;
    });
    if (alive) requestAnimationFrame(tick);
    else el.classList.add("done");
    if (!alive) $$(".gl-slice", el).forEach((s) => s.remove());
    // reveal the clean base once the slices are mostly settled
    if (now - t0 > dur * 0.7 + 140) el.classList.add("done");
  };
  requestAnimationFrame(tick);
}
$$("[data-glitch]").forEach(prepGlitch);

/* ---------------------------------------------------------------------
   Reveal on view
   --------------------------------------------------------------------- */
$$(".list li, .table li").forEach((li, i) => li.style.setProperty("--d", `${(i % 8) * 0.07}s`));
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (!e.isIntersecting) return;
  const el = e.target;
  if (el.matches("[data-glitch]")) playGlitch(el);
  else el.classList.add("in");
  io.unobserve(el);
}), { threshold: 0.35, rootMargin: "0px 0px -6% 0px" });
$$("[data-glitch]:not([data-now]), .rv:not([data-now]), .rule, .list li, .table li").forEach((el) => io.observe(el));
window.addEventListener("load", () => setTimeout(() => {
  $$("[data-now]").forEach((el) => (el.matches("[data-glitch]") ? playGlitch(el) : el.classList.add("in")));
}, 250));
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => $$("[data-now]").forEach((el) => (el.matches("[data-glitch]") ? playGlitch(el) : el.classList.add("in"))));

/* ---------------------------------------------------------------------
   Menu
   --------------------------------------------------------------------- */
const menu = $("#menu"), menuBtn = $("#menuBtn");
const setMenu = (o) => { menu.classList.toggle("open", o); menuBtn.textContent = o ? "CLOSE" : "MENU"; menuBtn.setAttribute("aria-expanded", o); menu.setAttribute("aria-hidden", !o); };
menuBtn.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
$$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
window.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

/* ---------------------------------------------------------------------
   Warped grid canvas
   --------------------------------------------------------------------- */
function setupCanvas(cv) {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const r = cv.getBoundingClientRect();
  cv.width = Math.max(1, r.width * dpr); cv.height = Math.max(1, r.height * dpr);
  const ctx = cv.getContext("2d"); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: r.width, h: r.height };
}
function drawGrid({ ctx, w, h }, time, k, mode) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2, R = Math.min(w, h) * (mode === "cta" ? 0.62 : 0.46) * (1 + 0.22 * k);
  const amp = (mode === "cta" ? 0.55 : 0.95) * (1 + 0.15 * Math.sin(time * 0.0007));
  const wp = (x, y) => {
    const dx = x - cx, dy = y - cy, r = Math.hypot(dx, dy) / R;
    const s = 1 + amp * Math.exp(-r * r * 2.4);
    const sw = 0.04 * Math.sin(time * 0.0006 + y * 0.01) * Math.exp(-r * r);
    return [cx + dx * s + dx * sw, cy + dy * s];
  };
  ctx.lineWidth = 1;
  ctx.strokeStyle = mode === "cta" ? "rgba(255,255,255,.16)" : "rgba(255,255,255,.30)";
  const cols = mode === "cta" ? 10 : 28, rows = mode === "cta" ? 6 : 16, step = 10;
  ctx.beginPath();
  for (let i = 0; i <= cols; i++) {
    const x = (i / cols) * w;
    for (let y = 0; y <= h; y += step) { const [px, py] = wp(x, y); y === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); }
  }
  for (let j = 0; j <= rows; j++) {
    const y = (j / rows) * h;
    for (let x = 0; x <= w; x += step) { const [px, py] = wp(x, y); x === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py); }
  }
  ctx.stroke();
  // contour loops (rounded diamond)
  ctx.strokeStyle = mode === "cta" ? "rgba(255,255,255,.22)" : "rgba(255,255,255,.55)";
  const loops = mode === "cta" ? [0.5, 0.78] : [0.19, 0.27, 0.36];
  loops.forEach((lr, li) => {
    ctx.beginPath();
    for (let a = 0; a <= 360; a += 3) {
      const t = (a * Math.PI) / 180 + li * 0.15 + Math.sin(time * 0.0004 + li) * 0.05;
      const e = 2.4 + li * 0.2;
      const c = Math.cos(t), s = Math.sin(t);
      const rr = R * lr * (1 + 0.06 * Math.sin(t * 3 + time * 0.0008 + li)) / Math.pow(Math.pow(Math.abs(c), e) + Math.pow(Math.abs(s), e), 1 / e);
      const px = cx + rr * c * (mode === "cta" ? 1.5 : 1.15), py = cy + rr * s * 0.9;
      a === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath(); ctx.stroke();
  });
}
let warpC, ctaC;
const initCanvases = () => { warpC = setupCanvas($("#warpCanvas")); ctaC = setupCanvas($("#ctaCanvas")); };
initCanvases();
window.addEventListener("resize", () => { initCanvases(); onScroll(); });

/* ---------------------------------------------------------------------
   Scroll engine
   --------------------------------------------------------------------- */
const heroImg = $(".hero-img"), topBar = $("#top"), strip = $("#strip");
const archStage = $("#archStage"), row1 = $("#row1"), row2 = $("#row2"), archGrid = $("#archGrid"), archDim = $("#archDim"), peek = $("#peek");
const warp = $("#warp"), warpText = $("#warpText"), cta = $("#cta"), stepsWrap = $("#stepsWrap");
const panels = $$(".panel");
let warpT = 0;

function frameUpdate() {
  const y = window.scrollY, h = H();

  topBar.classList.toggle("solid", y > h * 0.75);
  if (y < h * 1.2) heroImg.style.transform = `translateY(${y * 0.28}px) scale(${1 + y / h * 0.04})`;

  // gallery strip: fade from dark to full brightness while scrolling in
  if (inView(strip)) {
    const p = viewProgress(strip);
    strip.style.setProperty("--b", lerp(0.16, 1, ease(clamp((p - 0.2) / 0.32))));
    $$(".tile", strip).forEach((t, i) => (t.style.transform = `translateY(${(0.5 - p) * (i % 2 ? 6 : 3) * 8}px)`));
  }

  // archive: two rows drift in opposite directions, grid zooms, then a glitching preview appears
  if (inView(archStage)) {
    const t = secProgress(archStage), m = isM();
    const tile = vwpx(m ? 62 : 26.4) + vwpx(m ? 2 : 0.9);
    row1.style.transform = `translateX(${lerp(0, -tile * 1.8, t)}px)`;
    row2.style.transform = `translateX(${lerp(-tile * 0.5, tile * 0.5, t)}px)`;
    const z = 1 + (m ? 0.1 : 0.26) * ease(clamp(t / 0.55));
    archGrid.style.transform = `translateY(${lerp(0, -h * 0.1, t)}px) scale(${z})`;
    const dim = clamp((t - 0.5) / 0.14) * 0.78;
    archDim.style.opacity = dim;
    const pk = clamp((t - 0.56) / 0.12) * (1 - clamp((t - 0.93) / 0.07));
    const glitching = t > 0.8;
    peek.style.opacity = pk;
    peek.style.transform = `translate(-50%,-50%) translate(${lerp(-4, 3, t)}vw,${lerp(-3, 4, t)}vh) scale(${lerp(0.6, 1, ease(clamp((t - 0.56) / 0.14)))})`;
    peek.classList.toggle("glitching", glitching);
    const g = glitching ? 1 : 0, now = performance.now();
    peek.style.setProperty("--gi", g ? 0.9 : 0);
    peek.style.setProperty("--gx", g ? `${Math.sin(now * 0.03) * 0.8}vw` : "0");
    peek.style.setProperty("--gy", g ? `${Math.cos(now * 0.04) * 0.5}vw` : "0");
    peek.style.setProperty("--hu", `${(t - 0.8) * 500}deg`);
  }

  // warp text scrub
  if (inView(warp)) {
    warpT = secProgress(warp);
    const tw = warpText.scrollWidth;
    warpText.style.transform = `translate(${lerp(W() * 0.96, -tw - W() * 0.06, easeIO(clamp((warpT - 0.06) / 0.88)) )}px,-50%)`;
  }

  // project panels: subtle parallax
  panels.forEach((p) => {
    const r = p.getBoundingClientRect();
    if (r.bottom < 0 || r.top > h) return;
    const pr = clamp((h - r.top) / (h + r.height));
    $(".pimg", p).style.transform = `translateY(${(0.5 - pr) * 7}%)`;
  });

  // method: images pop in & drift upward over the cards
  if (inView(stepsWrap, 400)) {
    const p = viewProgress(stepsWrap);
    POPS.forEach((c, i) => {
      const el = popEls[i];
      const r = clamp((p - c.a) / 0.08), o = clamp((c.b - p) / 0.07);
      const run = clamp((p - c.a) / (c.b - c.a));
      const m = isM();
      el.style.opacity = r > 0 && o > 0 ? 1 : 0;
      el.style.width = `${m ? c.w * 1.6 : c.w}vw`;
      el.style.height = `${m ? c.h * 1.6 : c.h}vw`;
      el.style.left = `${m ? Math.min(c.x * 1.2, 40) : c.x}vw`;
      el.style.top = `${lerp(m ? c.y0 * 2 : c.y0, m ? c.y1 * 2 : c.y1, run)}vw`;
      el.style.clipPath = `inset(${(1 - ease(r)) * 100}% 0 ${(1 - ease(o)) * 100}% 0)`;
    });
  }
}

let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { frameUpdate(); ticking = false; });
}
window.addEventListener("scroll", onScroll, { passive: true });

/* canvases animate continuously while visible */
function loop(now) {
  if (inView(warp)) drawGrid(warpC, now, warpT, "warp");
  if (inView(cta)) drawGrid(ctaC, now, 0.4, "cta");
  const archT = inView(archStage) ? secProgress(archStage) : 0;
  if (archT > 0.8 && archT < 1) frameUpdate();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
frameUpdate();
