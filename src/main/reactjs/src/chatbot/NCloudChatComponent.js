import React, { useEffect, useState } from 'react';
import * as ncloudchat from 'ncloudchat';

const NCloudChatComponent = ({ selectedChannel }) => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [nc, setNc] = useState(null);

    useEffect(() => {
        let chat = null;

        const initializeChat = async () => {
            chat = new ncloudchat.Chat();
            await chat.initialize('08c17789-2174-4cf4-a9c5-f305431cc506');
            setNc(chat);

            chat.bind('onMessageReceived', function (channel, message) {
                if (channel.id === selectedChannel?.id) {
                    setMessages((prevMessages) => [...prevMessages, message]);
                }
            });

            await chat.connect({
                id: 'guest@company',
                name: 'Guest',
                profile: 'https://image_url',
                customField: 'json',
            });

            if (selectedChannel) {
                fetchChannelMessages(chat, selectedChannel.id);
            }
        };

        initializeChat();

        return () => {
            if (chat) {
                chat.disconnect();
            }
        };
    }, [selectedChannel]);

    useEffect(() => {
        // 메시지가 업데이트될 때마다 화면을 스크롤 아래로 이동
        const chatMessagesDiv = document.getElementById('chat-messages');
        if (chatMessagesDiv) {
            chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
        }
    }, [messages]);
    const fetchChannelMessages = async () => {
        try {
            if (!selectedChannel) return;
            const filter = { channel_id: selectedChannel.id };
            const sort = { created_at: -1 }; // 오름차순으로 변경
            let offset = 0;
            const per_page = 100; // 한 번에 가져올 대화 개수
            let allMessages = [];

            while (true) {
                const option = { offset, per_page };
                const channelMessages = await nc.getMessages(filter, sort, option);
                const messages = channelMessages.edges.map((edge) => edge.node);
                allMessages = allMessages.concat(messages);

                if (messages.length < per_page) {
                    // 더 이상 가져올 대화 내용이 없으면 반복문 종료
                    break;
                }

                offset += per_page;
            }

            setMessages(allMessages);
        } catch (error) {
            console.error('Error fetching channel messages:', error);
            setMessages([]); // 메시지 목록 불러오기 실패 시 빈 배열로 설정
        }
    };

    const Message = ({ message }) => {
        const isSentByMe = message.sender.id === 'guest@company'; // 사용자 아이디에 따라 수정해주세요

        return (
            <div style={{ textAlign: isSentByMe ? 'right' : 'left', margin: '10px' }}>
                <div style={{ backgroundColor: isSentByMe ? 'lightblue' : 'lightgreen', padding: '5px', borderRadius: '4px', display: 'inline-block' }}>
                    {message.content}
                </div>
            </div>
        );
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
        <div>
            <div className="chat-messages" style={{ width: '500px', height: '500px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'auto' }}>
                {messages.slice().reverse().map((message) => (
                    <Message key={message.id} message={message} />
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
};

export default NCloudChatComponent;