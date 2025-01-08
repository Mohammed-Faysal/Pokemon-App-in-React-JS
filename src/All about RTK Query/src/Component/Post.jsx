import React from 'react';
import { useGetPostQuery } from '../features/API/apiSlice';
import EditPostForm from './EditPostForm';

const Post = ({id}) => {
    const {data: post, isLoading, isError} = useGetPostQuery(id)

    let contentId = null
    let content = null

    if(isLoading){
        contentId = null
        content = <h1>Loading post...</h1>
    }

    if(!isLoading && isError){
        contentId = null
        content = <h1>There was an error occured!</h1>
    }

    if(!isLoading && !isError && post?.id){
        contentId = post.id
        content = post.body
    }

    return (
        <div style={{marginTop: "30px"}}>
            <p>Details: {content}</p>
            <p>ID: {contentId}</p>
            {/* {post?.id && <EditPostForm post={post}/>} */}
            {post?.id && <EditPostForm post={post}/>}
        </div>
    );
};

export default Post;
