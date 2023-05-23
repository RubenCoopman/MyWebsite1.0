let kogels = [];
let vijanden = [];
let score = 0;
let myrobot;
let backgroundImg;
let laserSound;
let winningSound;
let timeDelay=500;
let timer=0;
let timeDelayTrigger=false;
let gameOver = false;


function preload() {
  soundFormats('mp3');
  loadJSON("https://epistat.sciensano.be/Data/COVID19BE_CASES_MUNI_CUM.json", getNumber);
  
  laserSound = loadSound('data/LaserSound.mp3');
  winningSound = loadSound('data/SuperMarioWorld.mp3');
  backgroundImg = loadImage('data/background.jpg');
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  backgroundImg.resize(width, height);
  myrobot = new robot();
  myrobot.yPos =500;

  
  //maak 10 vijanden (i gaat 1 omhoog elke loop(dus doet de loop 10 keer))
  for (let i = 0; i < 10; i++) {
    let vijand = {
      x: random(0, width),
      y: random(-windowHeight * 2, 0)
    }
    //steek vijand in lijst
    vijanden.push(vijand);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  backgroundImg.resize(width, height);
}
function draw() {

  image(backgroundImg, 0, 0);
  // teken ventje
  myrobot.display();

  
  // updaten en tekenen van de kogels
  for (let kogel of kogels){
    kogel.y -=12
    circle(kogel.x, kogel.y, 10)
  }
  
  // updaten en tekenen van de vijanden
  for (let vijand of vijanden){
    vijand.y += 1.8
    rect(vijand.x, vijand.y, 10);
    //einde spel 
    if (vijand.y > height){
      textSize(50)
      text("U bent DOOD!\nklik om herstarten",width/2, height/2)
      winningSound.play();
      gameOver = true;
      noLoop()
    }
  }
  

  // aanrakingen tssn kogel en vijand checken
  for( let vijand of vijanden){
    for(let kogel of kogels){
      if (dist(vijand.x, vijand.y, kogel.x, kogel.y) < 10){
        //haalt vijand en kogel uit lijst
        vijanden.splice(vijanden.indexOf(vijand), 1)
        kogels.splice(kogels.indexOf(kogel), 1)
        let nieuwevijand = {
          x: random(0, width),
          y: random(-windowHeight * 2, 0)
        }
        vijanden.push(nieuwevijand);
        score += 1
      }
    }
  }

  text(score, 50, 50)
  push();
  myrobot.kleurverandering(500);
}

function mousePressed(){
  if (gameOver) {
    restartGame();
  } else {
  //aanmaken kogel wrn gebruiker klikt
  let kogel = {
    x: mouseX,
    y: height - 50
  }
  kogels.push(kogel)

  //geluid schot
  if (laserSound.isPlaying()) {
    laserSound.stop();
    laserSound.play();
  } else {
    laserSound.play();
  }
 }
}

function getNumber(values) {
  for (let i = 1; i < values.length - 1; i++) 
  {
    let nameVillage = values[i].TX_DESCR_NL;
    if (nameVillage == "Gent") {
      covidValues = values[i].CASES / 10000;
      print(covidValues);
    }
  }
}

function restartGame() {
  // Resetten variabelen
  score = 0;
  kogels = [];
  vijanden = [];
  myrobot = new robot();
  myrobot.yPos = 500;

  // aanmaken nieuwe vijanden
  for (let i = 0; i < 10; i++) {
    let vijand = {
      x: random(0, width),
      y: random(-windowHeight * 2, 0)
    }
    vijanden.push(vijand);
  }

  // reseten van de gameoverfase
  gameOver = false;

  // Stop al het geluid
  if (winningSound.isPlaying()) {
    winningSound.stop();
  }
  if (laserSound.isPlaying()) {
    laserSound.stop();
  }

  // restart loop
  loop();
}
