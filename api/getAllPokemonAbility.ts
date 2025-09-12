import { GetAllPokemonResponse, Pokemon } from "../types/pokemon";

export const getAllPokemonAbility = async (): Promise<GetAllPokemonResponse> => {
    try{
        const response = await fetch("https://pokeapi.co/api/v2/ability")
        if(!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        } 
        const data = await response.json();
        return {
            count: data.count,
            results : data.results as Pokemon[]
        } 
    } catch(error) {
        throw error
    }
}