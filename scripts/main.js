import { updateFooterYear, setupMenuToggle} from "./utilities.mjs"
import { initNewsletter, initSpotlight } from "./homepage.mjs";


// once footer is loaded, update the year
updateFooterYear();
// Adding menu toggle functionality
setupMenuToggle();

// Initialize newsletter form functionality
initNewsletter();
// Initialize spotlight functionality
initSpotlight();
