import React from 'react';
import NCloudChatComponent from "./NCloudChatComponent";

function ChatBot(props) {
    return (
        <div>
            <div style={{ width: '500px', height: '500px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'auto' }}>
                <NCloudChatComponent/>
            </div>
        </div>
    );
}

export default ChatBot;