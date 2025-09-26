export function heureSidéraleLocale(date, longitude) {
  const JD = date.getTime() / 86400000 + 2440587.5;
  const T = (JD - 2451545.0) / 36525;
  const GMST = 280.46061837 + 360.98564736629 * (JD - 2451545) +
               T * T * (0.000387933 - T / 38710000);
  return (GMST + longitude) % 360;
}
