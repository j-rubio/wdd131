const themeSelector = document.querySelector('select')
const footerLogo = document.getElementById('byui-logo_footer')

function changeTheme() {
  if (themeSelector.value == 'dark') {
    document.body.setAttribute('class', 'dark')
    footerLogo.setAttribute('src', './byui-logo_white.png')
  } else {
    document.body.removeAttribute('class')
    footerLogo.setAttribute('src', './byui-logo_blue.webp')
  }
}

themeSelector.addEventListener('change', changeTheme)
