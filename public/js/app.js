
var counter = 0;
var seconds;
var current;
var showMole;
var counterInterval;
var addRandomImageInterval;
var showingImage;


// Timer Function
var countdown = function(){
	if(seconds <= 0) {
		clearInterval(counterInterval);
	}
	seconds = $('#timer').text();
	seconds--;
	$('#timer').text(seconds);
}

// Random image Generator
function pickImage() {
	var images = $('.gameSquare img');
    var rand = Math.floor(Math.random() * 5);
    current = $(images[rand]).data('char');
    return images[rand];
}

// Click Listener for Start Button
$('#startGame').on('click', function(e) {
	$(this).attr('disabled', true);
	// interval for the countdown function
	counterInterval = setInterval(countdown, 1000);
	// returned random image element
	var image = pickImage();
	// call addRandomImage and give it the local random image from the click listener
	addRandomImage(image);
});

$('#resetGame').on('click', function(){
	$('#timer').text('30');
	$('#counter').text('0');
	$('#startGame').attr('disabled', false);
	$('.gameSquare').children().hide();
	clickedImage = false;
	clearInterval(counterInterval);
	clearInterval(showingImage);
});
	
// Click listener for 
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

function addRandomImage(image) {

	var position = randomPositionValues(image);
	console.log(position);
	// (position) is the css object properties
	$(image).css(position);
	// parse/make to into jQuery object and display image with CSS
	$(image).show();//addClass('active').removeClass('notHere');

	showingImage = setTimeout(function() {
		$(image).hide();
		var image = pickImage();
		// add a new image to the screen
		addRandomImage(image);
	}, 2500);

	$(image).on('click', function(){
		clearInterval(showingImage);
	});
}

function randomPositionValues(image) {
	return {
		left: Math.floor(Math.random() * (800 - $(image).width())),
		top: Math.floor(Math.random() * (494 - $(image).height())),
		position: 'relative'
	};
}



