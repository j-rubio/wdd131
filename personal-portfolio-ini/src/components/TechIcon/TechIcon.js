// import "./TechIcon.css";
// import { loadStyle } from '../../utils/loadStyle'
// loadStyle('./src/components/TechIcon/TechIcon.css')

export const TechIcon = (icon, desc) => {
  return `
    <img class="tech-icon" src=${icon} alt=${desc} />
    `
}
