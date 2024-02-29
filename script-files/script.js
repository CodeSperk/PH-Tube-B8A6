const categoryContainer = document.getElementById('category-btns');

// load Category buttons
const loadCategory = () => {
  const categoryUrl = "https://openapi.programming-hero.com/api/videos/categories";
   fetch(categoryUrl)
    .then(res => res.json())
    .then(data => handleCategory(data.data));
}

// display category
const handleCategory = (categories) => {
  categories.forEach((category) => {
     const newBtn = document.createElement('button');
     newBtn.classList = `bg-[#25252533] hover:bg-gray-200 hover:text-red-500 px-4 py-1 rounded text-black font-medium`;
     newBtn.innerHTML = `${category.category}`;
     categoryContainer.appendChild(newBtn);    
  })
}

loadCategory()