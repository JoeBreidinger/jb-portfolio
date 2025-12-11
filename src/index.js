import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";

initScrollReveal(targetElements, defaultProps);
initTiltEffect();

// Copy-to-clipboard for contact link
function initCopyEmail() {
  const link = document.getElementById("copy-email-link");
  if (!link) return;

  const originalText = link.textContent;
  const mailto = link.getAttribute("href");
  // Always copy the Gmail address, regardless of mailto
  const email = "joseph.breidinger@gmail.com";

  // Only attach if we have an email
  if (!email) return;

  link.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers
        const tempInput = document.createElement("input");
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }
      link.textContent = "Email copied!";
      setTimeout(() => {
        link.textContent = originalText;
      }, 1500);
    } catch (err) {
      // If copy fails, fall back to opening mail client
      window.location.href = mailto;
    }
  });
}

document.addEventListener("DOMContentLoaded", initCopyEmail);
