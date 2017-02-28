(function() {

    var container = document.getElementById('app');
    var button = document.getElementById('fetch-data');
    var currentJokeContainer = document.getElementById('current-joke');
    var latestJokesContainer = document.getElementById('latest-jokes');
    var currentJoke;
    var request = new XMLHttpRequest();
    var url = 'http://api.icndb.com/jokes/random';

    var fetchJoke = function () {
        request.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE) {
                if (request.status == 200) {
                    setChuckJoke(this);
                } else {
                    console.error('cannot fetch data');
                }
            }
        };
        request.open('GET', url, true);
        request.send();
    };

    var setChuckJoke = function (e) {
        var json = JSON.parse(e.responseText)
        var chuckJoke = json.value.joke;

        currentJokeContainer.innerHTML = chuckJoke;
        addToLatestJokes(chuckJoke);
        currentJoke = chuckJoke;
    };

    var addToLatestJokes = function (joke) {
        var newParagraph = document.createElement('p');
        newParagraph.className = 'latest-paragraph';
        newParagraph.innerHTML = joke;
        latestJokesContainer.appendChild(newParagraph);
    };

    button.addEventListener('click', fetchJoke);

})();
