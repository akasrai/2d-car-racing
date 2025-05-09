const $gameFrame = document.getElementById("frame");

const car = {
  x: 154,
  y: 300,
  speed: 30,
};

const $car = document.createElement("div");

// $car.style.backgroundColor = "brown";
$car.style.width = "80px";
$car.style.height = "138px";
$car.style.position = "absolute";
$car.style.top = car.y + "px";
$car.style.left = car.x + "px";
$car.style.backgroundImage = "url('./image/car.png')";
$car.style.backgroundSize = "cover";

$gameFrame.appendChild($car);

function moveLeft() {
  if (car.x >= car.speed) {
    car.x -= car.speed;
    $car.style.left = car.x + "px";
  }
}

function moveRight() {
  if (car.x <= car.speed * 13) {
    car.x += car.speed;
    $car.style.left = car.x + "px";
  }
}

function moveCar(keyCodeNumber) {
  const LEFT = 37,
    RIGHT = 39;

  switch (keyCodeNumber) {
    case LEFT:
      moveLeft();
      break;
    case RIGHT:
      moveRight();
      break;

    default:
      break;
  }
}

function checkKeyCode(event) {
  const keyDownEvent = event,
    keycode = keyDownEvent.which ? keyDownEvent.which : keyDownEvent.keyCode;

  if (playGame) {
    moveCar(keycode);
  }
}

document.onkeydown = checkKeyCode;

const incomingCars = [];

function createIncomingCar(gap) {
  const properties = {
    x: gap,
    y: screen.availHeight + 240,
    speed: 6,
  };

  const $incomingCar = document.createElement("div");

  //   $incomingCar.style.backgroundColor = "white";
  $incomingCar.style.width = "68px";
  $incomingCar.style.height = "138px";
  $incomingCar.style.position = "absolute";
  $incomingCar.style.bottom = properties.y + "px";
  $incomingCar.style.left = properties.x + "px";

  $incomingCar.style.backgroundImage = "url('./image/incoming-car-1.png')";
  $incomingCar.style.backgroundSize = "cover";

  $gameFrame.appendChild($incomingCar);
  $incomingCar.properties = properties;

  incomingCars.push($incomingCar);
}

let bgScrollY = 1;

function updateBGPosition() {
  bgScrollY += 6;
  $gameFrame.style.backgroundPosition = "100% " + bgScrollY + "px";
}

let playGame = true;
let count = 70;
let variation = 40;
let positions = [40, 154, 268, 382];

function animate() {
  updateIncomingCarsPosition();
  updateBGPosition();

  if (count === 70) {
    count = 0;

    createIncomingCar(positions[Math.floor(Math.random() * positions.length)]);

    variation = variation + 114;
    if (variation >= 114 * 4) variation = 40;
  }

  if (playGame) {
    requestAnimationFrame(animate);
  }

  count++;
}

animate();

function updateIncomingCarsPosition() {
  incomingCars.forEach(($car, i) => {
    $car.properties.y -= $car.properties.speed;

    if ($car.properties.y <= -200) {
      incomingCars.splice(i, 1);
      $gameFrame.removeChild($car);
    } else {
      $car.style.top = $car.properties.y + "px";
      checkCollision($car);
    }
  });
}

function distance(incomingCar) {
  let dx = incomingCar.properties.x - car.x;
  let dy = incomingCar.properties.y - car.y;

  return Math.sqrt(dx * dx + dy * dy);
}

function checkCollision($incomingCar) {
  if (distance($incomingCar) < 69) {
    playGame = false;
    showGameOver($incomingCar);
  }
}

function showGameOver($incomingCar) {
  const $gameOver = document.createElement("h1");
  $gameOver.style.position = "absolute";
  $gameOver.style.top = "50%";
  $gameOver.style.left = "50%";
  $gameOver.style.transform = "translate(-50%, -50%)";
  $gameOver.style.fontSize = "40px";
  $gameOver.style.color = "white";
  $gameOver.innerHTML = "GAME OVER";
  $incomingCar.style.backgroundImage = "url('./image/incoming-car-blast.png')";
  $car.style.backgroundImage = "url('./image/green-blast.png')";

  $gameFrame.appendChild($gameOver);
}
