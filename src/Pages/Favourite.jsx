import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Favourite = () => {
  const [pokeData, setPokeData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favouritePoke')) || [];
    setPokeData(storedFavorites);
  }, []);

  const handleNavigate = (name) => {
    navigate(`/details/${name}`);
  };

  const removeFromFavorites = (name) => {
    const updatedFavorites = pokeData.filter((poke) => poke.name !== name);
    localStorage.setItem('favouritePoke', JSON.stringify(updatedFavorites));
    setPokeData(updatedFavorites);
  };

  return (
    <div className="mt-28">
      <h1 className="text-center text-5xl font-bold mb-10">
        Your <span className="text-red-500">Favourite</span> Pokémon
      </h1>

      {pokeData.length > 0 ? (
        <div className="max-w-[1200px] m-auto flex flex-wrap justify-center items-center gap-5">
          {pokeData.map((favourite, index) => (
            <div
              key={index}
              className="w-[350px] shadow-xl rounded-lg border border-blue-500 bg-white p-5 hover:scale-105 transition-all"
            >
              <img
                src={favourite.sprites.front_default}
                alt={favourite.name}
                className="w-48 m-auto"
              />
              <h1 className="text-center uppercase font-bold text-xl mb-6">
                {favourite.name}
              </h1>
              <div className="flex justify-between items-center">
                <button
                  className="bg-blue-400 py-2 px-5 rounded text-white"
                  onClick={() => handleNavigate(favourite.name)}
                >
                  View Details
                </button>
                <button
                  className="bg-red-400 py-2 px-5 rounded text-white flex items-center gap-2"
                  onClick={() => removeFromFavorites(favourite.name)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-2xl">No Favorite Pokémon Found!</h2>
      )}
    </div>
  );
};

export default Favourite;
