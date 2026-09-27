// ================= SMOOTH PORTFOLIO LOADER =================
document.addEventListener("DOMContentLoaded", () => {

  const loader = document.getElementById("portfolioLoader");
  const progress = document.getElementById("loaderProgress");
  const percent = document.getElementById("loaderPercent");
  const loaderText = document.getElementById("loaderText");

  if (!loader) return;

  const messages = [
    "Initializing portfolio...",
    "Loading system modules...",
    "Connecting interface...",
    "Loading projects...",
    "Loading skills...",
    "Preparing user interface...",
    "System ready."
  ];

  let progressValue = 0;
  let messageIndex = 0;

  // Smooth progress animation
  function animateProgress(target) {

    const start = progressValue;
    const distance = target - start;
    const duration = 500;
    const startTime = performance.now();

    function update(currentTime) {

      const elapsed = currentTime - startTime;
      const percentage = Math.min(elapsed / duration, 1);

      // Smooth ease-out
      const eased = 1 - Math.pow(1 - percentage, 3);

      progressValue = Math.round(start + distance * eased);

      progress.style.width = `${progressValue}%`;
      percent.textContent = `${progressValue}%`;

      if (percentage < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // Loading sequence
  const loadingSteps = [
    { progress: 15, delay: 300 },
    { progress: 30, delay: 700 },
    { progress: 45, delay: 1100 },
    { progress: 60, delay: 1500 },
    { progress: 75, delay: 1900 },
    { progress: 88, delay: 2300 },
    { progress: 100, delay: 2700 }
  ];

  loadingSteps.forEach((step, index) => {

    setTimeout(() => {

      animateProgress(step.progress);

      if (index < messages.length) {
        messageIndex = index;
        loaderText.style.opacity = "0";

        setTimeout(() => {
          loaderText.textContent = messages[messageIndex];
          loaderText.style.opacity = "1";
        }, 180);
      }

      // Finish loading
      if (step.progress === 100) {

        setTimeout(() => {

          loaderText.style.opacity = "0";

          setTimeout(() => {

            loaderText.textContent = "System ready.";
            loaderText.style.opacity = "1";

            setTimeout(() => {

              // Smooth fade-out
              loader.style.transition =
                "opacity 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)";

              loader.style.opacity = "0";
              loader.style.transform = "scale(1.03)";
              loader.style.pointerEvents = "none";

              // Remove loader after animation
              setTimeout(() => {
                loader.remove();
              }, 1000);

            }, 500);

          }, 180);

        }, 400);
      }

    }, step.delay);

  });

});


document.addEventListener("DOMContentLoaded", () => {
  // ================= 1. TYPING EFFECT =================
  const texts = ["Web Developer", "BSIT Student"];
  const typingSpeed = 100;
  const backspaceSpeed = 60;
  const pause = 1500;
  const typedSpan = document.getElementById("typed-text");

  let textIndex = 0;
  let charIndex = 0;
  let forward = true;

  function type() {
    if (!typedSpan) return;

    const currentText = texts[textIndex];

    if (forward) {
      typedSpan.textContent = currentText.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentText.length) {
        forward = false;
        setTimeout(type, pause);
        return;
      }
      setTimeout(type, typingSpeed);
    } else {
      typedSpan.textContent = currentText.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        forward = true;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, typingSpeed);
        return;
      }
      setTimeout(type, backspaceSpeed);
    }
  }

  type();

  // ================= SECTION SCROLL ANIMATION =================
    const animatedSections = document.querySelectorAll(".section-animate");

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    }, {
      threshold: 0.15
    });

    animatedSections.forEach((section) => {
      sectionObserver.observe(section);
    });

  // ================= 2. SCROLL REVEAL OBSERVER =================
    const fadeItems = document.querySelectorAll(
      ".section-animate, .fade-item, .fade-slide-up, .project-card"
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "opacity-100",
              "translate-y-0"
            );

            entry.target.classList.remove(
              "opacity-0",
              "translate-y-6"
            );
          } else {
            entry.target.classList.remove(
              "opacity-100",
              "translate-y-0"
            );

            entry.target.classList.add(
              "opacity-0",
              "translate-y-6"
            );
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    fadeItems.forEach((item) => {
      item.classList.add(
        "transition-all",
        "duration-700",
        "ease-out",
        "opacity-0",
        "translate-y-6"
      );

      revealObserver.observe(item);
    });

  // ================= 4. CONTACT FORM SUBMIT =================
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Message has been sent successfully!");
      contactForm.reset();
    });
  }
});

// ================= 5. GLOBAL HANDLERS =================
function downloadAlert(event) {
  event.preventDefault();
  alert("CV file is currently not available for download.");
}


