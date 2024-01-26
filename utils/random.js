function getRandomIntInclusive(min, max) {
  const randomBuffer = new Uint32Array(1);

  window.crypto.getRandomValues(randomBuffer);

  const randomNumber = randomBuffer[0] / (0xffffffff + 1);

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(randomNumber * (max - min + 1)) + min;
}

const randomLorem = (() => {
  function random(param) {
    if (typeof param === 'number') return Math.floor(Math.random() * param);

    return param[random(param.length)];
  }

  return (wordsCount = 20) => {
    const words = [
      'consectetur',
      'adipisicing',
      'elit.',
      'Officiis,',
      'impedit',
      'quia?',
      'Asperiores',
      'nisi',
      'molestias',
      'explicabo',
      'labore,',
      'consectetur',
      'minus',
      'repellat',
      'voluptate',
      'excepturi',
      'cupiditate',
      'nam',
      'atque',
      'facilis',
      'tempore',
      'soluta',
      'minima',
      'mollitia',
      'neque',
      'sit',
      'amet',
    ];

    return (
      'Lorem ipsum dolor ' +
      Array.from({ length: random(wordsCount - 3) }, () => random(words)).join(
        ' '
      ) +
      random(['.', '?', '!', '...'])
    );
  };
})();

export default {
  util({ log, flags }, [length = '16', radix = '32', useRandomCases = '1']) {
    length = +length;
    radix = +radix;
    useRandomCases = useRandomCases === '1';

    if (length > 0 && (flags.hasFlag('lorem') || flags.hasFlag('l'))) {
      log({
        text: `random lorem string: {color: #53fff5 | ${randomLorem(length)}}`,
      });

      return;
    }

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
