/* ===================================================================
   Academic Services Nursepnu — Design System
   Faculty of Nursing, Princess of Naradhiwas University
   Premium emerald/gold dashboard · Thai-first
=================================================================== */

:root {
  /* ---- Brand palette: modern blue + warm gold ---- */
  --emerald-950: #030d1a;
  --emerald-900: #0a1628;
  --emerald-800: #1e3a8a;
  --emerald-700: #1d4ed8;
  --emerald-600: #2563eb;
  --emerald-500: #3b82f6;
  --emerald-400: #60a5fa;
  --emerald-300: #93c5fd;
  --emerald-200: #bfdbfe;
  --emerald-100: #dbeafe;
  --emerald-50:  #eff6ff;

  --gold-700: #b45309;
  --gold-600: #d97706;
  --gold-500: #f59e0b;
  --gold-400: #fbbf24;
  --gold-300: #fde68a;
  --gold-100: #fef9ee;

  /* ---- Neutrals (slate) ---- */
  --ink-900: #0f172a;
  --ink-700: #1e293b;
  --ink-500: #475569;
  --ink-400: #64748b;
  --ink-300: #94a3b8;
  --line:    #e2e8f0;
  --line-soft: #f1f5f9;
  --surface: #ffffff;
  --canvas:  #f8fafc;
  --canvas-2: #f1f5f9;

  /* ---- Status ---- */
  --ok:    #2563eb;
  --warn:  #f59e0b;
  --danger:#e11d48;
  --info:  #6366f1;

  /* ---- Shape / depth ---- */
  --r-sm: 10px;
  --r-md: 16px;
  --r-lg: 22px;
  --r-xl: 28px;
  --shadow-sm: 0 1px 2px rgba(15,23,42,.05), 0 1px 3px rgba(15,23,42,.04);
  --shadow-md: 0 6px 18px -6px rgba(15,23,42,.14), 0 2px 6px rgba(15,23,42,.05);
  --shadow-lg: 0 24px 48px -18px rgba(15,23,42,.28), 0 8px 24px -12px rgba(15,23,42,.14);
  --shadow-glow: 0 0 0 1px rgba(96,165,250,.25), 0 14px 40px -12px rgba(59,130,246,.40);

  --ease: cubic-bezier(.22,.61,.36,1);
  --ease-out: cubic-bezier(.16,1,.3,1);

  --sidebar-w: 264px;
  --topbar-h: 72px;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  font-family: 'IBM Plex Sans Thai', system-ui, sans-serif;
  color: var(--ink-900);
  background: var(--canvas);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

body { overflow-x: hidden; }

h1,h2,h3,h4,h5 { font-family: 'Kanit', sans-serif; font-weight: 600; margin: 0; letter-spacing: -.01em; line-height: 1.3; }
.num { font-family: 'Kanit', sans-serif; font-feature-settings: "tnum" 1; font-variant-numeric: tabular-nums; }

button { font-family: inherit; cursor: pointer; }
input, select, textarea { font-family: inherit; }
::selection { background: var(--emerald-200); }

/* ---- Scrollbars ---- */
::-webkit-scrollbar { width: 11px; height: 11px; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 99px; border: 3px solid var(--canvas); }
::-webkit-scrollbar-thumb:hover { background: #b3c4bd; }

/* ===================================================================
   App shell
=================================================================== */
.app {
  display: grid;
  grid-template-columns: var(--sidebar-w) 1fr;
  min-height: 100vh;
  background:
    radial-gradient(1200px 600px at 85% -10%, var(--emerald-100), transparent 60%),
    radial-gradient(900px 500px at -5% 110%, #eef3ff, transparent 55%),
    var(--canvas);
}

/* ---- Sidebar ---- */
.sidebar {
  position: sticky; top: 0; align-self: start;
  height: 100vh;
  display: flex; flex-direction: column;
  background:
    radial-gradient(600px 300px at 30% 0%, rgba(37,99,235,.18), transparent 60%),
    linear-gradient(195deg, #1e3a8a, #0f172a 78%);
  color: #dbeafe;
  padding: 22px 16px;
  border-right: 1px solid rgba(255,255,255,.06);
  z-index: 40;
}
.brand { display: flex; align-items: center; gap: 13px; padding: 6px 8px 22px; }
.brand-mark {
  width: 46px; height: 46px; border-radius: 13px; flex: none;
  display: grid; place-items: center;
  background: linear-gradient(150deg, var(--gold-400), var(--gold-600));
  box-shadow: 0 8px 22px -8px rgba(201,162,75,.7), inset 0 1px 0 rgba(255,255,255,.5);
  color: var(--emerald-950); position: relative; overflow: hidden;
}
.brand-mark svg { width: 26px; height: 26px; }
.brand-mark::after {
  content:""; position:absolute; inset:0;
  background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,.55) 50%, transparent 70%);
  transform: translateX(-130%); animation: shine 5.5s var(--ease) infinite 1.5s;
}
@keyframes shine { 0%{transform:translateX(-130%)} 18%,100%{transform:translateX(130%)} }
.brand-text { line-height: 1.15; }
.brand-text .t1 { font-family:'Kanit'; font-weight: 600; font-size: 16px; color: #fff; }
.brand-text .t2 { font-size: 11.5px; color: #93c5fd; letter-spacing:.02em; }

.nav { display: flex; flex-direction: column; gap: 4px; margin-top: 6px; }
.nav-label { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: rgba(147,197,253,.5); padding: 14px 12px 6px; font-weight:600; }
.nav-item {
  display: flex; align-items: center; gap: 12px;
  padding: 11px 13px; border-radius: 12px;
  color: #bfdbfe; font-size: 14.5px; font-weight: 500;
  background: transparent; border: 0; width: 100%; text-align: left;
  transition: all .2s var(--ease); position: relative;
}
.nav-item svg { width: 19px; height: 19px; flex: none; opacity: .82; transition: transform .25s var(--ease); }
.nav-item:hover { background: rgba(255,255,255,.07); color: #fff; }
.nav-item:hover svg { transform: translateX(1px) scale(1.06); }
.nav-item.active {
  background: linear-gradient(100deg, rgba(59,130,246,.28), rgba(59,130,246,.08));
  color: #fff;
  box-shadow: inset 0 0 0 1px rgba(147,197,253,.3);
}
.nav-item.active::before {
  content:""; position: absolute; left: -16px; top: 50%; transform: translateY(-50%);
  width: 4px; height: 22px; border-radius: 0 4px 4px 0;
  background: linear-gradient(var(--gold-300), var(--gold-500));
  box-shadow: 0 0 14px var(--gold-400);
}
.nav-item.active svg { opacity: 1; color: #93c5fd; }
.nav-badge { margin-left:auto; font-family:'Kanit'; font-size:11.5px; background:rgba(255,255,255,.12); padding:1px 8px; border-radius:99px; }

.sidebar-foot { margin-top: auto; padding: 14px 10px 4px; }
.year-pill {
  display:flex; align-items:center; gap:10px; padding: 12px 14px; border-radius: 14px;
  background: rgba(15,23,42,.5); border: 1px solid rgba(147,197,253,.18);
}
.year-pill .lbl { font-size: 11px; color: #93c5fd; }
.year-pill .val { font-family:'Kanit'; font-weight:600; color:#fff; font-size: 15px; }
.year-pill .dot { width:8px; height:8px; border-radius:99px; background: var(--gold-400); box-shadow:0 0 10px var(--gold-400); animation: pulse 2.4s infinite; }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }

/* ---- Main column ---- */
.main { min-width: 0; display: flex; flex-direction: column; }

.topbar {
  position: sticky; top: 0; z-index: 30;
  height: var(--topbar-h);
  display: flex; align-items: center; gap: 16px;
  padding: 0 28px;
  background: rgba(248,250,252,.92);
  backdrop-filter: blur(14px) saturate(1.2);
  -webkit-backdrop-filter: blur(14px) saturate(1.2);
  border-bottom: 1px solid var(--line);
}
.topbar .page-eyebrow { font-size: 12px; color: var(--ink-400); letter-spacing:.02em; }
.topbar .page-title { font-size: 20px; font-weight: 600; line-height:1.1; }
.topbar .spacer { flex: 1; }
.hamburger { display:none; width:42px; height:42px; border-radius:12px; border:1px solid var(--line); background:var(--surface); align-items:center; justify-content:center; }
.hamburger svg { width:22px; height:22px; color: var(--emerald-700); }

.searchbox {
  display: flex; align-items: center; gap: 9px;
  background: var(--surface); border: 1px solid var(--line);
  border-radius: 12px; padding: 9px 14px; min-width: 230px;
  transition: all .2s var(--ease); box-shadow: var(--shadow-sm);
}
.searchbox:focus-within { border-color: var(--emerald-400); box-shadow: 0 0 0 4px var(--emerald-100); }
.searchbox svg { width: 17px; height: 17px; color: var(--ink-400); }
.searchbox input { border: 0; outline: 0; background: transparent; width: 100%; font-size: 14px; color: var(--ink-900); }

.yearselect {
  display:flex; align-items:center; gap:8px; background: var(--surface); border:1px solid var(--line);
  border-radius:12px; padding: 8px 12px; box-shadow: var(--shadow-sm); font-size:14px; color: var(--ink-700);
}
.yearselect select { border:0; outline:0; background:transparent; font-weight:600; color: var(--emerald-700); font-family:'Kanit'; }
.yearselect svg { width:16px;height:16px; color: var(--emerald-600); }

.content { padding: 28px; max-width: 1480px; width: 100%; margin: 0 auto; }
.view { animation: viewIn .5s var(--ease-out) both; }
@keyframes viewIn { from { transform: translateY(16px); } to { transform: none; } }

/* ===================================================================
   Buttons / chips
=================================================================== */
.btn {
  display: inline-flex; align-items: center; gap: 8px; justify-content:center;
  border: 1px solid transparent; border-radius: 12px;
  padding: 10px 16px; font-size: 14px; font-weight: 600;
  transition: all .2s var(--ease); white-space: nowrap;
}
.btn svg { width: 17px; height: 17px; }
.btn-primary { background: linear-gradient(165deg, var(--emerald-600), var(--emerald-800)); color: #fff; box-shadow: 0 10px 24px -10px rgba(14,92,74,.7); }
.btn-primary:hover { transform: translateY(-1px); box-shadow: 0 16px 30px -10px rgba(14,92,74,.75); }
.btn-primary:active { transform: translateY(0); }
.btn-gold { background: linear-gradient(165deg, var(--gold-500), var(--gold-700)); color: #2a2008; box-shadow: 0 10px 24px -10px rgba(184,140,45,.7); }
.btn-gold:hover { transform: translateY(-1px); }
.btn-ghost { background: var(--surface); border-color: var(--line); color: var(--ink-700); box-shadow: var(--shadow-sm); }
.btn-ghost:hover { border-color: var(--emerald-300); color: var(--emerald-700); }
.btn-quiet { background: transparent; color: var(--ink-500); }
.btn-quiet:hover { background: var(--canvas-2); color: var(--ink-900); }
.btn-danger { background: #fdecef; color: var(--danger); border-color:#f6d2d9; }
.btn-danger:hover { background: var(--danger); color:#fff; }
.btn-sm { padding: 7px 12px; font-size: 13px; border-radius:10px; }
.btn-icon { padding: 9px; border-radius: 10px; }

.chip {
  display:inline-flex; align-items:center; gap:6px; font-size: 12.5px; font-weight: 600;
  padding: 4px 11px; border-radius: 99px; line-height: 1.5;
}
.chip-dot { width:7px; height:7px; border-radius:99px; }
.chip.done   { background: #dcfce7; color: #15803d; }
.chip.done .chip-dot { background: #22c55e; }
.chip.active { background: #fff4e0; color: var(--gold-700); }
.chip.active .chip-dot { background: var(--gold-500); animation: pulse 1.8s infinite; }
.chip.plan   { background: var(--emerald-50); color: var(--emerald-600); }
.chip.plan .chip-dot { background: var(--emerald-500); }

.cat-tag { display:inline-flex; align-items:center; gap:7px; font-size:12.5px; color: var(--ink-500); }
.cat-tag .sw { width:9px;height:9px;border-radius:3px; }

/* ===================================================================
   Cards
=================================================================== */
.card {
  background: var(--surface); border: 1px solid var(--line);
  border-radius: var(--r-lg); box-shadow: var(--shadow-sm);
}
.card-pad { padding: 22px; }
.card-head { display:flex; align-items:center; gap:12px; margin-bottom: 18px; }
.card-head h3 { font-size: 16.5px; }
.card-head .sub { font-size: 12.5px; color: var(--ink-400); }
.card-head .spacer { flex:1; }

/* KPI cards */
.kpi-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
.kpi {
  position: relative; overflow: hidden;
  background: var(--surface); border: 1px solid var(--line);
  border-radius: var(--r-lg); padding: 18px 18px 16px;
  box-shadow: var(--shadow-sm); transition: transform .3s var(--ease), box-shadow .3s var(--ease);
}
.kpi:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
.kpi::before {
  content:""; position:absolute; right:-30px; top:-30px; width:120px; height:120px; border-radius:50%;
  background: radial-gradient(circle, var(--glow, var(--emerald-200)), transparent 70%); opacity:.5; transition:opacity .3s;
}
.kpi:hover::before { opacity: .9; }
.kpi-ico { width: 40px; height: 40px; border-radius: 12px; display:grid; place-items:center; margin-bottom: 14px; position:relative; }
.kpi-ico svg { width: 21px; height: 21px; }
.kpi-label { font-size: 13px; color: var(--ink-500); font-weight: 500; }
.kpi-value { font-family:'Kanit'; font-weight: 600; font-size: 29px; line-height: 1.1; margin: 3px 0 2px; letter-spacing:-.02em; }
.kpi-value .unit { font-size: 14px; color: var(--ink-400); font-weight: 500; margin-left: 3px; }
.kpi-foot { font-size: 12px; color: var(--ink-400); display:flex; align-items:center; gap:6px; }
.kpi-trend { display:inline-flex; align-items:center; gap:3px; font-weight:600; }
.kpi-trend.up { color: var(--emerald-600); }
.kpi-trend.down { color: var(--danger); }

/* gradient accents per kpi */
.acc-emerald { --glow: var(--emerald-200); }
.acc-emerald .kpi-ico { background: var(--emerald-100); color: var(--emerald-700); }
.acc-gold { --glow: var(--gold-300); }
.acc-gold .kpi-ico { background: var(--gold-100); color: var(--gold-700); }
.acc-info { --glow: #cfe3f1; }
.acc-info .kpi-ico { background: #e7f1f8; color: var(--info); }
.acc-violet { --glow: #ddd3f0; }
.acc-violet .kpi-ico { background: #efeaf9; color:#6b4caa; }
.acc-rose { --glow: #f3d4da; }
.acc-rose .kpi-ico { background: #fce9ec; color: var(--danger); }

/* ===================================================================
   Charts
=================================================================== */
.charts-row { display: grid; grid-template-columns: 1.55fr 1fr; gap: 16px; }
.bar-chart { width: 100%; }
.legend { display:flex; flex-wrap:wrap; gap: 14px; }
.legend .it { display:flex; align-items:center; gap:7px; font-size: 12.5px; color: var(--ink-500); }
.legend .sw { width:11px; height:11px; border-radius:4px; }

.donut-wrap { display:flex; flex-direction:column; align-items:center; gap: 16px; }
.donut-center { text-align:center; }
.donut-center .v { font-family:'Kanit'; font-weight:600; font-size: 26px; line-height:1; }
.donut-center .l { font-size: 12px; color: var(--ink-400); }
.donut-legend { width:100%; display:flex; flex-direction:column; gap: 9px; }
.donut-legend .it { display:flex; align-items:center; gap:10px; font-size: 13px; }
.donut-legend .sw { width:10px;height:10px;border-radius:3px; flex:none; }
.donut-legend .nm { color: var(--ink-700); flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.donut-legend .pc { font-family:'Kanit'; font-weight:600; color: var(--ink-900); }

/* ===================================================================
   Table
=================================================================== */
.table-wrap { overflow-x: auto; }
table.data { width: 100%; border-collapse: collapse; min-width: 880px; }
table.data thead th {
  text-align: left; font-size: 12px; font-weight: 600; color: var(--ink-400);
  letter-spacing: .03em; text-transform: uppercase;
  padding: 12px 14px; border-bottom: 1px solid var(--line); white-space:nowrap;
  position: sticky; top: 0; background: var(--surface); z-index:1; cursor: pointer; user-select:none;
}
table.data thead th.sortable:hover { color: var(--emerald-700); }
table.data thead th .sort-i { display:inline-block; width:0; height:0; margin-left:5px; vertical-align:middle; }
table.data tbody td { padding: 14px; border-bottom: 1px solid var(--line-soft); font-size: 14px; color: var(--ink-700); vertical-align: middle; }
table.data tbody tr { transition: background .15s; cursor: pointer; }
table.data tbody tr:hover { background: var(--emerald-50); }
table.data tbody tr:last-child td { border-bottom: 0; }
.td-name { font-weight: 600; color: var(--ink-900); }
.td-name .yr { font-size: 12px; color: var(--ink-400); font-weight:500; }
.td-money { font-family:'Kanit'; font-weight:500; text-align:right; white-space:nowrap; }
.row-actions { display:flex; gap:4px; opacity:0; transition: opacity .18s; }
table.data tbody tr:hover .row-actions { opacity:1; }
.mini-bar { height:6px; border-radius:99px; background: var(--line); overflow:hidden; min-width:64px; }
.mini-bar i { display:block; height:100%; border-radius:99px; background: linear-gradient(90deg,var(--emerald-400),var(--emerald-600)); transition: width 1s var(--ease-out); }
.mini-bar.over i { background: linear-gradient(90deg,#e9a23b,var(--danger)); }

.toolbar { display:flex; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom: 16px; }
.toolbar .spacer { flex:1; }
.seg { display:inline-flex; background: var(--canvas-2); border-radius: 11px; padding: 3px; gap:2px; }
.seg button { border:0; background:transparent; padding: 7px 13px; border-radius: 8px; font-size: 13px; font-weight:600; color: var(--ink-500); transition: all .18s; }
.seg button.on { background: var(--surface); color: var(--emerald-700); box-shadow: var(--shadow-sm); }

/* ===================================================================
   Detail page
=================================================================== */
.detail-hero {
  position: relative; overflow:hidden; border-radius: var(--r-xl); padding: 30px 32px; color:#eafaf4;
  background:
    radial-gradient(500px 240px at 88% -20%, rgba(201,162,75,.35), transparent 60%),
    linear-gradient(150deg, var(--emerald-700), var(--emerald-900));
  box-shadow: var(--shadow-lg);
}
.detail-hero::after { content:""; position:absolute; inset:0; background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><circle cx="2" cy="2" r="1" fill="white" opacity="0.05"/></svg>'); }
.detail-hero .inner { position:relative; z-index:1; }
.detail-stat-grid { display:grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
.dstat { background: var(--surface); border:1px solid var(--line); border-radius: var(--r-md); padding: 16px 18px; }
.dstat .l { font-size:12.5px; color: var(--ink-400); }
.dstat .v { font-family:'Kanit'; font-weight:600; font-size: 22px; margin-top:3px; }
.info-grid { display:grid; grid-template-columns: repeat(2,1fr); gap: 0; }
.info-row { display:flex; gap:14px; padding: 15px 4px; border-bottom: 1px solid var(--line-soft); }
.info-row .k { width: 168px; flex:none; color: var(--ink-400); font-size: 13.5px; display:flex; align-items:center; gap:9px; }
.info-row .k svg { width:16px;height:16px; color: var(--emerald-500); }
.info-row .v { color: var(--ink-900); font-weight:500; font-size: 14.5px; }

.fin-bar-track { height: 34px; border-radius: 10px; background: var(--canvas-2); overflow:hidden; display:flex; }
.fin-seg { height:100%; display:flex; align-items:center; padding:0 12px; color:#fff; font-size:12.5px; font-weight:600; font-family:'Kanit'; white-space:nowrap; transition: width 1.1s var(--ease-out); }

/* ===================================================================
   Modal
=================================================================== */
.overlay {
  position: fixed; inset: 0; z-index: 100; display:grid; place-items:center; padding: 24px;
  background: rgba(6,40,30,.42); backdrop-filter: blur(5px);
  animation: fadeIn .25s var(--ease) both;
}
@keyframes fadeIn { from {opacity:0} to {opacity:1} }
.modal {
  width: min(760px, 100%); max-height: 90vh; overflow-y: auto;
  background: var(--surface); border-radius: var(--r-xl); box-shadow: var(--shadow-lg);
  animation: modalIn .4s var(--ease-out) both;
}
@keyframes modalIn { from { opacity:0; transform: translateY(24px) scale(.97); } to { opacity:1; transform:none; } }
.modal-head { display:flex; align-items:center; gap:14px; padding: 22px 26px; border-bottom:1px solid var(--line); position:sticky; top:0; background:var(--surface); z-index:2; border-radius: var(--r-xl) var(--r-xl) 0 0; }
.modal-head h3 { font-size: 18px; }
.modal-head .sub { font-size: 12.5px; color: var(--ink-400); }
.modal-body { padding: 24px 26px; }
.modal-foot { display:flex; gap:10px; justify-content:flex-end; padding: 18px 26px; border-top:1px solid var(--line); position:sticky; bottom:0; background:var(--surface); }

.form-grid { display:grid; grid-template-columns: 1fr 1fr; gap: 16px 18px; }
.field { display:flex; flex-direction:column; gap:7px; }
.field.col-2 { grid-column: 1 / -1; }
.field label { font-size: 13px; font-weight:600; color: var(--ink-700); }
.field label .req { color: var(--danger); }
.field .hint { font-size: 11.5px; color: var(--ink-400); }
.input, .select, textarea.input {
  border: 1px solid var(--line); border-radius: 11px; padding: 11px 13px; font-size: 14px;
  color: var(--ink-900); background: var(--canvas); transition: all .18s var(--ease); width:100%;
}
.input:focus, .select:focus, textarea.input:focus { outline:0; border-color: var(--emerald-400); background:#fff; box-shadow: 0 0 0 4px var(--emerald-100); }
.input.bad { border-color: var(--danger); box-shadow: 0 0 0 4px #fce9ec; }
.field .err { font-size: 11.5px; color: var(--danger); }
.input-money { position: relative; }
.input-money .input { padding-left: 34px; font-family:'Kanit'; }
.input-money .baht { position:absolute; left:13px; top:50%; transform:translateY(-50%); color: var(--ink-400); font-size:14px; }
.computed { background: var(--emerald-50); border:1px dashed var(--emerald-300); border-radius:11px; padding: 11px 13px; font-family:'Kanit'; font-weight:600; color: var(--emerald-700); }

/* ===================================================================
   Misc
=================================================================== */
.section-title { display:flex; align-items:center; gap:12px; margin: 28px 2px 14px; }
.section-title h2 { font-size: 19px; }
.section-title .line { flex:1; height:1px; background: var(--line); }
.section-title .badge { font-size:12px; color:var(--ink-400); font-family:'Kanit'; }

.empty { text-align:center; padding: 60px 20px; color: var(--ink-400); }
.empty svg { width: 54px; height:54px; color: var(--emerald-300); margin-bottom: 14px; }
.empty h4 { font-size:16px; color: var(--ink-700); margin-bottom:6px; }

.toast-wrap { position: fixed; bottom: 26px; right: 26px; z-index: 200; display:flex; flex-direction:column; gap:10px; }
.toast {
  display:flex; align-items:center; gap:11px; background: var(--emerald-900); color:#eafaf4;
  padding: 13px 17px; border-radius: 13px; box-shadow: var(--shadow-lg); font-size:14px; font-weight:500;
  animation: toastIn .4s var(--ease-out) both; border:1px solid rgba(127,209,189,.25);
}
.toast.danger { background: #5a1d27; border-color: rgba(209,73,91,.4); color:#ffe1e6; }
.toast svg { width:19px;height:19px; }
@keyframes toastIn { from { opacity:0; transform: translateX(40px); } to { opacity:1; transform:none; } }

.fab {
  display:none; position: fixed; right: 20px; bottom: 22px; z-index: 60;
  width: 56px; height: 56px; border-radius: 18px; border: 0;
  background: linear-gradient(165deg, var(--emerald-600), var(--emerald-800)); color:#fff;
  align-items:center; justify-content:center; box-shadow: var(--shadow-lg);
}
.fab svg { width: 26px; height: 26px; }
.fab:active { transform: scale(.94); }
.backdrop-mob { display:none; }

/* loading shimmer for chart mount */
@keyframes countPop { 0%{transform:scale(.96);opacity:.5} 100%{transform:scale(1);opacity:1} }

/* ===================================================================
   Responsive
=================================================================== */
@media (max-width: 1180px) {
  .kpi-grid { grid-template-columns: repeat(3, 1fr); }
  .kpi:nth-child(4), .kpi:nth-child(5) { grid-column: span 1; }
}
@media (max-width: 1024px) {
  .charts-row { grid-template-columns: 1fr; }
  .detail-stat-grid { grid-template-columns: repeat(2,1fr); }
}
@media (max-width: 900px) {
  :root { --sidebar-w: 0px; }
  .app { grid-template-columns: 1fr; }
  .sidebar {
    position: fixed; left: 0; top: 0; width: 280px; height: 100vh;
    transform: translateX(-100%); transition: transform .35s var(--ease); box-shadow: var(--shadow-lg);
  }
  .app.nav-open .sidebar { transform: none; }
  .backdrop-mob { display:block; position:fixed; inset:0; background:rgba(6,40,30,.4); z-index:35; opacity:0; pointer-events:none; transition:opacity .3s; }
  .app.nav-open .backdrop-mob { opacity:1; pointer-events:auto; }
  .hamburger { display:flex; }
  .content { padding: 18px; }
  .topbar { padding: 0 16px; }
  .searchbox { min-width: 0; flex: 1; }
}
@media (max-width: 720px) {
  .kpi-grid { grid-template-columns: repeat(2, 1fr); }
  .info-grid { grid-template-columns: 1fr; }
  .form-grid { grid-template-columns: 1fr; }
  .detail-stat-grid { grid-template-columns: repeat(2,1fr); }
  .topbar .page-eyebrow { display:none; }
  .searchbox .lbl { display:none; }
  .add-lbl { display:none; }
  .topbar .btn-primary { padding: 10px; }
  .fab { display:flex; }
  .yearselect { padding: 8px 10px; }
}
@media (max-width: 480px) {
  .kpi-grid { grid-template-columns: 1fr 1fr; }
  .kpi-value { font-size: 24px; }
  .detail-hero { padding: 22px; }
}

/* ===================================================================
   Print
=================================================================== */
@media print {
  .sidebar, .topbar, .toolbar, .row-actions, .btn, .fab, .toast-wrap, .no-print { display: none !important; }
  .app { display:block; background:#fff; }
  .content { padding: 0; max-width: none; }
  .card, .kpi { box-shadow: none; border:1px solid #ccc; break-inside: avoid; }
  body { background:#fff; }
  .view { animation: none; }
}
