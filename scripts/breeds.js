import { loadHeaderFooter } from './utilities.mjs';
import { renderBreeds } from "./renderBreeds.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", async () => {
  const gallery = document.getElementById("breed-gallery");
  const filters = document.getElementById("breed-filters");

  let breedMap = [];
  let currentIndex = 0;
  const batchSize = 10; // smaller batch size for smoother lazy load
  let activeList = [];  // current filtered list
  let observer;         // intersection observer reference
  let isLoading = false; // prevent race conditions during lazy load

  try {
    const res = await fetch("../matchingBreeds.json");
    breedMap = await res.json();
    activeList = breedMap;

    // Initial render
    setupSentinel();
    loadBatch(activeList);

    // Filter by category or coat type
    filters.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") return;

      const category = e.target.dataset.category;
      const coat = e.target.dataset.coat;

      currentIndex = 0;
      isLoading = false; // reset loading flag for filter change

      if (category) {
        activeList = category === "All"
          ? breedMap
          : breedMap.filter(b => b.category === category);
      } else if (coat) {
        activeList = breedMap.filter(b => b.coat_type === coat);
      }

      // Clear gallery
      gallery.innerHTML = "";

      // Reset sentinel
      resetSentinel();

      // Load first batch of filtered list
      loadBatch(activeList);
    });

  } catch (err) {
    console.error("Error loading breeds:", err);
    gallery.innerHTML = "<p>Could not load breeds list.</p>";
  }

  function showSpinner() {
    const spinner = document.getElementById("loading-spinner");
    if (spinner) spinner.style.display = "block";
  }
  
  function hideSpinner() {
    const spinner = document.getElementById("loading-spinner");
    if (spinner) spinner.style.display = "none";
  }

  function loadBatch(list) {
    if (currentIndex >= list.length || isLoading) return;

    isLoading = true; // prevent overlapping loads
    showSpinner();

    setTimeout(() => {
      const nextBatch = list.slice(currentIndex, currentIndex + batchSize);

      // Append instead of replacing
      renderBreeds(nextBatch, gallery, { append: true });

      currentIndex += batchSize;
      isLoading = false; // reset loading flag
      hideSpinner();

      // Stop observing if no more breeds
      if (currentIndex >= list.length) {
        const sentinel = document.getElementById("sentinel");
        if (sentinel) sentinel.remove();
        if (observer) observer.disconnect();
      }
    }, 300);
  }

  function setupSentinel() {
    let sentinel = document.getElementById("sentinel");
    if (!sentinel) {
      sentinel = document.createElement("div");
      sentinel.id = "sentinel";
      gallery.after(sentinel);
    }

    observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadBatch(activeList);
      }
    });
    observer.observe(sentinel);
  }

  function resetSentinel() {
    // Remove old sentinel if exists
    let sentinel = document.getElementById("sentinel");
    if (sentinel) sentinel.remove();
    if (observer) observer.disconnect();

    // Create new sentinel
    setupSentinel();
  }
});
