export const ProjectCard = (project) => {
  return `
    <article class="project-card" >
        <img src=${project.image} alt=${project.title} />
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p>Tech Stack: ${project.tech.join(', ')}</p>
        <div>
            <a href=${
              project.link
            } target="_blank" rel="noopener">🔗 Live Preview →</a>
            <a href=${
              project.github
            } target="_blank" rel="noopener">🐱 View Code →</a>
        </div>
    </article>
    `
}
