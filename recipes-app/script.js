window.addEventListener('pageshow', function(event) {
  if (event.persisted) {
    window.location.replace(window.location.pathname + '?rnd=' + Date.now());
  }
});

function ToggleMenu() {
    const nav = document.querySelector('.navigation-row');
    const overlay = document.querySelector('.menu-overlay');
    nav.classList.toggle('active');
    if (overlay) {
      if (nav.classList.contains('active')) {
        overlay.style.display = 'block';
        document.body.classList.add('menu-open');
      } else {
        overlay.style.display = 'none';
        document.body.classList.remove('menu-open');
      }
    }
    setupDarkModeToggle();
}

// Function to get query param
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Fetch recipe from TheMealDB API by ID
async function loadRecipe() {
  const recipeId = getQueryParam("id");
  if (!recipeId) {
    document.querySelector(".recipe-detail").innerHTML = `
      <h1>Recipe Not Found</h1>
      <p>No recipe ID provided.</p>
      <a href="index.html">← Back to Home</a>
    `;
    return;
  }

  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    const data = await res.json();
    const meal = data.meals && data.meals[0];
    if (!meal) {
      document.querySelector(".recipe-detail").innerHTML = `
        <h1>Recipe Not Found</h1>
        <p>The recipe you're looking for doesn't exist.</p>
        <a href="index.html">← Back to Home</a>
      `;
      return;
    }

    document.getElementById("recipe-title").textContent = meal.strMeal;
    document.getElementById("dish-type").textContent = meal.strCategory || "-";
    document.getElementById("cuisine").textContent = meal.strArea || "-";
    document.getElementById("flavor-profile").textContent = meal.strTags ? meal.strTags.replace(/,/g, ", ") : "-";

    // Set image
    const recipeImg = document.getElementById("recipe-image");
    recipeImg.src = meal.strMealThumb || "images/placeholder.jpg";
    recipeImg.alt = meal.strMeal;

    // Ingredients
    const ingredientsList = document.getElementById("ingredients-list");
    ingredientsList.innerHTML = "";
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        const li = document.createElement("li");
        li.textContent = `${ingredient}${measure && measure.trim() ? ` - ${measure}` : ""}`;
        ingredientsList.appendChild(li);
      }
    }

    // Steps (instructions)
    const stepsList = document.getElementById("steps-list");
    stepsList.innerHTML = "";
    if (meal.strInstructions) {
      meal.strInstructions.split(/\r?\n/).forEach(step => {
        if (step.trim()) {
          const li = document.createElement("li");
          li.textContent = step.trim();
          stepsList.appendChild(li);
        }
      });
    }
  } catch (err) {
    document.querySelector(".recipe-detail").innerHTML = `
      <h1>Error</h1>
      <p>Failed to load recipe details. Please try again later.</p>
      <a href="index.html">← Back to Home</a>
    `;
  }
}

// Run on page load
if (document.querySelector('.recipe-detail')) {
  loadRecipe();
}

// 1. Use spinner for loading
function showSpinner(container) {
  container.innerHTML = '<div class="spinner"><div class="spinner-dot"></div><div class="spinner-dot"></div><div class="spinner-dot"></div></div>';
}

// 2. Add fade-in to recipe cards
function fadeInCard(card) {
  card.classList.add('fade-in');
}

// 3. Dark mode toggle (moon/sun icon only, correct placement)
function setupDarkModeToggle() {
  // Remove any existing switch
  const oldSwitch = document.querySelector('.dark-mode-switch');
  if (oldSwitch) oldSwitch.remove();
  // Always find the navigation row
  const navRow = document.querySelector('.navigation-row');
  if (!navRow) return;
  const btn = document.createElement('button');
  btn.className = 'dark-mode-switch';
  btn.title = 'Toggle dark mode';
  btn.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  btn.onclick = function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    btn.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  };
  // On mobile, append after links (at the bottom of the menu)
  if (window.innerWidth <= 768 && navRow.classList.contains('active')) {
    // Remove any existing dark mode button
    const existingBtn = navRow.querySelector('.dark-mode-switch');
    if (existingBtn) existingBtn.remove();
    const links = navRow.querySelector('.primary-links-row');
    if (links) {
      links.after(btn);
    } else {
      navRow.appendChild(btn);
    }
  } else if (window.innerWidth > 768) {
    // Remove any existing dark mode button
    const existingBtn = navRow.querySelector('.dark-mode-switch');
    if (existingBtn) existingBtn.remove();
    navRow.appendChild(btn);
  }
}

