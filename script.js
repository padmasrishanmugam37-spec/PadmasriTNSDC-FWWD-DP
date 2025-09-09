/*

  Interactivity for the portfolio

  ---------------------------------

  Features:

  - Mobile nav toggle

  - Contact form validation + success toast (demo/local only)

  - Dynamic current year in footer

*/

// 1) Mobile navigation toggle

const navToggle = document.getElementById("navToggle");

const navMenu = document.getElementById("navMenu");

if (navToggle && navMenu) {

  navToggle.addEventListener("click", () => {

    const expanded = navToggle.getAttribute("aria-expanded") === "true";

    navToggle.setAttribute("aria-expanded", String(!expanded));

    navMenu.classList.toggle("show");

  });

}

// 2) Contact form validation + demo submit handler

const form = document.getElementById("contactForm");

if (form) {

  form.addEventListener("submit", (e) => {

    e.preventDefault();

    // Clear previous errors

    const nameError = document.getElementById("nameError");

    const emailError = document.getElementById("emailError");

    const messageError = document.getElementById("messageError");

    if (nameError) nameError.textContent = "";

    if (emailError) emailError.textContent = "";

    if (messageError) messageError.textContent = "";

    // Get values

    const name = document.getElementById("name")?.value.trim() || "";

    const email = document.getElementById("email")?.value.trim() || "";

    const message = document.getElementById("message")?.value.trim() || "";

    // Basic validation

    let valid = true;

    if (!name && nameError) {

      nameError.textContent = "Please enter your name.";

      valid = false;

    }

    if ((!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) && emailError) {

      emailError.textContent = "Please enter a valid email.";

      valid = false;

    }

    if ((!message || message.length < 5) && messageError) {

      messageError.textContent = "Please enter at least 5 characters.";

      valid = false;

    }

    if (!valid) return;

    // Demo: store locally and show toast

    const payload = { name, email, message, at: new Date().toISOString() };

    try {

      const existing = JSON.parse(localStorage.getItem("messages") || "[]");

      existing.push(payload);

      localStorage.setItem("messages", JSON.stringify(existing));

    } catch (err) {

      console.warn("LocalStorage not available", err);

    }

    // Show toast and reset form

    const toast = document.getElementById("toast");

    if (toast) {

      toast.hidden = false;

      toast.setAttribute("role", "alert"); // accessibility

      toast.textContent = "✅ Your message was captured locally. (Demo only)";

      setTimeout(() => {

        toast.hidden = true;

      }, 4000);

    }

    form.reset();

  });

}

// 3) Current year in footer

const yearSpan = document.getElementById("year");

if (yearSpan) {

  yearSpan.textContent = new Date().getFullYear();

}