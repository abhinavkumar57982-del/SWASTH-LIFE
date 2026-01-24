function findStores() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const query = `
        [out:json][timeout:25];
        (
          node["amenity"="pharmacy"](around:5000,${lat},${lon});
        );
        out tags;
      `;

      const url =
        "https://overpass.kumi.systems/api/interpreter?data=" +
        encodeURIComponent(query);

      fetch(url)
        .then(res => res.json())
        .then(data => {
          let html = "<h3>🏥 Nearby Medical Stores</h3>";

          if (!data.elements || data.elements.length === 0) {
            html += "<p>No nearby pharmacies found.</p>";
          } else {
            data.elements.forEach(place => {
              const name = place.tags.name || "Medical Store";

              if (name.toLowerCase().includes("aushadhi")) {
                html += `<p style="color:green;font-weight:bold;">🏥 ${name} (Jan Aushadhi)</p>`;
              } else {
                html += `<p>📍 ${name}</p>`;
              }
            });
          }

          document.getElementById("outputBox").style.display = "block";
          document.getElementById("output").innerHTML = html;
        })
        .catch(err => {
          console.error(err);
          alert("Failed to load nearby pharmacies");
        });
    },
    () => alert("Location permission denied")
  );
}
