// import { BASE_PATH } from '../../utils/constants.js'

// export const Avatar = (filenameBase, alt, size = 200) => {
//   return `
//     <picture>
//       <source srcset="${BASE_PATH}assets/images/${filenameBase}-${size}.avif" type="image/avif" />
//       <source srcset="${BASE_PATH}assets/images/${filenameBase}-${size}.webp" type="image/webp" />
//       <img
//         src="${BASE_PATH}assets/images/${filenameBase}-${size}.webp"
//         alt="${alt}"
//         class="avatar"
//         loading="eager"
//         decoding="async"
//         width="${size}"
//         height="${size}"
//       />
//     </picture>`
// }

// import { BASE_PATH } from '../../utils/constants.js'

// export const Avatar = (filenameBase, alt, size = 200) => {
//   return `
//     <picture>
//       <source srcset="${BASE_PATH}assets/images/${filenameBase}-${size}.avif" type="image/avif" />
//       <source srcset="${BASE_PATH}assets/images/${filenameBase}-${size}.webp" type="image/webp" />
//       <img
//         src="${BASE_PATH}assets/images/${filenameBase}-${size}.webp"
//         alt="${alt}"
//         class="avatar"
//         loading="lazy"
//         decoding="async"
//         width="${size}"
//         height="${size}"
//         role="img"
//         aria-label="${alt}"
//       />
//     </picture>`
// }

import { BASE_PATH } from '../../utils/constants.js'

export const Avatar = (filenameBase, alt, size = 200) => {
  return `
    <picture>
      <source srcset="${BASE_PATH}assets/images/${filenameBase}-${size}.avif" type="image/avif" />
      <source srcset="${BASE_PATH}assets/images/${filenameBase}-${size}.webp" type="image/webp" />
      <img
        src="${BASE_PATH}assets/images/${filenameBase}-${size}.webp"
        alt="${alt}"
        class="avatar"
        loading="lazy"
        decoding="async"
        width="${size}"
        height="${size}"
        role="img"
        aria-label="${alt}"
        style="touch-action: manipulation;"
      />
    </picture>`
}
