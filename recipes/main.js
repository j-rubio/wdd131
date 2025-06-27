import recipes from './recipes.mjs'

function randomNumber(upperLimit) {
  return Math.floor(Math.random() * upperLimit)
}

function getRandomListEntry(list) {
  const listLength = list.length
  const randomNum = randomNumber(listLength)
  return list[randomNum]
}

function recipeTemplate(recipe) {
  return `<section class="recipe">
          <img
            src="${recipe.image}" alt="${recipe.description}"
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
  // loop through the tags list and transform the strings to HTML
  let html = ''
  tags.forEach((element) => {
    html += `<div>${element}</div>`
  })
  return html
}

function ratingTemplate(rating) {
  // begin building an html string using the ratings HTML written earlier as a model.
  let html = `<span
	class="rating"
	role="img"
	aria-label="Rating: ${rating} out of 5 stars"
>`
  // our ratings are always out of 5, so create a for loop from 1 to 5
  for (let i = 1; i < 6; i++) {
    // check to see if the current index of the loop is less than our rating
    // if so then output a filled star
    if (i <= rating) {
      html += `<span aria-hidden="true" class="icon-star">⭐</span>`
    } // else output an empty star
    else {
      html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`
    }
  }
  // after the loop, add the closing tag to our string
  html += `</span>`
  // return the html string
  return html
}

function renderRecipes(recipeList) {
  // get the element we will output the recipes into
  const recipesHolder = document.querySelector('.recipes')

  // use the recipeTemplate function to transform our recipe objects into recipe HTML strings
  const html = recipeList.map(recipeTemplate).join('')

  // Set the HTML strings as the innerHTML of our output element.
  recipesHolder.innerHTML = html
}

function init() {
  // get a random recipe
  const recipe = getRandomListEntry(recipes)
  // render the recipe with renderRecipes.
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

buttonSearch.addEventListener('click', searchHandler)
