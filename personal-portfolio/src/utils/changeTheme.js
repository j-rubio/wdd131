export const changeTheme = () => {
  const themeBtn = document.querySelector('#themeBtn')
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light')
    changeThemeText()
  })
}

const changeThemeText = () => {
  const themeBtn = document.querySelector('#themeBtn')
  if (themeBtn.innerText === '🌑 Dark Mode') {
    themeBtn.innerText = '☀️ Light Mode'
  } else {
    themeBtn.innerText = '🌑 Dark Mode'
  }
}
