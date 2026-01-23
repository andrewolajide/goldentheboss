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

// ============================
// Dual contact forms
// ============================
const personalBtn = document.getElementById("personalBtn");
const teamBtn = document.getElementById("teamBtn");

const personalForm = document.getElementById("personalForm");
const teamForm = document.getElementById("teamForm");

if (personalBtn && teamBtn && personalForm && teamForm) {
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
// Property filter + count
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filterBtn");
  const propertyCards = document.querySelectorAll(".smallImgBox");
  const filterTabs = document.querySelector(".filterTabs");

  if (!filterButtons.length || !propertyCards.length || !filterTabs) return;

  const countEl = document.createElement("span");
  countEl.className = "property-count";
  countEl.style.float = "right";
  countEl.style.fontWeight = "600";
  filterTabs.appendChild(countEl);

  function updateCount() {
    const visible = [...propertyCards].filter(
      card => card.style.display !== "none"
    ).length;
    countEl.textContent = `${visible} Properties`;
  }

  function filterSelection(category) {
    propertyCards.forEach(card => {
      const categories = card.dataset.category?.split(" ") || [];
      card.style.display =
        category === "all" || categories.includes(category)
          ? "block"
          : "none";
    });
    updateCount();
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filterSelection(btn.dataset.category);
    });
  });

  filterSelection("all");
});

// ============================
// Book team training deep link
// ============================
const params = new URLSearchParams(window.location.search);
const formType = params.get("form");
const contactWrapper = document.querySelector(".contactFormWrapper");

if (
  formType === "team" &&
  teamForm &&
  personalForm &&
  teamBtn &&
  personalBtn
) {
  teamForm.style.display = "block";
  personalForm.style.display = "none";
  teamBtn.classList.add("active");
  personalBtn.classList.remove("active");

  if (contactWrapper) {
    contactWrapper.scrollIntoView({ behavior: "smooth" });
  }
}
