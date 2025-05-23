
// récupère les données du fichier recette.json
async function fetchData() {
    const response = await fetch("assets/data/recette.json");
    const data = await response.json();
    const recipes = data.recipes; 
    return recipes;
}

// Créer des balises, class etc...et affiche les données choisie depuis le fichier recette.json
async function displayRecipes(recipes) 
{
    const container = document.querySelector("#recipesContainer");
    container.innerHTML = " ";

    recipes.forEach(recipe => {
        const article = document.createElement("article");
        article.classList.add("recipe-card");

        const title = document.createElement("h2");
        title.textContent = recipe.name;

        const servings = document.createElement("p");
        servings.innerHTML = `<strong>Nombre de personnes :</strong> ${recipe.servings}`;

        const ul = document.createElement("ul");
        recipe.ingredients.forEach(element => {
            const li = document.createElement("li");
            li.textContent = element.ingredient;
            ul.appendChild(li);
        })

        // ----

        const button = document.createElement("button");
        button.classList.add("open");
        button.addEventListener("click" , () => popupWindow(recipe));
        button.innerHTML = `open`;


        article.append(title, servings, ul, button);
        container.appendChild(article);
    })
}

// Récupère les données entré dans la barre de recherche - vérifie si il y a concordance entre les titres des recettes et la recherche
async function main()
{
    const searchInput = document.querySelector("#searchInput").value.replaceAll(' ', '').toUpperCase().trim();
    let data = await fetchData();

    let newData = data.filter((element) =>  {
        return element.name.toUpperCase().includes(searchInput.replaceAll(' ', '').toUpperCase().trim())

    });
    displayRecipes(newData);
}

// créer des balises et affiche des données dans une fenêtre popup
function popupWindow(recipe)
{
    openModal();

    const popup = document.querySelector(".popup");
    popup.innerHTML = " ";

        popup.innerHTML = `
            <h2>${recipe.name}</h2>
            <p><strong>Nombre de personnes :${recipe.servings}</p>
            <ul><span>ingrédients</span><hr><br>

        ${recipe.ingredients.map(element => {
            const unitTrue = element.unit ? ` ${element.unit}` : "";
            const quantityTrue = element.quantity ? `${element.quantity}` : "";
            return `<li>${element.ingredient} : ${quantityTrue}${unitTrue}</li>`;
        }).join('')}

            <p><span>Description : </span><br> ${recipe.description}</p>
            <p><span>Temps : </span>${recipe.time} min</p>
            <p><span>Ustensile : </span><br>${recipe.ustensils}</p>
            <p><span>Appareil : </span><br>${recipe.appliance}</p><br>

        <button class="close" onclick="closeModal()">Fermer</button>

        </ul>`;
        
}


function openModal()
{
    document.querySelector(".popup").style.display = "block";
}
function closeModal()
{
    document.querySelector(".popup").style.display = "none";
}

main();