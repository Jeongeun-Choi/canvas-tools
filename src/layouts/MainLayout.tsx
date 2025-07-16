import { useSetAtom } from "jotai";
import {
  useContext,
  useState,
  type MouseEvent,
  type PropsWithChildren,
} from "react";
import GNB from "../features/gnb/components/GNB";
import "./MainLayout.css";
import Panel from "../features/panel/components/Panel";
import { setSelectedPanelAtom } from "../atoms/panel/atom";
import { CustomCanvasContext } from "../features/canvas/contexts/context";

const componentList = [
  { name: "Rect", type: "rect" },
  { name: "Circle", type: "circle" },
];

export default function MainLayout({ children }: PropsWithChildren) {
  const [foldingLeftPanel, setFoldingLeftPanel] = useState(false);
  const setSelectedPanel = useSetAtom(setSelectedPanelAtom);
  const { customCanvas } = useContext(CustomCanvasContext);

  const handleFoldingPanel = () => {
    setFoldingLeftPanel((prev) => !prev);
  };

  const handleClickButton = (event: MouseEvent<HTMLButtonElement>) => {
    setSelectedPanel(event.currentTarget.dataset.type || "");
  };

  return (
    <div>
      <GNB />
      <section style={{ height: "100vh" }}>
        {!foldingLeftPanel && (
          <Panel>
            {componentList.map((component) => (
              <li>
                <button data-type={component.type} onClick={handleClickButton}>
                  {component.name}
                </button>
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
        <section style={{ position: "absolute", top: 0 }}>
          <button
            onClick={() => {
              customCanvas?.zoomIn();
            }}
          >
            +
          </button>
          <button
            onClick={() => {
              customCanvas?.zoomOut();
            }}
          >
            -
          </button>
        </section>
      </section>
    </div>
  );
}
