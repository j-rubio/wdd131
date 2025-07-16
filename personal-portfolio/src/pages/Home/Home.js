import { Avatar } from '../../components/Avatar/Avatar.js'
import { SocialIcon } from '../../components/SocialMediaIcon/SocialMediaIcon.js'

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
        <div class="logo-container">
        <a href="https://www.google.com">
          <img src="./public/icons/logo-transparent-64.webp" srcset="./public/icons/logo-transparent-32.webp 400w, ./public/icons/logo-transparent-48.webp 800w,./public/icons/logo-transparent-64.webp 1200w"
            sizes="(max-width: 600px) 100vw, 50vw"
            alt="Portrait of Manu Rubio"
            loading="lazy"
            width="64"
            height="64"
            />
          </a>
        </div>
        <div class="avatar-container">
          <img src="./public/images/portrait-400.webp" srcset="./public/images/portrait-400.webp 400w, ./public/images/portrait-800.webp 800w,./public/images/portrait-1200.webp 1200w"
            sizes="(max-width: 600px) 100vw, 50vw"
            alt="Portrait of Manu Rubio"
            loading="lazy"
            width="400"
            height="400"
          />
        </div>
      </div>
    </section>
        `
}

// <img src="./public/images/portrait.jpg" alt="Portrait of J Rubio" loading="lazy" />
