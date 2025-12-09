import {loadHeaderFooter, getFromStorage } from './utilities.mjs';
import { renderBreeds } from "./renderBreeds.mjs";
import { clearFavorites, toggleFavorite } from "./favoritesManager.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("favorites-gallery");
    const clearBtn = document.getElementById("clear-favorites");

    let favorites = getFromStorage("favorites") || [];

    function displayFavorites() {
        favorites = getFromStorage("favorites") || [];
        if (favorites.length > 0) {
            renderBreeds(favorites, gallery);
        } else {
            gallery.innerHTML = "<p>You have no favorites saved yet.</p>";
        }
    }

    // Initial render
    displayFavorites();

    // Clear all favorites
    clearBtn.addEventListener("click", () => {
        clearFavorites();
        favorites = [];
        displayFavorites();
    });

    // Listen for unsave clicks inside the gallery
    gallery.addEventListener("click", (e) => {
        const icon = e.target.closest(".saved-icon, .unsaved-icon");
        if (!icon) return;
    
        const card = e.target.closest(".breed-card");
        if (!card) return;
    
        const ceo_format = card.dataset.ceo_format;
        const breed = favorites.find(f => f.ceo_format === ceo_format);
    
        if (breed) {
            const newState = toggleFavorite(breed);
            if (!newState) {
                // Apply fade-out animation
                card.classList.add("fade-out");
    
                // Wait for animation to finish before re-render
                card.addEventListener("transitionend", () => {
                    displayFavorites();
                }, { once: true });
            }
        }
    });
});
