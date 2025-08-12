for (i = 0; i < document.querySelectorAll("button").length; i++) {
    document.querySelectorAll("button")[i].addEventListener("click", function() {
    
    //Set text color to white on click
    this.style.color = "white";
    
    });
}

// var audio = new Audio("./sounds/tom-1.mp3");
// audio.play();