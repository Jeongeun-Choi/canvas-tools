import { screenToWorldWithPoint } from "../../../utils/transform";
import { zoomScaleAtom } from "../../../atoms/zoom/atom";
import { store } from "../../../main";

const panelWidth = 300;
const padding = 40;

interface Shape {
  type: "rect" | "circle" | string;
  id: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  draw: (ctx: CanvasRenderingContext2D | null) => void;
  redraw: (ctx: CanvasRenderingContext2D | null) => void;
}

class CustomCanvas {
  ctx: CanvasRenderingContext2D | null;
  viewportTransform: DOMMatrix = new DOMMatrix();
  scaleVal: number = 1;
  private _shapeList: Map<string, Shape> = new Map();

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d");
  }

  get customCanvas() {
    return this.ctx;
  }

  get zoomScale() {
    return this.scaleVal;
  }

  get shapeList() {
    return this._shapeList;
  }

  add(shape: Shape) {
    shape.draw(this.ctx);
    this._shapeList.set(shape.id, shape);
    this.redraw();
  }

  delete(shape: Shape) {
    this._shapeList.delete(shape.id);
    this.redraw();
  }

  clear() {
    this.ctx?.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  zoomIn(x?: number, y?: number) {
    const canvas = document.getElementById("canvas-tools");
    const cx = x || ((canvas?.clientWidth || 0) - panelWidth) / 2;
    const cy = y || (canvas?.clientHeight || 0) / 2;

    const pt = screenToWorldWithPoint(this.ctx, cx, cy);

    const prevScale = this.scaleVal;
    this.scaleVal += 0.1;

    const factor = this.scaleVal / prevScale;

    this.viewportTransform = this.viewportTransform
      .translate(pt.x, pt.y)
      .scale(factor)
      .translate(-pt.x, -pt.y);

    this.redraw();
  }

  zoomOut(x?: number, y?: number) {
    const canvas = document.getElementById("canvas-tools");
    const cx = x || (canvas?.clientWidth || 0 - panelWidth) / 2;
    const cy = y || (canvas?.clientHeight || 0) / 2;

    const pt = screenToWorldWithPoint(this.ctx, cx, cy);

    const prevScale = this.scaleVal;
    this.scaleVal -= 0.1;

    const factor = this.scaleVal / prevScale;

    this.viewportTransform = this.viewportTransform
      .translate(pt.x, pt.y)
      .scale(factor)
      .translate(-pt.x, -pt.y);

    this.redraw();
  }

  zoomToFit() {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    this.shapeList.forEach((shape) => {
      const tempMinX = shape.x;
      const tempMinY = shape.y;
      const tempMaxX = tempMinX + (shape.width || 0);
      const tempMaxY = tempMinY + (shape.height || 0);

      minX = Math.min(tempMinX, minX);
      minY = Math.min(tempMinY, minY);
      maxX = Math.max(tempMaxX, maxX);
      maxY = Math.max(tempMaxY, maxY);
    });

    const canvasWidth = (this.ctx?.canvas.width || 0) - panelWidth;
    const canvasHeight = this.ctx?.canvas.height || 0;
    const availableCanvasWidth = canvasWidth - padding * 2;
    const availableCanvasHeight = canvasHeight - padding * 2;

    const groupWidth = maxX - minX;
    const groupHeight = maxY - minY;
    const scaleX = availableCanvasWidth / groupWidth;
    const scaleY = availableCanvasHeight / groupHeight;
    const scale = Math.min(scaleX, scaleY);
    const offsetX = (canvasWidth - groupWidth * scale) / 2 - minX * scale;
    const offsetY = (canvasHeight - groupHeight * scale) / 2 - minY * scale;

    this.ctx?.setTransform(scale, 0, 0, scale, offsetX + 300, offsetY);

    this.viewportTransform = this.ctx?.getTransform() || new DOMMatrix();

    this.scaleVal = scale;
    this.clear();
    this._shapeList.forEach((shape) => {
      shape.redraw(this.ctx);
    });
  }

  zoomWheel = (event: WheelEvent) => {
    event.preventDefault();

    // 휠 방향에 따라 배율(factor) 결정
    const wheel = event.deltaY < 0 ? 1.1 : 0.9;

    // 마우스 위치 (캔버스 좌표)
    const rect = this.ctx?.canvas.getBoundingClientRect();
    const cx = event.clientX - (rect?.left || 0);
    const cy = event.clientY - (rect?.top || 0);

    const { x: wx, y: wy } = screenToWorldWithPoint(this.ctx, cx, cy);
    this.scaleVal *= wheel;

    const offsetX = cx - wx * this.scaleVal;
    const offsetY = cy - wy * this.scaleVal;

    store.set(zoomScaleAtom, this.scaleVal);

    this.ctx?.setTransform(
      this.scaleVal,
      0,
      0,
      this.scaleVal,
      offsetX,
      offsetY
    );

    this.viewportTransform = this.ctx?.getTransform() || new DOMMatrix();
    this.clear();
    this._shapeList.forEach((shape) => {
      shape.redraw(this.ctx);
    });
  };

  private redraw() {
    this.clear();
    this.ctx?.setTransform(this.viewportTransform);
    this._shapeList.forEach((shape) => {
      shape.redraw(this.ctx);
    });
  }
}

export default CustomCanvas;
