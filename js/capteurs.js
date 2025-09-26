export function lireCapteurs() {
  const lux = Math.floor(Math.random() * 1000); // simulation
  const db = Math.floor(Math.random() * 100);   // simulation
  const orientation = "inconnue";

  document.getElementById("capteurs").innerHTML = `
    <h2>Capteurs</h2>
    <p>Lumière : ${lux} lux</p>
    <p>Son : ${db} dB</p>
    <p>Orientation : ${orientation}</p>
  `;
}
