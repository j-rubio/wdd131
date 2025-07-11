export const SocialIcon = (href, icon, altText) => {
  return `
    <a href="${href}" target="_blank" rel="noopener noreferrer">
      <img class="social-icon" src="${icon}" alt="${altText}" />
    </a>
  `
}
