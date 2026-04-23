// get inputs and buttons
const btnSearch = getElement("btnSearch");
const btnClear = getElement("btnClear");

const searchTermInput = getElement("searchInput");

const introDiv = getElement("intro");
const resultDiv = getElement("results");

function performSearch() {
  fetch("./travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      resultDiv.classList.remove("hidden");
      const searchTerm = searchTermInput.value.toLowerCase();

      let results = [];

      if (searchTerm.includes("beach")) {
        results = data.beaches;
      } else if (searchTerm.includes("templ")) {
        results = data.temples;
      } else if (searchTerm.includes("count")) {
        results = data.countries[0].cities;
      }

      let html = "<h3>Search Results</h3>";
      resultDiv.innerHTML = html;

      for (const result of results) {
        html += `<div class="card">
<div><img src="${result.imageUrl}" alt="image of ${result.name}" /></div>

<h3>${result.name}</h3>
<p>${result.description}</p>

</div>`;
      }

      resultDiv.innerHTML = html;
    })
    .catch((error) => {
      console.error("Error: ", error);
      resultDiv.innerHTML = "An error occurred while performing the search.";
    });
}

function clearResults() {
  resultDiv.classList.add("hidden");
  resultDiv.innerHTML = "";
  searchTermInput.value = "";
}

function getElement(id) {
  return document.getElementById(id);
}

// set up event handling
btnSearch.addEventListener("click", performSearch);
btnClear.addEventListener("click", clearResults);
