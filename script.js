const CONFIG = {
  name: "Khush Nagpal",
  role: "AI & Data Science Student",
  typedRoles: [
    "AI & Data Science Student",
    "Backend Developer",
    "Machine Learning Enthusiast"
  ],
  profilePhoto: "assets/images/profile.jpg",
  resume: "assets/resume.pdf",
  email: "khushnagpal792@gmail.com",
  phone: "+91 8979002635",
  location: "Agra, Uttar Pradesh, India",

  socials: {
    github: "https://github.com/KN-05",
    linkedin: "https://www.linkedin.com/in/khush-nagpal-576827327/",
    leetcode: "https://leetcode.com/u/khush5/",
    instagram: "https://www.instagram.com/khushnagpal5/?hl=en"
  },

  stats: [
    { label: "LeetCode Problems", value: 300, suffix: "+" },
    { label: "Technologies Learned", value: 10, suffix: "+" }
  ],

  skillCategories: {
    Languages: [
      { name: "Java", logo: "java", icon: "☕" },
      { name: "Python", logo: "python", icon: "🐍" },
      { name: "C", logo: "c", icon: "🔧" },
      { name: "SQL", logo: "", icon: "🗄️" },
      { name: "HTML", logo: "html5", icon: "📄" },
      { name: "CSS", logo: "css3", icon: "🎨" },
      { name: "JavaScript", logo: "javascript", icon: "⚡" }
    ],
    Backend: [
      { name: "Node.js", logo: "nodedotjs", icon: "🟢" },
      { name: "Express.js", logo: "express", icon: "🚂" }
    ],
    Database: [
      { name: "MongoDB", logo: "mongodb", icon: "🍃" },
      { name: "MySQL", logo: "mysql", icon: "🐬" },
      { name: "PostgreSql", logo: "postgresql", icon: "🐘" }
      
    ],
    "Machine Learning": [
      { name: "NumPy", logo: "numpy", icon: "🔢" },
      { name: "Pandas", logo: "pandas", icon: "🐼" },
      { name: "Scikit-Learn", logo: "scikitlearn", icon: "🤖" }
    ],
    Tools: [
      { name: "Git", logo: "git", icon: "🌿" },
      { name: "GitHub", logo: "github", icon: "🐙" },
      { name: "VS Code", logo: "visualstudiocode", icon: "🧩" },
      { name: "Postman", logo: "postman", icon: "📮" }
    ]
  },

  marqueeItems: [
    "HTML","CSS","JavaScript","Java","Python","Node","Express","MongoDB","Git","GitHub","VS Code","MySQL","Machine Learning"
  ],

  projects: [
    {
      title: "Crop Yield Prediction",
      description: "A machine learning model that predicts crop yield from soil and weather data to help farmers plan ahead.",
      image: "assets/images/project1.png",
      tech: ["Python", "Pandas", "NumPy", "Scikit-Learn"],
      live: "#",
      github: "https://github.com/KN-05/Crop-Yield-Predication-using-ml"
    },
    {
      title: "Unit Converter",
      description: "A responsive unit conversion web app covering length, weight, temperature and more, built with vanilla JS.",
      image: "assets/images/project2.png",
      tech: ["HTML", "CSS", "JavaScript"],
      live: "https://kn-05.github.io/unit_converter/",
      github: "https://github.com/KN-05/unit_converter"
    }
    
  ],

  timeline: [
    { date: "2020-21", title: "Secondary School", desc: "Completed schooling with a strong foundation in mathematics and computer science." },
    { date: "2023-24", title: "Higher Secondary", desc: "Focused on PCM with computer science, building the base for a career in tech." },
    { date: "2024", title: "B.Tech, CS", desc: "Started a B.Tech in Computer Science, diving deeper into programming and systems." },
    { date: "Current", title: "B.Tech, AI & Data Science", desc: "AI & Data Science is my domain — specializing here while building real-world projects." }
  ],

  codingProfiles: [
    { name: "GitHub", icon: "🐙", handle: "KN-05", url: "https://github.com/KN-05" },
    { name: "LinkedIn", icon: "💼", handle: "khushnagpal", url: "https://www.linkedin.com/in/khush-nagpal-576827327/" },
    { name: "LeetCode", icon: "🧠", handle: "khush5", url: "https://leetcode.com/u/khush5/" }
  ]
};



document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  initTheme();
  initLoader();
  renderSocials();
  renderStats();
  renderSkills();
  renderMarquee();
  renderProjects();
  renderTimeline();
  renderProfiles();
  renderContactInfo();
  initNav();
  initTypedRole();
  initReveal();
  initParticles();
  initCursorGlow();
  initMagnetic();
  initTilt();
  initBackToTop();
  initContactForm();
  initCounters();
});


