(() => {
  const header = document.querySelector("header");
  const main = document.querySelector("main");
  const nav = main?.querySelector(":scope > nav");
  const profileButton = header?.querySelector("#openprofile");

  if (header && nav && profileButton) {
    nav.classList.add("site-nav");
    header.insertBefore(nav, profileButton);
  }

  const intro = document.querySelector(".intro");
  const title = intro?.querySelector("h1");
  if (intro && title) {
    const notice = main?.querySelector(":scope > .notice");
    if (notice) intro.after(notice);

    const date = new Intl.DateTimeFormat("sv-SE", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(new Date());
    intro.querySelector(".eyebrow").textContent = date.toLocaleUpperCase("sv-SE");
    title.replaceChildren(
      document.createTextNode("Vart ska jag åka "),
      Object.assign(document.createElement("span"), {
        textContent: "idag?",
      }),
    );
    intro.querySelector("#lead").textContent =
      "Hitta utflykter med färska observationer av arter du ännu inte kryssat.";

    const stats = document.createElement("div");
    stats.className = "hero-stats";
    stats.setAttribute("aria-label", "Din fågelöversikt");
    for (const [id, label] of [
      ["hero-seen", "DINA KRYSS"],
      ["hero-places", "PLATSER I SÖKOMRÅDET"],
      ["hero-species", "NYA ARTER I FÖRSLAGEN"],
    ]) {
      const item = document.createElement("div");
      const value = document.createElement("strong");
      const caption = document.createElement("span");
      value.id = id;
      value.textContent = "0";
      caption.textContent = label;
      item.append(value, caption);
      stats.append(item);
    }
    intro.append(stats);

    const updateStats = () => {
      document.getElementById("hero-seen").textContent =
        document.getElementById("count").textContent;
      const cards = [...document.querySelectorAll("#trips > .card")];
      document.getElementById("hero-places").textContent = String(cards.length);
      const species = cards.reduce((total, card) => {
        const count = Number.parseInt(card.querySelector(".new")?.textContent ?? "0", 10);
        return total + (Number.isFinite(count) ? count : 0);
      }, 0);
      document.getElementById("hero-species").textContent = String(species);
    };

    updateStats();
    const trips = document.getElementById("trips");
    const count = document.getElementById("count");
    new MutationObserver(updateStats).observe(trips, {
      childList: true,
      subtree: true,
    });
    new MutationObserver(updateStats).observe(count, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }
})();
