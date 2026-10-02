// Shared boilerplate site behavior: sign-in modal (accepts any credentials,
// nothing is logged or validated) and contact form submit handler.

// Pendo: the visitor ID is the full email address entered as the name, and the
// account ID is the part of the domain between the "@" and the first "."
// (test only, nothing is validated). Without an "@", the whole value is the
// visitor ID and the account ID is "unknown". Pages are separate loads, so the
// entry is kept in sessionStorage and re-identified on each page.
function identifyInPendo(name) {
  if (!window.pendo || !pendo.identify) { return; }
  var at = name.lastIndexOf("@");
  var isEmail = at > 0 && at < name.length - 1;
  var visitor = { id: name, full_name: name };
  var accountId = "unknown";
  if (isEmail) {
    visitor.email = name;
    accountId = name.slice(at + 1).split(".")[0].toLowerCase() || accountId;
  }
  pendo.identify({ visitor: visitor, account: { id: accountId } });
}

document.addEventListener("DOMContentLoaded", function () {
  try {
    var saved = sessionStorage.getItem("pendoVisitor");
    if (saved) {
      identifyInPendo(saved);
      var btn = document.getElementById("signin-btn");
      if (btn) {
        btn.textContent = "Signed in as " + saved;
        btn.dataset.signedIn = "true";
      }
    }
  } catch (e) {}
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
        try { sessionStorage.removeItem("pendoVisitor"); } catch (e) {}
        if (window.pendo && pendo.clearSession) { pendo.clearSession(); }
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
        identifyInPendo(name);
        try { sessionStorage.setItem("pendoVisitor", name); } catch (e) {}
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
