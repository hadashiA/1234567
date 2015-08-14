function customRandom(p) {
  return 1 - p.pow(p.random(1), 2);
};

function createPoints(p, centerX, centerY, baseRadius) {
  let radiusNoise = p.random(10);
  let points = [];
  
  // for (let angle = 0; angle <= 14400; angle += 5) {
  for (let angle = 0; angle <= 2880; angle += 5) {
    // radiusNoise += 0.05;
    let r = baseRadius + (p.noise(radiusNoise + angle) * 200) - 100;
    
    let rad = p.radians(angle);
    let x = centerX + p.cos(rad) * r;
    let y = centerY + p.sin(rad) * r;
    points.push({ x: x, y: y});
  }
  return points;
}

export default function sketch(p) {
  window.p = p;
  
  let w = 500;
  let h = 500;
  let diam = 10;
  let cx = w * 0.5;
  let cy = h * 0.5;

  let radius = 100;

  let points     = createPoints(p, cx, cy, radius);
  let nextPoints = createPoints(p, cx, cy, radius);

  let progress = 0;

  p.setup = () => {
    p.frameRate(24);
    p.size(w, h);
    p.smooth();
    p.background(255);

    p.stroke(0, 30);
    p.strokeWeight(0.5);
    p.noFill();
    p.ellipse(cx, cy, radius * 2, radius * 2);

    p.stroke(20, 50, 70);

    // let r2 = 10;
    let points = createPoints(p, cx, cy, radius);
    let length = points.length;
    for (let i = 1; i < length; i++) {
      let p1 = points[i - 1];
      let p2 = points[i];
      p.line(p1.x, p1.y, p2.x, p2.y);
    }
  };

  p.draw = () => {
    p.background(255);

    if (progress >= 1) {
      points     = nextPoints;
      nextPoints = createPoints(p, cx, cy, radius);
      progress = 0;
    }

    let length = points.length;
    for (let i = 1; i < length; i++) {
      let p1 = points[i - 1];
      let p2 = points[i];

      let np1 = nextPoints[i - 1];
      let np2 = nextPoints[i];
      
      let x1 = p1.x + ((np1.x - p1.x)  * (progress));
      let y1 = p1.y + ((np1.y - p1.y) * (progress));
      let x2 = p2.x + ((np2.x - p2.x)  * (progress));
      let y2 = p2.y + ((np2.y - p2.y) * (progress));
     
      p.line(x1, y1, x2, y2);
    }

    progress = p.min(1, progress + 0.05);
  };
}
