let searchInputEl = document.getElementById('searchInput');
let searchResultsEl = document.getElementById('searchResults');
let spinnerEl = document.getElementById('spinner');

function createAndAppendSearchResult(result) {
    let resultItemContainer = document.createElement('div');
    resultItemContainer.classList.add('result-item');
    searchResultsEl.appendChild(resultItemContainer);

    let { link, title, description } = result;
    let titleEl = document.createElement('a');
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemContainer.appendChild(titleEl);

    let titleBreakEl = document.createElement('br');
    resultItemContainer.appendChild(titleBreakEl);

    let urlEl = document.createElement('a');
    urlEl.classList.add('result-url');
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemContainer.appendChild(urlEl);

    let lineBreakEl = document.createElement('br');
    resultItemContainer.appendChild(lineBreakEl);

    let descriptionEl = document.createElement('p');
    descriptionEl.classList.add('link-description');
    descriptionEl.textContent = description;
    resultItemContainer.appendChild(descriptionEl);

}

function displayResults(search_results) {
    spinnerEl.classList.toggle('d-none');
    
    for (let result of search_results) {
        createAndAppendSearchResult(result);
    }

}

function searchWikipedia(event) {

    if(event.key === "Enter") {
        spinnerEl.classList.toggle('d-none');
        searchResultsEl.textContent = "";
        let searchInput = searchInputEl.value;

        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        
        let options = {
            method: "GET"
        }
        fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let { search_results } = jsonData;
            displayResults(search_results);
        });
    }
}


searchInputEl.addEventListener('keydown', searchWikipedia);