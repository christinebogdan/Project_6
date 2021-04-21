import { removeSearchTag } from "./removeSearchTag.js";

// ------------------------ CREATE TAGS ------------------------ //

export function createSearchTag(filterItem, topic) {
  // create tag container
  const searchTagContainer = document.querySelector("#search-tags");
  const tag = document.createElement("div");
  tag.classList.add(
    "search-tag",
    "rounded",
    "d-flex",
    "align-items-center",
    "justify-content-between",
    "text-white",
    "px-c3",
    "me-2"
  );
  // set color depending on filter topic
  if (topic === "ingredients") {
    tag.classList.add("bg-primary");
  } else if (topic === "appliance") {
    tag.classList.add("bg-success");
  } else if (topic === "ustensils") {
    tag.classList.add("bg-danger");
  }
  // set tag content and x close button
  const tagContent = document.createElement("span");
  tagContent.classList.add("d-inline-block", "me-c2");
  tagContent.textContent = filterItem;
  const removeTagButton = document.createElement("i");
  removeTagButton.classList.add("bi", "bi-x-circle");

  // add event listener to close button
  removeTagButton.addEventListener("click", removeSearchTag);

  tag.setAttribute("data-topic", topic);
  tag.setAttribute("data-filter", filterItem.toLowerCase());

  // append all
  tag.appendChild(tagContent);
  tag.appendChild(removeTagButton);
  searchTagContainer.appendChild(tag);
}
