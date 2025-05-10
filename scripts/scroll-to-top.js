function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

document.addEventListener('DOMContentLoaded', () => {

  console.log('scroll to top function is ready');
});

function toggleScrollButton() {
  const button = document.querySelector('.back__to__top');
  // Show the button when the user scrolls down a bit (e.g., 200px)
  if (window.scrollY > 300) {
    button.classList.add('visible');
  } else {
    button.classList.remove('visible');
  }
}

window.addEventListener('scroll', toggleScrollButton);