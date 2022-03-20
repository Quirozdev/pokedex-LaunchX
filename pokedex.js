let pokemon = {
    name: '',
    id: 0
};

const getPreviousPokemon = () => {
    pokemon.id = pokemon.id - 1;
    fetchByID(pokemon.id);
}

const getFollowingPokemon = () => {
    pokemon.id = pokemon.id + 1;
    fetchByID(pokemon.id);
}


const fetchByID = () => {
    if (pokemon.id >= 0) {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`;
        fetchPokemon(url)
    }
}

const fetchByName = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetchPokemon(url);
}

const fetchPokemon = (url) => {
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./assets/img/Missingno.png")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            let type = data.types[0]['type'].name;
            let pokemonID = data.id;
            let pokeName = data.name;
            pokeImage(pokeImg);
            pokeType(type);
            changePokeName(pokeName, pokemonID);
            pokemon.name = pokeName;
            pokemon.id = pokemonID;
            setStats(data);
            setMovements(data);
            console.log(pokeImg);
            console.log(type);
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;
}

const pokeType = (type) => {
    const pokemonType = document.getElementById("pokemonType");
    pokemonType.textContent = type;
}

const changePokeName = (name, id) => {
    const pokemonName = document.getElementById("pokemonName");
    pokemonName.textContent = `# ${id}-${name}`;
}

const setStats = (data) => {
    let hpText = document.getElementById("hp");
    let atkText = document.getElementById("atk");
    let defText = document.getElementById("def");
    let spAtkText = document.getElementById("spatk");
    let spDefText = document.getElementById("spdef");
    let speedText = document.getElementById("speed");
    let statsList = [hpText, atkText, defText, spAtkText, spDefText, speedText];
    for (i = 0; i < statsList.length; i++) {
        statsList[i].textContent = data.stats[i]['base_stat']
    }
}

const setMovements = (data) => {
    const movimientos = document.getElementById("movimientos");
    // remove all the childs
    while (movimientos.lastElementChild) {
        movimientos.removeChild(movimientos.lastElementChild);
    }
    let tituloMovimientos = document.createElement("h2");
    tituloMovimientos.textContent = "Movimientos";
    movimientos.appendChild(tituloMovimientos);
    for (i = 0; i < 4; i++) {
        let movement = document.createElement("div");
        movement.className = "movement";
        let pokemonMovement = data.moves[i]['move']['name'];
        movement.textContent = pokemonMovement;
        movimientos.appendChild(movement);
    }
    

}