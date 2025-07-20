import { BASE_PATH } from '../../utils/constants.js'
import { Avatar } from '../../components/Avatar/Avatar.js'

export const Home = () => {
  const main = document.querySelector('main')
  main.innerHTML = `
    <section class="home" aria-labelledby="home-heading">
      <div class="home-content">
        <h1 id="home-heading">Hi, I'm Julio Rubio</h1>
        <p>
          I’m an Electronic Engineer and Developer passionate about building intuitive, responsive web apps and embedded systems.
        </p>        
        <div class="avatar-container">
        ${Avatar(
          `${BASE_PATH}assets/images/portrait-200.avif`,
          'Portrait of J Rubio'
        )}
          </div>
          </div>
          </section>`
}
