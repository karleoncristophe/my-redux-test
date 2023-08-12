type IDescriptions = {
    descriptions: [
        {
          "description": string
          "language": {
            "name": string
            "url": string
          }
        },
      ],
}

export const getPokemon = async (): Promise<IDescriptions> => {
const data = await fetch('https://pokeapi.co/api/v2/pokedex/2', {method: "GET"})
const pokemons = await data.json()
console.log(pokemons.descriptions);

return pokemons
}

