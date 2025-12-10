import { loadHeaderFooter, getFromStorage, formatCeoPath, buildBreedDetailsCard } from './utilities.mjs';
import { isFavorite, toggleFavorite, getFavoriteIcon } from "./favoritesManager.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", async () => {
  const breed = getFromStorage("spotlightBreed");
  const title = document.getElementById("breed-title");
  const image = document.getElementById("breed-image");
  const info = document.getElementById("breed-info");
  const favIcon = document.getElementById("favorite-icon");

  if (!breed) {
    title.textContent = "No breed selected.";
    return;
  }
  

  const { ceo_format, standard_format } = breed;
  title.textContent = standard_format;

  // Favorites icon setup
  let favState = isFavorite(breed);
  favIcon.innerHTML = getFavoriteIcon(favState);
  favIcon.addEventListener("click", () => {
    favState = toggleFavorite(breed);
    favIcon.innerHTML = getFavoriteIcon(favState);
  });

  try {
    // Dog API details
    const detailsRes = await fetch("https://dogapi.dog/api/v2/breeds?page[size]=1000");
    const detailsData = await detailsRes.json();
    const match = detailsData.data.find(
      b => b.attributes.name.toLowerCase() === standard_format.toLowerCase()
    );

    if (match) {
      info.innerHTML = buildBreedDetailsCard(match.attributes);
    } else {
      info.textContent = "Breed details not found.";
    }
  } catch (err) {
    console.error(err);
    info.textContent = "Couldn't load breed details. Please try again later.";
  }

  // Carousel effect: refresh image every 5 seconds
  const ceoPath = formatCeoPath(ceo_format);

  async function loadRandomImage() {
    try {
      // Add ripple class before updating src
      image.classList.remove("ripple"); // reset
      void image.offsetWidth; // force reflow so animation restarts
  
      const imgRes = await fetch(`https://dog.ceo/api/breed/${ceoPath}/images/random`);
      const imgData = await imgRes.json();
      image.src = imgData.message;
      image.alt = `Image of a ${standard_format}`;
  
      // Trigger ripple animation
      image.classList.add("ripple");
    } catch (err) {
      console.error("Error loading image:", err);
    }
  }

  // Initial image
  loadRandomImage();

  // Silent reload every 5 seconds
  const carouselInterval = setInterval(loadRandomImage, 5000);

  //Clean up interval when leaving page to prevent memory leak
  window.addEventListener("beforeunload", () =>{
    clearInterval(carouselInterval);
  });

});
