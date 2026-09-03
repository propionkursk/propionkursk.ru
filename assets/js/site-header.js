(function () {
  "use strict";

  var header = document.getElementById("site-header");
  if (!header) return;

  // --- Desktop dropdowns (click/keyboard; :hover and :focus-within handle mouse/tab in CSS) ---
  var items = header.querySelectorAll(".site-header__item");

  function closeItem(item) {
    item.classList.remove("is-open");
    var btn = item.querySelector(".site-header__link");
    if (btn) btn.setAttribute("aria-expanded", "false");
  }

  function closeAllItems(except) {
    items.forEach(function (item) {
      if (item !== except) closeItem(item);
    });
  }

  items.forEach(function (item) {
    var btn = item.querySelector(".site-header__link");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      closeAllItems(item);
      if (isOpen) {
        closeItem(item);
      } else {
        item.classList.add("is-open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.addEventListener("click", function (e) {
    if (!header.contains(e.target)) closeAllItems();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeAllItems();
      closeMobileMenu();
    }
  });

  // --- Mobile burger menu ---
  var burger = header.querySelector(".site-header__burger");
  var mobileMenu = document.getElementById("site-mobile-menu");

  function openMobileMenu() {
    mobileMenu.hidden = false;
    burger.setAttribute("aria-expanded", "true");
    header.classList.add("is-mobile-open");
  }

  function closeMobileMenu() {
    mobileMenu.hidden = true;
    burger.setAttribute("aria-expanded", "false");
    header.classList.remove("is-mobile-open");
  }

  if (burger && mobileMenu) {
    burger.addEventListener("click", function () {
      if (mobileMenu.hidden) {
        openMobileMenu();
      } else {
        closeMobileMenu();
      }
    });
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMobileMenu);
    });
  }

  // --- Mobile accordion groups ---
  var mobileToggles = header.querySelectorAll(".site-header__mobile-toggle");
  mobileToggles.forEach(function (toggle) {
    var submenu = toggle.nextElementSibling;
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      if (submenu) submenu.hidden = isOpen;
    });
  });

  // --- Sticky compact state on scroll ---
  var ticking = false;
  function updateScrolled() {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
    ticking = false;
  }
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        window.requestAnimationFrame(updateScrolled);
        ticking = true;
      }
    },
    { passive: true }
  );
  updateScrolled();
})();
