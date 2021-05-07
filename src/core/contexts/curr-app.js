import React, { createContext, useState, useContext } from 'react';

const CurrAppContext = createContext();

export default function CurrAppProvider({ children }) {
    const [currApp, setCurrApp] = useState(false);
    return (
        <CurrAppContext.Provider
            value={{
                currApp,
                setCurrApp,
            }}
        >
            { children }
        </CurrAppContext.Provider>
    );
}

export function useCurrApp() {
    const context = useContext(CurrAppContext);
    const { currApp, setCurrApp } = context;

    return { currApp, setCurrApp };
}
