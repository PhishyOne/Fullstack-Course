
//Changes h1 to whatever key is pressed
$(document).keydown(function(event) {
    $("h1").text(event.key);
});