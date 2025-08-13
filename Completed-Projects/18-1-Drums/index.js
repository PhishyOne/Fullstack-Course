
for (i = 0; i < document.querySelectorAll("button").length; i++) {
    document.querySelectorAll("button")[i].addEventListener("click", function () {
        var buttonInnerHTML = this.innerHTML;
        whichSound(buttonInnerHTML);
    });
}

function checkKey() {
    document.addEventListener("keydown", function (event) {
        whichSound(event.key);
    });
}

function whichSound(key) {
    switch (key) {
            case "w":
                playSound("kick-bass");
                break;
            case "a":
                playSound("snare");
                break;
            case "s":
                playSound("tom-1");
                break;
            case "d":
                playSound("tom-2");
                break;
            case "j":
                playSound("tom-3");
                break;
            case "k":
                playSound("tom-4");
                break;
            case "l":
                playSound("crash");
                break;
            default:
                break;
    }
}

function playSound(drum) {
    var drum = new Audio("./sounds/" + drum + ".mp3");
    drum.play();
}