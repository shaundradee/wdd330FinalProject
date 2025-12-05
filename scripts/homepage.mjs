import { saveToStorage, getFromStorage, removeFromStorage } from "./utilities.mjs";


// Newsletter form handling: simple validation + placeholder submit
export function initNewsletter() {
    const form = document.getElementById("newsletter-form");
    const status = form?.querySelector(".form-status");
    const unsubscribeBtn = document.getElementById("unsubscribe-btn");
    if (!form || !status || !unsubscribeBtn) return;
  
    // Check storage on load
    const savedEmail = getFromStorage("newsletterEmail");
    if (savedEmail) {
      status.hidden = false;
      status.textContent = "Hey pack member! You're already subscribed.";
      unsubscribeBtn.hidden = false; // show unsubscribe
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = form.email.value.trim();
  
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        status.hidden = false;
        status.textContent = "Please enter a valid email.";
        return;
      }
  
      saveToStorage("newsletterEmail", email);
      status.hidden = false;
      status.textContent = "Thanks for joining the pack!";
      unsubscribeBtn.hidden = false; // show unsubscribe
      form.reset();
    });
  
    // Handle unsubscribe
    unsubscribeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      removeFromStorage("newsletterEmail");
      status.hidden = false;
      status.textContent = "You've been unsubscribed.";
      unsubscribeBtn.hidden = true; // hide again
    });
  }
  

export async function initSpotlight() {
  const spotlightImage = document.querySelector(".spotlight-image");
  const spotlightInfo = document.querySelector(".spotlight-info");
  const learnMoreBtn = document.querySelector(".spotlight-card .btn-primary");

  if (!spotlightImage || !spotlightInfo || !learnMoreBtn) return;

  try {
    // Fetch a random dog image from Dog CEO API
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json();

    // Extract breed name from the image URL
    const breedName = data.message.split("/")[4];

    // Update spotlight card
    spotlightImage.src = data.message;
    spotlightImage.alt = `Image of a ${breedName}`;
    spotlightImage.hidden = false;

    spotlightInfo.textContent = `Breed: ${breedName}`;

    // Save breed name to localStorage for details page
    saveToStorage("spotlightBreed", breedName);
    
    // Redirect when "Learn more" is clicked
    learnMoreBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "navpages/details.html";
    });
  } catch (err) {
    spotlightInfo.textContent = "Couldn't fetch a pup right now. Try again later!";
    console.error(err);
  }
}


