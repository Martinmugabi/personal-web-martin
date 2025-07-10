const skills = [
  { name: "HTML", percentage: 95 },
  { name: "CSS", percentage: 90 },
  { name: "JavaScript", percentage: 85 },
  { name: "Photoshop", percentage: 80 },
  { name: "NodeJS", percentage: 75 },
  { name: "React", percentage: 80 }
];

const container = document.getElementById('skills-container');

skills.forEach(skill => {
  const skillDiv = document.createElement('div');
  skillDiv.className = 'skill';

  const label = document.createElement('div');
  label.className = 'skill-label';
  label.textContent = skill.name;

  const bar = document.createElement('div');
  bar.className = 'skill-bar';

  const fill = document.createElement('div');
  fill.className = 'skill-fill';
  fill.textContent = `${skill.percentage}%`;
  fill.style.width = '0';

  bar.appendChild(fill);
  skillDiv.appendChild(label);
  skillDiv.appendChild(bar);
  container.appendChild(skillDiv);

  setTimeout(() => {
    fill.style.width = skill.percentage + '%';
  }, 100);
});




// Animate skill bars on page load
document.addEventListener("DOMContentLoaded", function() {
  const skillFills = document.querySelectorAll('.skill-fill');
  skillFills.forEach(fill => {
    const percentage = fill.getAttribute('data-percentage');
    setTimeout(() => {
      fill.style.width = percentage + '%';
    }, 300);
  });
});

// script.js
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav45');
  
  menuToggle.addEventListener('click', function() {
    nav.classList.toggle('active');
    this.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      nav.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // FAQ Accordion
  const questions = document.querySelectorAll('.question');
  questions.forEach(question => {
    question.addEventListener('click', function() {
      const item = this.parentElement;
      item.classList.toggle('active');
      
      // Close other open items
      questions.forEach(q => {
        if (q !== this && q.parentElement.classList.contains('active')) {
          q.parentElement.classList.remove('active');
        }
      });
    });
  });
  
  // Form Submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simulate form submission
      const formMessage = document.querySelector('.form-message');
      formMessage.style.display = 'block';
      
      // Reset form
      this.reset();
      
      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    });
  }
  
  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll('.skill-fill');
  
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const percent = bar.style.width;
      bar.style.width = '0';
      
      setTimeout(() => {
        bar.style.width = percent;
      }, 100);
    });
  }
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.id === 'skills-container') {
          animateSkillBars();
        }
        
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe sections
  const sections = document.querySelectorAll('section, .container[id]');
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Current year for footer
  const yearSpan = document.querySelector('.current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  // Portfolio image lightbox (example implementation)
  const portfolioImages = document.querySelectorAll('.porti-image a');
  portfolioImages.forEach(image => {
    image.addEventListener('click', function(e) {
      e.preventDefault();
      // In a real implementation, you would show a lightbox/modal here
      console.log('Portfolio image clicked:', this.href);
    });
  });
});