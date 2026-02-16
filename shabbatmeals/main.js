import recipes from './recipes.mjs'

function randomNumber(upperLimit) {
  return Math.floor(Math.random() * upperLimit)
}

function getRandomListEntry(list) {
  const listLength = list.length
  const randomNum = randomNumber(listLength)
  return list[randomNum]
}

function recipeTemplate(recipe, isFirst = false) {
  return `<section class="recipe" data-recipe-id="${recipe.name}">
            <img
              src="${recipe.image}"
              alt="${recipe.description}"
              width="600"
              height="400"
              ${isFirst ? '' : 'loading="lazy"'}
            />
            <div class="info">
              <div class="tags">
                ${tagsTemplate(recipe.tags)}
              </div>
              <h2>${recipe.name}</h2>
              ${ratingTemplate(recipe.rating)}
              <p class="description">
                ${recipe.description}
              </p>
            </div>
          </section>`
}

function tagsTemplate(tags) {
  let html = ''
  tags.forEach((element) => {
    html += `<div>${element}</div>`
  })
  return html
}

function ratingTemplate(rating) {
  let html = `<span
	class="rating"
	role="img"
	aria-label="Rating: ${rating} out of 5 stars">`
  for (let i = 1; i < 6; i++) {
    if (i <= rating) {
      html += `<span aria-hidden="true" class="icon-star">⭐</span>`
    } else {
      html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`
    }
  }
  html += `</span>`
  return html
}

function renderRecipes(recipeList) {
  const recipesHolder = document.querySelector('.recipes')
  const html = recipeList.map((r, i) => recipeTemplate(r, i === 0)).join('')
  recipesHolder.innerHTML = html

  // Add click events to open modal
  const recipeSections = document.querySelectorAll('.recipe')
  recipeSections.forEach((section) => {
    section.addEventListener('click', () => {
      openModal(section.getAttribute('data-recipe-id'))
    })
  })
}

function init() {
  const recipe = getRandomListEntry(recipes)
  renderRecipes([recipe])
}
init()

const buttonSearch = document.querySelector('#searchButton')
const inputSearch = document.querySelector('#inputSearch')

function filterRecipes(query) {
  const filteredRecipes = recipes.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.tags.find((item) => item.toLowerCase().includes(query)) ||
      recipe.recipeIngredient.find((item) => item.toLowerCase().includes(query))
    )
  })
  return filteredRecipes
}

function searchHandler(event) {
  event.preventDefault()
  const query = inputSearch.value.toLowerCase()
  const sortedRecipes = filterRecipes(query).sort((a, b) =>
    a.name.localeCompare(b.name)
  )
  renderRecipes(sortedRecipes)
}

const form = document.querySelector('form')
form.addEventListener('submit', searchHandler)

// Modal logic
const modal = document.getElementById('recipeModal')
const closeButton = document.querySelector('.close-button')

function openModal(recipeName) {
  const recipe = recipes.find((r) => r.name === recipeName)
  if (recipe) {
    document.getElementById('modalRecipeName').textContent = recipe.name
    document.getElementById('modalRecipeImage').src = recipe.image
    document.getElementById('modalRecipeDescription').textContent =
      recipe.description

    const ingredientsList = document.getElementById('modalRecipeIngredients')
    const ingredientsTitle = document.getElementById(
      'modalRecipeIngredientsTitle'
    )
    if (recipe.recipeIngredient.length > 0) {
      ingredientsTitle.innerHTML = 'Ingredients:'
      ingredientsList.innerHTML = recipe.recipeIngredient
        .map((ingredient) => `<li>${ingredient}</li>`)
        .join('')
    } else {
      ingredientsTitle.innerHTML = ''
      ingredientsList.innerHTML = ''
    }

    const dressingList = document.getElementById('modalRecipeDressing')
    const dressingTitle = document.getElementById('modalRecipeDressingTitle')
    //if the dressing ingredient list is not empty.
    if (recipe.dressingIngredient.length > 0) {
      dressingTitle.innerHTML = 'Dressing:'

      dressingList.innerHTML = recipe.dressingIngredient
        .map((dressing) => {
          // Check if empty or starts with "--"
          const isEmpty = dressing.trim() === '' || dressing.startsWith('--')

          return isEmpty
            ? `<li data-status="empty-space">${dressing}</li>`
            : `<li>${dressing}</li>`
        })
        .join('')
    } else {
      dressingTitle.innerHTML = ''
      dressingList.innerHTML = ''
    }

    const instructionsList = document.getElementById('modalRecipeInstructions')
    const instructionsTitle = document.getElementById(
      'modalRecipeIntructionsTitle'
    )

    if (recipe.recipeInstructions.length > 0) {
      instructionsTitle.innerHTML = 'Instructions:'
      instructionsList.innerHTML = recipe.recipeInstructions
        .map((instruction) => `<li>${instruction}</li>`)
        .join('')
    } else {
      instructionsTitle.innerHTML = ''
      instructionsList.innerHTML = ''
    }

    modal.style.display = 'block'
  }
}

// Close modal event
closeButton.addEventListener('click', () => {
  modal.style.display = 'none'
})

// Click outside modal to close
// window.addEventListener('click', (event) => {
//   if (event.target === modal) {
//     modal.style.display = 'none'
//   }
// })

/////////////////////////////////////////////////////////////////////////////////////////////
// this part is to create and save the document as a PDF.

// Download Recipe as PDF
// document.getElementById('downloadButton').addEventListener('click', () => {
//   const { jsPDF } = window.jspdf
//   const doc = new jsPDF()

//   // Set the basic font settings
//   doc.setFont('Helvetica', 'normal')
//   const margin = 10 // page margin
//   const pageWidth = doc.internal.pageSize.getWidth()
//   const pageHeight = doc.internal.pageSize.getHeight()

//   let verticalPosition = margin // Track the vertical position for adding text

//   const recipeName = document.getElementById('modalRecipeName').textContent
//   const recipeDescription = document.getElementById(
//     'modalRecipeDescription'
//   ).textContent
//   const ingredients = Array.from(
//     document.querySelectorAll('#modalRecipeIngredients li')
//   ).map((li) => li.textContent)
//   const instructions = Array.from(
//     document.querySelectorAll('#modalRecipeInstructions li')
//   ).map((li) => li.textContent)

//   // Add Title
//   doc.setFontSize(18)
//   doc.text(recipeName, margin, verticalPosition)
//   verticalPosition += 10

//   // Add Description
//   doc.setFontSize(10)
//   doc.text(recipeDescription, margin, verticalPosition)
//   verticalPosition += 15

//   // Add Ingredients
//   doc.setFontSize(12)
//   doc.text('Ingredients:', margin, verticalPosition)
//   verticalPosition += 10

//   ingredients.forEach((ingredient) => {
//     // Handle text wrapping for each ingredient
//     const splitText = doc.splitTextToSize(
//       `- ${ingredient}`,
//       pageWidth - 2 * margin
//     )
//     doc.text(splitText, margin, verticalPosition)
//     verticalPosition += splitText.length * 10 + 5 // Increment for each ingredient with some spacing
//   })

//   // Add Instructions
//   doc.setFontSize(14)
//   verticalPosition += 10 // Space before instructions
//   doc.text('Instructions:', margin, verticalPosition)
//   verticalPosition += 10

//   instructions.forEach((instruction, index) => {
//     const splitText = doc.splitTextToSize(
//       `${index + 1}. ${instruction}`,
//       pageWidth - 2 * margin
//     )
//     doc.text(splitText, margin, verticalPosition)
//     verticalPosition += splitText.length * 10 + 5 // Increment for each instruction with some spacing
//   })

//   // Save the PDF
//   doc.save(`${recipeName}.pdf`)

//   document.getElementById('printButton').addEventListener('click', (doc) => {
//     // Hide the modal before printing
//     // modal.style.display = 'none'
//     const docu = doc
//     // Call print
//     window.print(docu)

//     // Optionally show the modal again after printing
//     // modal.style.display = 'block'
//   })
// })

////////////////////////////////////////////////////////////////////////////////////////////

// //Print Recipe
// document.getElementById('printButton').addEventListener('click', () => {
//   // Hide the modal before printing
//   modal.style.display = 'none'

//   // Call print
//   window.print(this.modal)

//   // Optionally show the modal again after printing
//   modal.style.display = 'block'
// })

// // Download Recipe as PDF
// document.getElementById('downloadButton').addEventListener('click', () => {
//   const { jsPDF } = window.jspdf // Accessing jsPDF library
//   const doc = new jsPDF()

//   // Set the font and size
//   doc.setFont('Helvetica', 'normal')
//   doc.setFontSize(16)

//   // Get recipe data
//   const recipeName = document.getElementById('modalRecipeName').textContent
//   const recipeDescription = document.getElementById(
//     'modalRecipeDescription'
//   ).textContent
//   const ingredients = Array.from(
//     document.querySelectorAll('#modalRecipeIngredients li')
//   ).map((li) => li.textContent)
//   const instructions = Array.from(
//     document.querySelectorAll('#modalRecipeInstructions li')
//   ).map((li) => li.textContent)

//   // Add title
//   doc.text(recipeName, 10, 10)
//   doc.text(recipeDescription, 10, 20)

//   // Set a smaller font for ingredients
//   doc.setFontSize(14)
//   doc.text('Ingredients:', 10, 30)
//   ingredients.forEach((ingredient, index) => {
//     doc.text(`- ${ingredient}`, 10, 40 + index * 10)
//   })

//   // Set a smaller font for instructions
//   doc.setFontSize(14)
//   doc.text('Instructions:', 10, 40 + ingredients.length * 10 + 10)
//   instructions.forEach((instruction, index) => {
//     doc.text(
//       `${index + 1}. ${instruction}`,
//       10,
//       50 + ingredients.length * 10 + 10 + index * 10
//     )
//   })

//   // Save the PDF
//   doc.save(`${recipeName}.pdf`)
// })

// // Download Recipe as PDF
// document.getElementById('downloadButton').addEventListener('click', () => {
//   const { jsPDF } = window.jspdf // Accessing jsPDF library
//   const doc = new jsPDF()

//   // Set the font and size
//   doc.setFont('Helvetica', 'normal')
//   doc.setFontSize(16)

//   // Get recipe data
//   const recipeName = document.getElementById('modalRecipeName').textContent
//   const recipeDescription = document.getElementById(
//     'modalRecipeDescription'
//   ).textContent
//   const ingredients = Array.from(
//     document.querySelectorAll('#modalRecipeIngredients li')
//   ).map((li) => li.textContent)
//   const instructions = Array.from(
//     document.querySelectorAll('#modalRecipeInstructions li')
//   ).map((li) => li.textContent)

//   // Add title
//   doc.text(recipeName, 10, 10)
//   doc.text(recipeDescription, 10, 20)

//   // Set a smaller font for ingredients
//   doc.setFontSize(14)
//   doc.text('Ingredients:', 10, 30)
//   ingredients.forEach((ingredient, index) => {
//     doc.text(`- ${ingredient}`, 10, 40 + index * 10)
//   })

//   // Set a smaller font for instructions
//   doc.setFontSize(14)
//   doc.text('Instructions:', 10, 40 + ingredients.length * 10 + 10)
//   instructions.forEach((instruction, index) => {
//     doc.text(
//       `${index + 1}. ${instruction}`,
//       10,
//       50 + ingredients.length * 10 + 10 + index * 10
//     )
//   })

//   // Save the PDF
//   doc.save(`${recipeName}.pdf`)
// })

// Print Recipe
// document.getElementById('printButton').addEventListener('click', () => {
//   window.print()
// })

// Download Recipe as PDF
// document.getElementById('downloadButton').addEventListener('click', () => {
//   const recipeContent = document.querySelector('.modal-content').innerHTML
//   const blob = new Blob([recipeContent], { type: 'application/pdf' })
//   const url = URL.createObjectURL(blob)

//   const a = document.createElement('a')
//   a.href = url
//   a.download = `${document.getElementById('modalRecipeName').textContent}.pdf`
//   a.click()
//   URL.revokeObjectURL(url)
// })
