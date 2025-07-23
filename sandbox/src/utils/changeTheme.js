const setTheme = (mode) => {
  document.body.style.contain = 'layout style'

  requestAnimationFrame(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(mode)
    localStorage.setItem('theme', mode)

    setTimeout(() => {
      document.body.style.contain = ''
    }, 100)
  })
}

export const toggleTheme = () => {
  const current = document.documentElement.classList.contains('light')
    ? 'light'
    : 'dark'
  const next = current === 'light' ? 'dark' : 'light'

  requestAnimationFrame(() => {
    setTheme(next)
    updateThemeIcon(next)
  })
}

export const initTheme = () => {
  const storedTheme = localStorage.getItem('theme')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const mode = storedTheme || (prefersDark ? 'dark' : 'light')

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
