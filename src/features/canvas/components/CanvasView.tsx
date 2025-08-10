import { forwardRef } from "react";

export default forwardRef<HTMLCanvasElement>(function Main(_, ref) {
  return (
    <canvas
      id="canvas-tools"
      ref={ref}
      width={window.innerWidth}
      height={window.innerHeight - 48}
    ></canvas>
  );
});
