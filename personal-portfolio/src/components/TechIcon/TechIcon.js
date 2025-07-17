export const TechIcon = (icon, desc, size = 400) => {
  // const iconName = `${icon}`.split('/')[iconName.length - 4].split('.')[0]
  let iconName = `${icon}`.split('/')
  iconName = iconName[iconName.length - 1].split('.')[0]

  return `
    <figure class="tech-icon" role="listitem">
      <picture>
          <source srcset="/personal-portfolio/assets/icons/tech/${iconName}-${size}.avif" type="image/avif" />
          <source srcset="/personal-portfolio/assets/icons/tech/${iconName}-${size}.webp" type="image/webp" />
          <img
            src="${iconName}"
            alt="${desc}"
            loading="lazy"
            width="${size}"
            height="${size}"
            />
      </picture>
      <figcaption>${desc}</figcaption>
    </figure>`
}
