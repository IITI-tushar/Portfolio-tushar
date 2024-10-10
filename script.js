document.addEventListener("DOMContentLoaded", function () {
    const headerArea = document.querySelector(".header-area");
    const links = document.querySelectorAll(".header ul li a");
    const form = document.forms["submitToGoogleSheet"];
    const msg = document.getElementById("msg");
  
    // Sticky header
    window.addEventListener("scroll", function () {
      if (window.scrollY > 1) {
        headerArea.classList.add("sticky");
      } else {
        headerArea.classList.remove("sticky");
      }
  
      // Update the active section in the header
      updateActiveSection();
    });
  
    links.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
  
        const target = this.getAttribute("href");
  
        // If the target section is already active, do nothing
        if (document.querySelector(target).classList.contains("active-section")) {
          return;
        }
  
        let offset = 0;
  
        if (target === "#home") {
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        } else {
          offset = document.querySelector(target).offsetTop - 40;
          window.scrollTo({
            top: offset,
            behavior: "smooth"
          });
        }
  
        // Update the active link
        links.forEach(link => link.classList.remove("active"));
        this.classList.add("active");
      });
    });
  
    // Initial content revealing
    ScrollReveal({
      distance: "100px",
      duration: 2000,
      delay: 200
    });
  
    ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
      origin: "left"
    });
    ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
      origin: "right"
    });
    ScrollReveal().reveal(".project-title, .contact-title", {
      origin: "top"
    });
    ScrollReveal().reveal(".projects, .contact", {
      origin: "bottom"
    });
  
    // Contact form to Excel sheet
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  
    form.addEventListener('submit', e => {
      e.preventDefault();
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
          msg.innerHTML = "Message sent successfully";
          setTimeout(() => {
            msg.innerHTML = "";
          }, 5000);
          form.reset();
        })
        .catch(error => console.error('Error!', error.message));
    });
  
    function updateActiveSection() {
      const scrollPosition = window.scrollY;
  
      // Checking if scroll position is at the top of the page
      if (scrollPosition === 0) {
        links.forEach(link => link.classList.remove("active"));
        document.querySelector(".header ul li a[href='#home']").classList.add("active");
        return;
      }
  
      // Iterate through each section and update the active class in the header
      document.querySelectorAll("section").forEach(section => {
        const target = section.getAttribute("id");
        const offset = section.offsetTop;
        const height = section.offsetHeight;
  
        if (scrollPosition >= offset - 40 && scrollPosition < offset + height - 40) {
          links.forEach(link => link.classList.remove("active"));
          document.querySelector(`.header ul li a[href='#${target}']`).classList.add("active");
        }
      });
    }
  });
  
