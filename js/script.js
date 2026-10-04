/**
 * MOSTAFA MASOUD â€” PORTFOLIO CORE SCRIPTS
 * Vanilla JavaScript (No Frameworks)
 * Features: Dark/Light Mode, Mobile Navigation, Scrollspy, Scroll Reveals,
 * Filter Tabs, Real Cloudinary Video Modal, Showreel Player, Selected Shorts,
 * Animated Results Bars, FAQ Accordion, WhatsApp Conversion Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. THEME SWITCHER (Dark / Light Mode)
     ========================================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('mm_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('mm_theme', newTheme);
      themeToggle.setAttribute('title', `Switch to ${newTheme === 'dark' ? 'light' : 'dark'} mode`);
    });
  }

  /* ==========================================================================
     2. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileDrawer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileDrawer.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      isExpanded ? closeMobileMenu() : openMobileMenu();
    });
    mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('is-open') &&
          !mobileDrawer.contains(e.target) &&
          !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) closeMobileMenu();
    });
  }

  /* ==========================================================================
     3. STICKY HEADER & SCROLLSPY
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const trackedSections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }

    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120;
    trackedSections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + section.offsetHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });
    desktopNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) link.classList.add('active');
    });
  }, { passive: true });

  /* ==========================================================================
     4. TIMECODE SIMULATION (Hero Monitor)
     ========================================================================== */
  const timecodeEl = document.getElementById('hero-timecode');
  if (timecodeEl) {
    let frame = 14, sec = 28, min = 1, hour = 0;
    setInterval(() => {
      frame++;
      if (frame >= 30) { frame = 0; sec++; if (sec >= 60) { sec = 0; min++; } }
      const pad = (n) => String(n).padStart(2, '0');
      timecodeEl.textContent = `${pad(hour)}:${pad(min)}:${pad(sec)}:${pad(frame)}`;
    }, 100);
  }

  /* ==========================================================================
     5. STATS ANIMATED COUNTERS
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  function runStatsAnimation() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      if (isNaN(target)) return;
      const duration = 1600;
      const startTime = performance.now();
      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        stat.textContent = Math.floor(easeOut * target);
        if (progress < 1) requestAnimationFrame(updateCounter);
        else stat.textContent = target;
      }
      requestAnimationFrame(updateCounter);
    });
  }

  const proofSection = document.getElementById('proof');
  if (proofSection && 'IntersectionObserver' in window) {
    const proofObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          runStatsAnimation();
          proofObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    proofObserver.observe(proofSection);
  }

  /* ==========================================================================
     6. SCROLL REVEAL OBSERVER
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-fade, .reveal-up, .reveal-scale');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(() => entry.target.classList.add('is-visible'), delay);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  /* ==========================================================================
     7. PORTFOLIO FILTER TABS
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => { btn.classList.remove('active'); btn.setAttribute('aria-selected', 'false'); });
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      const filterVal = button.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        if (filterVal === 'all' || cardCategory.includes(filterVal)) {
          card.style.display = '';
          setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => { card.style.display = 'none'; }, 250);
        }
      });
    });
  });

  /* ==========================================================================
     8. FAQ ACCORDION
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');
    if (!trigger || !panel) return;
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          const ot = otherItem.querySelector('.faq-trigger');
          const op = otherItem.querySelector('.faq-panel');
          if (ot && op) { ot.setAttribute('aria-expanded', 'false'); op.hidden = true; otherItem.classList.remove('is-open'); }
        }
      });
      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false'); panel.hidden = true; item.classList.remove('is-open');
      } else {
        trigger.setAttribute('aria-expanded', 'true'); panel.hidden = false; item.classList.add('is-open');
      }
    });
  });

  /* ==========================================================================
     9. INTERACTIVE VIDEO MODAL â€” Real Cloudinary Video Playback
     ========================================================================== */
  const videoModal = document.getElementById('videoModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalPosterImg = document.getElementById('modalPosterImg');
  const modalClient = document.getElementById('modalClient');
  const modalFormat = document.getElementById('modalFormat');
  const modalOutcome = document.getElementById('modalOutcome');
  const modalScope = document.getElementById('modalScope');
  const modalMockupScreen = document.getElementById('modalMockupScreen');
  const modalAspectBadge = document.getElementById('modalAspectBadge');

  // All projects with real video URLs
  const projectsData = {
    vamos: {
      title: 'VAMOS / Abdullah Ashknani â€” Sportswear Campaign',
      poster: 'assets/images/vamos-thumbnail.jpg',
      videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790819863/ASHKNANY_WORLD_CUP_BF_AF.mp4',
      client: 'VAMOS / Abdullah Ashknani (Kuwait / Gulf)',
      format: 'Short-form High-Retention Reel (9:16)',
      outcome: '3,000,000+ Views (Documented Reach)',
      aspectRatio: '9:16',
      scope: 'End-to-end post-production: multi-camera color matching, J-cuts & L-cuts, jump cut velocity, kinetic subtitles, athletic B-roll pacing, layered sound design, and platform export.'
    },
    daly: {
      title: 'Daly â€” Viral Short-Form Retention Edit',
      poster: 'assets/images/daly-thumbnail.jpg',
      videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790817563/1_BF_AF.mp4',
      client: 'Daly (Creator & Entertainment)',
      format: 'Viral Short-form Vertical Video (9:16)',
      outcome: '2.8M Views in 48 Hours',
      aspectRatio: '9:16',
      scope: 'Hook construction within 1.5 seconds, rapid-fire rhythmic cuts, visual pattern interrupts, and optimized text hierarchy to maximize watch time.'
    },
    rayan: {
      title: 'Rayan â€” Fitness Coaching Brand Series',
      poster: 'assets/images/rayan-thumbnail.jpg',
      videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790819701/RAYYAN_CARNIVORE_BF_AF.mp4',
      client: 'Rayan Fitness Coach (International)',
      format: 'Training Reels & Talking-Head Workouts (9:16)',
      outcome: '4M+ Views (Combined Package Performance)',
      aspectRatio: '9:16',
      scope: 'Punchy pacing without dead air, gym sound design & motivational audio ducking, animated exercise callouts, multi-angle gym sequence synchronization.'
    },
    clinic: {
      title: 'Super Healthy Clinic â€” Dr. Ahmed El-Bagoury',
      poster: 'assets/images/clinic-thumbnail.jpg',
      videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790816639/SUPER_HEALTHY_2.mp4',
      client: 'Dr. Ahmed El-Bagoury / Super Healthy Clinic',
      format: 'Medical Talking Head & Healthcare Authority Promos (9:16)',
      outcome: '1.2M Combined Views (Across 2 Videos)',
      aspectRatio: '9:16',
      scope: 'Audio restoration, crisp clinical color grading in DaVinci Resolve, anatomical B-roll cut-ins, and pacing that turns viewers into consultations.'
    },
    bcc: {
      title: 'BCC â€” Ceramic & Tile Showroom Commercial Showcase',
      poster: 'assets/images/bcc-thumbnail.jpg',
      videoUrl: null,
      client: 'BCC Showroom (Ceramics, Tiles & Retail)',
      format: 'Commercial Product & Showroom Feature',
      outcome: 'Hundreds of Thousands of Views آ· Documented Sales',
      aspectRatio: '16:9',
      scope: 'Architectural visual flow, color grading to preserve material textures, smooth pacing, and visual callouts driving customers to visit the physical showroom.'
    },
    shoman: {
      title: 'Ahmed Shoman â€” Short-Form Edit',
      poster: null,
      videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790867731/ahmed_shoman_bf_af.mp4',
      client: 'Ahmed Shoman', format: 'Short-Form Content (9:16)',
      outcome: 'Before / After Showcase', aspectRatio: '9:16',
      scope: 'Short-form editing with hook-first structure, retention pacing, and dynamic visual rhythm for content creator.'
    },
    sh7ta: {
      title: 'Coach Sh7ta â€” Fitness Short',
      poster: null,
      videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790867688/coach_sh7ta_bf_af.mp4',
      client: 'Coach Sh7ta', format: 'Fitness Short-Form (9:16)',
      outcome: 'Before / After Showcase', aspectRatio: '9:16',
      scope: 'Fitness coaching short-form with gym-energy pacing, sound design, and kinetic text for maximum engagement.'
    },
    promo: {
      title: 'Promotional Video â€” Commercial Edit',
      poster: null,
      videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790866570/promo_bf_af.mp4',
      client: 'Commercial Client', format: 'Commercial Promo (9:16)',
      outcome: 'Before / After Showcase', aspectRatio: '9:16',
      scope: 'Commercial brand storytelling with cinematic pacing, visual callouts, and conversion-focused edit structure.'
    },
    zero15: {
      title: 'Zero 15 â€” Brand Short',
      poster: null,
      videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790866531/zero_15_bf_af.mp4',
      client: 'Zero 15', format: 'Lifestyle Brand Short (9:16)',
      outcome: 'Before / After Showcase', aspectRatio: '9:16',
      scope: 'Lifestyle brand content edited for visual appeal, rhythm, and social shareability.'
    },
    nasa: {
      title: 'Elmodeer Nasa â€” Creator Series',
      poster: null,
      videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790866441/Elmodeer_nasa_bf_af.mp4',
      client: 'Elmodeer Nasa', format: 'Creator Series (9:16)',
      outcome: 'Before / After Showcase', aspectRatio: '9:16',
      scope: 'Creator media content with optimized hook structure, strong pacing, and retention architecture.'
    },
    aura: {
      title: 'Aura Clinics â€” Healthcare Promo',
      poster: null,
      videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790866414/aura_clinics_bf_af.mp4',
      client: 'Aura Clinics', format: 'Healthcare Promo (9:16)',
      outcome: 'Before / After Showcase', aspectRatio: '9:16',
      scope: 'Healthcare promotional content with professional grading, clean pacing, and trust-building visual hierarchy.'
    },
    longform: {
      title: 'Long-Form Podcast Edit - Extended Talking-Head',
      poster: null,
      videoUrl: 'https://res.cloudinary.com/ta2wltsy/video/upload/v1790867936/%D8%A7%D9%84%D8%B2%D9%88%D8%AC%D8%A9_%D8%A7%D9%84%D8%B5%D8%A7%D9%84%D8%AD%D8%A9_%D9%88%D8%A7%D9%84%D9%86%D8%A7%D8%B4%D8%B2_BF_AF.mp4',
      client: 'Long-Form Client', format: 'Extended Talking-Head with Arabic Subtitles (9:16)',
      outcome: 'Extended Format Before / After', aspectRatio: '9:16',
      scope: 'Dialogue trimming without artifacts, pacing for sustained watch time, balanced audio mastering, and accurate Arabic subtitle synchronization.'
    }
  };

  function openProjectModal(projectId) {
    stopAllPreviews();
    const data = projectsData[projectId];
    if (!data || !videoModal) return;

    // Set text content
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalClient) modalClient.textContent = data.client;
    if (modalFormat) modalFormat.textContent = data.format;
    if (modalOutcome) modalOutcome.textContent = data.outcome;
    if (modalScope) modalScope.textContent = data.scope;
    if (modalAspectBadge) modalAspectBadge.textContent = data.aspectRatio || '9:16';

    // Portrait vs landscape
    if (modalMockupScreen) {
      if (data.aspectRatio === '9:16') {
        modalMockupScreen.classList.add('is-portrait');
      } else {
        modalMockupScreen.classList.remove('is-portrait');
      }
    }

    // Set up video player
    const player = document.getElementById('modalVideoPlayer');
    const playTrigger = document.getElementById('modalPlayTrigger');

    if (player) {
      player.pause();
      player.removeAttribute('src');
      player.load();
      player.style.display = 'none';
    }

    if (modalPosterImg) {
      if (data.poster) {
        modalPosterImg.src = data.poster;
      } else if (data.videoUrl) {
        // Generate Cloudinary poster URL
        const posterUrl = data.videoUrl
          .replace('/upload/', '/upload/so_0,w_720,c_limit,q_auto,f_jpg/')
          .replace('.mp4', '.jpg');
        modalPosterImg.src = posterUrl;
        modalPosterImg.onerror = () => { modalPosterImg.src = 'assets/images/vamos-thumbnail.jpg'; };
      }
      modalPosterImg.alt = data.title;
      modalPosterImg.style.display = 'block';
    }

    if (playTrigger) {
      if (data.videoUrl) {
        playTrigger.style.display = 'flex';
        // Replace element to remove old listeners
        const newTrigger = playTrigger.cloneNode(true);
        playTrigger.parentNode.replaceChild(newTrigger, playTrigger);

        newTrigger.addEventListener('click', function onFirstPlay() {
          if (!player) return;
          player.src = data.videoUrl;
          player.style.display = 'block';
          if (modalPosterImg) modalPosterImg.style.display = 'none';
          newTrigger.style.display = 'none';
          player.play().catch(() => {
            player.muted = true;
            player.play();
          });
        });
      } else {
        playTrigger.style.display = 'none';
      }
    }

    videoModal.classList.add('is-open');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!videoModal) return;
    videoModal.classList.remove('is-open');
    videoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    const player = document.getElementById('modalVideoPlayer');
    if (player) { player.pause(); player.src = ''; player.load(); player.style.display = 'none'; }
    if (modalPosterImg) modalPosterImg.style.display = 'block';
    const playTrigger = document.getElementById('modalPlayTrigger');
    if (playTrigger) playTrigger.style.display = 'flex';
    stopAllPreviews();
  }

  // Hero preview trigger
  const heroPreviewTrigger = document.getElementById('hero-preview-trigger');
  if (heroPreviewTrigger) {
    heroPreviewTrigger.addEventListener('click', () => openProjectModal('vamos'));
    heroPreviewTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProjectModal('vamos'); }
    });
  }

  // All [data-project-id] buttons & cards (existing portfolio cards)
  document.querySelectorAll('[data-project-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openProjectModal(btn.getAttribute('data-project-id'));
    });
  });

  // All [data-short-id] elements (shorts, longform)
  document.querySelectorAll('[data-short-id]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openProjectModal(el.getAttribute('data-short-id'));
    });
  });

  // Longform media trigger
  const longformMediaTrigger = document.getElementById('longformMediaTrigger');
  if (longformMediaTrigger) {
    longformMediaTrigger.addEventListener('click', () => openProjectModal('longform'));
    longformMediaTrigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProjectModal('longform'); }
    });
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('is-open')) closeProjectModal();
  });

  /* ==========================================================================
     10. SHOWREEL PLAYER
     ========================================================================== */
  const showreelVideo = document.getElementById('showreelVideo');
  const showreelOverlay = document.getElementById('showreelOverlay');
  const showreelPlayBtn = document.getElementById('showreelPlayBtn');
  const showreelPauseBtn = document.getElementById('showreelPauseBtn');
  const showreelMuteBtn = document.getElementById('showreelMuteBtn');
  const showreelProgress = document.getElementById('showreelProgress');
  const showreelControls = document.getElementById('showreelControls');

  function playShowreel() {
    if (!showreelVideo) return;
    showreelVideo.play().then(() => {
      if (showreelOverlay) showreelOverlay.classList.add('is-hidden');
      if (showreelControls) showreelControls.classList.add('is-visible');
    }).catch(() => {
      showreelVideo.muted = true;
      if (showreelMuteBtn) showreelMuteBtn.classList.add('is-muted');
      showreelVideo.play().then(() => {
        if (showreelOverlay) showreelOverlay.classList.add('is-hidden');
        if (showreelControls) showreelControls.classList.add('is-visible');
      });
    });
  }

  if (showreelVideo && showreelOverlay) {
    if (showreelPlayBtn) showreelPlayBtn.addEventListener('click', (e) => { e.stopPropagation(); playShowreel(); });
    showreelOverlay.addEventListener('click', playShowreel);

    if (showreelPauseBtn) {
      showreelPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const paused = showreelVideo.paused;
        paused ? showreelVideo.play() : showreelVideo.pause();
        showreelPauseBtn.innerHTML = paused
          ? `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`
          : `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>`;
      });
    }

    if (showreelMuteBtn) {
      showreelMuteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        showreelVideo.muted = !showreelVideo.muted;
        showreelMuteBtn.classList.toggle('is-muted', showreelVideo.muted);
      });
    }

    if (showreelProgress) {
      showreelVideo.addEventListener('timeupdate', () => {
        if (showreelVideo.duration) {
          showreelProgress.style.width = `${(showreelVideo.currentTime / showreelVideo.duration) * 100}%`;
        }
      });

      const progressTrack = showreelProgress.parentElement;
      if (progressTrack) {
        progressTrack.addEventListener('click', (e) => {
          e.stopPropagation();
          if (showreelVideo.duration) {
            const rect = progressTrack.getBoundingClientRect();
            showreelVideo.currentTime = ((e.clientX - rect.left) / rect.width) * showreelVideo.duration;
          }
        });
      }
    }
  }

  /* ==========================================================================
     11. ANIMATED RESULTS PROGRESS BARS (Scroll-triggered)
     ========================================================================== */
  const chartBars = document.querySelectorAll('.chart-progress');

  if (chartBars.length > 0 && 'IntersectionObserver' in window) {
    // Store target widths before resetting
    const targetWidths = Array.from(chartBars).map(bar => bar.style.width || '80%');

    // Reset to 0 initially
    chartBars.forEach(bar => { bar.style.width = '0%'; });

    const resultsSection = document.getElementById('results');
    if (resultsSection) {
      const barsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            chartBars.forEach((bar, index) => {
              setTimeout(() => {
                bar.style.width = targetWidths[index];
              }, index * 120);
            });
            barsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      barsObserver.observe(resultsSection);
    }
  }

  /* ==========================================================================
     12. CONTACT FORM HANDLING
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameVal = document.getElementById('clientName').value.trim();
      const emailVal = document.getElementById('clientEmail').value.trim();
      const typeVal = document.getElementById('projectType').value;
      const messageVal = document.getElementById('projectMessage').value.trim();

      ['nameError', 'emailError', 'typeError', 'messageError'].forEach(id => {
        document.getElementById(id).textContent = '';
      });

      let hasError = false;
      if (!nameVal) { document.getElementById('nameError').textContent = 'Please enter your name or brand.'; hasError = true; }
      if (!emailVal || !emailVal.includes('@')) { document.getElementById('emailError').textContent = 'Please enter a valid email address.'; hasError = true; }
      if (!typeVal) { document.getElementById('typeError').textContent = 'Please select a project type.'; hasError = true; }
      if (!messageVal) { document.getElementById('messageError').textContent = 'Please provide brief details about your project.'; hasError = true; }
      if (hasError) return;

      const formattedMessage = `Hello Mostafa, I would like to inquire about video editing services:%0A%0A` +
        `â€¢ Name/Brand: ${encodeURIComponent(nameVal)}%0A` +
        `â€¢ Email: ${encodeURIComponent(emailVal)}%0A` +
        `â€¢ Project Type: ${encodeURIComponent(typeVal)}%0A` +
        `â€¢ Details: ${encodeURIComponent(messageVal)}`;
      const whatsappUrl = `https://wa.me/201553772179?text=${formattedMessage}`;

      if (formStatus) {
        formStatus.hidden = false;
        formStatus.innerHTML = `<strong>Inquiry Prepared!</strong> Opening WhatsApp. If it does not open, <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;font-weight:bold;color:var(--accent-hover);">click here</a>.`;
      }
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  /* ==========================================================================
     13. BACK TO TOP
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================================================
     14. FLOATING WHATSAPP BUTTON â€” Scroll-triggered visibility
     ========================================================================== */
  const floatingWA = document.getElementById('floatingWhatsApp');
  if (floatingWA) {
    floatingWA.style.opacity = '0';
    floatingWA.style.transform = 'translateY(12px)';
    floatingWA.style.pointerEvents = 'none';
    floatingWA.style.transition = 'opacity 0.4s ease, transform 0.4s ease';

    let waVisible = false;
    window.addEventListener('scroll', () => {
      const threshold = window.innerHeight * 0.6;
      if (window.scrollY > threshold && !waVisible) {
        waVisible = true;
        floatingWA.style.opacity = '1';
        floatingWA.style.transform = 'translateY(0)';
        floatingWA.style.pointerEvents = 'auto';
      } else if (window.scrollY <= threshold && waVisible) {
        waVisible = false;
        floatingWA.style.opacity = '0';
        floatingWA.style.transform = 'translateY(12px)';
        floatingWA.style.pointerEvents = 'none';
      }
    }, { passive: true });
  }

  /* ==========================================================================
     15. VIDEO HOVER & TOUCH PREVIEWS (Selected Work)
     ========================================================================== */
  const previewVideos = new Map();

  function stopAllPreviews() {
    previewVideos.forEach(video => {
      video.pause();
      video.classList.remove('is-playing');
    });
  }

  function initVideoPreviews() {
    const projectCards = document.querySelectorAll('.projects-grid .project-card[data-project-id]');
    if (!projectCards.length) return;

    let currentMobileCard = null;

    function getOrCreateVideo(card, projectId) {
      if (previewVideos.has(card)) {
        return previewVideos.get(card);
      }
      const data = projectsData[projectId];
      if (!data || !data.videoUrl) return null;

      const mediaWrapper = card.querySelector('.project-media-wrapper');
      if (!mediaWrapper) return null;

      const video = document.createElement('video');
      video.className = 'project-preview-video';
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('muted', '');
      video.setAttribute('aria-hidden', 'true');
      video.preload = 'none';
      video.src = data.videoUrl;

      video.addEventListener('playing', () => {
        video.classList.add('is-playing');
      });

      mediaWrapper.appendChild(video);
      previewVideos.set(card, video);
      return video;
    }

    function playPreview(card) {
      const projectId = card.getAttribute('data-project-id');
      const video = getOrCreateVideo(card, projectId);
      if (!video) return;

      if (video.preload === 'none') {
        video.preload = 'metadata';
      }

      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Play was cleanly aborted or restricted
        });
      }
    }

    function stopPreview(card) {
      const video = previewVideos.get(card);
      if (!video) return;
      video.pause();
      video.classList.remove('is-playing');
    }

    // DESKTOP: Hover preview
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    if (!isTouch) {
      projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          playPreview(card);
        });
        card.addEventListener('mouseleave', () => {
          stopPreview(card);
        });
      });
    } else {
      // MOBILE / TOUCH:
      // IntersectionObserver previews the card when it enters the focal area of the viewport
      // 100% smooth, no touch hijacking, scroll remains completely natural!
      if ('IntersectionObserver' in window) {
        const touchObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
              if (currentMobileCard && currentMobileCard !== entry.target) {
                stopPreview(currentMobileCard);
              }
              currentMobileCard = entry.target;
              playPreview(entry.target);
            } else if (!entry.isIntersecting || entry.intersectionRatio < 0.25) {
              if (currentMobileCard === entry.target) {
                stopPreview(entry.target);
                currentMobileCard = null;
              }
            }
          });
        }, {
          threshold: [0.25, 0.55, 0.8]
        });

        projectCards.forEach(card => touchObserver.observe(card));
      }
    }
  }

  initVideoPreviews();

});
