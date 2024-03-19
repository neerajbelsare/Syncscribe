import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const [sessionId, setSessionId] = useState('');
    const [username, setUsername] = useState('');
    const createNewSession = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setSessionId(id);
        toast.success('Created a new session');
    };

    const joinSession = () => {
        if (!sessionId || !username) {
            toast.error('Session ID & Name is required');
            return;
        }

        // Redirect
        navigate(`/editor/${sessionId}`, {
            state: {
                username,
            },
        });
    };

    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            joinSession();
        }
    };
    return (
        <div className="flex items-center justify-center  h-screen">
            <div className="flex flex-col items-center justify-center bg-[#232323] p-[20px] rounded-[10px] w-[400px] max-w-[90%]">
                <img
                    className="h-[80px] mb-3"
                    src="/logo.png"
                    alt="Synscribe Logo"
                />
                <h4 className="text-gray-400 text-xl mb-4">Enter the Session ID</h4>
                <div className="flex flex-col">
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="Session ID"
                        onChange={(e) => setSessionId(e.target.value)}
                        value={sessionId}
                        onKeyUp={handleInputEnter}
                    />
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="Name"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        onKeyUp={handleInputEnter}
                    />
                    <button className="btn joinBtn mb-3" onClick={joinSession}>
                        Join
                    </button>
                    <span className="text-gray-400">
                        Don't have an invite? Create &nbsp;
                        <a
                            onClick={createNewSession}
                            href=""
                            className="createNewBtn"
                        >
                            a new Session
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Home;