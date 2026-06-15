/* ===================================================================
   view-dashboard.jsx — overview dashboard
=================================================================== */

function KpiCard({ acc, icon, label, value, prefix = '', suffix = '', foot, delay = 0, money }) {
  const v = useCountUp(value, 1200, [value]);
  const shown = money ? fmtTHB(v) : fmtNum(v);
  return (
    <div className={'kpi ' + acc} style={{ animation: `viewIn .6s var(--ease-out) ${delay}ms both` }}>
      <div className="kpi-ico"><Icon name={icon} /></div>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value num">{prefix}{shown}{suffix && <span className="unit">{suffix}</span>}</div>
      <div className="kpi-foot">{foot}</div>
    </div>
  );
}

function Dashboard({ projects, allProjects, year, onOpen }) {
  const t = totals(projects);
  const tAll = totals(allProjects);
  const allYrData = byYear(allProjects).map((d) => ({ ...d, label: '' + d.year }));
  const maxYr = year !== 'all' ? Number(year) : (allYrData.length ? allYrData[allYrData.length - 1].year : 2570);
  const yrData = allYrData.filter((d) => d.year >= maxYr - 4 && d.year <= maxYr);
  const usePct = t.budget + t.income > 0 ? Math.round(t.actual / (t.budget + t.income) * 100) : 0;
  const statusCount = byStatus(projects);

  const [rowsToShow, setRowsToShow] = useState(5);
  const notable = [...projects].sort((a, b) => b.year - a.year || b.budget - a.budget).slice(0, rowsToShow);

  // line chart series: total funding vs actual spend per year
  const yl = yrData.map((d) => '' + d.year);
  const lineSeries = [
    { name: 'วงเงินรวม (งบ+รายได้)', color: '#2563eb', points: yrData.map((d) => d.budget + d.income) },
    { name: 'ค่าใช้จ่ายจริง', color: '#f59e0b', points: yrData.map((d) => d.actual) },
  ];

  return (
    <div className="view">
      {/* KPI row */}
      <div className="kpi-grid">
        <KpiCard acc="acc-emerald" icon="layers" label="โครงการทั้งหมด" value={t.count} suffix=" โครงการ" delay={0}
          foot={<><span className="kpi-trend up"><Icon name="check" size={13} />{statusCount.done} เสร็จสิ้น</span><span style={{ color: 'var(--ink-300)' }}>·</span><span>{statusCount.active} กำลังทำ</span></>} />
        <KpiCard acc="acc-gold" icon="wallet" label="วงเงินรวม (งบ+รายได้)" value={t.budget + t.income} money delay={70}
          foot={<><span>งบ {fmtCompact(t.budget)}</span><span style={{ color: 'var(--ink-300)' }}>·</span><span>รายได้ {fmtCompact(t.income)}</span></>} />
        <KpiCard acc="acc-info" icon="money" label="ค่าใช้จ่ายจริง" value={t.actual} money delay={140}
          foot={<><span className="kpi-trend"><Icon name="pie" size={13} /></span><span>ใช้ไป {usePct}% ของวงเงิน</span></>} />
        <KpiCard acc="acc-emerald" icon="trending" label="เงินคงเหลือ" value={t.remaining} money delay={210}
          foot={<span style={{ color: t.remaining < 0 ? 'var(--danger)' : 'var(--ink-400)' }}>{t.remaining < 0 ? 'เกินงบประมาณ' : 'คงเหลือสุทธิ'}</span>} />
        <KpiCard acc="acc-violet" icon="users" label="ผู้เข้ารับบริการ" value={t.recipients} suffix=" คน" delay={280}
          foot={<span>เฉลี่ย {t.count ? fmtNum(t.recipients / t.count) : 0} คน/โครงการ</span>} />
        <KpiCard acc="acc-gold" icon="wallet" label="หัก 10% ส่ง มหาวิทยาลัยฯ" value={t.deductUniversity} money delay={350}
          foot={<span>10% ของรายได้รวม {fmtCompact(t.income)}</span>} />
        <KpiCard acc="acc-gold" icon="pie" label="หัก 20% ส่ง คณะ" value={t.deductFaculty} money delay={420}
          foot={<span>20% ของรายได้รวม {fmtCompact(t.income)}</span>} />
      </div>

      {/* charts */}
      <div className="charts-row" style={{ marginTop: 20 }}>
        <div className="card card-pad">
          <div className="card-head">
            <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--emerald-100)', color: 'var(--emerald-700)', display: 'grid', placeItems: 'center' }}><Icon name="bars" /></div>
            <div>
              <h3>งบประมาณ · รายได้ · ค่าใช้จ่าย รายปี</h3>
              <div className="sub">เปรียบเทียบรายปีงบประมาณ (บาท) — ทุกปี</div>
            </div>
          </div>
          <GroupedBarChart data={yrData} series={[
            { key: 'budget', name: 'งบประมาณ', color: '#3b82f6' },
            { key: 'income', name: 'รายได้',    color: '#f59e0b' },
            { key: 'actual', name: 'ใช้จริง',   color: '#1d4ed8' },
          ]} />
        </div>
        <div className="card card-pad">
          <div className="card-head">
            <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--gold-100)', color: 'var(--gold-700)', display: 'grid', placeItems: 'center' }}><Icon name="pie" /></div>
            <div>
              <h3>สัดส่วนตามสถานะโครงการ</h3>
              <div className="sub">{year !== 'all' ? `ปี ${year}` : 'ทุกปีงบประมาณ'} · {t.count} โครงการ</div>
            </div>
          </div>
          <DonutChart
            slices={[
              { name: 'เสร็จสิ้น',         value: statusCount.done   || 0, color: '#2563eb' },
              { name: 'กำลังดำเนินการ',    value: statusCount.active || 0, color: '#f59e0b' },
              { name: 'วางแผน',            value: statusCount.plan   || 0, color: '#94a3b8' },
            ].filter(s => s.value > 0)}
            centerValue={t.count} centerLabel="โครงการ" />
        </div>
      </div>

      {/* trend line */}
      <div className="card card-pad" style={{ marginTop: 16 }}>
        <div className="card-head">
          <div style={{ width: 38, height: 38, borderRadius: 11, background: '#e7f1f8', color: 'var(--info)', display: 'grid', placeItems: 'center' }}><Icon name="trending" /></div>
          <div>
            <h3>แนวโน้มวงเงินและการใช้จ่ายรายปี</h3>
            <div className="sub">ปีงบประมาณ {yrData.length ? yrData[0].year : ''} – {maxYr}</div>
          </div>
          <div className="spacer"></div>
          <span className="chip done" style={{ background: 'var(--canvas-2)', color: 'var(--ink-500)' }}>{yrData.length} ปีงบประมาณ</span>
        </div>
        <LineChart series={lineSeries} yearLabels={yl} />
      </div>

      {/* deduction comparison chart */}
      <div className="card card-pad" style={{ marginTop: 16 }}>
        <div className="card-head">
          <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--gold-100)', color: 'var(--gold-700)', display: 'grid', placeItems: 'center' }}><Icon name="wallet" /></div>
          <div>
            <h3>เปรียบเทียบยอดหัก 10% และ 20% รายปี</h3>
            <div className="sub">หัก 10% ส่ง มหาวิทยาลัยฯ · หัก 20% ส่ง คณะ (จากรายได้หลังหัก 10%)</div>
          </div>
          <div className="spacer"></div>
          <div style={{ display: 'flex', gap: 14, fontSize: 12.5, alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: '#c9a24b', display: 'inline-block' }} />หัก 10%: {fmtTHB(t.deductUniversity)}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: '#b87d12', display: 'inline-block' }} />หัก 20%: {fmtTHB(t.deductFaculty)}</span>
          </div>
        </div>
        <GroupedBarChart data={yrData} height={200}
          series={[
            { key: 'deductUniversity', name: 'หัก 10% ส่ง มหาวิทยาลัยฯ', color: '#c9a24b' },
            { key: 'deductFaculty',    name: 'หัก 20% ส่ง คณะ',           color: '#b87d12' },
          ]} />
      </div>

      {/* notable projects */}
      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-pad" style={{ paddingBottom: 6 }}>
          <div className="card-head" style={{ marginBottom: 4 }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--emerald-100)', color: 'var(--emerald-700)', display: 'grid', placeItems: 'center' }}><Icon name="award" /></div>
            <div>
              <h3>โครงการล่าสุด</h3>
              <div className="sub">เรียงตามปีงบประมาณและวงเงิน</div>
            </div>
            <div className="spacer"></div>
            <select value={rowsToShow} onChange={e => setRowsToShow(Number(e.target.value))}
              style={{ padding: '6px 28px 6px 12px', borderRadius: 9, border: '1.5px solid var(--line)', background: 'var(--surface)', fontFamily: 'IBM Plex Sans Thai', fontSize: 13, color: 'var(--ink-700)', cursor: 'pointer', outline: 'none', WebkitAppearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' stroke='%2364748b' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 7px center' }}>
              {[5,10,15,20].map(n => <option key={n} value={n}>แสดง {n} รายการ</option>)}
            </select>
          </div>
        </div>
        <div className="table-wrap">
          <table className="data">
            <thead>
              <tr>
                <th>โครงการ</th><th>ประเภท</th><th>สถานะ</th>
                <th style={{ textAlign: 'right' }}>วงเงิน</th>
                <th style={{ textAlign: 'right' }}>รายได้</th>
                <th style={{ textAlign: 'right', color: 'var(--gold-700)' }}>หัก 10% ม.</th>
                <th style={{ textAlign: 'right', color: 'var(--gold-700)' }}>หัก 20% คณะ</th>
                <th style={{ textAlign: 'right' }}>ใช้จริง</th>
                <th style={{ textAlign: 'right' }}>คงเหลือ</th>
                <th style={{ minWidth: 120 }}>การเบิกจ่าย</th>
              </tr>
            </thead>
            <tbody>
              {notable.map((p) => {
                const D = window.NURSE_DATA;
                const fund = p.budget + p.income;
                const pct = fund > 0 ? Math.min(100, Math.round(p.actual / fund * 100)) : 0;
                return (
                  <tr key={p.id} onClick={() => onOpen(p.id)}>
                    <td><div className="td-name">{p.name}</div><div className="td-name yr">ปีงบ {p.year} · {p.owner}</div></td>
                    <td><span className="cat-tag"><span className="sw" style={{ background: D.categories[p.category].color }} />{D.categories[p.category].name}</span></td>
                    <td><StatusChip s={p.status} /></td>
                    <td className="td-money">{fmtTHB(fund)}</td>
                    <td className="td-money" style={{ color: 'var(--ink-700)' }}>{fmtTHB(p.income)}</td>
                    <td className="td-money" style={{ color: 'var(--gold-700)', fontSize: 13 }}>{fmtTHB(p.deductUniversity !== undefined ? p.deductUniversity : Math.round(p.income * 0.10))}</td>
                    <td className="td-money" style={{ color: 'var(--gold-700)', fontSize: 13 }}>{fmtTHB(p.deductFaculty !== undefined ? p.deductFaculty : Math.round((p.income - Math.round(p.income * 0.10)) * 0.20))}</td>
                    <td className="td-money">{fmtTHB(p.actual)}</td>
                    <td className="td-money" style={{ color: p.remaining < 0 ? 'var(--danger)' : '#2563eb', fontWeight: 600 }}>{fmtTHB(p.remaining)}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <div className={'mini-bar' + (pct >= 100 ? ' over' : '')} style={{ flex: 1 }}><i style={{ width: pct + '%' }} /></div>
                        <span className="num" style={{ fontSize: 12.5, color: 'var(--ink-500)', minWidth: 32 }}>{pct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Dashboard, KpiCard });
