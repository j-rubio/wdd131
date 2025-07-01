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
            loading="lazy"
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
  const html = recipeList.map(recipeTemplate).join('')
  recipesHolder.innerHTML = html
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
