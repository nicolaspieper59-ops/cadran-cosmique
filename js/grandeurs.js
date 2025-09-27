export function afficherGrandeursCosmiques() {
  const lat = 43.6119;
  const lon = 3.8777;
  const date = new Date();

  // Vitesse et distance
  const vitesse = 0.0000;
  const vitesseMoyenne = 0.0000;
  const vitesseMax = 0.0000;
  const vitesseMs = (vitesse / 3.6).toFixed(4);
  const vitesseMm = (vitesseMs * 1000).toFixed(2);
  const c = 299792.458; // km/s
  const s = 343;        // m/s
  const pourcentLumiere = ((vitesse / (c * 3.6)) * 100).toFixed(6);
  const pourcentSon = ((vitesseMs / s) * 100).toFixed(2);

  const distance = 0.0000;
  const distanceM = distance.toFixed(2);

  // Coordonnées et altitude
  const altitude = 42.0;
  const coordX = 128;
  const coordY = Math.round(altitude);
  const coordZ = -64;

  // Fréquence et capteurs
  const frequenceHz = (Math.random() * 100).toFixed(2);
  const champMagnetique = (Math.random() * 50).toFixed(2);
  const inclinaison = (Math.random() * 90).toFixed(2);

  // Soleil et Lune
  const heureSolaire = heureSolaireLocale(date, lon).toFixed(2);
  const heureMoyenne = (12 + lon / 15).toFixed(2);
  const soleil = { lever: "07:33", coucher: "19:28", culmination: "13:30", deg: 45.0 };
  const lune = { lever: "23:30", coucher: "13:00", culmination: "06:00", deg: 60.0 };

  // Affichage
  document.getElementById("vitesse").innerHTML = `
    <h2>Vitesse</h2>
    <p>Instantanée : ${vitesse.toFixed(4)} km/h</p>
    <p>Moyenne : ${vitesseMoyenne.toFixed(4)} km/h</p>
    <p>Max : ${vitesseMax.toFixed(4)} km/h</p>
    <p>m/s : ${vitesseMs}</p>
    <p>mm/s : ${vitesseMm}</p>
    <p>% lumière : ${pourcentLumiere} %</p>
    <p>% son : ${pourcentSon} %</p>
  `;

  document.getElementById("distance").innerHTML = `
    <h2>Distance</h2>
    <p>mètres : ${distanceM} m</p>
    <p>km : ${(distance / 1000).toFixed(4)}</p>
    <p>UA : ${(distance / 149597870700).toExponential(4)}</p>
    <p>sec lumière : ${(distance / (c * 1000)).toFixed(4)}</p>
    <p>année lumière : ${(distance / 9.4607e15).toExponential(4)}</p>
  `;

  document.getElementById("coordonnees").innerHTML = `
    <h2>Coordonnées Minecraft</h2>
    <p>X : ${coordX}</p>
    <p>Y : ${coordY}</p>
    <p>Z : ${coordZ}</p>
  `;

  document.getElementById("altitude").innerHTML = `
    <h2>Altitude</h2>
    <p>${altitude.toFixed(2)} m</p>
  `;

  document.getElementById("temps").innerHTML = `
    <h2>Horloge Minecraft</h2>
    <p>${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}</p>
  `;

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

  document.getElementById("niveau").innerHTML = `
    <h2>Niveau à bulle</h2>
    <p>Inclinaison : ${inclinaison}°</p>
  `;

  const lux = Math.floor(Math.random() * 1000);
  const db = Math.floor(Math.random() * 100);
  const orientation = "inconnue";
  document.getElementById("capteurs").innerHTML = `
    <h2>Capteurs</h2>
    <p>Lumière : ${lux} lux</p>
    <p>Son : ${db} dB</p>
    <p>Orientation : ${orientation}</p>
  `;

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude.toFixed(4);
      const lon = pos.coords.longitude.toFixed(4);
      document.getElementById("gps").innerHTML = `
        <h2>GPS</h2>
        <p>Latitude : ${lat}</p>
        <p>Longitude : ${lon}</p>
        <p>Précision : ${pos.coords.accuracy.toFixed(2)} m</p>
        <p>Source : GPS</p>
      `;
    }, () => {
      activerModeSouterrain();
    });
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

  function heureSolaireLocale(date, longitude) {
    const utc = date.getUTCHours() + date.getUTCMinutes() / 60;
    const décalage = longitude / 15;
    return (utc + décalage + 24) % 24;
    let vitesseActive = true;
let vmax = 0;

document.getElementById("toggle-vitesse").onclick = () => {
  vitesseActive = !vitesseActive;
  document.getElementById("toggle-vitesse").textContent = vitesseActive ? "⏸️ Pause Vitesse" : "▶️ Reprendre Vitesse";
  afficherVitesse();
};

document.getElementById("reset-vmax").onclick = () => {
  vmax = 0;
  afficherVitesse();
};

function afficherVitesse() {
  if (!vitesseActive) {
    document.getElementById("vitesse").innerHTML = `<h2>Vitesse</h2><p>⏸️ En pause</p>`;
    return;
  }

  const vitesse = Math.random() * 100;
  const vitesseMs = (vitesse / 3.6).toFixed(4);
  const vitesseMm = (vitesseMs * 1000).toFixed(2);
  const pourcentLumiere = ((vitesse / (299792.458 * 3.6)) * 100).toFixed(6);
  const pourcentSon = ((vitesseMs / 343) * 100).toFixed(2);
  vmax = Math.max(vmax, vitesse);

  document.getElementById("vitesse").innerHTML = `
    <h2>Vitesse</h2>
    <p>Instantanée : ${vitesse.toFixed(4)} km/h</p>
    <p>Moyenne : --</p>
    <p>Max : ${vmax.toFixed(4)} km/h</p>
    <p>m/s : ${vitesseMs}</p>
    <p>mm/s : ${vitesseMm}</p>
    <p>% lumière : ${pourcentLumiere} %</p>
    <p>% son : ${pourcentSon} %</p>
  `;
    }
                           
  }
}
