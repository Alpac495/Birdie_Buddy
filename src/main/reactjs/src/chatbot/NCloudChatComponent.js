import React, { useEffect, useState } from 'react';
import * as ncloudchat from 'ncloudchat';

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
                setMessages((prevMessages) => {
                    // 중복된 메시지인지 확인하고 필요에 따라 중복을 제거하는 로직 추가
                    const isDuplicate = prevMessages.some((prevMessage) => prevMessage.message_id === message.message_id);
                    if (isDuplicate) {
                        return prevMessages; // 중복된 메시지면 이전 상태를 그대로 반환
                    }
                    return [...prevMessages, message]; // 중복이 아니면 새 메시지를 추가하여 반환
                });
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

                // 메시지 전송 후 상태 변경하지 않도록 수정
                // setMessages(prevMessages => [...prevMessages, response]);
                setUserInput('');
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div style={{ width: '500px', height: '500px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'auto' }}>
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