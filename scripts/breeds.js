import {loadHeaderFooter, saveToStorage } from './utilities.mjs';
import { renderBreeds } from "./renderBreeds.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", async () => {
    const gallery = document.getElementById("breed-gallery");
    const filters = document.getElementById("breed-filters");
    const loadMoreBtn = document.getElementById("load-more");
  
    let breedMap = [];
    let currentIndex = 0;
    const batchSize = 20; // how many breeds to show per load
  
    try {
      const res = await fetch("../matchingBreeds.json");
      breedMap = await res.json();
  
      // Initial render
      loadBatch(breedMap);
  
      // Filter by category
      filters.addEventListener("click", (e) => {
        if (e.target.tagName !== "BUTTON") return;
        const category = e.target.dataset.category;
  
        currentIndex = 0; // reset index
        const filtered = category === "All"
          ? breedMap
          : breedMap.filter(b => b.category === category);
  
        gallery.innerHTML = "";
        loadBatch(filtered);
      });
  
      // Load more button for faster loading response
      loadMoreBtn.addEventListener("click", () => {
        loadBatch(breedMap);
      });
    } catch (err) {
      console.error("Error loading breeds:", err);
      gallery.innerHTML = "<p>Could not load breeds list.</p>";
    }
  
    function loadBatch(list) {
      const nextBatch = list.slice(currentIndex, currentIndex + batchSize);
      renderBreeds(nextBatch, gallery);
      currentIndex += batchSize;
  
      // Hide button if no more breeds
      if (currentIndex >= list.length) {
        loadMoreBtn.style.display = "none";
      } else {
        loadMoreBtn.style.display = "block";
      }
    }
});