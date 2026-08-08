document.addEventListener('DOMContentLoaded', () => {
  const content = window.CONTENT;
  const is404 = !!document.querySelector('.page-404');
  
  // Dynamic Header Injection
  if (content && !is404) {
    let header = document.querySelector('header.profile-header');
    if (!header) {
      header = document.createElement('header');
      header.className = 'profile-header';
      const main = document.querySelector('main.landing-container');
      if (main) {
        main.insertBefore(header, main.firstChild);
      }
    }
    header.innerHTML = `
      <div class="avatar-wrapper">
        <div class="avatar-glow"></div>
        <img class="avatar-img" src="${content.header.avatar}" alt="${content.header.name} (${content.header.handle.replace('@', '')})" width="140" height="140">
        <span class="badge-status">${content.header.badge}</span>
      </div>
      <h1 class="profile-name">${content.header.name}</h1>
      <p class="profile-handle">${content.header.handle}</p>
      <p class="profile-bio">${content.header.bio}</p>
    `;
  }

  // Dynamic Nav Injection (if requested by instructions, even if empty/simple)
  if (!is404 && !document.querySelector('nav.main-nav')) {
    // Add a simple empty nav or placeholder if needed for standard structure
    const nav = document.createElement('nav');
    nav.className = 'main-nav';
    const header = document.querySelector('header.profile-header');
    if (header) {
      header.after(nav);
    }
  }

  // Dynamic Footer Injection
  if (content) {
    let footer = document.getElementById('footer');
    if (!footer) {
      footer = document.createElement('footer');
      footer.id = 'footer';
      footer.className = 'landing-footer';
      const target = document.body;
      target.appendChild(footer);
    }
    footer.innerHTML = `
      <p>&copy; <span class="year">${new Date().getFullYear()}</span> Alec &middot; alec.today &middot; All rights reserved.</p>
      <p class="powered-by-text"><a href="https://alec.today/" target="_blank" rel="noopener" class="powered-by-link">${content.footer.credit}</a></p>
      <p class="footer-sublink"><a href="${content.footer.wishlistUrl}" target="_blank" rel="noopener" class="wishlist-link">🎁 Wishlist (gift.alec.today)</a></p>
    `;
  }

  // Particle Canvas
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.4 + 0.1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${this.alpha})`;
        ctx.fill();
      }
    }

    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 60);
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(147, 51, 234, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  // Mouse movement tracking for card glow effect
  const cards = document.querySelectorAll('.hub-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 404 Page Logic
  const gifImg = document.getElementById('gif');
  if (gifImg && content && content.fourOhFour) {
    const combos = content.fourOhFour;
    const pick = combos[Math.floor(Math.random() * combos.length)];
    gifImg.src = pick.gif;
    gifImg.alt = pick.title;
    document.getElementById("title").textContent = pick.title;
    document.getElementById("message").textContent = pick.message;
  }
});
