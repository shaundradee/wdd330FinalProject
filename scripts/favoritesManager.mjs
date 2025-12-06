import { getFromStorage, saveToStorage } from "./utilities.mjs";

// 
// Check if a breed is in favorites
// @param {object} breed - Breed object { ceo_format, standard_format, category }
// @returns {boolean}
//
export function isFavorite(breed) {
  const favorites = getFromStorage("favorites") || [];
  return favorites.some(f => f.ceo_format === breed.ceo_format);
}

/**
 * Toggle a breed in favorites
 * @param {object} breed - Breed object
 * @returns {boolean} - New favorite state (true if added, false if removed)
 */
export function toggleFavorite(breed) {
  let favorites = getFromStorage("favorites") || [];
  const exists = favorites.some(f => f.ceo_format === breed.ceo_format);

  if (exists) {
    favorites = favorites.filter(f => f.ceo_format !== breed.ceo_format);
    saveToStorage("favorites", favorites);
    return false;
  } else {
    favorites.push(breed);
    saveToStorage("favorites", favorites);
    return true;
  }
}

/**
 * Get/render the correct SVG icon based on favorite state
 * @param {boolean} isFav - true if saved, false if not
 * @returns {string} - SVG markup
 */
export function getFavoriteIcon(isFav) {
    return isFav
      ? `<img class="saved-icon" src="/images/heart_paw_faves.svg" alt="saved to favorites" height="30" width="30" />`
      : `<img class="unsaved-icon" src="/images/heart_paw.svg" alt="save to favorites" height="30" width="30" />`;
}


/**
 * Clear all favorites
 */
export function clearFavorites() {
    saveToStorage("favorites", []);
}