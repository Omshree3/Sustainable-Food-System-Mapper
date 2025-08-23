var map = L.map('map').setView([12.9716, 77.5946], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

var donors = [
  { name: "Local Bakery", lat: 12.9716, lon: 77.5946, food: "Bread", qty: 50, urgency: "High" },
  { name: "Supermarket A", lat: 12.975, lon: 77.60, food: "Rice", qty: 100, urgency: "Medium" }
];

var recipients = [
  { name: "Community Shelter", lat: 12.965, lon: 77.59, need: "Bread" },
  { name: "Food Bank", lat: 12.98, lon: 77.61, need: "Rice" }
];

var matches = [];

function renderMarkers() {
  map.eachLayer(layer => { if (layer instanceof L.Marker || layer instanceof L.Polyline) map.removeLayer(layer); });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  donors.forEach(d => L.marker([d.lat, d.lon]).addTo(map).bindPopup("Donor: " + d.name));
  recipients.forEach(r => L.marker([r.lat, r.lon]).addTo(map).bindPopup("Recipient: " + r.name));
}

renderMarkers();

function findMatches() {
  matches = [];
  document.getElementById('matchesList').innerHTML = '';

  donors.forEach(d => {
    recipients.forEach(r => {
      if (d.food === r.need) {
        let line = L.polyline([[d.lat, d.lon], [r.lat, r.lon]], { color: "green" }).addTo(map);
        matches.push({ donor: d, recipient: r });

        const div = document.createElement('div');
        div.className = 'match-item';
        div.innerHTML = `<strong>${d.name}</strong> → ${r.name} <br> ${d.qty}kg of ${d.food}`;
        document.getElementById('matchesList').appendChild(div);
      }
    });
  });

  if (matches.length === 0) {
    document.getElementById('matchesList').innerHTML = "<p>No matches found.</p>";
  }

  updateMetrics();
}

function updateMetrics() {
  let totalFood = matches.reduce((sum, m) => sum + m.donor.qty, 0);
  let meals = totalFood * 2;
  let co2 = totalFood * 2.5;

  document.getElementById('foodRedirected').textContent = totalFood;
  document.getElementById('mealsProvided').textContent = meals;
  document.getElementById('co2Saved').textContent = co2;
}

function addDonor() {
  let d = {
    name: document.getElementById('donorName').value,
    food: document.getElementById('donorFood').value,
    qty: parseInt(document.getElementById('donorQty').value),
    lat: parseFloat(document.getElementById('donorLat').value),
    lon: parseFloat(document.getElementById('donorLon').value),
    urgency: "High"
  };
  donors.push(d);
  renderMarkers();
}

function addRecipient() {
  let r = {
    name: document.getElementById('recipientName').value,
    need: document.getElementById('recipientNeed').value,
    lat: parseFloat(document.getElementById('recipientLat').value),
    lon: parseFloat(document.getElementById('recipientLon').value)
  };
  recipients.push(r);
  renderMarkers();
}

function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelector('.tab[onclick="switchTab(\''+tab+'\')"]').classList.add('active');
  document.getElementById(tab).classList.add('active');
}
