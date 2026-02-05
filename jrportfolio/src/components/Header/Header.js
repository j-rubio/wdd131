import { BASE_PATH } from '../../utils/constants.js'
import { SocialIcon } from '../SocialMediaIcon/SocialMediaIcon.js'

// export const Header = () => {
//   return `
//     <nav class="main-nav" role="navigation" aria-label="Main navigation">
//       <input
//         type="checkbox"
//         id="hamburgerToggle"
//         class="hamburger-toggle"
//         aria-label="Toggle menu"
//       />

//       <button
//         id="nav-toggle-btn"
//         class="hamburger-menu"
//         aria-label="Toggle menu"
//         aria-expanded="false"
//         aria-controls="sidebar">
//         <span></span>
//         <span></span>
//         <span></span>
//       </button>

//       <nav id="sidebar" class="sidebar-menu" role="navigation" aria-label="Sidebar menu">
//         <ul class="nav-links">
//           <li><a href="#" data-link="home">Home</a></li>
//           <li><a href="#" data-link="tech">Tech Stack</a></li>
//           <li><a href="#" data-link="projects">Projects</a></li>
//           <li>${SocialIcon(
//             'https://www.github.com',
//             `${BASE_PATH}assets/smedia/github-32.webp`,
//             'GitHub'
//           )}</li>
//           <li>${SocialIcon(
//             'https://www.linkedin.com/in/rubioconnect/',
//             `${BASE_PATH}assets/smedia/linkedin-32.webp`,
//             'LinkedIn'
//           )}</li>
//         </ul>
//       </nav>

//       <a href="#" data-link="home"><p><strong>JR</strong></p></a>

//       <ul class="nav-links">
//         <li><a href="#" data-link="home">Home</a></li>
//         <li><a href="#" data-link="tech">Tech Stack</a></li>
//         <li><a href="#" data-link="projects">Projects</a></li>
//         <li>${SocialIcon(
//           'https://www.github.com/j-rubio/',
//           `${BASE_PATH}assets/smedia/github-32.webp`,
//           'GitHub'
//         )}</li>
//         <li>${SocialIcon(
//           'https://www.linkedin.com/in/rubioconnect/',
//           `${BASE_PATH}assets/smedia/linkedin-32.webp`,
//           'LinkedIn'
//         )}</li>
//       </ul>

//       <button id="themeBtn" aria-label="Toggle light/dark mode" title="Toggle theme"></button>
//     </nav>
//   `
// }

export const Header = () => {
  return `
    <nav class="main-nav" role="navigation" aria-label="Main navigation">
      <input
        type="checkbox"
        id="hamburgerToggle"
        class="hamburger-toggle"
        aria-label="Toggle menu"
      />
      
      <button
        id="nav-toggle-btn"
        class="hamburger-menu"
        aria-label="Toggle menu"
        aria-expanded="false"
        aria-controls="sidebar">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav id="sidebar" class="sidebar-menu" role="navigation" aria-label="Sidebar menu">
        <ul class="nav-links">
          <li><a href="#" data-link="home">Home</a></li>
          <li><a href="#" data-link="tech">Tech Stack</a></li>
          <li><a href="#" data-link="projects">Projects</a></li>
          <li>${SocialIcon(
            'https://www.github.com',
            `${BASE_PATH}assets/smedia/github-32.webp`,
            'GitHub'
          )}</li>
          <li>${SocialIcon(
            'https://www.linkedin.com/in/rubioconnect/',
            `${BASE_PATH}assets/smedia/linkedin-32.webp`,
            'LinkedIn'
          )}</li>
        </ul>
      </nav>

      <a href="#" data-link="home"><p><strong>JR</strong></p></a>
      
      <ul class="nav-links">
        <li><a href="#" data-link="home">Home</a></li>
        <li><a href="#" data-link="tech">Tech Stack</a></li>
        <li><a href="#" data-link="projects">Projects</a></li>
        <li>${SocialIcon(
          'https://www.github.com',
          `${BASE_PATH}assets/smedia/github-32.webp`,
          'GitHub'
        )}</li>
        <li>${SocialIcon(
          'https://www.linkedin.com/in/rubioconnect/',
          `${BASE_PATH}assets/smedia/linkedin-32.webp`,
          'LinkedIn'
        )}</li>
      </ul>

      <button id="themeBtn" aria-label="Toggle light/dark mode" title="Toggle theme"></button>
    </nav>
  `
}
