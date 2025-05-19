const menuButton = document.querySelector('button')

menuButton.addEventListener('click', () => {
  document.querySelector('nav').classList.toggle('hide')
})

// Resize handler function
function handleResize() {
  const windowSize = window.innerWidth

  const menu = document.querySelector('nav')

  if (windowSize >= 1000) {
    menu.classList.remove('hide')
  } else {
    menu.classList.add('hide')
  }
}

// Run once on load
handleResize()

// Update on windows resize
window.addEventListener('resize', handleResize)

// creating all the modal-needed elements
const modal = document.createElement('dialog')

modal.classList.add('image-modal')

modal.innerHTML = `<button class='close-viewer'>X</button><img>`

document.body.appendChild(modal)

// viewerTemplate function
function viewerTemplate(pic, alt) {
  return `<div class='modal-content'><button class='close-viewer'>X</button><img src="${pic}" alt="${alt}"></div>`
}

// viewHandler
function viewHandler(e) {
  const imageClicked = e.target.closest('img')
  if (!imageClicked) return

  const imageSrcFullPath = imageClicked.src
  const imageAlt = imageClicked.alt

  const imageSrc =
    imageSrcFullPath.split('/')[imageSrcFullPath.split('/').length - 1]

  const imageSrcParsed = './images/' + imageSrc.split('-')[0] + '-full.jpeg'

  modal.innerHTML = viewerTemplate(imageSrcParsed, imageAlt)

  modal.showModal()
}

const gallery = document.querySelector('.gallery')
gallery.addEventListener('click', viewHandler)

modal.addEventListener('click', (e) => {
  // Close modal on clicking close button
  if (e.target.classList.contains('close-viewer')) {
    modal.close()
  }

  // Also close modal on clicking outside the image/content
  if (e.target === modal) {
    modal.close()
  }
})
