/* =====================================================================
   supabase-db.js — Supabase data layer
   · ถ้า key ยังไม่ได้ตั้งค่า → ใช้ localStorage เป็น fallback อัตโนมัติ
   · ถ้าตั้งค่าแล้ว → ทุก read/write ผ่าน Supabase PostgreSQL
   ===================================================================== */
(function () {

  const LS_PROJECTS = 'nursepnu.projects.v5';
  const LS_SPEAKERS = 'nursepnu.speakers.v1';

  /* ── Is Supabase configured? ─────────────────────────────────── */
  function isConfigured() {
    return (
      window.SUPABASE_URL &&
      window.SUPABASE_ANON_KEY &&
      window.SUPABASE_URL      !== 'PASTE_YOUR_PROJECT_URL_HERE' &&
      window.SUPABASE_ANON_KEY !== 'PASTE_YOUR_ANON_KEY_HERE'
    );
  }

  /* ── Lazy Supabase client (singleton) ────────────────────────── */
  let _client = null;
  function getClient() {
    if (!isConfigured()) return null;
    if (!_client) {
      _client = window.supabase.createClient(
        window.SUPABASE_URL,
        window.SUPABASE_ANON_KEY
      );
    }
    return _client;
  }

  /* ── Field mappers: JS camelCase ↔ Postgres snake_case ───────── */
  function pToRow(p) {
    return {
      id: p.id,
      year: p.year,
      name: p.name,
      category: p.category || 'academic',
      duration: p.duration || '',
      target: p.target || '',
      recipients: p.recipients || 0,
      budget: p.budget || 0,
      income: p.income || 0,
      deduct_university: p.deductUniversity || 0,
      deduct_faculty: p.deductFaculty || 0,
      actual: p.actual || 0,
      remaining: p.remaining || 0,
      owner: p.owner || '',
      status: p.status || 'plan',
    };
  }
  function rowToP(r) {
    return {
      id: r.id,
      year: r.year,
      name: r.name,
      category: r.category,
      duration: r.duration,
      target: r.target,
      recipients: r.recipients,
      budget: r.budget,
      income: r.income,
      deductUniversity: r.deduct_university,
      deductFaculty: r.deduct_faculty,
      actual: r.actual,
      remaining: r.remaining,
      owner: r.owner,
      status: r.status,
    };
  }

  function sToRow(s) {
    return {
      id: s.id,
      seq: s.seq || 0,
      first_name: s.firstName || '',
      last_name: s.lastName || '',
      topic: s.topic || '',
      date: s.date || '',
      venue: s.venue || '',
      amount: s.amount || 0,
      deduct5: s.deduct5 || 0,
      deduct10: s.deduct10 || 0,
      total_withholding: s.totalWithholding || 0,
      net_amount: s.netAmount || 0,
      is_paid: s.isPaid || false,
      remark: s.remark || '',
    };
  }
  function rowToS(r) {
    return {
      id: r.id,
      seq: r.seq,
      firstName: r.first_name,
      lastName: r.last_name,
      topic: r.topic,
      date: r.date,
      venue: r.venue,
      amount: r.amount,
      deduct5: r.deduct5,
      deduct10: r.deduct10,
      totalWithholding: r.total_withholding,
      netAmount: r.net_amount,
      isPaid: r.is_paid,
      remark: r.remark,
    };
  }

  /* ── localStorage helpers (fallback mode) ────────────────────── */
  function lsLoadProjects() {
    try {
      const raw = localStorage.getItem(LS_PROJECTS);
      if (raw) { const p = JSON.parse(raw); if (Array.isArray(p) && p.length) return p; }
    } catch (e) {}
    return (window.NURSE_DATA?.projects || []).map(p => ({ ...p }));
  }
  function lsSaveProjects(list) {
    try { localStorage.setItem(LS_PROJECTS, JSON.stringify(list)); } catch (e) {}
  }
  function lsLoadSpeakers() {
    try {
      const raw = localStorage.getItem(LS_SPEAKERS);
      if (raw) { const p = JSON.parse(raw); if (Array.isArray(p) && p.length) return p; }
    } catch (e) {}
    return (window.NURSE_SPEAKERS?.records || []).map(r => ({ ...r }));
  }
  function lsSaveSpeakers(list) {
    try { localStorage.setItem(LS_SPEAKERS, JSON.stringify(list)); } catch (e) {}
  }

  /* ══════════════════════════════════════════════════════════════ */
  window.db = {
    isConfigured,

    /* ── Projects ───────────────────────────────────────────── */
    async fetchProjects() {
      const c = getClient();
      if (!c) return lsLoadProjects();
      const { data, error } = await c
        .from('projects')
        .select('*')
        .order('year', { ascending: false });
      if (error) throw error;
      return data.map(rowToP);
    },

    async saveProject(p) {
      const c = getClient();
      if (!c) return; // localStorage path handled by useEffect in app
      const { error } = await c.from('projects').upsert(pToRow(p));
      if (error) throw error;
    },

    async deleteProject(id) {
      const c = getClient();
      if (!c) return;
      const { error } = await c.from('projects').delete().eq('id', id);
      if (error) throw error;
    },

    /* ── Speakers ───────────────────────────────────────────── */
    async fetchSpeakers() {
      const c = getClient();
      if (!c) return lsLoadSpeakers();
      const { data, error } = await c
        .from('speaker_records')
        .select('*')
        .order('seq', { ascending: true });
      if (error) throw error;
      return data.map(rowToS);
    },

    async saveSpeaker(s) {
      const c = getClient();
      if (!c) return;
      const { error } = await c.from('speaker_records').upsert(sToRow(s));
      if (error) throw error;
    },

    async deleteSpeaker(id) {
      const c = getClient();
      if (!c) return;
      const { error } = await c.from('speaker_records').delete().eq('id', id);
      if (error) throw error;
    },

    /* ── Seed sample data (run once after setup) ────────────── */
    async seedAll() {
      const c = getClient();
      if (!c) throw new Error('Supabase ยังไม่ได้ตั้งค่า');
      const pr = (window.NURSE_DATA?.projects || []).map(pToRow);
      const sp = (window.NURSE_SPEAKERS?.records || []).map(sToRow);
      const [r1, r2] = await Promise.all([
        c.from('projects').upsert(pr),
        c.from('speaker_records').upsert(sp),
      ]);
      if (r1.error) throw r1.error;
      if (r2.error) throw r2.error;
    },

    /* ── Exposed for localStorage path ─────────────────────── */
    lsSaveProjects,
    lsSaveSpeakers,
  };
})();
