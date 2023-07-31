import cryptoJS from 'https://cdn.jsdelivr.net/npm/crypto-js@4.1.1/+esm';

const method = (method, text) => cryptoJS[method.toUpperCase()](text);

export default {
  util({ log, dialog }, [subModule = 'help', ...params]) {
    if (subModule === 'help') {
      return log({
        text: 'for example "crypto sha256 hello world"',
      });
    }

    log({
      text: method(subModule, params.join(' ')),
    });
  },
  description:
    'simple crypto-js cli wrapper. Now supports only a hash functions',
};
