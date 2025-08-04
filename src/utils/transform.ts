export const screenToWorldWithPoint = (
  ctx: CanvasRenderingContext2D | null,
  x: number,
  y: number
) => {
  const inverseMatrix = ctx?.getTransform().inverse();

  const pt = new DOMPoint(x, y).matrixTransform(inverseMatrix);
  return { x: pt.x, y: pt.y };
};
