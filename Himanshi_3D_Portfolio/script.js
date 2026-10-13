document.addEventListener("DOMContentLoaded", () => {
  const $ = (s) => document.querySelector(s),
    $$ = (s) => [...document.querySelectorAll(s)];
  const root = document.documentElement,
    RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE = matchMedia("(hover: hover)").matches;

  /* ---- Links & data (edit here) ---- */
  const RESUME = "assets/Himanshi_Bisht_Resume.pdf";
  const MAIL = "himanshibisht25@navgurukul.org",
    GH = "https://github.com/HIMANSHI977";
  const LI = "https://www.linkedin.com/in/himanshi-bisht-b9672237b/";
  const dl = $("#dlCv");
  if (dl) {
    dl.href = RESUME;
    dl.target = "_blank";
    dl.rel = "noopener noreferrer";
  }

  const S = {
    Frontend: [
      "HTML5",
      "CSS3",
      "JavaScript (ES6+ and DOM)",
      "React",
      "React Router",
      "Context API",
      "useReducer",
      "TanStack Query",
    ],
    Backend: [
      "Node.js",
      "Express.js",
      "REST API Design",
      "MongoDB",
      "Mongoose",
      "SQL",
      "Python 3",
    ],
    Tools: [
      "Git",
      "GitHub",
      "Vercel",
      "Axios",
      "Postman",
      "Visual Studio Code",
    ],
    "AI & Integrations": [
      "Gemini API",
      "REST API Integration",
      "Environment Variables (.env)",
    ],
  };
  /* ---- Projects (edit here: each project carries its own live + repo URL) ---- */
  const PROJECTS = [
    {
      title: "CareerTrack",
      description:
        "Responsive job application tracking dashboard with status tracking, deadlines, search and filter, dashboard statistics, CSV export and dark/light themes. Data is saved in local storage.",
      stack: ["HTML", "CSS", "JavaScript", "localStorage"],
      tags: ["JavaScript"],
      live: "https://himanshi977.github.io/Career-Track/",
      repo: "https://github.com/HIMANSHI977/Career-Track",
    },
    {
      title: "Agile Issue Tracker",
      description:
        "Agile-style issue tracker with Todo, In Progress and Done stages. CRUD ticket management, API data fetching and reusable dashboard components.",
      stack: ["React.js", "TanStack Query", "JSON Server"],
      tags: ["React"],
      live: "https://agile-project-eight.vercel.app/",
      repo: "https://github.com/HIMANSHI977/Agile-Project-",
    },
    {
      title: "Feedback Manager",
      description:
        "A feedback-management web application that uses MongoDB, deployed on Vercel.",
      stack: ["MongoDB", "Express.js", "Node.js"],
      tags: ["Node.js"],
      live: "https://feedback-manager-92sm.vercel.app/",
      repo: "https://github.com/HIMANSHI977/Feedback-Manager",
    },
    {
      title: "Ask Gemini",
      description:
        "AI-powered question-and-answer app. Express backend with REST API routes, asynchronous API calls and server-side handling of API credentials.",
      stack: ["Node.js", "Express.js", "Gemini API", "dotenv"],
      tags: ["Node.js", "AI"],
      live: "https://ask-gemini-1coq.vercel.app/",
      repo: "https://github.com/HIMANSHI977/Ask-Gemini",
    },
    {
      title: "AI Content Generator",
      description: "AI-integrated web application designed to generate content.",
      stack: ["HTML", "CSS", "JavaScript", "AI integration"],
      tags: ["JavaScript", "AI"],
      live: "https://himanshibisht1308-boop.github.io/Ai-content-genrator/",
      repo: "https://github.com/HIMANSHI977/ai-content-generator",
    },
    {
      title: "Velora",
      description:
        "Responsive e-commerce app with product listings, product details, checkout pages, client-side routing, centralized cart state and API-based product data.",
      stack: ["React.js", "React Router", "Context API", "useReducer", "Axios"],
      tags: ["React"],
      live: "https://capstone-project-bice-zeta.vercel.app/",
      repo: "https://github.com/HIMANSHI977/Capstone-Project",
    },
    {
      title: "Quiz App",
      description: "Interactive quiz application built with JavaScript.",
      stack: ["JavaScript"],
      tags: ["JavaScript"],
      live: "https://himanshi977.github.io/quiz-app/",
      repo: "https://github.com/HIMANSHI977/quiz-app",
    },
    {
      title: "Tic-Tac-Toe",
      description:
        "Browser-based Tic-Tac-Toe game with an interactive game board and JavaScript game logic.",
      stack: ["HTML", "CSS", "JavaScript"],
      tags: ["JavaScript"],
      live: "https://himanshi977.github.io/Tic-tac-toe-/",
      repo: "https://github.com/HIMANSHI977/Tic-tac-toe-",
    },
  ];

  /* ---- Toast ---- */
  const toastEl = $("#toast");
  let tt;
  const toast = (m) => {
    toastEl.textContent = m;
    toastEl.classList.add("on");
    clearTimeout(tt);
    tt = setTimeout(() => toastEl.classList.remove("on"), 2200);
  };

  /* ---- Theme toggle with circular reveal ---- */
  const tb = $("#theme");
  const label = () => {
    const l =
      root.dataset.theme === "dark"
        ? "Switch to light mode"
        : "Switch to dark mode";
    tb.setAttribute("aria-label", l);
    tb.title = l;
  };
  function setTheme(n, x, y) {
    const apply = () => {
      root.dataset.theme = n;
      try {
        localStorage.setItem("theme", n);
      } catch (e) {}
      label();
      colors();
    };
    if (!document.startViewTransition || RM) return apply();
    document
      .startViewTransition(apply)
      .ready.then(() =>
        root.animate(
          {
            clipPath: [
              `circle(0 at ${x}px ${y}px)`,
              `circle(150vmax at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 650,
            easing: "ease-in",
            pseudoElement: "::view-transition-new(root)",
          },
        ),
      )
      .catch(() => {});
  }
  const flip = (x = innerWidth / 2, y = 0) =>
    setTheme(root.dataset.theme === "dark" ? "light" : "dark", x, y);
  tb.onclick = () => {
    const r = tb.getBoundingClientRect();
    flip(r.left + r.width / 2, r.top + r.height / 2);
  };
  label();

  /* ---- Mobile menu + active link ---- */
  const menu = $("#menu"),
    bg = $("#burger");
  const setMenu = (o) => {
    menu.classList.toggle("open", o);
    bg.setAttribute("aria-expanded", o);
    bg.setAttribute("aria-label", o ? "Close menu" : "Open menu");
  };
  bg.onclick = () => setMenu(!menu.classList.contains("open"));
  $$("#menu a").forEach((a) => (a.onclick = () => setMenu(false)));
  addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
  if (typeof IntersectionObserver !== "undefined") {
    const spy = new IntersectionObserver(
      (es) =>
        es.forEach(
          (e) =>
            e.isIntersecting &&
            $$("#menu a").forEach((a) =>
              a.classList.toggle("on", a.hash === "#" + e.target.id),
            ),
        ),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    $$("main section[id]").forEach((s) => spy.observe(s));
  }

  /* ---- 3D background lives in background.js (Three.js) ---- */
  function colors() {
    // Keep the cursor glow in sync with the selected theme.
    root.style.setProperty("--glow-rgb", getComputedStyle(root).getPropertyValue("--rgb").trim());
  }
  colors();

  /* ---- Cursor glow, scroll progress ---- */
  const glow = $(".glow");
  addEventListener("pointermove", (e) => {
    glow.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
  });
  addEventListener(
    "scroll",
    () =>
      root.style.setProperty(
        "--p",
        scrollY / (root.scrollHeight - innerHeight || 1),
      ),
    { passive: true },
  );

  /* ---- 3D tilt + spotlight ---- */
  function tilt(el) {
    if (!FINE || RM) return;
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect(),
        x = (e.clientX - r.left) / r.width,
        y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--mx", x * 100 + "%");
      el.style.setProperty("--my", y * 100 + "%");
      el.style.transform = `perspective(800px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-4px)`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.transform = "";
    });
  }

  /* ---- Typing effect ---- */
  const roles = [
    "responsive frontends",
    "Node.js & Express APIs",
    "AI-integrated web apps",
  ];
  let ri = 0,
    ci = 0,
    del = 0;
  (function type() {
    const w = roles[ri];
    ci += del ? -1 : 1;
    $("#typed").textContent = w.slice(0, ci);
    let t = del ? 30 : 70;
    if (!del && ci === w.length) {
      del = 1;
      t = 1400;
    } else if (del && !ci) {
      del = 0;
      ri = (ri + 1) % roles.length;
      t = 300;
    }
    setTimeout(type, t);
  })();
  if (RM) $("#typed").textContent = roles[0];

  /* ---- Skills (filterable cloud) ---- */
  const tabs = $("#tabs"),
    cloud = $("#cloud");
  Object.entries(S).forEach(([k, v]) =>
    v.forEach((s) => {
      const li = document.createElement("li");
      li.className = "chip";
      li.dataset.c = k;
      li.textContent = s;
      cloud.append(li);
    }),
  );
  ["All", ...Object.keys(S)].forEach((k, i) => {
    const b = document.createElement("button");
    b.className = "fb";
    b.type = "button";
    b.textContent = k;
    b.setAttribute("aria-pressed", i === 0);
    b.onclick = () => {
      $$("#tabs .fb").forEach((x) => x.setAttribute("aria-pressed", x === b));
      $$(".chip").forEach((c) =>
        c.classList.toggle("dim", k !== "All" && c.dataset.c !== k),
      );
    };
    tabs.append(b);
  });

  /* ---- Projects (filter + cards with Live Demo / Source Code) ---- */
  const grid = $("#grid");
  const linkBtn = (href, text, cls, label) => {
    const a = document.createElement("a");
    a.className = `btn ${cls} sm`;
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = text;
    a.setAttribute("aria-label", label);
    return a;
  };
  PROJECTS.forEach((p) => {
    const a = document.createElement("article");
    a.className = "card proj rv";
    a.dataset.tags = p.tags.join(",");
    a.innerHTML = `<h3></h3><p></p><ul class="tags"></ul><div class="row"></div>`;
    a.querySelector("h3").textContent = p.title;
    a.querySelector("p").textContent = p.description;
    p.stack.forEach((s) => {
      const li = document.createElement("li");
      li.textContent = s;
      a.querySelector(".tags").append(li);
    });
    a.querySelector(".row").append(
      linkBtn(p.live, "Live Demo ↗", "pri", `Live Demo: ${p.title} (opens in a new tab)`),
      linkBtn(p.repo, "Source Code ↗", "gh", `Source Code: ${p.title} on GitHub (opens in a new tab)`),
    );
    grid.append(a);
    tilt(a);
  });
  ["All", "React", "Node.js", "AI", "JavaScript"].forEach((f, i) => {
    const b = document.createElement("button");
    b.className = "fb";
    b.type = "button";
    b.textContent = f;
    b.setAttribute("aria-pressed", i === 0);
    b.onclick = () => {
      $$("#filters .fb").forEach((x) =>
        x.setAttribute("aria-pressed", x === b),
      );
      $$(".proj").forEach((c) =>
        c.classList.toggle(
          "hide",
          f !== "All" && !c.dataset.tags.split(",").includes(f),
        ),
      );
    };
    $("#filters").append(b);
  });
  $$("[data-tilt]").forEach(tilt);

  /* ---- Terminal ---- */
  const out = $("#out"),
    inp = $("#cmd"),
    hist = [];
  let hi = 0;
  const say = (t, c) => {
    const d = document.createElement("div");
    d.textContent = t;
    if (c) d.className = c;
    out.append(d);
    out.scrollTop = out.scrollHeight;
  };
  const C = {
    help: () =>
      "Commands: about, skills, projects, education, certs, contact, resume, github, linkedin, theme, clear",
    about: () =>
      "BCA student building full-stack web apps with React, Node.js, MongoDB and AI integration.",
    skills: () =>
      Object.entries(S)
        .map(([k, v]) => `${k}: ${v.join(", ")}`)
        .join("\n"),
    projects: () => PROJECTS.map((p, i) => `${i + 1}. ${p.title}`).join("\n"),
    education: () => "Bachelor of Computer Applications (BCA), Eternal University, Baru Sahib, 2025 - Present",
    certs: () =>
      "React Bootcamp (Zuvy, Aug 3 2026)\nPython Certificate (Coursera)\nMongoDB Aggregation Fundamentals (MongoDB / Credly, 2026)",
    contact: () =>
      `Email: ${MAIL}\nPhone: 9045036472\nGitHub: ${GH}\nLinkedIn: ${LI}`,
    resume: () => {
      open(RESUME, "_blank", "noopener");
      return "Opening resume...";
    },
    github: () => {
      open(GH, "_blank", "noopener");
      return "Opening GitHub...";
    },
    linkedin: () => {
      open(LI, "_blank", "noopener");
      return "Opening LinkedIn...";
    },
    theme: () => {
      flip();
      return "Theme switched.";
    },
    clear: () => {
      out.textContent = "";
      return "";
    },
  };
  say('Hi! I am an interactive terminal. Type "help" to begin.');
  inp.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && hist.length) {
      hi = Math.max(0, hi - 1);
      inp.value = hist[hi];
      e.preventDefault();
    }
    if (e.key !== "Enter") return;
    const c = inp.value.trim().toLowerCase();
    inp.value = "";
    if (!c) return;
    hist.push(c);
    hi = hist.length;
    say("> " + c, "me");
    const r = C[c] ? C[c]() : `Command not found: ${c}. Type "help".`;
    if (r) say(r);
  });

  /* ---- Reveal and counters ---- */
  const count = (el) => {
    const n = +el.dataset.n,
      d = +el.dataset.d || 0,
      t0 = performance.now();
    (function s(t) {
      const k = Math.min(1, (t - t0) / 1200);
      el.textContent = (n * k).toFixed(d);
      if (k < 1) requestAnimationFrame(s);
    })(t0);
  };
  const revealAll = () =>
    $$(".rv:not(.in)").forEach((el) => {
      el.classList.add("in");
      el.querySelectorAll("[data-n]").forEach(count);
    });
  try {
    if (typeof IntersectionObserver === "undefined") throw new Error("no IO");
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          e.target.querySelectorAll("[data-n]").forEach(count);
          io.unobserve(e.target);
        }),
      { threshold: 0.15 },
    );
    $$(".rv").forEach((el) => io.observe(el));
    // Safety net: if the observer never fires, show everything anyway.
    setTimeout(revealAll, 3000);
  } catch (err) {
    revealAll();
  }

  const yr = $("#yr");
  if (yr) yr.textContent = new Date().getFullYear();
});


// Contact form submission using Formspree (async, no redirect)
(function () {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  if (!form || !status) return;

  const show = (msg, ok) => {
    status.textContent = msg;
    status.classList.toggle("ok", ok);
    status.classList.toggle("err", !ok);
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;

    btn.disabled = true;
    btn.textContent = "Sending...";
    status.textContent = "";
    status.classList.remove("ok", "err");

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        form.reset(); // only after a successful send
        show("Thank you! Your message has been sent successfully.", true);
      } else {
        let msg = "Unable to send your message. Please try again.";
        try {
          const data = await res.json();
          if (data.errors && data.errors.length)
            msg = data.errors.map((e) => e.message).join(" ");
        } catch (e) {}
        show(msg, false); // form data is kept so nothing is lost
      }
    } catch (err) {
      show("Network error. Please check your internet connection and try again.", false);
    } finally {
      btn.disabled = false;
      btn.innerHTML = original;
    }
  });
})();
