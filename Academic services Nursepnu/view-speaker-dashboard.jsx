/* ===================================================================
   view-speaker-dashboard.jsx — แดชบอร์ดค่าวิทยากรภายนอก
=================================================================== */
function SpeakerDashboard({ records, fiscalYear }) {
  const tot       = records.reduce((a, r) => a + r.amount, 0);
  const totD5     = records.reduce((a, r) => a + r.deduct5, 0);
  const totD10    = records.reduce((a, r) => a + r.deduct10, 0);
  const totW      = records.reduce((a, r) => a + r.totalWithholding, 0);
  const totNet    = records.reduce((a, r) => a + r.netAmount, 0);
  const paidCount = records.filter(r => r.isPaid).length;
  const unpaidAmt = records.filter(r => !r.isPaid).reduce((a, r) => a + r.amount, 0);
  const paidAmt   = records.filter(r => r.isPaid).reduce((a, r) => a + r.amount, 0);

  const vTot   = useCountUp(tot,   1200, [tot]);
  const vD5    = useCountUp(totD5, 1200, [totD5]);
  const vD10   = useCountUp(totD10,1200, [totD10]);
  const vNet   = useCountUp(totNet,1200, [totNet]);

  /* monthly bar data */
  const monthMap = {};
  records.forEach((r) => {
    const m = r.date ? r.date.replace(/^\d+-\d+-/, '').replace(/^\d+\s/, '') : 'ไม่ระบุ';
    if (!monthMap[m]) monthMap[m] = { label: m, amount: 0, deduct5: 0, deduct10: 0 };
    monthMap[m].amount  += r.amount;
    monthMap[m].deduct5 += r.deduct5;
    monthMap[m].deduct10+= r.deduct10;
  });
  const monthData = Object.values(monthMap).slice(0, 8);

  const [rowsToShow, setRowsToShow] = useState(5);

  const donutSlices = [
    { name: 'จ่ายแล้ว',    value: paidCount,              color: '#2563eb' },
    { name: 'ยังไม่จ่าย',  value: records.length - paidCount, color: '#e11d48' },
  ].filter(s => s.value > 0);

  const deductDonut = [
    { name: 'หัก 5% ม.',   value: totD5,  color: '#f59e0b' },
    { name: 'หัก 10% คณะ', value: totD10, color: '#b45309' },
    { name: 'เงินสุทธิวิทยากร', value: totNet, color: '#2563eb' },
  ].filter(s => s.value > 0);

  return (
    <div className="view">
      {/* KPI row */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
        <div className="kpi acc-emerald">
          <div className="kpi-icon"><Icon name="users" /></div>
          <div className="kpi-label">วิทยากรทั้งหมด</div>
          <div className="kpi-value num">{records.length} <span style={{ fontSize: 16, fontWeight: 500 }}>ราย</span></div>
          <div className="kpi-foot"><span className="kpi-trend up"><Icon name="check" size={13} />{paidCount} จ่ายแล้ว</span><span style={{ color: 'var(--ink-300)' }}>·</span><span>{records.length - paidCount} ยังไม่จ่าย</span><span style={{ color: 'var(--ink-300)' }}>·</span><span style={{ color: 'var(--ink-400)' }}>{fiscalYear !== 'all' ? `ปีงบ ${fiscalYear}` : 'ทุกปีงบ'}</span></div>
        </div>
        <div className="kpi acc-gold">
          <div className="kpi-icon"><Icon name="wallet" /></div>
          <div className="kpi-label">ค่าวิทยากรรวม</div>
          <div className="kpi-value num">{fmtTHB(vTot)}</div>
          <div className="kpi-foot"><span>จ่ายแล้ว {fmtCompact(paidAmt)}</span><span style={{ color: 'var(--ink-300)' }}>·</span><span>ค้าง {fmtCompact(unpaidAmt)}</span></div>
        </div>
        <div className="kpi acc-gold">
          <div className="kpi-icon"><Icon name="pie" /></div>
          <div className="kpi-label">หัก 5% ส่ง ม.</div>
          <div className="kpi-value num">{fmtTHB(vD5)}</div>
          <div className="kpi-foot"><span>5% ของค่าวิทยากรรวม</span></div>
        </div>
        <div className="kpi acc-gold">
          <div className="kpi-icon"><Icon name="pie" /></div>
          <div className="kpi-label">หัก 10% ส่ง คณะ</div>
          <div className="kpi-value num">{fmtTHB(vD10)}</div>
          <div className="kpi-foot"><span>10% ของ(เงิน−5%)</span></div>
        </div>
        <div className="kpi acc-emerald">
          <div className="kpi-icon"><Icon name="trending" /></div>
          <div className="kpi-label">เงินสุทธิวิทยากร</div>
          <div className="kpi-value num">{fmtTHB(vNet)}</div>
          <div className="kpi-foot"><span>หลังหักทุกรายการ</span></div>
        </div>
      </div>

      {/* charts */}
      <div className="charts-row" style={{ marginTop: 20 }}>
        {/* paid/unpaid donut */}
        <div className="card card-pad">
          <div className="card-head">
            <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--emerald-100)', color: 'var(--emerald-700)', display: 'grid', placeItems: 'center' }}><Icon name="pie" /></div>
            <div><h3>สถานะการจ่ายเงิน</h3><div className="sub">จ่ายแล้ว / ยังไม่จ่าย</div></div>
          </div>
          <DonutChart slices={donutSlices} centerValue={records.length} centerLabel="รายการ" />
        </div>
        {/* deduction breakdown donut */}
        <div className="card card-pad">
          <div className="card-head">
            <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--gold-100)', color: 'var(--gold-700)', display: 'grid', placeItems: 'center' }}><Icon name="wallet" /></div>
            <div><h3>สัดส่วนการหักเงิน</h3><div className="sub">หัก 5% ม. · หัก 10% คณะ · สุทธิ</div></div>
          </div>
          <DonutChart slices={deductDonut} centerValue={fmtCompact(tot)} centerLabel="รวม" />
        </div>
      </div>

      {/* deduction comparison bar chart */}
      <div className="card card-pad" style={{ marginTop: 16 }}>
        <div className="card-head">
          <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--gold-100)', color: 'var(--gold-700)', display: 'grid', placeItems: 'center' }}><Icon name="bars" /></div>
          <div>
            <h3>เปรียบเทียบยอดหัก 5% และ 10%</h3>
            <div className="sub">หัก 5% ส่ง มหาวิทยาลัยฯ · หัก 10% ส่ง คณะ (รวม {records.length} ราย)</div>
          </div>
          <div className="spacer"></div>
          <div style={{ display: 'flex', gap: 14, fontSize: 12.5, alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: '#c9a24b', display: 'inline-block' }} />หัก 5%: {fmtTHB(totD5)}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: '#b87d12', display: 'inline-block' }} />หัก 10%: {fmtTHB(totD10)}</span>
          </div>
        </div>
        <GroupedBarChart data={monthData} height={200}
          series={[
            { key: 'deduct5',  name: 'หัก 5% ส่ง มหาวิทยาลัยฯ', color: '#c9a24b' },
            { key: 'deduct10', name: 'หัก 10% ส่ง คณะ',           color: '#b87d12' },
          ]} />
      </div>

      {/* recent records table */}
      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-pad" style={{ paddingBottom: 6 }}>
          <div className="card-head" style={{ marginBottom: 4 }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--emerald-100)', color: 'var(--emerald-700)', display: 'grid', placeItems: 'center' }}><Icon name="award" /></div>
            <div><h3>รายการล่าสุด</h3><div className="sub">{rowsToShow} รายการล่าสุด</div></div>
            <div className="spacer"></div>
            <select value={rowsToShow} onChange={e => setRowsToShow(Number(e.target.value))}
              style={{ padding: '6px 28px 6px 12px', borderRadius: 9, border: '1.5px solid var(--line)', background: 'var(--surface)', fontFamily: 'IBM Plex Sans Thai', fontSize: 13, color: 'var(--ink-700)', cursor: 'pointer', outline: 'none', WebkitAppearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none' stroke='%2364748b' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 7px center' }}>
              {[5,10,15,20].map(n => <option key={n} value={n}>แสดง {n} รายการ</option>)}
            </select>
          </div>
        </div>
        <div className="table-wrap">
          <table className="data" style={{ fontSize: 13 }}>
            <thead><tr>
              <th>ลำดับ</th><th>ชื่อ-สกุล</th><th>หัวข้อ</th><th>วันที่</th>
              <th style={{ textAlign: 'right' }}>จำนวนเงิน</th>
              <th style={{ textAlign: 'right', color: 'var(--gold-700)' }}>หัก 5% ม.</th>
              <th style={{ textAlign: 'right', color: 'var(--gold-700)' }}>หัก 10% คณะ</th>
              <th style={{ textAlign: 'right', color: 'var(--gold-700)' }}>หัก รวม</th>
              <th style={{ textAlign: 'center' }}>สถานะ</th>
            </tr></thead>
            <tbody>
              {[...records].reverse().slice(0, rowsToShow).map((r) => (
                <tr key={r.id} style={{ cursor: 'default' }}>
                  <td className="num" style={{ color: 'var(--ink-400)' }}>{r.seq}</td>
                  <td><span style={{ fontWeight: 600 }}>{r.firstName}</span> {r.lastName}</td>
                  <td style={{ fontSize: 12.5, maxWidth: 200 }}><div className="td-name">{r.topic}</div></td>
                  <td className="num" style={{ fontSize: 12.5 }}>{r.date}</td>
                  <td className="td-money" style={{ fontWeight: 600 }}>{r.amount > 0 ? fmtTHB(r.amount) : '—'}</td>
                  <td className="td-money" style={{ color: 'var(--gold-700)', fontSize: 13 }}>{r.deduct5 > 0 ? fmtTHB(r.deduct5) : '—'}</td>
                  <td className="td-money" style={{ color: 'var(--gold-700)', fontSize: 13 }}>{r.deduct10 > 0 ? fmtTHB(r.deduct10) : '—'}</td>
                  <td className="td-money" style={{ color: 'var(--gold-700)', fontWeight: 700 }}>{r.totalWithholding > 0 ? fmtTHB(r.totalWithholding) : '—'}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={'chip ' + (r.isPaid ? 'done' : 'plan')}>{r.isPaid ? 'จ่ายแล้ว' : 'ยังไม่จ่าย'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SpeakerDashboard });
