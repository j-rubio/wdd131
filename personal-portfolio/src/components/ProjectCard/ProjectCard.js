// export const ProjectCard = (project) => {
//   return `
//     <article class="project-card" >
//         <img src=${project.image} alt=${project.title} />
//         <div class="project-info">
//           <h3>${project.title}</h3>
//           <p>${project.description}</p>
//           <p>Tech Stack: ${project.tech.join(', ')}</p>
//         </div>
//         <div class="project-links">
//             <a href=${
//               project.link
//             } target="_blank" rel="noopener">🔗 Live Preview →</a>
//             <a href=${
//               project.github
//             } target="_blank" rel="noopener">🐱 View Code →</a>
//         </div>
//     </article>
//     `
// }

export const ProjectCard = (project) => {
  return `
    <article class="project-card" role="listitem">
      <img 
        src="${project.image}" 
        alt="Screenshot of the ${project.title} project" 
        loading="lazy" 
        width="100%" 
      />
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <p><strong>Tech Stack:</strong> ${project.tech.join(', ')}</p>
      </div>
      <div class="project-links">
        <a 
          href="${project.link}" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Visit live preview of ${project.title}"
        >
          🔗 Live Preview →
        </a>
        <a 
          href="${project.github}" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="View source code for ${project.title} on GitHub"
        >
          🐱 View Code →
        </a>
      </div> 
    </article>
  `
}
