var playerScore = 0;
var colorId = 1;

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
  setTimeout(function() {
    $("#"+colorId).remove();
  }, screenTime)
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


    $("body").append("<div class='colorBox' id='" + colorId + "'></div>");
    $("body").children("div").last().css({"position":"absolute", "top":ypos, "left":xpos, "background-color":newBox.color.toString()});
    //$("body").children("div").last().fadeOut(newBox.screenTime);
    fadeAway(newBox.screenTime);
    $("body").children("div").last().click(function(){
      playerScore += newBox.pointValue;
      $(this).fadeOut(10);
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

    var gameTime = $("#gameTime").val();
    $("#gameOptions").fadeOut();



    var allColorBoxes = setInterval(function(){
      gameLoop();
      console.log("tick");
    }, 750);
  });
});
