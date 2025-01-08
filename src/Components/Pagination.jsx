const Pagination = ({fetchData, nPage, indexOfFirstItem, indexOfLastItem, currentPage, setCurrentPage}) => {

    const numbers = [...Array(nPage + 1).keys()].slice(1)

    // Handle next and previous buttons
    const handleNext = () => {
        if (currentPage < nPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const changePage = (pageNum) => {
        setCurrentPage(pageNum)
    }


    return (
        <div className='max-w-[1090px] m-auto mt-5 flex justify-between items-center'>

            <div>
                    <span className='font-semibold'>{`Showing ${indexOfFirstItem + 1} to ${indexOfLastItem > 50 ? 50 : indexOfLastItem} of ${fetchData?.results?.length} results`}</span>
            </div>

            <div className="flex justify-center items-center mt-5">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`py-2 px-3 rounded-tl-md rounded-bl-md ${
                        currentPage === 1 ? "cursor-not-allowed bg-gray-300" : "bg-blue-500"
                    } text-white`}
                >
                <i className="bi bi-chevron-double-left"></i>
                </button>

                {
                    numbers.map((num, index) => (
                        <button 
                           key={index} 
                           onClick={()=> changePage(num)}
                           className={` p-2 px-4 border-l ${currentPage === num ? "bg-blue-500 text-white" : "bg-white text-black"}`}
                        >
                            {num}
                        </button>
                    ))
                }

                <button
                    onClick={handleNext}
                    disabled={currentPage === nPage}
                    className={`p-2 px-3 rounded-tr-md rounded-br-md ${
                        currentPage === nPage
                        ? "cursor-not-allowed bg-gray-300"
                        : "bg-blue-500"
                    } text-white`}
                >
                <i className="bi bi-chevron-double-right"></i>
                </button>

            </div>

          </div>
    );
};

export default Pagination;