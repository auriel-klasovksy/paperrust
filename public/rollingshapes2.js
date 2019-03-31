//For bat-ala
//the shamanic spiral woman.


var scale = 400;
var golden = 1.61803398875	
var ratio = 0.5
var numOfSqars = 901;
var buffer = 0.1;



var background = new Shape.Rectangle({
    rectangle: view.bounds,
});

var start = new Point(100,100)
var x = new Point(1,0)
var y = new Point(0,1)

var raq = [];
raq[0] = start;
raq[1] = start + x*scale;
raq[2] = start + x*scale + y*scale//*golden
raq[3] = start + y*scale//*golden
raq[4] = raq[0]
drawSquer(raq,picolor1(1));
/*var raqtangles1 = [];
var pathes1 = []
makeReq(raq,raqtangles1,pathes1);*/
var raqtangles2 = [];
var pathes2 = [];

var raqtangles3 = [];
var pathes3 = [];
doubleReq(raq,raqtangles2,pathes2,raqtangles3, pathes3);



function doubleReq(seed, raq1, path1, raq2, path2) {
  path1[0] = seed;
  raq1[0] = seed;
  path2[0] = seed;
  raq2[0] = seed;
  var lol = 1;
  for(var j = 0; j < numOfSqars; j++){
    raq2[j+1] = spiralIn(raq2[j],ratio);
    path2[j+1] = drawSquer(raq2[j+1],picolor2(lol));
    raq1[j+1] = spiralIn(raq1[j],ratio);
    path1[j+1] = drawSquer(raq1[j+1],picolor1(lol));
    lol = -lol;
  }
}
function picolor1(l) {
  switch (l) {
    case 1: return 'white'
    case -1: return '#4D091B'    
  }
}
function picolor2(l) {
  switch (l) {
    case 1: return '#731A32'
    case -1: return '#4D091B'    
  }
}
function makeReq(seed, raq, path){
    path[0] = seed;
    raq[0] = seed;
    var lol = 1;
    for(var j = 0; j < numOfSqars; j++){
    	raq[j+1] = spiralIn(raq[j],ratio);
    	
    	path[j+1] = drawSquer(raq[j+1],lol);
      lol = -lol;
    }
}

function foo1(t)  {
  return -(-1 + Math.cos(t/8 + Math.PI/2)/3)/2;
}
function foo2(t)  {
  return (1 + Math.sin(Math.PI + t/8)/3)/2;
}
function onFrame(event){
	//record();
	//var ratio1 = (-1 + Math.sin(event.time/4))/2;
  var ratio3, ratio2;
    ratio3 = foo1(event.time);
  	ratio2 = foo2(event.time);

	
//	raqtangles1[0] = raq;

	for(var j = 0; j < numOfSqars; j++){
		//raqtangles1[j+1] = spiralIn(raqtangles1[j],ratio1)
		//changeSquer(raqtangles1[j+1],pathes1[j+1])
		raqtangles2[j+1] = spiralIn(raqtangles2[j],ratio2)
		changeSquer(raqtangles2[j+1],pathes2[j+1])
		raqtangles3[j+1] = spiralIn(raqtangles3[j],ratio3)
		changeSquer(raqtangles3[j+1],pathes3[j+1])
	}
}	

function spiralIn(arr,ratio){
	var newArray = [];
	for(var i = 0; i < 4; i++){
		newArray[i] = partition(arr[i],arr[i+1],ratio);
	}
	newArray[4] = newArray[0];
	return newArray;
}

function changeSquer(arr,path){
	for(var i = 0; i <4 ; i++){
		path.segments[i].point = arr[i];
	}
	path.segments[4].point = arr[0];
}

function drawSquer(arr,color){
	var path = new Path()
	path.strokeColor = picolor1(-1);
	path.strokeWidth = 0;
  path.fillColor = color;
	for(var i = 0; i <4; i++)
		path.add(arr[i]);
	path.add(arr[0]);
	return path;
}	

function partition(firstPoint,secondPoint,ratio) {
	return firstPoint + (secondPoint - firstPoint)*ratio
}