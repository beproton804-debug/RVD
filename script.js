/* RV DESIGNERS - Interactive Scripts
   Cost Calculator, Dark/Light Mode, Filterable Gallery, Accordions
*/

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Toggle (Day & Night)
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlTag = document.documentElement;

  // Check persisted theme or system preference
  const savedTheme = localStorage.getItem('rv_theme') || 'light';
  htmlTag.setAttribute('data-theme', savedTheme);
  themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlTag.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlTag.setAttribute('data-theme', newTheme);
    localStorage.setItem('rv_theme', newTheme);
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });

  // 2. Mobile Navigation Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 3. Interactive Project Cost & Scope Estimator
  const plotSlider = document.getElementById('plotArea');
  const areaValue = document.getElementById('areaValue');
  const summaryArea = document.getElementById('summaryArea');
  const summaryTimeline = document.getElementById('summaryTimeline');
  const summaryCostLevel = document.getElementById('summaryCostLevel');
  const sendEstimateBtn = document.getElementById('sendEstimateBtn');

  const svcMap = document.getElementById('svcMap');
  const svc3D = document.getElementById('svc3D');
  const svcStructural = document.getElementById('svcStructural');
  const svcInterior = document.getElementById('svcInterior');

  function updateEstimate() {
    const area = parseInt(plotSlider.value, 10);
    areaValue.textContent = area.toLocaleString('en-IN');
    summaryArea.textContent = `${area.toLocaleString('en-IN')} sq. ft.`;

    let activeServices = [];
    if (svcMap.checked) activeServices.push('ADA Submission Drawing');
    if (svc3D.checked) activeServices.push('3D Elevation');
    if (svcStructural.checked) activeServices.push('Structural RCC Design');
    if (svcInterior.checked) activeServices.push('Turnkey Interior Layout');

    // Dynamic timeline calculation
    if (area < 1500) {
      summaryTimeline.textContent = '5 - 8 Working Days';
    } else if (area < 3500) {
      summaryTimeline.textContent = '8 - 14 Working Days';
    } else {
      summaryTimeline.textContent = '15 - 25 Working Days';
    }

    if (activeServices.length >= 3) {
      summaryCostLevel.textContent = 'Complete Turnkey Package';
    } else if (activeServices.length === 2) {
      summaryCostLevel.textContent = 'Standard Architectural Pack';
    } else {
      summaryCostLevel.textContent = 'Essential Planning Only';
    }

    // Build prefilled WhatsApp message
    const msg = `Hello Er. Rohit Vishwakarma, I checked your online estimator for my plot in Ayodhya. Built-up Area: ${area} sq.ft. Required Services: ${activeServices.join(', ')}. Please provide estimated fees and consultation schedule.`;
    sendEstimateBtn.href = `https://wa.me/918299095509?text=${encodeURIComponent(msg)}`;
  }

  if (plotSlider) {
    plotSlider.addEventListener('input', updateEstimate);
    svcMap.addEventListener('change', updateEstimate);
    svc3D.addEventListener('change', updateEstimate);
    svcStructural.addEventListener('change', updateEstimate);
    svcInterior.addEventListener('change', updateEstimate);
    updateEstimate(); // initial call
  }

  // 4. Portfolio Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      portfolioCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. FAQ Accordion Interaction
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close other open faqs
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});
