import { Avatar } from '../../components/Avatar/Avatar.js'

/* Home.js */
export const Home = () => {
  const main = document.querySelector('main')
  main.innerHTML = `
    <section class="home" aria-labelledby="home-heading">
      <div class="home-content">
        <h1 id="home-heading">Hi, I'm Julio Rubio</h1>
        <p>
          I’m an Electronic Engineer and Developer passionate about building intuitive, responsive web apps and embedded systems. I blend hardware and software skills to create efficient and impactful tech solutions.
        </p>
        <div class="avatar-container">
          <img src="./public/images/portrait.jpg" alt="Portrait of J Rubio" loading="lazy" />
        </div>
      </div>
    </section>
  `
}
