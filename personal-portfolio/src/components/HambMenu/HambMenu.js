import { SocialIcon } from '../SocialMediaIcon/SocialMediaIcon.js'

export const HambMenu = () => {
  return `
    <div class="hamburger-container">
      <label class="hamburger-menu">
        <input type="checkbox" id="hamburgerToggle" />
        <span></span>
        <span></span>
        <span></span>
        <aside class="sidebar-menu">
          <nav>
            <ul>
              <li><a href="#" data-link="home">Home</a></li>
              <li><a href="#" data-link="tech">Tech Stack</a></li>
              <li><a href="#" data-link="projects">Projects</a></li>
              <hr>
              <div class="social">
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
              </div>
            </ul>
          </nav>
        </aside>
      </label>
    </div>
  `
}
