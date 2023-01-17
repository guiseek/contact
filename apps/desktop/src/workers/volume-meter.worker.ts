/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;
  postMessage(response);
});

let canvas: HTMLCanvasElement;

const drawVisualizer = ({
  bufferLength,
  dataArray,
}: {
  bufferLength: number;
  dataArray: Uint8Array;
}) => {
  let barHeight;
  const barWidth = canvas.width / 2 / bufferLength;
  let firstX = 0;
  let secondX = bufferLength * barWidth;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i];
      const red = (i * barHeight) / 10;
      const green = i * 4;
      const blue = barHeight / 4 - 12;
      ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
      ctx.fillStyle = 'black'
      ctx.fillRect(
        canvas.width / 2 - firstX,
        canvas.height - barHeight,
        barWidth,
        barHeight
      );
      firstX += barWidth;
      ctx.fillRect(secondX, canvas.height - barHeight, barWidth, barHeight);
      secondX += barWidth;
    }
  }
};

onmessage = function (e) {
  // console.log('Worker: Message received from main script');
  const { bufferLength, dataArray, canvas: canvasMessage } = e.data;
  if (canvasMessage) {
    canvas = canvasMessage;
  } else {
    drawVisualizer({ bufferLength, dataArray });
  }
};
