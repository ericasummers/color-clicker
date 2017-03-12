var playerScore = 0;
var colorId = 1;
var fadeTime = 50;

function colorBox(color, pointValue, screenTime) {
  this.color = color;
  this.pointValue = pointValue;
  this.screenTime = screenTime;
  this.id = colorId;
}
var boxDict = {
  1:new colorBox("red", 2, 1500), 2:new colorBox("blue", 1, 2000), 3:new colorBox("purple", -1, 2500)
};

function fadeAway(screenTime) {
  var divId = $("#"+colorId);
  var thisOpacity = 1;
  var fadeAmt = fadeTime/screenTime;//0.05;
  setInterval(function() {

    divId.css("opacity", thisOpacity - fadeAmt);
    thisOpacity -= fadeAmt;
  }, fadeTime);

  setTimeout(function() {
    divId.remove();
  }, screenTime);
}

function spawnBox() {
  var numBoxes = Math.ceil(Math.random()*4);
  for(var i = 0; i < numBoxes; i++){
    colorId++;

    var whichColor = Math.ceil(Math.random()*3);
    var newBox = boxDict[whichColor];
    console.log("spawned a " + newBox.color + " box")
    var xpos = Math.ceil(Math.random()*$(window).width()-150);
    var ypos = Math.ceil(Math.random()*$(window).height()-150);


    $("body").append("<div class='colorBox' id='" + colorId + "' pointValue='"+ newBox.pointValue +"'></div>");
    $("body").children("div").last().css({"position":"absolute", "top":ypos, "left":xpos, "background-color":newBox.color.toString()});
    //$("body").children("div").last().fadeOut(newBox.screenTime);
    fadeAway(newBox.screenTime);
    $("body").children("div").last().click(function(){
      playerScore += parseInt($(this).attr("pointValue"));
    //   $(this).fadeOut(50);
      $(this).addClass("animated rollOut");
      $("#playerScore").text(playerScore);
    });
  }
}

function gameLoop()
{
  spawnBox();
};

$(document).ready(function() {
  $("#gameOptions").submit(function(event) {
    event.preventDefault();

    var gameTime = $("#gameTime").val() * 1000;
    fadeTime = parseInt($("#difficulty").val());
    $("#gameOptions").fadeOut();
    $("#gameTimer").fadeIn();



    var allColorBoxes = setInterval(function(){
      gameLoop();
    }, 750);

    var timerOutput = $("#gameTimer");
    var startTime = Date.now();
    console.log(Date.now());
    var gameTimer = setInterval(function() {
        var elapsedTime = Date.now() - startTime;
        var remainingTime = gameTime - elapsedTime;
        var ms = ((remainingTime%1000)).toFixed(0);
        var seconds =  (((remainingTime / 1000)%60 )).toFixed(0);
        var minutes = Math.floor((remainingTime / 1000)/60 % 60).toFixed(0);
        timerOutput.text(minutes + ":" + seconds + ":" + ms );

        if (elapsedTime > gameTime){
          clearInterval(allColorBoxes);
          clearInterval(gameTimer);
          timerOutput.text("game finished.");
          alert()
          $("#add-score").show();
          $("#playerMetrics").hide();
          $("input#player-score").val("playerScore");
        }
    }, 10);

  });
});
