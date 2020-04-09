$(function() {
  console.log("Its working");
  // const url = "https://api.spoonacular.com/recipes/search?query="
  // const apiKey = "&apiKey=502be8db956a4d2581735d3ceced3501&diet=vegan"

  $("button").click(async () => {
    console.log("button pushed");

    const newIngredient = $("#searchBar").val();
    console.log(newIngredient);
    // const recipes = await getRecipes(newIngredient);
    // displayRecipes(recipes)
    processRequest(newIngredient)
    displayIngredients()
  });

  async function processRequest(ingredient) {
    const recipes = await getRecipes(ingredient);
    console.log(recipes)

    // We need to use Promise.all() using map() with promises
    // see this post: https://futurestud.io/tutorials/node-js-how-to-run-an-asynchronous-function-in-array-map
    detailedRecipes = await Promise.all(
      recipes.map(async(recipe) => {
        const newRecipe = await getRecipeDetail(recipe.id)
        return newRecipe
      })
    )

    console.log(detailedRecipes)
    displayRecipes(detailedRecipes)
  }

  async function getRecipes(query) {
    try {
      const url = "https://api.spoonacular.com/recipes/search";

      const response = await axios.get(url, {
        params: {
          query: query,
          apiKey: "502be8db956a4d2581735d3ceced3501",
          diet: "vegan"
        }
      });
      // const apiKey = "&apiKey=502be8db956a4d2581735d3ceced3501&diet=vegan"
      // const response = await axios.get(`${url}${query}${apiKey}`)
      // console.log(response.data.results);
      return response.data.results

      // return recipes.map(async(recipe) => {
      //   return await getRecipeDetail(recipe.id)
      // })
      // console.log(response.data.results.title)
    } catch (error) {
      console.log(error);
      alert("an error has occurred, please try again");
    }
  }

  async function getRecipeDetail (recipeId) {
    try {
      const url = `https://api.spoonacular.com/recipes/${recipeId}/information`;

      const response = await axios.get(url, {
        params: {
          apiKey: "502be8db956a4d2581735d3ceced3501",
          includeNutrition: true
        }
      });
      // console.log(response.data);
      return response.data
    } catch (error) {
        console.log(error);
        alert("an error has occurred, please try again");
    }
  }

  function displayRecipes (recipes) {
    const itemsHtml = recipes.map((recipe) => {
      console.log(recipe)
      return recipeListItemHtml(recipe.title, "vegan", `${recipe.readyInMinutes} mins`, `${recipe.servings} servings`, recipe.image)
    })
    console.log(itemsHtml)
    $("tbody").html(itemsHtml)
  }

  function recipeListItemHtml(name, diet, duration, servings, image) {
    return (
      `<tr>
        <td>${name}</td>
        <td>${diet}</td>
        <td>${duration}</td>
        <td>${servings}</td>
        <td>${image}</td>
      </tr>
      `
    )
  }

  function displayIngredients(){
    const searchedItem = $('#searchbar').val()
    console.log(searchedItem)
    $("ul").text(searchedItem)
  }

  
});
