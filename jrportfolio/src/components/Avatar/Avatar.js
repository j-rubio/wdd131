import { BASE_PATH } from '../../utils/constants.js'

/**
 * Returns an accessible, responsive avatar component.
 *
 * @param {string} imagePath - Relative path to fallback image (e.g., "assets/images/portrait-200.avif").
 * @param {string} alt - Alternative text for accessibility.
 * @param {number} size - Width/height in pixels (default 200).
 */
export const Avatar = (imagePath, alt = 'Avatar', size = 200) => {
  const filename = imagePath.replace(/^\.\/|^\//, '') // sanitize leading './' or '/' if present
  const base = `${BASE_PATH}assets/images/portrait-${size}`

  return `
    <picture class="avatar-container" style="width:${size}px;height:${size}px;">
      <source srcset="${base}.avif" type="image/avif" />
      <source srcset="${base}.webp" type="image/webp" />
      <img
        src="${BASE_PATH}${filename}"
        alt="${alt}"
        class="avatar"
        loading="eager"
        decoding="async"
        width="${size}"
        height="${size}"
      />
    </picture>
  `
}
