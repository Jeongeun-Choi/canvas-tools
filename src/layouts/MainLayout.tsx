import { useState, type PropsWithChildren } from "react";
import GNB from "../components/gnb/GNB";
import Panel from "../components/panel/Panel";
import "./MainLayout.css";

const componentList = [{ name: "CSR" }, { name: "AHB" }, { name: "AXI" }];
export default function MainLayout({ children }: PropsWithChildren) {
  const [foldingLeftPanel, setFoldingLeftPanel] = useState(false);

  const handleFoldingPanel = () => {
    setFoldingLeftPanel((prev) => !prev);
  };
  return (
    <div>
      <GNB />
      <section style={{ height: "100vh" }}>
        {!foldingLeftPanel && (
          <Panel>
            {componentList.map((component) => (
              <li>
                <button>{component.name}</button>
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
