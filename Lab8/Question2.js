const isPrime = async (n) =>
  console.log(
    await new Promise((resolve, reject) => {
      for (let i = 2, s = Math.sqrt(n); i <= s; i++)
        if (n % i === 0) resolve({ prime: false });
      return resolve({ prime: n > 1 });
    })
  );
console.log("start");
isPrime(7);
console.log("end");
