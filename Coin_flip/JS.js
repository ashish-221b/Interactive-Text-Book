var coin = document.getElementById('coin');
var button = document.getElementById('button');
var multiple = document.getElementById('multiple');
var reset = document.getElementById('reset');
var result = document.getElementById('result');
var headsCounter = document.getElementById('headsCounter');
var TailsCounter = document.getElementById('TailsCounter');
function round(n1,n2){
  return Math.round(n1*Math.pow(10,n2))/Math.pow(10,n2);
}
var cointimes=[0,0];
var probTheo=[.5,.5];
headsCounter.innerHTML = '<h1> Number of heads: ' + cointimes[0] + '</h1>';
tailsCounter.innerHTML = '<h1> Number of tails: ' + cointimes[1] + '</h1>';
/* On click of button spin coin ainamtion */
function restart() {
  cointimes[0] = 0;
  cointimes[1] = 0;
  result.innerHTML = '';
  headsCounter.innerHTML = '';
  tailsCounter.innerHTML = '';
  coin.innerHTML = '';
}
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
var multipletossflag=0
function multipletoss(animation,times){
  multipletossflag ++;
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
    
		var count = 0;

    var interval = setInterval(function() {
    var x = Math.floor(Math.random() * 2);
    if (x == 0) { cointimes[0]++;}
      else{
        cointimes[1]++;
      }
      count++;
      headsCounter.innerHTML = '<h1> Number of heads: ' + cointimes[0] + '</h1>';
      tailsCounter.innerHTML = '<h1> Number of tails: ' + cointimes[1] + '</h1>';
      updateCoin();
      console.log(times+" "+count+ " "+ multipletossflag)
      if (count == times){
          window.clearInterval(interval);
          multipletossflag=0;
        }
      if (count >0 &&  multipletossflag == 2)
      {
        window.clearInterval(interval);
        multipletossflag=1;
      }
     if (count >0 &&  multipletossflag == 5)
     {

        window.clearInterval(interval);
        multipletossflag=0;
        restart();
     }

  }, 10);
 
}
}
//function for reset
function restart() {
	cointimes[0] = 0;
	cointimes[1] = 0;
	result.innerHTML = '';
	headsCounter.innerHTML = '<h1> Number of heads: ' + cointimes[0] + '</h1>';
      tailsCounter.innerHTML = '<h1> Number of tails: ' + cointimes[1] + '</h1>';
      updateCoin();
	multipletossflag=5;
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
var sides = states.selectAll("image").data(function(d) { return d.data; }).enter().append("image");
var axisCoin = svgCoin.append("g").attr("class", "x axis");
var xAxisCoin = d3.svg.axis().scale(x0ScaleCoin).orient("bottom").ticks(0);
var tipCoinObs = d3.tip().attr('id', 'tipCoinObs').attr('class', 'd3-tip').offset([-10, 0]);
var tipCoinTheo = d3.tip().attr('id','tipCoinTheo').attr('class', 'd3-tip').offset([-10, 0]);
function updateCoin() {
  var total = Math.max(1,cointimes[0]+cointimes[1]);
  var probObs = [cointimes[0]/total,cointimes[1]/total];
  coinData[0].data[0].value = probObs[0];
  coinData[0].data[1].value = probObs[1];
  coinData[1].data[0].value = probTheo[0];
  coinData[1].data[1].value = probTheo[1];
  tipCoinObs.html(function(d) { return round(d.value,3) +' = '+d.value*total+'/'+total;});
  tipCoinTheo.html(function(d,i) { return round(d.value,3);});

  states
    .attr("transform", function(d) { return "translate(" + x0ScaleCoin(d.state) + "," + 80 + ")"; })
    .attr("class", function(d) { return d.state; });
  rects
    .transition() // NEW
    .duration(50)
    .attr("width", x1ScaleCoin.rangeBand())
    .attr("x", function(d,i) { return x1ScaleCoin(d.side)+i*20+100; })
    .attr("y", function(d) { return yScaleCoin(1-d.value); })
    .attr("height", function(d) { return yScaleCoin(d.value); })
    .attr("class", function(d) { return d.side; });
containerCoin.selectAll('g.Observed rect').each(function(){
    d3.select(this).on('mouseover', tipCoinObs.show).on('mouseout', tipCoinObs.hide);
  })
  containerCoin.selectAll('g.Theoretical rect').each(function(){
    d3.select(this).on('mousedown', function(d){tipCoinTheo.show(d,this)})
            .on('mouseover', function(d){tipCoinTheo.show(d,this)})
            .on('mouseout', tipCoinTheo.hide)
  })  
}
updateCoin();
var width = d3.select('#graphs').node().clientWidth;
axisCoin.attr("transform", "translate(" + 50 + "," + 330 + ")").call(xAxisCoin);
svgCoin.attr("width", width).attr("height", 550).call(tipCoinObs).call(tipCoinTheo);
