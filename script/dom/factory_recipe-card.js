// factory to create recipe cards
export class recipeCard {
  constructor(recipe) {
    this.recipe = recipe;
  }

  _createIngredientList(data) {
    const ingredients = document.createElement("div");
    ingredients.classList.add("card-text", "col-6", "recipe-ingredients");
    let ingredient = ``;
    data.forEach((element) => {
      if (element.ingredient && element.quantity && element.unit) {
        if (element.unit.length < 3) {
          ingredient += `<p class="m-0"><span class="fw-bolder">${element.ingredient}:</span> ${element.quantity}${element.unit}</p>`;
        } else {
          ingredient += `<p class="m-0"><span class="fw-bolder">${element.ingredient}:</span> ${element.quantity} ${element.unit}</p>`;
        }
      } else if (element.ingredient && element.quantity) {
        ingredient += `<p class="m-0"><span class="fw-bolder">${element.ingredient}:</span> ${element.quantity}</p>`;
      } else {
        ingredient += `<p class="m-0"><span class="fw-bolder">${element.ingredient}</span></p>`;
      }
      ingredients.innerHTML = ingredient;
    });

    return ingredients;
  }

  create() {
    const recipeCol = document.createElement("div");
    recipeCol.classList.add("col-12", "col-md-6", "col-lg-4", "recipeCard");
    recipeCol.setAttribute("data-found", "true");
    recipeCol.id = this.recipe.id;
    // create card container
    const card = document.createElement("div");
    card.classList.add("card", "p-0", "recipe", "border-0");
    card.setAttribute("data-id", this.recipe.id);
    // create card image container
    const cardImg = document.createElement("div");
    cardImg.classList.add("card-img-top", "rounded-top");
    // create card body container
    const cardBody = document.createElement("div");
    cardBody.classList.add(
      "card-body",
      "p-c3",
      "overflow-hidden",
      "rounded-bottom"
    );

    // create body content
    const titleRow = document.createElement("div");
    titleRow.classList.add("d-flex", "mb-c3", "justify-content-between");
    const textRow = document.createElement("div");
    textRow.classList.add("d-flex", "overflow-hidden", "card-text-row");
    // recipe title
    const recipeTitle = document.createElement("h5");
    recipeTitle.textContent = this.recipe.name;
    recipeTitle.classList.add("card-title", "recipe-title", "m-0");
    // recipe time
    const recipeTime = document.createElement("div");
    recipeTime.classList.add("text-end", "recipe-time", "flex-shrink-0");
    recipeTime.innerHTML = `<i class='bi bi-clock px-2'></i>${this.recipe.time} min`;
    // recipe ingredients
    const recipeIngredients = this._createIngredientList(
      this.recipe.ingredients
    );
    // const recipeIngredients = document.createElement("div");
    recipeIngredients.classList.add(
      "card-text",
      "col-6",
      "recipe-ingredients",
      "pe-1"
    );

    // recipe instructions
    const recipeInstructions = document.createElement("div");
    recipeInstructions.classList.add(
      "card-text",
      "col-6",
      "recipe-instructions"
    );
    recipeInstructions.textContent = this.recipe.description;

    // append all
    recipeCol.appendChild(card);
    card.appendChild(cardImg);
    card.appendChild(cardBody);
    titleRow.appendChild(recipeTitle);
    titleRow.appendChild(recipeTime);
    textRow.appendChild(recipeIngredients);
    textRow.appendChild(recipeInstructions);
    cardBody.appendChild(titleRow);
    cardBody.appendChild(textRow);

    return recipeCol;
  }
}
