import { useState, forwardRef } from "react";

export default forwardRef<HTMLCanvasElement>(function Main(_, ref) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  // TODO: resize할때 canvas사이즈 조절되게 하기
  return (
    <canvas
      id="canvas-tools"
      ref={ref}
      width={window.innerWidth}
      height={window.innerHeight - 48}
    ></canvas>
  );
});
