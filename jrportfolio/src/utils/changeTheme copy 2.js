const setTheme = (mode) => {
  // Use requestAnimationFrame to prevent layout thrashing
  requestAnimationFrame(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(mode)
    localStorage.setItem('theme', mode)
  })
}

export const toggleTheme = () => {
  const current = document.documentElement.classList.contains('light')
    ? 'light'
    : 'dark'
  const next = current === 'light' ? 'dark' : 'light'

  // Use requestAnimationFrame to prevent layout shifts
  requestAnimationFrame(() => {
    setTheme(next)
    updateThemeIcon(next)
  })
}

export const initTheme = () => {
  const storedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const mode = storedTheme || (prefersDark ? 'dark' : 'light')

  // Apply theme immediately without requestAnimationFrame for initial load
  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(mode)
  localStorage.setItem('theme', mode)
  updateThemeIcon(mode)

  const themeBtn = document.getElementById('themeBtn')
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme)
  }
}

function updateThemeIcon(mode) {
  const themeBtn = document.getElementById('themeBtn')
  if (!themeBtn) return

  themeBtn.innerHTML =
    mode === 'light'
      ? '🌚' // Moon icon for switching to dark
      : '☀️' // Sun icon for switching to light
}
