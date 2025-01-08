import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/API/apiSlice";

// lets create our own middleware using curry function. The action before going to the reducer you can do anything on the action in this middleware. 
// const myLogger = (store) => (next) => (action) => {
//     console.log(`Action: ${action}`);
//     console.log(`Current State: ${store.getState()}`); // jkn button e click korteci, tkn state er value koto.
//     return next(action) // kaj complete korar por e action ta ke abr chari dite hobe. 
// }

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer // before for synchronous functionality we used name as the folder name. But when we use RTK Query then we have to use the name dynamically. That means RTK Query automatically Reducer create kore dice. 
    }, 
    // middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(myLogger) // here we will get an array. Array r sate concat korbo amr nijer middleware. // Redux also have some own middleware. So, we can't erase this middleware. we must keep this middleware and with these middleware we can write our custom middleware.

    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware) // that means RTK Query amake akta readymate middleware create kore diche.
})

export default store