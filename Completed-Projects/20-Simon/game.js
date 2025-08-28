
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence() { 
  // Generate a random number between 0 and 3
  randomNumber = Math.floor((Math.random() * 4));
  // Select a random color
  randomChosenColor = buttonColors[randomNumber];
  // Add each randomChosenColor to gamePattern
  gamePattern.push(randomChosenColor);
  // Select the button with the same id as the randomChosenColor
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  // Play the corresponding sound
  playSound(randomChosenColor);
  // Increase the level by 1
  level++;
  // Update the h1 with the new level
  $("#level-title").text("Level " + level);
}

// Function for playing sounds
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100); 
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
  console.log("User " + userClickedPattern);
  console.log("Game " + gamePattern);
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

// Detect when a button is clicked
$(".btn").click(function() {
  // Store the id of the button that got clicked
  var userChosenColor = $(this).attr("id");
  // Add the contents of userChosenColor to a new array called userClickedPattern
  userClickedPattern.push(userChosenColor);
  // Play sound for the button that got clicked
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// Detect if key has been pressed for the first time
$(document).keypress(function() {
  if (level === 0) {
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

