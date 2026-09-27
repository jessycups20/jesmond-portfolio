//TYPING SCRIPT
    const text = "System Development IT Student based in Iloilo City, Philippines.";
    const typingSpeed = 100;    
    const backspaceSpeed = 100;
    const pause = 1000;          
    const typedSpan = document.getElementById("typed-text");

    let index = 0;
    let forward = true;

    function type() {
      if (forward) {
        typedSpan.textContent = text.slice(0, index + 1);
        index++;
        if (index === text.length) {
          forward = false;
          setTimeout(type, pause); 
          return;
        }
        setTimeout(type, typingSpeed);
      } else {
        typedSpan.textContent = text.slice(0, index - 1);
        index--;
        if (index === 0) {
          forward = true;
          setTimeout(type, typingSpeed);
          return;
        }
        setTimeout(type, backspaceSpeed);
      }
    }

    type();    

    //MODAL SCRIPT FOR PROJECT
      document.addEventListener("DOMContentLoaded", () => {
      // ===== FADE-IN ON SCROLL FOR ALL PROJECT CARDS =====
      const fadeItems = document.querySelectorAll(".section-animate .fade-item");

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }
        });
      }, { threshold: 0.1 });

      fadeItems.forEach(item => observer.observe(item));

      // ===== MODAL FUNCTIONALITY =====
      const projectCards = document.querySelectorAll(".project-card");
      const modalTitle = document.getElementById("modalTitle");
      const modalImage = document.getElementById("modalImage");

      projectCards.forEach(card => {
        card.addEventListener("click", () => {
          const title = card.querySelector("h5").textContent;
          const imgSrc = card.querySelector("img").src;

          // Update modal content
          modalTitle.textContent = title;
          modalImage.src = imgSrc;

          // Show modal
          const modal = new bootstrap.Modal(document.getElementById("projectModal"));
          modal.show();
        });
      });
    });

    // ===== TRANSITION SCRIPT FOR ABOUT =====
      document.addEventListener('DOMContentLoaded', () => {
      const faders = document.querySelectorAll('.fade-slide-up');

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      faders.forEach(fader => observer.observe(fader));
    });


    document.addEventListener("DOMContentLoaded", function() {
      const elements = document.querySelectorAll(".fade-slide-up");

      elements.forEach(el => {
        const delay = el.style.getPropertyValue('--delay') || '0s';
        el.style.transitionDelay = delay; 
        setTimeout(() => {
          el.classList.add("active");
        }, 50); 
      });
    });


     window.addEventListener('DOMContentLoaded', () => {

          document.querySelectorAll('.fade-section').forEach((section) => {
            section.classList.add('visible');
          });

          const elements = document.querySelectorAll('.card-hover');
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('show');
            }, index * 150);
          });
        });

        // ===== Animate Project Cards on Page Load =====
            window.addEventListener('DOMContentLoaded', () => {
            const cards = document.querySelectorAll('.project-card');
            
            // Staggered fade-in
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('show');
              }, index * 100);
            });

            // Interactive 3D movement on mouse hover
            cards.forEach(card => {
              card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left; // cursor X relative to card
                const y = e.clientY - rect.top;  // cursor Y relative to card
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * 10; // max tilt 10deg
                const rotateY = ((x - centerX) / centerX) * 10;

                card.style.transform = `translateY(-5px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
              });

              card.addEventListener('mouseleave', () => {
                // Smoothly reset when cursor leaves
                card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)';
              });
            });
          });

         const cards = document.querySelectorAll('.project-card');

          const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
              if(entry.isIntersecting){
                entry.target.classList.add('active');
              }
            });
          }, { threshold: 0.2 });

          cards.forEach(card => observer.observe(card));

    // ===== TRANSITION ALLOVER SECTION =====
         document.addEventListener("DOMContentLoaded", () => {
          const fadeItems = document.querySelectorAll(".section-animate .fade-item");

          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add("active");
              } else {
                entry.target.classList.remove("active");
              }
            });
          }, { threshold: 0.1 });

          fadeItems.forEach(item => observer.observe(item));
        });

      // ===== TRANSITION FOR PROJECT CARD =====
        document.addEventListener("DOMContentLoaded", () => {
          const projectsGrid = document.querySelector(".projects-grid");
          const projectCards = document.querySelectorAll(".project-card");

          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                projectCards.forEach(card => card.classList.add("active"));
              } else {
                projectCards.forEach(card => card.classList.remove("active"));
              }
            });
          }, { threshold: 0.1 });

          if (projectsGrid) observer.observe(projectsGrid);
        });

      // ===== JAVASCRIPT FOR CONTACTS ALERT =====
        document.addEventListener("DOMContentLoaded", () => {
        const contactForm = document.getElementById("contactForm");

        contactForm.addEventListener("submit", (e) => {
          e.preventDefault(); 

          alert("Message has been sent successfully");

          contactForm.reset();
        });
      });