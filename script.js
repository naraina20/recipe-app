const searchbar = document.querySelector("form");
const searchresult = document.querySelector('.search-result');
const container = document.querySelector('.container');
const brandname = document.querySelector('.brand-name')
const searcharea = document.querySelector('.search-bar')
let searchquery = "";
const app_id = 'b72fdf53';
const app_key = '3bde8e7a3782500caedfa17d0e41d936';

searchbar.addEventListener('submit', (e) => {
    e.preventDefault();
    searchquery = e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI() {
    brandname.classList.remove('initial-name')
    searcharea.classList.remove('initial-bar')
    const baseURL = `https://api.edamam.com/search?q=${searchquery}&app_id=${app_id}&app_key=${app_key}&from=0&to=40`
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML(results) {

    let generatedHTML = '';
    results.map((container) => {
        generatedHTML += `<div class="container">
        <div class="result">
            <div class="image">
                <img src="${container.recipe.image}" alt="">
            </div>
            <div class="detail">
                <h2>NAME : ${container.recipe.label}</h2>
                <h2>CALORIE : ${container.recipe.calories.toFixed(2)}</h2>
                <a href="${container.recipe.url}"><button>view details</button></a>
                <p class="item-data"><h2>Diet label:</h2> ${container.recipe.dietLabels.length > 0 ? container.recipe.dietLabels
                      : "No Data Found"
                  }</p>
                  <p class="item-data"><h2>ingredients:</h2> ${container.recipe.ingredientLines}</p>
            </div>
        </div>
    </div>`
    });
    searchresult.innerHTML = generatedHTML;
}