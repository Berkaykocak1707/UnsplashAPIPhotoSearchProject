//const apiKey = "YOUR_API_KEY"

const formEl = document.getElementById("js-form");
const searchEl = document.getElementById("searchInput");
const searchResult = document.querySelector(".search-results");
const ShowMore = document.getElementById("ShowMore");

let inputData = "";
let page = 1;

async function searchImage(){
    inputData = searchEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${apiKey}`;


    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResult.innerHTML = "";
    }

    results.map((result) => {
        const url2 = result.urls.small;
        const unsplashLink = result.links.html;
        const photographer = result.user.name;
        const photographerPage = result.user.links.html;

        searchResult.insertAdjacentHTML(
            'beforeend',
            `<div>
        <a href="${unsplashLink}" target="_blank">
          <div class="result-item" style="background-image: url(${url2});"></div>
        </a>
        <p class="photographer-name">
          <a href="${photographerPage}" target="_blank" style="color: black; text-decoration: none;">Photo by ${photographer}</a>
        </p>
      </div>`
        );
    })

    page++
    if (page > 1) {
        ShowMore.style.display = "block";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault()
    page = 1;
    searchImage()

})

ShowMore.addEventListener("click", (event) => {
    searchImage()
})