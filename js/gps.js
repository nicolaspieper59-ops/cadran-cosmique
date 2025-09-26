import { activerModeSouterrain } from "./mode-souterrain.js";
import { obtenirLocalisationAlternée } from "./connexion-alternative.js";

export function localisation() {
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
    }, async () => {
      const alt = await obtenirLocalisationAlternée();
      if (alt) {
        document.getElementById("gps").innerHTML = `
          <h2>Localisation</h2>
          <p>Source : ${alt.source}</p>
          <p>Position : ${alt.position}</p>
        `;
      } else {
        activerModeSouterrain();
      }
    });
  } else {
    activerModeSouterrain();
  }
}
