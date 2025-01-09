import { useParams } from 'react-router-dom';
import useFetchApi from '../CustomHook/useFetchApi';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const DetailsPage = () => {
  const { name } = useParams();
  const { fetchData: info, loading, errorMsg } = useFetchApi(`https://pokeapi.co/api/v2/pokemon/${name}`, null);

  const storedFavorites = localStorage.getItem('favouritePoke');
  const [existingFavorites, setExistingFavorites] = useState(storedFavorites ? JSON.parse(storedFavorites) : []);


  const addToFavouritePage = () => {

    const isAlreadyFavorited = existingFavorites.filter((poke) => poke.name === info.name);

    if (isAlreadyFavorited) {
      toast.info('Pokémon is already in Favorites!', { position: 'top-right' });
      return;
    }

    const updatedFavorites = [...existingFavorites, info];
    
    setExistingFavorites(updatedFavorites);
    localStorage.setItem('favouritePoke', JSON.stringify(updatedFavorites));

    toast.success('Pokémon added to Favorites!', { position: 'top-right' });
  };

  return (
    <div className="mt-32 max-w-[1090px] m-auto">
      {loading && (
        <div className="flex items-center justify-center text-3xl">
          <button className="bg-blue-400 py-2 px-5 rounded text-white">
            Processing...
          </button>
        </div>
      )}

      {!loading && errorMsg && (
        <h1 className="italic text-red-500 text-center">
          There is an Error: {errorMsg}
        </h1>
      )}

      {info && (
        <div>
          <div className="flex flex-row sm:flex-row-reverse justify-around items-center flex-wrap gap-5">
            <img
              src={info.sprites.front_default}
              alt={info.name}
              className="w-[400px] bg-white rounded shadow-sm"
            />
            <div className="text-xl bg-white rounded shadow-sm p-5">
              <h1 className="uppercase text-2xl">
                <b>Name:</b> {info.name}
              </h1>
              <div className="mt-4">
                <h2 className="text-lg font-bold">Abilities:</h2>
                {info.abilities.map((abi, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 bg-gray-200 rounded m-1"
                  >
                    {abi.ability.name}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-bold">Types:</h2>
                {info.types.map((ty, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 bg-gray-200 rounded m-1"
                  >
                    {ty.type.name}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-bold">Stats:</h2>
                {info.stats.map((st, index) => (
                  <span
                    key={index}
                    className="block px-2 py-2 bg-gray-200 rounded m-1"
                  >
                    {st.stat.name}: {st.base_stat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <button
              className="bg-red-400 py-2 px-8 text-xl rounded text-white flex items-center gap-2 shadow-[0px_4px_15px_rgba(239,68,68,0.7)] hover:shadow-[0px_6px_20px_rgba(239,68,68,0.9)] transition-shadow duration-300"
              onClick={addToFavouritePage}
            >
              <i className="bi bi-heart"></i> Favourite
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
