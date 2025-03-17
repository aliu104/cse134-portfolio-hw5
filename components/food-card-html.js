// my-component-html.js
export function getMyComponentHTML(title, imgSrc, imgAlt, description, link) {
  return `
    <section class="food-card">
      <picture class="food-card-img">
          <img src="${imgSrc}" alt="${imgAlt}">
      </picture>
      <section class="food-info">
          <h2>${title}</h2>
          <p>${description}</p>
          <a href="${link}" target="_blank">Restaurant Link</a>
      </section>
    </section>
  `;
}
