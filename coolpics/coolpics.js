const menuButton = document.querySelector('button')

menuButton.addEventListener('click', () => {
  document.querySelector('nav').classList.toggle('hide')
})

// function handler
function handleResize() {
  const windowSize = window.innerWidth
  // console.log(windowSize)

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

/****************************** */

// creating all the modal-needed elements
const gallery = document.querySelector('.gallery')

const modal = document.createElement('dialog')
modal.classList.add('image-modal')
// modal.innerHTML = `<img><button class='close-viewer'>X</button>`
modal.innerHTML = `<button class='close-viewer'>X</button><img>`

// modal.innerHTML = `<dialog class="image-modal">
//   <div style="position: relative; display: inline-block;">
//     <button class="close-viewer">X</button>
//     <img src="./images/your-image.jpeg" alt="Modal image" />
//   </div>
// </dialog>
// `

// modal.innerHTML = `<dialog class="image-modal">
//   <div class="modal-content">
//     <button class="close-viewer">X</button>
//     <img src="" alt="Enlarged view" />
//   </div>
// </dialog>`
// modal.innerHTML = `
//   <div class="image-modal style="position: relative; display: inline-block;">
//     <button class="close-viewer">X</button>
//     <img src="./images/your-image.jpeg" alt="Modal image" />
//   </div>`
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

  console.log(imageSrcFullPath)
  console.log(imageAlt)
  console.log(imageSrcParsed)

  modalImage.src = imageSrcParsed
  modalImage.alt = imageAlt
  // modal.querySelector('img').src = imageSrcParsed
  // modal.querySelector('img').alt = imageAlt

  console.log(modalImage.src)
  console.log(modalImage.alt)

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

// modal.addEventListener('click', (e) => {
//   // Close if clicking outside the image (on the modal backdrop)
//   const clickedInsideImage = modalImage.contains(e.target)
//   const clickedCloseButton = closeButton.contains(e.target)
//   if (!clickedInsideImage && !clickedCloseButton) {
//     modal.close()
//   }
// })
