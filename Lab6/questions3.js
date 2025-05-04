function Animal(name, speed) {
  this.name = name;
  this.speed = speed;
}

Animal.prototype.run = function (speed) {
  this.speed += speed;
  console.log(
    `${this.name} runs with +${speed} speed. Total speed: ${this.speed}`
  );
};

Animal.compareBySpeed = function (a1, a2) {
  return a1.speed - a2.speed;
};

function Rabbit(name, speed) {
  Animal.call(this, name, speed);
}

Rabbit.prototype = Object.create(Animal.prototype);
Rabbit.prototype.constructor = Rabbit;

Rabbit.prototype.hide = function () {
  console.log(`${this.name} hides`);
};

const rabbit1 = new Rabbit("Bunny", 5);
rabbit1.run(3);
rabbit1.hide(); 

const rabbit2 = new Rabbit("Flash", 10);
console.log(
  "Faster rabbit:",
  Animal.compareBySpeed(rabbit1, rabbit2) > 0 ? rabbit1.name : rabbit2.name
);
