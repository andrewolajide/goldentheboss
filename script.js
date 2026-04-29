// ============================
// Mobile menu
// ============================
function toggleMenu(el) {
  const menu = document.querySelector(".mobile-menu");
  el.classList.toggle("active");
  menu.classList.toggle("active");
}

document.addEventListener("click", function (event) {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".mobile-menu");

  if (
    hamburger &&
    menu &&
    !hamburger.contains(event.target) &&
    !menu.contains(event.target) &&
    hamburger.classList.contains("active")
  ) {
    hamburger.classList.remove("active");
    menu.classList.remove("active");
  }
});

// Close mobile menu when a link is clicked
document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".mobile-menu");
    hamburger?.classList.remove("active");
    menu?.classList.remove("active");
  });
});

// ============================
// Fixed navbar
// ============================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (navbar && window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else if (navbar) {
    navbar.classList.remove("scrolled");
  }
});

function initActiveNavLinks() {
  const path = window.location.pathname;
  // Get the current filename (e.g., "lagos-listings.html")
  const page = path.split("/").pop() || "index.html";
  const allLinks = document.querySelectorAll(".nav-right a, .mobile-menu a");

  allLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");
    if (!linkHref) return;

    // Remove any existing active class first
    link.classList.remove("active");

    // NEW: Skip adding the active class if the link is a button
    if (link.classList.contains("btn")) return;

    // Clean the linkHref for comparison
    const cleanLinkHref = linkHref.split("?")[0];

    // 1. Handle Home Page
    if (
      (page === "index.html" || page === "") &&
      cleanLinkHref === "index.html"
    ) {
      link.classList.add("active");
    }
    // 2. Handle Exact Matches
    else if (page === cleanLinkHref) {
      link.classList.add("active");
    }
  });
}

initActiveNavLinks();

/* =============================
    SCROLL & ANIMATIONS
============================= */
function initScrollToTop() {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (!scrollTopBtn) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) scrollTopBtn.classList.add("show");
    else scrollTopBtn.classList.remove("show");
  });
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initScrollAnimations() {
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.transitionDelay = `${index * 0.1}s`;
        entry.target.classList.add("active");
      } else if (entry.boundingClientRect.top > 0) {
        entry.target.classList.remove("active");
        entry.target.style.transitionDelay = "0s";
      }
    });
  }, observerOptions);
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}
initScrollToTop();
initScrollAnimations();

// ============================
// Dual contact forms
// ============================
const personalBtn = document.getElementById("personalBtn");
const teamBtn = document.getElementById("teamBtn");

const personalForm = document.getElementById("personalForm");
const teamForm = document.getElementById("teamForm");

if (personalBtn && teamBtn && personalForm && teamForm) {
  // --- Initialization (Set default state) ---
  personalForm.style.display = "block";
  teamForm.style.display = "none";
  personalBtn.classList.add("active");
  teamBtn.classList.remove("active");

  // --- Event Listeners ---
  personalBtn.addEventListener("click", () => {
    personalForm.style.display = "block";
    teamForm.style.display = "none";
    personalBtn.classList.add("active");
    teamBtn.classList.remove("active");
  });

  teamBtn.addEventListener("click", () => {
    teamForm.style.display = "block";
    personalForm.style.display = "none";
    teamBtn.classList.add("active");
    personalBtn.classList.remove("active");
  });
}

// ============================
// LISTINGS & FILTERS
// ============================
// 1. Function to display the properties
function renderProperties(propertiesToRender) {
  const grid = document.getElementById("listingsGrid");
  const countDisplay = document.getElementById("filterCount");

  if (!grid) return;

  // Update the count display
  if (countDisplay) {
    countDisplay.style.display = "block";
    countDisplay.textContent = `Showing ${propertiesToRender.length} Properties`;
  }

  // Build the HTML
  grid.innerHTML = propertiesToRender
    .map((p) => {
      // Reuse our logic to hide specs if they are 0
      const bedHTML =
        p.beds > 0
          ? `<p><i class="ri-hotel-bed-line"></i> ${p.beds} bed</p>`
          : "";
      const bathHTML =
        p.baths > 0
          ? `<p><i class="ri-bath-line"></i> ${p.baths} bath</p>`
          : "";
      const sqftHTML =
        p.sqft > 0
          ? `<p><i class="ri-ruler-line"></i> ${p.sqft.toLocaleString()}sqft</p>`
          : "";

      return `
      <div class="smallImgBox">
        <div class="profile-pic">
          <img src="${p.cover_image}" alt="${p.title}" class="smallListImg" />
        </div>
        <div class="smallImgText">
          <h4>${p.title}</h4>
          <p class="location">
            <i class="ri-map-pin-line"></i>${p.location}, ${p.region}
          </p>
          <h4>₦${Number(p.price).toLocaleString()}</h4>
          <div class="features">
            ${bedHTML}
            ${bathHTML}
            ${sqftHTML}
          </div>
          <a href="property1.html" class="btn">View Details</a>
        </div>
      </div>
    `;
    })
    .join("");
}

