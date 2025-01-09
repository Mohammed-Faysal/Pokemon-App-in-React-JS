import { useState } from 'react';
import Pagination from '../Components/Pagination';
import { useNavigate } from 'react-router-dom';
import useFetchApi from '../CustomHook/useFetchApi';
import {providerCtx} from '../Context/SearchBarCtx'

const Home = () => {

    const {fetchData, loading, errorMsg} = useFetchApi('https://pokeapi.co/api/v2/pokemon?limit=50', null)
    const navigate = useNavigate()
    
    const storedPage = localStorage.getItem("currentPage");
    const [currentPage, setCurrentPage] = useState(storedPage ? parseInt(storedPage) : 1);

    const {catchVal} = providerCtx()


    // Pagination
    const itemsPerPage = 6; 
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = fetchData?.results?.filter((pokemon) => pokemon.name.toLowerCase().includes(catchVal.toLowerCase())).slice(indexOfFirstItem, indexOfLastItem);
    const nPage = fetchData?.results?.length ? Math.ceil(fetchData.results.length / itemsPerPage) : 0;
    

    const handleNavigate = (name) => {
        navigate(`/details/${name}?page=${currentPage}`);
    };


    return (
        <div className='mt-32'>
            {loading && (
                <div className="flex items-center justify-center text-3xl">
                  <button className='bg-blue-400 py-2 px-5 rounded text-white'>
                    Processing...
                  </button>
                </div>
            )} 

            {!loading && errorMsg && <h1 className='italic text-red-500 text-center'>There is an Error: {errorMsg}</h1>}

            {!loading && 
            !errorMsg && 
            fetchData?.results?.length > 0 && (
                <div className='max-w-[1200px] m-auto flex flex-wrap justify-center items-center gap-5'>
                    {currentItems.map((data, index) => {

                    // Extract the Pokémon ID from the URL
                    const id = data.url.split('/').filter(Boolean).pop();
                    
                    console.log(id);

                    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
                        // const imageUrl = `https://pokeapi.co/api/v2/pokemon/${data.name}`
                        return (
                            <div key={index} className='w-[350px] shadow-xl rounded-lg border border-dashed border-blue-500 bg-white p-5 hover:scale-105 transition-all'>
                                <img src={imageUrl} alt="" className='w-48 m-auto border border-dashed border-blue-500 rounded-3xl'/>
                                <h1 className='text-center uppercase font-bold text-xl mb-6'>{data.name}</h1>
                                <button  
                                    className='bg-blue-400 py-2 px-5 w-full rounded text-white shadow-xl'
                                    onClick={()=> handleNavigate(data.name)}
                                >View Details</button>
                                
                            </div>
                        )
                    })}
                </div>
            )}



        {/* Pagination Controls */}
        <Pagination 
            fetchData={fetchData}
            nPage={nPage}
            indexOfFirstItem={indexOfFirstItem}
            indexOfLastItem={indexOfLastItem}
            currentPage = {currentPage}
            setCurrentPage= {setCurrentPage}
        />
        
        </div>
    );
};

export default Home;