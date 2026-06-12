/* ===================================================================
   public-app.jsx — Public read-only portal  (Supabase-aware)
=================================================================== */

/* ── Tweak defaults ─────────────────────────────────────────────── */
const TWEAK_DEFAULTS = { theme:'กลางคืน', density:'สมดุล', font:'IBM Plex' };

/* ── Theme presets ──────────────────────────────────────────────── */
const PUB_THEMES = {
  'กลางคืน': { heroBg:'linear-gradient(135deg,#0f172a 0%,#1e3a8a 45%,#2563eb 100%)', heroText:'#ffffff', heroSub:'rgba(255,255,255,.75)', badgeBg:'rgba(96,165,250,.18)', badgeBorder:'1px solid rgba(96,165,250,.35)', badgeColor:'#bfdbfe', accent:'#2563eb', numColor:'#1d4ed8', tagBg:'rgba(37,99,235,.10)', tagColor:'#1d4ed8', topBg:'rgba(255,255,255,.95)', topBorder:'rgba(37,99,235,.12)', footerBg:'#1e3a8a', footerText:'rgba(255,255,255,.65)', footerTitle:'#ffffff', ctaPrimBg:'#ffffff', ctaPrimColor:'#1e3a8a', ctaSecBg:'rgba(255,255,255,.12)', ctaSecColor:'#ffffff', ctaSecBorder:'1px solid rgba(255,255,255,.25)', blob1:'rgba(255,255,255,.04)', blob2:'rgba(201,162,75,.08)', iconGrad:'linear-gradient(135deg,#2563eb,#1d4ed8)', pageBg:'#f3f6f5', loginBtnBg:'linear-gradient(135deg,#2563eb,#1d4ed8)', loginBtnColor:'#fff', loginShadow:'0 4px 12px rgba(37,99,235,.30)' },
  'สว่าง':   { heroBg:'linear-gradient(135deg,#eff6ff 0%,#dbeafe 55%,#e0f2fe 100%)', heroText:'#0f172a', heroSub:'#475569', badgeBg:'rgba(37,99,235,.08)', badgeBorder:'1px solid rgba(37,99,235,.22)', badgeColor:'#1d4ed8', accent:'#2563eb', numColor:'#1d4ed8', tagBg:'rgba(37,99,235,.10)', tagColor:'#1d4ed8', topBg:'rgba(255,255,255,.98)', topBorder:'rgba(37,99,235,.10)', footerBg:'#f1f5f9', footerText:'#64748b', footerTitle:'#0f172a', ctaPrimBg:'#2563eb', ctaPrimColor:'#ffffff', ctaSecBg:'rgba(37,99,235,.08)', ctaSecColor:'#1d4ed8', ctaSecBorder:'1px solid rgba(37,99,235,.22)', blob1:'rgba(37,99,235,.04)', blob2:'rgba(96,165,250,.07)', iconGrad:'linear-gradient(135deg,#2563eb,#1d4ed8)', pageBg:'#f8fafc', loginBtnBg:'linear-gradient(135deg,#2563eb,#1d4ed8)', loginBtnColor:'#fff', loginShadow:'0 4px 12px rgba(37,99,235,.25)' },
  'ทอง':     { heroBg:'linear-gradient(135deg,#1c1400 0%,#78350f 45%,#b45309 100%)', heroText:'#ffffff', heroSub:'rgba(255,255,255,.75)', badgeBg:'rgba(251,191,36,.18)', badgeBorder:'1px solid rgba(251,191,36,.38)', badgeColor:'#fde68a', accent:'#d97706', numColor:'#b45309', tagBg:'rgba(217,119,6,.10)', tagColor:'#92650a', topBg:'rgba(255,255,255,.95)', topBorder:'rgba(217,119,6,.16)', footerBg:'#1c1400', footerText:'rgba(255,255,255,.60)', footerTitle:'#fde68a', ctaPrimBg:'#fde68a', ctaPrimColor:'#78350f', ctaSecBg:'rgba(255,255,255,.12)', ctaSecColor:'#ffffff', ctaSecBorder:'1px solid rgba(255,255,255,.28)', blob1:'rgba(255,255,255,.04)', blob2:'rgba(251,191,36,.10)', iconGrad:'linear-gradient(135deg,#f59e0b,#d97706)', pageBg:'#faf8f4', loginBtnBg:'linear-gradient(135deg,#f59e0b,#d97706)', loginBtnColor:'#fff', loginShadow:'0 4px 12px rgba(217,119,6,.30)' },
};

