import { useRef } from 'react';

function ColorPicker() {
  const imgFileRef = useRef(null);
  const canvasRef = useRef(null);

  const onClickForm = () => {
    const imgFile = imgFileRef.current;
    const image = new Image();
    const file = imgFile.files[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      image.onload = () => {
        const canvas = canvasRef.current;
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      };
    };
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="file" id="imgfile" ref={imgFileRef} />
        <input type="button" id="btnLoad" value="Load" onClick={onClickForm} />
      </form>
      <canvas id="canvas" ref={canvasRef}></canvas>
      <div id="palette"></div>
      <div id="complementary"></div>
    </>
  );
}

export default ColorPicker;
