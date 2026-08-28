function checkRecipe() {

    const recipeRef = document.querySelector("#recipeName");
    const divRef = document.querySelector("#recipe");

    const recipeName = recipeRef.value.trim();

    if (recipeName === "") {
        divRef.innerHTML = "<h4>Please enter a recipe name!</h4>";
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            if (data.meals === null) {
                divRef.innerHTML = "<h4>Recipe not found :(</h4>";
                return;
            }

            divRef.innerHTML = "";

            data.meals.forEach((meal) => {

                divRef.innerHTML += `
                    <div>
                        <img 
                            src="${meal.strMealThumb}" 
                            alt="${meal.strMeal}" 
                            width="300"
                        >

                        <h2>${meal.strMeal}</h2>

                        <p>
                            <b>Category:</b> ${meal.strCategory}
                        </p>

                        <p>
                            <b>Area:</b> ${meal.strArea}
                        </p>

                        <p>
                            <b>Instructions:</b><br>
                            ${meal.strInstructions}
                        </p>
                    </div>

                    <hr>
                `;
            });
        })
        .catch((err) => {

            console.log(err);
            divRef.innerHTML = "<h4>Something went wrong!</h4>";

        });
}