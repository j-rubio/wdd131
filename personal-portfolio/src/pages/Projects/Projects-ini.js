import { ProjectCard } from '../../components/ProjectCard/ProjectCard.js'
import { projectsData } from '../../utils/projectsData.js'

export const Projects = () => {
  const main = document.querySelector('main')
  main.innerHTML = `
    <section class="projects">
    <h2>Projects</h2>
    <h3>Things I’ve built so far</h3>
    <div class="gallery">
      ${projectsData.map((pr) => ProjectCard(pr)).join('')}
    </div>
    </section>
    `
}
