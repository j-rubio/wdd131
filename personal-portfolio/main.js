// import { BASE_PATH } from './src/utils/constants.js'
import { loadStyle } from './src/utils/loadStyle.js'
import { Header } from './src/components/Header/Header.js'
import { Footer } from './src/components/Footer/Footer.js'
import { changeTheme } from './src/utils/changeTheme.js'

import { Home } from './src/pages/Home/Home.js'
import { TechStack } from './src/pages/TechStack/TechStack.js'
import { Projects } from './src/pages/Projects/Projects.js'

loadStyle('./main.css')
loadStyle('./src/components/Header/Header.css')
loadStyle('./src/components/Footer/Footer.css')
loadStyle('./src/components/Avatar/Avatar.css')
loadStyle('./src/pages/Home/Home.css')
loadStyle('./src/pages/TechStack/TechStack.css')
loadStyle('./src/pages/Projects/Projects.css')
loadStyle('./src/components/ProjectCard/ProjectCard.css')
loadStyle('./src/components/SocialMediaIcon/SocialMediaIcon.css')
loadStyle('./src/components/TechIcon/TechIcon.css')

document.querySelector('header').innerHTML = Header()
document.querySelector('footer').innerHTML = Footer()

changeTheme()
Home()

// Routing
const routes = {
  home: Home,
  tech: TechStack,
  projects: Projects
}

document.addEventListener('click', (e) => {
  const link = e.target.closest('a[data-link]')
  if (!link) return

  const routeFn = routes[link.dataset.link]
  if (routeFn) {
    e.preventDefault()
    routeFn()

    // Close sidebar and unlock scroll
    const checkbox = document.getElementById('hamburgerToggle')
    if (checkbox && checkbox.checked) {
      checkbox.checked = false
      document.body.classList.remove('no-scroll')
    }
  }
})

// Lock scroll when sidebar is open
document.addEventListener('change', (e) => {
  if (e.target.id === 'hamburgerToggle') {
    document.body.classList.toggle('no-scroll', e.target.checked)
  }
})
