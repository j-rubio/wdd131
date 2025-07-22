const setTheme = (mode) => {
  document.body.classList.remove('light', 'dark')
  document.body.classList.add(mode)
  localStorage.setItem('theme', mode)
}

export const toggleTheme = () => {
  const current = document.body.classList.contains('light') ? 'light' : 'dark'
  const next = current === 'light' ? 'dark' : 'light'
  setTheme(next)
  updateThemeIcon(next)
}

// export const initTheme = () => {
//   const storedTheme = localStorage.getItem('theme')
//   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
//   const mode = storedTheme || (prefersDark ? 'dark' : 'light')
//   setTheme(mode)
//   updateThemeIcon(mode)

//   const themeBtn = document.getElementById('themeBtn')
//   if (themeBtn) {
//     themeBtn.addEventListener('click', toggleTheme)
//   }
// }
export const initTheme = () => {
  const storedTheme = localStorage.getItem('theme')
  // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  // const mode = storedTheme || (prefersDark ? 'dark' : 'light')
  const prefersLight = window.matchMedia(
    '(prefers-color-scheme: light)'
  ).matches
  const mode = storedTheme || (prefersLight ? 'light' : 'dark')
  setTheme(mode)
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
