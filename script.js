const accrssKey = "J6kfpncxALKiczolbHt68tZkeEVX45rfTvFx03Ic9rQ";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const shoeMore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accrssKey}`;
  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLinker = document.createElement("a");
    imageLinker.href = result.links.html;
    imageLinker.target = "_blank";
    imageLinker.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLinker);
    searchResults.appendChild(imageWrapper);
  });

  page++;
  if (page > 1) {
    shoeMore.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

shoeMore.addEventListener("click", () => {
  searchImages();
});
