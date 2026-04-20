/* ============================================================
   ty2035.dev — client-side interactions
   ============================================================ */

(() => {
  /* —— Reveal on scroll —— */
  const showHero = () =>
    document.querySelectorAll(".hero .reveal").forEach((el) => el.classList.add("in"));
  if (document.readyState === "complete") showHero();
  else window.addEventListener("load", showHero);

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  // Only reveal sections (not individual rows — they'd feel like too much)
  document.querySelectorAll(".section").forEach((el) => {
    if (el.closest(".hero")) return;
    el.classList.add("reveal");
    io.observe(el);
  });

  // Failsafe: reveal everything after 2.2s in case observer misses anything
  setTimeout(() => {
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => el.classList.add("in"));
  }, 2200);

  /* —— Seoul clock (for the hero status line) —— */
  const clock = document.getElementById("clock");
  if (clock) {
    const updateClock = () => {
      const now = new Date();
      clock.textContent = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false, timeZone: "Asia/Seoul",
      }).format(now);
    };
    updateClock();
    setInterval(updateClock, 1000);
  }

  /* —— Scroll progress bar —— */
  const progress = document.getElementById("progress");
  if (progress) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
        progress.style.width = Math.min(100, Math.max(0, pct)) + "%";
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* —— Nav active state —— */
  const navLinks = document.querySelectorAll(".nav-links a");
  const sectionIds = ["#about", "#works", "#writing", "#connect"];
  const sections = sectionIds.map((id) => document.querySelector(id)).filter(Boolean);
  if (sections.length && navLinks.length) {
    const navIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = "#" + entry.target.id;
            navLinks.forEach((a) => {
              a.classList.toggle("active", a.getAttribute("href") === id);
            });
          }
        });
      },
      { threshold: 0.4, rootMargin: "-20% 0px -40% 0px" }
    );
    sections.forEach((s) => navIO.observe(s));
  }

  /* —— Copy to clipboard (Discord handle) —— */
  const toast = document.getElementById("toast");
  let toastTimer;
  const showToast = (msg = "Copied to clipboard") => {
    if (!toast) return;
    const inner = toast.querySelector(".toast-inner");
    if (inner) inner.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
  };
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const value = btn.getAttribute("data-copy");
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        showToast(`Copied: ${value}`);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = value;
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          showToast(`Copied: ${value}`);
        } catch {
          showToast("Couldn't copy");
        }
        document.body.removeChild(ta);
      }
    });
  });

  /* —— Footer "last updated" —— */
  const lastEl = document.getElementById("lastUpdated");
  if (lastEl) {
    try {
      const d = new Date(document.lastModified);
      if (!isNaN(d.getTime())) {
        lastEl.textContent = new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
        }).format(d);
      }
    } catch {}
  }
})();