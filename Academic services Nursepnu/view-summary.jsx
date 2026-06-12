/* ===================================================================
   view-summary.jsx — budget vs income summary + report export
=================================================================== */

function SummaryStat({ label, value, color, sub, money = true }) {
  const v = useCountUp(value, 1100, [value]);
  return (
    <div style={{ flex: 1, minWidth: 150 }}>
      <div style={{ fontSize: 12.5, color: 'var(--ink-400)' }}>{label}</div>
      <div className="num" style={{ fontFamily: 'Kanit', fontWeight: 600, fontSize: 24, color, lineHeight: 1.2, marginTop: 2 }}>{money ? fmtTHB(v) : fmtNum(v)}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--ink-400)' }}>{sub}</div>}
    </div>
  );
}

function BudgetSummary({ projects, year, onExport }) {
  const t = totals(projects);
  const allYrData = byYear(projects).map((d) => ({ ...d, label: '' + d.year }));
  const maxYr = year !== 'all' ? Number(year) : (allYrData.length ? allYrData[allYrData.length - 1].year : 2570);
  const yrData = allYrData.filter((d) => d.year >= maxYr - 4 && d.year <= maxYr); // charts: 5 yrs
  const yrTable = allYrData; // table: all years
  const fund = t.budget + t.income;
  const usePct = fund > 0 ? Math.round(t.actual / fund * 100) : 0;

  return (
    <div className="view">
      {/* report header (prints too) */}
      <div className="card card-pad" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 46, height: 46, borderRadius: 12, background: 'linear-gradient(150deg,var(--emerald-600),var(--emerald-800))', color: '#fff', display: 'grid', placeItems: 'center' }}><Icon name="summary" /></div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <h2 style={{ fontSize: 19 }}>รายงานสรุปงบประมาณและเงินรายได้</h2>
            <div style={{ fontSize: 13, color: 'var(--ink-500)' }}>คณะพยาบาลศาสตร์ มหาวิทยาลัยนราธิวาสราชนครินทร์ · {year === 'all' ? `ปีงบประมาณ ${maxYr - 4}–${maxYr} (5 ปีล่าสุด)` : 'ปีงบประมาณ ' + year}</div>
          </div>
          <div className="no-print" style={{ display: 'flex', gap: 9 }}>
            <button className="btn btn-ghost" onClick={onExport}><Icon name="download" />ส่งออก CSV</button>
            <button className="btn btn-primary" onClick={() => window.print()}><Icon name="print" />พิมพ์รายงาน</button>
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 20, paddingTop: 18, borderTop: '1px solid var(--line)' }}>
          <SummaryStat label="เงินงบประมาณรวม" value={t.budget} color="var(--emerald-700)" sub={`${Math.round(t.budget / (fund || 1) * 100)}% ของวงเงิน`} />
          <SummaryStat label="เงินรายได้รวม" value={t.income} color="var(--gold-700)" sub={`${Math.round(t.income / (fund || 1) * 100)}% ของวงเงิน`} />
          <SummaryStat label="วงเงินรวมทั้งสิ้น" value={fund} color="var(--ink-900)" sub={`${t.count} โครงการ`} />
          <SummaryStat label="ค่าใช้จ่ายจริง" value={t.actual} color="var(--info)" sub={`ใช้ไป ${usePct}%`} />
          <SummaryStat label="หัก 10% ส่ง มหาวิทยาลัยฯ" value={t.deductUniversity} color="var(--gold-700)" sub="10% ของรายได้" />
          <SummaryStat label="หัก 20% ส่ง คณะ" value={t.deductFaculty} color="var(--gold-700)" sub="20% ของรายได้หลังหัก 10%" />
          <SummaryStat label="เงินคงเหลือสุทธิ" value={t.remaining} color={t.remaining < 0 ? 'var(--danger)' : 'var(--emerald-700)'} sub={t.remaining < 0 ? 'เกินงบ' : `คงเหลือ ${100 - usePct}%`} />
        </div>
      </div>

      <div className="charts-row">
        <div className="card card-pad">
          <div className="card-head"><div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--emerald-100)', color: 'var(--emerald-700)', display: 'grid', placeItems: 'center' }}><Icon name="bars" /></div><h3>เปรียบเทียบงบประมาณ · รายได้ · ใช้จริง</h3></div>
          <GroupedBarChart data={yrData} />
        </div>
        <div className="card card-pad">
          <div className="card-head"><div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--gold-100)', color: 'var(--gold-700)', display: 'grid', placeItems: 'center' }}><Icon name="pie" /></div><h3>แหล่งที่มาของวงเงิน</h3></div>
          <DonutChart
            slices={[
              { name: 'เงินงบประมาณ', value: t.budget, color: '#0e5c4a' },
              { name: 'เงินรายได้', value: t.income, color: '#c9a24b' },
            ]}
            centerValue={fmtCompact(fund)} centerLabel="วงเงินรวม" />
        </div>
      </div>

      {/* deduction comparison chart */}
      <div className="card card-pad" style={{ marginTop: 16 }}>
        <div className="card-head">
          <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--gold-100)', color: 'var(--gold-700)', display: 'grid', placeItems: 'center' }}><Icon name="wallet" /></div>
          <div>
            <h3>เปรียบเทียบยอดหัก 10% และ 20% รายปี</h3>
            <div className="sub">หัก 10% ส่ง มหาวิทยาลัยฯ · หัก 20% ส่ง คณะ (จากรายได้หลังหัก 10%)</div>
          </div>
        </div>
        <GroupedBarChart data={yrData} height={200}
          series={[
            { key: 'deductUniversity', name: 'หัก 10% ส่ง มหาวิทยาลัยฯ', color: '#c9a24b' },
            { key: 'deductFaculty',    name: 'หัก 20% ส่ง คณะ',           color: '#b87d12' },
          ]} />
      </div>

      {/* by year table */}
      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-pad" style={{ paddingBottom: 8 }}>
          <div className="card-head" style={{ marginBottom: 0 }}><h3>สรุปตามปีงบประมาณ</h3><div className="spacer"></div><span className="sub">หน่วย: บาท</span></div>
        </div>
        <div className="table-wrap">
          <table className="data">
            <thead><tr>
              <th>ปีงบ</th><th style={{ textAlign: 'right' }}>โครงการ</th><th style={{ textAlign: 'right' }}>งบประมาณ</th>
              <th style={{ textAlign: 'right' }}>รายได้</th>
              <th style={{ textAlign: 'right', color: 'var(--gold-700)' }}>หัก 10% มหาลัยฯ</th>
              <th style={{ textAlign: 'right', color: 'var(--gold-700)' }}>หัก 20% คณะ</th>
              <th style={{ textAlign: 'right' }}>วงเงินรวม</th>
              <th style={{ textAlign: 'right' }}>ใช้จริง</th><th style={{ textAlign: 'right' }}>คงเหลือ</th><th style={{ minWidth: 110 }}>% ใช้จ่าย</th>
            </tr></thead>
            <tbody>
              {yrTable.map((d) => {
                const f = d.budget + d.income; const pc = f > 0 ? Math.round(d.actual / f * 100) : 0;
                return (
                  <tr key={d.year} style={{ cursor: 'default' }}>
                    <td className="td-name">{d.year}</td>
                    <td className="td-money num">{d.count}</td>
                    <td className="td-money">{fmtTHB(d.budget)}</td>
                    <td className="td-money">{fmtTHB(d.income)}</td>
                    <td className="td-money" style={{ color: 'var(--gold-700)', fontWeight: 600 }}>{fmtTHB(d.deductUniversity || 0)}</td>
                    <td className="td-money" style={{ color: 'var(--gold-700)', fontWeight: 600 }}>{fmtTHB(d.deductFaculty || 0)}</td>
                    <td className="td-money" style={{ fontWeight: 600 }}>{fmtTHB(f)}</td>
                    <td className="td-money">{fmtTHB(d.actual)}</td>
                    <td className="td-money" style={{ color: d.remaining < 0 ? 'var(--danger)' : 'var(--emerald-700)' }}>{fmtTHB(d.remaining)}</td>
                    <td><div style={{ display: 'flex', alignItems: 'center', gap: 9 }}><div className={'mini-bar' + (pc >= 100 ? ' over' : '')} style={{ flex: 1 }}><i style={{ width: Math.min(100, pc) + '%' }} /></div><span className="num" style={{ fontSize: 12.5, minWidth: 30, color: 'var(--ink-500)' }}>{pc}%</span></div></td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ background: 'var(--emerald-50)', fontWeight: 700 }}>
                <td className="td-name" style={{ color: 'var(--emerald-800)' }}>รวมทั้งสิ้น</td>
                <td className="td-money num">{t.count}</td>
                <td className="td-money">{fmtTHB(t.budget)}</td>
                <td className="td-money">{fmtTHB(t.income)}</td>
                <td className="td-money">{fmtTHB(fund)}</td>
                <td className="td-money">{fmtTHB(t.actual)}</td>
                <td className="td-money" style={{ color: t.remaining < 0 ? 'var(--danger)' : 'var(--emerald-700)' }}>{fmtTHB(t.remaining)}</td>
                <td className="num" style={{ fontFamily: 'Kanit' }}>{usePct}%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* by category table — simplified to single row since one project type */}
      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-pad" style={{ paddingBottom: 8 }}>
          <div className="card-head" style={{ marginBottom: 0 }}><h3>ภาพรวมงานบริการวิชาการ</h3><div className="spacer"></div><span className="sub">หน่วย: บาท</span></div>
        </div>
        <div className="table-wrap">
          <table className="data">
            <thead><tr>
              <th>รายการ</th><th style={{ textAlign: 'right' }}>โครงการ</th><th style={{ textAlign: 'right' }}>ผู้รับบริการ (คน)</th>
              <th style={{ textAlign: 'right' }}>วงเงินรวม</th><th style={{ textAlign: 'right' }}>ใช้จริง</th><th style={{ textAlign: 'right' }}>คงเหลือ</th>
            </tr></thead>
            <tbody>
              <tr style={{ cursor: 'default' }}>
                <td className="td-name">งานบริการวิชาการ</td>
                <td className="td-money num">{t.count}</td>
                <td className="td-money num">{fmtNum(t.recipients)}</td>
                <td className="td-money" style={{ fontWeight: 600 }}>{fmtTHB(fund)}</td>
                <td className="td-money">{fmtTHB(t.actual)}</td>
                <td className="td-money" style={{ color: t.remaining < 0 ? 'var(--danger)' : 'var(--emerald-700)', fontWeight:600 }}>{fmtTHB(t.remaining)}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr style={{ background: 'var(--emerald-50)', fontWeight: 700 }}>
                <td className="td-name" style={{ color: 'var(--emerald-800)' }}>รวมทั้งสิ้น</td>
                <td className="td-money num">{t.count}</td>
                <td className="td-money num">{fmtNum(t.recipients)}</td>
                <td className="td-money">{fmtTHB(fund)}</td>
                <td className="td-money">{fmtTHB(t.actual)}</td>
                <td className="td-money" style={{ color: t.remaining < 0 ? 'var(--danger)' : 'var(--emerald-700)' }}>{fmtTHB(t.remaining)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { BudgetSummary });
