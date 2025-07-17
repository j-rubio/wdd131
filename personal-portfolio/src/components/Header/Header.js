// Header.js
import { SocialIcon } from '/personal-portfolio/src/components/SocialMediaIcon/SocialMediaIcon.js'

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
            '/personal-portfolio/assets/icons/social-media/backup/github.png',
            'GitHub'
          )}</li>
          <li>${SocialIcon(
            'https://www.linkedin.com',
            '/personal-portfolio/assets/icons/social-media/backup/linkedin.png',
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
          '/personal-portfolio/assets/icons/social-media/backup/github.png',
          'GitHub'
        )}</li>
        <li>${SocialIcon(
          'https://www.linkedin.com',
          '/personal-portfolio/assets/icons/social-media/backup/linkedin.png',
          'LinkedIn'
        )}</li>
        </ul>
        
        <button id="themeBtn" aria-label="Toggle theme">☀️ Light Mode</button>
        </nav>
        `
}
