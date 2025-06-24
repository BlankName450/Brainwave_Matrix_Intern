function ToggleMenu() {
    const nav = document.querySelector('.navigation-row');
    nav.classList.toggle('active');
  }

  // Mapping recipe keys to data
const recipes = {
    "creamy-chicken-pasta": {
      title: "Creamy Garlic Chicken Pasta",
      image: "garlic.jpg",
      type: "Main Course",
      cuisine: "Italian-inspired comfort food",
      flavor: "Rich, savory, garlicky with creamy umami depth",
      ingredients: [
        "200g pasta",
        "2 chicken breasts",
        "4 garlic cloves, minced",
        "1 cup heavy cream",
        "1/4 cup grated Parmesan",
        "Salt and pepper to taste",
        "Olive oil"
      ],
      steps: [
        "Boil pasta until al dente. Drain and set aside.",
        "Cook chicken in olive oil until golden, remove and slice.",
        "In the same pan, sauté garlic until fragrant.",
        "Add cream and Parmesan. Simmer for 3–5 minutes.",
        "Add chicken and pasta. Mix and season.",
        "Serve hot with extra cheese if desired."
      ]
    },
    "beef-tacos": {
      title: "Street-Style Spicy Beef Tacos",
      image: "tacos.jpg",
      type: "Main or Snack",
      cuisine: "Mexican-inspired",
      flavor: "Smoky, spicy, savory with crunchy and fresh textures",
      ingredients: [
        "500g minced beef",
        "Taco shells",
        "1 onion, chopped",
        "Chili powder, cumin, paprika",
        "Lettuce, tomato, cheese, sour cream"
      ],
      steps: [
        "Cook onion and beef until browned.",
        "Add spices and cook for 2 more minutes.",
        "Fill taco shells with beef and toppings.",
        "Serve immediately."
      ]
    },
    "avocado-quinoa-salad": {
      title: "Avocado & Quinoa Power Salad",
      image: "salad.jpg",
      type: "Salad / Light Lunch",
      cuisine: "Modern Healthy",
      flavor: "Fresh, nutty, citrusy, and creamy",
      ingredients: [
        "1 cup cooked quinoa",
        "1 avocado, diced",
        "Cherry tomatoes, halved",
        "Cucumber, chopped",
        "Lemon juice, olive oil, salt & pepper"
      ],
      steps: [
        "Mix quinoa with veggies in a bowl.",
        "Drizzle lemon juice and olive oil.",
        "Toss and serve chilled."
      ]
    },
    "miso-ramen": {
  title: "Miso Ramen with Soft-Boiled Egg",
  image: "Miso.jpg",
  type: "Soup / Noodle Bowl",
  cuisine: "Japanese",
  flavor: "Umami-rich, savory, mildly salty",
  ingredients: [
    "2 packs ramen noodles",
    "4 cups chicken or veggie broth",
    "2 tbsp miso paste",
    "1 tbsp soy sauce",
    "2 boiled eggs",
    "Green onions, nori, corn, sesame oil"
  ],
  steps: [
    "Boil broth and stir in miso paste and soy sauce.",
    "Cook ramen noodles separately and drain.",
    "Place noodles in a bowl and pour broth over.",
    "Top with halved boiled egg, nori, corn, and green onions.",
    "Drizzle with sesame oil and serve hot."
  ]
},
"honey-garlic-wings": {
  title: "Baked Honey Garlic Chicken Wings",
  image: "Wings.jpg",
  type: "Appetizer / Party Food",
  cuisine: "American / Asian Fusion",
  flavor: "Sweet, sticky, garlicky, with a hint of heat",
  ingredients: [
    "1 kg chicken wings",
    "1/4 cup soy sauce",
    "1/4 cup honey",
    "2 garlic cloves, minced",
    "1 tbsp sriracha (optional)",
    "Salt & pepper"
  ],
  steps: [
    "Preheat oven to 200°C (400°F).",
    "Season wings and bake for 30–40 minutes until crispy.",
    "In a saucepan, combine honey, soy sauce, garlic, and sriracha. Simmer until slightly thickened.",
    "Toss cooked wings in the sauce and serve."
  ]
},
"chickpea-tikka-masala": {
  title: "Classic Chickpea Tikka Masala",
  image: "tikka.jpg",
  type: "Main Course (Vegetarian)",
  cuisine: "Indian",
  flavor: "Creamy, spiced, aromatic, and bold",
  ingredients: [
    "2 cups cooked chickpeas",
    "1 onion, chopped",
    "2 cloves garlic, minced",
    "1 tsp garam masala, cumin, turmeric",
    "1 cup tomato puree",
    "1/2 cup coconut milk or cream",
    "Oil, salt to taste"
  ],
  steps: [
    "Sauté onion and garlic until soft.",
    "Add spices and cook for 1–2 minutes.",
    "Stir in tomato puree and simmer.",
    "Add chickpeas and coconut milk. Cook for 10 minutes.",
    "Serve with rice or naan."
  ]
},
"halloumi-pesto-sandwich": {
  title: "Grilled Halloumi & Pesto Sandwich",
  image: "halloumi.jpg",
  type: "Brunch / Gourmet Sandwich",
  cuisine: "Mediterranean",
  flavor: "Salty, herbaceous, tangy, grilled",
  ingredients: [
    "Sliced halloumi cheese",
    "Ciabatta or sourdough bread",
    "2 tbsp pesto",
    "Tomato slices",
    "Olive oil"
  ],
  steps: [
    "Grill halloumi slices until golden.",
    "Toast bread and spread pesto on each slice.",
    "Layer with tomato and halloumi.",
    "Assemble and grill sandwich for 2–3 minutes if desired."
  ]
},
"shakshuka": {
  title: "Shakshuka (Eggs in Spicy Tomato Sauce)",
  image: "Shakshuka.webp",
  type: "Breakfast / Brunch",
  cuisine: "Middle Eastern / North African",
  flavor: "Tangy, spiced, herby",
  ingredients: [
    "4 eggs",
    "1 can diced tomatoes",
    "1 onion, sliced",
    "1 bell pepper, sliced",
    "1 tsp paprika, cumin",
    "Fresh parsley",
    "Olive oil, salt"
  ],
  steps: [
    "Sauté onion and pepper in oil until soft.",
    "Add spices and tomatoes. Simmer 10 minutes.",
    "Make small wells and crack eggs in.",
    "Cover and cook until eggs set.",
    "Garnish with parsley and serve with bread."
  ]
},
"blueberry-muffins": {
  title: "Lemon Blueberry Muffins",
  image: "muffins.jpg",
  type: "Dessert / Baked Goods",
  cuisine: "American / Bakery",
  flavor: "Tart, sweet, moist, buttery",
  ingredients: [
    "1 1/2 cups flour",
    "1/2 cup sugar",
    "1 tsp baking powder",
    "1/2 tsp salt",
    "1 egg",
    "1/2 cup milk",
    "1/4 cup butter, melted",
    "1 cup blueberries",
    "Zest of 1 lemon"
  ],
  steps: [
    "Preheat oven to 180°C (350°F).",
    "Mix dry ingredients in one bowl.",
    "In another bowl, mix wet ingredients and lemon zest.",
    "Combine wet and dry, then fold in blueberries.",
    "Spoon into muffin tin and bake 20–25 minutes."
  ]
}
  };
  
  // Function to get query param
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  // Load recipe
  const recipeName = getQueryParam("name");
  const recipe = recipes[recipeName];
  
  
  if (recipe) {
    document.getElementById("recipe-title").textContent = recipe.title;
    document.getElementById("dish-type").textContent = recipe.type;
    document.getElementById("cuisine").textContent = recipe.cuisine;
    document.getElementById("flavor-profile").textContent = recipe.flavor;
  
    // Safely set the image if defined
    const recipeImg = document.getElementById("recipe-image");
    recipeImg.src = recipe.image || "images/placeholder.jpg";
    recipeImg.alt = recipe.title;
  
    // Ingredients
    const ingredientsList = document.getElementById("ingredients-list");
    recipe.ingredients.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ingredientsList.appendChild(li);
    });
  
    // Steps 
    const stepsList = document.getElementById("steps-list");
    recipe.steps.forEach(step => {
      const li = document.createElement("li");
      li.textContent = step;
      stepsList.appendChild(li);
    });
  }
   else {
    document.querySelector(".recipe-detail").innerHTML = `
      <h1>Recipe Not Found</h1>
      <p>The recipe you're looking for doesn't exist.</p>
      <a href="index.html">← Back to Home</a>
    `;
  }