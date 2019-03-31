
function loadEom()  {
  const canvas = document.getElementById("eyeOfMetatron");
  const scope =  new paper.PaperScope();
  scope.setup(canvas);
  scope.project.currentStyle = {
		//fillColor: 'black',
		strokeColor: 'red',
		strokeWidth: 0.5
  }
  let sides = 7
  let amount = 100
  let speed = 1
  let time = 0
  const size = 100
  var center = new paper.Point(250, 250);
  var seed = new paper.Path.RegularPolygon(center, sides, size);
  seed.position = seed.segments[0].point;
  seed.strokeWidth = 0;
  
  var shapes = []
  for(let i = 0; i < amount ; i++) {
    shapes.push(seed.clone())
    shapes[shapes.length - 1].strokeWidth = 0.5
  }
  var realAngle = 0
  var lastRadius = document.getElementById("radius").value/50
  scope.view.onFrame = function(event) {
    let angle = document.getElementById("angle2").value
    speed = Math.pow((document.getElementById("speed").value-200)/20,3)
    let radius = document.getElementById("radius").value/50
    time += event.delta
    for(let i = 0; i < amount; i++) {
      if(shapes[i] === undefined)
        break;
      shapes[i].rotate((i+1)*(speed)*event.delta/100,center)
    }
  }
  document.getElementById("amount").onchange = makeEye
  document.getElementById("angle2").onchange = makeEye
  document.getElementById("radius").onchange = makeEye
  function makeEye()  {
    for(; shapes.length !== 0; shapes.pop().remove())
    {}
    amount = document.getElementById("amount").value
    for(let i = 0; i < amount ; i++) {
      shapes.push(seed.clone())
      shapes[i].rotate(document.getElementById("angle2").value)
      shapes[i].position = center.add(shapes[i].position.subtract(center).multiply(-1+document.getElementById("radius").value/50))
      shapes[shapes.length - 1].strokeWidth = 0.5
      shapes[i].rotate((i+1)*(speed)*time/100,center)
    }
  }
}
