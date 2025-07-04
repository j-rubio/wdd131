// import './TechStack.css'
// import { loadStyle } from '../../utils/loadStyle'
// loadStyle('./src/pages/TechStack/TechStack.css')
// import TechIcon from './src/components/TechIcon/TechIcon.js'
// import techIconData from './src/utils/techIconData.js'
// import { TechIcon } from '../../components/TechIcon/TechIcon.js'
// import { techIconData } from '../../utils/techIconData.js'

// export const TechStack = () => {
//   const main = document.querySelector('main')
//   main.innerHTML = `
//   <section class="tech">
//     <h2>My Tech Stack</h2>
//     <h3>Technologies I’ve been working with recently</h3>
//     <article>
//       ${techIconData.map((el) => TechIcon(el.icon, el.desc)).join('')}
//     </article>
//   </section>
//     `
// }

import { TechIcon } from '../../components/TechIcon/TechIcon.js'
import { techIconData } from '../../utils/techIconData.js'

export const TechStack = () => {
  const main = document.querySelector('main')
  main.innerHTML = `
    <section class="tech">
      <h2>My Tech Stack</h2>
      <h3>Technologies I’ve been working with recently</h3>
      <article>
        ${techIconData.map((el) => TechIcon(el.icon, el.desc)).join('')}
      </article>
    </section>
  `
}
