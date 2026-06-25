const body = document.body;
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const colorButtons = document.querySelectorAll("[data-color]");
const colorSelect = document.querySelector("[data-color-select]");
const orderForm = document.querySelector("[data-order-form]");
const formStatus = document.querySelector("[data-form-status]");
const mobileCta = document.querySelector("[data-mobile-cta]");

function closeMenu() {
  body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-label", "فتح القائمة");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-label", isOpen ? "إغلاق القائمة" : "فتح القائمة");
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    closeMenu();
  }
});

function toggleMobileCta() {
  if (!mobileCta) {
    return;
  }

  const orderSection = document.querySelector("#order");
  const orderTop = orderSection ? orderSection.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
  const shouldShow = window.scrollY > 420 && orderTop > window.innerHeight * 0.45;
  mobileCta.classList.toggle("is-visible", shouldShow);
}

window.addEventListener("scroll", toggleMobileCta, { passive: true });
window.addEventListener("resize", toggleMobileCta);
toggleMobileCta();

colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedColor = button.getAttribute("data-color") || "Crème";

    colorButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    if (colorSelect) {
      colorSelect.value = selectedColor;
    }

    window.siteTrack?.("select_item", { color: selectedColor });
    document.querySelector("#order")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

orderForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(orderForm);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const city = String(data.get("city") || "").trim();
  const color = String(data.get("color") || "Crème");
  const size = String(data.get("size") || "M");
  const lead = {
    name,
    phone,
    city,
    color,
    size,
    product: "Essence Noble Pack Femme Marocaine",
    price: 349,
    currency: "MAD",
    createdAt: new Date().toISOString()
  };

  const existingLeads = JSON.parse(localStorage.getItem("essence_noble_leads") || "[]");
  existingLeads.push(lead);
  localStorage.setItem("essence_noble_leads", JSON.stringify(existingLeads));

  window.siteTrack?.("generate_lead", { color, size, city });

  formStatus.textContent = name
    ? `${name}، تم تسجيل طلبك: لون ${color} ومقاس ${size}. سنتواصل معك لتأكيد التفاصيل.`
    : `تم تسجيل طلبك: لون ${color} ومقاس ${size}. سنتواصل معك لتأكيد التفاصيل.`;
});
