/* ===================================================================
   form-speaker.jsx — modal เพิ่ม/แก้ไขค่าวิทยากรภายนอก
=================================================================== */
function SpeakerForm({ initial, onSave, onClose }) {
  const blank = { firstName: '', lastName: '', topic: '', date: '', venue: '', amount: '', isPaid: false, remark: '' };
  const [f, setF] = useState(initial ? { ...initial, amount: initial.amount || '' } : { ...blank });

  const num = (v) => (v === '' || v === null ? 0 : Number(v));
  const d5  = Math.round(num(f.amount) * 0.05);
  const d10 = Math.round((num(f.amount) - d5) * 0.10);
  const totalW = d5 + d10;
  const netAmt = num(f.amount) - totalW;

  const set = (k, v) => setF((p) => ({ ...p, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!f.firstName.trim()) { alert('กรุณากรอกชื่อ'); return; }
    if (!f.topic.trim())     { alert('กรุณากรอกหัวข้อ'); return; }
    onSave({ ...f, amount: num(f.amount), deduct5: d5, deduct10: d10, totalWithholding: totalW, netAmount: netAmt });
  };

  return (
    <div className="overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 640 }}>
        <div className="modal-head">
          <div className="modal-icon" style={{ background: 'linear-gradient(135deg,#c9a24b,#b87d12)' }}><Icon name="plus" /></div>
          <div>
            <h3>{initial ? 'แก้ไขข้อมูลค่าวิทยากร' : 'เพิ่มค่าวิทยากรภายนอก'}</h3>
            <div className="sub">บันทึกรายละเอียดค่าวิทยากรบริการวิชาการ</div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="ปิด"><Icon name="x" /></button>
        </div>

        <form onSubmit={submit}>
          <div className="form-grid" style={{ padding: '0 28px 24px' }}>

            {/* ชื่อ-นามสกุล */}
            <div className="field">
              <label>ชื่อ (รวมคำนำหน้า) <span className="req">*</span></label>
              <input className="input" placeholder="เช่น ผศ.ดร.สมชาย" value={f.firstName} onChange={(e) => set('firstName', e.target.value)} />
            </div>
            <div className="field">
              <label>นามสกุล</label>
              <input className="input" placeholder="เช่น ใจดี" value={f.lastName} onChange={(e) => set('lastName', e.target.value)} />
            </div>

            {/* หัวข้อ */}
            <div className="field" style={{ gridColumn: '1/-1' }}>
              <label>หัวข้อ/เรื่อง <span className="req">*</span></label>
              <input className="input" placeholder="เช่น อบรมพยาบาลวิชาชีพ ครั้งที่ 1" value={f.topic} onChange={(e) => set('topic', e.target.value)} />
            </div>

            {/* วันที่ + สถานที่ */}
            <div className="field">
              <label>วัน/เดือน/ปี</label>
              <input className="input" placeholder="เช่น 31-ต.ค.-68" value={f.date} onChange={(e) => set('date', e.target.value)} />
            </div>
            <div className="field">
              <label>สถานที่</label>
              <input className="input" placeholder="เช่น โรงพยาบาลนราธิวาสราชนครินทร์" value={f.venue} onChange={(e) => set('venue', e.target.value)} />
            </div>

            {/* จำนวนเงิน */}
            <div className="field" style={{ gridColumn: '1/-1' }}>
              <label>จำนวนเงินทั้งหมด (บาท)</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-400)', fontFamily: 'Kanit' }}>฿</span>
                <input className="input" type="number" min="0" step="0.01" placeholder="0.00"
                  value={f.amount} onChange={(e) => set('amount', e.target.value)}
                  style={{ paddingLeft: 32 }} />
              </div>
              <span className="hint">กรอก 0 หรือเว้นว่างหากไม่ได้รับเงินจากผู้จัด</span>
            </div>

            {/* computed deductions */}
            <div className="field">
              <label>หักให้ ม. 5%</label>
              <div className="computed" style={{ background: '#fdf8ec', borderColor: '#e8d08a', color: 'var(--gold-700)' }}>
                {fmtTHB(d5)}
                <span style={{ fontSize: 12, color: 'var(--ink-400)', marginLeft: 8 }}>= เงิน × 5%</span>
              </div>
            </div>
            <div className="field">
              <label>หักให้คณะ 10%</label>
              <div className="computed" style={{ background: '#fdf8ec', borderColor: '#e8d08a', color: 'var(--gold-700)' }}>
                {fmtTHB(d10)}
                <span style={{ fontSize: 12, color: 'var(--ink-400)', marginLeft: 8 }}>= (เงิน−5%) × 10%</span>
              </div>
            </div>
            <div className="field">
              <label>จำนวนเงินที่ชำระ (หัก ม.+คณะ)</label>
              <div className="computed" style={{ background: '#fdf8ec', borderColor: '#e8d08a', color: 'var(--gold-700)', fontWeight: 700 }}>
                {fmtTHB(totalW)}
              </div>
            </div>
            <div className="field">
              <label>เงินที่วิทยากรได้รับสุทธิ</label>
              <div className="computed" style={{ color: 'var(--emerald-700)', background: 'var(--emerald-50)', borderColor: 'var(--emerald-300)' }}>
                {fmtTHB(netAmt)}
              </div>
            </div>

            {/* สถานะ */}
            <div className="field">
              <label>สถานะการจ่ายเงิน</label>
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button type="button" onClick={() => set('isPaid', true)}
                  style={{ flex: 1, padding: '10px', borderRadius: 10, border: '1.5px solid', cursor: 'pointer', fontFamily: 'IBM Plex Sans Thai', fontSize: 14, fontWeight: f.isPaid ? 600 : 400,
                    background: f.isPaid ? 'var(--emerald-50)' : 'var(--canvas)', borderColor: f.isPaid ? 'var(--emerald-400)' : 'var(--line)', color: f.isPaid ? 'var(--emerald-700)' : 'var(--ink-400)' }}>
                  ✓ จ่ายแล้ว
                </button>
                <button type="button" onClick={() => set('isPaid', false)}
                  style={{ flex: 1, padding: '10px', borderRadius: 10, border: '1.5px solid', cursor: 'pointer', fontFamily: 'IBM Plex Sans Thai', fontSize: 14, fontWeight: !f.isPaid ? 600 : 400,
                    background: !f.isPaid ? '#fdf0f2' : 'var(--canvas)', borderColor: !f.isPaid ? '#f6a3b0' : 'var(--line)', color: !f.isPaid ? 'var(--danger)' : 'var(--ink-400)' }}>
                  ✗ ยังไม่จ่าย
                </button>
              </div>
            </div>
            <div className="field">
              <label>หมายเหตุ</label>
              <input className="input" placeholder="เช่น ไม่ได้รับเงินจากผู้จัด" value={f.remark} onChange={(e) => set('remark', e.target.value)} />
            </div>

          </div>

          <div className="modal-foot">
            <button type="button" className="btn btn-ghost" onClick={onClose}>ยกเลิก</button>
            <button type="submit" className="btn btn-primary">
              <Icon name="check" />{initial ? 'บันทึกการแก้ไข' : 'เพิ่มค่าวิทยากร'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Object.assign(window, { SpeakerForm });
