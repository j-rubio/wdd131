// main.js

import { loadStyle } from './src/utils/loadStyle.js'
import { Header } from './src/components/Header/Header.js'
import { Footer } from './src/components/Footer/Footer.js'
import { Home } from './src/pages/Home/Home.js'
import { TechStack } from './src/pages/TechStack/TechStack.js'
import { Projects } from './src/pages/Projects/Projects.js'
import { initTheme } from './src/utils/changeTheme.js'

// 🌐 Load stylesheets async (above-the-fold styles only)
loadStyle('./main.css', { async: true })
loadStyle('./src/components/Header/Header.css', { async: true })
loadStyle('./src/components/Footer/Footer.css', { async: true })
loadStyle('./src/pages/Home/Home.css', { async: true })
loadStyle('./src/components/Avatar/Avatar.css', { async: true })
loadStyle('./src/components/SocialMediaIcon/SocialMediaIcon.css', {
  async: true
})

// ⏳ Lazy-load non-critical styles on idle
requestIdleCallback(() => {
  loadStyle('./src/pages/TechStack/TechStack.css')
  loadStyle('./src/pages/Projects/Projects.css')
  loadStyle('./src/components/ProjectCard/ProjectCard.css')
  loadStyle('./src/components/TechIcon/TechIcon.css')
})

// 🧩 Inject header and footer HTML
document.querySelector('header').innerHTML = Header()
document.querySelector('footer').innerHTML = Footer()

// 🌗 Set light/dark theme preference
initTheme()

// 🚀 Load initial page content
Home()

// 🧭 Client-side router
const routes = {
  home: Home,
  tech: TechStack,
  projects: Projects
}

// 🔁 Navigation handling
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('nav-toggle-btn')
  const sidebar = document.getElementById('sidebar')

  // Sidebar toggle
  toggleBtn?.addEventListener('click', () => {
    const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true'
    toggleBtn.setAttribute('aria-expanded', String(!isOpen))
    sidebar.classList.toggle('open', !isOpen)
    document.body.classList.toggle('no-scroll', !isOpen)
    toggleBtn.classList.toggle('open', !isOpen)
  })

  // Navigation link routing
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-link]')
    if (!link) return

    const routeFn = routes[link.dataset.link]
    if (routeFn) {
      e.preventDefault()
      routeFn()

      // Close sidebar after navigation
      if (sidebar?.classList.contains('open')) {
        sidebar.classList.remove('open')
        toggleBtn.setAttribute('aria-expanded', 'false')
        document.body.classList.remove('no-scroll')
        toggleBtn.classList.remove('open')
      }
    }
  })

  // Close sidebar on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar?.classList.contains('open')) {
      sidebar.classList.remove('open')
      toggleBtn.setAttribute('aria-expanded', 'false')
      document.body.classList.remove('no-scroll')
      toggleBtn.classList.remove('open')
    }
  })
})
