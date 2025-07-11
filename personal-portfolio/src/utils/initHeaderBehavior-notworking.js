export function initHeaderBehavior() {
  // console.log('✅ initHeaderBehavior called')
  const checkbox = document.getElementById('hamburgerToggle')
  const sidebar = document.querySelector('.sidebar-menu')

  if (!checkbox || !sidebar) {
    // console.warn('❌ Missing checkbox or sidebar')

    return
  }
  const closeSidebar = () => {
    checkbox.checked = false
    document.body.classList.remove('no-scroll')
  }

  // Close when clicking a link
  sidebar.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') closeSidebar()
  })

  // Close on Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSidebar()
  })

  // Close on outside click
  document.addEventListener('click', (e) => {
    const isOutsideSidebar =
      !sidebar.contains(e.target) && !e.target.closest('.hamburger-menu')
    if (checkbox.checked && isOutsideSidebar) {
      closeSidebar()
    }
  })

  // Scroll lock
  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  })
}

// checkbox.addEventListener('change', () => {
//   if (checkbox.checked) {
//     document.body.classList.add('no-scroll')
//     sidebar.setAttribute('aria-hidden', 'false') // make visible to assistive tech
//   } else {
//     document.body.classList.remove('no-scroll')
//     sidebar.setAttribute('aria-hidden', 'true') // hide from assistive tech
//   }
// })
