function customNoise(p, value) {
  let count = value % 12;
  return p.pow(p.sin(value), count);
};

function createPoints(p, centerX, centerY, baseRadius) {
  let points = [];

  let noiseSeed = p.random(10);
  
  for (let angle = 0; angle <= 360; angle += 1) {
    noiseSeed += 0.1;

    let radVariance = 30 * customNoise(p, noiseSeed);
    let r = baseRadius + radVariance;
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
    p.beginShape();
    let length = points.length;
    for (let i = 0; i < length; i++) {
      let point = points[i];
      p.curveVertex(point.x, point.y);
    }
    p.endShape();
  };

  p.draw = () => {
    p.background(255);

    if (progress >= 1) {
      points     = nextPoints;
      nextPoints = createPoints(p, cx, cy, radius);
      progress = 0;
    }

    p.beginShape();
    let length = points.length;
    for (let i = 1; i < length; i++) {
      let point     = points[i];
      let nextPoint = nextPoints[i];
      
      let x = point.x + ((nextPoint.x - point.x) * progress);
      let y = point.y + ((nextPoint.y - point.y) * progress);
      p.curveVertex(x, y);
    }
    p.endShape();

    progress = p.min(1, progress + 0.05);
  };
}

