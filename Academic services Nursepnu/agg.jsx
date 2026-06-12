/* ===================================================================
   agg.jsx — selectors / aggregations over the project list
=================================================================== */

function totals(projects) {
  return projects.reduce((a, p) => ({
    count: a.count + 1,
    budget: a.budget + p.budget,
    income: a.income + p.income,
    deductUniversity: a.deductUniversity + (p.deductUniversity !== undefined ? p.deductUniversity : Math.round(p.income * 0.10)),
    deductFaculty: a.deductFaculty + (p.deductFaculty !== undefined ? p.deductFaculty : Math.round((p.income - Math.round(p.income*0.10)) * 0.20)),
    actual: a.actual + p.actual,
    remaining: a.remaining + p.remaining,
    recipients: a.recipients + p.recipients,
  }), { count: 0, budget: 0, income: 0, deductUniversity: 0, deductFaculty: 0, actual: 0, remaining: 0, recipients: 0 });
}

function byYear(projects) {
  const m = {};
  projects.forEach((p) => {
    (m[p.year] = m[p.year] || { year: p.year, budget: 0, income: 0, deductUniversity: 0, deductFaculty: 0, actual: 0, remaining: 0, count: 0, recipients: 0 });
    m[p.year].budget += p.budget; m[p.year].income += p.income;
    m[p.year].deductUniversity += (p.deductUniversity !== undefined ? p.deductUniversity : Math.round(p.income * 0.10));
    m[p.year].deductFaculty    += (p.deductFaculty    !== undefined ? p.deductFaculty    : Math.round((p.income - Math.round(p.income*0.10)) * 0.20));
    m[p.year].actual += p.actual; m[p.year].remaining += p.remaining;
    m[p.year].count += 1; m[p.year].recipients += p.recipients;
  });
  return Object.values(m).sort((a, b) => a.year - b.year);
}

function byCategory(projects) {
  const D = window.NURSE_DATA;
  const m = {};
  projects.forEach((p) => {
    (m[p.category] = m[p.category] || { key: p.category, name: D.categories[p.category].name, color: D.categories[p.category].color, budget: 0, income: 0, actual: 0, count: 0, recipients: 0 });
    m[p.category].budget += p.budget; m[p.category].income += p.income;
    m[p.category].actual += p.actual; m[p.category].count += 1; m[p.category].recipients += p.recipients;
  });
  return Object.values(m).sort((a, b) => b.actual - a.actual);
}

function byStatus(projects) {
  const m = { done: 0, active: 0, plan: 0 };
  projects.forEach((p) => { m[p.status] = (m[p.status] || 0) + 1; });
  return m;
}

Object.assign(window, { totals, byYear, byCategory, byStatus });
