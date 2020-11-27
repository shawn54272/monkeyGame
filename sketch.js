var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survialTime;
var ground;


//GameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Preload
function preload() {


  //Monkey
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  //Banana
  monkeyImage = loadAnimation("sprite_0.png");
  bananaImage = loadImage("banana.png");
  //Obstacle
  obstacleImage = loadImage("obstacle.png");

}


//Setup
function setup() {
  //Canvas
  createCanvas(600, 400);

  //Groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();

  //Monkey
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.1;

  //Ground
  ground = createSprite(600, 350, 10000, 10);
  ground.velocityX = -6;
  ground.x = ground.width / 2;

  //score
  score = 0;
  survialTime = 0;

}

//Draw
function draw() {

  //Background
  background("white");

  //displaying survialtime
  stroke("black");
  fill("black");
  textSize(20);

  text("Survial Time:" + survialTime, 100, 50);

  //displaying score
  stroke("black");
  fill("black");
  textSize(20);
  text("Score:" + score, 300, 100);

  //Monkey
  monkey.collide(ground);
  //PLAY
  if (gameState === PLAY) {
    monkey.addAnimation("running", monkey_running);

    survialTime = Math.ceil(frameCount / frameRate());


    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    //jump when the space key is pressed
    if (keyDown("space") && monkey.y > 310) {
      monkey.velocityY = -15;
    }

    if (FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score + 1;
    }

    //Gravity
    monkey.velocityY = monkey.velocityY + 0.8;




    //groups lifetime
    obstacleGroup.setLifetimeEach(-1);

    //Adding Functions
    food();
    obstacles();





    if (obstacleGroup.isTouching(monkey)) {

      gameState = END;

    }
  }
  //END
  if (gameState === END) {
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    survialTime.visible = false;
    ground.velocityX = 0;
    monkey.visible = false;



    stroke("red");
    fill("red");
    textSize(30);
    text("Game Over", 110, 200);

    stroke("black");
    fill("black");
    textSize(30);
    text("Monkey is dead", 100, 240);
  }



  //draw Sprites
  drawSprites();
}

//Banana
function food() {
  if (frameCount % 120 === 0) {
    banana = createSprite(600, 180, 40, 10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(90,180));
    banana.scale = 0.1;

    banana.velocityX = -5;
    banana.lifetime = 200;

    FoodGroup.add(banana);
  }
}

//Obstacles
function obstacles() {
  if (frameCount % 250 === 0) {
    obstacle = createSprite(600, 325, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
  }

}