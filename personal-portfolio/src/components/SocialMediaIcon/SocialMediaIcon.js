export const SocialIcon = (href, icon, altText) => {
  const icon32 = `${icon}`.split('.')[1] + '-32.webp'
  const icon48 = `${icon}`.split('.')[1] + '-48.webp'
  const icon64 = `${icon}`.split('.')[1] + '-64.webp'

  return `<a href="${href}" target="_blank" rel="noopener noreferrer">
      <img src="./${icon}" srcset="./${icon32} 32w, ./${icon48} 48w,./${icon64} 64w"
            sizes="(max-width: 64px) 100vw, 50vw"
            alt="${altText}"
            loading="lazy"
            width="32"
            height="32"                 
        />
    </a>`
}
