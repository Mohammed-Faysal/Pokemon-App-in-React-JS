import React, { useEffect, useState } from 'react';
import {useEditPostMutation } from '../features/API/apiSlice';

const EditPostForm = ({post}) => {

    const [catchVal, setCatchVal] = useState({ // useState er modde je value ta dibo, saita initial value. and oita akber e use hobe. porer ber oita r dynamic value hisab e change hobe na.
        title: post?.title,
        body: post?.body
    })

    const [editPost, {data, isLoading, isError, isSuccess}] = useEditPostMutation() // sodo data fetch er kaj ta automatically hoi. but data patch er kaj ta automatically hobe na.

    useEffect(()=> {
        setCatchVal({
            title: post?.title,
            body: post?.body
        })
    }, [post])

    const handleChange = (e) => {
        setCatchVal({
            ...catchVal,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        editPost({
            id: post.id,
            data: {
                ...catchVal, 
                userId: post?.userId
            }
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

            {isSuccess && <h1>Post added Successfully and Title was {data?.title} and Body was {data?.body}</h1>}

            {isError && <h1>An Unknown Error Accoured!</h1>}
        </div>
    );
};

export default EditPostForm;