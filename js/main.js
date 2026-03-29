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

  /* ------------------------------------------
     11. Order Form (order.html)
     ------------------------------------------ */
  var orderForm = document.getElementById('order-form');

  if (orderForm) {
    // Quantity +/- controls
    orderForm.querySelectorAll('.qty-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.order-item');
        var qtySpan = item.querySelector('.qty-value');
        var qty = parseInt(qtySpan.textContent, 10);

        if (btn.classList.contains('qty-plus')) {
          qty++;
        } else if (btn.classList.contains('qty-minus') && qty > 0) {
          qty--;
        }

        qtySpan.textContent = qty;
        item.classList.toggle('selected', qty > 0);
      });
    });

    // Pre-select item from URL parameter (?item=slug)
    var urlParams = new URLSearchParams(window.location.search);
    var preselect = urlParams.get('item');
    if (preselect && /^[a-z0-9-]+$/.test(preselect)) {
      var target = orderForm.querySelector('.order-item[data-id="' + preselect + '"]');
      if (target) {
        target.querySelector('.qty-value').textContent = '1';
        target.classList.add('selected');
        setTimeout(function () {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    }

    // Set minimum date to today + 2 days
    var dateInput = orderForm.querySelector('input[type="date"]');
    if (dateInput) {
      var minDate = new Date();
      minDate.setDate(minDate.getDate() + 2);
      dateInput.min = minDate.toISOString().split('T')[0];
    }

    // Form submission
    orderForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Collect selected items
      var selectedItems = [];
      orderForm.querySelectorAll('.order-item').forEach(function (item) {
        var qty = parseInt(item.querySelector('.qty-value').textContent, 10);
        if (qty > 0) {
          selectedItems.push({
            name: item.getAttribute('data-name'),
            price: item.getAttribute('data-price'),
            qty: qty
          });
        }
      });

      if (selectedItems.length === 0) {
        alert('Please select at least one item to order.');
        return;
      }

      // Validate required fields
      var requiredFields = orderForm.querySelectorAll('[required]');
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

      // Gather form data
      var name = orderForm.querySelector('[name="name"]').value.trim();
      var email = orderForm.querySelector('[name="email"]').value.trim();
      var phone = orderForm.querySelector('[name="phone"]').value.trim();
      var location = orderForm.querySelector('[name="location"]').value;
      var fulfillment = orderForm.querySelector('[name="fulfillment"]').value;
      var date = orderForm.querySelector('[name="date"]').value;
      var instructions = orderForm.querySelector('[name="instructions"]').value.trim();

      // Build email body
      var itemsList = selectedItems.map(function (item) {
        return '  - ' + item.name + ' x' + item.qty + ' (from $' + item.price + ')';
      }).join('\n');

      var body = 'New Order Request from ' + name + '\n\n'
        + 'CUSTOMER INFO\n'
        + 'Name: ' + name + '\n'
        + 'Email: ' + email + '\n'
        + 'Phone: ' + phone + '\n\n'
        + 'ORDER DETAILS\n'
        + 'Location: ' + location + '\n'
        + 'Fulfillment: ' + fulfillment + '\n'
        + 'Date Needed: ' + date + '\n\n'
        + 'ITEMS ORDERED\n'
        + itemsList + '\n';

      if (instructions) {
        body += '\nSPECIAL INSTRUCTIONS\n' + instructions + '\n';
      }

      body += '\n---\nSent from sweetdelishbakery.com order form';

      var subject = 'New Order — ' + name + ' — ' + date;
      var mailtoLink = 'mailto:sweetdelishbakery@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      window.location.href = mailtoLink;

      // Show success message
      orderForm.style.display = 'none';
      var successEl = document.getElementById('order-success');
      if (successEl) {
        successEl.classList.remove('hidden');
        successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

})();
