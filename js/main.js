document.getElementById("contactForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const alertBox = document.getElementById("alertBox");

  if (!name || !email || !message || !email.includes("@")) {
    alertBox.className = "alert alert-danger";
    alertBox.textContent = "يرجى ملء جميع الحقول بشكل صحيح.";
  } else {
    alertBox.className = "alert alert-success";
    alertBox.textContent = "تم إرسال الرسالة بنجاح!";
  }
  alertBox.classList.remove("d-none");
})

// Scroll to top button behavior
;(function () {
  const btn = document.getElementById('scrollToTop');
  if (!btn) return;

  // Show button after scrolling down 200px
  function onScroll() {
    if (window.scrollY > 200) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  }

  // Smooth scroll to top
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Attach listeners
  window.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', scrollToTop);

  // Accessibility: allow keyboard activation
  btn.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  });

  // Initialize on load in case page is already scrolled
  onScroll();
})();

// Theme toggle: persist in localStorage and respect system preference
;(function () {
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  if (!toggle) return;

  const storageKey = 'site-theme';

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark');
      toggle.textContent = '☀️';
      toggle.setAttribute('aria-pressed', 'true');
      toggle.title = 'تفعيل الوضع الفاتح';
    } else {
      document.body.classList.remove('dark');
      toggle.textContent = '🌙';
      toggle.setAttribute('aria-pressed', 'false');
      toggle.title = 'تفعيل الوضع الداكن';
    }
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'dark' || saved === 'light') return saved;
    // respect system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  // Initialize
  applyTheme(getPreferredTheme());

  toggle.addEventListener('click', function () {
    const isDark = document.body.classList.contains('dark');
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(storageKey, next);
  });
})();