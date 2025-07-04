import { loadStyle } from './src/utils/loadStyle.js'
loadStyle('./style.css')
loadStyle('./src/components/Header/Header.css')
loadStyle('./src/components/Footer/Footer.css')
loadStyle('./src/components/Avatar/Avatar.css')
loadStyle('./src/pages/Home/Home.css')
loadStyle('./src/pages/TechStack/TechStack.css')
loadStyle('./src/pages/Projects/Projects.css')

import { Header } from './src/components/Header/Header.js'
import { Footer } from './src/components/Footer/Footer.js'

import { Home } from './src/pages/Home/Home.js'
import { TechStack } from './src/pages/TechStack/TechStack.js'

import { Projects } from './src/pages/Projects/Projects.js'

import { linkPage } from './src/utils/linkpage.js'
import { changeTheme } from './src/components/Header/Header.js'

// import { HambMenu } from './src/components/HambMenu/HambMenu.js'
loadStyle('./src/components/HambMenu/HambMenu.css')

document.querySelector('header').innerHTML = Header()

//Checking if the component is injected.
console.log(document.querySelector('.hamburger-menu')) // should log the element

changeTheme()

document.querySelector('footer').innerHTML = Footer()

Home()

linkPage('#mobile-homelink', Home)
linkPage('#mobile-techlink', TechStack)
linkPage('#mobile-projectslink', Projects)

const mobileLinks = [
  '#mobile-homelink',
  '#mobile-techlink',
  '#mobile-projectslink'
]
mobileLinks.forEach((id) => {
  document.querySelector(id)?.addEventListener('click', () => {
    document.querySelector('.hamburger-menu input').checked = false
  })
})

// linkPage('#homelink', Home)
// linkPage('#techlink', TechStack)
// linkPage('#projectslink', Projects)

// console.log('✅ JS is loading')

// document.querySelector('main').innerHTML = `
//   <h1>Hello from JavaScript</h1>
//   <p>If you see this, the script is running correctly.</p>
// `
