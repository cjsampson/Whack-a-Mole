
var counter = 0;
var seconds;
var current;


var countdown = function(){
	if(seconds <= 0) {
		clearInterval(intervalID);
	}
	seconds = $('#timer').text();
	seconds--;
	$('#timer').text(seconds);
}

function pickImage() {
	var images = $('.gameSquare img');
    var rand = Math.floor(Math.random() * 3);
    current = $(images[rand]).data('char');
    return images[rand];
}

$('#startGame').on('click', function(e) {
	$(this).attr('disabled', true);
	// interval for the countdown function
	var intervalID = setInterval(countdown, 1000);
	// returned random image element
	var image = pickImage();
	// call addRandomImage and give it the local random image from the click listener
	addRandomImage(image);
});
	
function clickedImage(e){
	// increment count
	counter++;
	// set the value of the DOM element to the new value of counter
	$('#counter').text(counter);
	// on image click remove with CSS
	$(this).hide();//removeClass('active').addClass('notHere');
	// store function return
	var image = pickImage();
	// add a new image to the screen
	addRandomImage(image);
}

$('.gameSquare img').on('click', clickedImage);

function addRandomImage(image){
	var position = randomPositionValues(image);
	console.log(position);
	// (position) is the object of properties/methods returned from the randomPositionValue() call
	$(image).css(position);
	// parse/make to into jQuery object and display image with CSS
	$(image).show();//addClass('active').removeClass('notHere');
	//var currentImage = image;

	// Remove it after 2.5 seconds
	setTimeout(function(){
		if (current != $(image).data('char')) {$(image).show(); return;}
		$(image).hide();//removeClass('active').addClass('notHere');
		clearInterval();
	}, 2500);
}

function randomPositionValues(image) {
	return {
		left: Math.floor(Math.random() * (800 - $(image).width())),
		top: Math.floor(Math.random() * (494 - $(image).height())),
		position: 'relative'
	};
}


