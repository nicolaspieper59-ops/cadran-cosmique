export function lireCapteurs() {
  const lux = Math.floor(Math.random() * 1000);
  const db = Math.floor(Math.random() * 100);
  const ir = "non détecté";
  document.getElementById("capteurs").innerHTML = `
    <h2>Capteurs</h2>
    <p>Lumière : ${lux} lux</p>
    <p>Son : ${db} dB</p>
    <p>Infrarouge : ${ir}</p>
  `;
}
