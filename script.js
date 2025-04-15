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
       2.  Back‑to‑top button
    --------------------------------------------------------*/
    const MOBILE_THRESHOLD = 120;  // px
const DESKTOP_THRESHOLD = 400;

const showAt = window.matchMedia('(max-width: 768px)').matches
             ? MOBILE_THRESHOLD
             : DESKTOP_THRESHOLD;

window.addEventListener('scroll', () => {
  topBtn.classList.toggle('show', window.scrollY > showAt);
});
  