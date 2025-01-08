import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // We can use redux anything. So, here we are useing redux with react. so, we have to import from react.

export const apiSlice = createApi({ // instead of createSlice we have to use createApi for RTK query.
    reducerPath: 'api', // instead of name  // if you don't give any name. Then automatically it will take 'api' as name.
    baseQuery: fetchBaseQuery({ // base of an API url is always same for all task we will do on this URL. 
        baseUrl: 'https://jsonplaceholder.typicode.com',
    }),
    tagTypes: ["posts", "post"],
    endpoints: (builder) => ({
        getPosts: builder.query({
            // query: '/post' // static way. This is not prefferable.
            query: (limit = 5) => `/posts?_limit=${limit}`,
            // keepUnusedDataFor: 3 // jodi kono valu na dei, tahole default vabe 60 seconds porjunto unused obostai thakbe. akn 3 second por e jkn show hide button e press korbo, tkn cache r kaj korbe na. I mean abr api call korbe.
            providesTags: ["posts"] // Tracks and identifies specific cached data related to an endpoint. // to connect one api with another api.
        }),
        getPost: builder.query({
            query: (id) => `/posts/${id}`, // object er maddome e o set korte pari. 
            providesTags: (result, error, arg) => [{ type: "post", id: arg.id }],  // result = single post ta, arg = id.  post/1  post/2  post/3   That means dynamic tag, 
            keepUnusedDataFor: 0, // Controls how long the cached data remains available after it is no longer actively used.
        }),
        addPost: builder.mutation({ // change 
            query: (data) => ({
                url: "/posts",
                method: 'POST',
                body: data, 
            }),
            invalidatesTags: ["posts"] // kaj hoia gele invalid kore dite hobe.
        }),
        editPost: builder.mutation({
            query: ({id, data}) => ({
                url: `/posts/${id}`,
                method: 'PATCH',
                body: data, 
            }),
            // invalidatesTags: ["posts"] // kaj hoia gele invalid kore dite hobe.

            invalidatesTags: (result, error, arg) => [{ type: "post", id: arg.id }]
        }),

    })  
}) 

export const {useGetPostsQuery, useGetPostQuery, useAddPostMutation, useEditPostMutation} = apiSlice; // endpoint er bitor e je getPost ache oita ke akta hook banai diche RTK Query.