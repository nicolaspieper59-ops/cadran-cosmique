export function convertirUnites(distanceM, vitesseKmh) {
  const c = 299792.458;
  const s = 343;
  return {
    distance: {
      km: (distanceM / 1000).toFixed(4),
      ua: (distanceM / 149597870700).toExponential(4),
      secLumiere: (distanceM / (c * 1000)).toFixed(4),
      ly: (distanceM / 9.4607e15).toExponential(4)
    },
    vitesse: {
      kmh: vitesseKmh.toFixed(4),
      pourcentLumiere: ((vitesseKmh / c) * 100).toFixed(4),
      pourcentSon: ((vitesseKmh / s) * 100).toFixed(4)
    }
  };
      }
        
