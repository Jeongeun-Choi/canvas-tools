import { useSetAtom } from "jotai";
import { useState, type MouseEvent, type PropsWithChildren } from "react";
import GNB from "../features/gnb/components/GNB";
import "./MainLayout.css";
import Panel from "../features/panel/components/Panel";
import { setSelectedPanelAtom } from "../atoms/panel/atom";

const componentList = [
  { name: "Rect", type: "rect" },
  { name: "Circle", type: "circle" },
];

export default function MainLayout({ children }: PropsWithChildren) {
  const [foldingLeftPanel, setFoldingLeftPanel] = useState(false);
  const setSelectedPanel = useSetAtom(setSelectedPanelAtom);

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
        <div>오른쪽 패널</div>
      </section>
    </div>
  );
}
