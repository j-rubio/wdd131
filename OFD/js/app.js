/**
 * OFD Sales Forecast — Main Application
 * Full multi-user, multi-view SPA
 */

// ── App State ─────────────────────────────────────────────────────────────
const APP = {
  session: null,
  currentUser: null,       // The user whose data we're viewing
  viewingUserId: null,     // null = self, or specific userId (admin only)
  currentView: 'dashboard',
  months: [],              // Fiscal months for current user
  selectedMonthKey: null,
  deleteCallback: null,
  importedData: null,
  importMode: null,        // 'forecast' | 'budget'
  charts: {},
};

// ── Boot ──────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  DB.seed();
  setTheme(getTheme());
  updateThemeToggle();

  APP.session = DB.Session.get();
  if (!APP.session) { window.location.href = 'index.html'; return; }

  APP.currentUser = DB.Users.get(APP.session.userId);
  APP.viewingUserId = APP.session.userId;

  setupSidebar();
  setupAdminBDMFilter();
  loadView('dashboard');

  // Mobile sidebar close on outside click
  document.getElementById('sidebar-backdrop').addEventListener('click', closeSidebar);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeAllModals(); closeSidebar(); } });
});

// ── Auth ──────────────────────────────────────────────────────────────────
function doLogout() {
  DB.Session.clear();
  window.location.href = 'index.html';
}

// ── Sidebar ───────────────────────────────────────────────────────────────
function setupSidebar() {
  const s = APP.session;
  document.getElementById('sb-username').textContent = s.name;
  document.getElementById('sb-role').textContent = s.role === 'admin' ? 'Administrator' : 'Sales BDM';

  const isAdmin = s.role === 'admin';
  const nav = document.getElementById('sidebar-nav');

  const bdmNav = `
    <div class="nav-section-title">My Workspace</div>
    <div class="nav-item" data-view="dashboard" onclick="loadView('dashboard')">
      <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>Dashboard
    </div>
    <div class="nav-item" data-view="forecast" onclick="loadView('forecast')">
      <svg viewBox="0 0 24 24"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>Rolling Forecast
    </div>
    <div class="nav-item" data-view="budget" onclick="loadView('budget')">
      <svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>Budget
    </div>
    <div class="nav-item" data-view="reports" onclick="loadView('reports')">
      <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>Reports &amp; Charts
    </div>
    <div class="nav-section-title">Account</div>
    <div class="nav-item" data-view="profile" onclick="loadView('profile')">
      <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>My Profile
    </div>`;

  const adminNav = `
    <div class="nav-section-title">Overview</div>
    <div class="nav-item" data-view="dashboard" onclick="loadView('dashboard')">
      <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>Team Dashboard
    </div>
    <div class="nav-item" data-view="reports" onclick="loadView('reports')">
      <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>Reports &amp; Charts
    </div>
    <div class="nav-section-title">BDM Data</div>
    <div class="nav-item" data-view="forecast" onclick="loadView('forecast')">
      <svg viewBox="0 0 24 24"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>Rolling Forecast
    </div>
    <div class="nav-item" data-view="budget" onclick="loadView('budget')">
      <svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>Budget
    </div>
    <div class="nav-section-title">Administration</div>
    <div class="nav-item" data-view="users" onclick="loadView('users')">
      <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>Manage Users
    </div>
    <div class="nav-item" data-view="settings" onclick="loadView('settings')">
      <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>Settings
    </div>
    <div class="nav-section-title">Account</div>
    <div class="nav-item" data-view="profile" onclick="loadView('profile')">
      <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>My Profile
    </div>`;

  nav.innerHTML = isAdmin ? adminNav : bdmNav;
}

function setActiveNav(view) {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.view === view);
  });
}

function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const bd = document.getElementById('sidebar-backdrop');
  sb.classList.toggle('mobile-open');
  bd.classList.toggle('visible');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('mobile-open');
  document.getElementById('sidebar-backdrop').classList.remove('visible');
}

// ── Admin BDM Filter ──────────────────────────────────────────────────────
function setupAdminBDMFilter() {
  if (APP.session.role !== 'admin') return;
  const wrap = document.getElementById('bdm-selector-wrap');
  wrap.classList.remove('hidden');
  const sel = document.getElementById('admin-bdm-filter');
  sel.innerHTML = '<option value="">All BDMs</option>';
  DB.Users.bdms().forEach(u => {
    const opt = document.createElement('option');
    opt.value = u.id; opt.textContent = u.name;
    sel.appendChild(opt);
  });
}

function onAdminBDMChange() {
  const val = document.getElementById('admin-bdm-filter').value;
  APP.viewingUserId = val || (APP.session.role === 'admin' ? null : APP.session.userId);
  refreshCurrentView();
}

// ── Month helpers ─────────────────────────────────────────────────────────
function getViewingUser() {
  if (!APP.viewingUserId) return null;
  return DB.Users.get(APP.viewingUserId);
}

function getMonths(userId) {
  const u = userId ? DB.Users.get(userId) : APP.currentUser;
  if (!u || !u.fiscalStart || !u.fiscalEnd) return generateMonths('2026-04-01', '2027-03-31');
  return generateMonths(u.fiscalStart, u.fiscalEnd);
}

function getCurrentMonthKey() {
  const now = new Date();
  return `${now.getFullYear()}_${String(now.getMonth() + 1).padStart(2, '0')}`;
}

// ── View Router ───────────────────────────────────────────────────────────
function loadView(view) {
  APP.currentView = view;
  setActiveNav(view);
  closeSidebar();

  const newBtn = document.getElementById('new-entry-btn');
  newBtn.style.display = (view === 'forecast' || view === 'budget') ? 'inline-flex' : 'none';
  if (view === 'forecast') { newBtn.textContent = ''; newBtn.innerHTML = '<svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Forecast Entry'; newBtn.onclick = () => openEntryModal(null, 'forecast'); }
  if (view === 'budget') { newBtn.textContent = ''; newBtn.innerHTML = '<svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Budget Entry'; newBtn.onclick = () => openEntryModal(null, 'budget'); }

  const titles = { dashboard: 'Dashboard', forecast: 'Rolling Forecast', budget: 'Budget', reports: 'Reports & Charts', users: 'Manage Users', settings: 'Settings', profile: 'My Profile' };
  document.getElementById('page-title').textContent = titles[view] || view;
  document.getElementById('breadcrumb').textContent = '';

  const area = document.getElementById('view-area');
  area.innerHTML = '';

  switch (view) {
    case 'dashboard': renderDashboard(); break;
    case 'forecast': renderCarouselView('forecast'); break;
    case 'budget': renderCarouselView('budget'); break;
    case 'reports': renderReports(); break;
    case 'users': renderUsers(); break;
    case 'settings': renderSettings(); break;
    case 'profile': renderProfile(); break;
  }
}

function refreshCurrentView() { loadView(APP.currentView); }

// ── Data helpers ──────────────────────────────────────────────────────────
function getEntries(mode, userId) {
  const uid = userId || APP.viewingUserId || APP.session.userId;
  if (mode === 'forecast') {
    if (!uid && APP.session.role === 'admin') {
      // All users combined
      const all = DB.Forecast.all();
      return Object.values(all).flat();
    }
    return DB.Forecast.allByUser(uid);
  } else {
    if (!uid && APP.session.role === 'admin') {
      const all = DB.Budget.all();
      return Object.values(all).flat();
    }
    return DB.Budget.allByUser(uid);
  }
}

