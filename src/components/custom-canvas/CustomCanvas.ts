interface Shape {
  type: "rect" | "circle" | string;
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  draw: (ctx: CanvasRenderingContext2D | null) => void;
}

class CustomCanvas {
  ctx: CanvasRenderingContext2D | null;
  shapeList: Map<string, Shape> = new Map();

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d");
  }

  get customCanvas() {
    return this.ctx;
  }

  add(shape: Shape) {
    this.shapeList.set(shape.id, shape);
    this.redraw();
  }

  delete(shape: Shape) {
    this.shapeList.delete(shape.id);
    this.redraw();
  }

  clear() {
    this.ctx?.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  private redraw() {
    this.clear();
    this.shapeList.forEach((shape) => {
      shape.draw(this.ctx);
    });
  }
}

export default CustomCanvas;
