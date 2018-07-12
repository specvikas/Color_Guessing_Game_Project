var numSquares = 6;
var c = 61;
var score = 0;
var attempts = 0;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var timeBlock = document.querySelector(".timeblock");
var board = document.querySelectorAll(".score");

init();

function init(){
	modeButtonsListener();
	squareListener();
	reset();

}

// function scoreListener()
// {
// 	for(var i = 0; i < board.length; i++)
// 	{
// 		board[i].addEventListener("click",function(){
// 			messageDisplay.textContent = "";
// 		});
// 	}
// }

function modeButtonsListener(){
	for(var i = 0; i < modeButtons.length; i++)
	{
	modeButtons[i].addEventListener("click",function(){
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");
		this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
		reset();

	});
	}
}

function squareListener(){
	for(var i=0; i < squares.length; i++){
	squares[i].style.backgroundColor = colors[i];

	squares[i].addEventListener("click",function(){
	var clickedColor = this.style.backgroundColor;
	if(clickedColor === pickedColor){
		messageDisplay.textContent = "Correct !!";
		changeColors(clickedColor);
		resetButton.textContent = "Next";
		h1.style.backgroundColor = pickedColor;
		score = score + 1;
		attempts = attempts + 1;
	}
	else{
		this.style.backgroundColor = "#232323";
		messageDisplay.textContent = "Try Again !!";
		attempts = attempts + 1; 
	}
	});
	}
}

// function removeSquareListener()
// {
// 	for(var i = 0; i < squares.length; i++){
// 		squares[i].removeEventListener("click",'');
// 	}
// }

function reset(){
	if(resetButton.textContent === "Next"){
		resetButton.textContent = " New Colors";
		messageDisplay.textContent = " ";
	}
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else
		{
			document.querySelectorAll(".square")[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";

}

// easyBtn.addEventListener("click", function(){
// 	hardBtn.classList.remove("selected");
// 	easyBtn.classList.add("selected");
// 	numSquares = 3;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for(var i = 0; i < squares.length; i++)
// 	{
// 		if(colors[i]){
// 		squares[i].style.backgroundColor = colors[i];
// 	}
// 	else
// 	{
// 	document.querySelectorAll(".square")[i].style.display = "none";
// 	}
// 	}
// });

// hardBtn.addEventListener("click", function(){
// 	easyBtn.classList.remove("selected");
// 	hardBtn.classList.add("selected");
// 	numSquares = 6;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;
// 	for(var i = 0; i < squares.length; i++)
// 	{
// 		squares[i].style.backgroundColor = colors[i];
// 		document.querySelectorAll(".square")[i].style.display = "block";
// 	}

   
// });



resetButton.addEventListener("click", function(){
	reset();
	// if(resetButton.textContent === "Play Again ?"){
	// 	resetButton.textContent = " New Colors";
	// 	messageDisplay.textContent = " ";
	// }
	// colors = generateRandomColors(numSquares);
	// pickedColor = pickColor();
	// colorDisplay.textContent = pickedColor;
	// for(var i = 0; i < squares.length; i++){
	// 	squares[i].style.backgroundColor = colors[i];
	// }
	// h1.style.backgroundColor = "steelblue";
});

//timer code
window.onload = function(){

	setTimeout(function(){
		timer()
	},2000);
}
	
function timer() 
{
    c = c - 1;
	if(c>=0)
	{
	 document.getElementById('timer').innerHTML = c;
     var t = setTimeout(function(){timer()},1000);
 	}
	else 
	{
	clearTimeout(t);
    timeBlock.classList.remove("timeblock");
    timeBlock.classList.add("gameover");
    timeBlock.textContent = "Game Over!";
    for(var i = 0; i < squares.length; i++)
    {
    	squares[i].classList.remove("square");
    	if( i === 0)
    	{
    		squares[0].classList.add("score");
    		squares[0].style.backgroundColor = "#232323";
    		squares[0].textContent = "Your Score is : " + score;
    	}
    	if(i === 3)
    	{
    		squares[3].classList.add("score");
    		squares[3].style.backgroundColor = "#232323";
    		squares[3].textContent = "Your Attempts were : " + attempts;
    	}
    }
    // removeSquareListener();
    h1.style.backgroundColor = "steelblue";
    messageDisplay.textContent = " ";
    resetButton.textContent = " ";
    modeButtons[0].textContent = " ";
    modeButtons[1].textContent = " ";
    modeButtons[1].style.backgroundColor = "white";
    modeButtons[0].classList.remove("selected");
    modeButtons[1].classList.remove("selected");
    c = 61 ;
	}
}

function checkSecond(sec) 
{
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}

function changeColors(color){
	for(var i = 0; i < squares.length; i++){
		squares[i].style.backgroundColor = color;
		}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length );
	return colors[random];
}

function generateRandomColors(num)
{
	var arr = [];
	for(var i = 0; i < num; i++){

		arr.push(randomColor());
	}
	return arr;
}

function randomColor(){

	var r = Math.floor( Math.random() * 256 );

	var g = Math.floor( Math.random() * 256 );

	var b = Math.floor( Math.random() * 256 );

	return "rgb(" + r + ", " + g + ", " + b + ")";
}