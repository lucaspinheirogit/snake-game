var btn_cima = document.querySelector("#btn-cima");
var btn_baixo = document.querySelector("#btn-baixo");
var btn_esquerda = document.querySelector("#btn-esquerda");
var btn_direita = document.querySelector("#btn-direita");


var paused = false;
var snake;
var scl = 20;
var food;
var score = 0;

function setup() {
  canvas = createCanvas(600, 440);
  canvas.parent('sketch-holder');
  frameRate(12);
  snake = new Snake();
  pickLocation();
}

function draw() {
  if (!paused) {
    background(86, 145, 68);

    if (snake.eat(food)) {
      pickLocation();
      snake.life = 500;
      score += 50;
    }
    if (snake.die()) {
      print("Snake died")
      score = 0;
    }
    snake.update();
    snake.show();

    fill(255, 0, 0);
    stroke(0)
    rect(food.x, food.y, scl, scl);
    updateScore();
  }
}

function updateScore() {
  fill(0)
  textSize(24);
  textAlign(RIGHT);
  text("Score: " + score, width - 24, height - 24);
}


function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function keyPressed() {

  switch (keyCode) {
    case 87: //CIMA
      moveUp();
      buttonFocus(btn_cima);
      break;
    case 68: //DIREITA
      moveRight();
      buttonFocus(btn_direita);
      break;
    case 83: //BAIXO
      moveDown();
      buttonFocus(btn_baixo);
      break;
    case 65: //ESQUERDA
      moveLeft();
      buttonFocus(btn_esquerda);
      break;
    case 32:
      paused = !paused;
      break;
    case 82:
      paused = false;
      snake.life = 500;
      score = 0;
      break;
  }
}

function buttonFocus(button) {
  btn_cima.blur();
  btn_baixo.blur();
  btn_esquerda.blur();
  btn_direita.blur();
  button.focus();
}

function moveUp() {
  if (snake.yspeed == 1 && snake.total != 0) return;
  snake.dir(0, -1);
}
function moveDown() {
  if (snake.yspeed == -1 && snake.total != 0) return;
  snake.dir(0, 1);
}
function moveRight() {
  if (snake.xspeed == -1 && snake.total != 0) return;
  snake.dir(1, 0);
}
function moveLeft() {
  if (snake.xspeed == 1 && snake.total != 0) return;
  snake.dir(-1, 0);
}