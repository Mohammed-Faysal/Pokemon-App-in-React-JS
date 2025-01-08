import React, { useState } from 'react';
import { useAddPostMutation } from '../features/API/apiSlice';

const AddPostForm = () => {
    const [catchVal, setCatchVal] = useState({
        title: '', 
        body: ''
    })

    const [addPost, {data: post, isLoading, isError, isSuccess}] = useAddPostMutation() // sodo data fetch er kaj ta automatically hoi. but data post er kaj ta automatically hobe na.

    const handleChange = (e) => {
        setCatchVal({
            ...catchVal,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addPost({
            ...catchVal, 
            userId: 1
        })
        setCatchVal({
            title: '', 
            body: ''
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder='Title'
                    name= "title"
                    value={catchVal.title}
                    onChange={handleChange}
                /><br/>
                <input type="text" 
                    placeholder='Body Text'
                    name= "body"
                    value={catchVal.body}
                    onChange={handleChange}
                /><br/>
                <button 
                    type='submit'
                    disabled={isLoading}
                >Add Post</button>
            </form>

            {isSuccess && <h1>Post added Successfully and Title was {post?.title} and Body was {post?.body}</h1>}

            {isError && <h1>An Unknown Error Accoured!</h1>}
        </div>
    );
};

export default AddPostForm;