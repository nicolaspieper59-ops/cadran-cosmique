function appliquerDégradé() {
  const canvas = document.getElementById("cadran-cosmique");
  const ctx = canvas.getContext("2d");
  const latitude = 43.6119;
  const longitude = 3.8777;
  const now = new Date();
  const depression = calculerDépressionSolaire(now, latitude, longitude);
  const couleur = couleurSelonDépression(depression);

  ctx.fillStyle = couleur;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 80, 0, 2 * Math.PI);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 1;
  ctx.stroke();
}

setInterval(appliquerDégradé, 60000);
window.onload = appliquerDégradé;
