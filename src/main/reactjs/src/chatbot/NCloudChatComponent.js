import React, { useEffect, useState } from 'react';
import * as ncloudchat from 'ncloudchat';
import {useParams} from "react-router-dom";
function ChatRoom() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [nc, setNc] = useState(null);
    const { channelId } = useParams();
    useEffect(() => {
        const initializeChat = async () => {
            const chat = new ncloudchat.Chat();
            await chat.initialize('08c17789-2174-4cf4-a9c5-f305431cc506');
            setNc(chat);
            chat.bind('onMessageReceived', function (channel, message) {
                setMessages((prevMessages) => {
                    const isDuplicate = prevMessages.some((prevMessage) => prevMessage.message_id === message.message_id);
                    if (isDuplicate) {
                        return prevMessages;
                    }
                    return [message, ...prevMessages];
                });
            });
            await chat.connect({
                id: 'guest@company',
                name: 'Guest',
                profile: 'https://image_url',
                customField: 'json',
            });
            const existingChannelId = channelId;
            await chat.subscribe(existingChannelId);
            const fetchedMessages = await fetchChannelMessages(chat, channelId);
            setMessages(fetchedMessages);
        };
        initializeChat();
    }, []);
    const fetchChannelMessages = async (chat, channelId) => {
        try {
            // 필터와 정렬 옵션 설정
            const filter = { channel_id: channelId };
            const sort = { created_at: -1 };
            let offset = 0;
            const per_page = 100; // 한 번에 가져올 대화 개수
            let allMessages = [];
            while (true) {
                const option = { offset, per_page };
                const channelMessages = await chat.getMessages(filter, sort, option);
                const messages = channelMessages.edges.map((edge) => edge.node);
                allMessages = allMessages.concat(messages);
                if (messages.length < per_page) {
                    // 더 이상 가져올 대화 내용이 없으면 반복문 종료
                    break;
                }
                offset += per_page;
            }
            return allMessages;
        } catch (error) {
            console.error('Error fetching channel messages:', error);
            return []; // 메시지 목록 불러오기 실패 시 빈 배열 반환
        }
    };
    useEffect(() => {
        // 메시지가 업데이트될 때마다 화면을 스크롤 아래로 이동
        const chatMessagesDiv = document.getElementById('chat-messages');
        if (chatMessagesDiv) {
            chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
        }
    }, [messages]);
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
        <div>
            <div className="chat-messages" id="chat-messages" style={{ width: '500px', height: '500px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'auto' }}>
                {messages.slice().reverse().map((message) => (
                    <div key={message.id} style={{ textAlign: message.sender.id === 'guest@company' ? 'right' : 'left', margin: '10px' }}>
                        <div style={{ backgroundColor: message.sender.id === 'guest@company' ? 'lightblue' : 'lightgreen', padding: '5px', borderRadius: '4px', display: 'inline-block' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{message.sender.name}</div>
                            <div>{message.content}</div>
                            <div style={{ fontSize: '12px', color: 'gray' }}>{new Date(message.created_at).toLocaleString()}</div>
                        </div>
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
export default ChatRoom;