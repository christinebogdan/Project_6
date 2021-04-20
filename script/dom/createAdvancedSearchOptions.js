const ingredientsSearchOptions = document.querySelector(
  "#ingredientOptions .row"
);
const applianceSearchOptions = document.querySelector("#applianceOptions .row");
const ustensilsSearchOptions = document.querySelector("#ustensilOptions .row");

// create dom elements for advanced search based on noDouplicateArrays and search topic
export function createAdvancedSearchOptions(array, topic) {
  // let domParent = topic;
  let domParent;
  if (topic === "ingredients") {
    domParent = ingredientsSearchOptions;
  } else if (topic === "appliance") {
    domParent = applianceSearchOptions;
  } else if (topic === "ustensils") {
    domParent = ustensilsSearchOptions;
  }

  domParent.innerHTML = "";

  array.forEach((element) => {
    let domChild = document.createElement("p");
    domChild.classList.add(
      "col-xs-12",
      "col-lg-4",
      "col-md-6",
      "mb-c7",
      "filter-option"
    );
    domChild.textContent = element.charAt(0).toUpperCase() + element.slice(1);
    domChild.setAttribute("data-filter", domChild.textContent.toLowerCase());
    domChild.setAttribute("data-topic", topic);
    domChild.setAttribute("data-hide", "false");

    domParent.appendChild(domChild);
  });
}
