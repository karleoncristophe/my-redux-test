export type IPokemonResults = {
  name: string
  url: string
}

export type IDescription = {
  count: number
  next: string
  previous: null
  results: IPokemonResults[]
}

export const getPokemon = async (): Promise<IPokemonResults[]> => {
  const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20', {
    method: 'GET',
    cache: 'force-cache',
  })
  const pokemons: IDescription = await data.json()

  return pokemons.results
}
