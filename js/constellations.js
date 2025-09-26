async function chargerConstellations() {
  const response = await fetch("data/constellations.json");
  const data = await response.json();
  return data.constellations;
}

function projeter(ra, dec, w, h) {
  const x = w / 2 + (ra - 12) * 10;
  const y = h / 2 - dec * 2;
  return { x, y };
}

function dessinerConstellations(ctx, constellations) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;

  constellations.forEach(c => {
    const starMap = {};
    c.stars.forEach(star => {
      const { x, y } = projeter(star.ra, star.dec, w, h);
      starMap[star.id] = { x, y };
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, 2 * Math.PI);
      ctx.fillStyle = "#fff";
      ctx.fill();
    });

    c.lines.forEach(line => {
      const a = starMap[line.start];
      const b = starMap[line.end];
      if (a && b) {
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = "#888";
        ctx.stroke();
      }
    });
  });
}

export async function afficherConstellations() {
  const canvas = document.getElementById("cadran-cosmique");
  const ctx = canvas.getContext("2d");
  const constellations = await chargerConstellations();
  dessinerConstellations(ctx, constellations);
                    }
                   
