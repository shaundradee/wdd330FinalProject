import { initMenuToggle } from "./utilities.mjs";
import { initNewsletter, initSpotlight } from "./homepage.mjs";

// Initialize newsletter form functionality
initNewsletter();
// Initialize menu toggle functionality
initMenuToggle();
// Initialize spotlight functionality
initSpotlight();


const currentYear = new Date().getFullYear();
const yearElement = document.getElementById("currentyear");
if (yearElement) {
    yearElement.textContent = currentYear;
}

