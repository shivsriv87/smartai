import React, { useContext, useState } from 'react';
import "./Sidebar.css";
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import { HistoryContext } from '../../context/HistoryContext';
import { ThemeContext } from '../../context/ThemeContext';

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, resetChat } = useContext(Context);
    const { history } = useContext(HistoryContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    const handleNewChat = () => {
        resetChat();
    };

    return (
        <div className={`sidebar-container ${theme}`}>
            <div className={`sidebar ${theme}`}>
                <div className='top'>
                    <img onClick={() => setExtended(prev => !prev)} className="menu" src={assets.menu_icon} alt="menu icon" />
                    <div className='new-chat' onClick={handleNewChat}>
                        <img src={assets.plus_icon} alt="new chat icon" />
                        {extended ? <p>New Chat</p> : null}
                    </div>
                    {extended ? (
                        <div className='recent'>
                            <p className='recent-title'>Recent</p>
                            {prevPrompts.map((item, index) => (
                                <div key={index} onClick={() => loadPrompt(item)} className='recent-entry'>
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.slice(0, 18)} ...</p>
                                </div>
                            ))}
                            <p className='history-title'>History</p>
                            {history.map((item, index) => (
                                <div key={index} className='history-entry'>
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.slice(0, 18)} ...</p>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
                <div className='bottom'>
                    <div className="bottom-item recent-entry">
                        <img src={assets.question_icon} alt="" />
                        {extended ? <p>Help</p> : null}
                    </div>
                    <div className="bottom-item recent-entry">
                        <img src={assets.history_icon} alt="" />
                        {extended ? <p>Activity</p> : null}
                    </div>
                    <div className="bottom-item recent-entry settings-button" onClick={toggleSettings}>
                        <img src={assets.setting_icon} alt="" />
                        {extended ? <p>Settings</p> : null}
                    </div>
                </div>
            </div>
            {isSettingsOpen && (
                <div className={`settings-dropdown ${theme}`}>
                    <div className="settings-item">
                        <p>Extensions</p>
                    </div>
                    <div className="settings-item">
                        <p>Your public links</p>
                    </div>
                    <div className="settings-item">
                        <label className="theme-toggle">
                            <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
                            Dark Theme
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
