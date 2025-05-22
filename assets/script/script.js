

async function fetchData() {
    const response = await fetch("assets/data/recette.json");
    const data = await response.json();
    const recipes = data.recipes; 
    return recipes;
}

async function displayRecipes(recipes) 
{


    const container = document.querySelector("#recipesContainer");
    container.innerHTML = " ";

    recipes.forEach(recipe => {
        const article = document.createElement("article");
        article.classList.add("recipe-card")
        article.innerHTML = `
      <h2>${recipe.name}</h2>
      <p><strong>Nombre de personnes :${recipe.servings}</p>
      <ul>

        ${recipe.ingredients.map((element) => {
         return `<li>${element.ingredient}</li>`
        })}

      </ul>
        `;
        container.appendChild(article);
    })

}

function searchFilter() 
{
    recipes.forEach(recipe => {

    })
            
}



async function main()
{
    const searchInput = document.querySelector("#searchInput").value.replaceAll(' ', '').toUpperCase().trim();
    let data = await fetchData();

    let newData = data.filter((element) =>  {
        return element.name.toUpperCase().includes(searchInput.replaceAll(' ', '').toUpperCase().trim())

    });
    displayRecipes(newData);

}

main();