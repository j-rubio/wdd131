// import './Header.css'
// import { loadStyle } from '../../utils/loadStyle'
// import { loadStyle } from '../../utils/loadStyle'

// loadStyle('./src/components/Header/Header.css')
// loadStyle('./Header.css')

export const Header = () => {
  return `
    <nav>
        <h2>P Parker</h2>
        <ul>
           
                <li>
                    <a href="#" id="homelink">Home</a>
                </li>
                <li>
                    <a href="#" id="techlink">Tech Stack</a>
                </li>
                <li>
                    <a href="#" id="projectslink">Projects</a>
                </li>
         
            
                <li>
                    <a href="#">
                        <img src="./public/icons/github.png" alt="GitHub icon"/>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./public/icons/twitter.png" alt="Twitter icon"/>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./public/icons/linkedin.png" alt="LinkedIn icon"/>
                    </a>
                </li>
           
        </ul>
        <button id="themeBtn">☀️ Light Mode</button>
    </nav>
    `
}

export const changeTheme = () => {
  const themeBtn = document.querySelector('#themeBtn')
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light')
    changeThemeText()
  })
}

const changeThemeText = () => {
  const themeBtn = document.querySelector('#themeBtn')
  if (themeBtn.innerText === '🌑 Dark Mode') {
    themeBtn.innerText = '☀️ Light Mode'
  } else {
    themeBtn.innerText = '🌑 Dark Mode'
  }
}

// export const changeTheme = () => {
//   const themeBtn = document.querySelector("#themeBtn");
//   themeBtn.addEventListener("click", () => {
//     document.body.classList.toggle("light");
//     changeThemeText();
//   });
// };

// const changeThemeText = () => {
//   const themeBtn = document.querySelector("#themeBtn");
//   if (themeBtn.innerText === "Dark Mode 🌑") {
//     themeBtn.innerText = "Light Mode ☀️";
//   } else {
//     themeBtn.innerText = "Dark Mode 🌑";
//   }
// };
