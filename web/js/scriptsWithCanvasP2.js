$(document).ready(function() {
var playerScore = 0;
var colorId = 1;
var fadeTime = 50;
var buffer = 1;

var canvas = document.getElementById("canvas");
canvas.setAttribute("width", canvas.offsetWidth);
canvas.setAttribute("height", canvas.offsetHeight);
console.log(canvas);
var ctx=canvas.getContext("2d");
// var frame


var gameTime = 60000;//$("#gameTime").val() * 1000;
var timerOutput = $("#gameTimer");
var startTime = Date.now();

function colorBox(color, blocktype, pointValue, screenTime, context,canvas) {//add sound/animation later
  this.width = 150;
  this.height = 150;
  this.color = color;
  this.x=Math.ceil(Math.random()*canvas.width)-75;//removed -150 from both
  this.y=Math.ceil(Math.random()*canvas.height)-20;
  this.blocktype = blocktype;
  this.pointValue = pointValue;
  this.screenTime = screenTime;
  this.id = colorId;
  this.ctx=context;
  this.clicked=false;
  // this.context=ctx; ctx will never change, probably never need this


  this.clickCheck = function() {
      var myleft = this.x;
      var myright = this.x + (this.width);
      var mytop = this.y;
      var mybottom = this.y + (this.height);
      var hasBeenClicked = true;
      if ((mybottom < myGameArea.y) || (mytop > myGameArea.y)
       || (myright < myGameArea.x) || (myleft > myGameArea.x)) {
          hasBeenClicked = false;
      }
      this.clicked = hasBeenClicked;
      console.log(this.clicked);
      if(hasBeenClicked){
        console.log("PLUS+" + this.pointValue);
      }
  }

  //maybe increment colorId here? could work
}
updateBlock=function(block){
  block.screenTime -=20;
  ctx.fillStyle = block.color;
  ctx.fillRect(block.x, block.y, block.width, block.height);
}
var colorDict = {"standard":"#800080"};//defines the base color for a type of block, in this case only standard point blocks
var boxDict = {
  1:new colorBox('#ff0000',"standard", 2, 1500, ctx, canvas),
  2:new colorBox('#0000ff',"standard", 1, 2000, ctx, canvas),
  3:new colorBox('#800080',"standard", -1, 2500, ctx, canvas)
};
function spawn(random){
  var roll = Math.ceil(Math.random()*3);
  if(roll===1){
    return new colorBox('#ff0000',"standard", 2, 1500, ctx, canvas);
  } else if(roll===2){
    return new colorBox('#0000ff',"standard", 1, 2000, ctx, canvas);
  } else if (roll===3){
    return new colorBox('#800080',"standard", -1, 2500, ctx, canvas);
  }
}

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var frames = 0;

  var myScore;
  var myGamePiece;
  var myGameArea = {
    canvas : canvas,
    blocks:[],
    x:10000000,
    y:10000000,
    score: 0,
    start : function() {
      function component(width, height, color, x, y, type) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.time;
        this.update = function() {
            // ctx = myGameArea.context;
            if (this.type == "text" && this.width !== "29px") {
                ctx.font = this.width + " " + this.height;
                ctx.fillStyle = color;
                ctx.fillText(this.text, this.x, this.y);
            } else if (this.width ==="29px") {
              var elapsedTime = Date.now() - startTime;
              var remainingTime = gameTime - elapsedTime;
              var ms = ((remainingTime%1000)).toFixed(0);
              var seconds =  (((remainingTime / 1000)%60 )).toFixed(0);
              var minutes = Math.floor((remainingTime / 1000)/60 % 60).toFixed(0);
              // timerOutput.text(minutes + ":" + seconds + ":" + ms );
              this.text=minutes + ":" + seconds + ":" + ms;
              ctx.font = this.width + " " + this.height;
              ctx.fillStyle = color;
              ctx.fillText(this.text, this.x, this.y);
              // if (elapsedTime > gameTime){
              //   // clearInterval(allColorBoxes);
              //   // clearInterval(gameTimer);
              //   timerOutput.text("game finished.");
              //   alert()
              //   $("#add-score").show();
              //   $("#playerMetrics").hide();
              //   document.getElementById('player_score').setAttribute('value', playerScore);
              //   // $("#player_score").val(playerScore);
              // }
            } else {
              ctx.fillStyle = color;
              ctx.fillRect(this.x, this.y, this.width, this.height);

            }
        }

      }
      myScore = new component("30px", "Consolas", "black", 10, 40, "text");
      myTimer = new component("29px", "Consolas", "black", 20, 80, "text");
      canvas.addEventListener('click', function (e) {
              myGameArea.x = e.pageX;
              myGameArea.y = e.pageY;
          });
          canvas.addEventListener('mouseup', function (e) {
              myGameArea.x = 10000000;
              myGameArea.y = 10000000;
          });

      // this.canvas.width = 480;
      // this.canvas.height = 270;
      this.context = this.canvas.getContext("2d");

      // document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
  function updateGameArea() {
    myGameArea.clear();
    myScore.text="SCORE: " + myGameArea.score;
    myTimer.text="TIME: " +myGameArea.time;
    myTimer.update();
    myScore.update();
    if(frames > 750){
      myGameArea.blocks.push(spawn([Math.ceil(Math.random()*3)]));
      myGameArea.blocks.push(spawn([Math.ceil(Math.random()*3)]));
      myGameArea.blocks.push(spawn([Math.ceil(Math.random()*3)]));
      frames=0;
    }

    frames += 20;
    for(var i = 0; i < myGameArea.blocks.length; i++){
      myGameArea.blocks[i].x +=Math.ceil(Math.random()*3)-2;
      myGameArea.blocks[i].y +=Math.ceil(Math.random()*3)-2;

      updateBlock(myGameArea.blocks[i]);

      myGameArea.blocks[i].clickCheck();
      myGameArea.blocks = myGameArea.blocks.filter(function(block){
        if(block.screenTime < 0){
          return false;
        }
        if(block.clicked){
          myGameArea.score += block.pointValue;
          return false;
        }
        return true;
      });

    }
  }


function startGame() {
    myGameArea.start();
}
startGame();



// var myGameArea = {
//   canvas:canvas,
//   start:function(){
//     this.interval=setInterval(updateGameArea,20);
//   },
//   clear:function(){
//     ctx.clearRect(0,0,canvas.width, canvas.height);
//   }
// }

  //old code
  // $("#gameOptions").submit(function(event) {
  //   event.preventDefault();
  //
  //   var gameTime = $("#gameTime").val() * 1000;
  //   fadeTime = parseInt($("#difficulty").val());
  //   $("#gameOptions").fadeOut();
  //   $("#gameTimer").fadeIn();
  //
  //
  //
  //   var allColorBoxes = setInterval(function(){
  //     gameLoop();
  //   }, 750);
  //
  //   var timerOutput = $("#gameTimer");
  //   var startTime = Date.now();
  //   console.log(Date.now());
  //   var gameTimer = setInterval(function() {
  //       var elapsedTime = Date.now() - startTime;
  //       var remainingTime = gameTime - elapsedTime;
  //       var ms = ((remainingTime%1000)).toFixed(0);
  //       var seconds =  (((remainingTime / 1000)%60 )).toFixed(0);
  //       var minutes = Math.floor((remainingTime / 1000)/60 % 60).toFixed(0);
  //       timerOutput.text(minutes + ":" + seconds + ":" + ms );
  //
  //       if (elapsedTime > gameTime){
  //         clearInterval(allColorBoxes);
  //         clearInterval(gameTimer);
  //         timerOutput.text("game finished.");
  //         alert()
  //         $("#add-score").show();
  //         $("#playerMetrics").hide();
  //         document.getElementById('player_score').setAttribute('value', playerScore);
  //         // $("#player_score").val(playerScore);
  //       }
  //   }, 10);
// });

});
