import { Avatar } from '../../components/Avatar/Avatar.js'

// export const Home = () => {
//   const main = document.querySelector('main')
//   main.innerHTML = `
//     <section class="home">
//         <div id="div-video">
//             <video class="myVideo" autoplay muted loop playsinline aria-hidden="true">
//                 <source src="./public/videos/waterfall.mp4" type="video/mp4" />
//             </video>
//         </div>
//         <div id="div-text">
//             <h2>
//             Hi 👋🏻, My name is <span>Julio Rubio</span>
//             </h2>
//             <h2>I build things for web</h2>
//         </div>
//         <div id="div-avatar">
//         ${Avatar('./public/images/portrait.jpg', 'J Rubio Portrait')}
//         </div>
//     </section>
//     `
// }
export const Home = () => {
  const main = document.querySelector('main')
  main.innerHTML = `
    <section class="home">
        <div id="div-video">
           
        </div>
        <div id="div-text">
            <h2>
            Hi 👋🏻, My name is <span>J Rubio</span>
            </h2>
            <h2>I build things for web</h2>
        </div>
        <div id="div-avatar">
        ${Avatar('./public/images/portrait.jpg', 'J Rubio Portrait')}
        </div>
    </section>
    `
}