function getEffectiveUserId() {
  return APP.viewingUserId || APP.session.userId;
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────
function renderDashboard() {
  const isAdmin = APP.session.role === 'admin';
  const uid = getEffectiveUserId();
  const months = getMonths(uid);
  const fEntries = isAdmin && !APP.viewingUserId ? Object.values(DB.Forecast.all()).flat() : DB.Forecast.allByUser(uid || APP.session.userId);
  const bEntries = isAdmin && !APP.viewingUserId ? Object.values(DB.Budget.all()).flat() : DB.Budget.allByUser(uid || APP.session.userId);

  const totalForecast = fEntries.reduce((s, e) => s + (e.totalValue || calcEntryTotals(e, months).totalValue), 0);
  const totalBudget = bEntries.reduce((s, e) => s + (e.totalValue || calcEntryTotals(e, months).totalValue), 0);
  const totalKgs = fEntries.reduce((s, e) => s + (e.totalKgs || calcEntryTotals(e, months).totalKgs), 0);
  const pct = vsPercent(totalForecast, totalBudget);
  const accounts = new Set(fEntries.map(e => e.account)).size;

  const area = document.getElementById('view-area');
  area.innerHTML = `
    <div class="kpi-grid">
      <div class="kpi-card kpi-accent">
        <div class="kpi-label">Total Forecast Value</div>
        <div class="kpi-value">${fmtMoney(totalForecast, true)}</div>
        <div class="kpi-change">${fEntries.length} entries · ${fmtNum(accounts)} accounts</div>
      </div>
      <div class="kpi-card kpi-orange">
        <div class="kpi-label">Budget Value</div>
        <div class="kpi-value">${fmtMoney(totalBudget, true)}</div>
        <div class="kpi-change">${bEntries.length} budget lines</div>
      </div>
      <div class="kpi-card kpi-blue">
        <div class="kpi-label">Forecast vs Budget</div>
        <div class="kpi-value">${pct != null ? fmtPct(pct) : '—'}</div>
        <div class="kpi-change ${pct >= 0 ? 'up' : 'down'}">${pct != null ? (pct >= 0 ? '▲ Above budget' : '▼ Below budget') : 'No budget set'}</div>
      </div>
      <div class="kpi-card kpi-yellow">
        <div class="kpi-label">Total Forecast Kgs</div>
        <div class="kpi-value">${fmtNum(totalKgs)}</div>
        <div class="kpi-change">kg across ${months.length} months</div>
      </div>
    </div>

    <div class="chart-row" style="margin-bottom:16px">
      <div class="chart-card">
        <div class="card-header"><span class="card-title">Monthly Value: Forecast vs Budget</span></div>
        <canvas id="ch-monthly-vs" height="220"></canvas>
      </div>
      <div class="chart-card">
        <div class="card-header"><span class="card-title">By Account Status</span></div>
        <canvas id="ch-status-pie" height="220"></canvas>
      </div>
    </div>

    <div class="chart-row chart-row-equal">
      <div class="chart-card">
        <div class="card-header"><span class="card-title">Monthly Kgs Volume</span></div>
        <canvas id="ch-monthly-kgs" height="200"></canvas>
      </div>
      <div class="chart-card">
        <div class="card-header">
          <span class="card-title">Top 10 Accounts by Value</span>
        </div>
        <div id="top-accounts" style="overflow-y:auto;max-height:240px"></div>
      </div>
    </div>

    ${isAdmin && !APP.viewingUserId ? `
    <div class="chart-row chart-row-equal" style="margin-top:16px">
      <div class="chart-card">
        <div class="card-header"><span class="card-title">BDM Performance</span></div>
        <canvas id="ch-bdm-bar" height="220"></canvas>
      </div>
      <div class="chart-card">
        <div class="card-header"><span class="card-title">Entry Types</span></div>
        <canvas id="ch-types" height="220"></canvas>
      </div>
    </div>` : ''}
  `;

  drawMonthlyVsChart(months, fEntries, bEntries);
  drawStatusPie(fEntries);
  drawKgsBar(months, fEntries);
  drawTopAccounts(fEntries, months);
  if (isAdmin && !APP.viewingUserId) { drawBDMBar(months); drawTypesChart(fEntries); }
}

function drawMonthlyVsChart(months, fEntries, bEntries) {
  const ctx = document.getElementById('ch-monthly-vs')?.getContext('2d');
  if (!ctx) return;
  const fData = months.map(m => fEntries.reduce((s, e) => s + ((e.monthly?.[m.key]||0) * (e.price||0)), 0));
  const bData = months.map(m => bEntries.reduce((s, e) => s + ((e.monthly?.[m.key]||0) * (e.price||0)), 0));
  destroyChart('monthlyVs');
  APP.charts.monthlyVs = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: months.map(m => m.short),
      datasets: [
        { label: 'Forecast', data: fData, backgroundColor: 'rgba(74,160,44,0.75)', borderRadius: 4 },
        { label: 'Budget', data: bData, backgroundColor: 'rgba(245,130,32,0.5)', borderRadius: 4, borderDash: [4,2] },
      ]
    },
    options: chartOpts({ yCallback: v => fmtMoney(v, true) })
  });
}

function drawStatusPie(entries) {
  const ctx = document.getElementById('ch-status-pie')?.getContext('2d');
  if (!ctx) return;
  const pur = entries.filter(e => e.status === 'Purchasing Client').length;
  const pot = entries.filter(e => e.status === 'Potential Client').length;
  destroyChart('statusPie');
  APP.charts.statusPie = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Purchasing Client', 'Potential Client'],
      datasets: [{ data: [pur, pot], backgroundColor: ['#4AA02C', '#3B5998'], borderColor: 'var(--bg2)', borderWidth: 3 }]
    },
    options: { responsive: true, cutout: '60%', plugins: { legend: { position: 'bottom', labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--text3').trim(), font: { family: 'Plus Jakarta Sans', size: 11 } } } } }
  });
}

function drawKgsBar(months, entries) {
  const ctx = document.getElementById('ch-monthly-kgs')?.getContext('2d');
  if (!ctx) return;
  const data = months.map(m => entries.reduce((s, e) => s + (e.monthly?.[m.key]||0), 0));
  destroyChart('kgsBar');
  APP.charts.kgsBar = new Chart(ctx, {
    type: 'line',
    data: { labels: months.map(m => m.short), datasets: [{ label: 'Kgs', data, borderColor: '#4AA02C', backgroundColor: 'rgba(74,160,44,0.1)', fill: true, tension: 0.4, pointBackgroundColor: '#4AA02C', pointRadius: 4 }] },
    options: chartOpts({ yCallback: v => fmtNum(v) + ' kg' })
  });
}

function drawTopAccounts(entries, months) {
  const map = {};
  entries.forEach(e => { map[e.account] = (map[e.account]||0) + (e.totalValue || calcEntryTotals(e, months).totalValue); });
  const sorted = Object.entries(map).sort((a,b) => b[1]-a[1]).slice(0,10);
  const max = sorted[0]?.[1]||1;
  const el = document.getElementById('top-accounts');
  if (!el) return;
  el.innerHTML = sorted.map(([name, val], i) => `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
      <span style="color:var(--text4);font-size:11px;width:18px;text-align:right;flex-shrink:0">${i+1}</span>
      <span style="flex:1;font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escH(name)}</span>
      <div style="width:70px;height:5px;background:var(--bg3);border-radius:3px;overflow:hidden;flex-shrink:0"><div style="height:100%;width:${Math.round(val/max*100)}%;background:var(--accent);border-radius:3px"></div></div>
      <span style="font-family:var(--mono);font-size:11px;color:var(--accent);width:70px;text-align:right;flex-shrink:0">${fmtMoney(val,true)}</span>
    </div>
  `).join('');
}

function drawBDMBar(months) {
  const ctx = document.getElementById('ch-bdm-bar')?.getContext('2d');
  if (!ctx) return;
  const bdms = DB.Users.bdms();
  const labels = bdms.map(u => u.name.split(' ')[0]);
  const data = bdms.map(u => {
    const e = DB.Forecast.allByUser(u.id);
    return e.reduce((s, en) => s + calcEntryTotals(en, getMonths(u.id)).totalValue, 0);
  });
  destroyChart('bdmBar');
  APP.charts.bdmBar = new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: [{ label: 'Forecast Value', data, backgroundColor: ['#4AA02C','#F58220','#3B5998','#FFC20E','#234338'], borderRadius: 6 }] },
    options: chartOpts({ yCallback: v => fmtMoney(v, true) })
  });
}

