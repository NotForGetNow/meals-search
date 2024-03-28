const search = document.querySelector('.search-control');
const btn = document.querySelector('.search-btn');
const mealCont = document.getElementById('meal');

async function getMeals(ingredient) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const data = await response.json();
        return data.meals;
    } catch (error) {
        console.log('Ошибка поиска блюда: ', error);
        return null;
    }
}

function displayMeals(meals) {
    mealCont.innerHTML = '';

    if (meals === null) {
        mealCont.innerHTML = '<p>Блюдо не найдено</p>';
        return;
    }

    meals.forEach(meal => {
        const mealItem = document.createElement('div');
        mealItem.classList.add('meal-item');
        mealItem.innerHTML = `
            <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>
            <div class="meal-name">
                <h3>${meal.strMeal}</h3>
                <a href="#" class="recipe-btn">Get Recipe</a>
            </div>`;
        mealCont.appendChild(mealItem);
    });
}

btn.addEventListener('click', async () => {
    const ingredient = search.value.trim();
    if (ingredient) {
        const meals = await getMeals(ingredient);
        displayMeals(meals);
    } else {
        alert('Введите ингредиент');
    }
});