function initTheme() {
  const saved = localStorage.getItem("kn-theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (systemDark ? "dark" : "dark");
  document.body.setAttribute("data-theme", theme);
  updateThemeIcon(theme);

  document.getElementById("themeToggle").addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", next);
    localStorage.setItem("kn-theme", next);
    updateThemeIcon(next);
  });
}
function updateThemeIcon(theme) {
  const icon = document.getElementById("themeIcon");
  icon.innerHTML = theme === "dark"
    ? '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'
    : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
}

function initLoader() {
  window.addEventListener("load", () => {
    setTimeout(() => document.getElementById("loader").classList.add("hidden"), 500);
  });
  setTimeout(() => document.getElementById("loader").classList.add("hidden"), 2200);
}


const SOCIAL_ICONS = {
  github: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 3.2 5.4 3.5 5.4 3.5a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.9c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/><path d="M10 9v12M10 13a4 4 0 0 1 8 0v8"/></svg>',
  leetcode: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 3L5 12l8 9M20 9l-5 5 5 5"/></svg>',
  email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7 10-7"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>'
};

function renderSocials() {
  const links = [
    { key: "github", url: CONFIG.socials.github },
    { key: "linkedin", url: CONFIG.socials.linkedin },
    { key: "leetcode", url: CONFIG.socials.leetcode }
  ];
  const html = links.map(l => `<a class="social-btn magnetic" href="${l.url}" target="_blank" rel="noopener" aria-label="${l.key}">${SOCIAL_ICONS[l.key]}</a>`).join("");
  document.getElementById("heroSocials").innerHTML = html;

  const contactLinks = [...links, { key: "instagram", url: CONFIG.socials.instagram }];
  document.getElementById("contactSocials").innerHTML = contactLinks.map(l => `<a class="social-btn magnetic" href="${l.url}" target="_blank" rel="noopener" aria-label="${l.key}">${SOCIAL_ICONS[l.key]}</a>`).join("");
}

function renderStats() {
  const html = CONFIG.stats.map(s => `
    <div class="stat-card glass" data-reveal="zoom">
      <div class="stat-num"><span class="counter" data-target="${s.value}">0</span><span class="suffix">${s.suffix || ""}</span></div>
      <div class="stat-label">${s.label}</div>
    </div>`).join("");
  document.getElementById("statGrid").innerHTML = html;
}


