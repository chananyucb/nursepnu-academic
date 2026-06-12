/* ===================================================================
   view-detail.jsx — single project detail
=================================================================== */

function ProjectDetail({ project: p, onBack, onEdit, onDelete }) {
  if (!p) return null;
  const D = window.NURSE_DATA;
  const cat = D.categories[p.category];
  const fund = p.budget + p.income;
  const deductU = Math.round(p.income * 0.10);
  const deductF = Math.round((p.income - deductU) * 0.20);
  const netFund = fund - deductU - deductF;
  const usePct = netFund > 0 ? Math.min(100, Math.round(p.actual / netFund * 100)) : 0;
  const over = p.remaining < 0;

  const aBudget = useCountUp(p.budget, 1000, [p.id]);
  const aIncome = useCountUp(p.income, 1000, [p.id]);
  const aActual = useCountUp(p.actual, 1000, [p.id]);
  const aRemain = useCountUp(p.remaining, 1000, [p.id]);


  const InfoRow = ({ icon, k, children }) => (
    <div className="info-row">
      <div className="k"><Icon name={icon} />{k}</div>
      <div className="v">{children}</div>
    </div>
  );

  return (
    <div className="view">
      <button className="btn btn-quiet btn-sm no-print" onClick={onBack} style={{ marginBottom: 14, paddingLeft: 4 }}><Icon name="arrowLeft" />กลับสู่รายการโครงการ</button>

      <div className="detail-hero">
        <div className="inner">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span className="chip" style={{ background: 'rgba(255,255,255,.14)', color: '#fff' }}><span className="chip-dot" style={{ background: cat.color }} />{cat.name}</span>
            <StatusChip s={p.status} />
            <span className="chip" style={{ background: 'rgba(201,162,75,.22)', color: 'var(--gold-300)' }}>ปีงบประมาณ {p.year}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(20px,3vw,28px)', color: '#fff', lineHeight: 1.25, maxWidth: 820 }}>{p.name}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 22, marginTop: 16, color: 'var(--emerald-200)', fontSize: 14 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="user" size={17} />{p.owner}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="clock" size={17} />{p.duration || '—'}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon name="users" size={17} />{fmtNum(p.recipients)} คน</span>
          </div>
          <div className="no-print" style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            <button className="btn btn-gold" onClick={() => onEdit(p)}><Icon name="edit" />แก้ไขโครงการ</button>
            <button className="btn btn-ghost" onClick={() => window.print()} style={{ background: 'rgba(255,255,255,.12)', borderColor: 'rgba(255,255,255,.2)', color: '#fff' }}><Icon name="print" />พิมพ์</button>
            <button className="btn btn-ghost" onClick={() => onDelete(p)} style={{ background: 'rgba(255,255,255,.08)', borderColor: 'rgba(255,255,255,.16)', color: '#ffd9df' }}><Icon name="trash" />ลบ</button>
          </div>
        </div>
      </div>

      {/* money stats */}
      <div className="detail-stat-grid" style={{ marginTop: 16, gridTemplateColumns: 'repeat(3,1fr)' }}>
        <div className="dstat"><div className="l">เงินงบประมาณ</div><div className="v num" style={{ color: 'var(--emerald-700)' }}>{fmtTHB(aBudget)}</div></div>
        <div className="dstat"><div className="l">เงินรายได้</div><div className="v num" style={{ color: 'var(--gold-700)' }}>{fmtTHB(aIncome)}</div></div>
        <div className="dstat" style={{ background: over ? '#fdf0f2' : 'var(--emerald-50)', borderColor: over ? '#f6c9d1' : 'var(--emerald-200)' }}>
          <div className="l">เงินคงเหลือ</div><div className="v num" style={{ color: over ? 'var(--danger)' : 'var(--emerald-700)' }}>{fmtTHB(aRemain)}</div></div>
        <div className="dstat" style={{ background: 'var(--gold-100)', borderColor: '#e8d08a' }}>
          <div className="l">หัก 10% ส่ง มหาวิทยาลัยฯ</div>
          <div className="v num" style={{ color: 'var(--gold-700)' }}>{fmtTHB(Math.round(p.income * 0.10))}</div>
        </div>
        <div className="dstat" style={{ background: 'var(--gold-100)', borderColor: '#e8d08a' }}>
          <div className="l">หัก 20% ส่ง คณะ</div>
          <div className="v num" style={{ color: 'var(--gold-700)' }}>{fmtTHB(Math.round((p.income - Math.round(p.income*0.10)) * 0.20))}</div>
        </div>
        <div className="dstat"><div className="l">ค่าใช้จ่ายจริง</div><div className="v num" style={{ color: 'var(--info)' }}>{fmtTHB(aActual)}</div></div>
      </div>

      <div className="charts-row" style={{ marginTop: 16 }}>
        {/* breakdown */}
        <div className="card card-pad">
          <div className="card-head"><h3>โครงสร้างวงเงินและการเบิกจ่าย</h3><div className="spacer"></div><span className="num" style={{ fontFamily: 'Kanit', fontWeight: 600, fontSize: 18, color: over ? 'var(--danger)' : 'var(--emerald-700)' }}>{usePct}%</span></div>

          <div style={{ fontSize: 12.5, color: 'var(--ink-400)', marginBottom: 8 }}>วงเงินทั้งหมด {fmtTHB(fund)} · สุทธิหลังหัก {fmtTHB(netFund)}</div>
          <div className="fin-bar-track">
            <div className="fin-seg" style={{ width: (p.budget/fund*100) + '%', background: 'linear-gradient(90deg,var(--emerald-600),var(--emerald-700))' }}>{p.budget/fund > .14 && 'งบ ' + fmtCompact(p.budget)}</div>
            <div className="fin-seg" style={{ width: (p.income*(1-0.1-0.2)/fund*100) + '%', background: 'linear-gradient(90deg,var(--gold-500),var(--gold-600))', color:'#3a2c08' }}>{p.income*.7/fund > .14 && 'รายได้สุทธิ ' + fmtCompact(Math.round(p.income*.7))}</div>
            <div className="fin-seg" style={{ width: (deductU/fund*100) + '%', background:'linear-gradient(90deg,#e8c96b,#c9a24b)', color:'#3a2c08', fontSize:11 }}>{deductU/fund > .08 && 'มหาลัย 10%'}</div>
            <div className="fin-seg" style={{ width: (deductF/fund*100) + '%', background:'linear-gradient(90deg,#d4a844,#b88c2d)', color:'#3a2c08', fontSize:11 }}>{deductF/fund > .08 && 'คณะ 20%'}</div>
          </div>

          <div style={{ fontSize: 12.5, color: 'var(--ink-400)', margin: '20px 0 8px' }}>การเบิกจ่ายเทียบวงเงินสุทธิ</div>
          <div className="fin-bar-track" style={{ background: 'var(--emerald-50)' }}>
            <div className="fin-seg" style={{ width: usePct + '%', background: over ? 'linear-gradient(90deg,#e9a23b,var(--danger))' : 'linear-gradient(90deg,var(--emerald-500),var(--emerald-700))' }}>{usePct > 10 && 'ใช้จริง ' + fmtCompact(p.actual)}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 13 }}>
            <span style={{ color: 'var(--ink-500)' }}>คงเหลือ <b className="num" style={{ color: over ? 'var(--danger)' : 'var(--emerald-700)' }}>{fmtTHB(p.remaining)}</b></span>
            <span style={{ color: 'var(--ink-500)' }}>คิดเป็น <b className="num">{netFund > 0 ? Math.round(p.remaining / netFund * 100) : 0}%</b> ของวงเงินสุทธิ</span>
          </div>
        </div>

        {/* composition donut */}
        <div className="card card-pad">
          <div className="card-head"><h3>สัดส่วนแหล่งเงิน</h3></div>
          <DonutChart size={180} thickness={24}
            slices={[
              { name: 'เงินงบประมาณ', value: p.budget, color: '#0e5c4a' },
              { name: 'เงินรายได้', value: p.income, color: '#c9a24b' },
            ]}
            centerValue={fmtCompact(fund)} centerLabel="วงเงินรวม" />
        </div>
      </div>

      {/* full info */}
      <div className="card card-pad" style={{ marginTop: 16 }}>
        <div className="card-head"><div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--emerald-100)', color: 'var(--emerald-700)', display: 'grid', placeItems: 'center' }}><Icon name="doc" /></div><h3>รายละเอียดโครงการ</h3></div>
        <div className="info-grid">
          <InfoRow icon="calendar" k="ปีงบประมาณ">{p.year} <span style={{ color: 'var(--ink-400)', fontSize: 13 }}>(ค.ศ. {ceYear(p.year)})</span></InfoRow>
          <InfoRow icon="clock" k="ระยะเวลาดำเนินงาน">{p.duration || '—'}</InfoRow>
          <InfoRow icon="target" k="กลุ่มเป้าหมาย">{p.target || '—'}</InfoRow>
          <InfoRow icon="users" k="จำนวนผู้เข้ารับบริการ">{fmtNum(p.recipients)} คน</InfoRow>
          <InfoRow icon="layers" k="ประเภทโครงการ"><span className="cat-tag"><span className="sw" style={{ background: cat.color }} />{cat.name}</span></InfoRow>
          <InfoRow icon="user" k="ผู้รับผิดชอบโครงการ">{p.owner}</InfoRow>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ProjectDetail });
