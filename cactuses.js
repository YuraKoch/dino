import { randomNumberBetweenMinMax } from "./utility.js";
import { Cactus } from "./cactus.js";

const CACTUS_WIDTH = 34;

export class Cactuses {
  constructor(worldElem) {
    this.worldElem = worldElem;
    const worldWidth = worldElem.getBoundingClientRect().width;
    this.extremeLeftPosition = worldWidth * -1 - CACTUS_WIDTH;
    this.distanceToNewCactus = 0;
    this.cactuses = [];
  }

  update(dDistance) {
    this.cactuses = this.cactuses.filter(cactus => {
      cactus.update(dDistance);
      if (cactus.leftPosition <= this.extremeLeftPosition) {
        cactus.remove();
        return false;
      }
      return true;
    });

    this.distanceToNewCactus -= dDistance;
    if (this.distanceToNewCactus <= 0) {
      this.cactuses.push(new Cactus(this.worldElem));
      this.distanceToNewCactus = randomNumberBetweenMinMax(50, 100) * dDistance;
    }
  }

  getRects() {
    return this.cactuses.map(cactus => cactus.getRect());
  }

  removeAll() {
    this.cactuses.forEach(cactus => {
      cactus.remove();
    });
  }
}