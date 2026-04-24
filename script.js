const motion = window.Motion;
if (motion) {
  const { animate, inView, stagger } = motion;

  animate(
    "h1, .hero-text, .hero-cta",
    { opacity: [0, 1], y: [22, 0] },
    { duration: 0.85, delay: stagger(0.1), easing: "ease-out" }
  );

  inView(".reveal", (element) => {
    animate(element, { opacity: [0, 1], y: [26, 0], scale: [0.98, 1] }, { duration: 0.65, easing: "ease-out" });
  });
}

async function loadSharedLayout() {
  const headerMount = document.getElementById("site-header");
  const footerMount = document.getElementById("site-footer");

  try {
    if (headerMount) {
      console.log("Fetching header from:", "./header.html");
      const headerResponse = await fetch("./header.html");
      if (headerResponse.ok) {
        headerMount.innerHTML = await headerResponse.text();
      } else {
        console.error("Header fetch failed with status:", headerResponse.status);
      }
    }
    if (footerMount) {
      console.log("Fetching footer from:", "./footer.html");
      const footerResponse = await fetch("./footer.html");
      if (footerResponse.ok) {
        footerMount.innerHTML = await footerResponse.text();
      } else {
        console.error("Footer fetch failed with status:", footerResponse.status);
      }
    }

    const activeNav = document.body.dataset.nav;
    if (activeNav) {
      const activeLink = document.querySelector(`[data-nav="${activeNav}"]`);
      if (activeLink) {
        activeLink.classList.remove("hover:text-brand-500");
        activeLink.classList.add("nav-link-active");
      }
    }
    console.log("Layout loaded successfully");
  } catch (error) {
    console.error("Error loading shared layout:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadSharedLayout();
});

const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

// Check for status parameters in the URL
const urlParams = new URLSearchParams(window.location.search);
const status = urlParams.get('status');

if (status && formMessage) {
  if (status === 'success') {
    formMessage.textContent = "Thank you! Your message has been sent successfully.";
    formMessage.className = "mt-4 text-green-400 font-semibold";
  } else if (status === 'error') {
    formMessage.textContent = "Oops! Something went wrong. Please try again later.";
    formMessage.className = "mt-4 text-red-400 font-semibold";
  } else if (status === 'no-phpmailer') {
    formMessage.textContent = "System configuration error (PHPMailer missing). Please contact administrator.";
    formMessage.className = "mt-4 text-orange-400 font-semibold";
  }
}

if (form && formMessage) {
  form.addEventListener("submit", (e) => {
    formMessage.textContent = "Processing your request...";
    formMessage.className = "mt-4 text-brand-500 animate-pulse";
  });
}

if (!document.querySelector(".whatsapp-float")) {
  const whatsappButton = document.createElement("a");
  whatsappButton.href = "https://api.whatsapp.com/send?phone=919821165575&text=Hi, I contacted you through website.";
  whatsappButton.className = "whatsapp-float shadow-lg hover:scale-110 transition-transform flex items-center justify-center";
  whatsappButton.target = "_blank";
  whatsappButton.rel = "noopener noreferrer";
  whatsappButton.setAttribute("aria-label", "Chat on WhatsApp");
  whatsappButton.title = "Chat on WhatsApp";
  
  // Using a simple WhatsApp-like SVG icon
  whatsappButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412 0 6.556-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.589.943 3.14 1.482 4.9 1.483 5.45.001 9.891-4.441 9.891-9.891 0-2.646-1.03-5.128-2.902-6.997-1.871-1.868-4.354-2.898-6.99-2.899-5.449 0-9.891 4.441-9.891 9.891-.001 1.83.514 3.551 1.492 4.981l-.973 3.548 3.659-.96c.001 0 .001 0 0 0zm11.231-5.65c-.093-.153-.341-.244-.712-.429-.371-.186-2.193-1.082-2.533-1.206-.341-.124-.589-.186-.836.186-.247.371-.959 1.206-1.176 1.454-.217.247-.433.278-.804.093-.371-.186-1.565-.577-2.981-1.839-1.101-.982-1.844-2.194-2.06-2.565-.216-.371-.023-.571.163-.756.166-.167.371-.433.557-.65.186-.216.248-.371.371-.62.124-.247.062-.464-.031-.65-.093-.186-.836-2.012-1.145-2.755-.3-.727-.606-.63-.836-.643l-.712-.013c-.248 0-.649.093-.99.464-.341.371-1.3 1.269-1.3 3.097 0 1.828 1.33 3.593 1.516 3.841.186.248 2.618 3.998 6.342 5.61.885.383 1.577.611 2.115.782.889.282 1.698.242 2.338.146.713-.107 2.193-.897 2.502-1.765.309-.867.309-1.61.216-1.765z"/></svg>`;
  
  document.body.appendChild(whatsappButton);
}
