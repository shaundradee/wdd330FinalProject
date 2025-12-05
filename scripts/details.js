import {loadHeaderFooter, initMenuToggle, breedDetailTemplate} from './utilities.mjs';

loadHeaderFooter();
initMenuToggle();

// import {getBreedById} from './api.mjs';

// const breedId = new URLSearchParams(window.location.search).get('id');

document.addEventListener("DOMContentLoaded", () => {
    loadHeaderFooter();
});