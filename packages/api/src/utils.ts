export const numbersInRangeObject = (begin: number, end: number) => {
  let sum = 0;
  let count = 0;
  let avg = 0;

  for (let i = begin; i <= end; i++) {
    sum += i;
    count++;
  }

  avg = sum / count;

  return { sum, count, avg };
}
