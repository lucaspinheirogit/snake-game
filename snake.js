class Snake {

  constructor() {
    this.x = 20;
    this.y = 20;
    this.xspeed = 1;
    this.yspeed = 0;
    this.tail = [];
    this.total = 0;
    this.life = 500;
  }


  update() {
    this.life -= 5;

    if (this.total === this.tail.length) {
      for (let i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1]
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x += this.xspeed * scl;
    this.y += this.yspeed * scl;

    //Se a cobra sair da tela na direita, deverá reaparecer na esquerda
    //E assim por diante em todos os cantos da tela
    if (this.x > width) {
      print("saiu")
      this.x = 0;
    }
    if (this.x < 0) {
      print("saiu")
      this.x = width;
    }
    if (this.y > height) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = height;
    }

    //this.x = constrain(this.x, 0, width - scl);
    //this.y = constrain(this.y, 0, height - scl);
  }

  eat(food) {
    var d = dist(this.x, this.y, food.x, food.y)
    if (d < 2) {
      this.total++;
      return true;
    }
    return false;
  }

  show() {
    fill(0, 0, 0, this.life);
    stroke(100, 100, 100, this.life);
    rect(this.x, this.y, scl, scl)

    for (let i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl)
    }
  }

  die() {
    if(this.life < 0 ) return true;

    for (let i = 0; i < this.tail.length; i++) {
      let pos = this.tail[i];
      let distancia = dist(this.x, this.y, pos.x, pos.y);
      if (distancia < 1) {
        this.total = 0;
        this.tail = [];
        return true;
      }
    }
    return false;
  }

  dir(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }


}