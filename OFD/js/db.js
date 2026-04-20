/**
 * OFD Sales Forecast - Core Database Layer
 * Uses localStorage as the persistence layer.
 * In production, replace DB.* calls with fetch() to your backend API.
 */

const DB = (() => {
  const PREFIX = 'ofd2_'
  const get = (k) => {
    try {
      return JSON.parse(localStorage.getItem(PREFIX + k))
    } catch {
      return null
    }
  }
  const set = (k, v) => localStorage.setItem(PREFIX + k, JSON.stringify(v))
  const del = (k) => localStorage.removeItem(PREFIX + k)

  // ── Seed initial data on first load ──────────────────────────────────────
  function seed() {
    if (get('seeded')) return

    const adminId = 'user_admin'
    const users = {
      [adminId]: {
        id: adminId,
        username: 'admin',
        password: 'admin123',
        name: 'Administrator',
        role: 'admin',
        email: 'admin@ofd.com',
        createdAt: Date.now(),
        active: true,
        fiscalStart: '2026-04-01',
        fiscalEnd: '2027-03-31',
        settings: { allowBudgetUpload: true, showTeamComparison: true }
      }
    }

    // Demo BDM users
    const bdms = [
      {
        id: 'user_bdm1',
        username: 'bdm1',
        password: 'pass123',
        name: 'Bdm 1',
        email: 'bdm1@ofd.com'
      },
      {
        id: 'user_bdm2',
        username: 'bdm2',
        password: 'pass123',
        name: 'Bdm 2',
        email: 'bdm2@ofd.com'
      }
    ]
    bdms.forEach((b) => {
      users[b.id] = {
        ...b,
        role: 'bdm',
        createdAt: Date.now(),
        active: true,
        fiscalStart: '2026-04-01',
        fiscalEnd: '2027-03-31',
        settings: { allowBudgetUpload: false, showTeamComparison: false }
      }
    })

    set('users', users)
    set('forecast_entries', {})
    set('budget_entries', {})
    set('clients', {})
    set('seeded', true)
  }

  // ── Users ────────────────────────────────────────────────────────────────
  const Users = {
    all: () => get('users') || {},
    get: (id) => (get('users') || {})[id] || null,
    getByUsername: (u) =>
      Object.values(get('users') || {}).find((x) => x.username === u) || null,
    save: (user) => {
      const all = get('users') || {}
      all[user.id] = user
      set('users', all)
    },
    delete: (id) => {
      const all = get('users') || {}
      delete all[id]
      set('users', all)
    },
    list: () => Object.values(get('users') || {}),
    bdms: () =>
      Object.values(get('users') || {}).filter((u) => u.role === 'bdm')
  }

  // ── Forecast Entries ──────────────────────────────────────────────────────
  const Forecast = {
    allByUser: (uid) => (get('forecast_entries') || {})[uid] || [],
    all: () => get('forecast_entries') || {},
    saveEntry: (uid, entry) => {
      const all = get('forecast_entries') || {}
      if (!all[uid]) all[uid] = []
      const idx = all[uid].findIndex((e) => e.id === entry.id)
      if (idx >= 0) all[uid][idx] = entry
      else all[uid].push(entry)
      set('forecast_entries', all)
    },
    deleteEntry: (uid, entryId) => {
      const all = get('forecast_entries') || {}
      if (all[uid]) all[uid] = all[uid].filter((e) => e.id !== entryId)
      set('forecast_entries', all)
    },
    setUserEntries: (uid, entries) => {
      const all = get('forecast_entries') || {}
      all[uid] = entries
      set('forecast_entries', all)
    }
  }

  // ── Budget Entries ────────────────────────────────────────────────────────
  const Budget = {
    allByUser: (uid) => (get('budget_entries') || {})[uid] || [],
    all: () => get('budget_entries') || {},
    saveEntry: (uid, entry) => {
      const all = get('budget_entries') || {}
      if (!all[uid]) all[uid] = []
      const idx = all[uid].findIndex((e) => e.id === entry.id)
      if (idx >= 0) all[uid][idx] = entry
      else all[uid].push(entry)
      set('budget_entries', all)
    },
    deleteEntry: (uid, entryId) => {
      const all = get('budget_entries') || {}
      if (all[uid]) all[uid] = all[uid].filter((e) => e.id !== entryId)
      set('budget_entries', all)
    },
    setUserEntries: (uid, entries) => {
      const all = get('budget_entries') || {}
      all[uid] = entries
      set('budget_entries', all)
    }
  }

  // ── Session ───────────────────────────────────────────────────────────────
  const Session = {
    get: () => get('session'),
    set: (user) =>
      set('session', {
        userId: user.id,
        role: user.role,
        name: user.name,
        username: user.username
      }),
    clear: () => del('session'),
    login: (username, password) => {
      const user = Users.getByUsername(username)
      if (!user || user.password !== password || !user.active) return null
      Session.set(user)
      return user
    }
  }

  return { seed, Users, Forecast, Budget, Session, get, set }
})()
