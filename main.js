// Shared boilerplate site behavior: sign-in modal (accepts any credentials,
// nothing is logged or validated) and contact form submit handler.

document.addEventListener("DOMContentLoaded", function () {
  var signinBtn = document.getElementById("signin-btn");
  var signinOverlay = document.getElementById("signin-overlay");
  var signinClose = document.getElementById("signin-close");
  var signinForm = document.getElementById("signin-form");
  var signinStatus = document.getElementById("signin-status");
  var signinMessage = document.getElementById("signin-message");

  function openModal() {
    if (signinOverlay) {
      signinOverlay.classList.add("open");
      signinMessage.classList.remove("visible");
      signinForm.reset();
    }
  }

  function closeModal() {
    if (signinOverlay) {
      signinOverlay.classList.remove("open");
    }
  }

  if (signinBtn) {
    signinBtn.addEventListener("click", function () {
      if (signinBtn.dataset.signedIn === "true") {
        // Act as a sign-out toggle once signed in.
        signinBtn.dataset.signedIn = "false";
        signinBtn.textContent = "Sign In";
        signinStatus.textContent = "";
        return;
      }
      openModal();
    });
  }

  if (signinClose) {
    signinClose.addEventListener("click", closeModal);
  }

  if (signinOverlay) {
    signinOverlay.addEventListener("click", function (event) {
      if (event.target === signinOverlay) {
        closeModal();
      }
    });
  }

  if (signinForm) {
    signinForm.addEventListener("submit", function (event) {
      event.preventDefault();
      // Test stub: any name/password combination is accepted.
      // Nothing here is checked, stored, or sent anywhere.
      var name = document.getElementById("signin-name").value.trim() || "Guest";

      signinMessage.textContent = "Signed in as " + name + "!";
      signinMessage.classList.add("visible");

      setTimeout(function () {
        closeModal();
        signinBtn.textContent = "Signed in as " + name;
        signinBtn.dataset.signedIn = "true";
        signinStatus.textContent = "";
      }, 900);
    });
  }

  // Contact form: no destination configured yet, just show a thank-you message.
  var contactForm = document.getElementById("contact-form");
  var formSuccess = document.getElementById("form-success");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      contactForm.reset();
      contactForm.style.display = "none";
      formSuccess.classList.add("visible");
    });
  }
});
