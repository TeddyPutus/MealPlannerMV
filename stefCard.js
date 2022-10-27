function createCard(ingrList, totalCals, ttlCarbs, ttlProt, ttlFat) {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h2");
  title.append(card);
  // Inputs Section
  //   const inputs = document.createElement("div");
  //   inputs.append(card);
  //   const ingredientName = document.createElement("input");
  //   ingredientName.append(inputs);
  //   const amount = document.createElement("input");
  //   amount.append(inputs);
  //   const unit = document.createElement("input");
  //   unit.append(inputs);
  //   const addIngredientBtn = document.createElement("button");
  //   addIngredientBtn.append(inputs);

  //main
  const ingredients = document.createElement("div");
  ingredients.classList.add("ingredients");
  ingredients.append(card);
  //individual ingredients ahould be created dynamically

  for (let i of ingrList) {
    const individualIngredient = document.createElement("div"); // str name of recipe
    individualIngredient.append(ingredients);
    individualIngredient.classList.add("ingredient");
    //   const deleteBtn = document.createElement("button");
    //   deleteBtn.append(ingredients);

    const ingredientName = document.createElement("div"); // ingredients list
    ingredientName.innerText = i.name;
    ingredientName.append(individualIngredient);
    const macros = document.createElement("div");
    macros.append(individualIngredient);
    const carbs = document.createElement("div");
    carbs.innerText = i.carbs;
    carbs.append(macros);
    const calories = document.createElement("div");
    calories.innerText = i.calories;
    calories.append(macros);
    const protein = document.createElement("div");
    protein.innerText = i.protein;
    protein.append(macros);
    const fat = document.createElement("div");
    fat.innerText = i.fat;
    fat.append(macros);
  }

  //footer
  const footer = document.createElement("div"); // iner values as float
  footer.append(card);
  const totalCalories = document.createElement("div");
  totalCalories.innerText = totalCals;
  totalCalories.append(footer);
  const totalCarbs = document.createElement("div");
  totalCarbs.innerText = ttlCarbs;
  totalCarbs.append(footer);
  const totalProtein = document.createElement("div");
  totalProtein.innerText = ttlProt;
  totalProtein.append(footer);
  const totalFat = document.createElement("div");
  totalFat.innerText = ttlFat;
  totalFat.append(footer);
  //   const createRecipe = document.createElement("button");
  //   createRecipe.append(footer);
}
