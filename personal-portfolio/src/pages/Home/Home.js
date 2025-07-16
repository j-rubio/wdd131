// import { Avatar } from '/src/components/Avatar/Avatar.js'
// import { SocialIcon } from '/src/components/SocialMediaIcon/SocialMediaIcon.js'

/* Home.js */
// export const Home = () => {
//   const main = document.querySelector('main')
//   main.innerHTML = `
//     <section class="home" aria-labelledby="home-heading">
//       <div class="home-content">

//         <h1 id="home-heading">Hi, I'm my-name</h1>
//         <p>
//           I’m an Electronic Engineer and Developer passionate about building intuitive, responsive web apps and embedded systems. I blend hardware and software skills to create efficient and impactful tech solutions.
//         </p>
//         <div class="logo-container">
//         <a href="https://www.google.com">
//           <img src="./public/icons/logo-transparent-64.webp" srcset="./public/icons/logo-transparent-32.webp 400w, ./public/icons/logo-transparent-48.webp 800w,./public/icons/logo-transparent-64.webp 1200w"
//             sizes="(max-width: 600px) 100vw, 50vw"
//             alt="Portrait of my-name"
//             loading="lazy"
//             width="64"
//             height="64"
//             />
//           </a>
//         </div>
//         <div class="avatar-container">
//           <img src="./public/images/portrait-400.webp" srcset="./public/images/portrait-400.webp 400w, ./public/images/portrait-800.webp 800w,./public/images/portrait-1200.webp 1200w"
//             sizes="(max-width: 600px) 100vw, 50vw"
//             alt="Portrait of my-name"
//             loading="lazy"
//             width="400"
//             height="400"
//           />
//         </div>
//       </div>
//     </section>
//         `
// }
// Home.js
// console.log('🏠 Home component loaded')
// import { techIconData } from '/src/data/techIconData.js'
// import { techIconData } from '/src/utils/techIconData.js'
// import { Avatar } from '/src/components/Avatar/Avatar.js'
// import { SocialIcon } from '/src/components/SocialMediaIcon/SocialMediaIcon.js'

// Generate social icons
// const socialIcons = techIconData
//   .map((icon) => SocialIcon(icon.url, icon.icon, icon.alt))
//   .join('')

// export const Home = () => {
//   const main = document.querySelector('main')
//   main.innerHTML = `
//     <section class="home" aria-labelledby="home-heading">
//       <div class="home-content">
//         <h1 id="home-heading">Hi, I'm Manu Rubio</h1>
//         <p>
//           I’m an Electronic Engineer and Developer passionate about building intuitive, responsive web apps and embedded systems.
//         </p>

//         <div class="logo-container">
//           <a href="https://www.google.com">
//             <img
//               src="/public/icons/logo/logo-transparent-400.webp"
//               alt="Site logo"
//               loading="lazy"
//               width="64"
//               height="64"
//             />
//           </a>
//         </div>

//         <div class="avatar-container">
//           ${Avatar(
//             '/public/images/portrait/portrait-400.webp',
//             'Portrait of Manu Rubio'
//           )}
//         </div>

//         <div class="social-container">
//           ${socialIcons}
//         </div>
//       </div>
//     </section>
//   `
// }
// console.log('🏠 Home component loaded')
// import { techIconData } from '/src/data/techIconData.js'
// import { techIconData } from '/src/utils/techIconData.js'
import { Avatar } from '/src/components/Avatar/Avatar.js'
// import { SocialIcon } from '/src/components/SocialMediaIcon/SocialMediaIcon.js'

// Generate social icons
// const socialIcons = techIconData
//   .map((icon) => SocialIcon(icon.url, icon.icon, icon.alt))
//   .join('')

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
              src="/public/icons/logo/logo-transparent-400.webp"
              alt="Site logo"
              loading="lazy"
              width="64"
              height="64"
            />
          </a>
        </div>

        <div class="avatar-container">
          ${Avatar(
            '/public/images/portrait/portrait-400.webp',
            'Portrait of Manu Rubio'
          )}
        </div>

        </div>
        </section>
        `
}

// <div class="social-container">
//   ${socialIcons}
// </div>
