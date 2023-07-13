import React, {useEffect, useState} from 'react';
import * as ncloudchat from "ncloudchat";

function NCloudChatComponent() {

    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [nc, setNc] = useState(null);
    const [channelId, setChannelId] = useState('');

    useEffect(() => {
        const initializeChat = async () => {
            const chat = new ncloudchat.Chat();
            await chat.initialize('08c17789-2174-4cf4-a9c5-f305431cc506');
            setNc(chat);

            chat.bind('onMessageReceived', function (channel, message) {
                setMessages(prevMessages => [...prevMessages, message]);
            });

            await chat.connect({
                id: 'guest@company',
                name: 'Guest',
                profile: 'https://image_url',
                customField: 'json',
            });

            const existingChannelId = '3798edd0-acff-410a-a5b5-986d45830a60';
            await chat.subscribe(existingChannelId);
            setChannelId(existingChannelId);
        };

        initializeChat();
    }, []);

    const handleUserInput = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userInput.trim() !== '') {
            try {
                if (!nc) {
                    throw new Error('Chat is not initialized');
                }

                const response = await nc.sendMessage(channelId, {
                    type: 'text',
                    message: userInput,
                });

                setMessages(prevMessages => [...prevMessages, response]);
                setUserInput('');
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div>
            <div className="chatbox">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        {message.content}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Type your message"
                    value={userInput}
                    onChange={handleUserInput}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default NCloudChatComponent;