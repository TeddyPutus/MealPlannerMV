async function fetchData() { 
    //Saving the API response in a constant 
    const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=apple&pageSize=2&api_key=6fTyWGQxFzXX4Dua9vre4lPqQAydkltkUeUvuoSX`); 
    if (response.status === 404) { 
        alert(`${input} is not a valid ingredient... Please try again.`); 
        return true; 
    } 
    const data = await response.json(); 
    console.log(data); 
} 
fetchData();