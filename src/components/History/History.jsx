import React, { useContext, useState } from 'react';
import { HistoryContext } from '../../context/HistoryContext';
import './History.css'; // Import the CSS file for styling

const History = () => {
    const { history } = useContext(HistoryContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={`history-sidebar ${isOpen ? 'open' : ''}`}>
                <h2>Recent</h2>
                <ul>
                    {history.map((item, index) => (
                        <li key={index}>
                            <p>{item}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <button className="hamburger" onClick={toggleSidebar}>
                ☰
            </button>
        </>
    );
};

export default History;
