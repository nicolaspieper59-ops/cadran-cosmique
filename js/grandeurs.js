export function afficherGrandeursCosmiques() {
  const vitesse = 0.0000;
  const vitesseMoyenne = 0.0000;
  const vitesseMax = 0.0000;
  const vitesseMs = (vitesse / 3.6).toFixed(4);
  const vitesseMm = (vitesseMs * 1000).toFixed(2);

  const distance = 0.0000;
  const altitude = 42.0;
  const coordX = 128;
  const coordY = Math.round(altitude);
  const coordZ = -64;

  const frequenceHz = (Math.random() * 100).toFixed(2);
  const champMagnetique = (Math.random() * 50).toFixed(2);
  const inclinaison = (Math.random() * 90).toFixed(2);

  const date = new Date();
  const lat = 43.6119;
  const lon = 3.8777;
  const heureSolaire = heureSolaireLocale(date, lon).toFixed(2);
  const heureMoyenne = (12 + lon / 15).toFixed(2);

  const soleil = { lever: "07:33", coucher: "19:28", culmination: "13:30" };
  const lune = { lever: "23:30", coucher: "13:00", culmination: "06:00" };

  document.getElementById("vitesse").innerHTML = `
    <h2>Vitesse</h2>
    <p>Instantanée : ${vitesse.toFixed(4)} km/h</p>
    <p>Moyenne : ${vitesseMoyenne.toFixed(4)} km/h</p>
    <p>Max : ${vitesseMax.toFixed(4)} km/h</p>
    <p>m/s : ${vitesseMs}</p>
    <p>mm/s : ${vitesseMm}</p>
  `;

  document.getElementById("distance").innerHTML = `
    <h2>Distance</h2>
    <p>km : ${(distance / 1000).toFixed(4)}</p>
    <p>UA : ${(distance / 149597870700).toExponential(4)}</p>
    <p>sec lumière : ${(distance / (299792.458 * 1000)).toFixed(4)}</p>
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
    <p>Culmination : ${soleil.culmination}</p>
    <p>Heure solaire locale : ${heureSolaire}</p>
    <p>Heure moyenne : ${heureMoyenne}</p>
  `;

  document.getElementById("lunaire").innerHTML = `
    <h2>Lune</h2>
    <p>Lever : ${lune.lever}</p>
    <p>Coucher : ${lune.coucher}</p>
    <p>Culmination : ${lune.culmination}</p>
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
}

function heureSolaireLocale(date, longitude) {
  const utc = date.getUTCHours() + date.getUTCMinutes() / 60;
  const décalage = longitude / 15;
  return (utc + décalage + 24) % 24;
                                          }
