import type { PropsWithChildren } from "react";
import "./Panel.css";

export default function Panel({ children }: PropsWithChildren) {
  return (
    <aside>
      <header>
        <h3>node list</h3>
      </header>
      <ul>{children}</ul>
    </aside>
  );
}
