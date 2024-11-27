import useCanvasCursor from "../hook/useCanvasCursor";

const CanvasCursor = () => {
  useCanvasCursor();

  return (
    <canvas
      className="pointer-events-none fixed inset-0 z-10"
      id="canvas"
    />
  );
};
export default CanvasCursor;