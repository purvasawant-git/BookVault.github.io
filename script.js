// Loader Functionality
window.addEventListener('load', function() {
  const loaderSection = document.getElementById('loader-section');
  const countdown = document.getElementById('countdown');
  let progress = 0;
  
  // Simulate loading progress
  const loadingInterval = setInterval(function() {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);
      
      // Hide loader after a short delay
      setTimeout(function() {
        loaderSection.classList.add('fade-out');
        setTimeout(function() {
          loaderSection.style.display = 'none';
        }, 500);
      }, 500);
    }
    
    countdown.textContent = Math.floor(progress) + ' - 100';
  }, 100);
});

// Main functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Cookie Consent Functionality
  const cookieConsent = document.querySelector('.cookie-consent');
  const acceptBtn = document.querySelector('.btn-accept');
  const declineBtn = document.querySelector('.btn-decline');

  // Function to hide cookie consent
  function hideCookieConsent() {
    cookieConsent.style.display = 'none';
  }

  // Event listeners for accept and decline buttons
  if (acceptBtn) {
    acceptBtn.addEventListener('click', function() {
      // You can add logic here to save the user's acceptance
      console.log('Cookies accepted');
      hideCookieConsent();
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener('click', function() {
      // You can add logic here to handle the user's decline
      console.log('Cookies declined');
      hideCookieConsent();
    });
  }

  // Carousel Click Functionality
  const carousel = document.getElementById('bookHeroCarousel');
  const carouselItems = carousel.querySelectorAll('.carousel-item');
  let currentCarouselSlide = 0;

  // Function to show specific carousel slide
  function showCarouselSlide(index) {
    // Remove active class from all slides
    carouselItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to current slide
    carouselItems[index].classList.add('active');
    currentCarouselSlide = index;
  }

  // Add click event listeners to carousel items
  carouselItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      const nextIndex = (index + 1) % carouselItems.length;
      showCarouselSlide(nextIndex);
    });
  });

  // Auto-advance carousel every 5 seconds
  setInterval(function() {
    const nextIndex = (currentCarouselSlide + 1) % carouselItems.length;
    showCarouselSlide(nextIndex);
  }, 5000);

  // Furniture Gallery Slideshow Functionality
  const slideshows = document.querySelectorAll('.featured-slideshow');
  
  slideshows.forEach(function(slideshow) {
    const slides = slideshow.querySelectorAll('.slideshow-item');
    const dots = slideshow.parentElement.querySelectorAll('.slideshow-dot');
    const prevBtn = slideshow.parentElement.querySelector('.slideshow-btn.prev');
    const nextBtn = slideshow.parentElement.querySelector('.slideshow-btn.next');
    
    let currentSlide = 0;
    
    function showSlide(index) {
      // Hide all slides
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Show current slide
      slides[index].classList.add('active');
      dots[index].classList.add('active');
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
    
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }
    
    // Event listeners for buttons
    if (nextBtn) {
      nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', prevSlide);
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(nextSlide, 5000);
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active navigation link highlighting
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // Debounce function for performance optimization
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply debounce to scroll event
  const debouncedScrollHandler = debounce(function() {
    // Scroll event logic can be added here if needed
  }, 10);

  window.addEventListener('scroll', debouncedScrollHandler);
}); 