import { useEffect, useRef, useState } from "react";
import MainLayout from "./layouts/MainLayout";
import CanvasView from "./features/canvas/components/CanvasView";
import CustomCanvas from "./features/canvas/models/CustomCanvas";
import { CustomCanvasContext } from "./features/canvas/contexts/context";
import { useAtomValue, useSetAtom } from "jotai";
import { resetSelectedPanelAtom, selectedPanelAtom } from "./atoms/panel/atom";
import Rect from "./features/canvas/models/Rect";

function App() {
  const [customCanvas, setCustomCanvas] = useState<CustomCanvas | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const selectedPanel = useAtomValue(selectedPanelAtom);
  const resetSelectedPanel = useSetAtom(resetSelectedPanelAtom);

  useEffect(() => {
    if (canvasRef.current) {
      setCustomCanvas(new CustomCanvas(canvasRef.current));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height);

      switch (selectedPanel) {
        case "rect":
          customCanvas?.add(
            new Rect({
              x,
              y,
              width: 40,
              height: 40,
              id: window.crypto.randomUUID(),
            })
          );
          break;

        default:
          break;
      }
      resetSelectedPanel();
    };

    canvas.addEventListener("click", handleClick);

    return () => canvas.removeEventListener("click", handleClick);
  }, [customCanvas, resetSelectedPanel, selectedPanel]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !customCanvas) return;

    canvas.addEventListener("wheel", customCanvas.zoomWheel);

    return () => canvas.removeEventListener("wheel", customCanvas.zoomWheel);
  }, [customCanvas]);

  return (
    <CustomCanvasContext.Provider value={{ customCanvas }}>
      <MainLayout>
        <CanvasView ref={canvasRef} />
      </MainLayout>
    </CustomCanvasContext.Provider>
  );
}

export default App;
