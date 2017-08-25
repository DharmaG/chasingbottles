
// var canvas = document.querySelector('canvas');

var mainBabyX = 350; // position of the baby
var mainBabyY = 450; // position of the baby

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');


function keycodeCommands(x){
  var code = x.keyCode;
  switch (code){
    case 37:
    mainBabyX = mainBabyX - 20;
    break;

    case 39:
    mainBabyX= mainBabyX + 20;
    break;
  }
}

document.addEventListener('keydown',keycodeCommands, false);



var drawTime;
var imgDrop;
var bottleX = 0; // x
var bottleY = 0; // y
var noBottles = 6;
var fallingBottles1 = [];
var bottleCounter = 0;
var infectedBottles = 3;
var fallingInfected = [];
var taking = document.getElementsByClassName('counter').innerHTML;
var gameEnded = false;
var bottleTimes = 0;
var starting = false;
var gameWin = false;

var bottleImageReady = false;
var bottleImage = new Image();
bottleImage.src = './img/bottle.png';
bottleImage.onload = function () {
    bottleImageReady = true;
};

var infectedBottlesReady = false;
var infectedBottles = new Image();
infectedBottles.src = './img/infectedbottle.png';
infectedBottles.onload = function () {
    infectedBottlesReady = true;
};

var background = new Image();
background.src = './img/background.jpg';
background.onload = function () {
    draw();
};

var woodFloor = new Image();
woodFloor.src = './img/woodenfloor.jpg';
woodFloor.onload = function () {
    draw();
};

var base_image = new Image();
base_image.src = './img/main.png';
base_image.onload = function () {
    draw();
};

var byeBye = document.getElementById("byeBye");
var sneeze = document.getElementById("sneeze");
var backgroundSound = document.getElementById("background");
var babyTalk = document.getElementById("babyTalk");


function draw(){

  context.clearRect(0, 0, canvas.width, canvas.height);

  context.drawImage(background, -10, 0, 800, 550);
  context.drawImage(woodFloor, 0, 500, 1050, 150);


  context.drawImage(base_image, mainBabyX, mainBabyY, 150, 150 * base_image.height / base_image.width);

  if(bottleImageReady) {

    for (i = 0; i < fallingBottles1.length; i++){
      context.drawImage (fallingBottles1[i].image, fallingBottles1[i].x, fallingBottles1[i].y, 100, 100);

      fallingBottles1[i].y += fallingBottles1[i].speed;
      if (fallingBottles1[i].y > canvas.height){
        fallingBottles1[i].y = -100; // img size
        fallingBottles1[i].x = Math.random() * canvas.width;

      }
    }
  }

  if(infectedBottlesReady){

    for (i = 0; i < fallingInfected.length; i++){
      context.drawImage (fallingInfected[i].image, fallingInfected[i].x, fallingInfected[i].y, 100, 100);

      fallingInfected[i].y += fallingInfected[i].speed;
      if (fallingInfected[i].y > canvas.height){
        fallingInfected[i].y = -100; // img size
        fallingInfected[i].x = Math.random() * canvas.width;

      }
    }
  }

  collisionDetection();
 }


 function drawScore() {
   context.font = "30px Arial";
    context.fillStyle = "#000000";
    context.fillText(bottleCounter, 70, 40);
    context.drawImage(bottleImage, 10, 5, 50, 50);
   }

 function collisionDetection(){

// detecting collision for regular bottles
   for(i = 0; i < fallingBottles1.length; i++){
       var collide = fallingBottles1[i];
       if(mainBabyX > collide.x && mainBabyX < collide.x + 60 && mainBabyY > collide.y && mainBabyY < collide.y + 60){
        //  fallingBottles1.splice(i , 1);
        fallingBottles1[i].y = -100; // img size
        fallingBottles1[i].x = Math.random() * canvas.width;
         bottleCounter++;
         babyTalk.play();
       } // if closing

       else if (mainBabyX + 60 > collide.x && mainBabyX + 60 < collide.x + 60 && mainBabyY > collide.y && mainBabyY < collide.y + 60) {
          // fallingBottles1.splice(i , 1);
          fallingBottles1[i].y = -100; // img size
          fallingBottles1[i].x = Math.random() * canvas.width;
          bottleCounter++;
         babyTalk.play();
       }// else if closing

   } // for closing


// detecting collision for infected bottles
   for(i = 0; i < fallingInfected.length; i++){
       var collide = fallingInfected[i];
       if(mainBabyX > collide.x && mainBabyX < collide.x + 70 && mainBabyY > collide.y && mainBabyY < collide.y + 70){
        //  fallingInfected.splice(i , 1);
        fallingInfected[i].y = -100; // img size
        fallingInfected[i].x = Math.random() * canvas.width;
         bottleCounter--;
         bottleTimes++;
         sneeze.play();

       } // if closing

       else if (mainBabyX + 60 > collide.x && mainBabyX + 60 < collide.x + 60 && mainBabyY > collide.y && mainBabyY < collide.y + 60) {
          // fallingInfected.splice(i , 1);
          fallingInfected[i].y = -100; // img size
          fallingInfected[i].x = Math.random() * canvas.width;
          bottleCounter--;
          bottleTimes++;
          sneeze.play();


       }// else if closing
          winner();
          gameOver();
   } // for closing

   drawScore();
 }


function winner(){
  if(bottleCounter == 10){
      $('.modalWinner').modal('show');
      gameWin = true;
  }
}

function gameOver(){
    if(bottleTimes == 3 && gameEnded === false){
        $('.modalGameOver').modal('show');
        gameEnded = true;
        byeBye.play();
        clearInterval(drawTime);
    }

    $('.closeGame').click(function pause(){
       bottleTimes = 0;
       gameEnded = false;
       location.reload();

    });

 }


function setup(){

  if (context){
    for (i = 0; i < noBottles; i++){
      var bottle  = new Object();
     bottle['image']= bottleImage
     bottle['x'] = Math.random() * canvas.width;
     bottle['y'] = Math.random() * -100;
     bottle['speed'] = .70;
     fallingBottles1.push(bottle);


   } // for closing
  } // if closing


// 2nd if function
  if (context){
    for (i = 0; i < 2; i++){
      var infect  = new Object();
     infect['image']= infectedBottles
     infect['x'] = Math.random() * canvas.width;
     infect['y'] = Math.random() * -100;
     infect['speed'] = .70;
     fallingInfected.push(infect);


   } // for closing 2nd if
 } // if closing 2nd if

}; // closing setup


draw();

$('.start').one("click", function start(){
  drawTime = setInterval(draw, 10);
  setup();
  backgroundSound.play();
});

$('.pause').click(function pause(){
   clearInterval(drawTime);
   $('.start').one("click", function start(){
     drawTime = setInterval(draw, 0);
     backgroundSound.stop();
   });
});

$('.instruccions').click(function instructions(){
      $('.modalInstructions').modal('show');
      clearInterval(drawTime);
});
