import React, { useContext, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import { ThemeContext } from './context/ThemeContext';

const App = () => {
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <>
            <Sidebar />
            <Main />
        </>
    );
};

export default App;
