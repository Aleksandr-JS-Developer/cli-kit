export default {
  util({ log }, [num, fromRadix, toRadix = '82']) {
    if (num === undefined) {
      return log({
        text: 'hex num:{color: #eee | string} fromRadix:{color: #eee | number} toRadix:{color: #eee | number}',
      });
    }

    const bn = new BigNumber(num.toLowerCase(), +fromRadix);

    log({
      text: bn.toString(+toRadix),
    });
  },
};
