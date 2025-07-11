import { SocialIcon } from '../SocialMediaIcon/SocialMediaIcon.js'

// export const Header = () => {
//   return `
//     <nav>
//       <button id="logo"><img src="./public/icons/logo-transparent.png" alt="J Rubio logo"></button>
//       <h2>J Rubio</h2>
//       <ul>
//         <li><a href="#" data-link="home">Home</a></li>
//         <li><a href="#" data-link="tech">Tech Stack</a></li>
//         <li><a href="#" data-link="projects">Projects</a></li>
//         <li>${SocialIcon(
//           'https://www.github.com',
//           './public/icons/github.png',
//           'GitHub icon'
//         )}</li>
//         <li>${SocialIcon(
//           'https://www.linkedin.com',
//           './public/icons/linkedin.png',
//           'LinkedIn icon'
//         )}</li>
//       </ul>
//       <button id="themeBtn">☀️ Light Mode</button>
//     </nav>
//   `
// }
export const Header = () => {
  return `
    <nav>
      <button id="logo"><img src="./public/icons/logo-transparent.png" alt="J Rubio logo"></button>
      <ul>
        <li><a href="#" data-link="home">Home</a></li>
        <li><a href="#" data-link="tech">Tech Stack</a></li>
        <li><a href="#" data-link="projects">Projects</a></li>
        <li>${SocialIcon(
          'https://www.github.com',
          './public/icons/github.png',
          'GitHub icon'
        )}</li>
        <li>${SocialIcon(
          'https://www.linkedin.com',
          './public/icons/linkedin.png',
          'LinkedIn icon'
        )}</li>
      </ul>
      <button id="themeBtn">☀️ Light Mode</button>
    </nav>
  `
}
