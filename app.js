(() => {
  const $ = (q, el=document) => el.querySelector(q);
  const $$ = (q, el=document) => Array.from(el.querySelectorAll(q));

  const menuBtn = $("#menuBtn");
  const mobileMenu = $("#mobileMenu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const expanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!expanded));
      mobileMenu.hidden = expanded;
    });
  }

  $$("[data-scroll]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-scroll");
      if (!target) return;
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({behavior:"smooth", block:"start"});
      if (mobileMenu && !mobileMenu.hidden) {
        mobileMenu.hidden = true;
        menuBtn?.setAttribute("aria-expanded","false");
      }
    });
  });

  const toast = $("#toast");
  function showToast(msg){
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.hidden = true, 2800);
  }

  function handleWaitlist(form){
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      const email = (input?.value || "").trim();
      if (!email) return;

      const key = "naturdigest_waitlist";
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      if (!prev.includes(email)) prev.push(email);
      localStorage.setItem(key, JSON.stringify(prev));

      form.reset();
      showToast("✅ Apuntada. Te avisaremos para la beta.");
    });
  }

  const f1 = $("#waitlistForm");
  const f2 = $("#waitlistForm2");
  if (f1) handleWaitlist(f1);
  if (f2) handleWaitlist(f2);

  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
