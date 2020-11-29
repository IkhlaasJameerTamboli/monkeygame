var PLAY
var END
var gameState=PLAY
var monkey , monkey_running , me
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  me = loadAnimation("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  // createCanvas(600, 600);
  


  var survivalTime=0;
  
  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  monkey.addAnimation("end",me)
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

   score = 0;

  
}


function draw() {
  
  background(255);
    text("Score: "+ score, 500,50);

    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  //while game is on
  if(gameState === PLAY){
      if(keyDown("space") ) {
      monkey.velocityY = -12;
     }
     monkey.velocityY = monkey.velocityY + 0.8;
     monkey.collide(ground);
    
     score=score+Math.round(4+(score/60)) ; 
    
  
 
     if(obstaclesGroup.isTouching(monkey)){
         ground.velocityX = 0;
         monkey.velocityY = 0;
         obstaclesGroup.setVelocityXEach(0);
         FoodGroup.setVelocityXEach(0);
         obstaclesGroup.setLifetimeEach(-1);
         monkey.changeAnimation("end",me);
         gameState=END;
        
      }  
      
   
     stroke("black");
     textSize(20);
     fill("black");
     text("Survival Time: "+ score, 100,50);
     
     FoodGroup.setLifetimeEach(-1);
    }
     else if (gameState === END) {

     }
       
    spawnFood();
    spawnObstacles();
 
  drawSprites();
    
    
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