// 2. The Filter Function
function runListingsFilter() {
  if (typeof allProperties === "undefined") return;

  const typeReq = document.getElementById("search-type").value;
  const locReq = document.getElementById("search-location").value.toLowerCase();
  const catReq = document.getElementById("search-category").value;
  const bedReq = document.getElementById("search-bed").value;
  const budgetReq = document.getElementById("search-budget").value;

  const filtered = allProperties.filter((p) => {
    // Match Property Type (e.g., Apartment)
    const matchType = !typeReq || p.type === typeReq;

    // Match Location (Checking if the user selection is part of the location string)
    const matchLoc = !locReq || p.location.toLowerCase().includes(locReq);

    // Match Category (For Sale / For Rent)
    const matchCat = !catReq || p.category === catReq;

    // Match Bedrooms
    let matchBed = true;
    if (bedReq) {
      if (bedReq === "6-plus") matchBed = p.beds >= 6;
      else matchBed = p.beds === parseInt(bedReq);
    }

    // Match Budget
    let matchBudget = true;
    const price = Number(p.price);
    if (budgetReq) {
      if (budgetReq === "50m") matchBudget = price <= 50000000;
      else if (budgetReq === "100m")
        matchBudget = price > 50000000 && price <= 100000000;
      else if (budgetReq === "500m")
        matchBudget = price > 100000000 && price <= 500000000;
      else if (budgetReq === "500m+") matchBudget = price > 500000000;
    }

    return matchType && matchLoc && matchCat && matchBed && matchBudget;
  });

  renderProperties(filtered);
}

// 3. Reset Function
function resetFilters() {
  document
    .querySelectorAll(".listings-search-container select")
    .forEach((s) => (s.value = ""));
  if (typeof allProperties !== "undefined") renderProperties(allProperties);
}

// 4. Populate Locations
function populateLocationDropdown() {
  const locationSelect = document.getElementById("search-location");
  if (!locationSelect || typeof allProperties === "undefined") return;

  const uniqueLocations = [
    ...new Set(allProperties.map((p) => p.location)),
  ].sort();

  const locationOptions = uniqueLocations
    .map((loc) => `<option value="${loc}">${loc}</option>`)
    .join("");
  locationSelect.innerHTML =
    `<option value="">All Locations</option>` + locationOptions;
}

/* =============================
   INITIALIZATION (The "Gatekeeper")
============================= */
window.addEventListener("DOMContentLoaded", () => {
  // Check if we are on the listings page by looking for the grid
  const grid = document.getElementById("listingsGrid");

  if (grid && typeof allProperties !== "undefined") {
    populateLocationDropdown();
    renderProperties(allProperties);
  } else {
    console.log(
      "Listing grid or property data not found. Skipping listing logic.",
    );
  }

  // You can put other page-agnostic functions here, like your nav link highlighter
  if (typeof initActiveNavLinks === "function") {
    initActiveNavLinks();
  }
});

// ============================
// Book team training deep link
// ============================
const params = new URLSearchParams(window.location.search);
const formType = params.get("form");
const contactWrapper = document.querySelector(".contactFormWrapper");

if (formType === "team" && teamForm && personalForm && teamBtn && personalBtn) {
  teamForm.style.display = "block";
  personalForm.style.display = "none";
  teamBtn.classList.add("active");
  personalBtn.classList.remove("active");

  if (contactWrapper) {
    contactWrapper.scrollIntoView({ behavior: "smooth" });
  }
}

// ============================
// STATS COUNT UP
// ============================
const counters = document.querySelectorAll(".counter");
let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

const counterObserver = new IntersectionObserver(
  (entries) => {
    // 1. Determine scroll direction once for this batch of entries
    const currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    const isScrollingDown = currentScrollTop > lastScrollTop;

    entries.forEach((entry) => {
      const target = entry.target;
      const destination = +target.getAttribute("data-target");
      const rect = entry.boundingClientRect;

      // 2. TRIGGER: If visible AND user is scrolling DOWN
      if (entry.isIntersecting && isScrollingDown) {
        // Only start if it's currently at 0 (prevents double-triggering)
        if (target.innerText === "0") {
          const updateCount = () => {
            const count = +target.innerText;
            const increment = Math.ceil(destination / 100);

            if (count < destination) {
              target.innerText = count + increment;
              if (count + increment > destination) {
                target.innerText = destination;
              } else {
                setTimeout(updateCount, 20);
              }
            }
          };
          updateCount();
        }
      }

      // 3. RESET: If the element is completely below the viewport
      // (This happens when you scroll UP away from the section)
      if (!entry.isIntersecting && rect.top > window.innerHeight) {
        target.innerText = "0";
      }
    });

    // 4. Update the global scroll tracker for the next move
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  },
  {
    threshold: 0.2, // Trigger as soon as 20% of the number is visible
  },
);

