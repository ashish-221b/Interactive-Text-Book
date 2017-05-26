var coin = document.getElementById('coin');
var button = document.getElementById('button');
var multiple = document.getElementById('multiple');
var reset = document.getElementById('reset');
var result = document.getElementById('result');
var headsCounter = document.getElementById('headsCounter');
var TailsCounter = document.getElementById('TailsCounter');
var cointimes=[0,0];
var probTheo=[.5,.5];
headsCounter.innerHTML = '<h1> Number of heads: ' + cointimes[0] + '</h1>';
tailsCounter.innerHTML = '<h1> Number of tails: ' + cointimes[1] + '</h1>';
/* On click of button spin coin ainamtion */
function coinToss() {
  /* Random number 0 or 1  */
  var x = Math.floor(Math.random() * 2);
  result.innerHTML = '';
  /* If statement */
  if (x === 0) {    
  	coin.innerHTML = '<img id="tail" class="tailsCounter animate-coint" src="https://upload.wikimedia.org/wikipedia/en/d/d8/British_fifty_pence_coin_2015_reverse.png"/> <img id="heads" class="heads animate-coinh" src="https://upload.wikimedia.org/wikipedia/en/5/52/British_fifty_pence_coin_2015_obverse.png"/>';
    window.setTimeout(function(){cointimes[0] += 1;
    result.innerHTML = 'You got heads';
    headsCounter.innerHTML = '<h1> Number of heads: ' + cointimes[0] + '</h1>';
  updateCoin();},1600);  
  } else {
  coin.innerHTML = '<img id="head" class="heads animate-coinh" src="https://upload.wikimedia.org/wikipedia/en/5/52/British_fifty_pence_coin_2015_obverse.png"/><img id="tails" class="tails animate-coint" src="https://upload.wikimedia.org/wikipedia/en/d/d8/British_fifty_pence_coin_2015_reverse.png"/>';
   window.setTimeout(function(){cointimes[1] += 1;
    result.innerHTML = 'You got tails';
     tailsCounter.innerHTML = '<h1> Number of tails: ' + cointimes[1] + '</h1>';
    updateCoin();},1600);

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
		if (x === 0) { cointimes[0]++; 
  }
  		else{
  			cointimes[1]++;
  		}
  		a++;
	}
	headsCounter.innerHTML = '<h1> Number of heads: ' + cointimes[0] + '</h1>';
	tailsCounter.innerHTML = '<h1> Number of tails: ' + cointimes[1] + '</h1>';
}
}
//function for reset
function restart() {
	cointimes[0] = 0;
	cointimes[1] = 0;
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
//for graph
var coinData = [{data:[{value:0,side:'head'},{value:0,side:'tail'}],state:'Observed'},
        {data:[{value:probTheo[0],side:'head'},{value:probTheo[1],side:'tail'}],state:'Theoretical'}];
//Create SVG
var svgCoin = d3.select("#graphs").append("svg").attr("height",500).attr("width","100%");;

//Create Container
var containerCoin = svgCoin.append('g').attr("height","100%").attr("width","100%");
var yScaleCoin = d3.scale.linear().domain([0,1]).range([0,250]);
var x0ScaleCoin = d3.scale.ordinal().domain(['Observed','Theoretical']).rangeRoundBands([0, 400]);
var x1ScaleCoin = d3.scale.ordinal().domain(['head','tail']).rangeRoundBands([0, 100]);
var states = containerCoin.selectAll("g.state").data(coinData).enter().append("g").attr("class", "state");
var rects = states.selectAll("rect").data(function(d) { return d.data; }).enter().append("rect");

function updateCoin() {
  var total = Math.max(1,cointimes[0]+cointimes[1]);
  var probObs = [cointimes[0]/total,cointimes[1]/total];
  coinData[0].data[0].value = probObs[0];
  coinData[0].data[1].value = probObs[1];
  coinData[1].data[0].value = probTheo[0];
  coinData[1].data[1].value = probTheo[1];

  states
    .attr("transform", function(d) { return "translate(" + x0ScaleCoin(d.state) + "," + 80 + ")"; })
    .attr("class", function(d) { return d.state; });
  rects
    .transition() // NEW
    .duration(300)
    .attr("width", x1ScaleCoin.rangeBand())
    .attr("x", function(d,i) { return x1ScaleCoin(d.side)+i*20+100; })
    .attr("y", function(d) { return yScaleCoin(d.value); })
    .attr("height", function(d) { return yScaleCoin(1-d.value); })
    .attr("class", function(d) { return d.side; });
}