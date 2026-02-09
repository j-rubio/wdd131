// import { ProjectCard } from '../../components/ProjectCard/ProjectCard.js'
// import { projectsData } from '../../utils/projectsData.js'

// export const Projects = () => {
//   const main = document.querySelector('main')
//   main.innerHTML = `
//     <section class="projects" aria-labelledby="projects-heading">
//       <div class="projects-content">
//         <h2 id="projects-heading">Featured Projects</h2>
//         <p>Here are a few projects I’ve worked on recently. Each one showcases my approach to building clean, modular, and responsive user experiences.</p>
//         <div class="project-grid" role="list">
//           ${projectsData.map((pr) => ProjectCard(pr)).join('')}
//         </div>
//       </div>
//     </section>
//   `
// }

// import { ProjectCard } from '../../components/ProjectCard/ProjectCard.js'
// import { projectsData } from '../../utils/projectsData.js'

// export const Projects = () => {
//   const main = document.querySelector('main')
//   main.innerHTML = `
//     <section class="projects" aria-labelledby="projects-heading">
//       <div class="projects-content">
//         <h2 id="projects-heading">Featured Projects</h2>
//         <p>Here are a few projects I’ve worked on recently. Each one showcases my approach to building clean, modular, and responsive user experiences.</p>
//         <div class="project-grid" role="list">
//           ${projectsData.map((pr) => ProjectCard(pr)).join('')}
//         </div>
//       </div>
//     </section>
//   `

//   addModalListeners()
// }

// const addModalListeners = () => {
//   document.querySelectorAll('.live-preview').forEach((button) => {
//     button.addEventListener('click', (e) => {
//       e.preventDefault()
//       const link = e.target.dataset.link
//       // showModal(`Live Preview: ${link}`)
//       showModal(`[ACCESS DENIED]`)
//     })
//   })

//   document.querySelectorAll('.view-code').forEach((button) => {
//     button.addEventListener('click', (e) => {
//       e.preventDefault()
//       const githubLink = e.target.dataset.github
//       // showModal(`View Code: ${githubLink}`)
//       showModal(`[ACCESS DENIED]`)
//     })
//   })
// }

// const addModalListeners = () => {
//   document
//     .querySelectorAll('.live-preview:not(.no-modal)')
//     .forEach((button) => {
//       button.addEventListener('click', (e) => {
//         e.preventDefault()
//         const link = e.target.dataset.link
//         showModal(`[ACCESS DENIED]`)
//       })
//     })

//   document.querySelectorAll('.view-code:not(.no-modal)').forEach((button) => {
//     button.addEventListener('click', (e) => {
//       e.preventDefault()
//       const githubLink = e.target.dataset.github
//       showModal(`[ACCESS DENIED]`)
//     })
//   })
// }

// const showModal = (message) => {
//   // Clone modal and insert the relevant content
//   const template = document.getElementById('admin-modal-template')
//   const modalInstance = template.content.cloneNode(true)
//   const overlay = modalInstance.querySelector('#modal-overlay')
//   const closeBtn = modalInstance.querySelector('#close-modal')

//   modalInstance.querySelector('h2').innerText = message

//   closeBtn.addEventListener('click', () => {
//     document.body.removeChild(overlay)
//   })

//   document.body.appendChild(modalInstance)
// }
import { ProjectCard } from '../../components/ProjectCard/ProjectCard.js'
import { projectsData } from '../../utils/projectsData.js'

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

  addModalListeners()
}

const addModalListeners = () => {
  document.querySelectorAll('.live-preview').forEach((button) => {
    button.addEventListener('click', (e) => {
      // Check if button has the 'no-modal' class
      if (button.classList.contains('no-modal')) {
        const link = button.dataset.link
        window.open(link, '_blank') // Open the link in a new tab
      } else {
        e.preventDefault()
        showModal(`[DENIED]`)
      }
    })
  })

  document.querySelectorAll('.view-code').forEach((button) => {
    button.addEventListener('click', (e) => {
      // Check if button has the 'no-modal' class
      if (button.classList.contains('no-modal')) {
        const githubLink = button.dataset.github
        window.open(githubLink, '_blank') // Open the link in the current tab
      } else {
        e.preventDefault()
        showModal(`[DENIED]`)
      }
    })
  })
}

// const showModal = (message) => {
//   // Clone modal and insert the relevant content
//   const template = document.getElementById('admin-modal-template')
//   const modalInstance = template.content.cloneNode(true)
//   const overlay = modalInstance.querySelector('#modal-overlay')
//   const closeBtn = modalInstance.querySelector('#close-modal')

//   modalInstance.querySelector('h2').innerText = message

//   closeBtn.addEventListener('click', () => {
//     document.body.removeChild(overlay)
//   })

//   document.body.appendChild(modalInstance)
// }

const showModal = (message) => {
  // Clone modal and insert the relevant content
  const template = document.getElementById('admin-modal-template')
  const modalInstance = template.content.cloneNode(true)
  const overlay = modalInstance.querySelector('#modal-overlay')
  const closeBtn = modalInstance.querySelector('#close-modal')

  // Get the heading and apply the typing effect
  const heading = modalInstance.querySelector('h2')
  heading.classList.add('typing') // Add the typing class
  heading.innerText = '' // Clear the existing text

  // Typing effect function
  let index = 0
  const speed = 300 // Typing speed in milliseconds
  const type = () => {
    if (index < message.length) {
      heading.innerText += message.charAt(index)
      index++
      setTimeout(type, speed)
    }
  }

  // Start typing effect
  type()

  closeBtn.addEventListener('click', () => {
    document.body.removeChild(overlay)
  })

  document.body.appendChild(modalInstance)
}
