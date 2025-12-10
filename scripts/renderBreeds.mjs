import { formatCeoPath, saveToStorage, getFromStorage } from "./utilities.mjs";
import { isFavorite, toggleFavorite, getFavoriteIcon } from "./favoritesManager.mjs";

export function renderBreeds(breeds, container, options = {}) {
  if (!options.append) {
    container.innerHTML = ""; // only clear if not appending
  }

  breeds.forEach(breed => {
    const card = document.createElement("div");
    card.classList.add("breed-card");
    card.dataset.ceo_format = breed.ceo_format;   // <-- data attribute for identification

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
        img.src = "../images/fallback.webp";
        wrapper.style.setProperty("--thumb-url", "url('../images/fallback.webp')");
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
      const newState = toggleFavorite(breed);
      favIcon.innerHTML = getFavoriteIcon(newState);
    
      // If we are on the favorites page and the breed was removed
      if (!newState && window.location.pathname.includes("favorites.html")) {
        card.classList.add("fade-out");
        card.addEventListener("transitionend", () => {
          card.remove();
    
          // If no favorites left, show empty message
          const favorites = getFromStorage("favorites") || [];
          if (favorites.length === 0) {
            container.innerHTML = "<p>You have no favorites saved yet.</p>";
          }
        }, { once: true });
      }
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
