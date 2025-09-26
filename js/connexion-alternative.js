export async function obtenirLocalisationAlternée() {
  if (navigator.bluetooth) {
    try {
      const device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
      return { source: "Bluetooth", position: device.name || "inconnue" };
    } catch {
      return null;
    }
  }
  if (navigator.connection) {
    return { source: "Wi-Fi", type: navigator.connection.effectiveType };
  }
  return { source: "Fallback", position: "non localisable" };
}
