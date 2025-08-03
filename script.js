document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const primaryNav = document.querySelector('.primary-nav');
  
  menuToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    primaryNav.classList.toggle('active');
    this.classList.toggle('active');
  });

  // Dropdown Menu Functionality for Mobile
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      if (window.innerWidth <= 992) {
        const dropdown = this.parentElement;
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        this.setAttribute('aria-expanded', !isExpanded);
        dropdown.classList.toggle('active');
      }
    });
  });

  // Close menu when clicking outside on mobile
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 992 && 
        !e.target.closest('.primary-nav') && 
        !e.target.closest('.menu-toggle')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      primaryNav.classList.remove('active');
      menuToggle.classList.remove('active');
      
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
        dropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        if (window.innerWidth <= 992) {
          menuToggle.setAttribute('aria-expanded', 'false');
          primaryNav.classList.remove('active');
          menuToggle.classList.remove('active');
        }
        
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
});



document.addEventListener('DOMContentLoaded', function() {
    // Initialize all project cards
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Video elements
        const video = card.querySelector('.project-video');
        const playBtn = card.querySelector('.play-btn');
        const pauseBtn = card.querySelector('.pause-btn');
        
        // Play/pause functionality
        if (video && playBtn && pauseBtn) {
            playBtn.addEventListener('click', () => {
                video.play();
                playBtn.style.display = 'none';
                pauseBtn.style.display = 'flex';
            });
            
            pauseBtn.addEventListener('click', () => {
                video.pause();
                pauseBtn.style.display = 'none';
                playBtn.style.display = 'flex';
            });
            
            // Hide pause button initially
            pauseBtn.style.display = 'none';
            
            // When video ends, show play button
            video.addEventListener('ended', () => {
                pauseBtn.style.display = 'none';
                playBtn.style.display = 'flex';
            });
        }
        
        // Like button functionality
        const likeBtn = card.querySelector('.like-btn');
        if (likeBtn) {
            likeBtn.addEventListener('click', function() {
                const likeCount = this.querySelector('.like-count');
                let count = parseInt(likeCount.textContent);
                
                this.classList.toggle('active');
                const icon = this.querySelector('i');
                
                if (this.classList.contains('active')) {
                    count++;
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                } else {
                    count--;
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                }
                
                likeCount.textContent = count;
                
                // Add animation
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 300);
            });
        }
        
        // Comment button functionality
        const commentBtn = card.querySelector('.comment-btn');
        if (commentBtn) {
            commentBtn.addEventListener('click', function() {
                // In a real implementation, this would open a comment modal
                console.log('Comment button clicked for:', card.querySelector('.project-title').textContent);
            });
        }
    });
    
    // Auto-pause videos when they're not visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) return;
            
            const video = entry.target;
            const card = video.closest('.project-card');
            const pauseBtn = card?.querySelector('.pause-btn');
            const playBtn = card?.querySelector('.play-btn');
            
            if (!video.paused) {
                video.pause();
                if (pauseBtn) pauseBtn.style.display = 'none';
                if (playBtn) playBtn.style.display = 'flex';
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.project-video').forEach(video => {
        observer.observe(video);
    });
    
    // Initialize share dropdowns
    const shareDropdowns = document.querySelectorAll('.share-dropdown');
    shareDropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseleave', function() {
            this.querySelector('.share-options').style.display = 'none';
        });
    });
});






