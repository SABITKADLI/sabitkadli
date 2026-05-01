// Main site interactions

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Mobile menu toggle (if needed in future)
console.log('Portfolio site initialized');

// Particle background effect
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("particles");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const particleCount = 50;
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = Math.random() - 0.5;
      this.vy = Math.random() - 0.5;
      this.radius = 2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0) { this.x = canvas.width; this.vx *= -1; }
      if (this.x > canvas.width) { this.x = 0; this.vx *= -1; }
      if (this.y < 0) { this.y = canvas.height; this.vy *= -1; }
      if (this.y > canvas.height) { this.y = 0; this.vy *= -1; }
    }
    draw() {
      ctx.fillStyle = "rgba(0,255,136,0.5)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => { particle.update(); particle.draw(); });
    // draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 150) {
          ctx.strokeStyle = "rgba(0,255,136," + (0.2 - distance / 750) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
});
