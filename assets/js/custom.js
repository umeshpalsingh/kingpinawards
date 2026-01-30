$(document).ready(function () {
  // Toggle Mobile Menu
  $("#hamburger").on("click", function () {
    $(this).toggleClass("active");
    $("#main-menu").toggleClass("active");

    // Prevent body scrolling when menu is open
    if ($(this).hasClass("active")) {
      $("body").css("overflow", "hidden");
    } else {
      $("body").css("overflow", "auto");
    }
  });

  // Handle Mobile Sub-menu Toggles
  $(".has-submenu").on("click", function (e) {
    // Only run this logic on mobile screens
    if ($(window).width() <= 992) {
      e.preventDefault(); // Prevent navigation

      const $submenu = $(this).next(".mega-menu, .dropdown");

      // Close other submenus (Accordion style)
      $(".mega-menu, .dropdown").not($submenu).slideUp(300);

      // Toggle the clicked submenu
      $submenu.slideToggle(300);
    }
  });

  // Close menu when clicking a link inside (optional)
  $(".nav-list a")
    .not(".has-submenu")
    .on("click", function () {
      if ($(window).width() <= 992) {
        $("#hamburger").removeClass("active");
        $("#main-menu").removeClass("active");
        $("body").css("overflow", "auto");
      }
    });

  // Handle Window Resize (Reset states if scaling back to desktop)
  $(window).on("resize", function () {
    if ($(window).width() > 992) {
      $("#hamburger").removeClass("active");
      $("#main-menu").removeClass("active");
      $(".mega-menu, .dropdown").removeAttr("style"); // Clear slideToggle remnants
      $("body").css("overflow", "auto");
    }
  });
});

var swiper = new Swiper(".myTestimonials", {
  slidesPerView: 2,
  spaceBetween: 30,
  loop: true,
  speed: 1000,
  autoplay: {
    delay: 4500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    280: {
      slidesPerView: 1,
    },
    992: {
      slidesPerView: 2,
    },
  },
});

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiper,
  },
});

// GO TO TOP BTN LOGIC
$(document).ready(function () {
  // Hide the button initially
  $("#topBtn").hide();
  // Show/hide button based on scroll position
  $(window).scroll(function () {
    if ($(this).scrollTop() > 400) {
      // $(".top-header").slideUp("slow");
    } else {
      // $(".top-header").slideDown("slow");
    }
  });
  $("#topBtn").click(function () {
    // Scroll to top of page with animation
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });
});

$(document).ready(function() {
  $("#openReview").click(function() {
    $("#reviewForm").slideToggle();
  });
});

$(document).ready(function () {
  // 1. Initialize: Open the first accordion set immediately
  var firstSet = $(".set").first();
  firstSet.find("> a").addClass("active");
  firstSet.find(".content").show();
  firstSet.find("i").removeClass("fa-plus").addClass("fa-minus");

  // 2. Click Logic
  $(".set > a").on("click", function (e) {
    e.preventDefault(); // Prevents page jump if using href="#"

    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this).siblings(".content").slideUp(200);
      $(this).find("i").removeClass("fa-minus").addClass("fa-plus");
    } else {
      // Close all others and reset icons to PLUS
      $(".set > a").removeClass("active");
      $(".content").slideUp(200);
      $(".set > a i").removeClass("fa-minus").addClass("fa-plus");

      // Open clicked item and change icon to MINUS
      $(this).addClass("active");
      $(this).siblings(".content").slideDown(200);
      $(this).find("i").removeClass("fa-plus").addClass("fa-minus");
    }
  });
});

// AOS ANIMATION LOGIC
document.addEventListener("DOMContentLoaded", function () {
  // Common AOS configuration
  const initAOS = () => {
    AOS.init({
      duration: 1500,
      once: true,
      disable: () => window.innerWidth < 992,
    });
  };

  // Apply AOS attributes to each selector group
  const applyAOS = (selector) => {
    const items = document.querySelectorAll(selector);
    items.forEach((el, index) => {
      el.setAttribute("data-aos", "fade-down");
      el.setAttribute("data-aos-delay", `${index * 200}`);
    });
  };

  // Apply AOS to multiple class groups
  const classGroups = [".brand-img", ".optum-wrap", ".feature-box", ".set"];
  classGroups.forEach(applyAOS);

  // Initialize AOS
  initAOS();

  // Optional: Custom IntersectionObserver logic
  const allItems = document.querySelectorAll(classGroups.join(", "));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const rect = entry.boundingClientRect;
          const screenCenter = window.innerHeight / 2;
          const elementCenter = rect.top + rect.height / 2;
          if (Math.abs(elementCenter - screenCenter) <= 100) {
            entry.target.classList.add("aos-animate");
          }
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  allItems.forEach((el) => observer.observe(el));
});
