// Importing styles
import { loadStyle } from './src/utils/loadStyle.js'

// Importing components
import { Header } from './src/components/Header/Header.js'
import { Footer } from './src/components/Footer/Footer.js'
import { changeTheme } from './src/utils/changeTheme.js'
import { initHeaderBehavior } from './src/utils/initHeaderBehavior.js'
// import { HambMenu } from './src/components/HambMenu/HambMenu.js'

// Importing pages
import { Home } from './src/pages/Home/Home.js'
import { TechStack } from './src/pages/TechStack/TechStack.js'
import { Projects } from './src/pages/Projects/Projects.js'

// Loading styles
loadStyle('./style.css')
loadStyle('./src/components/Header/Header.css')
loadStyle('./src/components/Footer/Footer.css')
loadStyle('./src/components/Avatar/Avatar.css')
loadStyle('./src/pages/Home/Home.css')
loadStyle('./src/pages/TechStack/TechStack.css')
loadStyle('./src/pages/Projects/Projects.css')
// loadStyle('./src/components/HambMenu/HambMenu.css')
loadStyle('./src/components/SocialMediaIcon/SocialMediaIcon.css')

// Injecting layout
// document.querySelector('header').innerHTML = HambMenu() + Header()
document.querySelector('header').innerHTML = Header()

initHeaderBehavior()
document.querySelector('footer').innerHTML = Footer()

// Theme toggle
changeTheme()

// Initial page
Home()

// Routing logic to the DOM links
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

    // Closing the sidebar if open
    const checkbox = document.getElementById('hamburgerToggle')
    if (checkbox) checkbox.checked = false
  }
})
