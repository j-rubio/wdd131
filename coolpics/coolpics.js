const menuButton = document.querySelector('button')

menuButton.addEventListener('click', () => {
  document.querySelector('nav').classList.toggle('hide')
})

// function handler
function handleResize() {
  const windowSize = window.innerWidth

  const menu = document.querySelector('nav')

  if (windowSize > 1000) {
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
const gallery = document.querySelector('.gallery')

const modal = document.createElement('dialog')
modal.classList.add('image-modal')

modal.innerHTML = `<div class='modal-content'><button class='close-viewer'>X</button><img></div>`

document.body.appendChild(modal)

const modalImage = modal.querySelector('img')
const closeButton = modal.querySelector('.close-viewer')

function modalHandler(e) {
  const imageClicked = e.target.closest('img')
  if (!imageClicked) return

  const imageSrcFullPath = imageClicked.src
  const imageAlt = imageClicked.alt

  const imageSrc =
    imageSrcFullPath.split('/')[imageSrcFullPath.split('/').length - 1]

  const imageSrcParsed = './images/' + imageSrc.split('-')[0] + '-full.jpeg'

  modalImage.src = imageSrcParsed
  modalImage.alt = imageAlt

  modal.showModal()
}

gallery.addEventListener('click', modalHandler)

// close modal on 'X' button
closeButton.addEventListener('click', () => {
  modal.close()
})

// close modal on outside click.
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.close()
})
