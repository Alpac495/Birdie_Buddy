import React, { useEffect, useState } from 'react';
import * as ncloudchat from 'ncloudchat';

function NCloudChatComponent() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [nc, setNc] = useState(null);
    const [channels, setChannels] = useState(null);
    const [selectedChannel, setSelectedChannel] = useState(null);

    useEffect(() => {
        const initializeChat = async () => {
            const chat = new ncloudchat.Chat();
            await chat.initialize('08c17789-2174-4cf4-a9c5-f305431cc506');
            setNc(chat);

            chat.bind('onMessageReceived', function (channel, message) {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            await chat.connect({
                id: 'guest@company',
                name: 'Guest',
                profile: 'https://image_url',
                customField: 'json',
            });

            fetchChannels(chat); // fetchChannels 함수 호출 및 chat 인스턴스 전달
        };

        initializeChat();
    }, []);

    useEffect(() => {
        const fetchChannelMessages = async () => {
            try {
                if (!selectedChannel) return;
                const filter = { channel_id: selectedChannel.id };
                const sort = { created_at: -1 };
                const option = { offset: 0, per_page: 100 };
                const channelMessages = await nc.getMessages(filter, sort, option);
                console.log("channelMessages:", channelMessages);
                setMessages(channelMessages.edges);
            } catch (error) {
                console.error('Error fetching channel messages:', error);
                setMessages([]); // 메시지 목록 불러오기 실패 시 빈 배열로 설정
            }
        };

        fetchChannelMessages();
    }, [selectedChannel]);

    const fetchChannels = async (chat) => {
        try {
            const channels = await chat.getChannels({}, { created_at: -1 }, { offset: 0, per_page: 100 });
            console.log("Channels data:", channels); // 확인용 콘솔 로그
            setChannels(channels.edges);
            if (channels.length > 0) {
                setSelectedChannel(channels[0].node); // 첫 번째 채널 선택
            }
        } catch (error) {
            console.error('Error fetching channels:', error);
            setChannels([]); // 채널 목록 불러오기 실패 시 빈 배열로 설정
        }
    };

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

                const response = await nc.sendMessage(selectedChannel.id, {
                    type: 'text',
                    message: userInput,
                });

                setUserInput('');
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div style={{ width: '500px', height: '500px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'auto' }}>
            <div className="chatbox">
                {channels && channels.map(({ node }) => (
                    <div
                        key={node.id}
                        className={`message ${selectedChannel && selectedChannel.id === node.id ? 'selected' : ''}`}
                        onClick={() => setSelectedChannel(node)}
                    >
                        {node.name} - {node.lastMessage?.content || 'No message'}
                    </div>
                ))}
            </div>
            <div className="chat-messages">
                {messages.map((message) => (
                    <div key={message.id} className="message">
                        {message.sender.name}: {message.content}
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