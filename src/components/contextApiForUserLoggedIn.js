import React, { useState, createContext } from 'react';
export const myContext = createContext();

export function Context(props) {
    const [getuser, setUser] = useState({
        user: []
    });

    return (
        <myContext.Provider value={[getuser, setUser]}>
            {props.children}
        </myContext.Provider >

    );
}