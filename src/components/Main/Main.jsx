import React, { useContext, useState } from 'react';
import "./Main.css";
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    const { theme } = useContext(ThemeContext);
    const { user, signIn, signOut, loading: authLoading } = useContext(AuthContext);
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);

    const handleVoiceInput = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Sorry, your browser does not support speech recognition.");
            return;
        }

        if (!recognition) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const newRecognition = new SpeechRecognition();
            newRecognition.continuous = false;
            newRecognition.interimResults = false;
            newRecognition.lang = 'en-US';

            newRecognition.onstart = () => {
                setIsListening(true);
            };

            newRecognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
                setIsListening(false);
            };

            newRecognition.onerror = (event) => {
                console.error("Speech recognition error", event);
                setIsListening(false);
            };

            newRecognition.onend = () => {
                setIsListening(false);
            };

            setRecognition(newRecognition);
            newRecognition.start();
        } else {
            if (isListening) {
                recognition.stop();
            } else {
                recognition.start();
            }
        }
    };

    return (
        <div className={`main ${theme}`}>
            <div className={`nav ${theme}`}>
                <p>Smart AI</p>
                {authLoading ? (
                    <p>Loading...</p>
                ) : user ? (
                    <div>
                        <img src={user.getImageUrl()} alt="User" />
                        <button onClick={signOut}>Sign Out</button>
                    </div>
                ) : (
                    <button onClick={signIn}>Sign In with Google</button>
                )}
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hi there!</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className='cards'>
                            <div className="card">
                                <p>Suggest some beautiful places to see on an upcoming road trip</p>
                                <img src={assets.compass_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Summarize this topic: urban planning</p>
                                <img src={assets.bulb_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Generate a paragraph on topic: MNCs working</p>
                                <img src={assets.message_icon} alt="" />
                            </div>
                            <div className="card">
                                <p>Write Javascript code to print factorial of a number</p>
                                <img src={assets.code_icon} alt="" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className='result-data'>
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? (
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}
                        </div>
                    </div>
                )}
                <div className={`main-bottom ${theme}`}>
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder='Enter a prompt here'
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img 
                                src={isListening ? assets.mic_active_icon : assets.mic_icon} 
                                alt="" 
                                onClick={handleVoiceInput} 
                                style={{ cursor: 'pointer' }} 
                            />
                            <img onClick={() => onSent(input)} src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <p className="bottom-info">
                        Smart AI can make mistakes. Check important info.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
