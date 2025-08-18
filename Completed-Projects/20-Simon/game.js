
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function nextSequence() {
    // Generate a random number between 1 and 4
    var randomNumber = Math.floor(Math.random() * 3);
    return randomNumber;
}

var randomChosenColor = buttonColors[nextSequence()];
// Add the chosen color to the game pattern
gamePattern.push(randomChosenColor);

//Flash corresponding button
$(".btn." + randomChosenColor).fadeOut(100).fadeIn(100);
// Play sound for the chosen color
var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
audio.play();

//Detect button press
$(".btn").click(function () { 
    var userChosenColor = $(this).attr("id"); 
    //Add chosen color to user clicked pattern
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
});
