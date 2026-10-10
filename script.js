const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    });
});


const quoteForm = document.getElementById("quoteForm");

quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const location = document.getElementById("location").value.trim();

    const message =
`Hello Singabakho Property Solutions,

I would like to request a quote.

Name: ${name}
Phone: ${phone}
Service: ${service}
Location: ${location}`;

    const whatsappUrl =
        "https://wa.me/27796129222?text=" +
        encodeURIComponent(message);

    window.open(
        whatsappUrl,
        "_blank"
    );
});

// Replay a gentle entrance when content returns to view in either direction.
// Content stays visible if animation or IntersectionObserver is unavailable.
if ("IntersectionObserver" in window && "Element" in window &&
    "animate" in Element.prototype && "matchMedia" in window) {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const activeAnimations = new Map();
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting || motionPreference.matches) return;

            activeAnimations.get(entry.target)?.cancel();
            const isImage = entry.target.matches(".why-image");
            const isHeading = entry.target.matches(".section-heading, .why-content, .quote-intro");
            const animation = entry.target.animate(
                [
                    { opacity: 0.92, translate: isHeading ? "-3px 0" : "0 5px", scale: isImage ? "0.995" : "1" },
                    { opacity: 1, translate: "0 0", scale: "1" }
                ],
                { duration: 350, delay: Number(entry.target.dataset.scrollDelay || 0), easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
            );
            activeAnimations.set(entry.target, animation);
            animation.onfinish = () => activeAnimations.delete(entry.target);
        });
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });

    document.querySelectorAll(
        ".info-box, .section-heading, .service-card, .why-content, " +
        ".benefit, .why-image, .testimonial-card, .quote-intro, .quote-form"
    ).forEach((element) => {
        const siblings = [...element.parentElement.children];
        element.dataset.scrollDelay = String((siblings.indexOf(element) % 4) * 15);
        scrollObserver.observe(element);
    });

    const handleMotionChange = () => {
        if (motionPreference.matches) {
            activeAnimations.forEach((animation) => animation.cancel());
            activeAnimations.clear();
        }
    };
    if (motionPreference.addEventListener) {
        motionPreference.addEventListener("change", handleMotionChange);
    } else if (motionPreference.addListener) {
        motionPreference.addListener(handleMotionChange);
    }
}
