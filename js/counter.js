// Animated counter for metrics

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Intersection Observer for triggering animations
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.metric-number');
      counters.forEach(counter => {
        if (!counter.classList.contains('animated')) {
          animateCounter(counter);
          counter.classList.add('animated');
        }
      });
    }
  });
}, observerOptions);

// Observe achievements section
document.addEventListener('DOMContentLoaded', () => {
  const achievementsSection = document.querySelector('#achievements');
  if (achievementsSection) {
    observer.observe(achievementsSection);
  }
});