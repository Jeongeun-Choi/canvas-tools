import { useContext } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import "../styles/GNB.css";
import { CustomCanvasContext } from "../../canvas/contexts/context";
import { setZoomScaleAtom, zoomScaleAtom } from "../../../atoms/zoom/atom";

export default function GNB() {
  const { customCanvas } = useContext(CustomCanvasContext);

  const zoomScale = useAtomValue(zoomScaleAtom);
  const setZoomScale = useSetAtom(setZoomScaleAtom);

  return (
    <div id="GNB">
      <section className="zoom">
        <p>
          <span>zoom: </span>
          <span>{Math.trunc(zoomScale * 100)}</span>
        </p>
        <button
          onClick={() => {
            customCanvas?.zoomIn();
            setZoomScale(customCanvas?.zoomScale || 1);
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            customCanvas?.zoomOut();
            setZoomScale(customCanvas?.zoomScale || 1);
          }}
        >
          -
        </button>
      </section>
      <section className="zoom-to-fit">
        <button
          onClick={() => {
            customCanvas?.zoomToFit();
            setZoomScale(customCanvas?.zoomScale || 1);
          }}
        >
          zoom-to-fit
        </button>
      </section>
    </div>
  );
}
