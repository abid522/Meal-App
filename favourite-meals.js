let list = document.querySelector('.list-group');
let favouriteMealCount = localStorage.length;

if (favouriteMealCount > 0) {
    displayFavouriteMeals();
} else {
    list.innerHTML = `
        <h2 class="mt-5 mb-3">You don't have any favourite meal yet!</h2>
    `
}

function displayFavouriteMeals() {
    for (let i = 0; i < favouriteMealCount; i++) {
        let li = document.createElement('li');
        li.id = localStorage.key(i);                       //this id will be used for deletion of fvrt meal
        li.className = 'list-group-item';
        li.innerHTML = `
            <div class="d-flex justify-content-between">
                <div>
                    <h5>${localStorage.getItem(localStorage.key(i))}</h5>
                </div>
                <div>
                    <span onclick="deleteFavourite(${localStorage.key(i)})">
                        <i class="fa-solid fa-trash-can" style="color: #dd0303;"></i>
                    </span>
                </div>
            </div>
        `;
        list.appendChild(li);
    }
}

function deleteFavourite(id) {
    localStorage.removeItem(id);
    document.getElementById(id.toString()).remove();
    if (localStorage.length == 0) {
        list.innerHTML = `
            <h2 class="mt-5 mb-3">You don't have any favourite meal yet!</h2>
        `
    }
}