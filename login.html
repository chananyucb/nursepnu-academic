/* ===================================================================
   lib.jsx — helpers, hooks, icon set, small UI atoms
=================================================================== */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ---- formatting ---- */
const fmtTHB = (n) => '฿' + Math.round(n || 0).toLocaleString('en-US');
const fmtNum = (n) => Math.round(n || 0).toLocaleString('en-US');
const fmtCompact = (n) => {
  const a = Math.abs(n || 0);
  if (a >= 1e6) return (n / 1e6).toFixed(2).replace(/\.00$/, '') + ' ล.';
  if (a >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + ' พัน';
  return fmtNum(n);
};
const beYear = (y) => '' + y;            // already Buddhist era
const ceYear = (y) => y - 543;

/* ---- count-up hook (numbers animate when they enter/​change) ---- */
function useCountUp(target, dur = 1100, deps = []) {
  const [val, setVal] = useState(0);
  const ref = useRef(0);
  useEffect(() => {
    let raf, start;
    const from = ref.current;
    const to = target || 0;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const cur = from + (to - from) * e;
      setVal(cur);
      ref.current = cur;
      if (p < 1) raf = requestAnimationFrame(tick);
      else ref.current = to;
    };
    raf = requestAnimationFrame(tick);
    const fallback = setTimeout(() => { setVal(to); ref.current = to; }, dur + 120);
    return () => { cancelAnimationFrame(raf); clearTimeout(fallback); };
    // eslint-disable-next-line
  }, [target, ...deps]);
  return val;
}

/* reveal-on-mount flag (for chart growth animations) */
function useMounted(delay = 60) {
  const [on, setOn] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOn(true), delay); return () => clearTimeout(t); }, []);
  return on;
}

/* ---- Icon set (feather-like, 24x24 stroke) ---- */
const ICONS = {
  dashboard: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z',
  list: 'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
  summary: 'M3 3v18h18M7 14l3-3 3 3 5-6',
  wallet: 'M21 12V7H5a2 2 0 010-4h14v4M3 5v14a2 2 0 002 2h16v-5M18 12a2 2 0 000 4h4v-4h-4z',
  users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
  user: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
  calendar: 'M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18',
  target: 'M12 22a10 10 0 100-20 10 10 0 000 20zM12 18a6 6 0 100-12 6 6 0 000 12zM12 14a2 2 0 100-4 2 2 0 000 4z',
  money: 'M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35',
  plus: 'M12 5v14M5 12h14',
  edit: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z',
  trash: 'M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6',
  close: 'M18 6L6 18M6 6l12 12',
  chevR: 'M9 18l6-6-6-6',
  chevL: 'M15 18l-6-6 6-6',
  chevD: 'M6 9l6 6 6-6',
  download: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3',
  print: 'M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z',
  up: 'M12 19V5M5 12l7-7 7 7',
  down: 'M12 5v14M19 12l-7 7-7-7',
  check: 'M20 6L9 17l-5-5',
  checkCircle: 'M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3',
  alert: 'M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01',
  building: 'M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16',
  clock: 'M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2',
  filter: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
  eye: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 15a3 3 0 100-6 3 3 0 000 6z',
  sparkle: 'M12 3l1.9 5.5L19 10l-5.1 1.5L12 17l-1.9-5.5L5 10l5.1-1.5L12 3zM19 3v3M5 18v3M20.5 19.5h-3M6.5 4.5h-3',
  trending: 'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6',
  pie: 'M21.21 15.89A10 10 0 118 2.83M22 12A10 10 0 0012 2v10z',
  bars: 'M12 20V10M18 20V4M6 20v-4',
  doc: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8',
  flag: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7',
  hash: 'M4 9h16M4 15h16M10 3L8 21M16 3l-2 18',
  menu: 'M3 12h18M3 6h18M3 18h18',
  arrowLeft: 'M19 12H5M12 19l-7-7 7-7',
  layers: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  award: 'M12 15a7 7 0 100-14 7 7 0 000 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12',
};
function Icon({ name, style, className, size }) {
  const d = ICONS[name];
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" style={style} className={className}
      width={size} height={size} aria-hidden="true">
      {(d || '').split('M').filter(Boolean).map((seg, i) => <path key={i} d={'M' + seg} />)}
    </svg>
  );
}

/* ---- status meta ---- */
const STATUS = {
  done:   { cls: 'done',   label: 'เสร็จสิ้น' },
  active: { cls: 'active', label: 'กำลังดำเนินการ' },
  plan:   { cls: 'plan',   label: 'วางแผน' },
};
function StatusChip({ s }) {
  const m = STATUS[s] || STATUS.plan;
  return <span className={'chip ' + m.cls}><span className="chip-dot"></span>{m.label}</span>;
}

/* ---- toast system (very small) ---- */
const ToastCtx = React.createContext(() => {});
function ToastHost({ children }) {
  const [list, setList] = useState([]);
  const push = useCallback((msg, kind = 'ok') => {
    const id = Math.random().toString(36).slice(2);
    setList((l) => [...l, { id, msg, kind }]);
    setTimeout(() => setList((l) => l.filter((t) => t.id !== id)), 2800);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="toast-wrap">
        {list.map((t) => (
          <div key={t.id} className={'toast ' + (t.kind === 'danger' ? 'danger' : '')}>
            <Icon name={t.kind === 'danger' ? 'trash' : 'checkCircle'} />
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
const useToast = () => React.useContext(ToastCtx);

Object.assign(window, {
  useState, useEffect, useRef, useMemo, useCallback,
  fmtTHB, fmtNum, fmtCompact, beYear, ceYear,
  useCountUp, useMounted, Icon, ICONS,
  STATUS, StatusChip, ToastHost, useToast,
});
