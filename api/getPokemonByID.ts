
export const getPokemonByID = async (pokemonId : number|null) : Promise<any> => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        if(!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json()
        return data
    } catch(error) {
        throw error
    }
}