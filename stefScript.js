async function fetchIngredient(str) {
  const url = `https://api.spoonacular.com/food/ingredients/search?query=${str}&number=200&sort=calories&sortDirection=desc/information&apiKey=565107c2332d437082260ddcf117d8f7`;

  const response = await fetch(url);
  const data = await response.json();

  let [myIngredient] = data.results.filter(
    (ingredient) => ingredient.name === str
  );
  console.log(myIngredient);

  return myIngredient;
} // all async functions return a promise

async function nutritionalValues(ingredient) {
  const url = `https://api.spoonacular.com/recipes/${ingredient.id}/nutritionWidget.json?apiKey=565107c2332d437082260ddcf117d8f7&amount=100&unit=g`;

  let response = await fetch(url);
  let data = await response.json();

  console.log(data);

  return data;
}

async function integrationFunction(ingredient) {
  let ingredientObj = await fetchIngredient(ingredient);
  let nutrition = await nutritionalValues(ingredientObj);

  console.log(nutrition);

  let foodInfoArr = [ingredientObj.name, nutrition];

  console.log(foodInfoArr);
}

integrationFunction("apple");

// fetchIngredient("apple").then((ingredient) => {
//   return nutritionalValues(ingredient);
// });
