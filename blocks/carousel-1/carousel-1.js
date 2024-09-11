export default function decorate(block) {
   
    const wrapper = document.createElement('div');
    wrapper.classList.add('carousel-container');
    
    const carouselWrapper = document.createElement('div');
    carouselWrapper.classList.add('carousel-wrapper');
    
    const slides = [...block.children]; 
    slides.forEach((slide, index) => {
      slide.classList.add('carousel-slide');
      carouselWrapper.appendChild(slide); 
    });
    
    wrapper.appendChild(carouselWrapper);
    block.innerHTML = ''; 
    block.appendChild(wrapper); 
    
    const slideNavButtons = document.createElement("div");
    slideNavButtons.classList.add("navigation-buttons");
    slideNavButtons.innerHTML = `
        <button type="button" class="prev" aria-label="Previous Slide"><</button>
        <button type="button" class="next" aria-label="Next Slide">></button>
    `;
    block.append(slideNavButtons); 
  
  
    const ulElement = block.querySelector(".carousel-wrapper");
    const nextButton = block.querySelector(".next");
    const prevButton = block.querySelector(".prev");
  
  
    nextButton.addEventListener("click", () => {
      ulElement.scrollBy({ left: 200, behavior: "smooth" });
    });
  
   
    prevButton.addEventListener("click", () => {
      ulElement.scrollBy({ left: -200, behavior: "smooth" });
    });

  const color_block = document.querySelectorAll(".carousel-slide ul");
  console.log(color_block);
  for (var ul of color_block) {
    const colors = ul.querySelectorAll("li");
    console.log(colors);
    for (var color of colors) {
      console.log(color);
      const div = document.createElement("div");
      div.style.backgroundColor = color.innerText;
      div.style.height = "12px";
      div.style.width = "12px";
      div.style.borderRadius = "50%";
      color.replaceWith(div);
  
    }
  }
  }