function renderSkills() {
  const cats = Object.keys(CONFIG.skillCategories);
  const tabsHTML = ['<button class="skill-tab active" data-cat="All">All</button>']
    .concat(cats.map(c => `<button class="skill-tab" data-cat="${c}">${c}</button>`)).join("");
  document.getElementById("skillsTabs").innerHTML = tabsHTML;

  function buildCards(filter) {
    let items = [];
    cats.forEach(c => CONFIG.skillCategories[c].forEach(s => items.push({ ...s, cat: c })));
    if (filter && filter !== "All") items = items.filter(i => i.cat === filter);
    return items.map(s => `
      <div class="skill-card glass tilt" data-reveal="zoom">
        <div class="skill-icon-wrap">
          ${s.logo ? `<img class="skill-logo" src="https://cdn.simpleicons.org/${s.logo}" alt="" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : ""}
          <span class="skill-emoji" style="display:${s.logo ? "none" : "flex"}">${s.icon}</span>
        </div>
        <div class="skill-name">${s.name}</div>
      </div>`).join("");
  }

  const grid = document.getElementById("skillsGrid");
  grid.innerHTML = buildCards("All");
  initReveal();

  document.getElementById("skillsTabs").addEventListener("click", (e) => {
    const btn = e.target.closest(".skill-tab");
    if (!btn) return;
    document.querySelectorAll(".skill-tab").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    grid.innerHTML = buildCards(btn.dataset.cat);
    initReveal();
  });
}

function renderMarquee() {
  const items = CONFIG.marqueeItems.concat(CONFIG.marqueeItems); // duplicate for seamless loop
  document.getElementById("marqueeTrack").innerHTML = items.map(i => `<div class="marquee-item glass"><span class="ic">◆</span>${i}</div>`).join("");
}


function renderProjects() {
  const html = CONFIG.projects.map(p => `
    <article class="project-card glass" data-reveal="up">
      <div class="project-media"><img src="${p.image}" alt="${p.title} screenshot" loading="lazy" onerror="this.src='https://placehold.co/600x400/0d1326/8fb4ff?text=${encodeURIComponent(p.title)}'"></div>
      <div class="project-body">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="tech-pills">${p.tech.map(t => `<span class="tech-pill">${t}</span>`).join("")}</div>
        <div class="project-links">
          <a href="${p.live}" target="_blank" rel="noopener" class="live">Live Demo</a>
          <a href="${p.github}" target="_blank" rel="noopener" class="code">GitHub</a>
        </div>
      </div>
    </article>`).join("");
  document.getElementById("projectsGrid").innerHTML = html;
}


function renderTimeline() {
  const html = CONFIG.timeline.map(t => `
    <div class="tl-item" data-reveal="up">
      <span class="tl-dot"></span>
      <span class="tl-date">${t.date}</span>
      <h3>${t.title}</h3>
      <p>${t.desc}</p>
    </div>`).join("");
  document.getElementById("timeline").innerHTML = html;
}


function renderProfiles() {
  const html = CONFIG.codingProfiles.map(p => `
    <div class="profile-card glass" data-reveal="up">
      <div class="p-icon">${p.icon}</div>
      <h3>${p.name}</h3>
      <div class="p-handle">${p.handle}</div>
      <a href="${p.url}" target="_blank" rel="noopener" class="btn btn-ghost magnetic" style="margin-top:8px">Visit Profile</a>
    </div>`).join("");
  document.getElementById("profilesGrid").innerHTML = html;
}


function renderContactInfo() {
  document.getElementById("infoEmail").textContent = CONFIG.email;
  document.getElementById("infoPhone").textContent = CONFIG.phone;
  document.getElementById("infoLocation").textContent = CONFIG.location;
}


function initNav() {
  const navbar = document.getElementById("navbar");
  const navLinks = document.getElementById("navLinks");
  const navToggle = document.getElementById("navToggle");
  const pill = document.getElementById("navPill");
  const links = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
    document.getElementById("backToTop")?.classList.toggle("show", window.scrollY > 500);
  });

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
    });
  });

  function movePill(el) {
    if (!el || window.innerWidth <= 960) return;
    pill.style.width = el.offsetWidth + "px";
    pill.style.transform = `translateX(${el.offsetLeft}px)`;
  }

  const sections = [...links].map(l => document.getElementById(l.dataset.nav)).filter(Boolean);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => l.classList.toggle("active", l.dataset.nav === id));
        const activeLink = document.querySelector(`.nav-link[data-nav="${id}"]`);
        movePill(activeLink);
      }
    });
  }, { rootMargin: "-45% 0px -45% 0px" });
  sections.forEach(s => observer.observe(s));

  window.addEventListener("resize", () => movePill(document.querySelector(".nav-link.active")));
  setTimeout(() => movePill(document.querySelector(".nav-link.active")), 300);
}


function initTypedRole() {
  const el = document.getElementById("typedRole");
  const roles = CONFIG.typedRoles;
  let r = 0, c = 0, deleting = false;

  function tick() {
    const word = roles[r];
    if (!deleting) {
      c++;
      el.textContent = word.slice(0, c);
      if (c === word.length) { deleting = true; setTimeout(tick, 1400); return; }
    } else {
      c--;
      el.textContent = word.slice(0, c);
      if (c === 0) { deleting = false; r = (r + 1) % roles.length; }
    }
    setTimeout(tick, deleting ? 35 : 65);
  }
  tick();
}

function initReveal() {
  const els = document.querySelectorAll("[data-reveal]:not(.in-view)");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.setProperty("--delay", (i % 6) * 0.08 + "s");
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => observer.observe(el));

  
  document.querySelectorAll(".tl-item").forEach(el => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { el.classList.add("in-view"); obs.unobserve(el); } });
    }, { threshold: 0.2 });
    obs.observe(el);
  });
}


function initCounters() {
  const counters = document.querySelectorAll(".counter");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}
function animateCounter(el) {
  const target = Number(el.dataset.target);
  const duration = 1400;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}


function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const count = window.innerWidth < 768 ? 35 : 70;
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.15
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139,180,255,${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) draw();
}

function initCursorGlow() {
  const glow = document.getElementById("cursorGlow");
  if (window.matchMedia("(pointer: coarse)").matches) { glow.style.display = "none"; return; }
  window.addEventListener("mousemove", (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
  });
}


function initMagnetic() {
  document.querySelectorAll(".magnetic").forEach(el => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = "translate(0,0)"; });
  });


  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.left = (e.clientX - rect.left) + "px";
      ripple.style.top = (e.clientY - rect.top) + "px";
      ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + "px";
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });
}


function initTilt() {
  document.addEventListener("mousemove", (e) => {
    const card = e.target.closest(".tilt");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) translateY(-4px)`;
  });
  document.addEventListener("mouseover", (e) => {
    if (!e.target.closest(".tilt")) {
      document.querySelectorAll(".tilt").forEach(c => { if (!c.contains(e.target)) c.style.transform = ""; });
    }
  });
}


function initBackToTop() {
  document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "Sending…";
    setTimeout(() => {
      status.textContent = `Thanks! Your message has been noted — I'll get back to you at ${document.getElementById("cEmail").value}.`;
      form.reset();
    }, 900);
  });
}
