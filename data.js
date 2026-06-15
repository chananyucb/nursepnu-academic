/* ===================================================================
   charts.jsx — custom animated SVG/CSS charts
   GroupedBarChart · DonutChart · LineChart · Sparkline
=================================================================== */

/* JS-driven reveal 0→1 (rAF + setTimeout fallback so geometry always
   settles even when CSS transitions / rAF are throttled). No CSS
   transitions are used for geometry, so charts never stick hidden. */
function useReveal(dur = 1100) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf, start, done = false;
    const tick = (t) => {
      if (!start) start = t;
      const k = Math.min(1, (t - start) / dur);
      setP(1 - Math.pow(1 - k, 3));
      if (k < 1) raf = requestAnimationFrame(tick); else done = true;
    };
    raf = requestAnimationFrame(tick);
    const fb = setTimeout(() => { if (!done) setP(1); }, dur + 180);
    return () => { cancelAnimationFrame(raf); clearTimeout(fb); };
  }, []);
  return p;
}

/* -------- Grouped bar chart (budget / income / actual by year) -------- */
function GroupedBarChart({ data, height = 270, series: customSeries }) {
  const reveal = useReveal(1000);
  const [hover, setHover] = useState(null); // {gi, x, y}
  const series = customSeries || [
    { key: 'budget', name: 'เงินงบประมาณ', color: '#0e5c4a' },
    { key: 'income', name: 'เงินรายได้',   color: '#c9a24b' },
    { key: 'actual', name: 'ค่าใช้จ่ายจริง', color: '#43b596' },
  ];
  const max = Math.max(1, ...data.flatMap((d) => series.map((s) => d[s.key])));
  // nice round ticks (always 0 at the bottom, never negative)
  const step = niceStep(max / 4);
  const top = Math.ceil(max / step) * step;
  const nt = Math.max(1, Math.round(top / step));
  const ticks = Array.from({ length: nt + 1 }, (_, i) => top - step * i);

  return (
    <div className="bar-chart" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', gap: 12 }}>
        {/* y axis */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height, fontSize: 11, color: 'var(--ink-400)', textAlign: 'right', fontFamily: 'Kanit', minWidth: 38 }}>
          {ticks.map((t, i) => <div key={i}>{fmtCompact(t)}</div>)}
        </div>
        {/* plot */}
        <div style={{ position: 'relative', flex: 1, height }}>
          {/* gridlines */}
          {ticks.map((t, i) => (
            <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: (i / nt) * 100 + '%', height: 1, background: i === nt ? 'var(--line)' : 'var(--line-soft)' }} />
          ))}
          {/* groups */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', gap: '2%' }}>
            {data.map((d, gi) => (
              <div key={gi}
                onMouseEnter={(e) => setHover({ gi })}
                onMouseLeave={() => setHover(null)}
                style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '7%', position: 'relative', borderRadius: 8, background: hover && hover.gi === gi ? 'rgba(28,148,118,.05)' : 'transparent', transition: 'background .2s' }}>
                {series.map((s, si) => {
                  const hpx = (d[s.key] / top) * height * reveal;
                  return (
                    <div key={s.key} style={{
                      width: '26%', maxWidth: 26, height: hpx + 'px',
                      background: `linear-gradient(180deg, ${s.color}, ${shade(s.color, -14)})`,
                      borderRadius: '5px 5px 0 0',
                      boxShadow: `0 4px 12px -4px ${s.color}66`,
                    }} />
                  );
                })}
              </div>
            ))}
          </div>
          {/* tooltip */}
          {hover && (
            <div style={{ position: 'absolute', left: `${(hover.gi + 0.5) / data.length * 100}%`, top: -8, transform: 'translate(-50%,-100%)', background: 'var(--emerald-900)', color: '#eafaf4', borderRadius: 10, padding: '9px 12px', fontSize: 12, boxShadow: 'var(--shadow-md)', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 5 }}>
              <div style={{ fontFamily: 'Kanit', fontWeight: 600, marginBottom: 4 }}>ปีงบ {data[hover.gi].label}</div>
              {series.map((s) => (
                <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 7, margin: '2px 0' }}>
                  <span style={{ width: 8, height: 8, borderRadius: 3, background: s.color }} />
                  <span style={{ opacity: .8 }}>{s.name}</span>
                  <span style={{ fontFamily: 'Kanit', fontWeight: 600, marginLeft: 'auto' }}>{fmtTHB(data[hover.gi][s.key])}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* x labels */}
      <div style={{ display: 'flex', gap: '2%', marginLeft: 50, marginTop: 8 }}>
        {data.map((d, i) => <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 12, fontFamily: 'Kanit', color: 'var(--ink-500)' }}>{d.label}</div>)}
      </div>
      {/* legend */}
      <div className="legend" style={{ marginTop: 16, justifyContent: 'center' }}>
        {series.map((s) => <div key={s.key} className="it"><span className="sw" style={{ background: s.color }} />{s.name}</div>)}
      </div>
    </div>
  );
}

