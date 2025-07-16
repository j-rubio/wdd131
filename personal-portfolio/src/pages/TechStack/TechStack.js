import { techIconData } from '/src/utils/techIconData.js'
import { TechIcon } from '/src/components/TechIcon/TechIcon.js'

export const TechStack = () => {
  const main = document.querySelector('main')
  main.innerHTML = `
    <section class="tech" aria-labelledby="tech-heading">
      <div class="tech-content">
        <h2 id="tech-heading">My Tech Stack</h2>
        <p>
          I’ve built experience in both hardware and software domains. I’ve worked with JavaScript, Python, C/C#, HTML/CSS, and more. I use tools like Git, GitHub, VS Code, Figma, and IoT platforms. I embrace responsive design, modular development, RESTful APIs, data visualization, and embedded systems.
        </p>
      </div>
      <div class="tech-grid" role="list">
        ${techIconData.map((el) => TechIcon(el.icon, el.name)).join('')}
      </div>
    </section>
  `
}