/* ── Density presets ────────────────────────────────────────────── */
const PUB_DENSITIES = {
  'กระชับ': { heroPadY:'44px 24px 52px',   statPadY:'18px 24px', sectionPadY:'40px 24px', cardPad:'18px 18px', gridGap:12, sectionGap:32 },
  'สมดุล':  { heroPadY:'72px 24px 80px',   statPadY:'28px 24px', sectionPadY:'56px 24px', cardPad:'28px 24px', gridGap:20, sectionGap:40 },
  'กว้าง':  { heroPadY:'100px 24px 112px', statPadY:'40px 24px', sectionPadY:'80px 24px', cardPad:'40px 32px', gridGap:28, sectionGap:60 },
};

/* ── Font presets ───────────────────────────────────────────────── */
const PUB_FONTS = {
  'IBM Plex': { heading:"'Kanit', sans-serif", body:"'IBM Plex Sans Thai', sans-serif" },
  'Kanit':    { heading:"'Kanit', sans-serif", body:"'Kanit', sans-serif"              },
};

/* ── Year select ─────────────────────────────────────────────────── */
function YearSelect({ value, onChange, years, label }) {
  const arrow = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' stroke='%236b7280' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
      <span style={{ fontSize:13, color:'#6b7280', whiteSpace:'nowrap' }}>{label}</span>
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ padding:'7px 32px 7px 12px', borderRadius:10, border:'1.5px solid #d1d5db', background:'#fff', fontSize:13.5, color:'#111827', cursor:'pointer', outline:'none', WebkitAppearance:'none', appearance:'none', backgroundImage:arrow, backgroundRepeat:'no-repeat', backgroundPosition:'right 8px center', boxShadow:'0 1px 4px rgba(0,0,0,.06)' }}>
        <option value="all">ทุกปีงบ</option>
        {years.map(y => <option key={y} value={y}>ปีงบ {y}</option>)}
      </select>
    </div>
  );
}

function SectionBanner({ badge, title, gold, acYear, setAcYear, spYear, setSpYear, projectYears, speakerYears, th }) {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12, margin:'32px 0 18px', padding:'0 2px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <span style={{ padding:'4px 14px', borderRadius:99, fontSize:12, fontWeight:600, background: gold?'rgba(201,162,75,.12)':th.tagBg, color: gold?'#92650a':th.tagColor }}>{badge}</span>
        <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:'#0e1a16', fontFamily:'Kanit' }}>{title}</h2>
      </div>
      {!gold && projectYears && <YearSelect value={acYear} onChange={setAcYear} years={projectYears} label="ปีงบประมาณ:" />}
      {gold  && speakerYears && <YearSelect value={spYear}  onChange={setSpYear}  years={speakerYears}  label="ปีงบประมาณ:" />}
    </div>
  );
}

