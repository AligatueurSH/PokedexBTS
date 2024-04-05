const search = document.querySelector('#search');
const number = document.querySelector('#number');
const pokemonImage = document.querySelector('#pokemon-image');
const types = document.querySelector('#types');
const statNumber = document.querySelectorAll('.stat-number');
const barInner = document.querySelectorAll('.bar-inner');
const barOuter = document.querySelectorAll('.bar-outer');
const statDesc = document.querySelectorAll('.stat-desc');
const baseStats = document.querySelector('#base-stats');
const pokedex = document.querySelector('#pokedex');
const abilitiesContainer = document.querySelector('#abilities');

search.addEventListener('change', async (event) => {
    const pkmnData = await fetchApi(event.target.value);

    // Validation when Pokémon does not exist
    if (!pkmnData) {
        alert('Pokémon does not exist.');
        return;
    }

    // Récupération des talents
    const abilities = pkmnData.abilities.map(ability => ability.ability.name);

    // Affichage des talents dans un élément HTML
// Crée une nouvelle chaîne avec un espace après chaque virgule
abilitiesContainer.innerHTML = abilities.join(', ').replace(/, /g, ', ');
});


const typeColors = {
    "rock": [182, 158, 49],
    "ghost": [112, 85, 155],
    "steel": [183, 185, 208],
    "water": [100, 147, 235],
    "grass": [116, 203, 72],
    "psychic": [251, 85, 132],
    "ice": [154, 214, 223],
    "dark": [117, 87, 76],
    "fairy": [230, 158, 172],
    "normal": [170, 166, 127],
    "fighting": [193, 34, 57],
    "flying": [168, 145, 236],
    "poison": [164, 62, 158],
    "ground": [222, 193, 107],
    "bug": [167, 183, 35],
    "fire": [245, 125, 49],
    "electric": [249, 207, 48],
    "dragon": [112, 55, 255]
}

const fetchApi = async (pkmnName) => {
    // Joining Pokémon names that has more than one word
    pkmnNameApi = pkmnName.split(' ').join('-');

    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pkmnNameApi);

    if (response.status === 200) {
        const pkmnData = await response.json();
        return pkmnData;
    }

    return false;
}

var pokemonType = "fire"; // exemple de type de Pokémon

switch (pokemonType) {
    case "fire":
        document.body.style.backgroundColor = "orange";
        break;
    case "water":
        document.body.style.backgroundColor = "blue";
        break;
    case "grass":
        document.body.style.backgroundColor = "green";
        break;
    default:
        document.body.style.backgroundColor = "white";
}


search.addEventListener('change', async (event) => {
    const pkmnData = await fetchApi(event.target.value);

    // Validation when Pokémon does not exist
    if (!pkmnData) {
        alert('Pokémon does not exist.');
        return;
    }


    // Main Pokémon color, in order to change UI theme
const mainColor = typeColors[pkmnData.types[0].type.name];
baseStats.style.color = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;


if (pkmnData.types.length > 1) {
    const secondColor = typeColors[pkmnData.types[1].type.name];
    pokedex.style.background = `linear-gradient(to right, rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]}), rgb(${secondColor[0]}, ${secondColor[1]}, ${secondColor[2]}))`;
} else {
    pokedex.style.background = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
}


    // For debugging - Will be removed later on
    console.log(pkmnData);

    // Sets pokemon # at the top of the page
    number.innerHTML = '#' + pkmnData.id.toString().padStart(3, '0');

    // Sets pokemon image
    pokemonImage.src = pkmnData.sprites.other.home.front_default;

    // Updates "Type" bubbles
    types.innerHTML = '';

    pkmnData.types.forEach((t) => {
        let newType = document.createElement('span');
        let color = typeColors[t.type.name];

        newType.innerHTML = t.type.name;
        newType.classList.add('type');
        newType.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

        types.appendChild(newType);
    });

    
    // Updates Stats and Stats bars
    pkmnData.stats.forEach((s, i) => {
        statNumber[i].innerHTML = s.base_stat.toString().padStart(3, '0');
        barInner[i].style.width = `${s.base_stat}%`;
        barInner[i].style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
        barOuter[i].style.backgroundColor = `rgba(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]}, 0.3)`;
        statDesc[i].style.color = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
    });
});

