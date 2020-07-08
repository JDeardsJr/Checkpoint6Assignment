'use strict';

const token = "3bd954c0e7ec7488ef7a73b759a756776169fd7b";

const options = {
  headers: new Headers({
    'Authorization': `token ${token}`})
};

const searchURL = 'https://api.github.com/users/';

function displayResults(responseJson) {
  console.log(responseJson);
  $('#js-error-message').empty();
  $('#results-list').empty();
  for (let i = 0; i < responseJson.length; i++) {
    $('#results-list').append(
      `<li><h3>${responseJson[i].name}</h3>
      <p><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p>
      </li>`
    )};
  $('#results').removeClass('hidden');
};

function getUser(query) {
  const url = searchURL + query + '/repos';
  getUserRepos(url);
  console.log(url);
}

function getUserRepos(url, options) {
    fetch(url, options) 
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getUser(searchTerm);
  });
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});