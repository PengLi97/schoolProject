const express = require('express');
const requestModule = require('request');
//const url = require('url');
//let qstring = require('querystring');
const PORT = process.env.PORT || 3000;

const API_KEY = 'c0b2de2c20d4c8a318846cd0b411a93c';

const app = express();

function getRecipes(ingredient, res){
  const options = {
     host: 'www.food2fork.com',
     path: `/api/search?q=${ingredient}&key=${API_KEY}`
  }

}

//Middleware
app.use(express.static(__dirname + '/public')) //static server
//Routes
app.get('/recipes.html', (request, response) => {
  response.sendFile(__dirname + "/html/index.html");
});
app.get('/index.html', (request, response) => {
  response.sendFile(__dirname + "/html/index.html");
});
app.get('/', (request, response) => {
  response.sendFile(__dirname + "/html/index.html");
});
app.post('/recipes', (request, response) => {
  let ingredient = request.query.ingredient?request.query.ingredient:request.query.ingredients;
  const url = `https://www.food2fork.com/api/search?q=${ingredient}&key=${API_KEY}`;
  requestModule.get(url, (err, res, data) => {
    response.contentType('application/json').json(JSON.parse(data).recipes);
  });
});


//functional route
app.get('/recipes', (request, response) => {
  let ingredient = request.query.ingredient?request.query.ingredient:request.query.ingredients;
  if (!ingredient) {
    response.sendFile(__dirname + "/html/index.html");
    return;
  }
  let html = `<!DOCTYPE html>
  <html lang="en">

  <head>
      <title>1 2 Sunshine!</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="styles.css">
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
  </head>

  <body>
      <div class="container">
          <div class="wrapper">
              Enter Ingredient(Separated with comma): `;
  html += `<input type="text" value=${ingredient} name="citingredient" id="ingredient" />`
  html += `<button id="submit" onclick="getRecipes()" style="margin-bottom: 50px;">Submit</button>
</div>
<div id="recipes"></div>
</div>

<script src="script.js"></script>
</body>

</html>`;
  response.send(html);
});

//start server
app.listen(PORT, err => {
  if (err) console.log(err);
  else {
    console.log(`Server listening on port: ${PORT}, CNTL-C to quit`);
    console.log(`To Test as default:
      http://localhost:3000/recipes.html
      http://localhost:3000/recipes
      http://localhost:3000/index.html
      http://localhost:3000/
      http://localhost:3000`);
    console.log(`To Test with ingredient:
      http://localhost:3000/recipes?ingredients=Your_ingredient`);
  }
});
