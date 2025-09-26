import { horlogeMinecraft } from "./horloge-minecraft.js";
import { convertirUnites } from "./unite-cosmique.js";
import { lireCapteurs } from "./capteurs.js";
import { localisation } from "./gps.js";

window.onload = () => {
  const canvas = document.getElementById("cadran-cosmique");
  const ctx = canvas.getContext("2d
