

//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake Head
var snakeX =blockSize * 5;
var snakeY =blockSize * 5;

//food 
var foodX ; //=blockSize * 10;
var foodY ; //=blockSize * 10;

//to give a speed 
var velocityX =0;
var velocityY =0;

//to give snake body
var snakeBody =[];

//when to end game
var gameOver=false;

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    palceFood();

    document.addEventListener("keyup",changeDirection);
    // update();
    setInterval(update , 1000/5) //millisecond
}


function update(){

    //when game over becomes ture
    if(gameOver){
        return;
    }
    
    //board
    context.fillStyle = "black";
    context.fillRect(0 ,0 ,board.width , board.height);

    //food
    context.fillStyle ="red";
    context.fillRect(foodX,foodY,blockSize,blockSize);

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX,foodY])
        foodSound();
        palceFood();

    }

    //snake head
    context.fillStyle ="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX,snakeY,blockSize,blockSize);

    //to draw snake body
    for(let i=0;i<snakeBody.length;i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize)
    }

    //to move snake body
    for(let i=snakeBody.length-1;i>0;i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0]=[snakeX,snakeY]
    }

    //game over conditions
    if(snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize){
        gameOver=true;
        alert("Game Over");  
        location.reload();
    }
    for(let i=1 ; i < snakeBody.length ; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("Game Over");
            location.reload();
        }
    }

}


//to change direction
function changeDirection(e){

    if (e.code == "ArrowUp" && velocityY != 1){
        velocityX=0;
        velocityY=-1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1){
        velocityX=0;
        velocityY=1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1){
        velocityX=-1;
        velocityY=0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1){
        velocityX=1;
        velocityY=0;
    }
    clickSound();


}


//to palce food random 
function palceFood(){

    //math.random gives a number btwn 0-1
    //(0-1) * col -> (gives a number btwn 0-19.9999) ,to get rid of decimal we use math.floor 
    // which becomes number btwn 0-19
    // thus becoms (0-19) * 25
    foodX =Math.floor(Math.random() * cols ) * blockSize;
    foodY =Math.floor(Math.random() * rows ) * blockSize;
}


//sounds
function clickSound() {
    var audio = new Audio('./source/move.mp3');
    audio.play();
  }

function foodSound() {
    var audio = new Audio('./source/food.mp3');
    audio.play();
  }

