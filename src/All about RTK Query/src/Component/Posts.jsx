import React, { useEffect, useState } from 'react';
import { useGetPostsQuery } from '../features/API/apiSlice';
import Post from './Post';

const Posts = () => {

    
    // const {data: posts, isLoading, isError, error} = useGetPostsQuery(10) // jodi limit kico na patai, tahole default vabe 5 jaita set korci oita pabe.
    
    // const {data: posts, isLoading, isError, error} = useGetPostsQuery(undefined, {
        //     // refetchOnFocus: true, // by default false thake. eita te o 60s er bepar ta ace. ami akta page e dukar por e jkn onno page e jai, then abr jkn oi page e back kori then ami chai je api ta ar akber refetch hok.
        //     // refetchOnReconnect: true, // by default false thake. internet disconnent howar por e abr reconnect hole. 
        
        //     // refetchOnMountOrArgChange: true, // this use most.
        //     refetchOnMountOrArgChange: 5, // this is better to use.
        // }) 
        
    // const [request, setRequest] = useState(true) 
    // const {data: posts, isLoading, isError, error} = useGetPostsQuery(undefined, { // it's a hook. You can't use a hook conditionally. or into the if else statement. hook, kkn o kono block er modde thakte parbo na. 
    //     skip: request  // by default false thake. false means api calling ta skip korbe na. true hole api calling ta skip korbe. kico akta check kore api call korte chai. other wise call korte chai na. 
    // }) 


    // const {data: posts, isLoading, isError, error} = useGetPostsQuery(undefined, {
    //     pollingInterval: 2000 // automatically it will refetch api in every 2 seconds. 
    // }) 

    const {
        data: posts, 
        isLoading, 
        isError, 
        error, 
        refetch 
    } = useGetPostsQuery() // data fetch er kaj ta ei line e automatically hoia jai. 


    // useEffect(()=> {
    //     refetch()
    // }, [refetch])
    // programmatically refetch er kaj ta akta button or whatever you want can do. 


    const [currentPostId, setCurrentPostId] = useState(null)

    let content; 

    if(isLoading) {
        content = <h1>Loading...</h1>
    }

    if(!isLoading && isError){
        content = <h1>There was an Error: {error}</h1>
    }

    if(!isLoading && ! isError) {
        if(posts.length > 0) {
            content = (
                <ul>
                    {
                      posts.map((post) => (
                            <li key={post.id}>
                                <a hrer="" onClick={()=> setCurrentPostId(post.id)}>{post.title}</a>
                            </li>
                        ))
                    }
                </ul>
            )
        } else{
            content = <h1>No Posts found!</h1>
        }
    }

    return (
        <div>
            {content}
            {currentPostId && <Post id={currentPostId} />}

            {/* Frogrammatically data fetching ta ke handle korar jonno */}
            {/* <button onClick={refetch}>Force ReFetch</button> */}
        </div>
    )

};

export default Posts;