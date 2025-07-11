/* initHeaderBehavior.js */
export function initHeaderBehavior() {
  const toggle = document.getElementById('hamburgerToggle')
  const sidebar = document.querySelector('.sidebar-menu')

  if (!toggle || !sidebar) return

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      sidebar.style.transform = 'translateX(-50%)'
      document.body.classList.add('no-scroll')
    } else {
      sidebar.style.transform = 'translateX(100%)'
      document.body.classList.remove('no-scroll')
    }
  })
}
