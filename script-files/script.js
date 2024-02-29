
// load Category buttons
const loadCategory = () => {
  const categoryUrl =
    "https://openapi.programming-hero.com/api/videos/categories";
  fetch(categoryUrl)
    .then((res) => res.json())
    .then((data) => handleCategory(data.data));
};

// display category
const handleCategory = (categories) => {
  const categoryContainer = document.getElementById("category-btns");

  categories.forEach((category) => {
    const newBtn = document.createElement("button");
    newBtn.classList = `bg-[#25252533] hover:bg-gray-200 hover:text-red-500 px-4 py-1 rounded text-black font-medium`;
    newBtn.innerHTML = `${category.category}`;
    categoryContainer.appendChild(newBtn);
  });
};

// load videos info from api
const loadVideo = async () => {
  const videoUrl = `https://openapi.programming-hero.com/api/videos/category/1000`;
  const res = await fetch(videoUrl);
  const data = await res.json();
  handleVideos(data.data);
};
loadVideo();

// handle videos
const handleVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");

  videos.map((video) => {
    const { title, thumbnail, authors, others } = video;
    console.log(video);

    // dynamic video card
    const newCard = document.createElement("div");
    newCard.classList = `card max-w-80`;
    newCard.innerHTML = `
      <figure class="max-h-48 relative" >
        <img src=${thumbnail} alt=${title} class="h-full w-full"/>
        <div class="absolute right-4 bottom-4 bg-black bg-opacity-80 text-gray-300 text-xs py-1 px-2 rounded">${others.posted_date}</div>
      </figure>

      <div class="flex gap-2 items-start my-5">
        <img src=${authors[0].profile_picture} alt=${authors[0].profile_name} class="w-10 h-10 rounded-full">

        <div class="flex-1">
          <h2 class="text-base font-semibold">${title}</h2>
          <div id="verified-btn" class="flex gap-1">
            <p class="text-gray-500 text-sm"> ${authors[0].profile_name} </p>
          <img src="./Resources/fi_10629607.svg" alt="Profile Badge" class="ml-2 h-4"/>           </div>
          <p class="text-gray-500 text-sm">${others.views}</p>
        </div>
  </div>
    `;
    videoContainer.appendChild(newCard);

  });
};

loadCategory();
