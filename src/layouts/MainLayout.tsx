import { useContext, useState, type PropsWithChildren } from "react";
import GNB from "../components/gnb/GNB";
import Panel from "../components/panel/Panel";
import "./MainLayout.css";
import Rect from "../components/rect/Rect";
import { CustomCanvasContext } from "../components/custom-canvas/context";

const componentList = [{ name: "CSR" }, { name: "AHB" }, { name: "AXI" }];
export default function MainLayout({ children }: PropsWithChildren) {
  const [foldingLeftPanel, setFoldingLeftPanel] = useState(false);
  const { customCanvas } = useContext(CustomCanvasContext);

  const handleFoldingPanel = () => {
    setFoldingLeftPanel((prev) => !prev);
  };

  const handleCreateRect = () => {
    const x = Math.random() * 100 + 300;
    const y = Math.random() * 100 + 48;
    const rect = new Rect({
      x: x,
      y: y,
      width: 200,
      height: 200,
      id: window.crypto.randomUUID(),
    });

    customCanvas?.add(rect);
  };

  return (
    <div>
      <GNB />
      <section style={{ height: "100vh" }}>
        {!foldingLeftPanel && (
          <Panel>
            {componentList.map((component) => (
              <li>
                <button onClick={handleCreateRect}>{component.name}</button>
              </li>
            ))}
          </Panel>
        )}
        <button
          id="folding-left-btn"
          onClick={handleFoldingPanel}
          className={"folding-left-btn ".concat(
            foldingLeftPanel ? "folding" : ""
          )}
        >
          {foldingLeftPanel ? "열어" : "접어"}
        </button>
        {children}
        <div>오른쪽 패널</div>
      </section>
    </div>
  );
}
