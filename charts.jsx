/* ===================================================================
   app.jsx — shell, routing, state, Google Sheets CRUD
=================================================================== */

const NAV = [
  { key: 'dashboard',          label: 'แดชบอร์ด',              icon: 'dashboard' },
  { key: 'list',               label: 'รายการโครงการ',          icon: 'list' },
  { key: 'summary',            label: 'สรุปงบประมาณ',           icon: 'summary' },
  { key: 'speaker-dashboard',  label: 'แดชบอร์ดค่าวิทยากร',    icon: 'dashboard' },
  { key: 'speakers',           label: 'ค่าวิทยากรภายนอก',      icon: 'users' },
];
const TITLES = {
  dashboard:           { eyebrow: 'ภาพรวม',          title: 'แดชบอร์ดบริการวิชาการ' },
  list:                { eyebrow: 'ทะเบียนโครงการ',   title: 'รายการโครงการ' },
  summary:             { eyebrow: 'รายงาน',           title: 'สรุปงบประมาณและรายได้' },
  detail:              { eyebrow: 'รายละเอียด',        title: 'ข้อมูลโครงการ' },
  'speaker-dashboard': { eyebrow: 'ค่าวิทยากร',       title: 'แดชบอร์ดค่าวิทยากรภายนอก' },
  speakers:            { eyebrow: 'ค่าวิทยากร',       title: 'ทะเบียนค่าวิทยากรภายนอก' },
};

/* ── Loading splash ──────────────────────────────────────────── */
function LoadingSplash() {
  return (
    <div style={{ display:'grid', placeItems:'center', height:'100vh', background:'#f3f6f5' }}>
      <div style={{ textAlign:'center' }}>
        <div style={{
          width:48, height:48, border:'5px solid #d1fae5', borderTopColor:'#0e5c4a',
          borderRadius:'50%', margin:'0 auto 20px',
          animation:'spin 0.9s linear infinite'
        }}></div>
        <div style={{ fontFamily:'Kanit', color:'#0e5c4a', fontSize:17, fontWeight:600 }}>
          กำลังโหลดข้อมูล…
        </div>
        <div style={{ fontFamily:'IBM Plex Sans Thai', color:'#9ca3af', fontSize:13, marginTop:6 }}>
          {window.db?.isConfigured() ? 'เชื่อมต่อ Google Sheets' : 'โหลดจากเครื่อง'}
        </div>
      </div>
    </div>
  );
}

/* ── Setup banner ───────────────────────────────────── */
function SetupBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div style={{
      background:'linear-gradient(90deg,#fef3c7,#fde68a)', borderBottom:'1px solid #fbbf24',
      padding:'10px 20px', display:'flex', alignItems:'center', gap:12, flexWrap:'wrap'
    }}>
      <span style={{ fontSize:18 }}>⚠️</span>
      <div style={{ flex:1, fontSize:13.5, fontFamily:'IBM Plex Sans Thai', color:'#78350f' }}>
        <b>ยังไม่ได้เชื่อมต่อ Google Sheets</b> — ข้อมูลเก็บเฉพาะเครื่องนี้ คนอื่นจะไม่เห็น
      </div>
      <a href="sheets-setup-guide.html" target="_blank" style={{
        padding:'6px 14px', borderRadius:8, background:'#b45309', color:'#fff',
        fontSize:13, fontWeight:600, textDecoration:'none', whiteSpace:'nowrap'
      }}>ดูวิธีตั้งค่า →</a>
      <button onClick={() => setVisible(false)} style={{
        background:'none', border:'none', cursor:'pointer', fontSize:18, color:'#92400e', lineHeight:1
      }}>×</button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════ */