// ================= CYBERSECURITY BACKGROUND =================

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("matrixCanvas");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let width = 0;
  let height = 0;
  let particles = [];
  let scanY = -100;
  let animationFrame;

  const mouse = {
    x: null,
    y: null
  };

  // ================= CONFIG =================

  const PARTICLE_COUNT =
    window.innerWidth < 768 ? 35 : 70;

  const CONNECTION_DISTANCE = 140;

  // ================= RESIZE =================

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    createParticles();
  }

  // ================= PARTICLES =================

  function createParticles() {
    particles = [];

    const count =
      window.innerWidth < 768 ? 35 : 70;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,

        radius: Math.random() * 1.5 + 0.5,

        speedX:
          (Math.random() - 0.5) * 0.35,

        speedY:
          (Math.random() - 0.5) * 0.35,

        pulse:
          Math.random() * Math.PI * 2,

        pulseSpeed:
          0.01 + Math.random() * 0.025
      });
    }
  }

  // ================= BACKGROUND =================

  function drawBackground() {
    // Pure black base
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    // Subtle green center glow
    const glow = ctx.createRadialGradient(
      width / 2,
      height / 2,
      0,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.7
    );

    glow.addColorStop(
      0,
      "rgba(0, 255, 65, 0.055)"
    );

    glow.addColorStop(
      0.5,
      "rgba(0, 255, 65, 0.018)"
    );

    glow.addColorStop(
      1,
      "rgba(0, 0, 0, 0)"
    );

    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    // ================= CYBER GRID =================

    const gridSize = 55;

    ctx.lineWidth = 1;
    ctx.strokeStyle =
      "rgba(0, 255, 65, 0.035)";

    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  // ================= NETWORK CONNECTIONS =================

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;

        const distance =
          Math.sqrt(dx * dx + dy * dy);

        if (distance < CONNECTION_DISTANCE) {
          let opacity =
            (1 - distance / CONNECTION_DISTANCE) *
            0.18;

          // Mouse interaction
          if (mouse.x !== null) {
            const mouseDistance = Math.sqrt(
              Math.pow(p1.x - mouse.x, 2) +
              Math.pow(p1.y - mouse.y, 2)
            );

            if (mouseDistance < 180) {
              opacity += 0.08;
            }
          }

          ctx.beginPath();

          ctx.moveTo(
            p1.x,
            p1.y
          );

          ctx.lineTo(
            p2.x,
            p2.y
          );

          ctx.strokeStyle =
            `rgba(0,255,65,${opacity})`;

          ctx.lineWidth = 1;

          ctx.stroke();
        }
      }
    }
  }

  // ================= PARTICLES =================

  function drawParticles() {
    particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      particle.pulse +=
        particle.pulseSpeed;

      // Wrap around screen

      if (particle.x < 0) {
        particle.x = width;
      }

      if (particle.x > width) {
        particle.x = 0;
      }

      if (particle.y < 0) {
        particle.y = height;
      }

      if (particle.y > height) {
        particle.y = 0;
      }

      // Pulsing brightness

      const alpha =
        0.35 +
        Math.sin(particle.pulse) * 0.25;

      // Mouse attraction

      if (mouse.x !== null) {
        const dx =
          mouse.x - particle.x;

        const dy =
          mouse.y - particle.y;

        const distance =
          Math.sqrt(dx * dx + dy * dy);

        if (distance < 180) {
          particle.x +=
            dx * 0.0005;

          particle.y +=
            dy * 0.0005;
        }
      }

      // Glow

      ctx.beginPath();

      ctx.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        Math.PI * 2
      );

      ctx.fillStyle =
        `rgba(0,255,65,${alpha})`;

      ctx.shadowColor =
        "#00ff41";

      ctx.shadowBlur = 8;

      ctx.fill();

      ctx.shadowBlur = 0;
    });
  }

  // ================= CYBER SCAN LINE =================

  function drawScanLine() {
    scanY += 1.5;

    if (scanY > height + 100) {
      scanY = -100;
    }

    const scanGradient =
      ctx.createLinearGradient(
        0,
        scanY - 70,
        0,
        scanY + 70
      );

    scanGradient.addColorStop(
      0,
      "rgba(0,255,65,0)"
    );

    scanGradient.addColorStop(
      0.5,
      "rgba(0,255,65,0.045)"
    );

    scanGradient.addColorStop(
      1,
      "rgba(0,255,65,0)"
    );

    ctx.fillStyle = scanGradient;

    ctx.fillRect(
      0,
      scanY - 70,
      width,
      140
    );

    // Thin scanner line

    ctx.fillStyle =
      "rgba(0,255,65,0.06)";

    ctx.fillRect(
      0,
      scanY,
      width,
      1
    );
  }

  // ================= RANDOM CYBER DATA =================

  const cyberChars =
    "01<>/\\{}[]$#@%";

  function drawCyberData() {
    ctx.font = "10px monospace";

    for (let i = 0; i < 12; i++) {
      const x =
        Math.random() * width;

      const y =
        Math.random() * height;

      const text =
        cyberChars[
          Math.floor(
            Math.random() *
            cyberChars.length
          )
        ];

      ctx.fillStyle =
        "rgba(0,255,65,0.08)";

      ctx.fillText(
        text,
        x,
        y
      );
    }
  }

  // ================= MOUSE EFFECT =================

  window.addEventListener(
    "mousemove",
    (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    },
    { passive: true }
  );

  window.addEventListener(
    "mouseleave",
    () => {
      mouse.x = null;
      mouse.y = null;
    }
  );

  // ================= ANIMATION =================

  function animate() {
    drawBackground();
    drawConnections();
    drawParticles();
    drawScanLine();
    drawCyberData();

    animationFrame =
      requestAnimationFrame(animate);
  }

  // ================= START =================

  resizeCanvas();
  animate();

  // ================= RESPONSIVE =================

  window.addEventListener(
    "resize",
    resizeCanvas
  );

  // ================= CLEANUP =================

  window.addEventListener(
    "beforeunload",
    () => {
      cancelAnimationFrame(
        animationFrame
      );
    }
  );
});



