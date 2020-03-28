$(function () {
    console.log("Its working")

    const url = "https://api.spoonacular.com/recipes/search?query="
    const apiKey = "&apiKey=502be8db956a4d2581735d3ceced3501&diet=vegan"

    $("button").click((event) => {
        // event.preventDefault()
        console.log("button pushed")

        const newIngredient = $("#searchBar").val()
        console.log(newIngredient)
        getRecipes(newIngredient)

    })

    

    async function getRecipes(query) {
        const response = await axios.get(`${url}${query}${apiKey}`)
        console.log(response.data.results)

        // .map((recipe)=> { return recipe.title})
    }

    // function displayRecipes () {
        
    // }

})


// function displayResults (gifs) {
//     console.log(gifs)
//     gifs.forEach((gif) => {
//       $('#results-table tbody').append(
//         `<tr>
//           <td>${gif.title}</td>
//           <td><img src="${gif.images.fixed_height.url}"></td>
//           <td>${gif.rating}</td>
//           <td><a href="${gif.url}"> link </a></td>
//         </tr>`
//       )
//     })
//   }