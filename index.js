const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

fetch(endpoint).then((blob) =>
  blob.json().then((data) => cities.push(...data))
);

function findMatches(wordToMatch, cities) {
  return cities.filter((item) => {
    const regex = RegExp(wordToMatch, "gi");
    return item.city.match(regex) || item.state.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );

      return `
      <li>
        <span class="name">${cityName}, ${place.state}</span>
        <span class="population">${place.population}</span>
      </li>
      `;
    })
    .join("");
  suggestion.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestion = document.querySelector(".suggestions");

searchInput.addEventListener("keyup", displayMatches);
