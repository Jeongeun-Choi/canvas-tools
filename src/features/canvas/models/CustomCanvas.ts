interface Shape {
  type: "rect" | "circle" | string;
  id: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  draw: (ctx: CanvasRenderingContext2D | null) => void;
}

class CustomCanvas {
  ctx: CanvasRenderingContext2D | null;
  shapeList: Map<string, Shape> = new Map();
  viewportTransform: DOMMatrix = new DOMMatrix();
  scaleVal: number = 1;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d");
  }

  get customCanvas() {
    return this.ctx;
  }

  get zoomScale() {
    return this.scaleVal;
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

  zoomIn(x?: number, y?: number) {
    const canvas = document.getElementById("canvas-tools");
    const cx = x || (canvas?.clientWidth || 0) / 2;
    const cy = y || (canvas?.clientHeight || 0) / 2;

    this.scaleVal += 0.1;
    this.viewportTransform = new DOMMatrix()
      .translate(cx, cy)
      .scale(this.scaleVal)
      .translate(-cx, -cy);

    this.redraw();
  }

  zoomOut(x?: number, y?: number) {
    const canvas = document.getElementById("canvas-tools");
    const cx = x || (canvas?.clientWidth || 0) / 2;
    const cy = y || (canvas?.clientHeight || 0) / 2;

    this.scaleVal -= 0.1;
    this.viewportTransform = new DOMMatrix()
      .translate(cx, cy)
      .scale(this.scaleVal)
      .translate(-cx, -cy);

    this.redraw();
  }

  private redraw() {
    this.clear();
    this.ctx?.setTransform(this.viewportTransform);
    this.shapeList.forEach((shape) => {
      shape.draw(this.ctx);
    });
  }
}

export default CustomCanvas;
