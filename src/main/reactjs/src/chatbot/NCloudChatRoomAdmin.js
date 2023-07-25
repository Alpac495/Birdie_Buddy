import React, { useEffect, useState } from 'react';
import * as ncloudchat from 'ncloudchat';
import { useNavigate } from 'react-router-dom';

const NCloudChatRoomAdmin = () => {
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [nc, setNc] = useState(null); // nc 상태 추가
    const navigate = useNavigate();

    useEffect(() => {
        const initializeChatAndFetchChannels = async () => {
            try {
                const chat = new ncloudchat.Chat();
                await chat.initialize('08c17789-2174-4cf4-a9c5-f305431cc506');
                setNc(chat); // nc 상태 설정

                await chat.connect({
                    id: 'guest@company',
                    name: 'Guest',
                    profile: 'https://image_url',
                    customField: 'json',
                });

                const channels = await chat.getChannels({}, { created_at: -1 }, { offset: 0, per_page: 10 });

                // 각 채팅방의 마지막 메시지 가져오기
                const updatedChannels = await Promise.all(
                    channels.edges.map(async (channel) => {
                        const lastMessage = await getLastMessage(chat, channel.node.id);
                        return { ...channel, node: { ...channel.node, lastMessage } };
                    })
                );

                setChannels(updatedChannels);
            } catch (error) {
                console.error('Error fetching chat room list:', error);
            }
        };

        initializeChatAndFetchChannels();
    }, []);

    const getLastMessage = async (chat, channelId) => {
        try {
            // 필터와 정렬 옵션 설정
            const filter = { channel_id: channelId };
            const sort = { created_at: -1 }; // 생성 시간을 기준으로 내림차순으로 정렬

            // 옵션 설정 (1개의 메시지만 가져오도록 설정)
            const option = { offset: 0, per_page: 1 };

            const channelMessages = await chat.getMessages(filter, sort, option);
            const lastMessage = channelMessages.edges[0]?.node;
            return lastMessage;
        } catch (error) {
            console.error('Error fetching last message:', error);
            return null;
        }
    };

    const handleChannelSelect = async (channelId) => {
        setSelectedChannel(channelId);
        if (nc) {
            await nc.disconnect();
        }
        navigate(`/chating/room/${channelId}`);
    };

    return (
        <div>
            <h2>Chat Room List</h2>
            <ul>
                {channels.map((channel) => (
                    <li key={channel.node.id} >
                        <div style={{width:'360px',height:'80px',border:'1px solid black'}}>
                            <div onClick={() => handleChannelSelect(channel.node.id)}>
                                {channel.node.name}
                            </div>
                            {channel.node.lastMessage && (
                                <div>
                                    <p>Last Message: {channel.node.lastMessage.content}</p>
                                    <p>Sender: {channel.node.lastMessage.sender.name}</p>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NCloudChatRoomAdmin;