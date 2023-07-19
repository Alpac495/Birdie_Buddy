import React from 'react';
import NCloudChatComponent from "./NCloudChatComponent";
import NCloudChatRoomList from "./NCloudChatRoomList";

function ChatBot(props) {
    return (
        <div>
            <div>
                {/*<NCloudChatRoomList/>*/}
                <NCloudChatComponent/>
            </div>
        </div>
    );
}

export default ChatBot;