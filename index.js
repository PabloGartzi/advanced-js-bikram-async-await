//DESARROLLA AQUI TUS SOLUCIONES
var url = ""

/**
 * Descargar data de la URL especifica.
 *
 * @async
 * @function connect
 * @param {string} url - La URL de la que descargamos los datos
 * @return {Promise<.>} Los datos de la url.
 */
const connect = async (url) => {
  try {
    const resp = await fetch(url,{});
    //console.log(resp);
    if (resp.ok) {
      const data = await resp.json();
      //console.log(data);
      return data;
    } else {
      throw 'Este es el error';
    }

  } catch (error) {
    throw error + ' tenemos que gestionar este error';
  }
};


// EJERCICIO 1
/*Declara una función getRandomPokemon que retorne un pokemon aleatorio*/
/**
 * Devuelve un pokemon aleatorio
 *
 * @async
 * @function getRandomPokemon
 * @return {Promise<Object>} Los datos de la url.
 */
const getRandomPokemon = async () => {
    try {
        url = "https://pokeapi.co/api/v2/pokemon"
        const pokemonCantidad = await connect(url);
        console.log(pokemonCantidad)
        numAleatorio = Math.floor(Math.random()*pokemonCantidad.count +1);
        console.log("El numero aleatorio es: "+numAleatorio);
        console.log("El numero de pokemons es de: "+ pokemonCantidad.count);
        url = `https://pokeapi.co/api/v2/pokemon/${numAleatorio}`
        const pokemonAleatorio = await connect(url);
        console.log(pokemonAleatorio)
        return pokemonAleatorio;

    } catch (error) {
        throw console.log("ERROR");
    }
}


// EJERCICIO 2
/*Declara una funcion getImageAndName que retorne el nombre y la URL de la imagen de un pokemon => (return {img, name})*/
/**
 * @async
 * @param {Object} pokemon 
 * @returns 
 */
async function getImageAndName (pokemon){

    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    let data = await response.json();
    let name = data.name;
    let img = data.sprites.front_default;
    return {name, img}
    
}

//EJERCICIO 3
/*Declara una funcion printImageAndName que retorne el string necesario para pintar la imagen y el nombre del pokemon en el DOM de la siguiente forma:

<section>
    <img src="url de imagen" alt="nombre del pokemon">
    <h1>Nombre del pokemon</h1>
</section>*/

/**
 * Función para printear la imagen y nombre de un pokemon.
 * @async  
 * @returns {Promise<string>} //devuelve el string que pide
 */
const printImageAndName = async () => {
    try {
        const pokemonAleatorio = await getRandomPokemon();
        const {name, img} = await getImageAndName(pokemonAleatorio.name);
        const stringHTML = `
        <section>
            <img src="${img}" alt="${name}">
            <h1>${name}</h1>
        </section>`;
        return stringHTML;
    } catch (error) {
        throw console.log("ERROR");
    }
}


//EJERCICIO 4
/*Declara una función getRandomDogImage que retorne la url de la imagen de un perro aleatorio*/
/**
 * Función para devolver la imagen de un perro aleatorio.
 * @async  
 * @returns {Promise<Object>} //devuelve el objeto que pide
 */
const getRandomDogImage = async () => {
    try {
        url = "https://dog.ceo/api/breeds/image/random";
        const perro = await connect(url);
        const breed = perro.message;
        return breed;
        
    } catch (error) {
        throw console.log("ERROR");
    }
}

//EJERCICIO 5
/*Declara una función getRandomPokemonImage que retorne la url de la imagen de un pokemon aleatorio.*/
/**
 * Función para obtener la imagen de un pokemon random.
 * @async  
 * @returns {Promise<string>} //devuelve el string que pide
 */
const getRandomPokemonImage = async () => {
    try {
        const pokemonAleatorio = await getRandomPokemon();
        const {name, img} = await getImageAndName(pokemonAleatorio.name);
        return img;
    } catch (error) {
        throw console.log("ERROR");
    }
}

//EJERCICIO 6
/*Declara una función printPugVsPikachu que pinte la batalla entre "Pug" y "Pikachu" (no se testea)*/
const printPugVsPikachu = async () => {
    try {
        const pugImg = await getRandomDogImage();
        const pikachuData = await connect("https://pokeapi.co/api/v2/pokemon/pikachu");
        const pikachuName = pikachuData.name;
        const pikachuImg = pikachuData.sprites.front_default;
        
        const hp = pikachuData.stats.find(stats => stats.stat.name == "hp").base_stat;
        const attack = pikachuData.stats.find(stats => stats.stat.name == "attack").base_stat;

        //se me ha ocurrido darle stats al perro con math.random()
        const pugPower = Math.floor(Math.random() * 100);
        const pikachuPower = attack + Math.floor(Math.random() * 50);
        const winner = pugPower > pikachuPower ? "Pug" : "Pikachu";
        console.log(winner);
    } 
    catch (error) {
        throw console.log("ERROR");
    }
}
printPugVsPikachu();
//EJERCICIO 7
/*Declara una función getRandomCharacter que retorne un personaje aleatorio.*/
/**
 * Función para obtener un personaje aleatorio de Rick y Morty.
 * @async  
 * @returns {Promise<object>} //devuelve el string que pide
 */
const getRandomCharacter = async () => {
    try {
        url = "https://rickandmortyapi.com/api/character"
        const character = await connect(url);
        //console.log(character);
        numAleatorio = Math.floor(Math.random()*(character.info.count) +1);
        //console.log(numAleatorio)
        url = `https://rickandmortyapi.com/api/character/${numAleatorio}`
        const randomCharacter = await connect(url);
        return randomCharacter;
    } catch (error) {
        throw console.log("ERROR");
    }
}

//EJERCICIO 8
/*Declara una función getRandomCharacterInfo que retorne de un personaje su imagen, nombre, episodios en los que aparece y el nombre del primer episodio en el que aparece + fecha de estreno, tendrás que hacer otro fetch para llegar a los ultimos datos. Formato de retorno => (return {img, name, episodes, firstEpisode, dateEpisode})*/

/**
 * Función para obtener la info de un personaje random.
 * @async  
 * @returns {Promise<Object>} //devuelve el string que pide
 */
const getRandomCharacterInfo = async () => {
    try {
        const character = await getRandomCharacter();
        console.log(character);
        const img = character.image;
        const name = character.name;
        const episodes = character.episode;
        console.log(episodes);
        const episodioUno = character.episode[0];
        const episodio = await connect(episodioUno);
        const firstEpisode = episodio.name
        const dateEpisode = episodio.air_date
        //console.log({img, name, episodes, nombreEpisodio, fechaEpisodio})
        return {img, name, episodes, firstEpisode, dateEpisode}
    } catch (error) {
        throw console.log("ERROR");
    }
}


