

// function colorBox(color, blocktype, pointValue, screenTime, clickSound) {
//   this.color = color;
//   this.blocktype = blocktype;
//   this.pointValue = pointValue;
//   this.screenTime = screenTime;
//   this.id = colorId;
//   //maybe increment colorId here? could work
// }
// var colorDict = {"standard":"#800080"};//defines the base color for a type of block, in this case only standard point blocks
// var boxDict = {
//   1:new colorBox('#ff0000',"standard", 2, 1500, ""), 2:new colorBox('#0000ff',"standard", 1, 2000, ""), 3:new colorBox('#800080', "standard", -1, 2500, "")
// };

// function setColor(block){
//   var typeColor = colorDict[block.blocktype];
//
//   var typeR = parseInt(typeColor.substring(1,3), 16);
//   var typeG = parseInt(typeColor.substring(3, 5), 16);
//   var typeB = parseInt(typeColor.substring(5, 7), 16);
//
//   var thisR = parseInt(block.color.substring(1,3),16);
//   var thisG = parseInt(block.color.substring(3, 5),16);
//   var thisB = parseInt(block.color.substring(5, 7),16);
//
//   var newR = (parseInt((typeR+thisR)/2)).toString(16);
//   if(newR.length < 2){
//     newR = "0"+newR;
//   }
//   var newG = (parseInt((typeG+thisG)/2)).toString(16);
//   if(newG.length < 2){
//     newG = "0"+newG;
//   }
//   var newB = (parseInt((typeB+thisB)/2)).toString(16);
//   if(newB.length < 2){
//     newB = "0"+newB;
//   }
//   block.color = "#"+ newR + newG + newB;
// }

// function fadeAway(screenTime) {
//   var divId = $("#"+colorId);
//   var thisOpacity = 1;
//   var fadeAmt = fadeTime/screenTime;//0.05;
//   setInterval(function() {
//
//     divId.css("opacity", thisOpacity - fadeAmt);
//     thisOpacity -= fadeAmt;
//   }, fadeTime);
//
//   setTimeout(function() {
//     divId.remove();
//   }, screenTime);
// }

// function spawnBox() {
//   var numBoxes = Math.ceil(Math.random()*4);
//   for(var i = 0; i < numBoxes; i++){
//     colorId++;
//
//     var whichColor = Math.ceil(Math.random()*3);
//     var newBox = boxDict[whichColor];
//     newBox = JSON.parse(JSON.stringify(newBox));//workaround to copy objects so that they are individual and not copys of constructors stored in the boxDict dictionary
//     setColor(newBox);
//     console.log("spawned a " + newBox.color + " box")
//     var xpos = Math.ceil(Math.random()*$(window).width()-150);
//     var ypos = Math.ceil(Math.random()*$(window).height()-150);
//
//
//     $("body").append("<div class='colorBox' id='" + colorId + "' pointValue='"+ newBox.pointValue +"'></div>");
//     $("body").children("div").last().css({"position":"absolute", "top":ypos, "left":xpos, "background-color":newBox.color.toString()});
//     //$("body").children("div").last().fadeOut(newBox.screenTime);
//     fadeAway(newBox.screenTime);
//     $("body").children("div").last().click(function(){
//       playerScore += parseInt($(this).attr("pointValue"));
//     //   $(this).fadeOut(50);
//       $(this).addClass("animated rollOut");
//       $(".playerScore").text(playerScore);
//     });
//   }
// }

// function gameLoop()
// {
//   spawnBox();
// };


// $(document).ready(function() {
//
// });
