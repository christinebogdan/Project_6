# Les Petits Plats | Recipe Search Tool

## Developed Skills

- Deconstruct a computational problem
- Develop an algorithm to solve a problem

## Description

Les Petits Plats is a website, where users can search for recipes.

Aim of the project was to create a prototype for the website with a **search functionality**. A mockup was provided as well as a JSON, containing 50 recipes, to mimic the data structure on the database.

The user should be able to filter recipes along **two axes**:

1. A **main bar to search for words** or groups of letters in the title,
   ingredients, or description.
1. **Search by keywords** in ingredients, utensils, or appliances.

## Objectives

### CONTENT

- Build the interface using Bootstrap

### SEARCH FUNCTIONALITY

#### Preparation

- **feature Investigation Form** on the main search algorithm to compare the two search algorithms developed and to indicate which is the recommended choice.
- **test performance** and determine # of operations per second
- UML **Activity Diagrams** for the core search algorithms
- UML **Activity Diagram** for the entire search functionality including main serach and keyword search

Details:

- The search must be able to be done **via the main field** or **via the tags**
  (ingredients, utensils or device)
- The main search begins when the **user enters 3 characters** in the search bar
- The search is **updated for each new character** entered
- The main search **displays** the first **results as soon as possible**
- The ingredients, utensils and device fields of the **advanced search** only
  suggest recipes from those present on the page
- **Search returns** must be an **intersection of results**. If tags "coconut" and "chocolate" are added to ingredients, results should show only recipes that have both coconut and chocolate

## Requirements

- must pass W3C validation for HTML and CSS without errors
- must be responsive
- use ESLint
- use Bootstrap 4 for the interface
- must use no library for the JavaScript of the search engine

## Challenges & Achievements

- use of modules to organize JavaScript code

## Demo

[Link to website](https://christinebogdan.github.io/p5_RecipeSearchEngine/)

# <img src="./Screenshots/desktop_1.png">
