document.addEventListener("DOMContentLoaded", () => {

  const map = L.map("map").setView([14.5995, 120.9842], 16);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // PUP Main Campus marker
  L.marker([14.5995, 120.9842])
    .addTo(map)
    .bindPopup("<b>PUP Main Campus</b><br>Sta. Mesa, Manila")
    .openPopup();

  // Dorm markers
  const dorms = [
    { name: "Dorm A", lat: 14.6005, lng: 120.9830, price: "₱3,500/mo" },
    { name: "Dorm B", lat: 14.5980, lng: 120.9860, price: "₱4,200/mo" },
    { name: "Dorm C", lat: 14.6010, lng: 120.9855, price: "₱2,800/mo" },
  ];

  dorms.forEach(dorm => {
    L.marker([dorm.lat, dorm.lng])
      .addTo(map)
      .bindPopup(`<b>${dorm.name}</b><br>${dorm.price}`);
  });

});