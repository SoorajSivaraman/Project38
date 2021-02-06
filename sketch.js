var r, nero , nero_running, restartIcon;
var obstacle, obstacleImage1, obstacleImage2, obstacleImage3, obstacleImage4, obstaclesGroup;
var bgrd1, bgrd2, bgrdImg;
var upperInvisible, lowerInvisible;
var hitCount = 0;
var gameState = "begin";
let beginMusic, rockHitSound;

function preload()
{
 soundFormats('mp3','wav');
 beginMusic = loadSound("spaceVoyagerNeroIntro.wav");
 rockHitSound = loadSound("explosion.wav");

 nero_running = loadAnimation("nero1.png", "nero2.png", "nero3.png");
 obstacleImage1 = loadImage("rock.png");
 obstacleImage2 = loadImage("meteor1.png");
 obstacleImage3 = loadImage("meteor2.png");
 obstacleImage4 = loadImage("meteor3.png");
 bgrdImg = loadImage("space.jpg");
}

function setup() 
{
  createCanvas(displayWidth, displayHeight - 112);

  if(gameState === "begin") 
  {
    beginMusic.play();
    background("lightblue");
    fill("maroon");
    textFont("Lucida Calligraphy");
    textSize(30);
    text("Space Voyager Nero!!", displayWidth - 900, displayHeight - 700);
    textSize(20);
    text("Rules of the Game:", displayWidth - 1150, displayHeight - 638.5);
    text("1) Friends !! You are the SPACE ASTRONAUT NERO !!", displayWidth - 1150, displayHeight - 575);
    text("2) The game is about ASTRONAUT NERO exploring Space by overcoming all the obstacles.", displayWidth - 1150, displayHeight - 500);
    text("3) Ensure Nero explores space by encountering least number of METEOR hits.", displayWidth - 1150, displayHeight - 425);
    text("4) Use the UP and DOWN arrows to help NERO avoid obstacles in the form of METEORS.", displayWidth - 1150, displayHeight - 350);
    text("5) NERO's life is in threat for every METEOR bombarded.", displayWidth - 1150, displayHeight - 275);
    text("6) Press SPACE to Start the Game.", displayWidth - 1150, displayHeight - 200);
  }

  obstaclesGroup = createGroup();

  bgrd1 = createSprite(camera.position.x + 683, (displayHeight - 112)/2, displayWidth, displayHeight);
  bgrd1.addImage(bgrdImg);
  bgrd1.scale = 0.76;
  bgrd1.visible = false;

  bgrd2 = createSprite(camera.position.x + 2049, (displayHeight - 112)/2, displayWidth, displayHeight);
  bgrd2.addImage(bgrdImg);
  bgrd2.scale = 0.76;
  bgrd2.visible = false;

  nero = createSprite(camera.position.x + 80, (displayHeight - 112)/2, 20, 20);
  nero.addAnimation("moving", nero_running);
  nero.scale = 0.15;
  nero.visible = false;
  
  upperInvisible = createSprite(displayWidth/2, displayHeight - 748, displayWidth, 5);
  upperInvisible.visible = false;

  lowerInvisible = createSprite(displayWidth/2, displayHeight - 132, displayWidth, 5);
  lowerInvisible.visible = false;
}

function draw() 
{
  if(keyDown("space") && gameState === "begin")
  {
    beginMusic.stop();
    gameState = "play";
  }  
  
  if(gameState === "play")
  {
    bgrd1.visible = true;
    bgrd2.visible = true;
    nero.visible = true;

    bgrd1.velocityX = -2;
    bgrd2.velocityX = -2;

    createObstacles();

    nero.collide(upperInvisible);  
    nero.collide(lowerInvisible);

    camera.position.x = nero.x + 608;
    camera.position.y = (displayHeight - 112)/2;
    
    if(bgrd2.x === camera.position.x - 5) bgrd1.x = camera.position.x + 1361;
    if(bgrd1.x === camera.position.x - 5) bgrd2.x = camera.position.x + 1361;

    if(keyDown("up")) nero.velocityY = -10; 
    if(keyDown("down")) nero.velocityY = 10;
    if(keyWentUp("up") || keyWentUp("down"))   nero.velocityY = 0;
      
    if(nero.isTouching(obstaclesGroup)) 
    {
      obstaclesGroup.destroyEach();
      hitCount = hitCount + 1;
      rockHitSound.play();
    }
  }
  
  drawSprites();

  if(gameState === "play")
  {  
    fill("white");
    textSize(20);
    textFont("Segoe Print");  
    if(hitCount === 1)
    text("Nero has been hit by the meteors " + hitCount + " time.", displayWidth - 900, displayHeight - 748);
    else 
    text("Nero has been hit by the meteors " + hitCount + " times.", displayWidth - 900, displayHeight - 748);
  }
}

function createObstacles()
{
  r = Math.round(random(1, 4));
  if(World.frameCount % 10 === 0)
  {
    obstacle = createSprite(displayWidth, Math.round(random(displayHeight - 740, displayHeight - 140)), 20, 20);
    
    if(r === 1)
    {
      obstacle.addImage(obstacleImage1);
      obstacle.scale = 0.06;    
    }
    else if(r === 2) 
    {obstacle.addImage(obstacleImage2);
     obstacle.scale = 0.27;
    }
    else if(r === 3)
    {
      obstacle.addImage(obstacleImage3);
      obstacle.scale = 0.12;
    }
    else
    {
      obstacle.addImage(obstacleImage4);
      obstacle.scale = 0.17;
    }  
    obstacle.velocityX = -50;
    obstacle.lifetime = 40;
    obstaclesGroup.add(obstacle);
  }  
}