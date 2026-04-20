/**
 * OFD Sales Forecast - Shared Utilities
 */

// ── Month generation ──────────────────────────────────────────────────────
function generateMonths(startDate, endDate) {
  const months = [];
  const cur = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');
  while (cur <= end) {
    const y = cur.getFullYear();
    const m = cur.getMonth(); // 0-indexed
    const key = `${y}_${String(m + 1).padStart(2, '0')}`;
    const shortNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    months.push({ key, year: y, month: m, label: `${shortNames[m]} ${String(y).slice(2)}`, full: `${shortNames[m]} ${y}` });
    cur.setMonth(cur.getMonth() + 1);
  }
  return months;
}

// ── Formatting ────────────────────────────────────────────────────────────
function fmtMoney(n, compact = false) {
  if (n == null || isNaN(n)) return '$—';
  if (compact && Math.abs(n) >= 1000000) return '$' + (n / 1000000).toFixed(1) + 'M';
  if (compact && Math.abs(n) >= 1000) return '$' + (n / 1000).toFixed(1) + 'K';
  return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtNum(n, dec = 0) {
  if (n == null || isNaN(n)) return '—';
  return Number(n).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}

function fmtPct(n) {
  if (n == null || isNaN(n) || !isFinite(n)) return '—';
  return n.toFixed(1) + '%';
}

function escH(s) {
  return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── IDs ───────────────────────────────────────────────────────────────────
function uid() { return 'id_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8); }

// ── Toast ─────────────────────────────────────────────────────────────────
function showToast(msg, type = 'success', duration = 3000) {
  let t = document.getElementById('global-toast');
  if (!t) { t = document.createElement('div'); t.id = 'global-toast'; document.body.appendChild(t); }
  t.className = `toast toast-${type} show`;
  t.innerHTML = `<span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span><span>${escH(msg)}</span>`;
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), duration);
}

// ── Modal helpers ─────────────────────────────────────────────────────────
function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }
function closeAllModals() { document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open')); }

// ── Entry totals ──────────────────────────────────────────────────────────
function calcEntryTotals(entry, months) {
  let totalKgs = 0;
  months.forEach(m => { totalKgs += Number(entry.monthly?.[m.key] || 0); });
  const totalValue = totalKgs * Number(entry.price || 0);
  const q1q2 = months.slice(0, 6).reduce((s, m) => s + Number(entry.monthly?.[m.key] || 0), 0);
  const q3q4 = months.slice(6).reduce((s, m) => s + Number(entry.monthly?.[m.key] || 0), 0);
  return { totalKgs, totalValue, q1q2, q3q4 };
}

// ── Month summary for a user's entries in a given month ───────────────────
function monthSummary(entries, monthKey) {
  let kgs = 0, value = 0, lines = 0;
  entries.forEach(e => {
    const k = Number(e.monthly?.[monthKey] || 0);
    if (k > 0) { kgs += k; value += k * Number(e.price || 0); lines++; }
  });
  return { kgs, value, lines };
}

// ── CSV / Excel helpers ───────────────────────────────────────────────────
function downloadCSV(rows, filename) {
  const csv = rows.map(r => r.map(c => `"${String(c ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: filename });
  a.click(); URL.revokeObjectURL(a.href);
}

// ── Light/dark theme ──────────────────────────────────────────────────────
function getTheme() { return localStorage.getItem('ofd2_theme') || 'light'; }
function setTheme(t) { localStorage.setItem('ofd2_theme', t); document.documentElement.setAttribute('data-theme', t); }
function toggleTheme() { setTheme(getTheme() === 'dark' ? 'light' : 'dark'); updateThemeToggle(); }
function updateThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.innerHTML = getTheme() === 'dark'
    ? '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
    : '<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
}

// ── Percentage vs budget ──────────────────────────────────────────────────
function vsPercent(actual, budget) {
  if (!budget) return null;
  return ((actual - budget) / budget) * 100;
}

// ── Parse imported Excel/CSV rows into entries ───────────────────────────
function parseImportedRows(rows, months) {
  // Expects header row: BDM, Account, Status, Product, Code, Family, Category, Type, Projection, Price, [Month1 Kgs], [Month2 Kgs]...
  if (!rows || rows.length < 2) return [];
  const headers = rows[0].map(h => String(h || '').trim().toLowerCase());
  const entries = [];

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (!r || r.every(c => !c)) continue;
    const get = col => {
      const idx = headers.indexOf(col);
      return idx >= 0 ? String(r[idx] || '').trim() : '';
    };

    const monthly = {};
    months.forEach((m, idx) => {
      const colName = m.label.toLowerCase();
      let val = 0;
      // Try by month label or by position after first 10 columns
      const mIdx = headers.indexOf(colName);
      if (mIdx >= 0) val = parseFloat(r[mIdx]) || 0;
      else if (10 + idx < r.length) val = parseFloat(r[10 + idx]) || 0;
      monthly[m.key] = val;
    });

    entries.push({
      id: uid(),
      bdm: get('bdm'), account: get('account name') || get('account'),
      status: get('account status') || get('status') || 'Potential Client',
      product: get('product name') || get('product'),
      code: get('code'), family: get('family group') || get('family'),
      category: get('produc category') || get('category'),
      type: get('type'), projection: parseFloat(get('projection')) || 0,
      price: parseFloat(get('selling price') || get('price')) || 0,
      monthly, createdAt: Date.now(),
    });
  }
  return entries;
}
