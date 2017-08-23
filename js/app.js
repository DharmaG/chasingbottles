
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


var imgDrop;
var bottleX = 0; // x
var bottleY = 0; // y
var noBottles = 5;
var fallingBottles1 = [];
var bottleImageReady = false;
var bottleCounter = 0;
var infectedBottles = 1;
var fallingInfected = [];
var infectedBottlesReady = false;
var taking = document.getElementsByClassName('counter').innerHTML;

function draw(){

  context.clearRect(0, 0, canvas.width, canvas.height);


  base_image = new Image();
  base_image.src = './img/main.png';
  context.drawImage(base_image, mainBabyX, mainBabyY, 150, 150 * base_image.height / base_image.width);

  collisionDetection();

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
       if(mainBabyX > collide.x && mainBabyX < collide.x + 100 && mainBabyY > collide.y && mainBabyY < collide.y + 100){
         fallingBottles1.splice(i , 1);
         bottleCounter++;
       } // if closing

       else if (mainBabyX + 60 > collide.x && mainBabyX + 60 < collide.x + 60 && mainBabyY > collide.y && mainBabyY < collide.y + 60) {
          fallingBottles1.splice(i , 1);
          bottleCounter++;
       }// else if closing

   } // for closing


// detecting collision for infected bottles
   for(i = 0; i < fallingInfected.length; i++){
       var collide = fallingInfected[i];
       if(mainBabyX > collide.x && mainBabyX < collide.x + 100 && mainBabyY > collide.y && mainBabyY < collide.y + 100){
         fallingInfected.splice(i , 1);
         bottleCounter--;
         bottleCounter--;
       } // if closing

       else if (mainBabyX + 60 > collide.x && mainBabyX + 60 < collide.x + 60 && mainBabyY > collide.y && mainBabyY < collide.y + 60) {
          fallingInfected.splice(i , 1);
          bottleCounter--;
          bottleCounter--;
       }// else if closing

   } // for closing
   drawScore();
 }


function setup(){

  if (context){
    bottleImage = new Image();
    bottleImage.src = './img/bottle.png';
    bottleImage.onload = function () {
        bottleImageReady = true;
    };

    setInterval(draw, 10);

    for (i = 0; i < noBottles; i++){
      var bottle  = new Object();
     bottle['image']= bottleImage
     bottle['x'] = Math.random() * canvas.width;
     bottle['y'] = Math.random() * -100;
     bottle['speed'] = .09;
     console.log(bottle['speed']);
     fallingBottles1.push(bottle);


   } // for closing
  } // if closing


// 2nd if function
  if (context){
    infectedBottles = new Image();
    infectedBottles.src = './img/infectedbottle.png';
    infectedBottles.onload = function () {
        infectedBottlesReady = true;
    };

    setInterval(draw, 1);

    for (i = 0; i < noBottles; i++){
      var infect  = new Object();
     infect['image']= infectedBottles
     infect['x'] = Math.random() * canvas.width;
     infect['y'] = Math.random() * -100;
     infect['speed'] = .09;
     fallingInfected.push(infect);


   } // for closing 2nd if
 } // if closing 2nd if

}; // closing setup
     setInterval(setup, 10000);
setup();
draw();
