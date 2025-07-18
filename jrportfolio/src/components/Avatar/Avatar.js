import { BASE_PATH } from '../../utils/constants.js'

export const Avatar = (imageName, desc, size = 200) => {
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