// ================= MOBILE NAVIGATION TOGGLE =================
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const navIcon = document.getElementById("nav-icon");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (navToggle && mobileMenu && navIcon) {
    // Toggle Menu Visibility & Icon
    navToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      
      if (mobileMenu.classList.contains("hidden")) {
        navIcon.classList.replace("bi-x-lg", "bi-list");
      } else {
        navIcon.classList.replace("bi-list", "bi-x-lg");
      }
    });

    // Auto-close menu kapag nag-click ng alinmang link
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        navIcon.classList.replace("bi-x-lg", "bi-list");
      });
    });
  }
});

//PROJECT MODAL
function openProjectModal(title, imageSrc) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalImage').src = imageSrc;
    const modal = document.getElementById('projectModal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  // Close modal when pressing ESC key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeProjectModal();
    }
  });

//ACHIEVEMENT MODAL
function openAchievementModal(title, imageSrc) {
    document.getElementById('achievementModalTitle').innerText = title;
    document.getElementById('achievementModalImage').src = imageSrc;
    const modal = document.getElementById('achievementModal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeAchievementModal() {
    const modal = document.getElementById('achievementModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  // Close modal when pressing ESC key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeAchievementModal();
    }
  });

//RESPONSIVENESS
// ================= MOBILE NAVBAR =================

const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");
const mobileMenuIcon = document.getElementById("mobileMenuIcon");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");


// Toggle mobile menu
mobileMenuButton.addEventListener("click", () => {

    const isOpen = !mobileMenu.classList.contains("hidden");

    if (isOpen) {

        mobileMenu.classList.add("hidden");

        mobileMenuIcon.classList.remove("bi-x-lg");
        mobileMenuIcon.classList.add("bi-list");

        mobileMenuButton.setAttribute("aria-expanded", "false");

    } else {

        mobileMenu.classList.remove("hidden");

        mobileMenuIcon.classList.remove("bi-list");
        mobileMenuIcon.classList.add("bi-x-lg");

        mobileMenuButton.setAttribute("aria-expanded", "true");

    }

});


// Close menu after clicking a link
mobileNavLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.add("hidden");

        mobileMenuIcon.classList.remove("bi-x-lg");
        mobileMenuIcon.classList.add("bi-list");

        mobileMenuButton.setAttribute("aria-expanded", "false");

    });

});


// Close menu when resizing to desktop
window.addEventListener("resize", () => {

    if (window.innerWidth >= 1024) {

        mobileMenu.classList.add("hidden");

        mobileMenuIcon.classList.remove("bi-x-lg");
        mobileMenuIcon.classList.add("bi-list");

        mobileMenuButton.setAttribute("aria-expanded", "false");

    }

});


// ================= NAVBAR SCROLL HOVER EFFECT =================
// ================= NAVBAR SCROLL FOLLOW =================

  const sections = document.querySelectorAll("section[id]");

  const allNavLinks = document.querySelectorAll(
      ".nav-link, .mobile-nav-link"
  );

  function updateNavbar() {

      let currentSection = "";

      const scrollPosition = window.scrollY + 200;

      sections.forEach(section => {

          const sectionTop = section.offsetTop;
          const sectionBottom =
              sectionTop + section.offsetHeight;

          if (
              scrollPosition >= sectionTop &&
              scrollPosition < sectionBottom
          ) {
              currentSection = section.id;
          }

      });


      allNavLinks.forEach(link => {

          const icon = link.querySelector("i");
          const href = link.getAttribute("href");


          // Remove active Tailwind classes
          link.classList.remove(
              "text-green-400",
              "bg-green-500/10",
              "border-green-500/30"
          );

          if (icon) {
              icon.classList.remove("text-green-400");
          }


          // Apply hover effect to current section
          if (href === "#" + currentSection) {

              link.classList.add(
                  "text-green-400",
                  "bg-green-500/10",
                  "border-green-500/30"
              );

              if (icon) {
                  icon.classList.add("text-green-400");
              }

          }

      });

  }


  // Scroll
  window.addEventListener(
      "scroll",
      updateNavbar,
      { passive: true }
  );


  // Page load
  window.addEventListener(
      "load",
      updateNavbar
  );

  updateNavbar();