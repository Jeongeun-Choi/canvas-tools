interface CircleProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
  fill?: string;
  stroke?: string;
  type?: string;
  originX?: "left" | "right" | "center";
  originY?: "top" | "bottom" | "center";
}

class Circle {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  radius: number;
  fill: string;
  stroke: string;

  constructor({
    id,
    x,
    y,
    width,
    height,
    type,
    radius,
    fill,
    stroke,
    originX = "left",
    originY = "top",
  }: CircleProps) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.radius = radius || 50;
    this.type = type || "circle";
    this.width = width;
    this.height = height;
    this.fill = fill || "#000000";
    this.stroke = stroke || "#000000";
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      ctx.beginPath();
      ctx.fillStyle = this.fill;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }
}

export default Circle;
