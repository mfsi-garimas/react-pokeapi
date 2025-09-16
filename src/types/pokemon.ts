export interface Pokemon {
    name: string,
    url: string
}

export interface GetAllPokemonResponse {
  count: number;
  results: Pokemon[];
}

export interface CommentData {
  pokemonId: number;
  comment: string;
}