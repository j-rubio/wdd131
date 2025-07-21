export const SocialIcon = (href, icon, altText) => {
  return `
    <a href="${href}" target="_blank" rel="noopener noreferrer">
      <img
        src="${icon}"
        alt="${altText}"
        loading="lazy"
        width="32"
        height="32"
        class="social-icon"
      />
    </a>
  `
}
