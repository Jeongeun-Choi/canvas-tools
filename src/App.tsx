import { useEffect, useRef, useState } from "react";
import { CustomCanvasContext } from "./components/custom-canvas/context";
import MainLayout from "./layouts/MainLayout";
import Main from "./pages/Main";
import CustomCanvas from "./components/custom-canvas/CustomCanvas";

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
        <Main ref={canvasRef} />
      </MainLayout>
    </CustomCanvasContext.Provider>
  );
}

export default App;
