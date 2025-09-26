export async function boussoleVersLieux() {
  const res = await fetch("data/lieux.json");
  const data = await res.json();
  const bloc = document.getElementById("boussole");
  bloc.innerHTML = "<h2>Boussole cosmique</h2>";

  data.lieux.forEach(lieu => {
    const cap = Math.floor(Math.random() * 360); // simulation
    const div = document.createElement("div");
    div.textContent = `${lieu.nom} → ${cap}°`;
    bloc.appendChild(div);
  });
}
