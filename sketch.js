var zombie,zombieImg1,zombieImg2;
var shooter,shooterFiring,shooterStanding;
var bullet,bulletImg;
var backgroundImg;
var life;
var heart1,heart2,heart3;
var zombieGroup;
var bulletGroup;
var heart1Img,heart2Img,heart3Img;
var restartImg,restart;
var punchSound,loseSound,bulletFiredSound;
var gameState = "play";
var life = 3;
var score = 0;

function preload() {
  //backgroundImg = loadImage("assets/background.jpg")//
  bulletImg = loadImage("images/Bullet.png")
  zombieImg = loadImage("images/zombie.png")
  shooterFiring = loadImage("images/shooterShooting.png")
  shooterStanding = loadImage("images/shooterStanding.png")
  heart1Img = loadImage("images/heart1.png")
  heart2Img = loadImage("images/heart2.png")
  heart3Img = loadImage("images/heart3.png")
  restartImg = loadImage("images/restart.png")
  punchSound = loadSound("sounds/punch.mp3")
  loseSound = loadSound("sounds/lose.mp3")
  bulletFiredSound = loadSound("sounds/gunfired.mp3")



}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  
  shooter = createSprite(150,displayHeight/2 - 40 ,20,20);
  shooter.addImage(shooterStanding);
  shooter.scale = 0.7;

  heart = createSprite(displayWidth - 200,40,20,20)
  heart.scale = 0.5;
  

  restart = createSprite(displayWidth/2,displayHeight/2);
  restart.addImage(restartImg);
  restart.scale = 0.2;
  restart.visible = false;

  zombieGroup = new Group();

  bulletGroup = new Group();


  
 
}

function draw() {
  background(0)

  if(gameState === "play"){
        shooter.visible = true;
      
      if(keyDown("A")){
        shooter.x = shooter.x - 30
      }

      if(keyDown("D")){
        shooter.x = shooter.x + 30
      }

      if(keyWentDown("SPACE") || touches.length>0){
        bullet = createSprite (280,shooter.y -40,20,10)
        bullet.addImage(bulletImg);
        bullet.scale = .1
        bulletFiredSound.play();
        bulletGroup.add(bullet);
        bullet.velocityX = 40
        shooter.addImage(shooterFiring);
        shooter.depth = bullet.depth;
        shooter.depth = shooter.depth + 2;
      }
      else if(keyWentUp("SPACE")){
        shooter.addImage(shooterStanding);
      }

      enemy();
}

  drawSprites();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);


}

function enemy() {
  if(frameCount % 20 === 0){
    zombie = createSprite(random(1000, 1500), random(100,500), 40, 40);
    zombie.addImage("zombie",zombieImg);
    zombie.scale = .16;
    zombie.velocityX= -(3*2 + score /100);
    zombie.lifetime = 750;
    zombie.setCollider("rectangle", 0,0,400,1800)
    zombieGroup.add(zombie);
  }
}
