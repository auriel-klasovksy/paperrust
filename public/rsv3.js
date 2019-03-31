
var opt = {
  size:     500,
  angle:    0,
  background_color: "#ddf9c1",
  pathes1:  [],
  pathes2:  [],
  numOfShapes:  10,
  numOfSides:   4,
  colors1:  [],
  colors2:  []
}
function loadRsv() {
  //for bat-ala
  //the shamanic spiral woman.
  const canvas = document.getElementById('rsv');
  const scope = new paper.PaperScope();
  scope.setup(canvas);
  paper = scope;
  //var socket = io();
  var draws = makeSqueres(1)
  opt.pathes1= draws.array1;
  opt.pathes2 = draws.array2;
	drawInterArrays(opt.pathes1,opt.pathes2);
  var frames = 200;
  scope.view.onFrame = function(event){
	  var newangel = document.getElementById("angle").value/4 - opt.angle;
	  opt.pathes1[0].rotate(newangel);
	  opt.pathes2[0].rotate(newangel);
	  opt.angle = document.getElementById("angle").value/4; 
    updateShape(opt.pathes1,foo1(event.time));
    updateShape(opt.pathes2,foo(event.time));
  /*
  if(frames-- > 0)  socket.emit('record',canvas.toDataURL('image/jpeg'))
  if(frames == 1) {
    socket.emit('parse','now');
    console.log("emit parse")
  }*/	
	   var colorControles1 = document.getElementsByClassName("color1");
     var colorControles2 = document.getElementsByClassName("color2");
	   for(let i = 0; i < colorControles1.length; i++) {
		     colorControles1[i].onchange = () => {
		         drawInterArrays(opt.pathes1,opt.pathes2);
	          };
       }
       for(let i = 0; i < colorControles2.length; i++) {
  		     colorControles2[i].onchange = () => {
  		         drawInterArrays(opt.pathes1,opt.pathes2);
  	          };
         }
       document.getElementById('sides').onchange = () => {
         opt.numOfSides = document.getElementById('sides').value;
         setUp();
       }
       document.getElementById('depth').onchange = () => {
         opt.numOfShapes = document.getElementById('depth').value;
         setUp();
       }
       document.getElementById('newcolor1').onclick = () =>  {
         var newNode = $("#newcolor1").prev().clone(true);
         newNode.children("input").val(opt.background_color);
         $("#newcolor1").prev().after(newNode);
         setUp();
       }
       document.getElementById('newcolor2').onclick = () =>  {
         var newNode = $("#newcolor2").prev().clone(true);
         newNode.children("input").val(opt.background_color);
         $("#newcolor2").prev().after(newNode);
         setUp();
       }
       document.getElementById('lesscolor1').onclick = () => {
         if($('#lesscolor1').parent().children().length > 3)  {
           $('#lesscolor1').next().remove();
           setUp();
         }
       }
       document.getElementById('lesscolor2').onclick = () => {
         if($('#lesscolor2').parent().children().length > 3)  {
           $('#lesscolor2').next().remove();
           setUp();
         }
       }
	}
}
function setUp()  {
  var draws = makeSqueres(1);
  for(let i = 0; i < opt.pathes1.length; i++) {
    opt.pathes1[i].remove();
    opt.pathes2[i].remove();
  }
  opt.pathes1 = draws.array1;
  opt.pathes2 = draws.array2;
  drawInterArrays(opt.pathes1,opt.pathes2);
} 
function updateShape(shapes,ratio) {
  for(let i = 1; i < shapes.length; i++)  {
    var newPath = spiralIn(shapes[i-1],ratio);
    changeSquer(shapes[i],newPath);
  }
}

function makeSqueres(ratio) {
  var path = new paper.Path.RegularPolygon(new paper.Point(200,200),opt.numOfSides,200)//makeSeed(new paper.Point(100,100),size);
  //drawSquer(path, picolor(1,1));
  var res = {array1: [], array2: []};
  res.array1[0] = path;
  res.array2[0] = path;
  let lel = -1;
  for(let i = 1; i < opt.numOfShapes; i++){
    res.array1[i] = spiralIn(res.array1[i-1],ratio);
    res.array2[i] = spiralIn(res.array2[i-1],ratio);
    lel *= -1;  
  }
  return res
}
function drawInterArrays(back,front)	{
	readColors();
	for(let i = 1; i < opt.numOfShapes; i++)	{
		drawSquer(back[i],opt.colors1[i%opt.colors1.length]);
		drawSquer(front[i],opt.colors2[i%opt.colors2.length]);
	}
}
function foo1(t)  {
  return -(-1 + Math.cos(t/3 + Math.PI/2)/3)/2;
}
function foo(t)  {
  return (1 + Math.sin(Math.PI + t/3)/3)/2;
}
function makeSeed(start,size) {
  var seed = new paper.Path()
  var x = new paper.Point(1,0)
  var y = new paper.Point(0,1)
  seed.add(start);
  seed.add(start.add(x.multiply(size)))
  seed.add(start.add(x.multiply(size).add(y.multiply(size))))
  seed.add(start.add(y.multiply(size)))
  seed.add(start)
  seed.rotate(45);
  return seed;
}

function spiralIn(path,ratio){
	var newPath = new paper.Path();
	for(let i = 0; i < path.segments.length; i++){
		newPath.add(partition(path.segments[i].point, path.segments[(i+1)%(path.segments.length)].point,ratio));
	}
	return newPath;
}

function partition(point1,  point2, ratio)  {
  var newPoint = point1.multiply(ratio).add(point2.multiply(1-ratio));
  return newPoint;
}

function drawSquer(path,color){
	path.strokeColor = color;
	path.strokeWidth = 0;
  path.fillColor = color;
}	
function readColors()	{
  var firstColors = document.getElementsByClassName('color1');
  var secondColors = document.getElementsByClassName('color2');
  for(let i = firstColors.length; i < opt.colors1.length;opt.colors1.pop())  
  {}
  for(let i = secondColors.length; i < opt.colors2.length; opt.colors2.pop()) 
  {}
  for(let i = 0; i < firstColors.length; i++) {
    opt.colors1[i] = firstColors[i].value;
  }
  for(let i = 0; i < secondColors.length; i++)  {
    opt.colors2[i] = secondColors[i].value;
  }
}

/*
'#ddf9c1'
'#f9a03f'   
'#f8dda4'
'#813405'  
*/

function changeSquer(too,from){
	for(var i = 0; i < from.segments.length ; i++){
		too.segments[i].point = from.segments[i].point;
	}
	//too.segments[4].point = from.segments[0].point;
}