window.addEventListener('resize', () => {
  setupDarkModeToggle();
});

// 4. Back-to-top button
function setupBackToTopBtn() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top-btn';
  btn.innerHTML = '↑';
  btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) btn.classList.add('show');
    else btn.classList.remove('show');
  });
}

// 5. Use spinner and fade-in in random recipes
function setupRandomRecipesHome() {
  async function loadRecipesList() {
    const recipesList = document.getElementById("recipes-list");
    if (!recipesList) return;
    showSpinner(recipesList);
    try {
      const mealPromises = Array.from({length: 12}, () =>
        fetch('https://www.themealdb.com/api/json/v1/1/random.php', { cache: 'no-store' })
          .then(r => r.json())
      );
      const mealsData = await Promise.all(mealPromises);
      const meals = mealsData.map(d => d.meals && d.meals[0]).filter(Boolean);
      recipesList.innerHTML = '';
      const row = document.createElement('div');
      row.className = 'recipe-cards-row';
      meals.forEach(meal => {
        const card = document.createElement('div');
        card.className = 'recipe-card fade-in';
        card.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <div class="recipe-content">
            <h3>${meal.strMeal}</h3>
            <div class="info">
              <p><strong>Dish Type:</strong> ${meal.strCategory || '-'}</p>
              <p><strong>Cuisine:</strong> ${meal.strArea || '-'}</p>
              <p><strong>Tags:</strong> ${meal.strTags ? meal.strTags.replace(/,/g, ', ') : '-'}</p>
            </div>
            <a href="recipe.html?id=${meal.idMeal}" class="recipes-btn">View Recipe</a>
          </div>
        `;
        fadeInCard(card);
        row.appendChild(card);
      });
      recipesList.appendChild(row);
    } catch (err) {
      recipesList.innerHTML = '<p>Failed to load recipes. Please try again later.</p>';
    }
  }
  loadRecipesList();
  window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
      window.location.replace(window.location.pathname + '?rnd=' + Date.now());
    }
  });
}

async function loadCategories() {
  const catContainer = document.getElementById("category-cards");
  if (!catContainer) return;
  catContainer.innerHTML = '<p>Loading categories...</p>';
  try {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await res.json();
    catContainer.innerHTML = '';

    // Filter out categories we don't want to display (e.g., Pork and Vegan)
    let categories = (data.categories || []).filter(cat => cat.strCategory.toLowerCase() !== 'pork');
    categories = categories.filter(cat => cat.strCategory.toLowerCase() !== 'vegan');

    // Define the desired display order for categories
    // This ensures the most important or relevant categories appear first
    const order = [
      'breakfast', 'beef', 'chicken', 'seafood', 'pasta', 'dessert',
      'lamb', 'miscellaneous', 'side', 'starter', 'vegetarian', 'goat'
    ];
    let ordered = [];
    // Add categories to the ordered list based on the custom order above
    order.forEach(name => {
      const found = categories.find(cat => cat.strCategory.toLowerCase() === name);
      if (found) ordered.push(found);
    });

    // Add a custom "Egyptian Meals" card after Seafood for regional focus
    const egyptianCard = {
      strCategory: 'Egyptian Meals',
      strCategoryThumb: 'Egyptian.png', // Use a local image for this special card
      isArea: true
    };
    const seafoodIdx = ordered.findIndex(cat => cat.strCategory.toLowerCase() === 'seafood');
    if (seafoodIdx !== -1) {
      ordered.splice(seafoodIdx + 1, 0, egyptianCard);
    } else {
      ordered.push(egyptianCard);
    }

    // Add any remaining categories from the API that weren't already included
    const added = new Set(ordered.map(cat => cat.strCategory));
    categories.forEach(cat => {
      if (!added.has(cat.strCategory)) ordered.push(cat);
    });

    // Render each category card with the appropriate image
    ordered.forEach(cat => {
      let img;
      // Use a custom image for Breakfast
      if (cat.strCategory.toLowerCase() === 'breakfast') {
        img = 'breakfast.png';
      // Use a custom image for the Egyptian Meals card
      } else if (cat.strCategory.toLowerCase() === 'egyptian meals') {
        img = 'Egyptian.png';
      // Use the Beef image for Goat (no custom Goat image available)
      } else if (cat.strCategory.toLowerCase() === 'goat') {
        img = 'beef.png';
      // For all other categories, use the image provided by the API
      } else {
        img = cat.strCategoryThumb;
      }
      let href = `category.html?c=${encodeURIComponent(cat.strCategory)}`;
      if (cat.isArea) href = 'category.html?c=Egyptian Meals';
      const card = document.createElement('a');
      card.className = 'cat-card';
      card.href = href;
      card.innerHTML = `
        <h4>${cat.strCategory}</h4>
        <img src="${img}" alt="${cat.strCategory}" onerror="this.onerror=null;this.src='default.png';">
      `;
      catContainer.appendChild(card);
    });
  } catch (err) {
    catContainer.innerHTML = '<p>Failed to load categories.</p>';
  }
}


function setupMobileNavAutoClose() {
  const nav = document.querySelector('.navigation-row');
  const links = document.querySelectorAll('.primary-links-row a');
  links.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768 && nav.classList.contains('active')) {
        nav.classList.remove('active');
      }
    });
  });
}


document.addEventListener('DOMContentLoaded', function() {

  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
  setupDarkModeToggle();
  setupBackToTopBtn();
  setupMobileNavAutoClose && setupMobileNavAutoClose();
  const nav = document.querySelector('.navigation-row');
  if (nav) nav.classList.remove('active');


  const path = window.location.pathname;
  const isHomePage =
    path === '/' ||
    path.endsWith('/index.html') ||
    path === '' ||
    path.endsWith('/recipes-app/') ||
    path.endsWith('index.html');

  if (isHomePage) {
    setupRandomRecipesHome();
    loadCategories();
  }
});

// --- Search Bar Functionality ---
function setupSearchBar() {
  const searchInput = document.querySelector('.responsive-search .search-bar');
  const searchBtn = document.querySelector('.responsive-search .search-btn');
  const suggestionsBox = document.querySelector('.responsive-search .search-suggestions');
  if (!searchInput) return;

  const recipesList = document.getElementById('recipes-list');

  // Helper to render recipes
  function renderRecipes(recipes) {
    if (!recipesList) return;
    recipesList.innerHTML = '';
    if (!recipes || recipes.length === 0) {
      recipesList.innerHTML = '<p>No recipes found.</p>';
      return;
    }
    const row = document.createElement('div');
    row.className = 'recipe-cards-row';
    recipes.forEach(meal => {
      const card = document.createElement('div');
      card.className = 'recipe-card fade-in';
      card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="recipe-content">
          <h3>${meal.strMeal}</h3>
          <div class="info">
            <p><strong>Dish Type:</strong> ${meal.strCategory || '-'}</p>
            <p><strong>Cuisine:</strong> ${meal.strArea || '-'}</p>
            <p><strong>Tags:</strong> ${meal.strTags ? meal.strTags.replace(/,/g, ', ') : '-'}</p>
          </div>
          <a href="recipe.html?id=${meal.idMeal}" class="recipes-btn">View Recipe</a>
        </div>
      `;
      row.appendChild(card);
    });
    recipesList.appendChild(row);
  }

  async function doSearch() {
    const query = searchInput.value.trim();
    if (!query) {
      if (typeof setupRandomRecipesHome === 'function') setupRandomRecipesHome();
      return;
    }
    recipesList.innerHTML = '<p>Searching...</p>';
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
      const data = await res.json();
      renderRecipes(data.meals || []);
    } catch (err) {
      recipesList.innerHTML = '<p>Failed to search recipes. Please try again later.</p>';
    }
  }

  // --- Autocomplete Suggestions ---
  let suggestionTimeout;
  searchInput.addEventListener('input', function(e) {
    const query = searchInput.value.trim();
    if (!query) {
      if (suggestionsBox) suggestionsBox.style.display = 'none';
      if (typeof setupRandomRecipesHome === 'function') setupRandomRecipesHome();
      return;
    }
    // Debounce
    clearTimeout(suggestionTimeout);
    suggestionTimeout = setTimeout(async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
        const data = await res.json();
        const meals = (data.meals || []).filter(m => m.strMeal.toLowerCase().includes(query.toLowerCase()));
        if (meals.length === 0) {
          suggestionsBox.innerHTML = '';
          suggestionsBox.style.display = 'none';
          return;
        }
        suggestionsBox.innerHTML = '';
        meals.slice(0, 5).forEach(meal => {
          const item = document.createElement('button');
          item.type = 'button';
          item.className = 'search-suggestion-item';
          item.textContent = meal.strMeal;
          item.onclick = () => {
            searchInput.value = meal.strMeal;
            suggestionsBox.style.display = 'none';
            doSearch();
          };
          suggestionsBox.appendChild(item);
        });
        suggestionsBox.style.display = 'block';
      } catch (err) {
        suggestionsBox.innerHTML = '';
        suggestionsBox.style.display = 'none';
      }
    }, 200);
  });
  // Hide suggestions on blur
  searchInput.addEventListener('blur', function() {
    setTimeout(() => { if (suggestionsBox) suggestionsBox.style.display = 'none'; }, 150);
  });
  // Show suggestions on focus if there are any
  searchInput.addEventListener('focus', function() {
    if (suggestionsBox && suggestionsBox.innerHTML.trim()) suggestionsBox.style.display = 'block';
  });

  // Listen for Enter key
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      if (suggestionsBox) suggestionsBox.style.display = 'none';
      doSearch();
    }
  });

  // Listen for search button click (mobile)
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      if (suggestionsBox) suggestionsBox.style.display = 'none';
      doSearch();
    });
  }
}

