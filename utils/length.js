export default {
  util({ log, flags }, ...input) {
    if (flags.hasFlag('p')) {
      input = [prompt('Enter input', '')];
    }

    log({
      text: `length ${input.join('').length.toLocaleString()}`,
    });
  },
  scheme: {
    description: 'Count characters in input',
  },
};
