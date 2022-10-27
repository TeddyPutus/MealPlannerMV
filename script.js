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
const addedIngredientArea = document.getElementById("added-ingredients");

//To do:
//Create recipe form function
function createRecipeForm(){

    let totalCaloriesValue = 0, totalCarbsValue = 0, totalFatValue = 0, totalProteinValue = 0;
    

    const recipeName = document.getElementById("recipe-form-title");
    const addIngredientTextInput = document.getElementById("recipe-ingredient-text-box");
    const addIngredientWeight = document.getElementById("amount");

    const addIngredientButton = document.getElementById("recipe-ingredient-add-button");
    addIngredientButton.innerText = "Add Ingredient";
    addIngredientButton.addEventListener("click", () => {
        let nutritionalValues = createIngredientDiv(addIngredientTextInput.value, addIngredientWeight.value);
        let caloriesToAdd = parseFloat(nutritionalValues.calories.slice(0, -1)); //remove the char at the end!
        let carbsToAdd = parseFloat(nutritionalValues.calories.slice(0, -1)); //remove the char at the end!
        let fatToAdd = parseFloat(nutritionalValues.calories.slice(0, -1)); //remove the char at the end!
        let proteinToAdd = parseFloat(nutritionalValues.calories.slice(0, -1)); //remove the char at the end!

        totalCaloriesValue += caloriesToAdd;
        totalCarbsValue += carbsToAdd;
        totalFatValue += fatToAdd;
        totalProteinValue += proteinToAdd;
    })
    
    const createRecipeButton  = document.getElementById("recipe-create-button");
    createRecipeButton.addEventListener("click", () => createEvent(recipeName/*data goes here*/));
    //create callback!

    

    //nutritional information
    const totalCalories = document.getElementById("total-p-calories");
    const totalCarbs = document.getElementById("total-p-carbs");
    const totalFat = document.getElementById("total-p-fat");
    const totalProtein = document.getElementById("total-p-protein");



    
    

    addIngredientDiv.append(addIngredientTextInput, addIngredientWeight, addIngredientButton);

    //this div will contain all the created ingredient elements
    const ingredientDiv = document.createElement("div");
    ingredientDiv.classList.add("recipe-form-ingredient-div");

    
}

function createIngredientDiv(ingredient, weight){
    integrationFunction(ingredient).then((data) => {
        
        //we have access to all the data here!
        //we can create a div with ingredient name, 
        //we can create a pop up that shows on hover the nutritional information
        const ingredientDiv = document.createElement("section");
        ingredientDiv.classList.add("ingredient");

        const ingredientName = document.createElement("p");
        ingredientName.innerText = `${ingredient} - ${weight}g`

        const calories = document.createElement("div");
        calories.innerText = `${data[1].calories}`;
        const fat = document.createElement("div");
        fat.innerText = `${data[1].fat}`;
        const carbs = document.createElement("div");
        carbs.innerText = `${data[1].carbs}`;
        const protein = document.createElement("div");
        proetin.innerText = `${data[1].protein}`;

        ingredientDiv.append(ingredientName, calories, carbs, fat, protein);
        
        document.querySelector(".recipe-form-ingredient-div").append(ingredientDiv);

        return data[1];
    });

}


