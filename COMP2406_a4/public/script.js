var recipesDiv = document.getElementById('recipes');
var ingredientTextField = document.getElementById('ingredient');

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = () => {
  if (xhr.readyState == 4 && xhr.status == 200) {
    let recipes = JSON.parse(xhr.responseText)
    if (recipes.length == 0) recipesDiv.innerHTML += `<p class=notfound><bold>No recipe found</bold></p>`
    let a = "<table>";
    //a += "<tr></tr>";
    //console.log(a);
    let cellCounter = 0;
    for (let recipe of recipes ){
      let img = recipe.image_url;
      let title = recipe.title;
      let recipeURL = recipe.f2f_url;
      if (cellCounter % 3 == 0) a += `<tr>`;
      a += `<td>
            <a href=\"${recipeURL}\" target=\"_blank\">
            <image src= \"${img}\" width=300 height=200>
            <p class=\"title\">
            <bold>
            ${title}
            </bold>
            </p>
            </a>
            </td>`;
      cellCounter++;
      if (cellCounter % 3 == 0) a += `</tr>`;
    }
    a += "</table>";
    recipesDiv.innerHTML += a;
  }
}

function getRecipes(){
  let ingredientName = ingredientTextField.value;
  if (ingredientName === '') return alert('Please enter a ingredient');
  recipesDiv.innerHTML = ''
  xhr.open('POST', `/recipes?ingredient=${ingredientName}`, true);
  xhr.send();
}

const ENTER=13
document.getElementById("ingredient")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === ENTER) {
        document.getElementById("submit").click();
    }
});

if (ingredientTextField.value != "")getRecipes();