/* contact form*/
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.querySelector('.form-message');
    const successMessage = document.querySelector('.success-message');
    const errorMessage = document.querySelector('.error-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hide any previous messages
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Get form values
            const formData = {
                name: this.querySelector('#name').value.trim(),
                email: this.querySelector('#email').value.trim(),
                subject: this.querySelector('#subject').value.trim(),
                message: this.querySelector('#message').value.trim()
            };
            
            // Validate form
            if (!formData.name || !formData.email || !formData.message) {
                showMessage('Please fill in all required fields', 'error');
                return;
            }
            
            if (!validateEmail(formData.email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Submit form (in a real implementation, this would be an AJAX call)
            console.log('Form submitted:', formData);
            
            // Simulate successful submission
            showMessage('Thank you! Your message has been sent successfully.', 'success');
            this.reset();
            
            // In a real implementation, you would use AJAX to send to your PHP script
            // sendFormData(formData);
        });
    }
    
    function showMessage(message, type) {
        if (type === 'success') {
            successMessage.textContent = message;
            successMessage.style.display = 'block';
            errorMessage.style.display = 'none';
        } else {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            successMessage.style.display = 'none';
        }
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
        }, 5000);
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // For actual form submission (uncomment and implement when you have backend)
    /*
    function sendFormData(formData) {
        fetch('send_email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
            } else {
                showMessage('Oops! Something went wrong. Please try again.', 'error');
            }
        })
        .catch(error => {
            showMessage('Oops! Something went wrong. Please try again.', 'error');
            console.error('Error:', error);
        });
    }
    */
});

/* testmonies */
document.addEventListener('DOMContentLoaded', function() {
    // If you want to make it a carousel/slider
    const testimonialContainer = document.querySelector('.testimonials-container');
    
    if (testimonialContainer && window.innerWidth > 768) {
        // Initialize a simple slider
        let currentIndex = 0;
        const testimonials = document.querySelectorAll('.testimonial-card');
        const totalTestimonials = testimonials.length;
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'flex' : 'none';
            });
        }
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalTestimonials;
            showTestimonial(currentIndex);
        }, 5000);
        
        // Initial display
        showTestimonial(0);
    }
});


/* awards */
document.addEventListener('DOMContentLoaded', function() {
    // Track certificate downloads
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const certificateName = this.getAttribute('download');
            
            // In a real implementation, you might send this to analytics
            console.log(`Certificate downloaded: ${certificateName}`);
            
            // You could also use Google Analytics:
            // gtag('event', 'download', {
            //     'event_category': 'certificate',
            //     'event_label': certificateName
            // });
        });
    });
});



/* blogs*/
document.addEventListener('DOMContentLoaded', function() {
    const readMoreLinks = document.querySelectorAll('.read-more');
    
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const blogCard = this.closest('.blog-card');
            const excerpt = blogCard.querySelector('.blog-excerpt');
            const fullContent = blogCard.querySelector('.blog-full');
            
            if (fullContent.style.display === 'none') {
                // Show full content
                fullContent.style.display = 'block';
                this.textContent = 'Read Less ';
                
                // Create and append icon
                const icon = document.createElement('i');
                icon.className = 'fas fa-arrow-up';
                this.appendChild(icon);
                
                // Scroll to show more content
                blogCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                // Hide full content
                fullContent.style.display = 'none';
                this.textContent = 'Read More ';
                
                // Create and append icon
                const icon = document.createElement('i');
                icon.className = 'fas fa-arrow-right';
                this.appendChild(icon);
            }
        });
    });
});


/* FAQ */
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

