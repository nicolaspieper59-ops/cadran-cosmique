export function activerModeSouterrain() {
  const état = {
    gps: false,
    réseau: false,
    capteursActifs: [],
    localisation: "non disponible",
    source: "mode intérieur / souterrain"
  };

  if ("AmbientLightSensor" in window) état.capteursActifs.push("lumière");
  if ("DeviceOrientationEvent" in window) état.capteursActifs.push("orientation");
  if ("AudioContext" in window) état.capteursActifs.push("son");

  document.getElementById("gps").innerHTML = `
    <h2>Localisation</h2>
    <p>Source : ${état.source}</p>
    <p>Capteurs : ${état.capteursActifs.join(", ") || "aucun"}</p>
  `;
}
