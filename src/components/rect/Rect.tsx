interface IRect {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type?: string;
  originX?: "left" | "right" | "center";
  originY?: "top" | "bottom" | "center";
}

class Rect {
  // canvas: HTMLCanvasElement;
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  constructor({
    id,
    x,
    y,
    width,
    height,
    type,
    originX = "left",
    originY = "top",
  }: IRect) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.type = type ?? "rect";
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    ctx?.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Rect;
