/* ===================================================================
   form.jsx — ProjectForm (add / edit modal) + ConfirmDialog
=================================================================== */

function ProjectForm({ initial, onSave, onClose }) {
  const D = window.NURSE_DATA;
  const cats = Object.values(D.categories);
  const blank = {
    year: 2568, name: '', category: 'academic', duration: '', target: '',
    recipients: '', budget: '', income: '', actual: '', owner: D.owners[0], status: 'plan',
  };
  const [f, setF] = useState(() => initial ? { ...initial } : blank);
  const [touched, setTouched] = useState({});
  const isEdit = !!initial;

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const num = (v) => (v === '' || v === null ? 0 : Number(v));
  const deductUniversity = Math.round(num(f.income) * 0.10);
  const deductFaculty    = Math.round((num(f.income) - deductUniversity) * 0.20);
  const remaining = num(f.budget) + num(f.income) - deductUniversity - deductFaculty - num(f.actual);

  const errors = {};
  if (!String(f.name).trim()) errors.name = 'กรุณากรอกชื่อโครงการ';
  if (!f.year) errors.year = 'เลือกปีงบประมาณ';
  if (num(f.budget) < 0) errors.budget = 'ต้องไม่ติดลบ';
  const valid = Object.keys(errors).length === 0;

  const submit = () => {
    setTouched({ name: 1, year: 1, budget: 1 });
    if (!valid) return;
    onSave({
      ...f,
      recipients: num(f.recipients),
      budget: num(f.budget),
      income: num(f.income),
      deductUniversity,
      deductFaculty,
      actual: num(f.actual),
      remaining,
    });
  };

  const MoneyField = ({ k, label, hint }) => (
    <div className="field">
      <label>{label}</label>
      <div className="input-money">
        <span className="baht">฿</span>
        <input className={'input' + (touched[k] && errors[k] ? ' bad' : '')} inputMode="numeric" type="number" min="0"
          value={f[k]} placeholder="0"
          onChange={(e) => set(k, e.target.value)} onBlur={() => setTouched((t) => ({ ...t, [k]: 1 }))} />
      </div>
      {touched[k] && errors[k] ? <span className="err">{errors[k]}</span> : hint ? <span className="hint">{hint}</span> : null}
    </div>
  );

  return (
    <div className="overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal-head">
          <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--emerald-100)', color: 'var(--emerald-700)', display: 'grid', placeItems: 'center' }}>
            <Icon name={isEdit ? 'edit' : 'plus'} />
          </div>
          <div style={{ flex: 1 }}>
            <h3>{isEdit ? 'แก้ไขโครงการ' : 'เพิ่มโครงการใหม่'}</h3>
            <div className="sub">บันทึกรายละเอียดโครงการบริการวิชาการ</div>
          </div>
          <button className="btn btn-icon btn-quiet" onClick={onClose}><Icon name="close" /></button>
        </div>

        <div className="modal-body">
          <div className="form-grid">
            <div className="field col-2">
              <label>ชื่อโครงการ <span className="req">*</span></label>
              <input className={'input' + (touched.name && errors.name ? ' bad' : '')} value={f.name}
                placeholder="เช่น อบรมการช่วยฟื้นคืนชีพขั้นพื้นฐาน (CPR)…"
                onChange={(e) => set('name', e.target.value)} onBlur={() => setTouched((t) => ({ ...t, name: 1 }))} />
              {touched.name && errors.name && <span className="err">{errors.name}</span>}
            </div>

            <div className="field">
              <label>ปีงบประมาณ <span className="req">*</span></label>
              <select className="select" value={f.year} onChange={(e) => set('year', Number(e.target.value))}>
                {Array.from({ length: 2590 - 2562 + 1 }, (_, i) => 2562 + i).map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            <div className="field">
              <label>ประเภทโครงการ</label>
              <select className="select" value={f.category} onChange={(e) => set('category', e.target.value)}>
                <option value="academic">งานบริการวิชาการ</option>
              </select>
            </div>

            <div className="field">
              <label>ระยะเวลาดำเนินงาน</label>
              <input className="input" value={f.duration} placeholder="เช่น ม.ค. – มี.ค. 2568"
                onChange={(e) => set('duration', e.target.value)} />
            </div>

            <div className="field">
              <label>สถานะโครงการ</label>
              <select className="select" value={f.status} onChange={(e) => set('status', e.target.value)}>
                <option value="plan">วางแผน</option>
                <option value="active">กำลังดำเนินการ</option>
                <option value="done">เสร็จสิ้น</option>
              </select>
            </div>

            <div className="field col-2">
              <label>กลุ่มเป้าหมาย</label>
              <input className="input" value={f.target} placeholder="เช่น ผู้สูงอายุติดสังคม 60 ปีขึ้นไป"
                onChange={(e) => set('target', e.target.value)} />
            </div>

            <div className="field">
              <label>จำนวนผู้เข้ารับบริการ</label>
              <input className="input" type="number" min="0" inputMode="numeric" value={f.recipients} placeholder="0"
                onChange={(e) => set('recipients', e.target.value)} />
              <span className="hint">หน่วย: คน</span>
            </div>

            <div className="field">
              <label>ผู้รับผิดชอบโครงการ</label>
              <input className="input" list="owner-list" value={f.owner} placeholder="ชื่อ–สกุล ผู้รับผิดชอบ"
                onChange={(e) => set('owner', e.target.value)} />
              <datalist id="owner-list">{D.owners.map((o) => <option key={o} value={o} />)}</datalist>
            </div>

            <MoneyField k="budget" label="เงินงบประมาณ" hint="งบประมาณแผ่นดิน/เงินอุดหนุน" />
            <MoneyField k="income" label="เงินรายได้" hint="เงินรายได้/สมทบ" />

            <div className="field">
              <label>หัก 10% ส่ง มหาวิทยาลัยฯ</label>
              <div className="computed" style={{ background: '#fdf8ec', borderColor: '#e8d08a', color: 'var(--gold-700)' }}>
                {fmtTHB(deductUniversity)}
                <span style={{ fontSize: 12, color: 'var(--ink-400)', marginLeft: 8 }}>= รายได้ × 10%</span>
              </div>
            </div>
            <div className="field">
              <label>หัก 20% ส่ง คณะ</label>
              <div className="computed" style={{ background: '#fdf8ec', borderColor: '#e8d08a', color: 'var(--gold-700)' }}>
                {fmtTHB(deductFaculty)}
                <span style={{ fontSize: 12, color: 'var(--ink-400)', marginLeft: 8 }}>= รายได้ × 20%</span>
              </div>
            </div>

            <MoneyField k="actual" label="ค่าใช้จ่ายจริง" hint="ยอดเบิกจ่ายจริง" />

            <div className="field">
              <label>เงินคงเหลือ (คำนวณอัตโนมัติ)</label>
              <div className="computed" style={{ color: remaining < 0 ? 'var(--danger)' : 'var(--emerald-700)', borderColor: remaining < 0 ? '#f6c9d1' : 'var(--emerald-300)', background: remaining < 0 ? '#fdf0f2' : 'var(--emerald-50)' }}>
                {fmtTHB(remaining)}
                {remaining < 0 && <span style={{ fontSize: 12, marginLeft: 8 }}>เกินงบ</span>}
              </div>
              <span className="hint">งบ + รายได้ − หัก10% − หัก20% − ค่าใช้จ่ายจริง</span>
            </div>
          </div>
        </div>

        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={onClose}>ยกเลิก</button>
          <button className="btn btn-primary" onClick={submit} disabled={!valid} style={{ opacity: valid ? 1 : .55 }}>
            <Icon name="check" />{isEdit ? 'บันทึกการแก้ไข' : 'เพิ่มโครงการ'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmDialog({ title, message, confirmLabel, onConfirm, onClose, danger }) {
  return (
    <div className="overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" style={{ width: 'min(440px,100%)' }} role="dialog" aria-modal="true">
        <div className="modal-body" style={{ textAlign: 'center', paddingTop: 30 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, margin: '0 auto 16px', display: 'grid', placeItems: 'center', background: danger ? '#fce9ec' : 'var(--emerald-100)', color: danger ? 'var(--danger)' : 'var(--emerald-700)' }}>
            <Icon name={danger ? 'trash' : 'alert'} size={26} />
          </div>
          <h3 style={{ fontSize: 18, marginBottom: 8 }}>{title}</h3>
          <p style={{ color: 'var(--ink-500)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{message}</p>
        </div>
        <div className="modal-foot" style={{ justifyContent: 'center', borderTop: 0, paddingTop: 0 }}>
          <button className="btn btn-ghost" onClick={onClose}>ยกเลิก</button>
          <button className={'btn ' + (danger ? 'btn-danger' : 'btn-primary')} onClick={onConfirm}>{confirmLabel || 'ยืนยัน'}</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ProjectForm, ConfirmDialog });