function drawTypesChart(entries) {
  const ctx = document.getElementById('ch-types')?.getContext('2d');
  if (!ctx) return;
  const map = {};
  entries.forEach(e => { const t = e.type || 'Unspecified'; map[t] = (map[t]||0) + 1; });
  destroyChart('typesChart');
  APP.charts.typesChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(map),
      datasets: [{ data: Object.values(map), backgroundColor: ['#4AA02C','#F58220','#3B5998','#FFC20E','#707070'], borderColor: 'var(--bg2)', borderWidth: 3 }]
    },
    options: { responsive: true, cutout: '55%', plugins: { legend: { position: 'bottom', labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--text3').trim(), font: { family: 'Plus Jakarta Sans', size: 11 } } } } }
  });
}

function chartOpts(opts = {}) {
  const textColor = '#6B8A78';
  return {
    responsive: true,
    plugins: { legend: { display: opts.legend !== false, labels: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 11 } } }, tooltip: { callbacks: { label: c => ' ' + (opts.tooltipFmt ? opts.tooltipFmt(c.raw) : c.raw) } } },
    scales: {
      x: { grid: { color: 'rgba(100,140,120,0.1)' }, ticks: { color: textColor, font: { family: 'JetBrains Mono', size: 11 } } },
      y: { grid: { color: 'rgba(100,140,120,0.1)' }, ticks: { color: textColor, font: { family: 'JetBrains Mono', size: 11 }, callback: opts.yCallback || (v => v) } }
    }
  };
}

function destroyChart(key) { if (APP.charts[key]) { APP.charts[key].destroy(); delete APP.charts[key]; } }

