// import './Home.css'
// import { loadStyle } from '../../utils/loadStyle.js'
// loadStyle('./src/pages/Home/Home.css')
import { Avatar } from '../../components/Avatar/Avatar.js'

// export const Home = () => {
//   const main = document.querySelector('main')
//   main.innerHTML = `
//     <section class="home">
//         <video class="myVideo" autoplay muted loop>
//             <source src="/videos/waterfall.mp4">
//         </video>
//     </section>
//     `
// }

// export const Home = () => {
//   const main = document.querySelector("main");
//   main.innerHTML = `
//     <section class="home">
//         <video class="myVideo" autoplay muted loop>
//             <source src="/videos/waterfall.mp4">
//         </video>
//         <h2 id="greeting">hi 👋🏻,</2>
//         <h2 id="name"> I'm <span>Manu Rubio</span></h2>
//         <h2 id="mision-statement">And I make Your Business Thrive</h2>
//         ${Avatar("/images/portrait.jpg", "Manu Rubio Portrait")}
//     </section>
//     `;
// };

export const Home = () => {
  const main = document.querySelector('main')
  main.innerHTML = `
    <section class="home">
        <div id="div-video">
            <video class="myVideo" autoplay muted loop playsinline aria-hidden="true">
                <source src="./public/videos/waterfall.mp4" type="video/mp4" />
            </video>
        </div>
        <div id="div-text">
            <h2>
            Hi 👋🏻, My name is <span>Peter Parker</span>
            </h2>
            <h2>I build things for web</h2>
        </div>
        <div id="div-avatar">
        ${Avatar('./public/images/portrait.jpg', 'Peter Parker Portrait')}
        </div>
    </section>
    `
}
