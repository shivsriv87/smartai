import React, { createContext, useState, useEffect } from 'react';

export const HistoryContext = createContext();

const HistoryProvider = ({ children }) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('history'));
        if (savedHistory) {
            setHistory(savedHistory);
        }
    }, []);

    const addHistoryItem = (item) => {
        const newHistory = [...history, item];
        setHistory(newHistory);
        localStorage.setItem('history', JSON.stringify(newHistory));
    };

    return (
        <HistoryContext.Provider value={{ history, addHistoryItem }}>
            {children}
        </HistoryContext.Provider>
    );
};

export default HistoryProvider;