// Run search bar setup on DOMContentLoaded
if (document.querySelector('.responsive-search .search-bar')) {
  document.addEventListener('DOMContentLoaded', setupSearchBar);
}

// --- Category Page Logic ---
if (window.location.pathname.endsWith('category.html')) {
  // Use existing getQueryParam if present
  async function loadCategoryRecipes() {
    const category = getQueryParam('c');
    const title = document.getElementById('category-title');
    const list = document.getElementById('category-recipes-list');
    if (!category) {
      title.textContent = 'Category Not Found';
      list.innerHTML = '<p>No category specified.</p>';
      return;
    }
    title.textContent = `${category} Recipes`;
    list.innerHTML = '<p class="Loader">Loading recipes...</p>';
    try {
      let res, data;
      if (category.toLowerCase() === 'egyptian meals') {
        res = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=Egyptian');
      } else {
        res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`);
      }
      data = await res.json();
      list.innerHTML = '';
      const row = document.createElement('div');
      row.className = 'recipe-cards-row';
      (data.meals || []).forEach(meal => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <div class="recipe-content">
            <h3>${meal.strMeal}</h3>
            <a href="recipe.html?id=${meal.idMeal}" class="recipes-btn">View Recipe</a>
          </div>
        `;
        row.appendChild(card);
      });
      list.appendChild(row);
    } catch (err) {
      list.innerHTML = '<p>Failed to load recipes for this category.</p>';
    }
  }
  loadCategoryRecipes();
}

function initHomeContent() {
  // Only run on the homepage
  const path = window.location.pathname;
  const isHomePage =
    path === '/' ||
    path.endsWith('/index.html') ||
    path === '' ||
    path.endsWith('/recipes-app/') ||
    path.endsWith('index.html');
  if (!isHomePage) return;

  const recipesList = document.getElementById('recipes-list');
  const catCards = document.getElementById('category-cards');
  if (!recipesList || !catCards) return;

  setupRandomRecipesHome();
  loadCategories();
}

// Run on initial load (DOM ready)
if (document.readyState !== 'loading') {
  initHomeContent();
} else {
  document.addEventListener('DOMContentLoaded', initHomeContent);
}

// Also run whenever page is shown (initial + back/forward navigation)
window.addEventListener('pageshow', initHomeContent);
