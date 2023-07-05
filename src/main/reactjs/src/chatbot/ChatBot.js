import React from 'react';
import Bot from './Bot';

function ChatBot(props) {
    return (
        <div>
            <div style={{ width: '500px', height: '500px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'auto' }}>
                <Bot />
            </div>
        </div>
    );
}

export default ChatBot;