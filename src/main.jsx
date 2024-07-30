import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ThemeProvider from './context/ThemeContext';
import ContextProvider from './context/Context';
import HistoryProvider from './context/HistoryContext';
import AuthProvider from './context/AuthContext';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <AuthProvider>
        <ThemeProvider>
            <HistoryProvider>
                <ContextProvider>
                    <App />
                </ContextProvider>
            </HistoryProvider>
        </ThemeProvider>
    </AuthProvider>,
);
