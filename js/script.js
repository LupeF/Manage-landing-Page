const openMenuButton = document.querySelector('.icon-open');
const closeMenuButton = document.querySelector('.icon-close');
const button = document.querySelector('nav button');
const modal = document.getElementById('modal-container');
const testimonialContainer = document.querySelector('.testimonials-slider');
const testimonialCards = document.querySelectorAll('.testimonials-slider .testimonial-card');
const sliderDots = document.querySelector('.slider-dots');

openMenuButton.addEventListener('click', () => {
  openMenuButton.hidden = true;
  closeMenuButton.hidden = false;
  modal.style.display = 'flex';
  button.setAttribute('aria-expanded', 'true');
  button.setAttribute('aria-label', 'Close Menu');

});

closeMenuButton.addEventListener('click', () => {
  openMenuButton.hidden = false;
  closeMenuButton.hidden = true;
  modal.style.display = 'none';
  button.setAttribute('aria-expanded', 'false'); // Set the aria-expanded attribute to false
  button.setAttribute('aria-label', 'Open Menu');// Set the aria-label for accessibility
});

testimonialCards.forEach((card, index) =>{
  const button = document.createElement('button'); // Create a new button element for the slider dot
  button.classList.add('slider-dot'); // Add the slider-dot class to the button
  button.setAttribute('aria-label', `Show testimonial  ${index +1}`); // Set the aria-label for accessibility
  button.setAttribute('type', 'button'); // Set the button type to 'button'
  sliderDots.append(button); // Append the button to the slider dots container
  if (index === 0 ) { // If this is the first button, add the 'active' class
    button.classList.add('active');

  }
  button.addEventListener('click', ()=> {
    card.scrollIntoView({  // Scroll the card into view
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
    const sliderBtn = document.querySelectorAll('.slider-dot'); // Select all slider dots
    sliderBtn.forEach((sliderDot) => {
      sliderDot.classList.remove('active');
    });
      button.classList.add('active');
  })
})

testimonialContainer.addEventListener('scroll', () => { // Adds scroll event listener to the testimonial container
  const slideDistance =
    testimonialCards[1].offsetLeft - testimonialCards[0].offsetLeft;

  const activeIndex = Math.round(
    testimonialContainer.scrollLeft / slideDistance // Calculate the index of the active testimonial
  );
  const sliderBtn = document.querySelectorAll('.slider-dot');
  sliderBtn.forEach((sliderDot, index) => { // Iterate through each slider dot
    if(index === activeIndex){ // If this is the active testimonial is the same as the index
      sliderDot.classList.add('active');
      sliderDot.setAttribute('aria-current', 'true');
    } else {
      sliderDot.classList.remove('active');
      sliderDot.setAttribute('aria-current', 'false');
    }
  })
});