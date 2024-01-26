import PurifyHTML from 'https://cdn.jsdelivr.net/npm/purify-html/+esm';

const sanitizer = new PurifyHTML.sanitizer();

export default {
  util({ log, flags }, [host]) {
    const method = (flags.getFlag('method')?.value || 'GET').toUpperCase();
    const url = new URL(
      `${flags.hasFlag('http') ? 'http' : 'https'}://${
        host === '/' ? '' : host
      }`
    );

    // Cors
    const originsIsMatched = url.origin === location.origin;
    const corsMode =
      flags.getFlag('cors')?.value || originsIsMatched ? 'cors' : 'no-cors';

    const body = flags.hasFlag('body')
      ? flags.getFlag('body')?.value
      : undefined;

    log({
      text: `{color: #89fff1 | ${method} ${url.href}}`,
    });

    try {
      fetch(url, {
        method,
        body,
        mode: corsMode,
      })
        .then((res) => {
          let color = '';

          switch (true) {
            case res.status < 200:
              color = '#eee';
              break;

            case res.status < 300:
              color = '#57fc57';
              break;

            case res.status < 400:
              color = '#f0fb54';
              break;

            case res.status < 500:
              color = '#fb5b5b';
              break;

            default:
              color = '#ff0000';
          }

          log({
            text: `{color: ${color} | ${res.status}: ${res.statusText}}`,
          });

          return res.text();
        })
        .then((res) => {
          log({
            text: sanitizer.toHTMLEntities(res),
          });
        })
        .catch((err) => {
          const isCorsError = !originsIsMatched && corsMode === 'cors';

          log({
            text: `${err.message}${isCorsError ? ': CORS error' : ''}`,
            styles: {
              color: 'red',
            },
          });
        });
    } catch (err) {
      log({
        text: err.message,
        styles: {
          color: 'red',
        },
      });
    }
  },
  scheme: {
    description:
      'Executes mathematical expressions using eval, after removing all unnecessary symbols',
  },
};
