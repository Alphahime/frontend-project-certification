import React, { useState } from 'react';
import MessageInput from './MessageInput';
import './ChatBoard.css';

const ChatBoard = ({ coachId }) => {
    const [messages, setMessages] = useState([]);

   
    const addMessage = (messageText) => {
        const newMessage = {
            id: messages.length + 1,
            text: messageText,
            sender: 'user', 
            timestamp: new Date(),
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <div className="chat-board">
            <h4>Envoyer un message à votre coach</h4>
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