/*FOOTER*/
document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year automatically
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Smooth scrolling for footer links
    document.querySelectorAll('.footer-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});




/* PORTIFIO*/
document.addEventListener('DOMContentLoaded', function() {
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Initialize lightbox (requires lightbox.js or similar library)
    // Example using lightbox2 (you would need to include the library)
    // lightbox.option({
    //     'resizeDuration': 200,
    //     'wrapAround': true
    // });
});

/*SKILS*/
document.addEventListener('DOMContentLoaded', function() {
  // Animate skill bars when section comes into view
  const skillsSection = document.querySelector('.section-skills');
  const skillItems = document.querySelectorAll('.skill-item');
  
  const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillItems.forEach(item => {
          const percent = item.getAttribute('data-percent');
          item.style.setProperty('--target-width', percent + '%');
          item.querySelector('::before').style.width = percent + '%';
        });
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(animateSkills, {
    threshold: 0.2
  });

  observer.observe(skillsSection);

  // Alternative approach if IntersectionObserver isn't supported
  if (!('IntersectionObserver' in window)) {
    window.addEventListener('scroll', function() {
      const sectionPos = skillsSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.3;

      if (sectionPos < screenPos) {
        skillItems.forEach(item => {
          const percent = item.getAttribute('data-percent');
          item.style.setProperty('--target-width', percent + '%');
        });
      }
    });
  }
});




/* ABOUT*/
document.addEventListener('DOMContentLoaded', function() {
  // Animate elements when scrolling to the about section
  const aboutSection = document.querySelector('.section-about');
  const profileImg = document.querySelector('.profile-img');
  const aboutText = document.querySelector('.about-text');
  const actionButtons = document.querySelector('.action-buttons');
  const socialLinks = document.querySelector('.social-links');

  // Check if Intersection Observer is supported
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation classes when section comes into view
          profileImg.classList.add('animate-pop-in');
          aboutText.classList.add('animate-fade-in');
          actionButtons.classList.add('animate-slide-up');
          socialLinks.classList.add('animate-fade-in');
          
          // Stop observing after animation triggers
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(aboutSection);
  } else {
    // Fallback for browsers without IntersectionObserver
    window.addEventListener('scroll', function() {
      const sectionPos = aboutSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.5;

      if (sectionPos < screenPos) {
        profileImg.style.opacity = '1';
        profileImg.style.transform = 'translateY(0)';
        aboutText.style.opacity = '1';
        actionButtons.style.opacity = '1';
        actionButtons.style.transform = 'translateY(0)';
      }
    });
  }

  // Add click effect to download button
  const downloadBtn = document.querySelector('.btn-download');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      this.appendChild(ripple);
      
      // Position the ripple
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size/2}px`;
      ripple.style.top = `${e.clientY - rect.top - size/2}px`;
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
      
      // Track download event (for analytics)
      console.log('CV download initiated');
    });
  }

  // Social media icons hover effect enhancement
  const socialIcons = document.querySelectorAll('.social-icons a');
  socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Optional: Typewriter effect for the intro text
  const introText = document.querySelector('.intro-text');
  if (introText && window.innerWidth > 768) { // Only on desktop
    const originalText = introText.textContent;
    introText.textContent = '';
    
    let i = 0;
    const typeWriter = setInterval(() => {
      if (i < originalText.length) {
        introText.textContent += originalText.charAt(i);
        i++;
      } else {
        clearInterval(typeWriter);
      }
    }, 30);
  }
});

document.getElementById('downloadCvBtn').addEventListener('click', function(e) {
  // Optional: Track download event
  console.log('CV download started');
  
  // Optional: Add visual feedback
  this.classList.add('downloading');
  setTimeout(() => this.classList.remove('downloading'), 1000);
})


// Typing animation for hero subtitle
document.addEventListener('DOMContentLoaded', function() {
  const typingElement = document.querySelector('.typing-text');
  const cursorElement = document.querySelector('.typed-cursor');
  const professions = ['Software Developer', 'Problem Solver', 'Tech Enthusiast'];
  let currentProfession = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isEnd = false;

  function type() {
    const currentText = professions[currentProfession];
    
    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isEnd = true;
      setTimeout(type, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentProfession = (currentProfession + 1) % professions.length;
      setTimeout(type, 500);
    } else {
      const typingSpeed = isDeleting ? 100 : 150;
      setTimeout(type, typingSpeed);
    }
  }

  // Blinking cursor animation
  function blinkCursor() {
    cursorElement.style.opacity = cursorElement.style.opacity === '0' ? '1' : '0';
    setTimeout(blinkCursor, 500);
  }

  // Start animations after a short delay
  setTimeout(() => {
    type();
    blinkCursor();
  }, 1000);
});