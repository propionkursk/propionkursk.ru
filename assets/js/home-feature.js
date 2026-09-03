(function () {
  "use strict";

  var sections = document.querySelectorAll("[data-home-feature]");
  if (!sections.length) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  sections.forEach(function (section) {
    var track = section.querySelector(".home-feature__track");
    var slides = Array.prototype.slice.call(section.querySelectorAll(".home-feature__slide"));
    var dots = Array.prototype.slice.call(section.querySelectorAll(".home-feature__dot"));
    var prevBtn = section.querySelector(".home-feature__arrow--prev");
    var nextBtn = section.querySelector(".home-feature__arrow--next");
    if (slides.length < 2) return;

    var index = 0;
    var timer = null;

    function show(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = "translateX(-" + index * 100 + "%)";
      slides.forEach(function (s, si) {
        s.classList.toggle("is-active", si === index);
      });
      dots.forEach(function (d, di) {
        d.classList.toggle("is-active", di === index);
        d.setAttribute("aria-selected", di === index ? "true" : "false");
      });
    }

    function next() {
      show(index + 1);
    }
    function prev() {
      show(index - 1);
    }

    function stopAutoplay() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }
    function startAutoplay() {
      if (reduceMotion) return;
      stopAutoplay();
      timer = setInterval(next, 7000);
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        prev();
        startAutoplay();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        next();
        startAutoplay();
      });
    }
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        show(i);
        startAutoplay();
      });
    });

    section.addEventListener("mouseenter", stopAutoplay);
    section.addEventListener("mouseleave", startAutoplay);
    section.addEventListener("focusin", stopAutoplay);
    section.addEventListener("focusout", startAutoplay);

    var touchStartX = null;
    track.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.touches[0].clientX;
        stopAutoplay();
      },
      { passive: true }
    );
    track.addEventListener(
      "touchend",
      function (e) {
        if (touchStartX === null) return;
        var dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) {
          if (dx < 0) next();
          else prev();
        }
        touchStartX = null;
        startAutoplay();
      },
      { passive: true }
    );

    show(0);
    startAutoplay();
  });
})();
