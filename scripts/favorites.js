import {loadHeaderFooter, getFromStorage } from './utilities.mjs';
import { renderBreeds } from "./renderBreeds.mjs";
import { clearFavorites } from "./favoritesManager.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("favorites-gallery");
    const clearBtn = document.getElementById("clear-favorites");

    let favorites = getFromStorage("favorites") || [];

    function displayFavorites() {
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
});