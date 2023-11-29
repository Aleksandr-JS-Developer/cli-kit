import length from './utils/length.js';
import hex from './utils/hexToRadix.js';
import random from './utils/random.js';
import crypto from './utils/crypto.js';
import sum from './utils/sum.js';
import ping from './utils/ping.js';

const main = () => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
    return;
  }

  const term = new ETerminal.Terminal(
    '[e-term]',
    {
      length,
      l: length,
      hex,
      h: hex,
      random,
      r: random,
      crypto: crypto,
      c: crypto,
      sum,
      s: sum,
      ping,
      p: ping,
    },
    {
      fillParent: true,
      exec: true,
    }
  );

  term.exec('p  --http');

  term.config.input.showInput = true;
};

main();
