import { useParams } from "react-router-dom";
import { useState, useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPokemonByID } from "../api/getPokemonByID";
import { CommentData } from "../types/pokemon";
export default function ItemDetail() {
    const { pid } = useParams<{ pid: string }>();
    const pokemonId = pid ? parseInt(pid, 10) : null;

    const [pokemonData, setpokemonData] = useState<any>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [comments, setComments] = useState<CommentData[]>([]);
    const [fav, setFav] = useState<number[]>([]);
    let commentsData =[]
    useEffect(()=>{
        const getPokemonData = async () => {
            try {
                const data:Promise<any> = await getPokemonByID(pokemonId)
                setpokemonData(data)
                setLoading(false);
            } catch (error) {
                console.error("Error fetching:", error);
                setLoading(false);
            } finally {
                setLoading(false);
            }  
        }

        getPokemonData()
    },[])

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites")
        const storedFavs: number[] = storedFavorites ? JSON.parse(storedFavorites) : []
        setFav(storedFavs)

        const commentsFromStorage = localStorage.getItem("comments")
        const storedComments: CommentData[] = commentsFromStorage ? JSON.parse(commentsFromStorage) : []
        setComments(storedComments)
        
    }, []);    

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(fav));
    }, [fav]);   
    
    const isFavorite = pokemonId !== null && fav.includes(pokemonId);

    function addToFavorite() {
        if(isFavorite) {
            setFav(fav.filter(id => id !== pokemonId));
            toast.error(`${pokemonData.name} Removed as Favourite`);
        } else {
            if (pokemonId !== null) {
                setFav([...fav, pokemonId]);
                toast.success(`${pokemonData.name} Added as Favourite`);
            }
        }
    }   
    
    function handleComments(formData: FormData) {
        const comment = formData.get("comment")
        if(pokemonId != null && comment && typeof comment === "string") {
            const newComment: CommentData = {
                pokemonId: pokemonId,
                comment: comment,
            };
            setComments(prev => ([
                ...prev,
                newComment
            ]))
            toast.success(`Comment Added for ${pokemonData.name}`);
        }
        
    }

    useEffect(() => {
        if (comments.length > 0) {
            localStorage.setItem("comments", JSON.stringify(comments));
        }
    }, [comments]);

   
    if(loading) {
        return <p>Loading Pokémon…</p>;
    }

    function getStatValue(statName: string): number | string {
        const stat = pokemonData.stats.find((s: { stat: { name: string } }) => s.stat.name === statName);
        return stat ? stat.base_stat : "N/A";
    }

    return (
        <main>
        <section className="pokemon-detail">
            <div className="detail-header">
                <h2>{pokemonData.name}</h2>
                <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
                <img src={pokemonData.sprites.back_default} alt={pokemonData.name} />
            </div>

            {/* <div className="pokemon-description">
                <h3>Description</h3>
                <p>Bulbasaur is a dual-type Grass/Poison Pokémon. It evolves into Ivysaur starting at level 16.</p>
            </div> */}

            <div className="pokemon-stats">
                <h3>Stats</h3>
                <ul>
                    <li><strong>Type:</strong>{pokemonData.types.map((t: { type: { name: string } }) => t.type.name).join(", ")}</li>
                    <li><strong>HP:</strong> {getStatValue("hp")}</li>
                    <li><strong>Attack:</strong> {getStatValue("attack")}</li>
                    <li><strong>Defense:</strong> {getStatValue("defense")}</li>
                    <li><strong>Speed:</strong> {getStatValue("speed")}</li>
                    <li><strong>Weight:</strong> {pokemonData.weight}</li>
                </ul>
            </div>

            <button id="add-favorite" className={isFavorite ? "active" : ""} onClick={addToFavorite}>❤️ Add to Favorites</button>
             <ToastContainer />
        </section>

        <div className="comment-box">
  <h3>Comments</h3>

  <form action={handleComments}>
    <textarea id="comment-input" placeholder="Write a comment..." name="comment"></textarea>
    <button id="comment-submit" type="submit">💬 Post Comment</button>
  </form>
  <ul id="comment-list">
    {comments.filter((c)=> c.pokemonId == pokemonId).map((commentData, index) => (
          <li key={index} className="comment-item">
            <strong>{localStorage.getItem("userAnonymousName")}</strong>
            <p>{commentData.comment}</p>
          </li>
    ))}
  </ul>
</div>

    </main>
    )
}