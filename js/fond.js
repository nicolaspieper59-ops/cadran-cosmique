function calculerDépressionSolaire(date, latitude, longitude) {
  const rad = Math.PI / 180;
  const jourJulien = date.getUTCDate() + (date.getUTCMonth() + 1) * 30.44;
  const declinaison = 23.44 * Math.sin(rad * (360 / 365 * (jourJulien - 81)));
  const heureSolaire = date.getUTCHours() + date.getUTCMinutes() / 60 + longitude / 15;
  const angleHoraire = (heureSolaire - 12) * 15;
  const altitude = Math.asin(
    Math.sin(rad * latitude) * Math.sin(rad * declinaison) +
    Math.cos(rad * latitude) * Math.cos(rad * declinaison) * Math.cos(rad * angleHoraire)
  );
  return -altitude * (180 / Math.PI);
}

function couleurSelonDépression(depression) {
  if (depression > 18) return "#000022";
  if (depression > 12) return "#001144";
  if (depression > 6)  return "#003366";
  if (depression > 0)  return "#336699";
  return "#88ccff";
    }
