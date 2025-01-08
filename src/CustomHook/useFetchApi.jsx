import { useState, useEffect } from 'react';

const useFetchApi = (url, initState) => {
    const [fetchData, setFetchData] = useState(initState)
    const [loading, setLoading] = useState(true)
    const [errorMsg, setErrorMsg] = useState("")

    const getData = async () => {
        try{
            const response = await fetch(url)
            if(!response.ok){
                throw new Error("Data can't fetch")
            }
            const data = await response.json()
            setFetchData(data)
        } catch(error){
            setErrorMsg(error.message)
        } finally {
            setLoading(false)
        }
    }


    useEffect(()=> {
        getData()
    }, [])

    


    return {fetchData, loading, errorMsg}
};

export default useFetchApi;