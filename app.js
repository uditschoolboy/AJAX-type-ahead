const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data));


function findMatches(word, cities) {
    return cities.filter(place => {
        const regex = new RegExp(word, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}

const searchBox = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
searchBox.addEventListener('keyup', function(event) {
    const word = event.target.value;
    
    let matches = findMatches(word, cities);
    if(word.length == 0) matches = [];
    const regex = new RegExp(word, 'gi');
    const html = matches.map(place => {
        const cityName = place.city.replace(regex, `<span class="hl">${word}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${word}</span>`);

        return (
            `<li>
                <p>${cityName}, ${stateName}</p>
                <span class="number">${place.population}</span>
            </li>`);
    }).join('');
    console.log(html);
    suggestions.innerHTML = html;
});


