export default {
  util({ log }, [num, radix = '82']) {
    const bn = new BigNumber(num.toLowerCase(), 16);

    log({
      text: bn.toString(+radix),
    });
  },
};
