import world from '../lib/world';
import CellMatrix from '../lib/cell-matrix';

export default function sketch(p) {
  const cellSize = 30;
  const cols = Math.floor(world.w / cellSize);
  const rows = Math.floor(world.h / cellSize);
  let cellMatrix = new CellMatrix(cols, rows, cellSize);
  
  p.setup = () => {
    p.size(world.w, world.h, p.OPENGL);
    p.smooth();
    p.frameRate(24);
  };
  
  p.draw = () => {
    p.background(255);

    cellMatrix.nextTick();
    cellMatrix.draw(p);
  };
}