// ── CAROUSEL VIEW (Forecast & Budget) ────────────────────────────────────
function renderCarouselView(mode) {
  const uid = getEffectiveUserId();
  const months = getMonths(uid);
  const isBudget = mode === 'budget';
  const user = getViewingUser() || APP.currentUser;
  const canImport = isBudget && (APP.session.role === 'admin' || user?.settings?.allowBudgetUpload);
  const curKey = getCurrentMonthKey();

  if (!APP.selectedMonthKey || !months.find(m => m.key === APP.selectedMonthKey)) {
    APP.selectedMonthKey = months.find(m => m.key === curKey)?.key || months[0]?.key;
  }

  const area = document.getElementById('view-area');
  area.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px">
      <div>
        <div style="font-size:13px;color:var(--text3);margin-bottom:2px">${isBudget ? 'Budget Calendar' : 'Rolling Forecast Calendar'}</div>
        <div style="font-size:12px;color:var(--text4)">Fiscal: ${months[0]?.full||'—'} → ${months[months.length-1]?.full||'—'}</div>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${canImport ? `<button class="btn btn-secondary btn-sm" onclick="openImportModal('${mode}')">
          <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Import ${isBudget ? 'Budget' : 'Forecast'}
        </button>` : ''}
        <button class="btn btn-secondary btn-sm" onclick="exportView('${mode}')">
          <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export CSV
        </button>
        ${APP.session.role === 'admin' ? `<button class="btn btn-secondary btn-sm" onclick="addMonthManual('${mode}')">
          <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><line x1="12" y1="14" x2="12" y2="18"/><line x1="10" y1="16" x2="14" y2="16"/></svg>
          Add Month
        </button>` : ''}
      </div>
    </div>

    <div class="carousel-wrap section-gap">
      <div class="carousel-track" id="carousel-track"></div>
    </div>

    <div id="month-detail-panel"></div>
  `;

  renderCarouselCards(mode, months);
  renderMonthDetail(mode, APP.selectedMonthKey);
}

function renderCarouselCards(mode, months) {
  const uid = getEffectiveUserId();
  const entries = getEntries(mode, uid);
  const bEntries = mode === 'forecast' ? getEntries('budget', uid) : [];
  const curKey = getCurrentMonthKey();
  const track = document.getElementById('carousel-track');
  if (!track) return;

  track.innerHTML = months.map(m => {
    const sum = monthSummary(entries, m.key);
    const budSum = monthSummary(bEntries, m.key);
    const pct = vsPercent(sum.value, budSum.value);
    const isCur = m.key === curKey;
    const isSel = m.key === APP.selectedMonthKey;

    return `
      <div class="month-card ${isSel ? 'active' : ''} ${isCur ? 'current' : ''}" onclick="selectMonth('${m.key}','${mode}')">
        <div class="month-card-header">
          <span class="month-card-label">${m.label}</span>
          ${isCur ? '<span class="month-card-tag current">NOW</span>' : isSel ? '<span class="month-card-tag">OPEN</span>' : ''}
        </div>
        <div class="month-card-kpi">
          <div class="month-card-kpi-val">${fmtMoney(sum.value, true)}</div>
          <div class="month-card-kpi-label">Forecast Value</div>
        </div>
        <div class="month-card-kpi">
          <div class="month-card-kpi-val">${fmtNum(sum.kgs)} kg</div>
          <div class="month-card-kpi-label">${sum.lines} lines</div>
        </div>
        ${mode === 'forecast' && budSum.value > 0 ? `
        <div class="month-card-divider"></div>
        <div class="month-card-vs">
          <span class="month-card-vs-label">vs Budget</span>
          <span class="month-card-vs-val ${pct >= 0 ? 'above' : 'below'}">${pct != null ? (pct >= 0 ? '+' : '') + fmtPct(pct) : '—'}</span>
        </div>` : ''}
      </div>
    `;
  }).join('');

  // Scroll selected into view
  setTimeout(() => {
    const sel = track.querySelector('.month-card.active');
    if (sel) sel.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, 100);
}

function selectMonth(key, mode) {
  APP.selectedMonthKey = key;
  renderCarouselView(mode);
}

function renderMonthDetail(mode, monthKey) {
  const uid = getEffectiveUserId();
  const months = getMonths(uid);
  const month = months.find(m => m.key === monthKey);
  if (!month) return;

  const entries = getEntries(mode, uid).filter(e => (e.monthly?.[monthKey]||0) > 0);
  const bEntries = mode === 'forecast' ? getEntries('budget', uid).filter(e => (e.monthly?.[monthKey]||0) > 0) : [];
  const sum = monthSummary(getEntries(mode, uid), monthKey);
  const budSum = monthSummary(getEntries('budget', uid), monthKey);
  const pct = vsPercent(sum.value, budSum.value);
  const canEdit = APP.session.role === 'admin' || APP.session.userId === getEffectiveUserId();

  const panel = document.getElementById('month-detail-panel');
  if (!panel) return;

  panel.innerHTML = `
    <div class="month-detail">
      <div class="month-detail-header">
        <div>
          <div class="month-detail-title">${month.full}</div>
          <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:6px;font-size:13px">
            <span>${fmtNum(sum.lines)} lines · <strong>${fmtNum(sum.kgs)} kg</strong> · <strong>${fmtMoney(sum.value)}</strong></span>
            ${mode==='forecast' && budSum.value > 0 ? `<span class="vs-chip ${pct>=0?'above':'below'}">${pct>=0?'▲':'▼'} ${fmtPct(Math.abs(pct))} vs budget</span>` : ''}
          </div>
        </div>
        <div class="month-detail-actions">
          ${canEdit ? `<button class="btn btn-primary btn-sm" onclick="openEntryModal(null,'${mode}','${monthKey}')">
            <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Entry
          </button>` : ''}
        </div>
      </div>

      <div style="padding:0 0 4px">
        <div class="toolbar" style="padding:14px 16px 0">
          <div class="search-box">
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" placeholder="Search entries..." oninput="filterMonthTable(this.value,'${monthKey}','${mode}')" id="month-search-${monthKey}"/>
          </div>
          <div class="filter-row">
            <select class="filter-select" id="month-filter-status-${monthKey}" onchange="filterMonthTable(document.getElementById('month-search-${monthKey}').value,'${monthKey}','${mode}')">
              <option value="">All Status</option>
              <option value="Purchasing Client">Purchasing</option>
              <option value="Potential Client">Potential</option>
            </select>
            <select class="filter-select" id="month-filter-type-${monthKey}" onchange="filterMonthTable(document.getElementById('month-search-${monthKey}').value,'${monthKey}','${mode}')">
              <option value="">All Types</option>
              <option value="Order">Order</option>
              <option value="Deal Projection">Deal Projection</option>
              <option value="Rolling Forecast">Rolling Forecast</option>
            </select>
            <select class="filter-select" id="month-filter-cat-${monthKey}" onchange="filterMonthTable(document.getElementById('month-search-${monthKey}').value,'${monthKey}','${mode}')">
              <option value="">All Categories</option>
              <option value="Class A">Class A</option>
              <option value="Class B">Class B</option>
              <option value="Class C">Class C</option>
              <option value="Branded">Branded</option>
            </select>
          </div>
        </div>

        <div class="table-wrap" style="border-radius:0;border-left:none;border-right:none;border-bottom:none;" id="month-table-wrap-${monthKey}">
          ${renderMonthTable(getEntries(mode, uid), monthKey, mode, canEdit)}
        </div>
      </div>
    </div>
  `;
}

function renderMonthTable(allEntries, monthKey, mode, canEdit) {
  const entries = allEntries.filter(e => (e.monthly?.[monthKey]||0) > 0);
  if (!entries.length) return `<div class="empty-state"><div class="empty-state-icon">📭</div><div class="empty-state-title">No entries for this month</div><div class="empty-state-text">Add a new entry to get started.</div></div>`;

  const rows = entries.map(e => {
    const kgs = e.monthly?.[monthKey]||0;
    const val = kgs * (e.price||0);
    return `
      <tr data-account="${escH(e.account)}" data-product="${escH(e.product)}" data-status="${escH(e.status)}" data-type="${escH(e.type)}" data-category="${escH(e.category)}">
        <td>${escH(e.bdm||'—')}</td>
        <td style="max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${escH(e.account)}">${escH(e.account)}</td>
        <td><span class="badge badge-${e.status==='Purchasing Client'?'purchasing':'potential'}">${escH(e.status||'—')}</span></td>
        <td style="max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${escH(e.product)}">${escH(e.product)}</td>
        <td class="mono">${escH(e.code||'—')}</td>
        <td>${e.category?`<span class="badge badge-${e.category.toLowerCase().replace(' ','')}">${escH(e.category)}</span>`:'—'}</td>
        <td>${e.type?`<span class="badge badge-${e.type==='Order'?'order':e.type==='Rolling Forecast'?'forecast':'projection'}">${escH(e.type)}</span>`:'—'}</td>
        <td class="num">$${fmtNum(e.price,2)}</td>
        <td class="num">${fmtNum(kgs)}</td>
        <td class="num">${fmtMoney(val)}</td>
        ${canEdit ? `<td>
          <div style="display:flex;gap:5px">
            <button class="btn-icon btn" title="Edit" onclick="openEntryModal('${e.id}','${mode}')">
              <svg viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>
            </button>
            <button class="btn-icon btn" title="Delete" onclick="deleteEntry('${e.id}','${mode}')" style="color:var(--danger);border-color:var(--danger)">
              <svg viewBox="0 0 24 24"><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            </button>
          </div>
        </td>` : '<td></td>'}
      </tr>`;
  }).join('');

  return `
    <table class="data-table" id="month-table-${monthKey}">
      <thead><tr>
        <th>BDM</th><th>Account</th><th>Status</th><th>Product</th>
        <th>Code</th><th>Category</th><th>Type</th>
        <th class="num">Price/kg</th><th class="num">Kgs</th><th class="num">Value</th>
        <th>${canEdit ? 'Actions' : ''}</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <div class="table-footer">${entries.length} entries · ${fmtNum(entries.reduce((s,e)=>s+(e.monthly?.[monthKey]||0),0))} kg · ${fmtMoney(entries.reduce((s,e)=>s+((e.monthly?.[monthKey]||0)*(e.price||0)),0))}</div>
  `;
}

function filterMonthTable(search, monthKey, mode) {
  const uid = getEffectiveUserId();
  let entries = getEntries(mode, uid);
  const statusFilter = document.getElementById(`month-filter-status-${monthKey}`)?.value || '';
  const typeFilter = document.getElementById(`month-filter-type-${monthKey}`)?.value || '';
  const catFilter = document.getElementById(`month-filter-cat-${monthKey}`)?.value || '';
  const s = search.toLowerCase();

  if (s) entries = entries.filter(e => e.account?.toLowerCase().includes(s) || e.product?.toLowerCase().includes(s) || e.code?.toLowerCase().includes(s));
  if (statusFilter) entries = entries.filter(e => e.status === statusFilter);
  if (typeFilter) entries = entries.filter(e => e.type === typeFilter);
  if (catFilter) entries = entries.filter(e => e.category === catFilter);

  const wrap = document.getElementById(`month-table-wrap-${monthKey}`);
  if (wrap) wrap.innerHTML = renderMonthTable(entries, monthKey, mode, APP.session.role === 'admin' || APP.session.userId === getEffectiveUserId());
}

// ── REPORTS ───────────────────────────────────────────────────────────────
function renderReports() {
  const uid = getEffectiveUserId();
  const months = getMonths(uid);
  const isAdmin = APP.session.role === 'admin';
  const user = getViewingUser() || APP.currentUser;
  const showTeam = isAdmin || user?.settings?.showTeamComparison;

  const fEntries = getEntries('forecast', uid);
  const bEntries = getEntries('budget', uid);

  const area = document.getElementById('view-area');
  area.innerHTML = `
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px">
      <button class="btn btn-secondary btn-sm" onclick="exportReportCSV()">
        <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Export CSV
      </button>
      ${isAdmin ? `<button class="btn btn-secondary btn-sm" onclick="exportReportCSV('all')">Export All BDMs CSV</button>` : ''}
    </div>

    <div class="chart-row" style="margin-bottom:16px">
      <div class="chart-card">
        <div class="card-header"><span class="card-title">12-Month Forecast vs Budget Value</span></div>
        <canvas id="rpt-vs-bar" height="240"></canvas>
      </div>
      <div class="chart-card">
        <div class="card-header"><span class="card-title">Category Mix (Forecast)</span></div>
        <canvas id="rpt-cat-pie" height="240"></canvas>
      </div>
    </div>

    <div class="chart-row chart-row-equal" style="margin-bottom:16px">
      <div class="chart-card">
        <div class="card-header"><span class="card-title">Cumulative Forecast vs Budget</span></div>
        <canvas id="rpt-cumulative" height="220"></canvas>
      </div>
      <div class="chart-card">
        <div class="card-header"><span class="card-title">Forecast by Entry Type ($)</span></div>
        <canvas id="rpt-type-pie" height="220"></canvas>
      </div>
    </div>

    ${showTeam && isAdmin ? `
    <div class="chart-card" style="margin-bottom:16px">
      <div class="card-header">
        <span class="card-title">BDM Comparison — Forecast Value</span>
        ${isAdmin ? '<span style="font-size:11px;color:var(--text3)">Admin only</span>' : ''}
      </div>
      <canvas id="rpt-bdm-compare" height="200"></canvas>
    </div>` : ''}

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div class="card">
        <div class="card-header"><span class="card-title">Top Accounts by Value</span></div>
        <div id="rpt-top-accounts"></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Monthly Summary Table</span></div>
        <div class="table-wrap" style="border-radius:var(--radius-sm)">
          <table class="data-table">
            <thead><tr><th>Month</th><th class="num">Forecast Kgs</th><th class="num">Forecast $</th><th class="num">Budget $</th><th class="num">vs Budget</th></tr></thead>
            <tbody>${months.map(m => {
              const fs = monthSummary(fEntries, m.key);
              const bs = monthSummary(bEntries, m.key);
              const p = vsPercent(fs.value, bs.value);
              return `<tr><td class="mono">${m.label}</td><td class="num">${fmtNum(fs.kgs)}</td><td class="num">${fmtMoney(fs.value)}</td><td class="num">${fmtMoney(bs.value)}</td><td class="num"><span class="vs-chip ${p==null?'neutral':p>=0?'above':'below'}">${p!=null?(p>=0?'+':'')+fmtPct(p):'—'}</span></td></tr>`;
            }).join('')}</tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  // Draw charts
  const fVal = months.map(m => fEntries.reduce((s,e)=>s+((e.monthly?.[m.key]||0)*(e.price||0)),0));
  const bVal = months.map(m => bEntries.reduce((s,e)=>s+((e.monthly?.[m.key]||0)*(e.price||0)),0));
  const labels = months.map(m => m.short);

  destroyChart('rptVsBar');
  APP.charts.rptVsBar = new Chart(document.getElementById('rpt-vs-bar').getContext('2d'), {
    type:'bar', data:{ labels, datasets:[
      {label:'Forecast',data:fVal,backgroundColor:'rgba(74,160,44,0.8)',borderRadius:4},
      {label:'Budget',data:bVal,backgroundColor:'rgba(245,130,32,0.5)',borderRadius:4}
    ]}, options: chartOpts({yCallback: v=>fmtMoney(v,true)})
  });

  // Category pie
  const catMap = {}; fEntries.forEach(e => { const c=e.category||'Other'; catMap[c]=(catMap[c]||0)+calcEntryTotals(e,months).totalValue; });
  destroyChart('rptCatPie');
  APP.charts.rptCatPie = new Chart(document.getElementById('rpt-cat-pie').getContext('2d'), {
    type:'doughnut', data:{ labels:Object.keys(catMap), datasets:[{data:Object.values(catMap),backgroundColor:['#4AA02C','#F58220','#3B5998','#FFC20E','#707070'],borderColor:'var(--bg2)',borderWidth:3}]},
    options:{ responsive:true, cutout:'55%', plugins:{ legend:{ position:'bottom', labels:{color:'#6B8A78',font:{family:'Plus Jakarta Sans',size:11}}}}}
  });

  // Cumulative
  let cumF=0, cumB=0;
  const cumFData=[]; const cumBData=[];
  months.forEach(m => { cumF+=fEntries.reduce((s,e)=>s+((e.monthly?.[m.key]||0)*(e.price||0)),0); cumB+=bEntries.reduce((s,e)=>s+((e.monthly?.[m.key]||0)*(e.price||0)),0); cumFData.push(cumF); cumBData.push(cumB); });
  destroyChart('rptCumulative');
  APP.charts.rptCumulative = new Chart(document.getElementById('rpt-cumulative').getContext('2d'), {
    type:'line', data:{ labels, datasets:[
      {label:'Forecast',data:cumFData,borderColor:'#4AA02C',backgroundColor:'rgba(74,160,44,0.08)',fill:true,tension:0.4,pointRadius:3},
      {label:'Budget',data:cumBData,borderColor:'#F58220',backgroundColor:'rgba(245,130,32,0.05)',fill:true,tension:0.4,pointRadius:3,borderDash:[6,3]}
    ]}, options: chartOpts({yCallback:v=>fmtMoney(v,true)})
  });

  // Type pie
  const typeMap = {}; fEntries.forEach(e=>{ const t=e.type||'Unspecified'; typeMap[t]=(typeMap[t]||0)+calcEntryTotals(e,months).totalValue; });
  destroyChart('rptTypePie');
  APP.charts.rptTypePie = new Chart(document.getElementById('rpt-type-pie').getContext('2d'), {
    type:'doughnut', data:{labels:Object.keys(typeMap),datasets:[{data:Object.values(typeMap),backgroundColor:['#4AA02C','#F58220','#3B5998','#FFC20E'],borderColor:'var(--bg2)',borderWidth:3}]},
    options:{responsive:true,cutout:'55%',plugins:{legend:{position:'bottom',labels:{color:'#6B8A78',font:{family:'Plus Jakarta Sans',size:11}}}}}
  });

  // BDM comparison (admin)
  if (isAdmin && document.getElementById('rpt-bdm-compare')) {
    const bdms = DB.Users.bdms();
    const bdmLabels = bdms.map(u => u.name.split(' ')[0]);
    const bdmFData = bdms.map(u => { const e=DB.Forecast.allByUser(u.id); const m2=getMonths(u.id); return e.reduce((s,en)=>s+calcEntryTotals(en,m2).totalValue,0); });
    const bdmBData = bdms.map(u => { const e=DB.Budget.allByUser(u.id); const m2=getMonths(u.id); return e.reduce((s,en)=>s+calcEntryTotals(en,m2).totalValue,0); });
    destroyChart('rptBDMCompare');
    APP.charts.rptBDMCompare = new Chart(document.getElementById('rpt-bdm-compare').getContext('2d'), {
      type:'bar', data:{labels:bdmLabels,datasets:[
        {label:'Forecast',data:bdmFData,backgroundColor:'rgba(74,160,44,0.8)',borderRadius:4},
        {label:'Budget',data:bdmBData,backgroundColor:'rgba(245,130,32,0.5)',borderRadius:4}
      ]}, options: chartOpts({yCallback:v=>fmtMoney(v,true)})
    });
  }

  drawTopAccounts(fEntries, months);
  const el = document.getElementById('rpt-top-accounts'); if(el) el.id='top-accounts'; // reuse
  if (document.getElementById('rpt-top-accounts')) drawTopAccounts(fEntries, months);
}

