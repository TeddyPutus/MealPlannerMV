let apiKey = "3238d82b22554c6eaad32689862567d2";
// let imageURL = "https://spoonacular.com/cdn/ingredients_100x100/"; //just append contents of image property to this, and you can have image of ingredients

// async function fetchIngredient(food) { 
//     //Saving the API response in a constant 
//     const response =  await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${food}&sort=calories&sortDirection=desc/information&apiKey=${apiKey}`)
    
//     if (response.status === 404) { 
//         alert(`${input} is not a valid ingredient... Please try again.`); 
//         return true; 
//     } 
//     const data = await response.json(); 
    
//     for(let ingredient of data.results){
//         if(ingredient.name === food) return ingredient.id
//     }
// } 

// async function fetchIngredientData(id, amount){
//     const response =  await fetch(`https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${apiKey}&amount=${amount}`);
//     const data = await response.json(); 
//     return data;
// }

const formArea = document.getElementById("recipe-form-area");
const cardArea = document.getElementById("recipe-card-area");
const addedIngredientArea = document.getElementById("added-ingredients");
const totalCalories = document.getElementById("total-p-calories");
const totalCarbs = document.getElementById("total-p-carbs");
const totalFat = document.getElementById("total-p-fat");
const totalProtein = document.getElementById("total-p-protein");

let totalCaloriesValue = 0, totalCarbsValue = 0, totalFatValue = 0, totalProteinValue = 0;
const ingredientList = [];

//Create recipe form function - gets the elements from the html form and adds callbacks to the buttons, populates values etc.
function createRecipeForm(){
    
    const recipeName = document.getElementById("recipe-form-title");
    const addIngredientTextInput = document.getElementById("recipe-ingredient-text-box");
    const addIngredientWeight = document.getElementById("amount");

    const addIngredientButton = document.getElementById("recipe-ingredient-add-button");
    //callback to add the ingredient to the div and update our values
    addIngredientButton.addEventListener("click", () => {
        createIngredientDiv(addIngredientTextInput.value, addIngredientWeight.value)
    });
    
    const createRecipeButton  = document.getElementById("recipe-create-button");
    createRecipeButton.addEventListener("click", () => {
        if(ingredientList.length > 0 && recipeName.value !== ""){
            //we have ingredients and title
            createCard(recipeName.value, totalCaloriesValue, totalCarbsValue, totalFatValue, totalProteinValue, ingredientList);
        } else{
            alert("Recipe needs a title and at least one ingredient!");
        }
    });  
}

async function createIngredientDiv(ingredient, weight){
    integrationFunction(ingredient).then((data) => {
        
        const ingredientDiv = document.createElement("section");
        ingredientDiv.classList.add("ingredient");

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "X";
        deleteButton.addEventListener("click", () => {
            deleteIngredient(ingredient, ingredientDiv, data);
        });

        const ingredientName = document.createElement("p");
        ingredientName.innerText = `${ingredient} - ${weight}g`

        const calories = document.createElement("div");
        calories.innerText = `${data[1].calories}`;
        const fat = document.createElement("div");
        fat.innerText = `${data[1].fat}`;
        const carbs = document.createElement("div");
        carbs.innerText = `${data[1].carbs}`;
        const protein = document.createElement("div");
        protein.innerText = `${data[1].protein}`;

        ingredientDiv.append(deleteButton, ingredientName, calories, carbs, fat, protein);
        
        document.getElementById("added-ingredients").append(ingredientDiv);

        let caloriesToAdd = parseFloat(data[1].calories.slice(0, -1)); //remove the char at the end!
        let carbsToAdd = parseFloat(data[1].carbs.slice(0, -1)); //remove the char at the end!
        let fatToAdd = parseFloat(data[1].fat.slice(0, -1)); //remove the char at the end!
        let proteinToAdd = parseFloat(data[1].protein.slice(0, -1)); //remove the char at the end!

        totalCaloriesValue += caloriesToAdd;
        totalCarbsValue += carbsToAdd;
        totalFatValue += fatToAdd;
        totalProteinValue += proteinToAdd;

        totalCalories.innerText = `${totalCaloriesValue}k`;
        totalCarbs.innerText = `${totalCarbsValue}g`;
        totalFat.innerText = `${totalFatValue}g`;
        totalProtein.innerText = `${totalProteinValue}g`;

        ingredientList.push( {
            name: ingredient,
            calories: totalCaloriesValue,
            carbs: totalCarbsValue,
            fat: totalFatValue,
            protein: totalProteinValue
        });

        // return data[1];
    });

}

function deleteIngredient(ingredientName, ingredientDiv, data){
    //remove the div from the form
    document.getElementById("added-ingredients").removeChild(ingredientDiv);

    //update the total values
    let caloriesToAdd = parseFloat(data[1].calories.slice(0, -1)); //remove the char at the end!
    let carbsToAdd = parseFloat(data[1].carbs.slice(0, -1)); //remove the char at the end!
    let fatToAdd = parseFloat(data[1].fat.slice(0, -1)); //remove the char at the end!
    let proteinToAdd = parseFloat(data[1].protein.slice(0, -1)); //remove the char at the end!

    totalCaloriesValue -= caloriesToAdd;
    totalCarbsValue -= carbsToAdd;
    totalFatValue -= fatToAdd;
    totalProteinValue -= proteinToAdd;

    totalCalories.innerText = `${totalCaloriesValue}k`;
    totalCarbs.innerText = `${totalCarbsValue}g`;
    totalFat.innerText = `${totalFatValue}g`;
    totalProtein.innerText = `${totalProteinValue}g`;

    //find and remove ingredient entry from ingredient list
    for(ingredient of ingredientList){
        if(ingredient.name === ingredientName){
            ingredientList.splice(ingredientList.indexOf(ingredient), 1)
            break;
        }
    }

}


//Stef's API functions
async function fetchIngredientList(str) {
    const url = `https://api.spoonacular.com/food/ingredients/search?query=${str}&number=200&sort=calories&sortDirection=desc/information&apiKey=${apiKey}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    let [myIngredient] = data.results.filter(
      (ingredient) => ingredient.name === str
    );
    // console.log(myIngredient);
  
    return myIngredient;
} // all async functions return a promise
  
async function nutritionalValues(ingredient) {
    const url = `https://api.spoonacular.com/recipes/${ingredient.id}/nutritionWidget.json?apiKey=${apiKey}&amount=100&unit=g`;
  
    let response = await fetch(url);
    let data = await response.json();
  
    // console.log(data);
  
    return data;
}
  
async function integrationFunction(ingredient) {
    let ingredientObj = await fetchIngredientList(ingredient);
    let nutrition = await nutritionalValues(ingredientObj);
  
    console.log(nutrition);
  
    let foodInfoArr = [ingredientObj.name, nutrition];
  
    console.log(foodInfoArr);
    return foodInfoArr;
  }




//Create recipe card function

createRecipeForm()

const stefExampleOutput =   ["apple", {
    calories: "1k",
    carbs: "16g",
    fat:"107g",
    protein:"20g"
}]

