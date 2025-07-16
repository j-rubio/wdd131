// export const TechIcon = (icon, desc) => {
//   return `
//     <figure class="tech-icon" role="listitem">
//       <img src="${icon}" alt="${desc}" loading="lazy" />
//       <figcaption>${desc}</figcaption>
//     </figure>
//   `
// }
export const TechIcon = (icon, desc) => {
  const icon32 = `${icon}`.split('.')[1] + '-32.webp'
  const icon48 = `${icon}`.split('.')[1] + '-48.webp'
  const icon64 = `${icon}`.split('.')[1] + '-64.webp'

  return `
    <figure class="tech-icon" role="listitem">
      <img src="./${icon}" srcset="./${icon32} 32w, ./${icon48} 48w,./${icon64} 64w"
            sizes="(max-width: 64px) 100vw, 50vw"
            alt="${desc}"
            loading="lazy"
            width="64"
            height="64"
          />   
      <figcaption>${desc}</figcaption>
    </figure>
  `
}

// sharp -i linkedin.png -o ./linkedin-32.webp -f webp resize 32
// sharp -i linkedin.png -o ./linkedin-48.webp -f webp resize 48
// sharp -i linkedin.png -o ./linkedin-64.webp -f webp resize 64
