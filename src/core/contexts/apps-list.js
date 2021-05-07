import React, { createContext, useState, useContext } from 'react';

const AppsListContext = createContext();

export default function AppsListProvider({ children }) {
    const [appsList, setAppsList] = useState([]);
    return (
        <AppsListContext.Provider
            value={{
                appsList,
                setAppsList,
            }}
        >
            { children }
        </AppsListContext.Provider>
    );
}

export function useAppsList() {
    const context = useContext(AppsListContext);
    const { appsList, setAppsList } = context;

    return { appsList, setAppsList };
}
