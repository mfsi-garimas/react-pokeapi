import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Top5PokemonChartProps {
  typeName: string;
}

interface PokemonStatEntry {
  name: string;
  attackStat: number;
}

const Top5PokemonChart: React.FC<Top5PokemonChartProps> = ({ typeName }) => {
  const [pokemonData, setPokemonData] = useState<PokemonStatEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTopPokemonData = async () => {
      setLoading(true);
      try {
        const pokemonNames = ["pikachu", "charizard", "bulbasaur", "squirtle", "eevee"];
        const pokemonStats = await Promise.all(
          pokemonNames.map(async (name): Promise<PokemonStatEntry> => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const data = await response.json();

            const baseStat: number =
              data.stats.find((stat: any) => stat.stat.name === typeName)?.base_stat ?? 0;

            return {
              name: data.name,
              attackStat: baseStat,
            };
          })
        );

        setPokemonData(pokemonStats);
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopPokemonData();
  }, [typeName]);

  const chartData: ChartData<'bar', number[], string> = {
    labels: pokemonData.map((pokemon) => pokemon.name),
    datasets: [
      {
        label: `${typeName} Base Stat`,
        data: pokemonData.map((pokemon) => pokemon.attackStat),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Top 5 Pokémon by ${typeName}`,
      },
    },
  };

  return (
    <div>
      {loading ? (
        <p>Loading Pokémon data...</p>
      ) : (
        <Bar data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default Top5PokemonChart;
