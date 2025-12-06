import { formatCeoPath, saveToStorage } from "./utilities.mjs";
import { isFavorite, toggleFavorite, getFavoriteIcon } from "./favoritesManager.mjs";

export function renderBreeds(breeds, container) {
  container.innerHTML = "";

  breeds.forEach(breed => {
    const card = document.createElement("div");
    card.classList.add("breed-card");

    // Wrapper for thumbnail + blurred background
    const wrapper = document.createElement("div");
    wrapper.classList.add("thumb-wrapper");

    const img = document.createElement("img");
    img.alt = breed.standard_format;
    img.classList.add("breed-thumb");

    // Fetch random image
    const ceoPath = formatCeoPath(breed.ceo_format);
    fetch(`https://dog.ceo/api/breed/${ceoPath}/images/random`)
      .then(res => res.json())
      .then(data => {
        img.src = data.message;
        // Set blurred background dynamically
        wrapper.style.setProperty("--thumb-url", `url(${data.message})`);
      })
      .catch(() => {
        img.src = "fallback.jpg";
        wrapper.style.setProperty("--thumb-url", "url(fallback.jpg)");
      });

    // Info
    const name = document.createElement("h3");
    name.textContent = breed.standard_format;

    const category = document.createElement("p");
    category.textContent = breed.category;

    // Favorites icon
    const favIcon = document.createElement("span");
    favIcon.classList.add("favorite-icon");

    let favState = isFavorite(breed);
    favIcon.innerHTML = getFavoriteIcon(favState);

    favIcon.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent triggering card click
      favState = toggleFavorite(breed);
      favIcon.innerHTML = getFavoriteIcon(favState);
    });

    // Card click to go to details page
    card.addEventListener("click", () => {
      saveToStorage("spotlightBreed", breed);
      window.location.href = "details.html";
    });

    // Assemble card
    wrapper.appendChild(img);
    card.append(wrapper, name, category, favIcon);
    container.appendChild(card);
  });
}
