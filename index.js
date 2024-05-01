const handleCetagory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await response.json();
  const tabContainer = document.getElementById("tab-container");
  data.data.news_category.forEach((cetagory) => {
    const div = document.createElement("div");
    div.innerHTML = `<a onclick="handleLordData('${cetagory.category_id}')"  role="tab" class="tab font-semibold text-gray-500  hover:text-blue-600 text-[15px]">${cetagory.category_name}</a>`;
    tabContainer.appendChild(div);
  });
  // Hide spinner after data is fetched and displayed
  handleSpinner(false);
};

const handleSpinner = (isLoading) => {
  const spinner = document.getElementById("spinner");
  if (isLoading === true) {
    spinner.classList.remove("hidden");
  } else {
    spinner.classList.add("hidden");
  }
};

const handleLordData = async (cetagoryId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/news/category/${cetagoryId}`
  );
  const data = await res.json();
  const cetagorys = data.data;

  const cardContainer = document.getElementById("card-container");
  const found = document.getElementById("found");
  cardContainer.innerHTML = "";
  cetagorys.forEach((category) => {
    found.innerHTML = `<p class="font-semibold">${cetagorys.length} items found for this category </p>`;
    const div = document.createElement("div");
    div.innerHTML = `      <div class="card card-side bg-base-100 shadow-md flex md:flex-row flex-col items-center md:items-start my-5">
  <figure class="m-4 rounded-lg w-4/12"><img
                    src="${category.thumbnail_url}" alt="Movie" /></figure>
            <div class="card-body">
                <h2 class="card-title text-xl font-bold mb-1">${
                  category.title
                }</h2>
                <p class="text-sm text-gray-400">${category.details.slice(
                  0,
                  350
                )} <br> <br>
                <p class="text-sm text-gray-400">${category.details.slice(
                  350,
                  500
                )}
                </p>
                <!-- bottom part card -->
                <div class="flex flex-row justify-between mt-5">
                    <div class="flex justify-between items-center gap-x-2">
                        <div class="avatar">
                            <div class="w-10 rounded-full">
                                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                        <div>
                            <p class="text-[14px] font-semibold">${
                              category.author.name
                                ? category.author.name
                                : "Not Found"
                            }</p>
                            <span class="text-[12px] text-gray-500">
                               ${
                                 category?.author?.published_date
                                   ? category?.author?.published_date
                                   : "Not Found"
                               }
                            </span>
                        </div>
        
                    </div>
                    <div class="flex gap-1">
                        <i class="ri-eye-line font-semibold text-gray-500"></i>
                        <p id="viewAmount" class="text-gray-500 font-semibold">${
                          category.total_view
                            ? category.total_view
                            : "Not Found"
                        }M</p>
        
                    </div>
                    <div class="rating w-24">
                        <input type="radio" name="rating-1" class="mask mask-star bg-gray-500" />
                        <input type="radio" name="rating-1" class="mask mask-star bg-gray-500" checked />
                        <input type="radio" name="rating-1" class="mask mask-star bg-gray-500" />
                        <input type="radio" name="rating-1" class="mask mask-star bg-gray-500" />
                        <input type="radio" name="rating-1" class="mask mask-star bg-gray-500" />
                    </div>
                    <div>
                        <i class="ri-arrow-right-line font-semibold text-[#5D5FEF]"></i>
                    </div>
                </div>
            </div>
        </div>`;
    cardContainer.appendChild(div);
  });
};

const sortByViews = () => {
  const cards = Array.from(document.querySelectorAll(".card"));

  cards.sort((a, b) => {
    const viewsA = parseFloat(a.querySelector("#viewAmount").textContent);
    const viewsB = parseFloat(b.querySelector("#viewAmount").textContent);
    return viewsB - viewsA;
  });
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  cards.forEach((card) => {
    cardContainer.appendChild(card);
  });
};

document.getElementById("sort_by_view").addEventListener("change", function () {
  if (this.value === "View") {
    sortByViews();
  } else if (this.value === "Default") {
    handleLordData("03");
  }
});

const handleTrendingBtn = () => {
  // const res = await fetch(
  //   `https://openapi.programming-hero.com/api/news/category/${cetagoryId}`
  // );
  // const data = await res.json();
  // const cetagorys = data.data;

  const trendingBtn = document.getElementById("trending-btn");
  const todayBtn = document.getElementById("today-btn");
  todayBtn.classList.remove("bg-[#5D5FEF]");
  todayBtn.classList.remove("text-white");
  todayBtn.classList.add("text-[#5D5FEF]");
  todayBtn.classList.add("border");
  todayBtn.classList.add("border-[#5D5FEF]");
  //
  trendingBtn.classList.add("bg-[#5D5FEF]");
  trendingBtn.classList.add("text-white");
};

const handleTodayBtn = () => {
  const trendingBtn = document.getElementById("trending-btn");
  const todayBtn = document.getElementById("today-btn");
  todayBtn.classList.add("bg-[#5D5FEF]");
  todayBtn.classList.add("text-white");
  todayBtn.classList.remove("text-[#5D5FEF]");
  todayBtn.classList.remove("border");
  todayBtn.classList.remove("border-[#5D5FEF]");
  //
  trendingBtn.classList.remove("bg-[#5D5FEF]");
  trendingBtn.classList.remove("text-white");
};

const lordHome = () => {
  handleLordData("03");
};
handleLordData("03");
handleCetagory();
