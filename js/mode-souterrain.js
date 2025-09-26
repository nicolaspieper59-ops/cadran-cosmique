export function activerModeSouterrain() {
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
