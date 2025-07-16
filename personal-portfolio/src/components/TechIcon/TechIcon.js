// export const TechIcon = (icon, desc) => {
//   return `
//     <figure class="tech-icon" role="listitem">
//       <img src="${icon}" alt="${desc}" loading="lazy" />
//       <figcaption>${desc}</figcaption>
//     </figure>
//   `
// }
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

// class="avatar"

// <img src="./${icon}" srcset="./${icon32} 32w, ./${icon48} 48w,./${icon64} 64w"
//       sizes="(max-width: 64px) 100vw, 50vw"
//       alt="${desc}"
//       loading="lazy"
//       width="64"
//       height="64"
//     />
