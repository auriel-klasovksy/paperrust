var options = {
  scale: 200,
  numOfSqars: 1000  ,
  speed: 3,
  seperation: 4/5,
  brightness: 1.4,
  minBrightness: 2,
  puls: 1/2,
  sides: 5,
  smoothnes: 2,
  color: 'black',
  buffer: 1/6,
  width:1,
}
function loadSs() {

  console.log("loading")

  const canvas = document.getElementById('ss')
  const scope = new paper.PaperScope()
  scope.setup(canvas)
  paper = scope
  


  var start = new paper.Point(300,300)
  var poligonTemplate = new paper.Path.RegularPolygon(start, options.sides, options.scale)
  //?
  poligonTemplate.strokeColor = options.color;
  poligonTemplate.strokeWidth = 1;
  //!
  const sin = regulate(Math.sin,options.buffer)
  const cos = regulate(Math.cos,options.buffer)
  
  var poligon = []
  iter = makeIterator(poligonTemplate.segments)
  for(var i = 0; i < options.sides; i++)  {
    poligon[i] = iter.next().value.point
  }

  console.log("generating shapes")
  drawSquer(poligon)

  poligon[options.sides] = poligon[0]
  var shapes1 = []
  var pathes1 = []
  var shapes2 = []
  var pathes2 = []
  makeRaq(poligonTemplate,shapes1,pathes1)
  makeRaq(poligonTemplate,shapes2,pathes2)
  console.log("defining onframe")
  paper.view.onFrame = function(event)  {
    console.log("frame")
    let curBrightness = options.minBrightness + 
      options.brightness * 
      (1+Math.cos(event.time*options.speed*options.puls))
    let ratio1 = -(-1 + cos(event.time*options.speed + Math.PI/2))/2
    let ratio2 = (1 + sin(Math.PI + event.time*options.speed))/2
    //console.log("entering list")
    for(let i = 0; i < options.numOfSqars - 1; i++) {
      shapes1[i+1] = spiralIn(shapes1[i],ratio1)
      shapes2[i+1] = spiralIn(shapes2[i],ratio2)
      changeSquer(shapes1[i+1],pathes1[i+1],
        distributer(progres(i,options.numOfSqars))*
        Math.sin(event.time * options.speed / options.seperation) *
        curBrightness)
      changeSquer(shapes2[i+1],pathes2[i+1],
        distributer(progres(i,options.numOfSqars))*
        Math.sin(event.time * options.speed / options.seperation) *
        curBrightness)
    }
  }
}

function regulate(func,buff){
    return function(t){
        return (func(t)*(1-buff))
    }
}

function distributer(ratio,min,max){
    if(min !== undefined && max !== undefined)
        return Math.sin(Math.PI*ratio)*(max-min) + min;
    else return Math.sin(Math.PI*ratio)/(options.smoothnes*(1.5-ratio))
}
function progres(index,max){
    return (max-index)/max;
}

function spiralIn(arr,ratio){
	var newArray = [];
	for(var i = 0; i < options.sides ; i++){
    //console.log("spiral",arr,i,arr[i])
		newArray[i] = arr[i]//partition(arr[i],arr[i+1],ratio);
	}
	newArray[options.sides] = newArray[0];
	return newArray;
}

function changeSquer(arr,path,width){
  //console.log(arr,path,width)
	for(var i = 0; i < options.sides ; i++){
		path.segments[i].point = arr[i]
	}
	path.segments[options.sides].point = arr[0]
	if(options.width !== undefined)
	    path.strokeWidth = options.width;
}
				    
function drawSquer(arr,width){
	var path = new paper.Path();
	path.strokeColor = options.color;
	path.strokeWidth = 1;
	if(options.width !== undefined)
	    path.strokeWidth = options.width;
	for(var i = 0; i <options.sides; i++)
		path.add(arr[i]);
	path.add(arr[0]);
	return path;
}	

function partition(firstPoint,secondPoint,ratio) {
	return firstPoint.add(secondPoint.subtract(firstPoint).multiply(ratio))
}
//from developer.mozilla.org dont know if open...
function makeIterator(array) {
    var nextIndex = 0;
    
    return {
       next: function() {
           return nextIndex < array.length ?
               {value: array[nextIndex++], done: false} :
               {done: true};
       }
    };
}



function makeRaq(seed, raq, path){  
    path[0] = seed
    raq[0] = seed

    for(var j = 0; j < options.numOfSqars-1; j++){
    	raq[j+1] = spiralIn(raq[j],1/2);
    	path[j+1] = drawSquer(raq[j+1], (j*2)/options.numOfSqars);
    }
}