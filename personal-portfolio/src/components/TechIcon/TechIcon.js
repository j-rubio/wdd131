export const TechIcon = (icon, desc) => {
  return `
    <figure class="tech-icon" role="listitem">
      <img src="${icon}" alt="${desc}" loading="lazy" />
      <figcaption>${desc}</figcaption>
    </figure>
  `
}
