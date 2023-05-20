let kogels = [];
let vijanden = [];
let score = 0;
let myrobot;
let backgroundImg;
let laserSound;
let winningSound;

function preload() {
  soundFormats('mp3');
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
    kogel.y -=10
    circle(kogel.x, kogel.y, 10)
  }
  
  // updaten en tekenen van de vijanden
  for (let vijand of vijanden){
    vijand.y += 1.5
    rect(vijand.x, vijand.y, 10);
    //einde spel 
    if (vijand.y > height){
      textSize(50)
      text("U bent DOOD!",width/2, height/2)
      winningSound.play();
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
}

function mousePressed(){
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