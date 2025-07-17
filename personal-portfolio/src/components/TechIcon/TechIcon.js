// export const TechIcon = (icon, desc, size = 400) => {

//   let iconName = `${icon}`.split('/')
//   iconName = iconName[iconName.length - 1].split('.')[0]

//   return `
//     <figure class="tech-icon" role="listitem">
//       <picture>
//           <source srcset="/src/assets/icons/tech/${iconName}-${size}.avif" type="image/avif" />
//           <source srcset="./assets/icons/tech/${iconName}-${size}.webp" type="image/webp" />
//           <img
//             src="${iconName}"
//             alt="${desc}"
//             loading="lazy"
//             width="${size}"
//             height="${size}"
//             />
//       </picture>
//       <figcaption>${desc}</figcaption>
//     </figure>`
// }
import { BASE_PATH } from '../../utils/constants.js'

export const TechIcon = (icon, desc, size = 400) => {
  let iconName = `${icon}`.split('/')
  iconName = iconName[iconName.length - 1].split('.')[0]

  return `
    <figure class="tech-icon" role="listitem">
      <picture>
        <source srcset="${BASE_PATH}assets/tech/${iconName}-${size}.avif" type="image/avif" />
        <source srcset="${BASE_PATH}assets/tech/${iconName}-${size}.webp" type="image/webp" />
        <img
          src="${BASE_PATH}assets/tech/${iconName}.png"
          alt="${desc}"
          loading="lazy"
          width="${size}"
          height="${size}"
        />
      </picture>
      <figcaption>${desc}</figcaption>
    </figure>
  `
}
