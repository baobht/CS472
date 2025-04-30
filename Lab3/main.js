"use strict";
// 1a
const computeSumOfSquares = (arr) => {
  return arr.map((i) => i * i).reduce((acc, pre) => acc + pre);
};
console.log(computeSumOfSquares([1, 2, 3]));

// 1b
const printOddNumbersOnly = (arr) => {
  return arr.forEach((i) => {
    if (i % 2 === 1) console.log(i);
  });
};

printOddNumbersOnly([1, 2, 3]);
// 1c
function printFibo(n, a, b) {
  const result = [];
  while (result.length < n) {
    result.push(a);
    [a, b] = [b, a + b];
  }
  console.log(result.join(", "));
}

printFibo(5, 0, 1);

//2
let user = { name: "John", years: 30 };
let { name, years, isAdmin = false } = user;
console.log("🚀 ~ name:", name);
console.log("🚀 ~ years:", years);
console.log("🚀 ~ isAdmin:", isAdmin);

//3
let libraryBooks = [
  { title: "The Road Ahead", author: "Bill Gates", ID: 1235 },
  { title: "Walter Isaacson", author: "Steve Jobs", ID: 4268 },
  { title: "The Road Ahead", author: "Bill Gates", ID: 4268 },
  {
    title: "Mockingjay: The Final Book of The Hunger Games",
    author: "Suzanne Collins",
    ID: 3257,
  },
];

const addBook = (title, author, ID) => {
  let newObj = { title, author, ID };
  if (!libraryBooks.some((i) => i.ID === ID)) libraryBooks.push(newObj);
};
addBook("a", "b", 1);
const getTitles = () => {
  return libraryBooks.map((i) => i.title).sort((a, b) => a.localeCompare(b));
};
const findBooks = (keyword) => {
  return libraryBooks
    .filter((i) => i.title.includes(keyword))
    .sort((a, b) => a.ID - b.ID);
};
console.log(JSON.stringify(findBooks("The")));
