// Function mainly for Title Section
// =======================================
const handleTitle = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const res = await response.json();
  const titles = res.data;

  //To Display titles
  const titleContainer = document.getElementById("title-container");
  titles.forEach((title) => {
    const div = document.createElement("div");
    div.classList.add("tab");

    div.innerHTML = `
      <a onclick="displayVideos('${title.category_id}')" class="bg-[#25252533] px-4 rounded text-black font-medium">${title.category}</a>
      `;
    titleContainer.appendChild(div);
  });
};



// Function to display videos
// ===============================
const displayVideos = async (categoryId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
  );
  const res = await response.json();
  const data = res.data;

  // To add event listener on sort btn & pass value to sort function
  const sortButton = document.getElementById("sort-btn");
  sortButton.addEventListener("click", () => {
    sortedVideos(data);
  });

  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

 
// condition to display videos. And show message if it is empty
  if (data.length === 0) {
    videoContainer.removeAttribute("class");
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="text-center mt-10">
          <img src="./Resources/Icon.png" alt="" class="w-32 mx-auto mb-8">
          <h2 class="text-2xl md:text-3xl font-bold">Sorry! No videos <br> Found in this category.</h2> 
      </div>
    `;
    videoContainer.appendChild(div);
  } else {
    videoContainer.classList.add("grid", "gap-4", "lg:gap-2",    "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-4" );

    data.forEach((video) => {

      // To get uploaded time and pass value to time conversion function
      const postedTimes = video.others?.posted_date;
      const uploadedTime = secToHrsMin(postedTimes);

      const div = document.createElement("div");
      div.innerHTML = `
        <div class="card"> 
          <figure class="h-44 lg:h-36 relative" >
            <img src="${video.thumbnail}" alt="Shoes" class="h-full w-full"/>
            ${postedTimes ? `<div class="absolute right-4 bottom-4 bg-black opacity-90 text-gray-300 text-xs py-1 px-1.5 rounded">${uploadedTime}</div>`: ""}
          </figure>

          <div class="flex gap-1 items-start my-5">
            <img src="${video.authors[0].profile_picture}" class="w-10 h-10 rounded-full">

            <div class="flex-1">
              <h2 class="text-base font-medium">${video.title}</h2>
              <div id="verified-btn" class="flex gap-1">
                <p class="text-gray-500 text-sm"> ${video.authors[0].profile_name} </p>
              ${video.authors[0].verified ? '<img src="./Resources/fi_10629607.svg"/>' : ""}
              </div>
              <p class="text-gray-500 text-sm">${video.others.views} views</p>
            </div>
          </div>
        </div> `;
      videoContainer.appendChild(div);
    });
  }
}; // Function to display videos ended here



// Function to convert time into hrs and minutes
// ================================================
const secToHrsMin = (seconds) => {
  const parsedSeconds = parseInt(seconds);
  const hours = Math.floor(parsedSeconds / 3600);
  const minutes = Math.floor((parsedSeconds % 3600) / 60);

  let outputTime = "";
  if (hours > 0) {
    outputTime += `${hours} ${hours === 1 ? "hr" : "hrs"}`;
  }
  if (minutes >= 0) {
    outputTime += ` ${minutes}min ago`;
  }
  return outputTime.trim();
};



// Function to sort video cards by views
// =========================================
const sortedVideos = (cards) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";

  // inner function to get numeric value of views
  const handleViewCount = (views) => {
    const numberPart = parseFloat(views.replace(/,/g, ''));
    if (views.endsWith("K")) {
      return numberPart * 1000;
    } else {
      return numberPart;
    }
  };


  //  To sort the card
  cards.sort((x, y) => {
    const firstNum = handleViewCount(x.others.views);
    const anotherNum = handleViewCount(y.others.views);
    return anotherNum - firstNum;
  }); 
  cards.forEach((card) => {
    // To get uploaded time and pass value to time conversion function
    const postedTimes = card.others?.posted_date;
    const uploadedTime = secToHrsMin(postedTimes);

    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card">
        <figure class="h-44 lg:h-36 relative" >
          <img src="${card.thumbnail}" alt="Shoes" class="h-full w-full"/>
          ${postedTimes ? `<div class="absolute right-4 bottom-4 bg-black opacity-90 text-gray-300 text-xs py-1 px-1.5 rounded">${uploadedTime}</div>`: ""}
        </figure>

        <div class="flex gap-1 items-start my-5">
          <img src="${card.authors[0].profile_picture}" class="w-10 h-10 rounded-full">

          <div class="flex-1">
            <h2 class="text-base font-medium">${card.title}</h2>
            <div id="verified-btn" class="flex gap-1">
              <p class="text-gray-500 text-sm"> ${card.authors[0].profile_name} </p>
              ${card.authors[0].verified? '<img src="./Resources/fi_10629607.svg"/>': ""}
            </div>
            <p class="text-gray-500 text-sm">${card.others.views} views</p>
          </div>
        </div>
      </div>`;
    videoContainer.appendChild(div);
  });
}; //sort function ended here



handleTitle();
displayVideos("1000");