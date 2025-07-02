import { useEffect, useRef, useState } from "react";
import MainLayout from "./layouts/MainLayout";
import CanvasView from "./features/canvas/components/CanvasView";
import CustomCanvas from "./features/canvas/models/CustomCanvas";
import { CustomCanvasContext } from "./features/canvas/contexts/context";

function App() {
  const [customCanvas, setCustomCanvas] = useState<CustomCanvas | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      console.log(new CustomCanvas(canvasRef.current));
      setCustomCanvas(new CustomCanvas(canvasRef.current));
    }
  }, []);

  return (
    <CustomCanvasContext.Provider value={{ customCanvas }}>
      <MainLayout>
        <CanvasView ref={canvasRef} />
      </MainLayout>
    </CustomCanvasContext.Provider>
  );
}

export default App;
