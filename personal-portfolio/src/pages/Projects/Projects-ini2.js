import { ProjectCard } from '../../components/ProjectCard/ProjectCard.js'
import { projectsData } from '../../utils/projectsData.js'
/* Projects.js */
export const Projects = () => {
  const main = document.querySelector('main')
  main.innerHTML = `
    <section class="projects" aria-labelledby="projects-heading">
      <div class="projects-content">
        <h2 id="projects-heading">Featured Projects</h2>
        <p>Here are a few projects I’ve worked on recently. Each one showcases my approach to building clean, modular, and responsive user experiences.</p>
        <div class="project-grid">
       ${projectsData.map((pr) => ProjectCard(pr)).join('')}      
       </div>
     </div>
    </section>
  `
}
/* Projects.js */
// export const Projects = () => {
//   const main = document.querySelector('main')
//   main.innerHTML = `
//     <section class="projects" aria-labelledby="projects-heading">
//       <div class="projects-content">
//         <h2 id="projects-heading">Featured Projects</h2>
//         <p>Here are a few projects I’ve worked on recently. Each one showcases my approach to building clean, modular, and responsive user experiences.</p>

//         <div class="project-grid">
//           <article class="project-card">
//             <h3>Portfolio Website</h3>
//             <p>A modern, accessible portfolio built with modular JavaScript, HTML, and CSS.</p>
//             <a href="https://github.com/j-rubio/portfolio" target="_blank" rel="noopener">View on GitHub →</a>
//           </article>

//           <article class="project-card">
//             <h3>IoT Weather Station</h3>
//             <p>An embedded system project that collects environmental data and sends it to a web dashboard.</p>
//             <a href="#" target="_blank" rel="noopener">View Demo →</a>
//           </article>

//           <article class="project-card">
//             <h3>Recipe Book Web App</h3>
//             <p>A dynamic JavaScript SPA featuring recipes with images, filters, and local storage.</p>
//             <a href="#" target="_blank" rel="noopener">View Project →</a>
//           </article>
//         </div>
//       </div>
//     </section>
//   `
// }
