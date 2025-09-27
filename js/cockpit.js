window.onload = () => {
  const lat = 43.2965; // Marseille
  const lon = 5.3698;
  let vitesseActive = true;
  let vmax = 0;

  // Boutons
  document.getElementById("toggle-vitesse").onclick = () => {
    vitesseActive = !vitesseActive;
    afficherVitesse();
  };
  document.getElementById("reset-vmax").onclick = () => {
    vmax = 0;
    afficherVitesse();
  };

  // Médaillon animé
  setInterval(dessinerMedaillonMinecraft, 1000);

  // Affichage initial
  afficherVitesse();
  afficherGrandeursFixes();

  // Fonctions
  function afficherVitesse() {
    if (!vitesseActive) {
      document.getElementById("vitesse").innerHTML = `<h2>Vitesse</h2><p>⏸️ En pause</p>`;
      return;
    }

    const vitesse = 12.3; // km/h simulée
    const vitesseMs = (vitesse / 3.6).toFixed(4);
    const vitesseMm = (vitesseMs * 1000).toFixed(2);
    const pourcentLumiere = ((vitesseMs / 299792458) * 100).toFixed(8);
    const pourcentSon = ((vitesseMs / 340) * 100).toFixed(2);
    vmax = Math.max(vmax, vitesse);

    document.getElementById("vitesse").innerHTML = `
      <h2>Vitesse</h2>
      <p>Instantanée : ${vitesse.toFixed(2)} km/h</p>
      <p>Max : ${vmax.toFixed(2)} km/h</p>
      <p>m/s : ${vitesseMs}</p>
      <p>mm/s : ${vitesseMm}</p>
      <p>% lumière : ${pourcentLumiere} %</p>
      <p>% son : ${pourcentSon} %</p>
    `;
  }

  function afficherGrandeursFixes() {
    const distance = 12345; // m simulée
    const altitude = 42;
    const coordX = Math.round(lon); // stylisation Terre plate
    const coordZ = -Math.round(lat); // Nord = négatif
    const coordY = altitude;

    const frequenceHz = 42.0;
    const champMagnetique = 32.5;
    const inclinaison = 17.3;

    const soleil = { lever: "07:27", coucher: "19:34", culmination: "13:30", deg: 45 };
    const lune = { lever: "23:30", coucher: "13:00", culmination: "06:00", deg: 60 };

    const date = new Date();
    const heureSolaire = heureSolaireLocale(date, lon).toFixed(2);
    const heureMoyenne = (12 + lon / 15).toFixed(2);

    document.getElementById("distance").innerHTML = `
      <h2>Distance</h2>
      <p>mètres : ${distance.toFixed(2)} m</p>
      <p>km : ${(distance / 1000).toFixed(2)}</p>
      <p>UA : ${(distance / 149597870700).toExponential(4)}</p>
      <p>sec lumière : ${(distance / 299792458).toFixed(4)}</p>
      <p>année lumière : ${(distance / 9.4607e15).toExponential(4)}</p>
    `;

    document.getElementById("coordonnees").innerHTML = `
      <h2>Coordonnées Minecraft (Terre plate)</h2>
      <p>X : ${coordX} (Est)</p>
      <p>Y : ${coordY} (Altitude)</p>
      <p>Z : ${coordZ} (Nord)</p>
    `;

    document.getElementById("altitude").innerHTML = `<h2>Altitude</h2><p>${altitude} m</p>`;
    document.getElementById("temps").innerHTML = `<h2>Horloge</h2><p>${date.toLocaleTimeString()}</p>`;

    document.getElementById("solaire").innerHTML = `
      <h2>Soleil</h2>
      <p>Lever : ${soleil.lever}</p>
      <p>Coucher : ${soleil.coucher}</p>
      <p>Culmination : ${soleil.culmination} (${soleil.deg}°)</p>
      <p>Heure solaire locale : ${heureSolaire}</p>
      <p>Heure moyenne : ${heureMoyenne}</p>
    `;

    document.getElementById("lunaire").innerHTML = `
      <h2>Lune</h2>
      <p>Lever : ${lune.lever}</p>
      <p>Coucher : ${lune.coucher}</p>
      <p>Culmination : ${lune.culmination} (${lune.deg}°)</p>
    `;

    document.getElementById("frequence").innerHTML = `
      <h2>Fréquence</h2>
      <p>${frequenceHz} Hz</p>
      <p>Champ magnétique : ${champMagnetique} µT</p>
    `;

    document.getElementById("niveau").innerHTML = `<h2>Niveau à bulle</h2><p>Inclinaison : ${inclinaison}°</p>`;

    const lux = 850;
    const db = 62;
    const orientation = "inconnue";
    document.getElementById("capteurs").innerHTML = `
      <h2>Capteurs</h2>
      <p>Lumière : ${lux} lux</p>
      <p>Son : ${db} dB</p>
      <p>Orientation : ${orientation}</p>
    `;

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        document.getElementById("gps").innerHTML = `
          <h2>GPS</h2>
          <p>Latitude : ${pos.coords.latitude.toFixed(4)}</p>
          <p>Longitude : ${pos.coords.longitude.toFixed(4)}</p>
          <p>Précision : ${pos.coords.accuracy.toFixed(2)} m</p>
          <p>Source : GPS</p>
        `;
      }, () => activerModeSouterrain());
    } else {
      activerModeSouterrain();
    }

    function activerModeSouterrain() {
      const capteurs = [];
      if ("DeviceOrientationEvent" in window) capteurs.push("orientation");
      if ("AmbientLightSensor" in window) capteurs.push("lumière");
      if ("AudioContext" in window) capteurs.push("son");

      document.getElementById("mode-souterrain").innerHTML = `
        <h2>Mode souterrain</h2>
        <p>Source : intérieur / sans GPS</p>
        <p>Capteurs actifs : ${capteurs.join(", ") || "aucun"}</p>
      `;
    }
  }

  function heureSolaireLocale(date, longitude) {
    const utc = date.getUTCHours() + date.getUTCMinutes() / 60;
    const décalage = longitude / 15;
    return (utc + décalage + 24) % 24;
  }

  function dessinerMedaillonMinecraft() {
    const canvas = document.getElementById("medaillon-minecraft");
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const rayon = 140;

    const date = new Date();
    const angle = ((heureSolaireLocale(date, 5.3698) - 12) / 24) * 2 * Math.PI;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#001144";
    ctx.beginPath();
    ctx.arc(cx, cy, rayon, 0, 2 * Math.PI);
    ctx.fill();

    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 3;
    ctx.save();
    ctx.translate(cx,
