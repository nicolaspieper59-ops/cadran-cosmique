export function horlogeMinecraft() {
  const now = new Date();
  const h = now.getHours().toString().padStart(2, "0");
  const m = now.getMinutes().toString().padStart(2, "0");
  const s = now.getSeconds().toString().padStart(2, "0");
  document.getElementById("temps").innerHTML = `
    <h2>Horloge Minecraft</h2>
    <p>${h}:${m}:${s}</p>
  `;
}
