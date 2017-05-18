var coin = document.getElementById('coin');
var button = document.getElementById('button');
var multiple = document.getElementById('multiple');
var reset = document.getElementById('reset');
var result = document.getElementById('result');
var headsCounter = document.getElementById('headsCounter');
var TailsCounter = document.getElementById('TailsCounter');
var heads = 0;
var tails = 0;
/* On click of button spin coin ainamtion */
function coinToss() {
  /* Random number 0 or 1  */
  var x = Math.floor(Math.random() * 2);
  result.innerHTML = '';
  /* If statement */
  if (x === 0) {    
  	coin.innerHTML = '<img id="tail" class="tails animate-coint" src="https://upload.wikimedia.org/wikipedia/en/d/d8/British_fifty_pence_coin_2015_reverse.png"/> <img id="heads" class="heads animate-coinh" src="https://upload.wikimedia.org/wikipedia/en/5/52/British_fifty_pence_coin_2015_obverse.png"/>';
    window.setTimeout(function(){heads += 1;
    result.innerHTML = 'You got heads';
    headsCounter.innerHTML = '<h1> Number of heads: ' + heads + '</h1>';},1600);  
  } else {
  coin.innerHTML = '<img id="head" class="heads animate-coinh" src="https://upload.wikimedia.org/wikipedia/en/5/52/British_fifty_pence_coin_2015_obverse.png"/><img id="tails" class="tails animate-coint" src="https://upload.wikimedia.org/wikipedia/en/d/d8/British_fifty_pence_coin_2015_reverse.png"/>';
   window.setTimeout(function(){tails += 1;
    result.innerHTML = 'You got tails';
     tailsCounter.innerHTML = '<h1> Number of tails: ' + tails + '</h1>';},1600);
}
}
function multipletoss(animation,times){
	//the animation feature not yet implemented
	if (animation){
		var a=0;
		while(a<times){
			coinToss();
			a++;
		}
	}
	//without animation
	else{
		var a = 0;
		while(a<times){
		var x = Math.floor(Math.random() * 2);
		if (x === 0) { heads++; 
  }
  		else{
  			tails++;
  		}
  		a++;
	}
	headsCounter.innerHTML = '<h1> Number of heads: ' + heads + '</h1>';
	tailsCounter.innerHTML = '<h1> Number of tails: ' + tails + '</h1>';
}
}
//function for reset
function restart() {
	heads = 0;
	tails = 0;
	result.innerHTML = '';
	headsCounter.innerHTML = '';
	tailsCounter.innerHTML = '';
	coin.innerHTML = '';
}
button.onclick = function() {
  coinToss();
}
//Tosses coin multiple times
multiple.onclick = function() {
  var times = prompt("Enter no. of flips");
  //var animation = confirm("Click Ok to show all animations or cancel to show final result");
  multipletoss(false,times);
}
//the animation feature is not currently implemented
//resets the page
reset.onclick = function() {
  restart();
}

