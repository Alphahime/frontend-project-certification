import React, { useState } from 'react';
import MessageInput from './MessageInput';
import './ChatBoard.css';

const ChatBoard = ({ coachId }) => {
    const [messages, setMessages] = useState([]);

    // Fonction pour ajouter un nouveau message
    const addMessage = (messageText) => {
        const newMessage = {
            id: messages.length + 1,
            text: messageText,
            sender: 'user', // On peut gérer plusieurs types d'utilisateurs ici
            timestamp: new Date(),
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <div className="chat-board">
            <h3>Chat avec votre coach</h3>
            <div className="message-list">
                {messages.map((message) => (
                    <div key={message.id} className="message">
                        <span className="sender">{message.sender}:</span> {message.text}
                        <div className="timestamp">{message.timestamp.toLocaleTimeString()}</div>
                    </div>
                ))}
            </div>
            <MessageInput onSendMessage={addMessage} />
        </div>
    );
};

export default ChatBoard;
