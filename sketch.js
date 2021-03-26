var backImage,backgr;
var player, player_running;
var ground,ground_img,rooof;
var foodGroup, bananaImage;
var obstacleGroup, obstacle_img;
var score=0;
var gameState=1;


function preload(){
  backImage = loadImage("Images/jungle2.jpg");
  player_running = loadAnimation("Images/Monkey_01.png", "Images/Monkey_02.png", 
                                 "Images/Monkey_03.png", "Images/Monkey_04.png", 
                                 "Images/Monkey_05.png", "Images/Monkey_06.png", 
                                 "Images/Monkey_07.png", "Images/Monkey_08.png", 
                                 "Images/Monkey_09.png", "Images/Monkey_10.png");

  bananaImage = loadImage("Images/Banana.png");
  obstacle_img = loadImage("Images/stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.2;
  
  ground = createSprite(400,350,800,10);
  ground.visible=false;

  roof = createSprite(400,2,800,10);
  roof.visible=false;  
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);

  if (gameState===1){

    camera.position.x = player.x;
    camera.position.y = player.y;
    
    if(ground.x<0) {
      ground.x=ground.width/2;
    }

    if(roof.x<0) {
      roof.x=roof.width/2;
    }

    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
  
    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score = score + 2;
    }
    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    player.collide(roof);
    spawnFood();
    spawnObstacles();
  }

  if(obstacleGroup.isTouching(player)){ 
    gameState=2      
  }   
  if(gameState===2){
    end()
  }
  
  console.log(gameState);

  drawSprites();
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    obstacleGroup.add(obstacle);
  }
}

function end() {
  text("GAMEOVER",400,200);
  textSize("30");
  player.velocityY = 0;
  score=0;
  backgr.addImage(backImage);
  backgr.velocityX=0;
  player.remove() 
  foodGroup.destroyEach();
  obstacleGroup.destroyEach();
  foodGroup.visible=false;
  obstacleGroup.visible=false;
}