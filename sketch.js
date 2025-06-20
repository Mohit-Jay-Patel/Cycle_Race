var player_img,player,player_colide;
var opponent;
var opponent1_img , opponent1_colide;
var opponent2_img , opponent2_colide;
var opponent3_img , opponent3_colide;
var opponent_group;
var road_img,road;
var distance = 0;
var gameState = "play";
var gameOver_img,gameOver;


function preload(){
  road_img = loadImage("Road.png");
  player_img = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  player_colide = loadAnimation("mainPlayer3.png");
  opponent1_img = loadAnimation("opponent1.png","opponent2.png");
  opponent2_img = loadAnimation("opponent4.png","opponent5.png");
  opponent3_img = loadAnimation("opponent7.png","opponent8.png");
  opponent1_colide = loadImage("opponent3.png");
  opponent2_colide = loadImage("opponent6.png");
  opponent3_colide = loadImage("opponent9.png");
  gameOver_img = loadImage("gameOver.png");

}

function setup(){
  road = createSprite(600,150);
  road.addImage(road_img);
  road.velocityX = -10;

  player = createSprite(150,150,2,2);
  player.addAnimation("Main_player",player_img);
  player.scale = 0.08;
  
  opponent_group = new Group();


  createCanvas(1200,300);  
}

function draw() {
  background(0);
  drawSprites();
if(gameState == "play"){
  if(road.x < 0){
    road.x = canvas.width/2;
  }
  if(keyDown('down')){
    player.y += 4;
  }
  if(keyDown('up')){
    player.y -= 4;
  }
  if(player.y < 50){
    player.y = 50;
  }
  if(player.y > 247){
    player.y = 247;
  }

  if(player.isTouching(opponent_group)){
    //alert("Touching");
    gameState = "over";
    player.addAnimation("Main_player",player_colide);
    switch(ran_num){
      case 1 :
        opponent.addAnimation('opponent1',opponent1_colide);
        break;
      case 2:
        opponent.addAnimation('opponent2',opponent2_colide);
        break;
      case 3:
        opponent.addAnimation('opponent3',opponent3_colide);
        break;

    }
    opponent_group.setLifetimeEach(-1); 

  }

  if(frameCount%8 == 0){
    distance += 3;
  }
  if(frameCount%100 == 0){
    road.velocityX += -0.5;
  }




  spawnOpponent()
  

  fill("orange");
  textSize(20);
  text("Distance : "+distance, 1000,25);
  
}

else{
  //alert("GameOver")
 //gameOver.visible = true;
  game_over();
  road.velocityX = 0;
  opponent.velocityX = 0;
  fill("white");
  textSize(30);
  text("Press Space Bar to restart the game",350,220);

  if(keyDown('space')){
    restart();
  }
  
}

}
var ran_num
function spawnOpponent(){
  if(frameCount % 150 == 0){
  ran_num = Math.round(random(1,3));
  opponent = createSprite(1300,150);
  opponent.y = Math.round(random(60,240));

  switch(ran_num){
    case 1:
      opponent.addAnimation("opponent1",opponent1_img);
      //opponent.debug = true;
      break;
    case 2 :
      opponent.addAnimation("opponent2",opponent2_img);
      break;
    case 3:
      opponent.addAnimation("opponent3",opponent3_img);
      break;
  }

  opponent.scale = 0.065;
  opponent.velocityX = -9;
  opponent.lifetime = 150;
  opponent_group.add(opponent)


  }
}
function restart(){
  gameState = "play";
  distance = 0;
    
    //opponent.velocityX = -9;
    player.addAnimation("Main_player",player_img);
    opponent_group.destroyEach();
    gameOver.visible = false;
    road.velocityX = -10;
    /*switch(ran_num){
      case 1 :
        opponent.addAnimation('opponent1',opponent1_img);
        break;
      case 2:
        opponent.addAnimation('opponent2',opponent2_img);
        break;
      case 3:
        opponent.addAnimation('opponent3',opponent3_img);
        break;
    }*/
    

}
function game_over(){
 gameOver = createSprite(600,150);
  gameOver.addImage(gameOver_img);
  gameOver.scale = 1.2;
}




