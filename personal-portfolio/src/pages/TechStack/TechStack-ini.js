import { TechIcon } from '../../components/TechIcon/TechIcon.js'
import { techIconData } from '../../utils/techIconData.js'

export const TechStack = () => {
  const main = document.querySelector('main')
  main.innerHTML = `
    <section class="tech">
    <h2>My Tech Stack</h2>
    <p>Over the past few years, I’ve built experience in both hardware and software domains. I’ve studied and used a wide range of programming languages, libraries, and platforms, including JavaScript, HTML, CSS, Python, C, C#, R, tools like Git, GitHub, VS Code, Figma, and various IoT platforms. I'm familiar with concepts like responsive design, modular architecture, RESTful APIs, data visualization, and embedded systems. I’m always exploring new technologies and refining my skills to stay up-to-date in this ever-evolving field.</p>
    
      <article>
        ${techIconData.map((el) => TechIcon(el.icon, el.desc)).join('')}
      </article>
    </section>
  `
}
// export const TechStack = () => {
//   const main = document.querySelector('main')
//   main.innerHTML = `
//     <section class="tech">
//     <h2>My Tech Stack</h2>
//     <p>Over the past few years, I’ve built experience in both hardware and software domains. I’ve studied and used a wide range of programming languages, libraries, and platforms, including JavaScript, HTML, CSS, Python, C, C#, R, tools like Git, GitHub, VS Code, Figma, and various IoT platforms. I'm familiar with concepts like responsive design, modular architecture, RESTful APIs, data visualization, and embedded systems. I’m always exploring new technologies and refining my skills to stay up-to-date in this ever-evolving field.</p>
//     <h3>Technologies I’ve been working with recently</h3>
//       <article>
//         ${techIconData.map((el) => TechIcon(el.icon, el.desc)).join('')}
//       </article>
//     </section>
//   `
// }
