import { setCustomProperty } from "./utility.js";

export class Cactus {
  constructor(worldElem) {
    this.leftPosition = 0;
    this.cactus = document.createElement("img");
    this.cactus.src = "./img/cactus.png";
    this.cactus.classList.add("cactus");
    setCustomProperty(this.cactus, "--left", 0);
    worldElem.append(this.cactus);
  }

  update(dDistance) {
    this.leftPosition -= dDistance;
    setCustomProperty(this.cactus, "--left", this.leftPosition);
  }

  remove() {
    this.cactus.remove();
  }

  getRect() {
    return this.cactus.getBoundingClientRect();
  }
}