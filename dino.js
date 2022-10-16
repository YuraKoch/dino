import { setCustomProperty } from "./utility.js";

const JUMP_SPEED = 10;
const GRAVITY = 0.5;
const DISTANCE_FOR_NEW_FRAME = 100;

export class Dino {
  constructor() {
    this.isJumping = false;
    this.currentFrame = 0;
    this.distanceFromLastStep = 0;
    this.bottomPosition = 0;
    this.yVelocity = 0;
    this.element = document.querySelector(".dino");
    setCustomProperty(this.element, "--bottom", 0);
  }

  update(dDistance) {
    this.updateImg(dDistance);
    this.handleJump();
  }

  updateImg(dDistance) {
    if (this.isJumping) {
      this.element.src = "./img/dino-stationary.png";
      return;
    }

    this.distanceFromLastStep += dDistance;

    if (this.distanceFromLastStep >= DISTANCE_FOR_NEW_FRAME) {
      this.currentFrame = (this.currentFrame + 1) % 2;
      this.element.src = `./img/dino-run-${this.currentFrame}.png`;
      this.distanceFromLastStep -= DISTANCE_FOR_NEW_FRAME;
    }
  }

  handleJump() {
    if (!this.isJumping) return;

    this.bottomPosition += this.yVelocity;

    if (this.bottomPosition <= 0) {
      this.isJumping = false;
      this.bottomPosition = 0;
    }

    setCustomProperty(this.element, "--bottom", this.bottomPosition);
    this.yVelocity -= GRAVITY;
  }

  onJump() {
    if (this.isJumping) return;

    this.isJumping = true;
    this.yVelocity = JUMP_SPEED;
  }

  getRect() {
    return this.element.getBoundingClientRect();
  }

  setLoseImg() {
    this.element.src = "./img/dino-lose.png"
  }
}
