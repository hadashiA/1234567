import Cell from './cell';

export default class CellMatrix {
  constructor(cols, rows, cellSize) {
    let cells = [];
    for (let row = 0; row < rows; row++) {
      cells[row] = [];

      for (let col = 0; col < cols; col++) {
        cells[row][col] = new Cell;
      }
    }
    this.cols  = cols;
    this.rows  = rows;
    this.cells = cells;
    this.cellSize = cellSize;

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        let above = (row <= 0) ? this.rows - 1 : row - 1;
        let below = (row >= this.rows - 1) ? 0 : row + 1;
        let left  = (col <= 0) ? this.cols - 1 : col - 1;
        let right = (col >= this.cols - 1) ? 0 : col + 1;

        let cell = this.at(col, row);
        cell.neighbours = [
          this.at(left,  above),
          this.at(left,  row),
          this.at(left,  below),
          this.at(col,   below),
          this.at(right, below),
          this.at(right, row),
          this.at(right, above),
          this.at(col,   above),
        ];
      }
    }
  }

  at(col, row) {
    return this.cells[row][col];
  }

  nextTick() {
    for (let rows of this.cells) {
      for (let cell of rows) {
        cell.nextTick();
      }
    }
  }

  draw(p) {
    p.stroke(0);
    let length = this.cellSize;

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        let cell = this.cells[row][col];
        if (cell.on) {
          p.fill(0);
        } else {
          p.fill(255);
        }
        let x = col * length;
        let y = row * length;
        // p.ellipse(x, y, length, length);
        p.textSize(length);

        switch ((col + row) % 4) {
        case 0:
          p.text('よ', x, y);
          break;
        case 1:
          p.text('さ', x, y);
          break;
        case 2:
          p.text('そ', x, y);
          break;
        case 3:
          p.text('う', x, y);
          break;
        }
      }
    }
  }
};
