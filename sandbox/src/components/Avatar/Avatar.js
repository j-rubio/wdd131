import { BASE_PATH } from '../../utils/constants.js'
export const Avatar = (imageName, desc, size = 150) => {
  const filename = imageName.replace(/^\.\/|^\//, '')

  //   return `
  //     <div class="avatar-wrapper" style="width: ${size}px; height: ${size}px;">
  //       <picture>
  //         <source srcset="${BASE_PATH}assets/images/portrait-${size}.avif" type="image/avif" />
  //         <source srcset="${BASE_PATH}assets/images/portrait-${size}.webp" type="image/webp" />
  //         <img
  //           src="${BASE_PATH}${filename}"
  //           alt="${desc}"
  //           class="avatar"
  //           loading="eager"
  //           decoding="async"
  //           width="${size}"
  //           height="${size}"
  //         />
  //       </picture>
  //     </div>
  //   `
  // }
  return `
      <picture>
        <source srcset="${BASE_PATH}assets/images/portrait-${size}.avif" type="image/avif" />
        <source srcset="${BASE_PATH}assets/images/portrait-${size}.webp" type="image/webp" />
        <img
          src="${BASE_PATH}${filename}"
          alt="${desc}"
          class="avatar"
          loading="eager"
          decoding="async"
          width="${size}"
          height="${size}"
        />
      </picture>    
  `
}
