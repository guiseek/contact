class SoundMeterProcessor extends AudioWorkletProcessor {
  instant = 0
  slow = 0
  clip = 0
  process(
    inputs: Float32Array[][]
    // outputs: Float32Array[][],
    // parameters: Record<string, Float32Array>
  ) {
    let i
    let sum = 0.0
    let clipcount = 0
    for (i = 0; i < inputs.length; i++) {
      sum += inputs[i].length * inputs[i].length
      if (Math.abs(inputs[i].length) > 0.99) {
        clipcount += 1
      }
    }

    this.instant = Math.sqrt(sum / inputs.length)
    this.slow = 0.95 * this.slow + 0.05 * this.instant
    this.clip = clipcount / inputs.length

    return true
    // const output = outputs[0];
    // output.forEach((channel) => {
    //   for (let i = 0; i < channel.length; i++) {
    //     channel[i] = Math.random() * 2 - 1;
    //   }
    // });
    // return true;
  }
}

registerProcessor('sound-meter-processor', SoundMeterProcessor)