// ── ENTRY MODAL ───────────────────────────────────────────────────────────
function openEntryModal(id, mode, defaultMonthKey) {
  const uid = getEffectiveUserId();
  const months = getMonths(uid);
  document.getElementById('em-mode').value = mode;
  document.getElementById('entry-modal-title').textContent = id ? `Edit ${mode === 'budget' ? 'Budget' : 'Forecast'} Entry` : `New ${mode === 'budget' ? 'Budget' : 'Forecast'} Entry`;
  document.getElementById('em-monthly-title').textContent = `Monthly ${mode === 'budget' ? 'Budget' : 'Forecast'} (kg) — ${months[0]?.full} to ${months[months.length-1]?.full}`;

  // Populate datalists
  const allEntries = [...DB.Forecast.allByUser(uid), ...DB.Budget.allByUser(uid)];
  document.getElementById('em-account-list').innerHTML = [...new Set(allEntries.map(e=>e.account).filter(Boolean))].sort().map(a=>`<option value="${escH(a)}">`).join('');
  document.getElementById('em-product-list').innerHTML = [...new Set(allEntries.map(e=>e.product).filter(Boolean))].sort().map(p=>`<option value="${escH(p)}">`).join('');
  document.getElementById('em-bdm-list').innerHTML = DB.Users.bdms().map(u=>`<option value="${escH(u.name)}">`).join('');

  // Show/hide type field (budget doesn't need it)
  document.getElementById('em-type-group').style.display = mode === 'budget' ? 'none' : '';

  // Build monthly inputs
  const grid = document.getElementById('em-monthly-inputs');
  grid.innerHTML = months.map(m => `
    <div class="form-group month-input-group">
      <label class="form-label">${m.label}</label>
      <input class="form-input" type="number" id="emi-${m.key}" placeholder="0" min="0" oninput="recalcEntryModal()"/>
    </div>
  `).join('');

  if (id) {
    const store = mode === 'budget' ? DB.Budget : DB.Forecast;
    const entry = store.allByUser(uid).find(e => e.id === id);
    if (entry) {
      document.getElementById('em-id').value = entry.id;
      document.getElementById('em-bdm').value = entry.bdm || '';
      document.getElementById('em-account').value = entry.account || '';
      document.getElementById('em-status').value = entry.status || 'Potential Client';
      document.getElementById('em-product').value = entry.product || '';
      document.getElementById('em-code').value = entry.code || '';
      document.getElementById('em-family').value = entry.family || '';
      document.getElementById('em-category').value = entry.category || '';
      document.getElementById('em-type').value = entry.type || '';
      document.getElementById('em-price').value = entry.price || '';
      document.getElementById('em-projection').value = entry.projection || '';
      months.forEach(m => { const inp = document.getElementById(`emi-${m.key}`); if(inp) inp.value = entry.monthly?.[m.key] || ''; });
    }
  } else {
    document.getElementById('em-id').value = '';
    ['em-bdm','em-account','em-product','em-code','em-family','em-price','em-projection'].forEach(f => { const el=document.getElementById(f); if(el) el.value=''; });
    document.getElementById('em-status').value = 'Potential Client';
    document.getElementById('em-category').value = '';
    document.getElementById('em-type').value = '';
    // Pre-fill current user's name as BDM
    if (APP.session.role === 'bdm') document.getElementById('em-bdm').value = APP.session.name;
    if (defaultMonthKey) { const inp=document.getElementById(`emi-${defaultMonthKey}`); if(inp) { inp.focus(); inp.select(); } }
  }

  recalcEntryModal();
  openModal('entry-modal-overlay');
}

