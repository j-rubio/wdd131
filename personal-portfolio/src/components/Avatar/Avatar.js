// import "./Avatar.css";
// import { loadStyle } from '../../utils/loadStyle'
// loadStyle('./src/components/Avatar/Avatar.css')

export const Avatar = (image, desc) => {
  return `<img src=${image} alt=${desc} class="avatar" />`
}
