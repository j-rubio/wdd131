// Header.js
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

//       <label for="hamburgerToggle" class="hamburger-menu" aria-label="Toggle menu" role="button" tabindex="0">
//         <span></span>
//         <span></span>
//         <span></span>
//       </label>

//       <aside class="sidebar-menu" aria-hidden="true">
//         <ul>
//           <li><a href="#" data-link="home">Home</a></li>
//           <li><a href="#" data-link="tech">Tech Stack</a></li>
//           <li><a href="#" data-link="projects">Projects</a></li>
//           <li>${SocialIcon(
//             'https://www.github.com',
//             './public/icons/github.png',
//             'GitHub'
//           )}</li>
//           <li>${SocialIcon(
//             'https://www.linkedin.com',
//             './public/icons/linkedin.png',
//             'LinkedIn'
//           )}</li>
//         </ul>
//       </aside>

//       <button id="logo" aria-label="Homepage">
//       <a href="#" data-link="home"><img
//           src="./public/icons/logo-transparent.png"
//           srcset="./public/icons/logo-transparent@1x.png 1x, ./public/icons/logo-transparent@2x.png 2x"
//           width="40"
//           height="40"
//           alt="J Rubio logo"
//         /></a>

//       </button>

//       <ul class="nav-links">
//         <li><a href="#" data-link="home">Home</a></li>
//         <li><a href="#" data-link="tech">Tech Stack</a></li>
//         <li><a href="#" data-link="projects">Projects</a></li>
//         <li>${SocialIcon(
//           'https://www.github.com',
//           './public/icons/github.png',
//           'GitHub'
//         )}</li>
//         <li>${SocialIcon(
//           'https://www.linkedin.com',
//           './public/icons/linkedin.png',
//           'LinkedIn'
//         )}</li>
//       </ul>

//       <button id="themeBtn" aria-label="Toggle theme">☀️ Light Mode</button>
//     </nav>
//   `
// }

/************************************************************************** */
// export const Header = () => {
//   return `
//     <nav class="main-nav" role="navigation" aria-label="Main navigation">
//       <input
//         type="checkbox"
//         id="hamburgerToggle"
//         class="hamburger-toggle"
//         aria-label="Toggle menu"
//       />

//       <label for="hamburgerToggle" class="hamburger-menu" aria-label="Toggle menu" role="button" tabindex="0">
//         <span></span>
//         <span></span>
//         <span></span>
//       </label>

//       <aside class="sidebar-menu" aria-hidden="true">
//         <ul>
//           <li><a href="#" data-link="home">Home</a></li>
//           <li><a href="#" data-link="tech">Tech Stack</a></li>
//           <li><a href="#" data-link="projects">Projects</a></li>
//           <li>${SocialIcon(
//             'https://www.github.com',
//             './public/icons/github.png',
//             'GitHub'
//           )}</li>
//           <li>${SocialIcon(
//             'https://www.linkedin.com',
//             './public/icons/linkedin.png',
//             'LinkedIn'
//           )}</li>
//         </ul>
//       </aside>
//       <a href="#" data-link="home" id="logo"><img
//           src="./public/icons/logo-transparent.png"
//           srcset="./public/icons/logo-transparent@1x.png 1x, ./public/icons/logo-transparent@2x.png 2x"
//           width="40"
//           height="40"
//           alt="J Rubio logo"
//         /></a>
//       <ul class="nav-links">
//         <li><a href="#" data-link="home">Home</a></li>
//         <li><a href="#" data-link="tech">Tech Stack</a></li>
//         <li><a href="#" data-link="projects">Projects</a></li>
//         <li>${SocialIcon(
//           'https://www.github.com',
//           './public/icons/github.png',
//           'GitHub'
//         )}</li>
//         <li>${SocialIcon(
//           'https://www.linkedin.com',
//           './public/icons/linkedin.png',
//           'LinkedIn'
//         )}</li>
//       </ul>

//       <button id="themeBtn" aria-label="Toggle theme">☀️ Light Mode</button>
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

      <label for="hamburgerToggle" class="hamburger-menu" aria-label="Toggle menu" role="button" tabindex="0">
        <span></span>
        <span></span>
        <span></span>
      </label>

      <aside class="sidebar-menu" aria-hidden="false">
        <ul>
          <li><a href="#" data-link="home">Home</a></li>
          <li><a href="#" data-link="tech">Tech Stack</a></li>
          <li><a href="#" data-link="projects">Projects</a></li>
          <li>${SocialIcon(
            'https://www.github.com',
            './public/icons/github.png',
            'GitHub'
          )}</li>
          <li>${SocialIcon(
            'https://www.linkedin.com',
            './public/icons/linkedin.png',
            'LinkedIn'
          )}</li>
        </ul>
      </aside>
      <a href="#" data-link="home"><p><strong>J Rubio</strong></p></a>      
      <ul class="nav-links">
        <li><a href="#" data-link="home">Home</a></li>
        <li><a href="#" data-link="tech">Tech Stack</a></li>
        <li><a href="#" data-link="projects">Projects</a></li>
        <li>${SocialIcon(
          'https://www.github.com',
          './public/icons/github.png',
          'GitHub'
        )}</li>
        <li>${SocialIcon(
          'https://www.linkedin.com',
          './public/icons/linkedin.png',
          'LinkedIn'
        )}</li>
        </ul>
        
        <button id="themeBtn" aria-label="Toggle theme">☀️ Light Mode</button>
        </nav>
        `
}
// <li>${SocialIcon(
//   '#',
//   './public/icons/logo-transparent.png',
//   'LogoIcon'
// )}</li>

// <img
//     src="./public/icons/logo-transparent.png"
//     srcset="./public/icons/logo-transparent@1x.png 1x, ./public/icons/logo-transparent@2x.png 2x"
//     width="40"
//     height="40"
//     alt="J Rubio logo"
//   />