function recalcEntryModal() {
  const uid = getEffectiveUserId();
  const months = getMonths(uid);
  let total = 0, q12 = 0, q34 = 0;
  months.forEach((m, i) => { const v = parseFloat(document.getElementById(`emi-${m.key}`)?.value)||0; total += v; if(i<6) q12+=v; else q34+=v; });
  const price = parseFloat(document.getElementById('em-price')?.value)||0;
  document.getElementById('em-total-kgs').textContent = fmtNum(total);
  document.getElementById('em-total-value').textContent = fmtMoney(total * price);
  document.getElementById('em-q12').textContent = fmtNum(q12);
  document.getElementById('em-q34').textContent = fmtNum(q34);
}

function saveEntry() {
  const mode = document.getElementById('em-mode').value;
  const bdm = document.getElementById('em-bdm').value.trim();
  const account = document.getElementById('em-account').value.trim();
  const product = document.getElementById('em-product').value.trim();
  if (!account || !product) { showToast('Account and Product are required.', 'error'); return; }

  const uid = getEffectiveUserId();
  const months = getMonths(uid);
  const monthly = {};
  months.forEach(m => { monthly[m.key] = parseFloat(document.getElementById(`emi-${m.key}`)?.value)||0; });
  const price = parseFloat(document.getElementById('em-price').value)||0;
  const { totalKgs, totalValue, q1q2, q3q4 } = calcEntryTotals({ monthly, price }, months);

  const existingId = document.getElementById('em-id').value;
  const entry = {
    id: existingId || uid_fn(),
    bdm, account,
    status: document.getElementById('em-status').value,
    product,
    code: document.getElementById('em-code').value.trim(),
    family: document.getElementById('em-family').value.trim(),
    category: document.getElementById('em-category').value,
    type: mode === 'budget' ? '' : document.getElementById('em-type').value,
    price, projection: parseFloat(document.getElementById('em-projection').value)||0,
    monthly, totalKgs, totalValue, q12kgs: q1q2, q34kgs: q3q4,
    updatedAt: Date.now(),
    createdAt: existingId ? undefined : Date.now(),
  };
  if (!entry.createdAt) delete entry.createdAt;

  const store = mode === 'budget' ? DB.Budget : DB.Forecast;
  if (existingId) { const existing = store.allByUser(uid).find(e=>e.id===existingId); if(existing) entry.createdAt=existing.createdAt; }
  store.saveEntry(uid, entry);
  showToast(existingId ? 'Entry updated.' : 'Entry added.', 'success');
  closeModal('entry-modal-overlay');
  refreshCurrentView();
}

function uid_fn() { return 'e_' + Date.now() + '_' + Math.random().toString(36).slice(2,7); }

// ── DELETE ────────────────────────────────────────────────────────────────
function deleteEntry(id, mode) {
  const uid = getEffectiveUserId();
  const store = mode === 'budget' ? DB.Budget : DB.Forecast;
  const entry = store.allByUser(uid).find(e=>e.id===id);
  document.getElementById('confirm-msg').textContent = `Delete "${entry?.product}" for "${entry?.account}"? This cannot be undone.`;
  APP.deleteCallback = () => { store.deleteEntry(uid, id); showToast('Entry deleted.','success'); refreshCurrentView(); };
  openModal('confirm-modal-overlay');
}

function executeDelete() { if(APP.deleteCallback) APP.deleteCallback(); closeModal('confirm-modal-overlay'); APP.deleteCallback=null; }

