export const v4 = (): string => {
  const bitsInSymbol = 16;
  const uuidCountSymbols = [8, 4, 4, 4, 12];
  const uuidMaxNumbers = uuidCountSymbols.map(
    (countSymbols) => bitsInSymbol ** countSymbols,
  );
  return uuidMaxNumbers
    .map((maxNumbers, index) => {
      const countSymbols = uuidCountSymbols[index];
      return Math.round(Math.random() * maxNumbers)
        .toString(bitsInSymbol)
        .padStart(countSymbols, '0');
    })
    .join('-');
};
