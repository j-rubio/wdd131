import { Avatar } from './src/components/Avatar/Avatar.js'

export const Home = () => {
  const main = document.querySelector('main')
  main.innerHTML = `
    <section class="home" aria-labelledby="home-heading">
      <div class="home-content">
        <h1 id="home-heading">Hi, I'm Manu Rubio</h1>
        <p>
          I’m an Electronic Engineer and Developer passionate about building intuitive, responsive web apps and embedded systems.
        </p>

        <div class="logo-container">
          <a href="https://www.google.com">
            <img
              src="./assets/icons/logo/logo-transparent-400.webp"
              alt="Site logo"
              loading="lazy"
              width="64"
              height="64"
            />
          </a>
        </div>

        <div class="avatar-container">
        </div>
          ${Avatar(
            'assets/images/portrait/portrait-400.webp',
            'Portrait of my name'
          )}
        </div>
        </section>`
}

// ${Avatar(
//   './assets/images/portrait/portrait-400.webp',
//   'Portrait of my name'
// )}
