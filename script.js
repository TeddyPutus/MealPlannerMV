let apiKey = "565107c2332d437082260ddcf117d8f7";
let imageURL = "https://spoonacular.com/cdn/ingredients_100x100/"; //just append contents of image property to this, and you can have image of ingredients

async function fetchIngredient(food) {

    //Saving the API response in a constant
    try{
      const response =  await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${food}&number=100&sort=calories&sortDirection=desc/information&apiKey=${apiKey}`);
      const data = await response.json();

      for(let ingredient of data.results){
          if(ingredient.name === food) return ingredient.id;
      }

      //out of the for loop - we haven't found anything!
      alert(`${food} is not a valid ingredient... Please try again. Did you mean ${data.results[0].name}?`);
      return false;
    }catch(error){
        alert(`${food} is not a valid ingredient... Please try again.`);
        console.log(error);
        return false;
    } 
}

async function fetchIngredientData(id, amount){
  try{
    const response =  await fetch(`https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${apiKey}&amount=1`);
    const data = await response.json();
    console.log(data)


  let caloriesPerServing, carbsPerServing, fatPerServing, proteinPerServing;

  for (nutrient of data.nutrition.nutrients) {
    if (nutrient.name === "Calories") caloriesPerServing = nutrient.amount;
    if (nutrient.name === "Carbohydrates") carbsPerServing = nutrient.amount;
    if (nutrient.name === "Fat") fatPerServing = nutrient.amount;
    if (nutrient.name === "Protein") proteinPerServing = nutrient.amount;
  }


    let servingSize = data.nutrition.weightPerServing.amount;
    
    caloriesPerServing = (caloriesPerServing / servingSize) * amount;
    carbsPerServing = (carbsPerServing / servingSize) * amount;
    fatPerServing = (fatPerServing / servingSize) * amount;
    proteinPerServing = (proteinPerServing / servingSize) * amount;

    return [data.name,
        {
            calories: caloriesPerServing,
            carbs: carbsPerServing,
            fat: fatPerServing,
            protein: proteinPerServing,
          },
        ];
      } catch(error){
        console.log(error);
      }

}
/*Recipe Card Function*/
const mainSection = document.getElementById("recipe-card-area");

function createCard(foodName, totalCals, ttlCarbs, ttlFat, ttlProt, ingrList) {
  const card = document.createElement("div");
  card.classList.add("card");

  const title = document.createElement("h2");
  title.classList.add("title");
  title.innerText = foodName;
  card.append(title);

  const subtitleSection = document.createElement("section");
  subtitleSection.classList.add("subtitleSection");
  card.append(subtitleSection);
  const subtitle = document.createElement("div");
  subtitle.classList.add("subtitle");
  subtitleSection.append(subtitle);
  const ing = document.createElement("div");
  ing.classList.add("ing");
  ing.innerText = "Ingredient";
  const cals = document.createElement("div");
  cals.classList.add("cals");
  cals.innerText = "Cals";
  const crbs = document.createElement("div");
  crbs.classList.add("crbs");
  crbs.innerText = "Carbs";
  const ft = document.createElement("div");
  ft.classList.add("ft");
  ft.innerText = "Fat";
  const prt = document.createElement("div");
  prt.classList.add("prt");
  prt.innerText = "Protein";
  subtitle.append(ing);
  subtitle.append(cals);
  subtitle.append(crbs);
  subtitle.append(ft);
  subtitle.append(prt);

  //main
  const ingredients = document.createElement("div");
  ingredients.classList.add("ingredients");
  card.append(ingredients);
  //individual ingredients ahould be created dynamically

  console.log(ingrList);

  for (let i of ingrList) {
    const individualIngredient = document.createElement("div"); // str name of recipe
    individualIngredient.classList.add("ingredient_and_macros");
    ingredients.append(individualIngredient);
    individualIngredient.classList.add("ingredient");
    //   const deleteBtn = document.createElement("button");
    //   deleteBtn.append(ingredients);

    const ingredientName = document.createElement("div"); // ingredients list
    ingredientName.classList.add("ingredient_name");
    ingredientName.innerText = i.name;
    individualIngredient.append(ingredientName);
    const macros = document.createElement("div");
    macros.classList.add("macros");
    individualIngredient.append(macros);
    const calories = document.createElement("div");
    calories.classList.add("calories");
    calories.innerText = i.calories.toFixed(2);
    macros.append(calories);
    const carbs = document.createElement("div");
    carbs.innerText = i.carbs.toFixed(2);
    carbs.classList.add("carbs");
    macros.append(carbs);
    const protein = document.createElement("div");
    const fat = document.createElement("div");
    fat.classList.add("fat");
    fat.innerText = i.fat.toFixed(2);
    macros.append(fat);
    protein.classList.add("protein");
    protein.innerText = i.protein.toFixed(2);
    macros.append(protein);
  }

  //footer
  const footer = document.createElement("div"); // iner values as float
  footer.classList.add("total_macros");
  card.append(footer);
  const total = document.createElement("strong");
  total.classList.add("total");
  total.innerText = "Total:";
  footer.append(total);
  const totalCalories = document.createElement("strong");
  totalCalories.classList.add("total_calories");
  totalCalories.innerText = `${totalCals.toFixed(2)}`;
  footer.append(totalCalories);
  const totalCarbs = document.createElement("strong");
  totalCarbs.classList.add("total_carbs");
  totalCarbs.innerText = `${ttlCarbs.toFixed(2)}g`;
  footer.append(totalCarbs);
  const totalFat = document.createElement("strong");
  totalFat.classList.add("total_fat");
  totalFat.innerText = `${ttlFat.toFixed(2)}g`;
  footer.append(totalFat);
  const totalProtein = document.createElement("strong");
  totalProtein.classList.add("total_protein");
  totalProtein.innerText = `${ttlProt.toFixed(2)}g`;
  footer.append(totalProtein);

  //   const createRecipe = document.createElement("button");
  //   createRecipe.append(footer);

  mainSection.append(card);
}

/* End of Recipe Card Function*/

const formArea = document.getElementById("recipe-form-area");
const cardArea = document.getElementById("recipe-card-area");
const addedIngredientArea = document.getElementById("added-ingredients");
const totalCalories = document.getElementById("total-p-calories");
const totalCarbs = document.getElementById("total-p-carbs");
const totalFat = document.getElementById("total-p-fat");
const totalProtein = document.getElementById("total-p-protein");

let totalCaloriesValue = 0,
  totalCarbsValue = 0,
  totalFatValue = 0,
  totalProteinValue = 0;
const ingredientList = [];

//Create recipe form function - gets the elements from the html form and adds callbacks to the buttons, populates values etc.
function createRecipeForm() {
  const recipeName = document.getElementById("recipe-form-title");
  const addIngredientTextInput = document.getElementById(
    "recipe-ingredient-text-box"
  );
  const addIngredientWeight = document.getElementById("amount");

  const addIngredientButton = document.getElementById(
    "recipe-ingredient-add-button"
  );
  //callback to add the ingredient to the div and update our values
  addIngredientButton.addEventListener("click", () => {
    createIngredientDiv(
      addIngredientTextInput.value,
      addIngredientWeight.value
    );
  });

  const createRecipeButton = document.getElementById("recipe-create-button");
  createRecipeButton.addEventListener("click", () => {
    if (ingredientList.length > 0 && recipeName.value !== "") {
      //we have ingredients and title
      createCard(
        recipeName.value,
        totalCaloriesValue,
        totalCarbsValue,
        totalFatValue,
        totalProteinValue,
        ingredientList
      );
    } else {
      alert("Recipe needs a title and at least one ingredient!");
    }
  });
}

async function createIngredientDiv(ingredient, weight) {

  fetchIngredient(ingredient).then((data) => fetchIngredientData(data, weight)).then((data) =>{

    if(data){


      const ingredientDiv = document.createElement("section");
      ingredientDiv.classList.add("ingredient");

      const deleteButton = document.createElement("button");
      deleteButton.innerText = "X";
      deleteButton.addEventListener("click", () => {
        deleteIngredient(ingredient, ingredientDiv, data);
      });

      const ingredientName = document.createElement("p");
      ingredientName.innerText = `${ingredient} - ${weight}g`;

      const calories = document.createElement("div");

      calories.innerText = `${data[1].calories.toFixed(2)}`;

      const fat = document.createElement("div");
      fat.innerText = `${data[1].fat.toFixed(2)}g`;
      const carbs = document.createElement("div");
      carbs.innerText = `${data[1].carbs.toFixed(2)}g`;
      const protein = document.createElement("div");
      protein.innerText = `${data[1].protein.toFixed(2)}g`;

      ingredientDiv.append(
        deleteButton,
        ingredientName,
        calories,
        carbs,
        fat,
        protein
      );

      document.getElementById("added-ingredients").append(ingredientDiv);

      totalCaloriesValue += data[1].calories;
      totalCarbsValue += data[1].carbs;
      totalFatValue += data[1].fat;
      totalProteinValue += data[1].protein;


      totalCalories.innerText = `${totalCaloriesValue.toFixed(2)}`;
      totalCarbs.innerText = `${totalCarbsValue.toFixed(2)}g`;
      totalFat.innerText = `${totalFatValue.toFixed(2)}g`;
      totalProtein.innerText = `${totalProteinValue.toFixed(2)}g`;

      ingredientList.push({
        name: ingredient,
        calories: data[1].calories,
        carbs: data[1].carbs,
        fat: data[1].fat,
        protein: data[1].protein,
      });
  }
  });
}

function deleteIngredient(ingredientName, ingredientDiv, data) {

  console.log(data)
  //remove the div from the form
  document.getElementById("added-ingredients").removeChild(ingredientDiv);


  totalCaloriesValue = data[1].calories > 0 ? totalCaloriesValue - data[1].calories : 0;
  totalCarbsValue = data[1].carbs > 0 ? totalCarbsValue - data[1].carbs : 0;
  totalFatValue = data[1].fat > 0 ? totalFatValue - data[1].fat : 0;
  totalProteinValue = data[1].protein > 0 ? totalProteinValue - data[1].protein : 0;

  totalCalories.innerText = `${totalCaloriesValue.toFixed(2)}`;
  totalCarbs.innerText = `${totalCarbsValue.toFixed(2)}g`;
  totalFat.innerText = `${totalFatValue.toFixed(2)}g`;
  totalProtein.innerText = `${totalProteinValue.toFixed(2)}g`;

  //find and remove ingredient entry from ingredient list
  for (ingredient of ingredientList) {
    if (ingredient.name === ingredientName) {
      ingredientList.splice(ingredientList.indexOf(ingredient), 1);
      break;
    }
  }
}

createRecipeForm();
