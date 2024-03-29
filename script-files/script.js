const categoryContainer = document.getElementById("category-btns");
const videoContainer = document.getElementById("video-container");
const errorElement = document.getElementById("error-element");
const sortBtnEl = document.getElementById("sort-btn");

let selectedCategory = 1000;
let sorted = false;

sortBtnEl.addEventListener("click", () => {
  sorted = true;
  loadVideo(selectedCategory, sorted);
});

let num = 4000;
const hr = Math.floor(4000 / 3600);
const min = Math.floor((num % 3600) / 60);
let sec = (num % 3600) % 60;
console.log(hr, min, sec);

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
  categories.forEach((category) => {
    const newBtn = document.createElement("button");
    newBtn.classList = `category-btn bg-[#25252533] hover:bg-gray-200 hover:text-red-500 px-4 py-1 rounded text-black font-medium`;
    newBtn.innerHTML = `${category.category}`;
    categoryContainer.appendChild(newBtn);

    // add event listener in the category button & select active button
    newBtn.addEventListener("click", () => {
      loadVideo(category.category_id);

      // to style active button
      const allBtns = document.querySelectorAll(".category-btn");
      for (let btn of allBtns) {
        btn.classList.remove("bg-red-500", "text-[#fff]");
      }
      newBtn.classList.add("bg-red-500", "text-[#fff]");
    });
  });
};

// load videos info from api
const loadVideo = async (categoryId, sorted) => {
  selectedCategory = categoryId;
  const videoUrl = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`;
  const res = await fetch(videoUrl);
  const data = await res.json();

  // Sort if sorted flag is true
  if (sorted) {
    data.data.sort((a, b) => {
      let totalViews1st = a.others?.views;
      let totalViews2nd = b.others?.views;
      totalViews1st = parseFloat(totalViews1st.replace("k", "")) || 0;
      totalViews2nd = parseFloat(totalViews2nd.replace("k", "")) || 0;

      if (a.others?.views.toLowerCase().includes("k")) {
        totalViews1st = totalViews1st * 1000;
      }
      if (b.others?.views.toLocaleLowerCase().includes("k")) {
        totalViews2nd = totalViews2nd * 1000;
      }

      return totalViews2nd - totalViews1st;
    });
  }

  // to display error message if no data found
  if (data.data.length === 0) {
    videoContainer.innerHTML = "";
    errorElement.classList.remove("hidden");
  } else {
    errorElement.classList.add("hidden");
    handleVideos(data.data);
  }
};

// handle videos
const handleVideos = (videos) => {
  //clear before display new video
  videoContainer.innerHTML = "";

  videos.map((video) => {
    const { title, thumbnail, authors, others } = video;

    // videoContainer.setAttribute('class');
    // to set verified badge to the verified profile
    let verifiedBadge = "";
    if (authors[0].verified) {
      verifiedBadge = `<img src="./Resources/fi_10629607.svg" alt="Profile Badge" class="ml-2 h-4"/>`;
    }

    // to display posted date
    let postedDate = "";
    postedDate = convertDate(others.posted_date);

    if(others.posted_date){
      postedDate = `<div class="absolute right-4 bottom-4 bg-black bg-opacity-80 text-gray-300 text-xs py-1 px-2 rounded">${postedDate} ago</div>`;
    }

      
    

    // dynamic video card
    const newCard = document.createElement("div");
    newCard.classList = `w-[310px] mx-auto`;
    newCard.innerHTML = `
      <figure class="h-[160px] relative" >
        <img src=${thumbnail} alt=${title} class="h-full w-full rounded-xl hover:rounded-none hover:opacity-60"/>
        ${postedDate}
      </figure>

      <div class="flex gap-2 items-start my-5">
        <img src=${authors[0].profile_picture} alt=${authors[0].profile_name} class="w-10 h-10 rounded-full">

        <div class="flex-1">
          <h2 class="text-base font-semibold">${title}</h2>
          <div id="verified-btn" class="flex gap-1">
            <p class="text-gray-500 text-sm"> ${authors[0].profile_name} </p>

            ${verifiedBadge}

            </div>
          <p class="text-gray-500 text-sm">${others.views}</p>
        </div>
  </div>
    `;
    videoContainer.appendChild(newCard);
  });
};



// handle posted date
const convertDate = sec => {
  const parsedSeconds = parseInt(sec);
  const hours = Math.floor(parsedSeconds / 3600);
  const minutes = Math.floor((parsedSeconds % 3600) / 60);

  let outputTime = "";

  if (hours > 0) {
    outputTime += `${hours} ${hours === 1 ? "hr" : "hrs"}`;
  }
  if (minutes >= 0) {
    outputTime += ` ${minutes} ${minutes === 1 ? "min" : "mins"}`;
  }
  return outputTime.trim(); 
};

loadCategory();
loadVideo(selectedCategory, sorted);
