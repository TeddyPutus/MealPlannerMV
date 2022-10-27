let apiKey = "3238d82b22554c6eaad32689862567d2";
let imageURL = "https://spoonacular.com/cdn/ingredients_100x100/"; //just append contents of image property to this, and you can have image of ingredients

async function fetchIngredient(food) { 
    //Saving the API response in a constant 
    const response =  await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${food}&sort=calories&sortDirection=desc/information&apiKey=${apiKey}`)
    
    if (response.status === 404) { 
        alert(`${input} is not a valid ingredient... Please try again.`); 
        return true; 
    } 
    const data = await response.json(); 
    
    for(let ingredient of data.results){
        if(ingredient.name === food) return ingredient.id
    }
} 

async function fetchIngredientData(id, amount){
    const response =  await fetch(`https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${apiKey}&amount=${amount}`);
    const data = await response.json(); 
    return data;
}

// fetchIngredient("banana").then((ingredientId) => fetchIngredientData(ingredientId, 150));


const formArea = document.getElementById("recipe-form-area");
const cardArea = document.getElementById("recipe-card-area");

// //To do:
// //Create recipe form function
// function createRecipeForm(){
//     const mainDiv = document.createElement("div");
//     mainDiv.classList.add("recipe-form-main-div");

//     const recipeName = document.createElement("INPUT");
//     recipeName.setAttribute("type", "text");

//     //this is our add ingredient div, it will contain a text input and an add button with a callback that calls createIngredientDiv(data)
//     const addIngredientDiv = document.createElement("div");
//     addIngredientDiv.classList.add("recipe-form-add-ingredient-div");

//     const addIngredientTextInput = document.createElement("INPUT");
//     addIngredientTextInput.setAttribute("type", "text");
    
//     const addIngredientWeight = document.createElement("INPUT");
//     addIngredientWeight.setAttribute("type", "number");

//     const addIngredientButton = document.createElement("button");
//     addIngredientButton.addEventListener("click", () => createIngredientDiv(addIngredientTextInput.value, addIngredientWeight.value))

//     addIngredientDiv.append(addIngredientTextInput, addIngredientWeight, addIngredientButton);

//     //this div will contain all the created ingredient elements
//     const ingredientDiv = document.createElement("div");
//     ingredientDiv.classList.add("recipe-form-ingredient-div");

//     mainDiv.append(recipeName, addIngredientDiv, ingredientDiv);
//     formArea.append(mainDiv);
// }

function createIngredientDiv(ingredient, weight){
    fetchIngredient(ingredient).then((ingredientId) => fetchIngredientData(ingredientId, weight)).then((data) => {
        console.log(data)
        //we have access to all the data here!
        //we can create a div with ingredient name, 
        //we can create a pop up that shows on hover the nutritional information
        const ingredientDiv = document.createElement("div");
        ingredientDiv.classList.add("ingredient-element");

        const ingredientName = document.createElement("h3");
        ingredientName.innerText = `${ingredient} - ${weight}g`

        const ingredientImage = document.createElement("img");
        ingredientImage.setAttribute("src", `${imageURL}${data.image}`);

        ingredientDiv.append(ingredientName, ingredientImage);
        
        document.querySelector(".recipe-form-ingredient-div").append(ingredientDiv);
    });

}

//Create recipe card function

createRecipeForm()