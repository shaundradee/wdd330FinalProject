import {loadHeaderFooter, initMenuToggle, breedDetailTemplate} from './utilities.mjs';

loadHeaderFooter();
initMenuToggle();

// import {getBreedById} from './api.mjs';

// const breedId = new URLSearchParams(window.location.search).get('id');

document.addEventListener("DOMContentLoaded", () => {
    loadHeaderFooter();
});

import { getFromStorage } from "./utilities.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const breed = getFromStorage("spotlightBreed"); // stored in homepage
  const title = document.getElementById("breed-title");
  const image = document.getElementById("breed-image");
  const info = document.getElementById("breed-info");

  if (!breed) {
    title.textContent = "No breed selected.";
    return;
  }

  title.textContent = breed;

  try {
    // 1. Fetch image from Dog CEO
    const imgRes = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const imgData = await imgRes.json();
    image.src = imgData.message;
    image.alt = `Image of a ${breed}`;

    // 2. Fetch details from Dog API
    const detailsRes = await fetch("https://dogapi.dog/api/v2/breeds");
    const detailsData = await detailsRes.json();

    // Find the breed object by name
    const breedDetails = detailsData.data.find(
      (b) => b.attributes.name.toLowerCase() === breed.toLowerCase()
    );

    if (breedDetails) {
      const attrs = breedDetails.attributes;
      info.innerHTML = `
        <p><strong>Description:</strong> ${attrs.description}</p>
        <p><strong>Life span:</strong> ${attrs.life.min}–${attrs.life.max} years</p>
        <p><strong>Male weight:</strong> ${attrs.male_weight.min}–${attrs.male_weight.max} kg</p>
        <p><strong>Female weight:</strong> ${attrs.female_weight.min}–${attrs.female_weight.max} kg</p>
        <p><strong>Hypoallergenic:</strong> ${attrs.hypoallergenic ? "Yes" : "No"}</p>
      `;
    } else {
      info.textContent = "Breed details not found.";
    }
  } catch (err) {
    console.error(err);
    info.textContent = "Couldn't load breed details. Please try again later.";
  }
});
