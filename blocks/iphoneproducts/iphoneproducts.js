export default async function decorate() {

        const productContainer = document.querySelector('.iphoneproducts-container');
        const leftArrow = document.createElement('button');
        leftArrow.classList.add('arrow', 'left');
        leftArrow.textContent = '<'; 
        const rightArrow = document.createElement('button');
        rightArrow.classList.add('arrow', 'right');
        rightArrow.textContent = '>'; 
        productContainer.appendChild(leftArrow);
        productContainer.appendChild(rightArrow);
        const scrollAmount = 200;
        rightArrow.addEventListener('click', () => {
        document.querySelector('.iphoneproducts').scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
        leftArrow.addEventListener('click', () => {
        document.querySelector('.iphoneproducts').scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

}