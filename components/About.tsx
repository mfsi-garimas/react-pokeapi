export default function About() {
    return (
        <main>
            <section className="about">
                <div className="about-container">
                    <h2 className="about-title">About This App</h2>
                    <p className="about-description">
                        Welcome to the world of Pokémon! This app allows you to explore data from the <strong>PokéHeroes API</strong>,
                        view detailed Pokémon information, and interact with a dynamic dashboard displaying important stats and charts.
                    </p>

                    <h3 className="api-header">API Used:</h3>
                    <p className="api-description">
                        This app pulls data from the <strong>PokéHeroes API</strong>, which provides detailed information about all Pokémon and their stats.
                    </p>

                    <h3 className="features-header">Features:</h3>
                    <ul className="features-list">
                        <li className="feature-item">🔍 Search and filter Pokémon</li>
                        <li className="feature-item">📊 View detailed Pokémon information</li>
                        <li className="feature-item">📈 Interactive charts and stats</li>
                        <li className="feature-item">⭐ Favorites list with persistent storage</li>
                    </ul>
                </div>
            </section>
        </main>

    )
}
