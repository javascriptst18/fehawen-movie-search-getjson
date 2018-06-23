// our wrapper inside which we'll insert cards (i.e. movies) found in our search
const wrapper = document.querySelector('#card-wrapper');
// our input form where the user enter a search query
const search = document.getElementById('movie-search');
// our 'no movies found' wrapper if the search doesn't generate any matches
const nothingFound = document.querySelector('.nothing-found');
// creating our array where we'll store the user input search query
let searchQuery = [];

function doMovieSearch() {
  $.getJSON(`https://javascriptst18.herokuapp.com/trending?q=${searchQuery}`, (response) => {
    for (let movie of response) {
      let cardDetails = `
      <div class="card-body">
        <img src="${movie.poster}" alt="${movie.title}">
      </div>`;
      wrapper.insertAdjacentHTML('beforeend', cardDetails);
    }
    if (!wrapper.hasChildNodes()) {
      // here's the heading and text we insert if nothing's found
      let noResults = `
      <h1>Sorry</h1>
      <h2>No matches found.<br>Please try again.</h2>`;
      // here we insert the message to 'nothingFound'
      nothingFound.insertAdjacentHTML('beforeend', noResults)
    }
});
}

search.addEventListener('submit', (i) => {
  // prevent form submit to reload page
  i.preventDefault();
  // empty wrapper (card results) from any previous search results
  wrapper.innerHTML = '';
  // empty our 'nothing found' message
  nothingFound.innerHTML = '';
  // store the value from the input field in 'result'
  let result = document.getElementById('movie-title').value;
  // empty our searchQuery array from previous searches
  searchQuery.pop();
  // add the 'result' input search value to the array
  searchQuery.push(result);
  // logging the content of our searchQuery array, to check that it works
  console.log(searchQuery);
  // call the search function
  doMovieSearch();
});