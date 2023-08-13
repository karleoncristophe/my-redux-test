

export type Description = {
	description: string
	language: {
		name: string
		url: string
  }
}

export const getPokemon = async (): Promise<Description[]> => {
	const data = await fetch('https://pokeapi.co/api/v2/pokedex/2', {method: "GET"})
	const pokemons = await data.json()
	return pokemons.descriptions
}

export const getUser = async (): Promise<Description[]> => {
	const data = await fetch('https://pokeapi.co/api/v2/pokedex/2', {method: "GET"})
	const pokemons = await data.json()
	return pokemons.descriptions
}

