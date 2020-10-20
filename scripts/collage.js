
// setup canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//Shape:
function Shape(x, y, color, size) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.size = size;
}

//Ball:
function Ball(x, y, velX, velY, color, size) {
	Shape.call(this, x, y, color, size);
	this.velX = velX;
	this.velY = velY;
}

//Ball Inheritance
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}

//Evil ball:
function EvilBall(x, y, size) {
	Shape.call(this, x, y, 'rgb(0,0,0)', size);
	this.outLineColor = 'rgb(255,0,0)';
}

//Ball Inheritance
EvilBall.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
		const dx = this.x - balls[j].x;
		const dy = this.y - balls[j].y;
		const distance = Math.sqrt(dx * dx + dy * dy);

		if (distance < this.size + balls[j].size) {
			balls.splice(j,1);
		}
	}
}

EvilBall.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.outLineColor;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size/2, 0, 2 * Math.PI);
  ctx.fill();
}

// function to generate random number
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

//animation loop function:
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, .1)';
  //ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
	balls[i].collisionDetect();
  }
  evilBall.draw();
  evilBall.collisionDetect();

  requestAnimationFrame(loop);
}

//Begin program:
let balls = [];
let evilBall = new EvilBall(random(30, window.innerWidth-30), random(30, window.innerHeight-30), random(20, 30));

while (balls.length < 25) {
  let size = random(10,20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
    size
  );

  balls.push(ball);
}

loop();