//Stef's API functions
async function fetchIngredientList(str) {
    const url = `https://api.spoonacular.com/food/ingredients/search?query=${str}&number=200&sort=calories&sortDirection=desc/information&apiKey=565107c2332d437082260ddcf117d8f7`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    let [myIngredient] = data.results.filter(
      (ingredient) => ingredient.name === str
    );
    // console.log(myIngredient);
  
    return myIngredient;
  } // all async functions return a promise
  
  async function nutritionalValues(ingredient) {
    const url = `https://api.spoonacular.com/recipes/${ingredient.id}/nutritionWidget.json?apiKey=565107c2332d437082260ddcf117d8f7&amount=100&unit=g`;
  
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

//very important to call this - or we will have no functionality!!
createRecipeForm()

const exampleOutput = {
    "id": 9040,
    "original": "banana",
    "originalName": "banana",
    "name": "banana",
    "amount": 7,
    "unit": "",
    "unitShort": "",
    "unitLong": "",
    "possibleUnits": [
        "small",
        "large",
        "piece",
        "slice",
        "g",
        "extra small",
        "medium",
        "oz",
        "extra large",
        "NLEA serving",
        "cup",
        "cup mashed"
    ],
    "estimatedCost": {
        "value": 110.13,
        "unit": "US Cents"
    },
    "consistency": "solid",
    "shoppingListUnits": [
        "pieces"
    ],
    "aisle": "Produce",
    "image": "bananas.jpg",
    "meta": [],
    "nutrition": {
        "nutrients": [
            {
                "name": "Folic Acid",
                "amount": 0,
                "unit": "µg",
                "percentOfDailyNeeds": 0
            },
            {
                "name": "Vitamin C",
                "amount": 71.86,
                "unit": "mg",
                "percentOfDailyNeeds": 87.11
            },
            {
                "name": "Cholesterol",
                "amount": 0,
                "unit": "mg",
                "percentOfDailyNeeds": 0
            },
            {
                "name": "Alcohol",
                "amount": 0,
                "unit": "g",
                "percentOfDailyNeeds": 0
            },
            {
                "name": "Iron",
                "amount": 2.15,
                "unit": "mg",
                "percentOfDailyNeeds": 11.93
            },
            {
                "name": "Saturated Fat",
                "amount": 0.93,
                "unit": "g",
                "percentOfDailyNeeds": 5.78
            },
            {
                "name": "Fiber",
                "amount": 21.48,
                "unit": "g",
                "percentOfDailyNeeds": 85.9
            },
            {
                "name": "Carbohydrates",
                "amount": 188.33,
                "unit": "g",
                "percentOfDailyNeeds": 62.78
            },
            {
                "name": "Folate",
                "amount": 165.2,
                "unit": "µg",
                "percentOfDailyNeeds": 41.3
            },
            {
                "name": "Vitamin B5",
                "amount": 2.76,
                "unit": "mg",
                "percentOfDailyNeeds": 27.59
            },
            {
                "name": "Selenium",
                "amount": 8.26,
                "unit": "µg",
                "percentOfDailyNeeds": 11.8
            },
            {
                "name": "Vitamin K",
                "amount": 4.13,
                "unit": "µg",
                "percentOfDailyNeeds": 3.93
            },
            {
                "name": "Mono Unsaturated Fat",
                "amount": 0.26,
                "unit": "g",
                "percentOfDailyNeeds": 0
            },
            {
                "name": "Vitamin B3",
                "amount": 5.49,
                "unit": "mg",
                "percentOfDailyNeeds": 27.46
            },
            {
                "name": "Sugar",
                "amount": 100.77,
                "unit": "g",
                "percentOfDailyNeeds": 111.97
            },
            {
                "name": "Magnesium",
                "amount": 223.02,
                "unit": "mg",
                "percentOfDailyNeeds": 55.76
            },
            {
                "name": "Calories",
                "amount": 735.14,
                "unit": "kcal",
                "percentOfDailyNeeds": 36.76
            },
            {
                "name": "Phosphorus",
                "amount": 181.72,
                "unit": "mg",
                "percentOfDailyNeeds": 18.17
            },
            {
                "name": "Copper",
                "amount": 0.64,
                "unit": "mg",
                "percentOfDailyNeeds": 32.21
            },
            {
                "name": "Manganese",
                "amount": 2.23,
                "unit": "mg",
                "percentOfDailyNeeds": 111.51
            },
            {
                "name": "Lycopene",
                "amount": 0,
                "unit": "µg",
                "percentOfDailyNeeds": 0
            },
            {
                "name": "Potassium",
                "amount": 2957.08,
                "unit": "mg",
                "percentOfDailyNeeds": 84.49
            },
            {
                "name": "Vitamin B2",
                "amount": 0.6,
                "unit": "mg",
                "percentOfDailyNeeds": 35.47
            },
            {
                "name": "Choline",
                "amount": 80.95,
                "unit": "mg",
                "percentOfDailyNeeds": 0
            },
            {
                "name": "Calcium",
                "amount": 41.3,
                "unit": "mg",
                "percentOfDailyNeeds": 4.13
            },
            {
                "name": "Fluoride",
                "amount": 18.17,
                "unit": "mg",
                "percentOfDailyNeeds": 0
            },
            {
                "name": "Vitamin B12",
                "amount": 0,
                "unit": "µg",
                "percentOfDailyNeeds": 0
            },
            {
                "name": "Zinc",
                "amount": 1.24,
                "unit": "mg",
                "percentOfDailyNeeds": 8.26
            },
            {
                "name": "Vitamin A",
                "amount": 528.64,
                "unit": "IU",
                "percentOfDailyNeeds": 10.57
            },
            {
                "name": "Vitamin D",
                "amount": 0,
                "unit": "µg",
                "percentOfDailyNeeds": 0
            },
            {
                "name": "Fat",
                "amount": 2.73,
                "unit": "g",
                "percentOfDailyNeeds": 4.19
            },
            {
                "name": "Net Carbohydrates",
                "amount": 166.85,
                "unit": "g",
                "percentOfDailyNeeds": 60.67
            },
            {
                "name": "Caffeine",
                "amount": 0,
                "unit": "mg",
                "percentOfDailyNeeds": 0
            },
            {
                "name": "Vitamin E",
                "amount": 0.83,
                "unit": "mg",
                "percentOfDailyNeeds": 5.51
            },
            {
                "name": "Protein",
                "amount": 9,
                "unit": "g",
                "percentOfDailyNeeds": 18.01
            },
            {
                "name": "Sodium",
                "amount": 8.26,
                "unit": "mg",
                "percentOfDailyNeeds": 0.36
            },
            {
                "name": "Poly Unsaturated Fat",
                "amount": 0.6,
                "unit": "g",
                "percentOfDailyNeeds": 0
            },
            {
                "name": "Vitamin B6",
                "amount": 3.03,
                "unit": "mg",
                "percentOfDailyNeeds": 151.57
            },
            {
                "name": "Vitamin B1",
                "amount": 0.26,
                "unit": "mg",
                "percentOfDailyNeeds": 17.07
            }
        ],
        "properties": [
            {
                "name": "Glycemic Index",
                "amount": 54.78,
                "unit": ""
            },
            {
                "name": "Glycemic Load",
                "amount": 91.4,
                "unit": ""
            },
            {
                "name": "Nutrition Score",
                "amount": 33.419999999999995,
                "unit": "%"
            }
        ],
        "flavonoids": [
            {
                "name": "Cyanidin",
                "amount": 0,
                "unit": "mg"
            },
            {
                "name": "Petunidin",
                "amount": 0,
                "unit": "mg"
            },
            {
                "name": "Delphinidin",
                "amount": 0,
                "unit": "mg"
            },
            {
                "name": "Malvidin",
                "amount": 0,
                "unit": "mg"
            },
            {
                "name": "Pelargonidin",
                "amount": 0,
                "unit": "mg"
            },
            {
                "name": "Peonidin",
                "amount": 0,
                "unit": "mg"
            },
            {
                "name": "Catechin",
                "amount": 50.39,
                "unit": "mg"
            },
            {
                "name": "Epigallocatechin",
                "amount": 0,
                "unit": "mg"
            },
            {
                "name": "Epicatechin",
                "amount": 0.17,
                "unit": "mg"
            },
            {
                "name": "Epicatechin 3-gallate",
                "amount": 0,
                "unit": "mg"
            },
            {
                "name": "Epigallocatechin 3-gallate",
                "amount": 0,
                "unit": "mg"
            },
            {
                "name": "Theaflavin",
                "amount": 0,
                "unit": ""
            },
            {
                "name": "Thearubigins",
                "amount": 0,
                "unit": ""
            },
            {
                "name": "Eriodictyol",
                "amount": 0,
                "unit": ""
            },
            {
                "name": "Hesperetin",
                "amount": 0,
                "unit": "mg"
            },
            {
                "name": "Naringenin",
                "amount": 0,
                "unit": "mg"
            },
            {
                "name": "Apigenin",
                "amount": 0,
                "unit": "mg"
            },
            {
                "name": "Luteolin",
                "amount": 0,
                "unit": "mg"
            },
            {
                "name": "Isorhamnetin",
                "amount": 0,
                "unit": ""
            },
            {
                "name": "Kaempferol",
                "amount": 0.91,
                "unit": "mg"
            },
            {
                "name": "Myricetin",
                "amount": 0.08,
                "unit": "mg"
            },
            {
                "name": "Quercetin",
                "amount": 0.5,
                "unit": "mg"
            },
            {
                "name": "Theaflavin-3,3'-digallate",
                "amount": 0,
                "unit": ""
            },
            {
                "name": "Theaflavin-3'-gallate",
                "amount": 0,
                "unit": ""
            },
            {
                "name": "Theaflavin-3-gallate",
                "amount": 0,
                "unit": ""
            },
            {
                "name": "Gallocatechin",
                "amount": 0,
                "unit": "mg"
            }
        ],
        "caloricBreakdown": {
            "percentProtein": 4.43,
            "percentFat": 3.01,
            "percentCarbs": 92.56
        },
        "weightPerServing": {
            "amount": 826,
            "unit": "g"
        }
    },
    "categoryPath": [
        "tropical fruit",
        "fruit"
    ]
};

const stefExampleOutput =   ["apple", {
    calories: "1k",
    carbs: "16g",
    fat:"107g",
    protein:"20g"
}]

