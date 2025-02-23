import { createOptimizedPicture } from "../../scripts/aem.js";

export default function decorate(block) {
  
  const ul = document.createElement("ul");
  ul.classList.add("cards-list"); 

  
  [...block.children].forEach((row) => {
    const li = document.createElement("li");
    li.classList.add("card-item"); 

   
    while (row.firstElementChild) li.append(row.firstElementChild);

 
    [...li.children].forEach((div) => {
      if (div.querySelector("picture")) {
       
        div.className = "cards-card-image";
      } else {
        div.className = "cards-card-body";
      }
    });

    ul.append(li); 
  });

  
  const allPictures = ul.querySelectorAll("picture");
  if (allPictures.length === 0) {
    console.error("No <picture> elements found in the DOM.");
  }
  
  allPictures.forEach((picture) => {
    const img = picture.querySelector("img");
    if (img) {
      const optimizedPicture = createOptimizedPicture(
        img.src, 
        img.alt, 
        false, 
        [{ width: "750" }]
      );
      picture.replaceWith(optimizedPicture); 
    } else {
      console.error("No <img> inside <picture> found");
    }
  });

 
  block.textContent = "";
  block.append(ul);

  // Create navigation buttons for sliding between cards
  const slideNavButtons = document.createElement("div");
  slideNavButtons.classList.add("navigation-buttons");
  slideNavButtons.innerHTML = `
      <button type="button" class="prev" aria-label="Previous Slide"><</button>
      <button type="button" class="next" aria-label="Next Slide">></button>
  `;
  block.append(slideNavButtons); 

  // Add event listeners to scroll the card container
  const ulElement = block.querySelector("ul");
  const nextButton = block.querySelector(".next");
  const prevButton = block.querySelector(".prev");

  // Scroll right (next)
  nextButton.addEventListener("click", () => {
    ulElement.scrollBy({ left: 200, behavior: "smooth" });
  });

  // Scroll left (previous)
  prevButton.addEventListener("click", () => {
    ulElement.scrollBy({ left: -200, behavior: "smooth" });
  });
}
