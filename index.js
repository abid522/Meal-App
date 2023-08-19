let mealSearch = document.querySelector('#meal-search');
let searchButton = document.querySelector('#search-button');
let matchList = document.querySelector('#match-list');
let favouriteButton = document.querySelector('#favourite-button');

let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

let searchStates = searchText => {
    fetch(url + searchText)
        .then(res => res.json())
        .then(data => {
            let matches = data.meals; // Extracting meals array from response
            if (!searchText) {
                matches = [];
                matchList.innerHTML = ''; // Clearing matchList content
            }
            outputHtml(matches);
        })
        .catch(err => console.log(err));
};

let outputHtml = matches => {
    if (matches.length > 0) {
        let html = matches
            .map(
                match => `
                <div class="card card-body mb-1">
                    <div class="d-flex justify-content-between">
                        <div>
                            <a href="./meal-detail.html?id=${match.idMeal}" style="text-decoration:none">
                                <h6>${match.strMeal}</h6>
                            </a>
                        </div>
                        <div onclick="addFavourite(${match.idMeal})">
                            <i id="${match.idMeal}" class="${localStorage.getItem(match.idMeal) ? 'fa-solid' : 'fa-regular'} fa-heart" style="color: #e90101;"></i>
                        </div>
                    </div>                   
                </div>              
                `
            )
            .join('');

        matchList.innerHTML = html; // Updating matchList content
    } else {
        matchList.innerHTML = ''; // Clearing matchList content if no matches
    }
};

mealSearch.addEventListener('input', () => searchStates(mealSearch.value));

function addFavourite(id) {
    let list = document.getElementById(id.toString()).classList;
    if (list.contains('fa-regular')) {
        list.remove('fa-regular');
        list.add('fa-solid');
        //add meal to the favourite list
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(res => res.json())
            .then(data => {
                let meal = data.meals[0];
                localStorage.setItem(meal.idMeal, meal.strMeal);
            })
            .catch(err => console.log(err));
    } else {
        list.remove('fa-solid');
        list.add('fa-regular');
        //remove meal from the favourite list
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(res => res.json())
            .then(data => {
                let meal = data.meals[0];
                localStorage.removeItem(meal.idMeal);
            })
            .catch(err => console.log(err));
    }
}


// let mealSearch = document.querySelector('#meal-search');
// let searchButton = document.querySelector('#search-button');
// let matchList = document.querySelector('#match-list');

// let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

// let searchStates = searchText => {
//     fetch(url + searchText)
//         .then(res => res.json())
//         .then(data => {
//             let matches = data.meals;
//             if (searchText.length == 0) {
//                 matches = [];
//                 matchList = '';
//             };
//             outputHtml(matches);
//         })
//         .catch(err => console.log(err))
// }

// let outputHtml = matches => {
//     if (matches.length > 0) {
//         let html = matches.map(match => {
//             `
//             <div class="card card-body mb-1">
//                 <h4>${match.strMeal}</h4>
//             </div>
//             `
//         }).join('');

//         console.log(html);
//         matchList.innerHTML = html;
//     }
// }

// mealSearch.addEventListener('input', () => searchStates(mealSearch.value));