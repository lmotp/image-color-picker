import { useRef } from 'react';
import './styles.css';

function ColorPicker() {
  const imgFileRef = useRef(null);
  const canvasRef = useRef(null);

  const onClickForm = () => {
    const imgFile = imgFileRef.current;
    const image: HTMLImageElement = new Image();
    const file = imgFile.files[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      image.onload = () => {
        const canvas = canvasRef.current;
        canvas.width = image.width / 2;
        canvas.height = image.height / 2;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, image.width / 2, image.height / 2);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        console.log(imageData);

        const rgbArray = buildRgb(imageData.data);
      };

      image.src = URL.createObjectURL(file);
    };

    fileReader.readAsDataURL(file);
  };

  const buildRgb = (imageData: Uint8ClampedArray) => {
    const rgbValues = [];
    // note that we are loopin every 4!
    // for every Red, Green, Blue and Alpha
    for (let i = 0; i < imageData.length; i += 4) {
      const rgb = {
        r: imageData[i],
        g: imageData[i + 1],
        b: imageData[i + 2],
      };

      rgbValues.push(rgb);
    }

    return rgbValues;
  };

  return (
    <section>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="file" id="imgfile" ref={imgFileRef} />
        <input type="button" id="btnLoad" value="Load" onClick={onClickForm} />
      </form>
      <canvas id="canvas" ref={canvasRef}></canvas>
      <div id="palette"></div>
      <div id="complementary"></div>
    </section>
  );
}

export default ColorPicker;
