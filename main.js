const placements = [
  ["Chaitrali Pankaj Kad", "Software Tester", "Sep 2026"],
  ["Rutuja Rajendra Gamare", "Full Stack Developer Intern", "Sep 2026"],
  ["Amir Shaikh", "AI / ML Engineer", "Sep 2026"],
  ["Rohit Kakade", "React JS Developer", "Sep 2026"],
  ["Vedant Charudatta Pawar", "Junior MERN Stack Developer", "Sep 2026"],
  ["Sonali Pandurang Gaikwad", "Java Developer", "Sep 2026"],
  ["Aishwarya Balu Bhosale", "Java Developer", "Sep 2026"],
  ["Atharva Harish Ajabe", "Python AI/ML Developer", "Sep 2026"],
  ["Sanket Bhima Kumbhar", "Software Developer", "Aug 2026"],
  ["Pratiksha Padmakar Karlekar", "Assistant System Engineer", "Aug 2026"]
];

function toggleMenu() {
  document.getElementById("navLinks")?.classList.toggle("open");
}

function initHeader() {
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 8);
  });
}

function initFeed() {
  const host = document.getElementById("liveFeed");
  if (!host) return;
  let i = 0;
  const render = () => {
    const [name, role, when] = placements[i % placements.length];
    host.innerHTML = `<div class="feed-item"><strong>${name}</strong><span>${role} · ${when}</span></div>`;
    i += 1;
  };
  render();
  setInterval(render, 2800);
}

function initCounters() {
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const tick = () => {
      current = Math.min(target, current + step);
      el.textContent = current.toLocaleString("en-IN") + suffix;
      if (current < target) requestAnimationFrame(tick);
    };
    tick();
  });
}

function filterCourses(group, btn) {
  document.querySelectorAll(".filter").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".course-card").forEach((card) => {
    card.classList.toggle("hidden", group !== "all" && card.dataset.group !== group);
  });
}

function submitLead(event) {
  event.preventDefault();
  const form = event.target;
  const error = form.querySelector(".form-error");
  const data = Object.fromEntries(new FormData(form).entries());
  const phone = String(data.phone || "").replace(/\s+/g, "");

  error?.classList.remove("show");

  if (!data.name || !phone || !data.email || !data.course || !data.branch || !data.message) {
    if (error) {
      error.textContent = "Please fill all fields to book your free demo.";
      error.classList.add("show");
    }
    return;
  }

  if (!/^[6-9]\d{9}$/.test(phone.replace(/^\+91/, ""))) {
    if (error) {
      error.textContent = "Enter a valid 10-digit Indian mobile number.";
      error.classList.add("show");
    }
    return;
  }

  const ref = "KA-DEMO-" + Date.now().toString().slice(-8);
  const booking = { ...data, phone, ref, bookedAt: new Date().toLocaleString("en-IN") };
  localStorage.setItem("tkaDemoBooking", JSON.stringify(booking));

  const set = (id, value) => {
    const el = form.querySelector(id);
    if (el) el.textContent = value;
  };
  set("#bookedName", data.name);
  set("#bookedCourse", data.course);
  set("#bookedBranch", data.branch);
  set("#bookedPhone", phone);
  set("#bookedRef", ref);

  form.classList.add("booked");
  form.querySelector(".booking-success")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function bookAnotherDemo() {
  const form = document.querySelector("form.form");
  form?.classList.remove("booked");
  form?.reset();
  form?.querySelector(".form-error")?.classList.remove("show");
}

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initFeed();
  initCounters();
});
