const openMenuButton = document.querySelector('.icon-open');
const closeMenuButton = document.querySelector('.icon-close');
const button = document.querySelector('nav button');
const modal = document.getElementById('modal-container');
const testimonialContainer = document.querySelector('.testimonials-slider');
const testimonialCards = document.querySelectorAll('.testimonials-slider .testimonial-card');
const sliderDots = document.querySelector('.slider-dots');
const emailInput = document.getElementById('email-input');
const errorMessage = document.getElementById('error-message');
const signupForm = document.querySelector('.footer-signup-form');
//* Email Validation Function */
const emailValidation = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);

//* Toggle Menu
button.addEventListener('click', () => {
  if(openMenuButton.hidden === false){ 
  openMenuButton.hidden = true;
  closeMenuButton.hidden = false;
  // modal.style.display = 'flex';
  modal.classList.toggle('hide');
  button.setAttribute('aria-expanded', 'true');
  button.setAttribute('aria-label', 'Close Menu');
  }else {
  openMenuButton.hidden = false;
  closeMenuButton.hidden = true;
  modal.classList.toggle('hide');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-label', 'Open Menu');
  }
});


//* Testimonial Slider Dots */
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

//** Testimonial Slider */
testimonialContainer.addEventListener('scroll', () => { // Adds scroll event listener to the testimonial container
  const slideDistance =
    testimonialCards[1].offsetLeft - testimonialCards[0].offsetLeft; // Calculate the distance between two testimonial cards

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

//* Error Message Function */
const showErrorMessage = (validator) => {
  emailInput.setAttribute('aria-invalid', String(!validator));
  if (!validator) {
    errorMessage.innerHTML = `<p>Please provide a valid email</p>`;
    errorMessage.classList.add('error-message');
  } else {
    errorMessage.textContent = '';
    errorMessage.classList.remove('error-message');
  }
}

signupForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  showErrorMessage(emailValidation()); // Call the showErrorMessage function with the result of emailValidation
});
