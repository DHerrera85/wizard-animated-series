/* =========================================================
   Wizard – global JS
   ========================================================= */

   document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------------------
       1.  Scroll‑spy  (highlight nav link for section in view)
    --------------------------------------------------------*/
    const navLinks = document.querySelectorAll('header nav a');
    const sections = Array.from(navLinks).map(link =>
      document.querySelector(link.getAttribute('href'))
    );
  
    const spy = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id   = `#${entry.target.id}`;
          /* highlight the matching link in *any* nav (desktop or mobile) */
          document.querySelectorAll(`header nav a[href="${id}"]`)
                  .forEach(a => a.classList.toggle('active', entry.isIntersecting));
        });
      },
      {
        /* fire when section top crosses the middle of viewport */
        rootMargin: '-50% 0px -45% 0px',
        threshold : 0
      }
    );
  
    sections.forEach(sec => sec && spy.observe(sec));
  
    /* -------------------------------------------------------
       2.  Hamburger Menu & Mobile Drawer
    --------------------------------------------------------*/
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerLinks = mobileDrawer.querySelectorAll('a');

    // Abrir drawer
    hamburgerBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      drawerOverlay.classList.add('visible');
      hamburgerBtn.classList.add('active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
    });

    // Cerrar drawer
    const closeDrawer = () => {
      mobileDrawer.classList.remove('open');
      drawerOverlay.classList.remove('visible');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
    };

    closeDrawerBtn.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);

    // Cerrar drawer al hacer click en un link
    drawerLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Actualizar link activo en el drawer mientras scrollea
    const drawerSpy = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const id   = `#${entry.target.id}`;
          drawerLinks.forEach(a => {
            if (a.getAttribute('href') === id) {
              a.classList.toggle('active', entry.isIntersecting);
            } else {
              a.classList.remove('active');
            }
          });
        });
      },
      {
        rootMargin: '-50% 0px -45% 0px',
        threshold : 0
      }
    );

    sections.forEach(sec => sec && drawerSpy.observe(sec));

    /* -------------------------------------------------------
       3.  Back‑to‑top button
    --------------------------------------------------------*/
    const topBtn = document.getElementById('backToTop');
    const MOBILE_THRESHOLD = 120;  // px
    const DESKTOP_THRESHOLD = 400;

    const showAt = window.matchMedia('(max-width: 768px)').matches
                 ? MOBILE_THRESHOLD
                 : DESKTOP_THRESHOLD;

    window.addEventListener('scroll', () => {
      topBtn.classList.toggle('show', window.scrollY > showAt);
    });

    // Back to top click handler
    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});