let title = document.getElementsByTagName('title');
let imageContainer = document.querySelector('#image-container');
let instructionContainer = document.querySelector('#instruction-container');

let urlParam = new URLSearchParams(window.location.search);
let mealId = urlParam.get('id');

fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => {
        let meal = data.meals[0];
        title.innerText = meal.strMeal;
        imageContainer.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="mealImg" class="img-fluid rounded">
        `;
        instructionContainer.innerHTML = `
            <u><p class="lead"><b>Instructions: </b></p></u>
            <p class="lead text-justify">
                ${meal.strInstructions}
            </p>
            <a href="./index.html" class="btn btn-primary mb-5">Go to Home</a>
        `
    })
    .catch(err => console.error(err));