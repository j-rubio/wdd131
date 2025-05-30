const bookReviews = [
  {
    id: 1,
    title: 'Septimus Heap Book One: Magyk',
    date: 'July 5, 2022',
    description:
      'If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.',
    imgSrc: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg',
    imgAlt: 'Magyk book cover',
    ages: '10-14',
    genre: 'Fantasy',
    stars: '⭐⭐⭐⭐'
  },
  {
    id: 2,
    title: 'Magnus Chase Book One: Sword of Summer',
    date: 'December 12, 2021',
    description:
      'Rick Riordan explores Norse mythology in a fast-paced adventure.',
    imgSrc:
      'https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300',
    imgAlt: 'Sword of Summer cover',
    ages: '12-16',
    genre: 'Fantasy',
    stars: '⭐⭐⭐⭐'
  },
  {
    id: 3,
    title: 'Belgariad Book One: Pawn of Prophecy',
    date: 'Feb 12, 2022',
    description:
      'A powerful Orb is stolen and a boy named Garion embarks on an epic quest.',
    imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg',
    imgAlt: 'Pawn of Prophecy cover',
    ages: '12-16',
    genre: 'Fantasy',
    stars: '⭐⭐⭐⭐⭐'
  }
]

const container = document.getElementById('review-list')

function createReviewHTML(book) {
  return `
    <article class="review-entry">
      <div class="review-meta">
        <h2>${book.date}</h2>
        <p>Age: ${book.ages}</p>
        <p>Genre: ${book.genre}</p>
        <p>${book.stars}</p>
      </div>
      <div class="review-content">
        <h2>${book.title}</h2>
        <div>
          <img src="${book.imgSrc}" alt="${book.imgAlt}" />
        </div>
        <p>${book.description} <a href="#">Read more...</a></p>
      </div>
    </article>
  `
}

function loadReviews(data) {
  container.innerHTML = data.map(createReviewHTML).join('')
}

loadReviews(bookReviews)
