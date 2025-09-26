window.onload = async () => {
  const canvas = document.getElementById("cadran-cosmique");
  const ctx = canvas.getContext("2d");
  const latitude = 43.6119;
  const longitude = 3.8777;

  function afficherCadran() {
    const now = new Date();
    const depression = calculerDépressionSolaire(now, latitude, longitude);
    const couleur = couleurSelonDépression(depression);
    ctx.fillStyle = couleur;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    afficherConstellations(ctx);
  }

  afficherCadran();
  setInterval(afficherCadran, 60000);
};
