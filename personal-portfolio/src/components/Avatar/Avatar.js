// export const Avatar = (image, desc, size = 400) => {
//   return `
//     <picture>
//       <source srcset="./assets/images/portrait/portrait-${size}.avif" type="image/avif" />
//       <source srcset="./assets/images/portrait/portrait-${size}.webp" type="image/webp" />
//       <img
//         src="${image}"
//         alt="${desc}"
//         class="avatar"
//         loading="lazy"
//         width="${size}"
//         height="${size}"
//       />
//     </picture>
//   `
// }
// import { BASE_PATH } from '/src/utils/constants.js'
import { BASE_PATH } from '../../utils/constants.js'

export const Avatar = (imageName, desc, size = 400) => {
  const filename = imageName.replace(/^\.\/|^\//, '') // Remove ./ or / prefix

  return `
    <picture>
      <source srcset="${BASE_PATH}assets/images/portrait-${size}.avif" type="image/avif" />
      <source srcset="${BASE_PATH}assets/images/portrait-${size}.webp" type="image/webp" />
      <img
        src="${BASE_PATH}${filename}"
        alt="${desc}"
        class="avatar"
        loading="lazy"
        width="${size}"
        height="${size}"
      />
    </picture>
  `
}
