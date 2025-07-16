export const TechIcon = (icon, desc, size = 400) => {
  const iconName = `${icon}`.split('/')[5].split('.')[0]

  return `
    <figure class="tech-icon" role="listitem">
      <picture>
          <source srcset="/public/icons/tech/${iconName}-${size}.avif" type="image/avif" />
          <source srcset="/public/icons/tech/${iconName}-${size}.webp" type="image/webp" />
          <img
            src="${iconName}"
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
