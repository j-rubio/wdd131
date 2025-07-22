import { loadStyle } from './src/utils/loadStyle.js'
import { Header } from './src/components/Header/Header.js'
import { Footer } from './src/components/Footer/Footer.js'
import { Home } from './src/pages/Home/Home.js'
import { TechStack } from './src/pages/TechStack/TechStack.js'
import { Projects } from './src/pages/Projects/Projects.js'
import { initTheme } from './src/utils/changeTheme.js'

initTheme()
loadStyle('./main.css', { async: true })
loadStyle('./src/components/Header/Header.css', { async: true })
loadStyle('./src/components/Footer/Footer.css', { async: true })
loadStyle('./src/components/Avatar/Avatar.css', { async: true })
loadStyle('./src/pages/Home/Home.css', { async: true })
loadStyle('./src/pages/TechStack/TechStack.css', { async: true })
loadStyle('./src/pages/Projects/Projects.css', { async: true })
loadStyle('./src/components/SocialMediaIcon/SocialMediaIcon.css', {
  async: true
})

// Lazy load
requestIdleCallback(() => {
  loadStyle('./src/components/ProjectCard/ProjectCard.css')
  loadStyle('./src/components/TechIcon/TechIcon.css')
})

document.querySelector('header').innerHTML = Header()
document.querySelector('footer').innerHTML = Footer()

// initTheme()
Home()

const routes = {
  home: Home,
  tech: TechStack,
  projects: Projects
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('nav-toggle-btn')
  const sidebar = document.getElementById('sidebar')

  if (btn && sidebar) {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true'
      btn.setAttribute('aria-expanded', !isOpen)
      sidebar.classList.toggle('open')
      document.body.classList.toggle('no-scroll', !isOpen)
      btn.classList.toggle('open', !isOpen)
    })
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-link]')
    if (!link) return
    const routeFn = routes[link.dataset.link]
    if (routeFn) {
      e.preventDefault()
      routeFn()

      if (btn && sidebar.classList.contains('open')) {
        btn.setAttribute('aria-expanded', 'false')
        sidebar.classList.remove('open')
        document.body.classList.remove('no-scroll')
        btn.classList.remove('open')
      }
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (btn && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open')
        btn.setAttribute('aria-expanded', 'false')
        document.body.classList.remove('no-scroll')
        btn.classList.remove('open')
      }
    }
  })
})
