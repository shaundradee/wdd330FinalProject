import { updateFooterYear, setupMenuToggle} from "./utilities.mjs"
import { initNewsletter, initSpotlight } from "./homepage.mjs";

// Initialize newsletter form functionality
initNewsletter();
// Initialize spotlight functionality
initSpotlight();
// once footer is loaded, update the year
updateFooterYear();
// Adding menu toggle functionality
setupMenuToggle();