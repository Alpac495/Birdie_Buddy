import React, { useState, useEffect } from 'react';
import * as ncloudchat from 'ncloudchat';
import NCloudChatRoomList from './NCloudChatRoomList';
import NCloudChatComponent from './NCloudChatComponent';

const ChatApp = () => {
    const [channels, setChannels] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState(null);

    useEffect(() => {
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

        initializeChat();
    }, []);

    const handleChannelSelect = (channel) => {
        setSelectedChannel(channel);
    };

    return (
        <div>
            <NCloudChatRoomList channels={channels} selectedChannel={selectedChannel} onChannelSelect={handleChannelSelect} />
            <NCloudChatComponent selectedChannel={selectedChannel} />
        </div>
    );
};

export default ChatApp;