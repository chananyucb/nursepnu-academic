/* ===================================================================
   view-list.jsx — project register (table, filter, sort, CRUD entry)
=================================================================== */

function ProjectList({ projects, onOpen, onAdd, onEdit, onDelete }) {
  const D = window.NURSE_DATA;
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState({ key: 'year', dir: 'desc' });

  let rows = projects.filter((p) => (status === 'all' || p.status === status));

  rows = [...rows].sort((a, b) => {
    const k = sort.key;
    let av = a[k], bv = b[k];
    if (k === 'name') { av = a.name; bv = b.name; return sort.dir === 'asc' ? av.localeCompare(bv, 'th') : bv.localeCompare(av, 'th'); }
    return sort.dir === 'asc' ? av - bv : bv - av;
  });

  const toggleSort = (key) => setSort((s) => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'desc' });
  const SortTh = ({ k, children, right }) => (
    <th className="sortable" onClick={() => toggleSort(k)} style={right ? { textAlign: 'right' } : null}>
      {children}
      <span className="sort-i" style={{ color: sort.key === k ? 'var(--emerald-600)' : 'transparent' }}>{sort.dir === 'asc' ? '▲' : '▼'}</span>
    </th>
  );

  const t = totals(rows);

  return (
    <div className="view">
      <div className="toolbar">
        <div className="seg">
          <button className={status === 'all' ? 'on' : ''} onClick={() => setStatus('all')}>ทุกสถานะ</button>
          <button className={status === 'done' ? 'on' : ''} onClick={() => setStatus('done')}>เสร็จสิ้น</button>
          <button className={status === 'active' ? 'on' : ''} onClick={() => setStatus('active')}>กำลังทำ</button>
          <button className={status === 'plan' ? 'on' : ''} onClick={() => setStatus('plan')}>วางแผน</button>
        </div>
        <div className="spacer"></div>
        <button className="btn btn-primary" onClick={onAdd}><Icon name="plus" />เพิ่มโครงการ</button>
      </div>

      <div className="card">
        <div className="card-pad" style={{ display: 'flex', alignItems: 'center', gap: 14, paddingBottom: 14, borderBottom: '1px solid var(--line)' }}>
          <span style={{ fontFamily: 'Kanit', fontWeight: 600, fontSize: 15 }}>{rows.length} โครงการ</span>
          <span style={{ color: 'var(--ink-300)' }}>·</span>
          <span style={{ fontSize: 13.5, color: 'var(--ink-500)' }}>วงเงินรวม <b className="num" style={{ color: 'var(--emerald-700)' }}>{fmtTHB(t.budget + t.income)}</b></span>
          <span style={{ color: 'var(--ink-300)' }}>·</span>
          <span style={{ fontSize: 13.5, color: 'var(--ink-500)' }}>ใช้จริง <b className="num" style={{ color: 'var(--gold-700)' }}>{fmtTHB(t.actual)}</b></span>
        </div>

        {rows.length === 0 ? (
          <div className="empty">
            <Icon name="search" />
            <h4>ไม่พบโครงการ</h4>
            <p>ลองปรับตัวกรองหรือคำค้นหา</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data">
              <thead>
                <tr>
                  <SortTh k="name">โครงการ</SortTh>
                  <th>ประเภท</th>
                  <SortTh k="recipients" right>ผู้รับบริการ</SortTh>
                  <th>สถานะ</th>
                  <SortTh k="budget" right>งบประมาณ</SortTh>
                  <SortTh k="income" right>รายได้</SortTh>
                  <SortTh k="actual" right>ใช้จริง</SortTh>
                  <SortTh k="remaining" right>คงเหลือ</SortTh>
                  <th style={{ textAlign: 'right' }}></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id} onClick={() => onOpen(p.id)}>
                    <td style={{ maxWidth: 320 }}>
                      <div className="td-name" style={{ whiteSpace: 'normal' }}>{p.name}</div>
                      <div className="td-name yr">ปีงบ {p.year} · {p.owner}</div>
                    </td>
                    <td><span className="cat-tag"><span className="sw" style={{ background: D.categories[p.category].color }} />{D.categories[p.category].name}</span></td>
                    <td className="td-money num">{fmtNum(p.recipients)}</td>
                    <td><StatusChip s={p.status} /></td>
                    <td className="td-money">{fmtTHB(p.budget)}</td>
                    <td className="td-money">{fmtTHB(p.income)}</td>
                    <td className="td-money">{fmtTHB(p.actual)}</td>
                    <td className="td-money" style={{ color: p.remaining < 0 ? 'var(--danger)' : 'var(--emerald-700)', fontWeight: 600 }}>{fmtTHB(p.remaining)}</td>
                    <td>
                      <div className="row-actions" style={{ justifyContent: 'flex-end' }}>
                        <button className="btn btn-icon btn-quiet" title="ดูรายละเอียด" onClick={(e) => { e.stopPropagation(); onOpen(p.id); }}><Icon name="eye" size={17} /></button>
                        <button className="btn btn-icon btn-quiet" title="แก้ไข" onClick={(e) => { e.stopPropagation(); onEdit(p); }}><Icon name="edit" size={16} /></button>
                        <button className="btn btn-icon btn-quiet" title="ลบ" onClick={(e) => { e.stopPropagation(); onDelete(p); }} style={{ color: 'var(--danger)' }}><Icon name="trash" size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { ProjectList });
