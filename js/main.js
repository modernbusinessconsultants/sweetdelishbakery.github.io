/* ==============================================
   Sweet Delish Bakery — Main JavaScript
   ============================================== */

(function () {
  'use strict';

  /* ------------------------------------------
     1. Mobile Navigation
     ------------------------------------------ */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
    });

    // Close mobile nav when a link inside it is clicked
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
      });
    });

    // Close mobile nav on ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
      }
    });
  }

  /* ------------------------------------------
     2. Sticky Header
     ------------------------------------------ */
  const siteHeader = document.querySelector('.site-header');

  if (siteHeader) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    });
  }

  /* ------------------------------------------
     3. Active Nav Link
     ------------------------------------------ */
  function setActiveNavLink() {
    var pathname = window.location.pathname;
    // Get just the filename from the path (e.g. "/menu.html" or "/pages/menu.html")
    var page = pathname.substring(pathname.lastIndexOf('/') + 1);
    // Default to index.html if we're at root
    if (page === '' || page === '/') {
      page = 'index.html';
    }

    var allNavLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
    allNavLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var linkPage = href.substring(href.lastIndexOf('/') + 1);
      if (linkPage === page) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  setActiveNavLink();

  /* ------------------------------------------
     4. Hero Slideshow (homepage only)
     ------------------------------------------ */
  var hero = document.querySelector('.hero');

  if (hero) {
    var slides = hero.querySelectorAll('.hero-slide');
    if (slides.length > 1) {
      var currentSlide = 0;

      setInterval(function () {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
      }, 5000);
    }
  }

  /* ------------------------------------------
     5. Menu Category Filters (menu.html only)
     ------------------------------------------ */
  var menuFilters = document.querySelector('.menu-filters');

  if (menuFilters) {
    var filterButtons = menuFilters.querySelectorAll('.filter-btn');
    var productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Toggle active class on buttons
        filterButtons.forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');

        var category = btn.getAttribute('data-category');

        productCards.forEach(function (card) {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ------------------------------------------
     7. FAQ Accordion (faq.html only)
     ------------------------------------------ */
  var faqList = document.querySelector('.faq-list');

  if (faqList) {
    // Category tab filtering
    var faqTabs = document.querySelectorAll('.faq-tab');
    var faqItems = faqList.querySelectorAll('.faq-item');

    faqTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        // Toggle active class on tabs
        faqTabs.forEach(function (t) {
          t.classList.remove('active');
        });
        tab.classList.add('active');

        var category = tab.getAttribute('data-category');

        faqItems.forEach(function (item) {
          if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });

    // Single-open behavior: close other open details when one is opened
    faqItems.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (item.open) {
          faqItems.forEach(function (other) {
            if (other !== item && other.open) {
              other.open = false;
            }
          });
        }
      });
    });
  }

  /* ------------------------------------------
     8. Contact Form Handler
     ------------------------------------------ */
  // TODO: Connect to Formspree, Netlify Forms, or custom backend
  var contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation: check all required fields
      var requiredFields = contactForm.querySelectorAll('[required]');
      var valid = true;

      requiredFields.forEach(function (field) {
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = '#e74c5e';
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) return;

      // Hide the form and show success message
      contactForm.style.display = 'none';

      var successMsg = contactForm.parentElement.querySelector('.form-success');
      if (successMsg) {
        successMsg.classList.remove('hidden');
      } else {
        // Create success message if it doesn't already exist in the DOM
        var msg = document.createElement('div');
        msg.className = 'form-success';
        msg.textContent = 'Thank you for your message! We\'ll get back to you soon.';
        contactForm.parentElement.appendChild(msg);
      }
    });
  }

  /* ------------------------------------------
     9. Newsletter Form Handler
     ------------------------------------------ */
  // TODO: Connect to email service (Mailchimp, ConvertKit, etc.)
  var newsletterForm = document.querySelector('.newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = newsletterForm.querySelector('button[type="submit"], .btn');
      if (submitBtn) {
        submitBtn.textContent = 'Subscribed!';
        submitBtn.disabled = true;
      }
    });
  }

  /* ------------------------------------------
     10. Dropdown Navigation
     ------------------------------------------ */
  var navDropdowns = document.querySelectorAll('.nav-dropdown');

  navDropdowns.forEach(function (dropdown) {
    var toggle = dropdown.querySelector('a');
    if (toggle) {
      toggle.addEventListener('click', function (e) {
        // Only prevent default if this link acts as a dropdown toggle (has .dropdown-menu sibling)
        var menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
          e.preventDefault();
          // Close all other dropdowns first
          navDropdowns.forEach(function (other) {
            if (other !== dropdown) {
              other.classList.remove('open');
            }
          });
          dropdown.classList.toggle('open');
        }
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-dropdown')) {
      navDropdowns.forEach(function (dropdown) {
        dropdown.classList.remove('open');
      });
    }
  });

})();
