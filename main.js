console.log('Hello World!');
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let w = c.width
let h = c.height

let sun = {
  center: {
    x: w/2,
    y: h/2 + 40
  },
  progress: 0,
  radius: 40,
  
  draw: function(ctx) {
     ctx.beginPath()
     ctx.fillStyle = "#FDBF15"
     ctx.strokeStyle = "white"
     ctx.strokeWidth = 4
     ctx.arc(this.center.x, this.center.y - this.progress, this.radius, 0, 2 * Math.PI)
     ctx.stroke()
     ctx.fill()
  },
  animate: function(time) {
    this.progress = time / 1000 * 43
  },
  curPos: function(){
    return {
      x: this.center.x,
      y: this.center.y - this.progress
    }
  }
}
let light = {
  progress: 0,
  animate : function(time) {
    this.progress = time * 0.05
  }
}
let start
function animate(timestamp) {
  ctx.clearRect(0, 0, w, h)
  if(start === undefined) {
    start = timestamp
  }
  const elapsed = timestamp - start
  if(elapsed < 1000) {
    sun.animate(elapsed)
  }
  sun.draw(ctx)
 
  if(elapsed > 1000) {
    light.animate(elapsed)
    drawLights(ctx, sun, light)
  }
  
  drawWave(ctx, w, h)
  if(elapsed < 1800) {
   window.requestAnimationFrame(animate)
  }
}
requestAnimationFrame(animate)

function drawLights(ctx, sun, light) {
  let lightColor = "#FDBF15"
  let lightWidth = 3
  let c = sun.curPos()
  let step = 15
  let i = 0
  while(step * i <= 180) {
    let angle = i * step
    let len = sun.radius + light.progress
    if(i % 2 == 0){
      len = len * 3 / 2
    }
    let start = {
      x: c.x - Math.cos(angle / 180 * Math.PI) * sun.radius,
      y: c.y - Math.sin(angle / 180 * Math.PI) * sun.radius
    }
    let end = {
      x: c.x - Math.cos(angle / 180 * Math.PI) * len,
      y: c.y - Math.sin(angle / 180 * Math.PI) * len
    }
    drawLine(ctx, start, end, lightColor, lightWidth)
    i++
  }
}

function drawWave(ctx, w, h) {
  let waveColor = "#82CDEE"
  let waveWidth = 2
  let waveW = 250
  let waveGap = 8
  let wH = 3
  let waveT = h/2
  
  ctx.beginPath()
  ctx.fillStyle = "white"
  ctx.fillRect(0, h/2, w, h)
 
  for(let i = 0; i < 6; i++) {
    let waveStart = {
      x: w/2 - waveW/2,
      y: waveT
    }
    let waveEnd = {
      x: w/2 + waveW/2,
      y: waveT
    }
    drawLine(ctx, waveStart, waveEnd, waveColor, waveWidth)
    waveT += waveGap
    waveW -= 45
  }
}

function drawLine(ctx, start, end, color, width){
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.stroke()
}
