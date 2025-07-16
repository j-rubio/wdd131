export const Avatar = (image, desc, size = 400) => {
  return `
    <picture>
      <source srcset="/public/images/portrait/portrait-${size}.avif" type="image/avif" />
      <source srcset="/public/images/portrait/portrait-${size}.webp" type="image/webp" />
      <img
        src="${image}"
        alt="${desc}"
        class="avatar"
        loading="lazy"
        width="${size}"
        height="${size}"
      />
    </picture>
  `
}
