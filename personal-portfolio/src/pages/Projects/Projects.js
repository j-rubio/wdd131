import { ProjectCard } from '/personal-portfolio/src/components/ProjectCard/ProjectCard.js'
import { projectsData } from '/personal-portfolio/src/utils/projectsData.js'

export const Projects = () => {
  const main = document.querySelector('main')
  main.innerHTML = `
    <section class="projects" aria-labelledby="projects-heading">
      <div class="projects-content">
        <h2 id="projects-heading">Featured Projects</h2>
        <p>Here are a few projects I’ve worked on recently. Each one showcases my approach to building clean, modular, and responsive user experiences.</p>
        <div class="project-grid" role="list">
          ${projectsData.map((pr) => ProjectCard(pr)).join('')}
        </div>
      </div>
    </section>
  `
}