function App() {
  const D = window.NURSE_DATA;
  const toast = useToast();

  /* ── State ───────────────────────────────────────────────── */
  const [projects,       setProjects]       = useState([]);
  const [speakers,       setSpeakers]       = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [view,           setView]           = useState('dashboard');
  const [selectedId,     setSelectedId]     = useState(null);
  const [search,         setSearch]         = useState('');
  const [year,           setYear]           = useState('all');
  const [modal,          setModal]          = useState(null);
  const [confirm,        setConfirm]        = useState(null);
  const [navOpen,        setNavOpen]        = useState(false);
  const [speakerYear,    setSpeakerYear]    = useState('all');
  const [speakerModal,   setSpeakerModal]   = useState(null);
  const [speakerConfirm, setSpeakerConfirm] = useState(null);

  /* ── Initial load from Google Sheets (or localStorage) ─────────── */
  useEffect(() => {
    Promise.all([window.db.fetchProjects(), window.db.fetchSpeakers()])
      .then(([ps, ss]) => {
        setProjects(ps);
        setSpeakers(ss);
        setLoading(false);
      })
      .catch(err => {
        console.error('Data load error:', err);
        setProjects((window.NURSE_DATA?.projects || []).map(p => ({ ...p })));
        setSpeakers((window.NURSE_SPEAKERS?.records || []).map(r => ({ ...r })));
        setLoading(false);
        toast('โหลดข้อมูลจาก Google Sheets ไม่ได้ ใช้ข้อมูลตัวอย่างแทน', 'danger');
      });
  }, []);

  /* ── Persist to localStorage when Google Sheets not configured ──── */
  useEffect(() => {
    if (!loading && !window.db.isConfigured()) window.db.lsSaveProjects(projects);
  }, [projects, loading]);
  useEffect(() => {
    if (!loading && !window.db.isConfigured()) window.db.lsSaveSpeakers(speakers);
  }, [speakers, loading]);

  /* ── Derived ─────────────────────────────────────────────── */
  const speakerFYears = useMemo(() => {
    const s = new Set(speakers.map(r => window.getSpeakerFY(r.date)).filter(Boolean));
    return Array.from(s).sort((a, b) => b - a);
  }, [speakers]);

  const filteredSpeakers = useMemo(() => {
    if (speakerYear === 'all') return speakers;
    return speakers.filter(r => window.getSpeakerFY(r.date) === Number(speakerYear));
  }, [speakers, speakerYear]);

  const years = useMemo(() =>
    Array.from({ length: 2590 - 2562 + 1 }, (_, i) => 2590 - i), []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter(p =>
      (year === 'all' || p.year === Number(year)) &&
      (!q || p.name.toLowerCase().includes(q) ||
             (p.owner  || '').toLowerCase().includes(q) ||
             (p.target || '').toLowerCase().includes(q))
    );
  }, [projects, search, year]);

  const selected = projects.find(p => p.id === selectedId) || null;

  /* ── Project CRUD ────────────────────────────────────────── */
  const addProject = async (data) => {
    const id   = 'PJ' + Date.now();
    const newP = { ...data, id };
    setProjects(l => [newP, ...l]);
    setModal(null);
    toast('เพิ่มโครงการเรียบร้อยแล้ว');
    if (window.db.isConfigured()) {
      try { await window.db.saveProject(newP); }
      catch (e) { toast('บันทึก Google Sheets ล้มเหลว: ' + e.message, 'danger'); }
    }
  };

  const updateProject = async (data) => {
    setProjects(l => l.map(p => p.id === data.id ? { ...data } : p));
    setModal(null);
    toast('บันทึกการแก้ไขเรียบร้อยแล้ว');
    if (window.db.isConfigured()) {
      try { await window.db.saveProject(data); }
      catch (e) { toast('บันทึก Google Sheets ล้มเหลว: ' + e.message, 'danger'); }
    }
  };

  const reallyDelete = async (id) => {
    setProjects(l => l.filter(p => p.id !== id));
    setConfirm(null);
    if (selectedId === id) { setSelectedId(null); setView('list'); }
    toast('ลบโครงการแล้ว', 'danger');
    if (window.db.isConfigured()) {
      try { await window.db.deleteProject(id); }
      catch (e) { toast('ลบ Google Sheets ล้มเหลว: ' + e.message, 'danger'); }
    }
  };

  const resetData = async () => {
    const fresh = (window.NURSE_DATA?.projects || []).map(p => ({ ...p }));
    setProjects(fresh);
    setConfirm(null);
    toast('คืนค่าข้อมูลตัวอย่างแล้ว');
    if (window.db.isConfigured()) {
      try { await window.db.seedAll(); toast('Seed ข้อมูลไปยัง Google Sheets แล้ว'); }
      catch (e) { toast('Seed Google Sheets ล้มเหลว: ' + e.message, 'danger'); }
    }
  };

  /* ── Speaker CRUD ────────────────────────────────────────── */
  const addSpeaker = async (data) => {
    const id  = 'SP' + Date.now();
    const seq = speakers.length ? Math.max(...speakers.map(s => s.seq || 0)) + 1 : 1;
    const newS = { ...data, id, seq };
    setSpeakers(l => [newS, ...l]);
    setSpeakerModal(null);
    toast('เพิ่มค่าวิทยากรเรียบร้อยแล้ว');
    if (window.db.isConfigured()) {
      try { await window.db.saveSpeaker(newS); }
      catch (e) { toast('บันทึก Google Sheets ล้มเหลว: ' + e.message, 'danger'); }
    }
  };

  const updateSpeaker = async (data) => {
    setSpeakers(l => l.map(s => s.id === data.id ? { ...data } : s));
    setSpeakerModal(null);
    toast('บันทึกการแก้ไขเรียบร้อยแล้ว');
    if (window.db.isConfigured()) {
      try { await window.db.saveSpeaker(data); }
      catch (e) { toast('บันทึก Google Sheets ล้มเหลว: ' + e.message, 'danger'); }
    }
  };

  const deleteSpeaker = async (id) => {
    setSpeakers(l => l.filter(s => s.id !== id));
    setSpeakerConfirm(null);
    toast('ลบรายการแล้ว', 'danger');
    if (window.db.isConfigured()) {
      try { await window.db.deleteSpeaker(id); }
      catch (e) { toast('ลบ Google Sheets ล้มเหลว: ' + e.message, 'danger'); }
    }
  };

  /* ── Helpers ─────────────────────────────────────────────── */
  const openDetail = (id) => { setSelectedId(id); setView('detail'); window.scrollTo({ top: 0 }); };
  const goView     = (v)  => { setView(v); setNavOpen(false); window.scrollTo({ top: 0 }); };

  const exportCSV = () => {
    const head = ['ปีงบประมาณ','ชื่อโครงการ','ประเภท','ระยะเวลาดำเนินงาน','กลุ่มเป้าหมาย',
                  'จำนวนผู้เข้ารับบริการ','เงินงบประมาณ','เงินรายได้','ค่าใช้จ่ายจริง',
                  'เงินคงเหลือ','ผู้รับผิดชอบโครงการ','สถานะ'];
    const esc   = v => '"' + String(v).replace(/"/g, '""') + '"';
    const lines = filtered.map(p => [
      p.year, p.name, D.categories[p.category].name, p.duration, p.target,
      p.recipients, p.budget, p.income, p.actual, p.remaining, p.owner,
      (STATUS[p.status] || {}).label,
    ].map(esc).join(','));
    const csv  = '\uFEFF' + [head.map(esc).join(','), ...lines].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `สรุปโครงการบริการวิชาการ_${year === 'all' ? 'ทุกปี' : year}.csv`;
    a.click();
    toast('ส่งออกไฟล์ CSV แล้ว');
  };

  /* ── Loading screen ──────────────────────────────────────── */
  if (loading) return <LoadingSplash />;

  const isSpeakerView = view === 'speakers' || view === 'speaker-dashboard';
  const T = TITLES[view] || TITLES['dashboard'];

  return (
    <div className={'app' + (navOpen ? ' nav-open' : '')}>

      {/* Setup banner — shown when Google Sheets not configured */}
      {!window.db.isConfigured() && <SetupBanner />}

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand" style={{ flexDirection:'column', alignItems:'flex-start', gap:6, paddingBottom:20 }}>
          <img src="uploads/PNU-New-W-2048x1024.png" alt="PNU Logo"
            style={{ height:38, width:'auto', maxWidth:170, objectFit:'contain', objectPosition:'left', display:'block' }} />
          <div className="brand-text" style={{ paddingLeft:2 }}>
            <div className="t1">บริการวิชาการ</div>
            <div className="t2">{sessionStorage.getItem('nursepnu_user') || 'admin'} · ผู้ดูแลระบบ</div>
          </div>
        </div>

        <nav className="nav">
          <div className="nav-label">บริการวิชาการ</div>
          {NAV.filter(n => ['dashboard','list','summary'].includes(n.key)).map(n => (
            <button key={n.key}
              className={'nav-item' + (view === n.key || (view === 'detail' && n.key === 'list') ? ' active' : '')}
              onClick={() => goView(n.key)}>
              <Icon name={n.icon} />{n.label}
              {n.key === 'list' && <span className="nav-badge num">{projects.length}</span>}
            </button>
          ))}

          <div className="nav-label">ค่าวิทยากรภายนอก</div>
          {NAV.filter(n => ['speaker-dashboard','speakers'].includes(n.key)).map(n => (
            <button key={n.key}
              className={'nav-item' + (view === n.key ? ' active' : '')}
              onClick={() => goView(n.key)}>
              <Icon name={n.icon} />{n.label}
              {n.key === 'speakers' && <span className="nav-badge num">{speakers.length}</span>}
            </button>
          ))}

          <div className="nav-label">การจัดการ</div>
          <button className="nav-item" onClick={() => { setModal({ mode:'add' }); setNavOpen(false); }}>
            <Icon name="plus" />เพิ่มโครงการ
          </button>
          <button className="nav-item" onClick={exportCSV}>
            <Icon name="download" />ส่งออกข้อมูล
          </button>
          <button className="nav-item" onClick={() => setConfirm({ reset: true })}>
            <Icon name="layers" />คืนค่าตัวอย่าง
          </button>
          <a href="sheets-setup-guide.html" target="_blank" className="nav-item" style={{ textDecoration:'none', color:'inherit' }}>
            <Icon name="eye" />คู่มือตั้งค่า Google Sheets
          </a>
        </nav>

        <div className="sidebar-foot">
          <div className="year-pill">
            <span className="dot" style={{ background: window.db.isConfigured() ? '#34d399' : '#fbbf24' }}></span>
            <div style={{ flex:1 }}>
              <div className="lbl">
                {window.db.isConfigured() ? 'เชื่อมต่อ Google Sheets แล้ว' : 'โหมด localStorage'}
              </div>
              <div className="val">ปีงบ {year === 'all' ? '5 ปีล่าสุด' : year}</div>
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:6, marginTop:10 }}>
            <a href="public.html" style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 12px', borderRadius:10, color:'var(--emerald-300)', fontSize:13, textDecoration:'none', background:'rgba(255,255,255,.05)' }}
              onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,.10)'}
              onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,.05)'}>
              <Icon name="trending" size={14} />หน้าสาธารณะ
            </a>
            <button onClick={() => { sessionStorage.removeItem('nursepnu_auth'); sessionStorage.removeItem('nursepnu_user'); window.location.replace('login.html'); }}
              style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 12px', borderRadius:10, color:'rgba(248,113,113,.85)', fontSize:13, background:'rgba(248,113,113,.08)', border:'none', cursor:'pointer', fontFamily:'IBM Plex Sans Thai', textAlign:'left' }}>
              <Icon name="x" size={14} />ออกจากระบบ
            </button>
          </div>
        </div>
      </aside>

      <div className="backdrop-mob" onClick={() => setNavOpen(false)}></div>

      {/* Main content */}
      <div className="main">
        <header className="topbar no-print">
          <button className="hamburger" onClick={() => setNavOpen(true)} aria-label="เมนู">
            <Icon name="menu" />
          </button>
          <div>
            <div className="page-eyebrow">{T.eyebrow}</div>
            <div className="page-title">{view === 'detail' && selected ? 'ข้อมูลโครงการ' : T.title}</div>
          </div>
          <div className="spacer"></div>

          <div className="searchbox">
            <Icon name="search" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="ค้นหาโครงการ ผู้รับผิดชอบ…"
              onFocus={() => { if (view === 'detail') setView('list'); }} />
          </div>

          {!isSpeakerView && (
            <div className="yearselect">
              <Icon name="calendar" />
              <select value={year} onChange={e => setYear(e.target.value)}>
                <option value="all">ทุกปีงบ</option>
                {years.map(y => <option key={y} value={y}>ปีงบ {y}</option>)}
              </select>
            </div>
          )}
          {isSpeakerView && (
            <div className="yearselect">
              <Icon name="calendar" />
              <select value={speakerYear} onChange={e => setSpeakerYear(e.target.value)}>
                <option value="all">ทุกปีงบ</option>
                {speakerFYears.map(y => <option key={y} value={y}>ปีงบ {y}</option>)}
              </select>
            </div>
          )}

          {!isSpeakerView && (
            <button className="btn btn-primary no-print" onClick={() => setModal({ mode:'add' })} style={{ flex:'none' }}>
              <Icon name="plus" /><span className="add-lbl">เพิ่มโครงการ</span>
            </button>
          )}
          {isSpeakerView && (
            <button className="btn btn-primary no-print"
              onClick={() => setSpeakerModal({ mode:'add' })}
              style={{ flex:'none', background:'linear-gradient(135deg,#c9a24b,#b87d12)' }}>
              <Icon name="plus" /><span className="add-lbl">เพิ่มค่าวิทยากร</span>
            </button>
          )}
        </header>

        <main className="content">
          {view === 'dashboard'         && <Dashboard projects={filtered} allProjects={projects} year={year} onOpen={openDetail} />}
          {view === 'list'              && <ProjectList projects={filtered} onOpen={openDetail} onAdd={() => setModal({ mode:'add' })} onEdit={p => setModal({ mode:'edit', project:p })} onDelete={p => setConfirm(p)} />}
          {view === 'summary'           && <BudgetSummary projects={filtered} year={year} onExport={exportCSV} />}
          {view === 'detail'            && <ProjectDetail project={selected} onBack={() => goView('list')} onEdit={p => setModal({ mode:'edit', project:p })} onDelete={p => setConfirm(p)} />}
          {view === 'speaker-dashboard' && <SpeakerDashboard records={filteredSpeakers} fiscalYear={speakerYear} />}
          {view === 'speakers'          && <SpeakerList records={filteredSpeakers} fiscalYear={speakerYear} onAdd={() => setSpeakerModal({ mode:'add' })} onEdit={r => setSpeakerModal({ mode:'edit', record:r })} onDelete={r => setSpeakerConfirm(r)} />}
        </main>
      </div>

      {/* Modals */}
      {modal && <ProjectForm initial={modal.mode === 'edit' ? modal.project : null} onSave={modal.mode === 'edit' ? updateProject : addProject} onClose={() => setModal(null)} />}
      {confirm && confirm.reset  && <ConfirmDialog title="คืนค่าข้อมูลตัวอย่าง" message="ระบบจะลบข้อมูลที่แก้ไขทั้งหมดและกลับสู่ชุดข้อมูลตัวอย่างเริ่มต้น ต้องการดำเนินการต่อหรือไม่?" confirmLabel="คืนค่าข้อมูล" onConfirm={resetData} onClose={() => setConfirm(null)} />}
      {confirm && !confirm.reset && <ConfirmDialog danger title="ลบโครงการ" message={`ต้องการลบโครงการ "${confirm.name}" ใช่หรือไม่?`} confirmLabel="ลบโครงการ" onConfirm={() => reallyDelete(confirm.id)} onClose={() => setConfirm(null)} />}
      {speakerModal    && <SpeakerForm initial={speakerModal.mode === 'edit' ? speakerModal.record : null} onSave={speakerModal.mode === 'edit' ? updateSpeaker : addSpeaker} onClose={() => setSpeakerModal(null)} />}
      {speakerConfirm  && <ConfirmDialog danger title="ลบรายการค่าวิทยากร" message={`ต้องการลบรายการ "${speakerConfirm.firstName} ${speakerConfirm.lastName}" ใช่หรือไม่?`} confirmLabel="ลบรายการ" onConfirm={() => deleteSpeaker(speakerConfirm.id)} onClose={() => setSpeakerConfirm(null)} />}

      <button className="fab no-print"
        onClick={() => isSpeakerView ? setSpeakerModal({ mode:'add' }) : setModal({ mode:'add' })}>
        <Icon name="plus" />
      </button>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ToastHost><App /></ToastHost>
);
