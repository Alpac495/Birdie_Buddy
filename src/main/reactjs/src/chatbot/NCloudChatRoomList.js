import React, { useEffect, useState } from 'react';
import * as ncloudchat from 'ncloudchat';

function NCloudChatRoomList() {
    const [chatRooms, setChatRooms] = useState([]);
    const [chat, setChat] = useState(null);
    const [lastMessages, setLastMessages] = useState({}); // 채팅방의 마지막 메시지를 저장하기 위한 상태 변수

    useEffect(() => {
        const fetchChatRooms = async () => {
            // ncloudchat.Chat 객체 생성
            const chatInstance = new ncloudchat.Chat();
            setChat(chatInstance);

            try {
                // 채팅 초기화
                await chatInstance.initialize('08c17789-2174-4cf4-a9c5-f305431cc506');

                // 사용자 연결
                await chatInstance.connect({
                    id: 'guest@company',
                    name: 'Guest',
                    profile: 'https://image_url',
                    customField: 'json',
                });

                // 사용자가 참여한 대화방 목록 가져오기
                const { edges } = await chatInstance.getChannels({});
                setChatRooms(edges);
            } catch (error) {
                console.error('Error fetching chat rooms:', error);
            }
        };

        fetchChatRooms();
    }, []);

    useEffect(() => {
        const getLastMessageForChannel = async (channelId) => {
            try {
                if (chat && chat.getChannelMessages) {
                    const messages = await chat.getChannelMessages(channelId);
                    if (messages.length > 0) {
                        // 채팅 메시지가 있는 경우 마지막 메시지의 content를 반환
                        return messages[messages.length - 1].content;
                    } else {
                        // 채팅 메시지가 없는 경우 "No messages"를 반환
                        return "No messages";
                    }
                } else {
                    // chat 또는 chat.getChannelMessages가 없는 경우 "No messages"를 반환
                    return "No messages";
                }
            } catch (error) {
                console.error("Error fetching last message:", error);
                return "No messages";
            }
        };

        const fetchLastMessages = async () => {
            if (chatRooms.length === 0) return;

            const lastMessageMap = {};
            for (const edge of chatRooms) {
                const channelId = edge.node.id;
                const lastMessage = await getLastMessageForChannel(channelId);
                lastMessageMap[channelId] = lastMessage;
            }

            setLastMessages(lastMessageMap);
        };

        fetchLastMessages();
    }, [chat, chatRooms]);

    return (
        <div>
            <h2>ncloudchat 대화방 목록</h2>
            <ul>
                {chatRooms.map((edge) => (
                    <li key={edge.node.id}>
                        {edge.node.name}
                        <ul>
                            <li>{lastMessages[edge.node.id]}</li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NCloudChatRoomList;