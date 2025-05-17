function secondLargest(numbers: number[]): number | undefined {
  let max = -Infinity;
  let secondMax = -Infinity;

  for (const num of numbers) {
    if (num > max) {
      secondMax = max;
      max = num;
    } else if (num > secondMax && num < max) {
      secondMax = num;
    }
  }

  return secondMax !== -Infinity ? secondMax : undefined;
}

console.log(secondLargest([20, 120, 111, 215, 54, 78]));