// ── USERS (Admin) ─────────────────────────────────────────────────────────
function renderUsers() {
  if (APP.session.role !== 'admin') return;
  const users = DB.Users.list().filter(u => u.id !== APP.session.userId);

  document.getElementById('view-area').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
      <div style="font-size:13px;color:var(--text3)">${users.length} user${users.length!==1?'s':''} registered</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn btn-secondary btn-sm" onclick="openModal('reassign-modal-overlay');loadReassignBDMs()">
          <svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
          Reassign Clients
        </button>
        <button class="btn btn-secondary btn-sm" onclick="openModal('fiscal-modal-overlay')">
          <svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Set Fiscal Period (All)
        </button>
        <button class="btn btn-primary btn-sm" onclick="openUserModal(null)">
          <svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          New User
        </button>
      </div>
    </div>

    <div class="user-list" id="user-list-container">
      ${users.map(u => renderUserRow(u)).join('')}
      ${!users.length ? '<div class="empty-state"><div class="empty-state-icon">👥</div><div class="empty-state-title">No users yet</div><div class="empty-state-text">Create your first BDM user.</div></div>' : ''}
    </div>
  `;
}

function renderUserRow(u) {
  const fCount = DB.Forecast.allByUser(u.id).length;
  const bCount = DB.Budget.allByUser(u.id).length;
  return `
    <div class="user-row">
      <div class="user-avatar">${u.name.slice(0,2).toUpperCase()}</div>
      <div class="user-info">
        <div class="user-name">${escH(u.name)} ${!u.active?'<span style="font-size:11px;color:var(--danger);font-weight:600">(Inactive)</span>':''}</div>
        <div class="user-meta">@${escH(u.username)} · ${escH(u.role)} · ${escH(u.email||'—')} · ${fCount} forecast entries · ${bCount} budget entries</div>
        <div class="user-meta" style="margin-top:3px">Fiscal: ${u.fiscalStart||'—'} → ${u.fiscalEnd||'—'}</div>
      </div>
      <div class="user-actions">
        <button class="btn btn-secondary btn-xs" onclick="viewUserData('${u.id}')">View Data</button>
        <button class="btn btn-secondary btn-xs" onclick="openUserModal('${u.id}')">Edit</button>
        <button class="btn btn-danger btn-xs" onclick="confirmDeleteUser('${u.id}')">Delete</button>
      </div>
    </div>
  `;
}

function viewUserData(userId) {
  APP.viewingUserId = userId;
  document.getElementById('admin-bdm-filter').value = userId;
  loadView('dashboard');
}

function openUserModal(id) {
  document.getElementById('um-id').value = id || '';
  document.getElementById('user-modal-title').textContent = id ? 'Edit User' : 'New User';
  if (id) {
    const u = DB.Users.get(id);
    if (!u) return;
    document.getElementById('um-name').value = u.name || '';
    document.getElementById('um-username').value = u.username || '';
    document.getElementById('um-email').value = u.email || '';
    document.getElementById('um-password').value = u.password || '';
    document.getElementById('um-role').value = u.role || 'bdm';
    document.getElementById('um-active').value = String(u.active !== false);
    document.getElementById('um-fiscal-start').value = u.fiscalStart || '2026-04-01';
    document.getElementById('um-fiscal-end').value = u.fiscalEnd || '2027-03-31';
    document.getElementById('um-allow-upload').checked = u.settings?.allowBudgetUpload || false;
    document.getElementById('um-show-team').checked = u.settings?.showTeamComparison || false;
  } else {
    ['um-name','um-username','um-email','um-password'].forEach(f => document.getElementById(f).value='');
    document.getElementById('um-role').value='bdm';
    document.getElementById('um-active').value='true';
    document.getElementById('um-fiscal-start').value='2026-04-01';
    document.getElementById('um-fiscal-end').value='2027-03-31';
    document.getElementById('um-allow-upload').checked=false;
    document.getElementById('um-show-team').checked=false;
  }
  openModal('user-modal-overlay');
}

function saveUser() {
  const name = document.getElementById('um-name').value.trim();
  const username = document.getElementById('um-username').value.trim();
  const password = document.getElementById('um-password').value.trim();
  if (!name || !username || !password) { showToast('Name, username and password required.','error'); return; }

  const existingId = document.getElementById('um-id').value;
  const id = existingId || 'user_' + Date.now();
  const user = {
    id, name, username, password,
    email: document.getElementById('um-email').value.trim(),
    role: document.getElementById('um-role').value,
    active: document.getElementById('um-active').value === 'true',
    fiscalStart: document.getElementById('um-fiscal-start').value,
    fiscalEnd: document.getElementById('um-fiscal-end').value,
    settings: {
      allowBudgetUpload: document.getElementById('um-allow-upload').checked,
      showTeamComparison: document.getElementById('um-show-team').checked,
    },
    createdAt: existingId ? DB.Users.get(existingId)?.createdAt || Date.now() : Date.now(),
  };
  DB.Users.save(user);
  showToast(existingId ? 'User updated.' : 'User created.','success');
  closeModal('user-modal-overlay');
  setupAdminBDMFilter();
  renderUsers();
}

function confirmDeleteUser(id) {
  const u = DB.Users.get(id);
  document.getElementById('confirm-msg').textContent = `Delete user "${u?.name}"? All their data will be lost.`;
  APP.deleteCallback = () => { DB.Users.delete(id); showToast('User deleted.','success'); setupAdminBDMFilter(); renderUsers(); };
  openModal('confirm-modal-overlay');
}

function applyBulkFiscal() {
  const start = document.getElementById('fp-start').value;
  const end = document.getElementById('fp-end').value;
  if (!start || !end) { showToast('Both dates required.','error'); return; }
  DB.Users.bdms().forEach(u => { u.fiscalStart=start; u.fiscalEnd=end; DB.Users.save(u); });
  showToast('Fiscal period updated for all BDMs.','success');
  closeModal('fiscal-modal-overlay');
}

// ── REASSIGN CLIENTS ──────────────────────────────────────────────────────
function loadReassignBDMs() {
  const bdms = DB.Users.bdms();
  ['ra-from','ra-to'].forEach(id => {
    document.getElementById(id).innerHTML = bdms.map(u=>`<option value="${u.id}">${escH(u.name)}</option>`).join('');
  });
  loadReassignAccounts();
}

function loadReassignAccounts() {
  const fromId = document.getElementById('ra-from').value;
  const entries = DB.Forecast.allByUser(fromId);
  const accounts = [...new Set(entries.map(e=>e.account).filter(Boolean))].sort();
  const el = document.getElementById('ra-accounts');
  el.innerHTML = accounts.map(a => `
    <label style="display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid var(--border2);border-radius:var(--radius-sm);cursor:pointer;background:var(--bg3)">
      <input type="checkbox" value="${escH(a)}" style="width:16px;height:16px;accent-color:var(--accent)"/>
      <span style="font-size:13px">${escH(a)}</span>
      <span style="font-size:11px;color:var(--text3);margin-left:auto">${entries.filter(e=>e.account===a).length} entries</span>
    </label>
  `).join('');
  if (!accounts.length) el.innerHTML = '<div class="empty-state" style="padding:20px"><div class="empty-state-text">No accounts found for this BDM.</div></div>';
}

function executeReassign() {
  const fromId = document.getElementById('ra-from').value;
  const toId = document.getElementById('ra-to').value;
  if (fromId === toId) { showToast('Select different BDMs.','error'); return; }
  const checked = [...document.querySelectorAll('#ra-accounts input:checked')].map(el=>el.value);
  if (!checked.length) { showToast('Select at least one account.','error'); return; }

  const toUser = DB.Users.get(toId);
  let moved = 0;

  ['forecast','budget'].forEach(mode => {
    const store = mode === 'forecast' ? DB.Forecast : DB.Budget;
    const fromEntries = store.allByUser(fromId);
    const toEntries = [...store.allByUser(toId)];
    const remaining = [];

    fromEntries.forEach(e => {
      if (checked.includes(e.account)) { e.bdm = toUser.name; toEntries.push(e); moved++; }
      else remaining.push(e);
    });

    store.setUserEntries(fromId, remaining);
    store.setUserEntries(toId, toEntries);
  });

  showToast(`Moved ${moved} entries to ${toUser.name}.`,'success');
  closeModal('reassign-modal-overlay');
  refreshCurrentView();
}

// ── SETTINGS ──────────────────────────────────────────────────────────────
function renderSettings() {
  document.getElementById('view-area').innerHTML = `
    <div style="max-width:640px">
      <div class="card" style="margin-bottom:16px">
        <div class="card-header"><span class="card-title">Application Theme</span></div>
        <div class="toggle-wrap">
          <label class="toggle"><input type="checkbox" id="theme-check" onchange="toggleTheme();updateThemeToggle();this.checked=getTheme()==='dark'" ${getTheme()==='dark'?'checked':''}/><span class="toggle-slider"></span></label>
          <span class="toggle-label">Dark Mode</span>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px">
        <div class="card-header"><span class="card-title">Export Data</span></div>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn btn-secondary" onclick="exportAll('forecast')">
            <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export All Forecast CSV
          </button>
          <button class="btn btn-secondary" onclick="exportAll('budget')">Export All Budget CSV</button>
        </div>
      </div>

      ${APP.session.role === 'admin' ? `
      <div class="card">
        <div class="card-header"><span class="card-title">Danger Zone</span></div>
        <p style="font-size:13px;color:var(--text3);margin-bottom:14px">Reset all application data. This cannot be undone.</p>
        <button class="btn btn-danger btn-sm" onclick="resetApp()">Reset All Data</button>
      </div>` : ''}
    </div>
  `;
}

function resetApp() {
  if (!confirm('RESET ALL DATA? This will delete everything including users and entries. Are you sure?')) return;
  localStorage.removeItem('ofd2_seeded'); localStorage.removeItem('ofd2_users'); localStorage.removeItem('ofd2_forecast_entries'); localStorage.removeItem('ofd2_budget_entries'); localStorage.removeItem('ofd2_session');
  window.location.href = 'index.html';
}

// ── PROFILE ───────────────────────────────────────────────────────────────
function renderProfile() {
  const u = APP.currentUser;
  document.getElementById('view-area').innerHTML = `
    <div style="max-width:520px">
      <div class="card" style="margin-bottom:16px">
        <div class="card-header">
          <div style="display:flex;align-items:center;gap:14px">
            <div class="user-avatar" style="width:52px;height:52px;font-size:18px;border-radius:12px">${u.name.slice(0,2).toUpperCase()}</div>
            <div>
              <div style="font-size:17px;font-weight:800">${escH(u.name)}</div>
              <div style="font-size:13px;color:var(--text3)">@${escH(u.username)} · ${escH(u.role)}</div>
            </div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;font-size:13px">
          <div><span style="color:var(--text3)">Email:</span> ${escH(u.email||'—')}</div>
          <div><span style="color:var(--text3)">Status:</span> ${u.active?'Active':'Inactive'}</div>
          <div><span style="color:var(--text3)">Fiscal Start:</span> ${escH(u.fiscalStart||'—')}</div>
          <div><span style="color:var(--text3)">Fiscal End:</span> ${escH(u.fiscalEnd||'—')}</div>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><span class="card-title">Change Password</span></div>
        <button class="btn btn-secondary" onclick="openModal('pw-modal-overlay')">
          <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Change Password
        </button>
      </div>
    </div>
  `;
}

function savePassword() {
  const cur = document.getElementById('pw-current').value;
  const nw = document.getElementById('pw-new').value;
  const conf = document.getElementById('pw-confirm').value;
  const u = APP.currentUser;
  if (u.password !== cur) { showToast('Current password incorrect.','error'); return; }
  if (!nw || nw.length < 4) { showToast('New password must be at least 4 characters.','error'); return; }
  if (nw !== conf) { showToast('Passwords do not match.','error'); return; }
  u.password = nw; DB.Users.save(u);
  showToast('Password updated.','success');
  closeModal('pw-modal-overlay');
}

// ── IMPORT ────────────────────────────────────────────────────────────────
function openImportModal(mode) {
  APP.importMode = mode;
  APP.importedData = null;
  document.getElementById('import-preview').style.display='none';
  document.getElementById('import-confirm-btn').style.display='none';
  document.getElementById('import-file-input').value='';
  openModal('import-modal-overlay');
  // Drag & drop
  const dz = document.getElementById('import-drop-zone');
  dz.ondragover = e => { e.preventDefault(); dz.classList.add('drag-over'); };
  dz.ondragleave = () => dz.classList.remove('drag-over');
  dz.ondrop = e => { e.preventDefault(); dz.classList.remove('drag-over'); const f=e.dataTransfer.files[0]; if(f) processImportFile(f); };
}

function handleImportFile(ev) { const f=ev.target.files[0]; if(f) processImportFile(f); }

function processImportFile(file) {
  const ext = file.name.split('.').pop().toLowerCase();
  const uid = getEffectiveUserId();
  const months = getMonths(uid);

  if (ext === 'json') {
    const reader = new FileReader();
    reader.onload = e => { try { APP.importedData = JSON.parse(e.target.result); showImportPreview(APP.importedData, months); } catch { showToast('Invalid JSON file.','error'); } };
    reader.readAsText(file);
  } else if (ext === 'csv') {
    const reader = new FileReader();
    reader.onload = e => { const rows = parseCSV(e.target.result); APP.importedData = parseImportedRows(rows, months); showImportPreview(APP.importedData, months); };
    reader.readAsText(file);
  } else if (ext === 'xlsx') {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const wb = XLSX.read(e.target.result, {type:'array'});
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, {header:1,defval:''});
        APP.importedData = parseImportedRows(rows, months);
        showImportPreview(APP.importedData, months);
      } catch { showToast('Could not read Excel file.','error'); }
    };
    reader.readAsArrayBuffer(file);
  }
}

function parseCSV(text) {
  return text.split('\n').map(line => line.split(',').map(c => c.replace(/^"|"$/g,'').trim()));
}

function showImportPreview(entries, months) {
  const preview = document.getElementById('import-preview');
  const content = document.getElementById('import-preview-content');
  preview.style.display = 'block';
  if (!entries || !entries.length) { content.innerHTML='<p style="color:var(--danger)">No valid entries found.</p>'; return; }
  content.innerHTML = `
    <p style="font-size:13px;color:var(--text2);margin-bottom:10px">${entries.length} entries ready to import.</p>
    <div class="table-wrap" style="max-height:200px;overflow-y:auto">
      <table class="data-table">
        <thead><tr><th>Account</th><th>Product</th><th>Price</th><th>Total Kgs</th></tr></thead>
        <tbody>${entries.slice(0,10).map(e=>`<tr><td>${escH(e.account)}</td><td>${escH(e.product)}</td><td>$${fmtNum(e.price,2)}</td><td>${fmtNum(Object.values(e.monthly||{}).reduce((s,v)=>s+v,0))}</td></tr>`).join('')}${entries.length>10?`<tr><td colspan="4" style="text-align:center;color:var(--text3)">... and ${entries.length-10} more</td></tr>`:''}</tbody>
      </table>
    </div>`;
  document.getElementById('import-confirm-btn').style.display='inline-flex';
}

function confirmImport() {
  if (!APP.importedData?.length) return;
  const uid = getEffectiveUserId();
  const months = getMonths(uid);
  const store = APP.importMode === 'budget' ? DB.Budget : DB.Forecast;
  const entries = APP.importedData.map(e => {
    const tots = calcEntryTotals(e, months);
    return { ...e, id: e.id||uid_fn(), totalKgs: tots.totalKgs, totalValue: tots.totalValue, q12kgs: tots.q1q2, q34kgs: tots.q3q4, updatedAt: Date.now(), createdAt: Date.now() };
  });
  // Append (don't replace)
  const existing = store.allByUser(uid);
  store.setUserEntries(uid, [...existing, ...entries]);
  showToast(`Imported ${entries.length} entries.`,'success');
  closeModal('import-modal-overlay');
  refreshCurrentView();
}

function addMonthManual(mode) {
  const uid = getEffectiveUserId();
  const u = DB.Users.get(uid);
  if (!u) return;
  const months = getMonths(uid);
  const last = months[months.length-1];
  const nextDate = new Date(last.year, last.month + 1, 1);
  const newEnd = `${nextDate.getFullYear()}-${String(nextDate.getMonth()+1).padStart(2,'0')}-01`;
  u.fiscalEnd = newEnd; DB.Users.save(u);
  showToast(`Added ${new Date(newEnd).toLocaleString('default',{month:'long',year:'numeric'})} to fiscal period.`,'success');
  renderCarouselView(mode);
}

// ── EXPORT ────────────────────────────────────────────────────────────────
function exportView(mode) {
  const uid = getEffectiveUserId();
  const months = getMonths(uid);
  const entries = getEntries(mode, uid);
  const headers = ['BDM','Account','Status','Product','Code','Family','Category','Type','Price','Projection','Total Kgs','Total Value',...months.map(m=>m.label+' Kgs'),...months.map(m=>m.label+' Value')];
  const rows = [headers, ...entries.map(e => [e.bdm,e.account,e.status,e.product,e.code,e.family,e.category,e.type,e.price,e.projection,e.totalKgs,e.totalValue,...months.map(m=>e.monthly?.[m.key]||0),...months.map(m=>(e.monthly?.[m.key]||0)*(e.price||0))])];
  downloadCSV(rows, `OFD_${mode}_${new Date().toISOString().slice(0,10)}.csv`);
}

function exportReportCSV(scope) {
  if (scope === 'all') {
    const bdms = DB.Users.bdms();
    let allRows = [['BDM','Account','Product','Code','Category','Type','Price','Total Kgs','Total Value']];
    bdms.forEach(u => {
      const m = getMonths(u.id);
      DB.Forecast.allByUser(u.id).forEach(e => {
        const t = calcEntryTotals(e,m);
        allRows.push([u.name,e.account,e.product,e.code,e.category,e.type,e.price,t.totalKgs,t.totalValue]);
      });
    });
    downloadCSV(allRows,'OFD_AllBDMs_'+new Date().toISOString().slice(0,10)+'.csv');
  } else exportView('forecast');
}

function exportAll(mode) { exportView(mode); }

// ── MODAL HELPERS ─────────────────────────────────────────────────────────
function closeModalOnBg(e, id) { if(e.target.classList.contains('modal-overlay')) closeModal(id); }
