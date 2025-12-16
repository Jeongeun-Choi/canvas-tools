import { useSetAtom } from "jotai";
import { type MouseEvent, type PropsWithChildren } from "react";
import GNB from "../features/gnb/components/GNB";
import "./MainLayout.css";
import Panel from "../features/panel/components/Panel";
import { setSelectedPanelAtom } from "../atoms/panel/atom";

const componentList = [{ name: "Rect", type: "rect" }];

export default function MainLayout({ children }: PropsWithChildren) {
  const setSelectedPanel = useSetAtom(setSelectedPanelAtom);

  const handleClickButton = (event: MouseEvent<HTMLButtonElement>) => {
    setSelectedPanel(event.currentTarget.dataset.type || "");
  };

  return (
    <div>
      <GNB />
      <section style={{ height: "100vh" }}>
        {
          <Panel>
            {componentList.map((component) => (
              <li>
                <button data-type={component.type} onClick={handleClickButton}>
                  {component.name}
                </button>
              </li>
            ))}
          </Panel>
        }
        {children}
      </section>
    </div>
  );
}
