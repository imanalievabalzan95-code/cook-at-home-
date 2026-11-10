
const recipes = [
    {
        id: 1,
        name: "Pancakes",
        category: "Breakfast",
        time: "20 min",
        image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600",
        ingredients: ["Milk", "Eggs", "Gluten"],
        description: "Soft and fluffy pancakes for a perfect breakfast."
    },
    {
        id: 2,
        name: "Vegetable Salad",
        category: "Lunch",
        time: "15 min",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600",
        ingredients: [],
        description: "Fresh vegetables with a light dressing."
    },
    {
        id: 3,
        name: "Chocolate Cake",
        category: "Dessert",
        time: "45 min",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600",
        ingredients: ["Milk", "Eggs", "Gluten"],
        description: "A delicious homemade chocolate cake."
    },
    {
        id: 4,
        name: "Grilled Fish",
        category: "Dinner",
        time: "30 min",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600",
        ingredients: ["Fish"],
        description: "Healthy grilled fish with fresh herbs."
    },
    {
        id: 5,
        name: "Fruit Bowl",
        category: "Breakfast",
        time: "10 min",
        image: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600",
        ingredients: [],
        description: "A colorful bowl of fresh seasonal fruits."
    },
    {
        id: 6,
        name: "Chicken Pasta",
        category: "Dinner",
        time: "35 min",
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600",
        ingredients: ["Gluten", "Milk"],
        description: "Creamy pasta with tender chicken."
    },
    {
        id: 7,
        name: "Avocado Toast",
        category: "Breakfast",
        time: "10 min",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600",
        ingredients: ["Gluten"],
        description: "Crunchy toast topped with fresh avocado."
    },
    {
        id: 8,
        name: "Tomato Soup",
        category: "Lunch",
        time: "25 min",
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600",
        ingredients: [],
        description: "Warm homemade tomato soup."
    }
];

let selectedCategory = "All";
let favorites = [];
let filteredRecipes = [...recipes];

const recipeGrid = document.getElementById("recipeGrid");
const favoritesGrid = document.getElementById("favoritesGrid");
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");
const modal = document.getElementById("recipeModal");
const modalBody = document.getElementById("modalBody");

function renderRecipes() {
    recipeGrid.innerHTML = "";

    emptyMessage.hidden = filteredRecipes.length !== 0;

    filteredRecipes.forEach(recipe => {
        const card = document.createElement("article");
        card.className = "recipe-card";

        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="recipe-info">
                <span>${recipe.category}</span>
                <h3>${recipe.name}</h3>
                <p>⏱ ${recipe.time}</p>
                <div class="card-buttons">
                    <button class="details-btn" data-id="${recipe.id}">
                        View recipe
                    </button>
                    <button class="favorite-btn" data-id="${recipe.id}">
                        ${favorites.includes(recipe.id) ? "♥" : "♡"}
                    </button>
                </div>
            </div>
        `;

        recipeGrid.appendChild(card);
    });
}

function filterRecipes() {
    const search = searchInput.value.toLowerCase();

    const excluded = Array.from(
        document.querySelectorAll(".allergy-options input:checked")
    ).map(item => item.value);

    filteredRecipes = recipes.filter(recipe => {
        const matchesName = recipe.name.toLowerCase().includes(search);
        const matchesCategory =
            selectedCategory === "All" ||
            recipe.category === selectedCategory;

        const hasAllergy = recipe.ingredients.some(
            ingredient => excluded.includes(ingredient)
        );

        return matchesName && matchesCategory && !hasAllergy;
    });

    renderRecipes();
}

function renderFavorites() {
    favoritesGrid.innerHTML = "";

    const favoriteRecipes = recipes.filter(recipe =>
        favorites.includes(recipe.id)
    );

    favoriteRecipes.forEach(recipe => {
        const card = document.createElement("article");
        card.className = "recipe-card";

        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="recipe-info">
                <h3>${recipe.name}</h3>
                <p>${recipe.category} · ${recipe.time}</p>
                <button class="details-btn" data-id="${recipe.id}">
                    View recipe
                </button>
                <button class="favorite-btn" data-id="${recipe.id}">
                    ♥
                </button>
            </div>
        `;

        favoritesGrid.appendChild(card);
    });
}

function showRecipe(id) {
    const recipe = recipes.find(item => item.id === Number(id));

    if (!recipe) return;

    modalBody.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}"
             style="width:100%; border-radius:15px;">
        <h2>${recipe.name}</h2>
        <p>${recipe.description}</p>
        <p><strong>Category:</strong> ${recipe.category}</p>
        <p><strong>Cooking time:</strong> ${recipe.time}</p>
        <p><strong>Ingredients to check:</strong>
           ${recipe.ingredients.length
               ? recipe.ingredients.join(", ")
               : "No listed allergens"}
        </p>
    `;

    modal.hidden = false;
}

recipeGrid.addEventListener("click", event => {
    const details = event.target.closest(".details-btn");
    const favorite = event.target.closest(".favorite-btn");

    if (details) {
        showRecipe(details.dataset.id);
    }

    if (favorite) {
        const id = Number(favorite.dataset.id);

        if (favorites.includes(id)) {
            favorites = favorites.filter(item => item !== id);
        } else {
            favorites.push(id);
        }

        renderRecipes();
        renderFavorites();
    }
});

favoritesGrid.addEventListener("click", event => {
    const details = event.target.closest(".details-btn");
    const favorite = event.target.closest(".favorite-btn");

    if (details) {
        showRecipe(details.dataset.id);
    }

    if (favorite) {
        const id = Number(favorite.dataset.id);
        favorites = favorites.filter(item => item !== id);

        renderRecipes();
        renderFavorites();
    }
});

document.getElementById("categories").addEventListener("click", event => {
    const button = event.target.closest(".category-btn");

    if (!button) return;

    document.querySelectorAll(".category-btn").forEach(item => {
        item.classList.remove("active");
    });

    button.classList.add("active");
    selectedCategory = button.dataset.category;

    filterRecipes();
});

searchInput.addEventListener("input", filterRecipes);

document.getElementById("filterBtn").addEventListener("click", filterRecipes);

document.getElementById("resetBtn").addEventListener("click", () => {
    document.querySelectorAll(".allergy-options input").forEach(item => {
        item.checked = false;
    });

    searchInput.value = "";
    selectedCategory = "All";

    document.querySelectorAll(".category-btn").forEach(item => {
        item.classList.toggle(
            "active",
            item.dataset.category === "All"
        );
    });

    filterRecipes();
});

document.getElementById("closeModal").addEventListener("click", () => {
    modal.hidden = true;
});

modal.addEventListener("click", event => {
    if (event.target === modal) {
        modal.hidden = true;
    }
});

renderRecipes();
renderFavorites();
