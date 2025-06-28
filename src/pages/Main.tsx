import { useEffect, useRef, useState } from "react";

export default function Main() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // TODO: resize할때 canvas사이즈 조절되게 하기
  return (
    <canvas
      id="canvas-tools"
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight - 48}
    ></canvas>
  );
}
