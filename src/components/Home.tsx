import { useEffect, useState, ChangeEvent } from "react"
import { getAllPokemon } from "../api/getAllPokemon";
import { GetAllPokemonResponse, Pokemon } from "../types/pokemon";

export default function Home() {
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const limit = 20; 
    useEffect(()=>{
        const getPokemon = async () => {
            try {
                const offset:number = (currentPage - 1) * limit;
                const data: GetAllPokemonResponse = await getAllPokemon(limit, offset)
                setAllPokemon(data.results);
                setTotalPages(Math.ceil(data.count / limit));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching:", error);
            } finally {
                setLoading(false);
            }
        }

        getPokemon()
    },[currentPage])

     if (loading) {
        return <p>Loading Pokémon…</p>;
    }
    function updateList(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
    }

    const filteredPokemon = allPokemon.filter(poke => 
        poke.name.toLowerCase().includes(search.toLowerCase())
    )

    const allPokemonView = filteredPokemon.map((pokemon)=> {
        const url:string = pokemon.url;
        const id:any = url.split("/").filter(Boolean).pop();
            return (
            <div className="pokemon-card">
                <div className="pokemon-placeholder">
                    <span>?</span>
                </div>
                <h3>{pokemon.name}</h3>
                <a href={`/pokemon/${id}`} className="view-more">Get more Details</a>
            </div>
            )
    })

    function goToPreviousPage() {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    }

    function goToNextPage() {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    }
    return (
         <main>
        <section className="search-filter">
            <input autoComplete="off" type="text" id="search" placeholder="Search Pokémon..." onChange={updateList}/>
            {/* <button id="filter-btn">Filter</button> */}
        </section>

        <section className="pokemon-list">
            {allPokemonView}
        </section>

        <div className="pagination-controls" style={{ marginTop: '10px' }}>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </main>
    )
}