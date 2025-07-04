// export const HambMenu = () => {
//   return `
//     <label class="hamburger-menu">
//           <input type="checkbox" />
//         </label>
//         <aside class="sidebar-menu">
//           <nav>
//             <ul>
//               <li><a href="#null">Home</a></li>
//               <li><a href="#null">Tech Stack</a></li>
//               <li><a href="#null">Projects</a></li>
//             </ul>
//           </nav>
//         </aside>
//     `
// }
// export const HambMenu = () => {
//   return `
//     <label class="hamburger-menu">
//       <input type="checkbox" id="hamburgerToggle" />
//     </label>
//     <aside class="sidebar-menu">
//       <nav>
//         <ul>
//           <li><a href="#" id="mobile-homelink">Home</a></li>
//           <li><a href="#" id="mobile-techlink">Tech Stack</a></li>
//           <li><a href="#" id="mobile-projectslink">Projects</a></li>
//         </ul>
//       </nav>
//     </aside>
//   `
// }
export const HambMenu = () => {
  return `
    <label class="hamburger-menu">
      <input type="checkbox" id="hamburgerToggle">
    </label>
    <aside class="sidebar-menu">
      <nav>
        <ul>
          <li><a href="#" id="mobile-homelink">Home</a></li>
          <li><a href="#" id="mobile-techlink">Tech Stack</a></li>
          <li><a href="#" id="mobile-projectslink">Projects</a></li>
        </ul>
      </nav>
    </aside>
  `
}

document.addEventListener('click', (e) => {
  const toggle = document.querySelector('#hamburger-toggle')
  if (e.target.closest('.sidebar-menu a')) {
    toggle.checked = false
  }
})
