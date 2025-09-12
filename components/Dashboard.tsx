import { getAllPokemon } from "../api/getAllPokemon"
import { getAllPokemonTypes } from "../api/getAllPokemonTypes";
import { useEffect, useState } from "react";
import { getAllPokemonAbility } from "../api/getAllPokemonAbility";
import Top5PokemonChart from "./Top5PokemonChart";
import { GetAllPokemonResponse, Pokemon } from "../types/pokemon";

export default function Dashboard() {
    const [allPokemon, setAllPokemon] = useState<number>(0)
    const [allPokemonType, setAllPokemonType] = useState<number>(0)
    const [allPokemonAbility, setAllPokemonAbility] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true);
    const fav:string|null = localStorage.getItem("favorites")
    let totalFav:number = 0
    if(fav != null) {
        const favArray:number[] = JSON.parse(fav);
        totalFav = favArray.length;
    }
    useEffect(()=>{
        const getPokemon = async () => {
            try {
                const data: GetAllPokemonResponse = await getAllPokemon()
                setAllPokemon(data.count);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching:", error);
            } finally {
                setLoading(false);
            }
        }
        getPokemon()
    },[])

    useEffect(()=>{
        const getPokemonTypes = async () => {
            try {
                const dataPokemonTypes: GetAllPokemonResponse = await getAllPokemonTypes()
                setAllPokemonType(dataPokemonTypes.count)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching:", error);
            } finally {
                setLoading(false);
            }
        }
        getPokemonTypes()
    },[])

    useEffect(()=>{
        const getPokemonAbility = async () => {
            try {
                const dataPokemonTypes: GetAllPokemonResponse = await getAllPokemonAbility()
                setAllPokemonAbility(dataPokemonTypes.count)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching:", error);
            } finally {
                setLoading(false);
            }
        }
        getPokemonAbility()
    },[])
    if (loading) {
        return <p>Loading Pokémon…</p>;
    }
    return (
        <main>
            <section className="dashboard-stats">
                <div className="stat-card">
                    <h3>Total Pokémon</h3>
                    <p className="stat-value">{allPokemon}</p>
                </div>
                <div className="stat-card">
                    <h3>Favorites</h3>
                    <p className="stat-value">{totalFav}</p>
                </div>
                <div className="stat-card">
                    <h3>Types</h3>
                    <p className="stat-value">{allPokemonType}</p>
                </div>
                <div className="stat-card">
                    <h3>Ability</h3>
                    <p className="stat-value">{allPokemonAbility}</p>
                </div>
            </section>

            <section className="charts">
                <div className="chart-card">
                    <h3>Base Stat of Top 5 Most Popular Pokémon</h3>
                    <p>In the context of Pokémon, base stats refer to the fundamental attributes that define a Pokémon's strength, speed, endurance, and other key characteristics in battles. Each Pokémon has a set of base stats that are used to calculate its performance in different areas such as health, attack power, defense, etc.</p>
                    <Top5PokemonChart typeName="attack" />
                    <Top5PokemonChart typeName="defense" />
                    <Top5PokemonChart typeName="hp" />
                    <Top5PokemonChart typeName="speed" />
                </div>
            </section>
        </main>

    )
}