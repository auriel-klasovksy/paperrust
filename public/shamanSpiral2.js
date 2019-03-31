//For bat-ela
//the shamanic spiral woman.



var scale = 600;
var golden = 1.61803398875	
var ratio = 0.24178656321
var numOfSqars = 1000;
var speed = 3;
var seperation = 4/5;
var brightness = 1.4;
var minBrightness = 2
var puls = 1/2
var sides = 5;
var smoothnes = 2;
var color = 'FFC18D';

var buffer = 1/6
var start = new Point(300,300)
var polygon = new Path.RegularPolygon(start, sides, scale);

function regulate(func,buff){
    return function(t){
        return (func(t)*(1-buffer))
    }
}

var sin = regulate(Math.sin,buffer);
var cos = regulate(Math.cos,buffer);
function onFrame(event){
    
  var curBrigtness = minBrightness+ brightness*(1 + Math.cos(event.time*speed*puls))
	
	//var ratio1 = (-1 + Math.sin(event.time/4))/2;
	var ratio3 = -(-1 + cos(event.time*speed + Math.PI/2))/2;
	var ratio2 = (1 + sin(Math.PI + event.time*speed))/2
//	raqtangles1[0] = raq;

	for(var j = 0; j < numOfSqars; j++){
		//raqtangles1[j+1] = spiralIn(raqtangles1[j],ratio1)
		//changeSquer(raqtangles1[j+1],pathes1[j+1])
		raqtangles2[j+1] = spiralIn(raqtangles2[j],ratio2)
		changeSquer(
		    raqtangles2[j+1],   pathes2[j+1], 
		    distributer(progres(j,numOfSqars)) * 
		    Math.sin(event.time*speed/seperation) *
		    curBrigtness);
		    
		raqtangles3[j+1] = spiralIn(raqtangles3[j],ratio3)
		changeSquer(
		    raqtangles3[j+1],   pathes3[j+1],
		    distributer(progres(j,numOfSqars)) *
		    curBrigtness);
	}
//	numOfSqars++;
}	

function distributer(ratio,min,max){
    if(min !== undefined && max !== undefined)
        return Math.sin(Math.PI*ratio)*(max-min) + min;
    else return Math.sin(Math.PI*ratio)/(smoothnes*(1.5-ratio))
}
function progres(index,max){
    return (max-index)/max;
}


var background = new Shape.Rectangle({
    rectangle: view.bounds,
});



var raq = [];
var iter = makeIterator(polygon.segments)
for(var i = 0; i < sides; i++)
    raq[i] = iter.next().value.point

raq[sides] = raq[0]
drawSquer(raq)
/*var raqtangles1 = [];
var pathes1 = []
makeReq(raq,raqtangles1,pathes1);*/
var raqtangles2 = [];
var pathes2 = [];
makeReq(raq,raqtangles2, pathes2);
var raqtangles3 = [];
var pathes3 = [];
makeReq(raq,raqtangles3, pathes3);



function makeReq(seed, raq, path){
    path[0] = seed;
    raq[0] = seed;
    for(var j = 0; j < numOfSqars; j++){
    	raq[j+1] = spiralIn(raq[j],ratio);
    	path[j+1] = drawSquer(raq[j+1], (j*2)/numOfSqars);
    }
}


function spiralIn(arr,ratio){
	var newArray = [];
	for(var i = 0; i < sides; i++){

		newArray[i] = partition(arr[i],arr[i+1],ratio);
	}
	newArray[sides] = newArray[0];
	return newArray;
}

function changeSquer(arr,path,width){
	for(var i = 0; i <sides ; i++){
		path.segments[i].point = arr[i];
	}
	path.segments[sides].point = arr[0];
	if(width !== undefined)
	    path.strokeWidth = width;
}
				  
function drawSquer(arr,width){
	var path = new Path()
	path.strokeColor = color;
	path.strokeWidth = 0;
	if(width !== undefined)
	    path.strokeWidth = width;
	for(var i = 0; i <sides; i++)
		path.add(arr[i]);
	path.add(arr[0]);
	return path;
}	

function partition(firstPoint,secondPoint,ratio) {
	return firstPoint + (secondPoint - firstPoint)*ratio
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
//from paperRust