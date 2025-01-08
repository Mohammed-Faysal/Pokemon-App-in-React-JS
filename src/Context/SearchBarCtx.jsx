import { createContext, useContext, useState } from "react";

const newCtx = createContext()

import React from 'react';

const SearchBarCtx = ({children}) => {
    const [catchVal, setCatchVal] = useState("")

    const value = {
        catchVal, 
        setCatchVal
    }

    return (
        <newCtx.Provider value={value}>
            {children}
        </newCtx.Provider>
    );

};

export default SearchBarCtx;

export const providerCtx = () => {
    return useContext(newCtx)
}
