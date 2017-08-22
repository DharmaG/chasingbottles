
// var canvas = document.querySelector('canvas');

var mainBabyX = 350; // position of the baby
var mainBabyY = 350; // position of the baby

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');


function keycodeCommands(x){
  var code = x.keyCode;
  switch (code){
    case 37:
    //  if (//the baby's X is < ~30){
    //     //move
    //  }
     //
    //  if (//the baby's X is >=30 ){
    //    //do not move
    //  }
    mainBabyX = mainBabyX - 15;
    break;

    case 39:
    mainBabyX= mainBabyX + 15;
    break;
  }
}

document.addEventListener('keydown',keycodeCommands, false);


var imgDrop;
var bottleX = 0; // x
var bottleY = 0; // y
var noBottles = 6;
var fallingBottles1 = [];
var bottleImageReady = false;

function draw(){

  context.clearRect(0, 0, canvas.width, canvas.height);


  base_image = new Image();
  base_image.src = './img/main.png';
  context.drawImage(base_image, mainBabyX, mainBabyY, 200, 200 * base_image.height / base_image.width);


  if(bottleImageReady) {

    for (i = 0; i < noBottles; i++){
      context.drawImage (fallingBottles1[i].image, fallingBottles1[i].x, fallingBottles1[i].y, 100, 100);

      fallingBottles1[i].y += fallingBottles1[i].speed;
      if (fallingBottles1[i].y > canvas.height){
        fallingBottles1[i].y = -100; // img size
        fallingBottles1[i].x = Math.random() * canvas.width;
      }
    }
  }
}

var bottleMeasurement = {width: 100, height: 100};
var babyMeasurement = {width: 200, height: 200};

  if (fallingBottles1.x && fallingBottles1.y == mainBabyX && mainBabyY){
    console.log('hola');
  }

function setup(){

  if (context){
    bottleImage = new Image();
    bottleImage.src = './img/bottle.png';
    bottleImage.onload = function () {
        bottleImageReady = true;
    };

    setInterval(draw, 20);

    for (i = 0; i < noBottles; i++){
      var bottle  = new Object();
      bottle['image']= bottleImage
     bottle['x'] = Math.random() * canvas.width;
     bottle['y'] = Math.random() * -100;
     bottle['speed'] = 2 + Math.random() * 2;
     fallingBottles1.push(bottle);

   } // for closing
  } // if closing

}; // closing setup

setup();
draw();
