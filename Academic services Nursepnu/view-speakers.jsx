/* ===================================================================
   view-speakers.jsx — ตารางค่าวิทยากรภายนอก
=================================================================== */
function SpeakerList({ records, onAdd, onEdit, onDelete, fiscalYear }) {
  const [search, setSearch] = useState('');
  const [statusF, setStatusF] = useState('all');
  const [sort, setSort] = useState({ key: 'seq', dir: 'asc' });

  const filtered = records.filter((r) => {
    const q = search.toLowerCase();
    const match = !q || (r.firstName + r.lastName + r.topic + r.venue).toLowerCase().includes(q);
    const stMatch = statusF === 'all' || (statusF === 'paid' ? r.isPaid : !r.isPaid);
    return match && stMatch;
  }).sort((a, b) => {
    const v = sort.dir === 'asc' ? 1 : -1;
    if (sort.key === 'seq') return (a.seq - b.seq) * v;
    if (sort.key === 'amount') return (a.amount - b.amount) * v;
    if (sort.key === 'date') return a.date.localeCompare(b.date) * v;
    return 0;
  });

  const th = (k, label) => (
    <th style={{ cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' }} onClick={() => setSort(s => ({ key: k, dir: s.key === k && s.dir === 'asc' ? 'desc' : 'asc' }))}>
      {label}{sort.key === k ? (sort.dir === 'asc' ? ' ↑' : ' ↓') : ''}
    </th>
  );

  const totAmount = filtered.reduce((a, r) => a + r.amount, 0);
  const totD5     = filtered.reduce((a, r) => a + r.deduct5, 0);
  const totD10    = filtered.reduce((a, r) => a + r.deduct10, 0);
  const totW      = filtered.reduce((a, r) => a + r.totalWithholding, 0);
  const paidCount = filtered.filter(r => r.isPaid).length;

  const exportCSV = () => {
    const head = ['ลำดับ','ชื่อ','นามสกุล','หัวข้อ/เรื่อง','วัน/เดือน/ปี','สถานที่','จำนวนเงินทั้งหมด','หักให้ ม. 5%','หักให้คณะ 10%','จำนวนเงินที่ชำระ','เงินสุทธิ','สถานะ','หมายเหตุ'];
    const esc = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"';
    const lines = filtered.map(r => [r.seq, r.firstName, r.lastName, r.topic, r.date, r.venue, r.amount, r.deduct5, r.deduct10, r.totalWithholding, r.netAmount, r.isPaid ? 'จ่ายแล้ว' : 'ยังไม่จ่าย', r.remark].map(esc).join(','));
    const csv = '\uFEFF' + [head.map(esc).join(','), ...lines].join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    a.download = `ค่าวิทยากรภายนอก${fiscalYear && fiscalYear !== 'all' ? '_ปีงบ' + fiscalYear : ''}.csv`;
    a.click();
  };

  return (
    <div className="view">
      <div className="toolbar" style={{ flexWrap: 'wrap', gap: 10 }}>
        <div className="seg">
          <button className={statusF === 'all' ? 'on' : ''} onClick={() => setStatusF('all')}>ทั้งหมด</button>
          <button className={statusF === 'paid' ? 'on' : ''} onClick={() => setStatusF('paid')}>จ่ายแล้ว</button>
          <button className={statusF === 'unpaid' ? 'on' : ''} onClick={() => setStatusF('unpaid')}>ยังไม่จ่าย</button>
        </div>
        <div className="spacer"></div>
        <button className="btn btn-ghost no-print" onClick={exportCSV}><Icon name="download" />ส่งออก CSV</button>
        <button className="btn btn-ghost no-print" onClick={() => window.print()}><Icon name="print" />พิมพ์รายงาน</button>
      </div>

      <div className="card" style={{ marginTop: 14 }}>
        <div className="card-pad" style={{ paddingBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            <span className="num" style={{ fontSize: 22, fontWeight: 700, color: 'var(--emerald-800)' }}>{filtered.length}</span>
            <span style={{ fontSize: 13, color: 'var(--ink-400)' }}>รายการ{fiscalYear && fiscalYear !== 'all' ? ` · ปีงบ ${fiscalYear}` : ' · ทุกปีงบ'}</span>
            <span style={{ color: 'var(--line)' }}>·</span>
            <span style={{ fontSize: 13 }}>รวม <b className="num" style={{ color: 'var(--emerald-700)' }}>{fmtTHB(totAmount)}</b></span>
            <span style={{ color: 'var(--line)' }}>·</span>
            <span style={{ fontSize: 13 }}>หัก ม.5% <b className="num" style={{ color: 'var(--gold-700)' }}>{fmtTHB(totD5)}</b></span>
            <span style={{ color: 'var(--line)' }}>·</span>
            <span style={{ fontSize: 13 }}>หัก คณะ10% <b className="num" style={{ color: 'var(--gold-700)' }}>{fmtTHB(totD10)}</b></span>
            <span style={{ color: 'var(--line)' }}>·</span>
            <span style={{ fontSize: 13 }}>จ่ายแล้ว <b className="num" style={{ color: 'var(--emerald-600)' }}>{paidCount}/{filtered.length}</b></span>
          </div>
        </div>
        <div className="table-wrap">
          <table className="data" style={{ fontSize: 13.5 }}>
            <thead>
              <tr>
                {th('seq', 'ลำดับ')}
                <th>ชื่อ-สกุล</th>
                <th style={{ minWidth: 220 }}>หัวข้อ/เรื่อง</th>
                {th('date', 'วัน/เดือน/ปี')}
                <th>สถานที่</th>
                {th('amount', 'จำนวนเงินทั้งหมด')}
                <th style={{ textAlign: 'right', color: 'var(--gold-700)' }}>หักให้ ม. 5%</th>
                <th style={{ textAlign: 'right', color: 'var(--gold-700)' }}>หักให้คณะ 10%</th>
                <th style={{ textAlign: 'right', color: 'var(--gold-700)' }}>จำนวนเงินที่ชำระ</th>
                <th style={{ textAlign: 'center' }}>จ่าย</th>
                <th style={{ textAlign: 'center' }}>ยังไม่จ่าย</th>
                <th>หมายเหตุ</th>
                <th className="no-print" style={{ width: 80 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td className="num" style={{ fontWeight: 700, color: 'var(--ink-400)' }}>{r.seq}</td>
                  <td>
                    <div style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{r.firstName}</div>
                    <div style={{ color: 'var(--ink-500)', fontSize: 12.5 }}>{r.lastName}</div>
                  </td>
                  <td><div className="td-name" style={{ maxWidth: 260, whiteSpace: 'normal', lineHeight: 1.4 }}>{r.topic}</div></td>
                  <td className="num" style={{ whiteSpace: 'nowrap', fontSize: 12.5 }}>{r.date}</td>
                  <td style={{ fontSize: 12.5, color: 'var(--ink-500)' }}>{r.venue}</td>
                  <td className="td-money" style={{ fontWeight: 600 }}>{r.amount > 0 ? fmtTHB(r.amount) : <span style={{ color: 'var(--ink-300)' }}>—</span>}</td>
                  <td className="td-money" style={{ color: 'var(--gold-700)' }}>{r.deduct5 > 0 ? fmtTHB(r.deduct5) : <span style={{ color: 'var(--ink-300)' }}>—</span>}</td>
                  <td className="td-money" style={{ color: 'var(--gold-700)' }}>{r.deduct10 > 0 ? fmtTHB(r.deduct10) : <span style={{ color: 'var(--ink-300)' }}>—</span>}</td>
                  <td className="td-money" style={{ color: 'var(--gold-700)', fontWeight: 700 }}>{r.totalWithholding > 0 ? fmtTHB(r.totalWithholding) : <span style={{ color: 'var(--ink-300)' }}>—</span>}</td>
                  <td style={{ textAlign: 'center' }}>{r.isPaid ? <span style={{ color: 'var(--emerald-600)', fontSize: 16 }}>✓</span> : ''}</td>
                  <td style={{ textAlign: 'center' }}>{!r.isPaid ? <span style={{ color: 'var(--danger)', fontSize: 16 }}>✓</span> : ''}</td>
                  <td style={{ fontSize: 12, color: 'var(--ink-400)', maxWidth: 160 }}>{r.remark}</td>
                  <td className="no-print">
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn-icon" title="แก้ไข" onClick={() => onEdit(r)}><Icon name="edit" size={15} /></button>
                      <button className="btn-icon danger" title="ลบ" onClick={() => onDelete(r)}><Icon name="trash" size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={13} style={{ textAlign: 'center', padding: '40px', color: 'var(--ink-300)' }}>ไม่พบข้อมูล</td></tr>
              )}
            </tbody>
            {filtered.length > 0 && (
              <tfoot>
                <tr style={{ background: 'var(--emerald-50)', fontWeight: 700 }}>
                  <td colSpan={5} style={{ padding: '10px 18px', color: 'var(--emerald-800)' }}>รวมทั้งสิ้น</td>
                  <td className="td-money">{fmtTHB(totAmount)}</td>
                  <td className="td-money" style={{ color: 'var(--gold-700)' }}>{fmtTHB(totD5)}</td>
                  <td className="td-money" style={{ color: 'var(--gold-700)' }}>{fmtTHB(totD10)}</td>
                  <td className="td-money" style={{ color: 'var(--gold-700)' }}>{fmtTHB(totW)}</td>
                  <td colSpan={4}></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SpeakerList });
