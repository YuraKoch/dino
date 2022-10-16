import { Ground } from "./ground.js";
import { Dino } from "./dino.js"
import { Cactuses } from "./cactuses.js"

const SPEED_SCALE_INCREASE = 0.001;
const START_SPEED = 5;

const scoreElem = document.querySelector(".score");
const titleElem = document.querySelector(".title");
const worldElem = document.querySelector(".world");

document.addEventListener("keydown", onStart, { once: true });
document.addEventListener("touchstart", onStart, { once: true });

let speedScale;
let score;
let dino;
let ground;
let cactuses;

function onStart() {
  document.removeEventListener("keydown", onStart);
  document.removeEventListener("touchstart", onStart);

  speedScale = 1;
  score = 0;
  if (cactuses) {
    cactuses.removeAll();
  }
  dino = new Dino();
  ground = new Ground();
  cactuses = new Cactuses(worldElem);
  document.addEventListener("keydown", dinoJumpHandler);
  document.addEventListener("touchstart", dinoJumpHandler);
  titleElem.classList.add("hide");
  window.requestAnimationFrame(update);
}

function update() {
  const dDistance = speedScale * START_SPEED;

  ground.update(dDistance);
  dino.update(dDistance);
  cactuses.update(dDistance);
  updateScore();
  speedScale += SPEED_SCALE_INCREASE;

  if (checkCollisions()) {
    onleLose();
    return;
  }

  window.requestAnimationFrame(update);
}

function checkCollisions() {
  return cactuses.getRects().some(cactusRect => isCollision(cactusRect, dino.getRect()));
}

function isCollision(cactusRect, dinoRect) {
  return (
    cactusRect.left - dinoRect.right < -15 &&
    cactusRect.top - dinoRect.bottom < -20 &&
    cactusRect.right - dinoRect.left > 5
  )
}

function updateScore() {
  score += 0.1;
  scoreElem.textContent = Math.floor(score);
}

function onleLose() {
  document.removeEventListener("keydown", dinoJumpHandler);
  document.removeEventListener("touchstart", dinoJumpHandler);
  dino.setLoseImg();
  setTimeout(() => {
    document.addEventListener("keydown", onStart, { once: true });
    document.addEventListener("touchstart", onStart, { once: true });
    titleElem.classList.remove("hide");
  }, 500);
}

const dinoJumpHandler = (event) => {
  if (event.code === "Space" ||
    event.code === "ArrowUp" ||
    event.type === "touchstart") {
    dino.onJump();
  }
};