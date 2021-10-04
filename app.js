const searchArea = document.querySelector("form");
const searchResult = document.getElementById("result");
let searchQuery = "";
const APP_ID = "fc1c76db";
const APP_key = "0b0039f2ea172909773db23731b5c155"



searchArea.addEventListener("submit", (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector("input").value;
    // console.log(searchQuery)

    fetchAPI();
})

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=${20}`;
    const response = await fetch(baseURL);
    const data = await response.json()
    console.log(data)
    generateHTML(data.hits);
}

function generateHTML(results) {
    document.querySelector("h1").classList.add("active-header-text");
    let generatedHTML = "";
    results.map(result => {
        generatedHTML += `
        <div class="result-container">
        <img src="${result.recipe.image}" alt="result-img" class="result-img">
        <div class="result-details">
            <h3 class="result-name">${result.recipe.label}</h3>
            <a href="${result.recipe.url}" class="view-result">View Recipe</a>
        </div>
        <p class="result-data-1">Calories:${result.recipe.calories.toFixed(0)}</p>
    </div>`
    })

    searchResult.innerHTML = generatedHTML;
}