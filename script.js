// script.js - Portfolio Gia Bảo Đinh

document.addEventListener('DOMContentLoaded', function () {
  // Navbar toggle for mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close nav on link click (mobile)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // AOS animation
  AOS.init({
    duration: 900,
    once: true,
    offset: 60,
  });

  // Animate skill bars on scroll
  function animateSkills() {
    document.querySelectorAll('.progress-bar').forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 200);
    });
  }
  let skillsAnimated = false;
  window.addEventListener('scroll', () => {
    const skillsSection = document.querySelector('#skills');
    if (!skillsAnimated && skillsSection.getBoundingClientRect().top < window.innerHeight - 100) {
      animateSkills();
      skillsAnimated = true;
    }
  });

  // EmailJS contact form
  emailjs.init('user_xxxxxxxxxxxxxxxxxxxxx'); // Thay bằng userID của bạn
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = 'Đang gửi...';
    emailjs.sendForm('service_xxxxxxx', 'template_xxxxxxx', this)
      .then(function () {
        status.textContent = 'Gửi thành công! Cảm ơn bạn đã liên hệ.';
        form.reset();
      }, function (error) {
        status.textContent = 'Gửi thất bại. Vui lòng thử lại sau.';
      });
  });
});
