(function () {
  const config = window.ESSENCE_MARKETING || {};
  const product = config.product || {};
  const tracking = config.tracking || {};
  const whatsapp = config.whatsapp || {};

  window.dataLayer = window.dataLayer || [];

  function loadScript(src) {
    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  }

  if (tracking.ga4MeasurementId) {
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${tracking.ga4MeasurementId}`);
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", tracking.ga4MeasurementId);
  }

  if (tracking.metaPixelId) {
    window.fbq =
      window.fbq ||
      function () {
        window.fbq.callMethod
          ? window.fbq.callMethod.apply(window.fbq, arguments)
          : window.fbq.queue.push(arguments);
      };
    window.fbq.push = window.fbq;
    window.fbq.loaded = true;
    window.fbq.version = "2.0";
    window.fbq.queue = [];
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", tracking.metaPixelId);
    window.fbq("track", "PageView");
  }

  if (tracking.tiktokPixelId) {
    window.ttq = window.ttq || [];
    window.ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
    window.ttq.setAndDefer = function (target, method) {
      target[method] = function () {
        target.push([method].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };
    window.ttq.methods.forEach((method) => window.ttq.setAndDefer(window.ttq, method));
    window.ttq.load = function (pixelId) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=" + pixelId + "&lib=ttq";
      document.head.appendChild(script);
    };
    window.ttq.load(tracking.tiktokPixelId);
    window.ttq.page();
  }

  function eventId(name) {
    return `${name}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  function ecommercePayload(extra = {}) {
    return {
      currency: product.currency || "MAD",
      value: product.price || 349,
      item_id: product.id || "EN-PACK-349",
      item_name: product.name || "Essence Noble Pack Femme Marocaine",
      item_category: product.category || "Beauty and apparel gift pack",
      ...extra
    };
  }

  function pushDataLayer(name, payload) {
    window.dataLayer.push({
      event: name,
      ecommerce: {
        currency: payload.currency,
        value: payload.value,
        items: [
          {
            item_id: payload.item_id,
            item_name: payload.item_name,
            item_category: payload.item_category,
            price: payload.value,
            quantity: 1
          }
        ]
      },
      event_id: payload.event_id,
      selected_color: payload.color,
      selected_size: payload.size
    });
  }

  function track(name, extra = {}) {
    const payload = ecommercePayload({ event_id: eventId(name), ...extra });
    pushDataLayer(name, payload);

    if (window.gtag) {
      window.gtag("event", name, {
        currency: payload.currency,
        value: payload.value,
        items: [
          {
            item_id: payload.item_id,
            item_name: payload.item_name,
            item_category: payload.item_category,
            price: payload.value,
            quantity: 1
          }
        ]
      });
    }

    if (window.fbq) {
      const metaName = {
        view_item: "ViewContent",
        begin_checkout: "InitiateCheckout",
        generate_lead: "Lead",
        contact: "Contact"
      }[name];
      if (metaName) {
        window.fbq("track", metaName, {
          content_ids: [payload.item_id],
          content_name: payload.item_name,
          content_type: "product",
          currency: payload.currency,
          value: payload.value
        }, { eventID: payload.event_id });
      }
    }

    if (window.ttq && typeof window.ttq.track === "function") {
      const tiktokName = {
        view_item: "ViewContent",
        begin_checkout: "InitiateCheckout",
        generate_lead: "SubmitForm",
        contact: "Contact"
      }[name];
      if (tiktokName) {
        window.ttq.track(tiktokName, {
          content_id: payload.item_id,
          content_type: "product",
          description: payload.item_name,
          currency: payload.currency,
          value: payload.value
        });
      }
    }
  }

  function whatsappUrl() {
    if (!whatsapp.number) {
      return "";
    }
    const cleanNumber = String(whatsapp.number).replace(/[^\d]/g, "");
    const message = encodeURIComponent(whatsapp.message || "Salam, bghit ncommandi Pack Essence Noble.");
    return `https://wa.me/${cleanNumber}?text=${message}`;
  }

  window.siteTrack = track;
  track("view_item");

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-track]");
    if (!trigger) {
      return;
    }
    track(trigger.getAttribute("data-track") || "select_content");
  });

  document.querySelector("[data-promo-video]")?.addEventListener(
    "play",
    () => track("select_content", { content_type: "promo_video" }),
    { once: true }
  );

  const waUrl = whatsappUrl();
  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    if (!waUrl) {
      return;
    }
    link.href = waUrl;
    link.removeAttribute("hidden");
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");
  });
})();
