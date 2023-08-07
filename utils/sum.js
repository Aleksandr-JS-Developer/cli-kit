export default {
  util({ log }, ...params) {
    log({
      text: eval(params.join('').replace(/[^\d\-+\/*\.]/gi, '')),
    });
  },
  scheme: {
    description:
      'Executes mathematical expressions using eval, after removing all unnecessary symbols',
  },
};
