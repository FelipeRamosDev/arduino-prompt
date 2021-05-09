import React, { createContext, useState, useContext } from 'react';

const BtListenerContext = createContext();

export default function BtListenerProvider({ children }) {
    const [btListener, setBtListener] = useState([]);
    return (
        <BtListenerContext.Provider
            value={{
                btListener,
                setBtListener,
            }}
        >
            { children }
        </BtListenerContext.Provider>
    );
}

export function useBtListener() {
    const context = useContext(BtListenerContext);
    const { btListener, setBtListener } = context;

    return { btListener, setBtListener };
}
