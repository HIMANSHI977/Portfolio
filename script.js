// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (targetId === "#") return;

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});


// Contact form handling
const contactForm = document.querySelector(".form-stack");

if (contactForm) {
  const sendButton = contactForm.querySelector("button");

  sendButton.addEventListener("click", (event) => {
    event.preventDefault();

    const name = contactForm.querySelector('input[type="text"]');
    const email = contactForm.querySelector('input[type="email"]');
    const subject = contactForm.querySelectorAll('input[type="text"]')[1];
    const message = contactForm.querySelector("textarea");

    if (
      !name.value.trim() ||
      !email.value.trim() ||
      !subject.value.trim() ||
      !message.value.trim()
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    alert(`Thank you, ${name.value}! Your message has been received.`);

    name.value = "";
    email.value = "";
    subject.value = "";
    message.value = "";
  });
}


// Add active navigation link while scrolling
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
});