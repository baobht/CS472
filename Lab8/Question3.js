(async function () {
  const { recipes } = await fetch("https://dummyjson.com/recipes")
    .then((res) => res.json())
    .then((finalRes) => finalRes)
    .catch((err) => console.log(err));
  recipes.forEach((recipe) => {
    console.log(recipe);
  });
})();
