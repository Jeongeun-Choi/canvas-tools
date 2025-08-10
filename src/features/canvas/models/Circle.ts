import { screenToWorldWithPoint } from "../../../utils/transform";

interface CircleProps {
  id: string;
  x: number;
  y: number;
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

  constructor({ id, x, y, type, radius, fill, stroke }: CircleProps) {
    this.id = id;
    this.x = x + (radius || 50);
    this.y = y + (radius || 50);
    this.width = (radius || 50) * 2;
    this.height = (radius || 50) * 2;
    this.radius = radius || 50;
    this.type = type || "circle";
    this.fill = fill || "#000000";
    this.stroke = stroke || "#000000";
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      const { x, y } = screenToWorldWithPoint(ctx, this.x, this.y);
      this.x = x;
      this.y = y;
      ctx.beginPath();
      ctx.fillStyle = this.fill;
      ctx.arc(x, y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }
  }

  redraw(ctx: CanvasRenderingContext2D | null) {
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
