//create the ball, playerPaddle and computerPaddle as sprite objects
var ball = createSprite(200,200,10,10);
ball.setAnimation("ball");
var playerPaddle = createSprite(380,200,10,70);
playerPaddle.setAnimation("player")
var computerPaddle = createSprite(40,200,1,10);
computerPaddle.setAnimation("robot")
//computerPaddle.scale=0.1
//variable to store different state of game
var gameState = "serve";

//variables to keep the score
var compScore = 0;
var playerScore = 0;


function draw() {
  //clear the screen
  background("white");
  createEdgeSprites()
  if(ball.isTouching(computerPaddle) || ball.isTouching(playerPaddle)) {
   playSound("hit.mp3");
  }
  if(ball.isTouching(topEdge)||ball.isTouching(bottomEdge)){
    playSound("wall_hit.mp3")
  }
  if(keyWentDown("k")){
    playerPaddle.setAnimation("player_kick")
  }
  if(keyWentUp("k")){
    playerPaddle.setAnimation("player")
  }
  //place info text in the center
  if (gameState === "serve") {
    text("Press Space to Serve",150,180);
  }
   
  //display scores
  text(compScore, 170,20);
  text(playerScore, 230,20);
  
  //make the player paddle move with the mouse's y position
  playerPaddle.y = World.mouseY;
  
  //AI for the computer paddle
  //make it move with the ball's y position
  computerPaddle.y = ball.y;
  
  //draw line at the centre
  for (var i = 0; i < 400; i=i+20) {
    line(200,i,200,i+10);
  }
  
  
  //create edge boundaries
  //make the ball bounce with the top and the bottom edges
  ball.bounceOff(topEdge);
  ball.bounceOff(bottomEdge);
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);
 
  
  //serve the ball when space is pressed
  if (keyDown("space") &&  gameState === "serve") {
    serve();
    playerPaddle.setAnimation("player")
    gameState = "play";
  }
  
 
  //reset the ball to the centre if it crosses the screen
  if(ball.x > 400 || ball.x <0) {
    playSound("score.mp3")
    
    if(ball.x > 400) {
      compScore = compScore + 1;
      playerPaddle.setAnimation("player_fall")
    }
    
    if(ball.x < 0) {
      playerScore = playerScore + 1;
    }
    
    reset();
    gameState = "serve";
  }
  
  if (playerScore === 5 || compScore === 5){
    gameState = "over";
    text("Game Over!",170,160);
    text("Press 'R' to Restart",150,180);
  }
  
  if (keyDown("r") && gameState === "over") {
    gameState = "serve";
    compScore = 0;
    playerScore = 0;
  }
  
  drawSprites();
}

function serve() {
  ball.velocityX = 3;
  ball.velocityY = 4;
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}

soundVar.loop()
