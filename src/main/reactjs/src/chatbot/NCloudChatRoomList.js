import React, { useEffect, useState } from 'react';
import * as ncloudchat from 'ncloudchat';

const NCloudChatRoomList = ({ selectedChannel, onChannelSelect }) => {
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const fetchChannels = async (chat) => {
            try {
                const channels = await chat.getChannels({}, { created_at: -1 }, { offset: 0, per_page: 100 });
                const updatedChannels = await Promise.all(
                    channels.edges.map(async (channel) => {
                        const lastMessage = await getLastMessage(chat, channel.node.id);
                        return { ...channel, node: { ...channel.node, lastMessage } };
                    })
                );
                setChannels(updatedChannels);
            } catch (error) {
                console.error('Error fetching channels:', error);
                setChannels([]);
            }
        };

        const initializeChat = async () => {
            const chat = new ncloudchat.Chat();
            await chat.initialize('08c17789-2174-4cf4-a9c5-f305431cc506');

            await chat.connect({
                id: 'guest@company',
                name: 'Guest',
                profile: 'https://image_url',
                customField: 'json',
            });

            fetchChannels(chat);
        };

        initializeChat();
    }, []);

    const getLastMessage = async (chat, channelId) => {
        try {
            const filter = { channel_id: channelId };
            const sort = { created_at: -1 };
            const option = { offset: 0, per_page: 1 };
            const channelMessages = await chat.getMessages(filter, sort, option);
            const lastMessage = channelMessages.edges[0]?.node;
            return lastMessage;
        } catch (error) {
            console.error('Error fetching last message:', error);
            return null;
        }
    };

    return (
        <div>
            {/* 채팅방 목록을 출력하는 부분 */}
            {channels.map(({ node }) => (
                <div
                    key={node.id}
                    className={`message ${selectedChannel && selectedChannel.id === node.id ? 'selected' : ''}`}
                    onClick={() => onChannelSelect(node)}
                >
                    {node.name} - {node.lastMessage?.content || 'No message'}
                </div>
            ))}
        </div>
    );
};

export default NCloudChatRoomList;