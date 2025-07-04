// import './Projects.css'
// import { loadStyle } from '../../utils/loadStyle'
// loadStyle('./src/pages/Projects/Projects.css')

import { ProjectCard } from '../../components/ProjectCard/ProjectCard.js'
// import { ProjectCard } from './src/components/ProjectCard/ProjectCard.js'

import { projectsData } from '../../utils/projectsData.js'
// import { projectsData } from './src/utils/projectsData.js'

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
