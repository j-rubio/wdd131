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