counters.forEach((counter) => counterObserver.observe(counter));

// ============================
// DUMMY DATA (Add this or pass it dynamically)
// ============================
const images = [
  "images/listing1.jpg",
  "images/interior2.jpg",
  "images/interior3.jpg",
  "images/interior4.jpg",
  "images/interior5.jpg",
  "images/interior6.jpg",
  "images/interior7.jpg",
  "images/interior8.jpg",
  "images/interior9.jpg",
  "images/interior10.jpg",
  "images/interior11.jpg",
  "images/interior12.jpg",
];
const propertyTitle = "Luxury Villa";

// ============================
// PROPERTY DETAILS PHOTO & MODAL
// ============================

const galleryMain = document.getElementById("galleryMain");
const galleryGrid = document.getElementById("galleryGrid");
const modalSlides = document.getElementById("modalSlides");

// Track current slide globally
let slideIndex = 0;

// MAIN IMAGE
if (galleryMain) {
  const mainImg = document.createElement("img");
  mainImg.src = images[0];
  mainImg.alt = `${propertyTitle} Main`;
  mainImg.onclick = () => openModal(0);
  galleryMain.appendChild(mainImg);
}

// GRID IMAGES (max 4)
if (galleryGrid) {
  const gridImages = images.slice(1, 5);
  gridImages.forEach((imgSrc, i) => {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    if (i === 3 && images.length > 5) gridItem.classList.add("last-item");

    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = `${propertyTitle} Interior ${i + 1}`;
    img.onclick = () => openModal(i + 1);
    gridItem.appendChild(img);

    if (i === 3 && images.length > 4) {
      const btn = document.createElement("button");
      btn.classList.add("all-photos-btn");
      btn.innerHTML = '<i class="fa-solid fa-images"></i> All Photos';
      btn.onclick = (e) => {
        e.stopPropagation();
        openModal(0);
      };
      gridItem.appendChild(btn);
    }

    galleryGrid.appendChild(gridItem);
  });

  // MODAL SLIDES
  images.forEach((imgSrc) => {
    const slide = document.createElement("img");
    slide.src = imgSrc;
    slide.classList.add("slide");
    slide.style.display = "none"; // hide initially
    modalSlides.appendChild(slide);
  });
}

// OPEN MODAL
function openModal(n) {
  const modal = document.getElementById("photoModal");
  if (!modal) return;
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
  slideIndex = n; // Set the index
  showSlides(slideIndex);
}

// CLOSE MODAL
function closeModal() {
  const modal = document.getElementById("photoModal");
  if (modal) modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// NAVIGATION
function changeSlide(n) {
  slideIndex += n;
  showSlides(slideIndex);
}

function showSlides(n) {
  const slides = document.getElementsByClassName("slide");
  if (!slides.length) return;

  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex].style.display = "block";

  updateModalCounter();
}

function updateModalCounter() {
  const currentNum = document.getElementById("currentNum");
  const totalNum = document.getElementById("totalNum");

  if (currentNum) currentNum.innerText = slideIndex + 1;
  // Fixed: using images.length instead of undefined currentSlides.length
  if (totalNum) totalNum.innerText = images.length;
}

// Close modal if click outside image
window.addEventListener("click", (e) => {
  if (e.target === document.getElementById("photoModal")) closeModal();
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("photoModal");
  if (!modal || modal.style.display !== "block") return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") changeSlide(1);
  if (e.key === "ArrowLeft") changeSlide(-1);
});

document.addEventListener("DOMContentLoaded", () => {
  const prevBtn = document.querySelector(".modal-prev");
  const nextBtn = document.querySelector(".modal-next");
  const closeBtn = document.querySelector(".close-modal");

  if (prevBtn) prevBtn.addEventListener("click", () => changeSlide(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => changeSlide(1));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
});

/*==========================
ELEMENTS SCALE ANIMATION
============================ */
const observerOptions = {
  root: null,
  threshold: 0.2,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    } else {
      entry.target.classList.remove("is-visible");
    }
  });
}, observerOptions);

// Attach to all elements with the class
document.querySelectorAll(".scale-item").forEach((el) => observer.observe(el));