/* -------- Donut chart -------- */
function DonutChart({ slices, size = 200, thickness = 26, centerValue, centerLabel }) {
  const reveal = useReveal(1100);
  const [active, setActive] = useState(null);
  const total = slices.reduce((a, s) => a + s.value, 0) || 1;
  const r = (size - thickness) / 2;
  const C = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="donut-wrap">
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--canvas-2)" strokeWidth={thickness} />
          {slices.map((s, i) => {
            const frac = s.value / total;
            const len = frac * C * reveal;
            const off = -acc * C;
            acc += frac;
            return (
              <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none"
                stroke={s.color} strokeWidth={active === i ? thickness + 4 : thickness}
                strokeDasharray={`${len} ${C - len}`} strokeDashoffset={off}
                strokeLinecap="butt"
                style={{ transition: 'stroke-width .2s', cursor: 'pointer' }}
                onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} />
            );
          })}
        </svg>
        <div className="donut-center" style={{ position: 'absolute', inset: 0, display: 'grid', placeContent: 'center' }}>
          {active !== null ? (
            <>
              <div className="v" style={{ color: slices[active].color, fontSize: 22 }}>{Math.round(slices[active].value / total * 100)}%</div>
              <div className="l" style={{ maxWidth: size - thickness * 2, lineHeight: 1.2 }}>{slices[active].name}</div>
            </>
          ) : (
            <>
              <div className="v">{centerValue}</div>
              <div className="l">{centerLabel}</div>
            </>
          )}
        </div>
      </div>
      <div className="donut-legend">
        {slices.map((s, i) => (
          <div key={i} className="it" onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} style={{ cursor: 'pointer', opacity: active === null || active === i ? 1 : .5, transition: 'opacity .2s' }}>
            <span className="sw" style={{ background: s.color }} />
            <span className="nm">{s.name}</span>
            <span className="pc">{Math.round(s.value / total * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------- Line chart (yearly trend, area + draw-in) -------- */
function LineChart({ series, height = 260, yearLabels }) {
  const reveal = useReveal(1300);
  const [hi, setHi] = useState(null);
  const W = 760, H = height, padL = 48, padR = 18, padT = 22, padB = 34;
  const all = series.flatMap((s) => s.points);
  const max = Math.max(1, ...all);
  const step = niceStep(max / 4);
  const top = Math.ceil(max / step) * step;
  const nt = Math.max(1, Math.round(top / step));
  const n = yearLabels.length;
  const x = (i) => padL + (i / Math.max(1, n - 1)) * (W - padL - padR);
  const y = (v) => padT + (1 - v / top) * (H - padT - padB);
  const ticks = Array.from({ length: nt + 1 }, (_, i) => top - step * i);

  return (
    <div style={{ position: 'relative' }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}
        onMouseLeave={() => setHi(null)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const mx = (e.clientX - rect.left) / rect.width * W;
          let idx = Math.round((mx - padL) / ((W - padL - padR) / Math.max(1, n - 1)));
          idx = Math.max(0, Math.min(n - 1, idx));
          setHi(idx);
        }}>
        <defs>
          {series.map((s, si) => (
            <linearGradient key={si} id={'lg' + si} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity="0.28" />
              <stop offset="100%" stopColor={s.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={padL} x2={W - padR} y1={y(t)} y2={y(t)} stroke={i === nt ? '#e4ece9' : '#eef3f1'} strokeWidth="1" />
            <text x={padL - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#7c8a84" fontFamily="Kanit">{fmtCompact(t)}</text>
          </g>
        ))}
        {yearLabels.map((yl, i) => (
          <text key={i} x={x(i)} y={H - 12} textAnchor="middle" fontSize="12" fill="#56655f" fontFamily="Kanit">{yl}</text>
        ))}
        {series.map((s, si) => {
          const pts = s.points.map((v, i) => [x(i), y(v)]);
          const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1]).join(' ');
          const area = line + ` L ${x(n - 1)} ${y(0)} L ${x(0)} ${y(0)} Z`;
          const dash = 2400;
          return (
            <g key={si}>
              <path d={area} fill={`url(#lg${si})`} style={{ opacity: reveal }} />
              <path d={line} fill="none" stroke={s.color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray={dash} strokeDashoffset={dash * (1 - reveal)} />
              {pts.map((p, i) => (
                <circle key={i} cx={p[0]} cy={p[1]} r={hi === i ? 6 : 4} fill="#fff" stroke={s.color} strokeWidth="2.6"
                  style={{ opacity: reveal, transition: 'r .15s' }} />
              ))}
            </g>
          );
        })}
        {hi !== null && <line x1={x(hi)} x2={x(hi)} y1={padT} y2={H - padB} stroke="#c9a24b" strokeWidth="1" strokeDasharray="4 4" />}
      </svg>
      {hi !== null && (
        <div style={{ position: 'absolute', left: `${x(hi) / W * 100}%`, top: 6, transform: 'translateX(-50%)', background: 'var(--emerald-900)', color: '#eafaf4', borderRadius: 10, padding: '8px 11px', fontSize: 12, whiteSpace: 'nowrap', pointerEvents: 'none', boxShadow: 'var(--shadow-md)', zIndex: 5 }}>
          <div style={{ fontFamily: 'Kanit', fontWeight: 600, marginBottom: 3 }}>ปีงบ {yearLabels[hi]}</div>
          {series.map((s, si) => (
            <div key={si} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 8, height: 8, borderRadius: 3, background: s.color }} />
              <span style={{ opacity: .8 }}>{s.name}</span>
              <span style={{ fontFamily: 'Kanit', fontWeight: 600, marginLeft: 'auto' }}>{fmtTHB(s.points[hi])}</span>
            </div>
          ))}
        </div>
      )}
      <div className="legend" style={{ marginTop: 10, justifyContent: 'center' }}>
        {series.map((s, si) => <div key={si} className="it"><span className="sw" style={{ background: s.color }} />{s.name}</div>)}
      </div>
    </div>
  );
}

/* -------- helpers -------- */
function niceStep(raw) {
  const pow = Math.pow(10, Math.floor(Math.log10(raw || 1)));
  const n = raw / pow;
  const f = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return f * pow;
}
function shade(hex, pct) {
  const num = parseInt(hex.slice(1), 16);
  let r = (num >> 16) + Math.round(2.55 * pct);
  let g = ((num >> 8) & 0xff) + Math.round(2.55 * pct);
  let b = (num & 0xff) + Math.round(2.55 * pct);
  r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

Object.assign(window, { GroupedBarChart, DonutChart, LineChart, niceStep, shade });
