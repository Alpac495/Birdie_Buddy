import React, { useEffect, useState } from 'react';
import * as ncloudchat from 'ncloudchat';

function NCloudChatRoomList() {
    const [chatRooms, setChatRooms] = useState([]);
    const [chat, setChat] = useState(null);
    const [lastMessages, setLastMessages] = useState({});

    const getLastMessageForChannel = async (channelId) => {
        try {
            if (chat && chat.getChannelMessages) {
                const messages = await chat.getChannelMessages(channelId);
                if (messages.length > 0) {
                    return messages[messages.length - 1].content;
                } else {
                    return "No messages";
                }
            } else {
                return "No messages";
            }
        } catch (error) {
            console.error("Error fetching last message:", error);
            return "No messages";
        }
    };

    const fetchLastMessages = async (channels) => {
        if (channels.length === 0) return;

        const lastMessageMap = {};
        for (const edge of channels) {
            const channelId = edge.node.id;
            const lastMessage = await getLastMessageForChannel(channelId);
            lastMessageMap[channelId] = lastMessage;
        }

        setLastMessages(lastMessageMap);
    };

    useEffect(() => {
        const fetchChatRooms = async () => {
            const chatInstance = new ncloudchat.Chat();
            setChat(chatInstance);

            try {
                await chatInstance.initialize('08c17789-2174-4cf4-a9c5-f305431cc506');
                await chatInstance.connect({
                    id: 'guest@company',
                    name: 'Guest',
                    profile: 'https://image_url',
                    customField: 'json',
                });

                const { edges } = await chatInstance.getChannels({});
                setChatRooms(edges);
            } catch (error) {
                console.error('Error fetching chat rooms:', error);
            }
        };

        fetchChatRooms();
    }, []);

    useEffect(() => {
        const fetchChatRooms = async () => {
            const chatInstance = new ncloudchat.Chat();
            setChat(chatInstance);

            try {
                await chatInstance.initialize('08c17789-2174-4cf4-a9c5-f305431cc506');
                await chatInstance.connect({
                    id: 'guest@company',
                    name: 'Guest',
                    profile: 'https://image_url',
                    customField: 'json',
                });

                const { edges } = await chatInstance.getChannels({});
                setChatRooms(edges);

                // 채널 목록이 불러와진 후에 fetchLastMessages 호출
                fetchLastMessages(edges);
            } catch (error) {
                console.error('Error fetching chat rooms:', error);
            }
        };

        fetchChatRooms();
    }, []);

    useEffect(() => {
        // chat 객체가 없을 경우 메시지를 불러오지 않음
        if (!chat) return;

        const fetchLastMessages = async (channels) => {
            if (channels.length === 0) return;

            const lastMessageMap = {};
            for (const edge of channels) {
                const channelId = edge.node.id;
                const lastMessage = await getLastMessageForChannel(channelId);
                lastMessageMap[channelId] = lastMessage;
            }

            setLastMessages(lastMessageMap);
        };

        fetchLastMessages(chatRooms);
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