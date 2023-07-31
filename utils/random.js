function getRandomIntInclusive(min, max) {
  const randomBuffer = new Uint32Array(1);

  window.crypto.getRandomValues(randomBuffer);

  let randomNumber = randomBuffer[0] / (0xffffffff + 1);

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(randomNumber * (max - min + 1)) + min;
}

export default {
  util({ log }, [length = '16', radix = '32', useRandomCases = '1']) {
    length = +length;
    radix = +radix;
    useRandomCases = useRandomCases === '1';

    const res = Array.from({ length }, () => {
      const num = getRandomIntInclusive(0, radix).toString(radix);

      if (useRandomCases) {
        return getRandomIntInclusive(0, 100) > 50 ? num.toUpperCase() : num;
      }

      return num;
    }).join('');

    log({
      text: `random string: {color: #53fff5 | ${res}}`,
    });
  },
};
