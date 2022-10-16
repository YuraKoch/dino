import { setCustomProperty } from "./utility.js";

export class Ground {
  constructor() {
    this.leftPosition = 0;
    this.element = document.querySelector(".ground");
    setCustomProperty(this.element, "--left", this.leftPosition);
  }

  update(dDistance) {
    this.leftPosition -= dDistance;
    setCustomProperty(this.element, "--left", this.leftPosition);
  }
}