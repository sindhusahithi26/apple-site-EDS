import { createOptimizedPicture } from "../../scripts/aem.js";

export default function decorate(block) {

  const ul = document.createElement("ul");
  ul.classList.add("carousel-2-list");
  



  // Select all <h2> elements
  const headings = document.querySelectorAll("h2");

  headings.forEach((heading) => {
    // Remove the 'id' attribute if it exists
    heading.removeAttribute("id");


    heading.classList.add("break-heading");
  });



 
  [...block.children].forEach((row) => {
    const li = document.createElement("li");
    li.classList.add("carousel-2-item");

   
    while (row.firstElementChild) li.append(row.firstElementChild);

  
    [...li.children].forEach((div) => {
      if (div.querySelector("picture")) {
        div.className = "carousel-2-card-image";
      } else {
        div.className = "carousel-2-card-body";
        const title = div.querySelector("h3");
        const paragraph = div.querySelector("p");

      
        const button = document.createElement("div");
        button.className = "carousel-2-card-button";
        button.textContent = "+";
        li.append(button); 
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


  const slideNavButtons = document.createElement("div");
  slideNavButtons.classList.add("navigation-buttons");
  slideNavButtons.innerHTML = `
      <button type="button" class="prev" aria-label="Previous Slide"><</button>
      <button type="button" class="next" aria-label="Next Slide">></button>
  `;
  block.append(slideNavButtons); 


  const ulElement = block.querySelector("ul");
  const nextButton = block.querySelector(".next");
  const prevButton = block.querySelector(".prev");


  nextButton.addEventListener("click", () => {
    ulElement.scrollBy({ left: 200, behavior: "smooth" });
  });

 
  prevButton.addEventListener("click", () => {
    ulElement.scrollBy({ left: -200, behavior: "smooth" });
  });
}