/* ── Loading splash (public) ─────────────────────────────────────── */
function PubLoading({ th }) {
  return (
    <div style={{ display:'grid', placeItems:'center', minHeight:'60vh' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:44, height:44, border:`5px solid ${th.tagBg}`, borderTopColor:th.accent, borderRadius:'50%', margin:'0 auto 16px', animation:'spin 0.9s linear infinite' }}></div>
        <div style={{ fontFamily:'Kanit', color:th.accent, fontSize:15, fontWeight:500 }}>กำลังโหลดข้อมูล…</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
function PublicApp() {
  const [t, setTweak]   = useTweaks(TWEAK_DEFAULTS);
  const [section, setSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [acYear,   setAcYear]   = useState('all');
  const [spYear,   setSpYear]   = useState('all');
  const [loading,  setLoading]  = useState(true);
  const [allProjects, setAllProjects] = useState([]);
  const [allSpeakers, setAllSpeakers] = useState([]);

  /* Resolve tokens */
  const th = PUB_THEMES[t.theme]      || PUB_THEMES['กลางคืน'];
  const dn = PUB_DENSITIES[t.density] || PUB_DENSITIES['สมดุล'];
  const fn = PUB_FONTS[t.font]        || PUB_FONTS['IBM Plex'];

  /* Load from Supabase (or localStorage fallback) */
  useEffect(() => {
    Promise.all([window.db.fetchProjects(), window.db.fetchSpeakers()])
      .then(([ps, ss]) => { setAllProjects(ps); setAllSpeakers(ss); setLoading(false); })
      .catch(() => {
        setAllProjects((window.NURSE_DATA?.projects || []).map(p => ({...p})));
        setAllSpeakers((window.NURSE_SPEAKERS?.records || []).map(r => ({...r})));
        setLoading(false);
      });
  }, []);

  /* Derived */
  const projectYears = useMemo(() => [...new Set(allProjects.map(p => p.year))].sort((a,b) => b-a), [allProjects]);
  const speakerYears = useMemo(() => {
    const s = new Set(allSpeakers.map(r => window.getSpeakerFY && window.getSpeakerFY(r.date)).filter(Boolean));
    return Array.from(s).sort((a,b) => b-a);
  }, [allSpeakers]);

  const projects = useMemo(() =>
    acYear==='all' ? allProjects : allProjects.filter(p => p.year===Number(acYear)), [allProjects, acYear]);
  const speakers = useMemo(() =>
    spYear==='all' ? allSpeakers : allSpeakers.filter(r => (window.getSpeakerFY && window.getSpeakerFY(r.date))===Number(spYear)), [allSpeakers, spYear]);

  const T = totals(allProjects);
  const cCount  = useCountUp(T.count,      1200, [T.count, loading]);
  const cBudget = useCountUp(T.budget,     1500, [T.budget, loading]);
  const cRecip  = useCountUp(T.recipients, 1200, [T.recipients, loading]);

  const navTo = (s) => { setSection(s); setMenuOpen(false); window.scrollTo({ top:0, behavior:'smooth' }); };

  return (
    <div style={{ minHeight:'100vh', background:th.pageBg, fontFamily:fn.body, transition:'background .4s' }}>

      {/* ── TOPBAR ───────────────────────────────────────────────── */}
      <header style={{ position:'sticky', top:0, zIndex:200, background:th.topBg, backdropFilter:'blur(14px)', borderBottom:`1px solid ${th.topBorder}`, boxShadow:'0 2px 12px rgba(0,0,0,.06)', transition:'background .4s, border-color .4s' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 20px', height:64, display:'flex', alignItems:'center', gap:12 }}>
          <a href="public.html" onClick={e=>{e.preventDefault();navTo('home');}} style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', flex:1, minWidth:0 }}>
            <img src="uploads/PNU-New-G-2048x1024.png" alt="PNU" style={{ height:42, width:'auto', maxWidth:170, objectFit:'contain', flexShrink:0 }} />
            <div style={{ borderLeft:'1.5px solid #e5e7eb', paddingLeft:10, lineHeight:1.3, minWidth:0 }}>
              <div style={{ fontFamily:fn.heading, fontWeight:600, fontSize:13.5, color:'#0e1a16', whiteSpace:'nowrap' }}>คณะพยาบาลศาสตร์</div>
              <div style={{ fontSize:11, color:'#6b7280', whiteSpace:'nowrap' }}>มหาวิทยาลัยนราธิวาสราชนครินทร์</div>
            </div>
          </a>
          <nav style={{ display:'flex', gap:4, alignItems:'center', flexShrink:0 }} className="pub-desktop-nav">
            {[['home','หน้าแรก'],['dashboard','แดชบอร์ด']].map(([k,l]) => (
              <button key={k} onClick={() => navTo(k)} style={{ padding:'7px 16px', borderRadius:99, border:'none', cursor:'pointer', fontFamily:fn.body, fontSize:14, fontWeight:section===k?600:400, background:section===k?th.tagBg:'transparent', color:section===k?th.tagColor:'#374151', transition:'all .18s', whiteSpace:'nowrap' }}>{l}</button>
            ))}
            <a href="login.html" style={{ marginLeft:6, padding:'8px 18px', borderRadius:99, background:th.loginBtnBg, color:th.loginBtnColor, fontFamily:fn.body, fontSize:14, fontWeight:600, textDecoration:'none', boxShadow:th.loginShadow, whiteSpace:'nowrap', transition:'all .4s' }}>เข้าสู่ระบบ</a>
          </nav>
          <button onClick={() => setMenuOpen(o=>!o)} className="pub-hamburger" style={{ display:'none', border:'none', background:'none', cursor:'pointer', padding:6, flexShrink:0 }}>
            <Icon name="list" size={22} />
          </button>
        </div>
        {menuOpen && (
          <div style={{ background:'#fff', borderTop:'1px solid #e5e7eb', padding:16, display:'flex', flexDirection:'column', gap:8 }}>
            {[['home','หน้าแรก'],['dashboard','แดชบอร์ด']].map(([k,l]) => (
              <button key={k} onClick={() => navTo(k)} style={{ padding:'10px 16px', borderRadius:10, border:'none', textAlign:'left', background:section===k?th.tagBg:'transparent', color:'#374151', fontFamily:fn.body, fontSize:15, cursor:'pointer' }}>{l}</button>
            ))}
            <a href="login.html" style={{ padding:'10px 16px', borderRadius:10, background:th.loginBtnBg, color:th.loginBtnColor, textDecoration:'none', textAlign:'center', fontFamily:fn.body, fontWeight:600 }}>เข้าสู่ระบบ</a>
          </div>
        )}
      </header>

      {/* ── HOME ─────────────────────────────────────────────────── */}
      {section==='home' && (
        <main>
          <section style={{ background:th.heroBg, padding:dn.heroPadY, position:'relative', overflow:'hidden', transition:'background .5s, padding .4s' }}>
            <div style={{ position:'absolute',top:-60,right:-60,width:320,height:320,borderRadius:'50%',background:th.blob1,pointerEvents:'none' }}></div>
            <div style={{ position:'absolute',bottom:-80,left:-40,width:240,height:240,borderRadius:'50%',background:th.blob2,pointerEvents:'none' }}></div>
            <div style={{ maxWidth:760, margin:'0 auto', textAlign:'center', position:'relative' }}>
              <div style={{ display:'inline-block', padding:'6px 18px', borderRadius:99, background:th.badgeBg, border:th.badgeBorder, color:th.badgeColor, fontSize:13, fontWeight:600, marginBottom:24, letterSpacing:'.04em' }}>
                ระบบบริการวิชาการ · Academic Services
              </div>
              <h1 style={{ margin:'0 0 16px', fontFamily:fn.heading, fontWeight:700, fontSize:'clamp(28px,5vw,48px)', color:th.heroText, lineHeight:1.2, textWrap:'pretty' }}>
                ข้อมูลบริการวิชาการ<br/>คณะพยาบาลศาสตร์
              </h1>
              <p style={{ margin:'0 0 36px', color:th.heroSub, fontSize:'clamp(14px,2vw,17px)', lineHeight:1.7 }}>
                มหาวิทยาลัยนราธิวาสราชนครินทร์ — ระบบสาธารณะแสดงข้อมูลโครงการ งบประมาณ และค่าวิทยากร
              </p>
              <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
                <button onClick={() => navTo('dashboard')} style={{ padding:'13px 32px', borderRadius:99, background:th.ctaPrimBg, color:th.ctaPrimColor, fontFamily:fn.body, fontWeight:700, fontSize:15, border:'none', cursor:'pointer', boxShadow:'0 6px 20px rgba(0,0,0,.15)' }}>
                  ดูแดชบอร์ด →
                </button>
                <a href="login.html" style={{ padding:'13px 32px', borderRadius:99, background:th.ctaSecBg, color:th.ctaSecColor, fontFamily:fn.body, fontWeight:600, fontSize:15, textDecoration:'none', border:th.ctaSecBorder, display:'inline-block' }}>
                  เข้าสู่ระบบผู้ดูแล
                </a>
              </div>
            </div>
          </section>

          {/* Stats ticker */}
          <section style={{ background:'#fff', boxShadow:'0 4px 24px rgba(0,0,0,.07)' }}>
            <div style={{ maxWidth:1200, margin:'0 auto', padding:dn.statPadY, display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))' }}>
              {loading ? (
                <div style={{ gridColumn:'1/-1', textAlign:'center', padding:32, color:'#9ca3af' }}>กำลังโหลด…</div>
              ) : (
                [
                  { val: cCount,                  lbl:'โครงการทั้งหมด' },
                  { val: fmtCompact(cBudget),      lbl:'งบประมาณรวม'   },
                  { val: cRecip.toLocaleString(),  lbl:'ผู้รับบริการ'   },
                  { val: allSpeakers.length,        lbl:'วิทยากรภายนอก' },
                ].map((s,i,arr) => (
                  <div key={i} style={{ textAlign:'center', padding:'16px 12px', borderRight:i<arr.length-1?'1px solid #f0f0f0':'none' }}>
                    <div className="num" style={{ fontSize:28, fontWeight:700, color:th.numColor, lineHeight:1 }}>{s.val}</div>
                    <div style={{ fontSize:12, color:'#9ca3af', marginTop:5 }}>{s.lbl}</div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Feature cards */}
          <section style={{ maxWidth:1200, margin:'0 auto', padding:dn.sectionPadY }}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:dn.gridGap }}>
              {[
                { icon:'dashboard', title:'แดชบอร์ดภาพรวม', desc:'สรุปสถิติโครงการบริการวิชาการ งบประมาณ รายได้ และจำนวนผู้รับบริการ พร้อมกราฟเปรียบเทียบรายปี' },
                { icon:'wallet',    title:'สรุปงบประมาณ',   desc:'ข้อมูลการใช้งบประมาณและรายได้ รวมถึงการหัก 10% และ 20% ส่งมหาวิทยาลัยและคณะ' },
                { icon:'users',     title:'ค่าวิทยากร',     desc:'ข้อมูลค่าวิทยากรภายนอก การหัก 5% ส่งมหาวิทยาลัย และ 10% ส่งคณะ พร้อมสถานะการจ่ายเงิน' },
              ].map((c,i) => (
                <div key={i} style={{ background:'#fff', borderRadius:18, padding:dn.cardPad, boxShadow:'0 2px 16px rgba(0,0,0,.06)', display:'flex', flexDirection:'column', gap:12 }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:th.iconGrad, display:'grid', placeItems:'center', color:'#fff' }}>
                    <Icon name={c.icon} size={20} />
                  </div>
                  <h3 style={{ margin:0, fontFamily:fn.heading, fontSize:17, fontWeight:600, color:'#0e1a16' }}>{c.title}</h3>
                  <p style={{ margin:0, color:'#6b7280', fontSize:14, lineHeight:1.65 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* ── DASHBOARD ──────────────────────────────────────────────── */}
      {section==='dashboard' && (
        <main className="pub-dash-main" style={{ maxWidth:1200, margin:'0 auto', padding:'20px 24px 64px' }}>
          {loading ? <PubLoading th={th} /> : (
            <>
              <SectionBanner badge="บริการวิชาการ" title="แดชบอร์ดบริการวิชาการ" th={th}
                acYear={acYear} setAcYear={setAcYear} projectYears={projectYears} />
              <Dashboard projects={projects} allProjects={allProjects} year={acYear} onOpen={() => {}} />

              <SectionBanner badge="ค่าวิทยากรภายนอก" title="แดชบอร์ดค่าวิทยากรภายนอก" gold th={th}
                spYear={spYear} setSpYear={setSpYear} speakerYears={speakerYears} />
              <SpeakerDashboard records={speakers} fiscalYear={spYear} />
            </>
          )}
        </main>
      )}

      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer style={{ background:th.footerBg, color:th.footerText, textAlign:'center', padding:'24px 16px', fontSize:13, transition:'background .4s, color .4s' }}>
        <div style={{ color:th.footerTitle, fontWeight:600, marginBottom:4 }}>คณะพยาบาลศาสตร์ มหาวิทยาลัยนราธิวาสราชนครินทร์</div>
        <div>ระบบบริการวิชาการ Academic Services · ข้อมูลเพื่อการเผยแพร่สาธารณะ</div>
      </footer>

      {/* ── TWEAKS PANEL ───────────────────────────────────────────── */}
      <TweaksPanel>
        <TweakSection label="ธีมสี" />
        <TweakRadio label="ธีม" value={t.theme} options={['กลางคืน','สว่าง','ทอง']} onChange={v => setTweak('theme', v)} />
        <TweakSection label="การแสดงผล" />
        <TweakRadio label="ความหนาแน่น" value={t.density} options={['กระชับ','สมดุล','กว้าง']} onChange={v => setTweak('density', v)} />
        <TweakSection label="ตัวอักษร" />
        <TweakRadio label="ฟอนต์" value={t.font} options={['IBM Plex','Kanit']} onChange={v => setTweak('font', v)} />
      </TweaksPanel>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) {
          .pub-desktop-nav { display: none !important; }
          .pub-hamburger   { display: block !important; }
        }
        *, *::before, *::after { box-sizing: border-box; }
        .pub-dash-main .data tbody tr { cursor: default !important; }
        .pub-dash-main .view { padding: 0; }
      `}</style>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PublicApp />);
