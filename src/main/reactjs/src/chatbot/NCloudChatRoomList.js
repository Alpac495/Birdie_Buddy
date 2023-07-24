import React, { useEffect, useState } from 'react';
import * as ncloudchat from 'ncloudchat';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";

const NCloudChatRoomList = () => {
    const [channels, setChannels] = useState([]);
    const [data, setData] = useState('');
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [nc, setNc] = useState(null);
    const navigate = useNavigate();
    const [unum, setUnum] = useState('');
    const [unickname, setUnickname] = useState('');
    const [uemail, setUemail] = useState('');
    console.log("uemail:"+uemail);
    console.log("unickname:"+unickname);
    const unumchk=()=>{
        axios.get("/login/unumChk")
            .then(res=> {
                setUnum(res.data);
                const url="/chating/getuserinfo?unum="+res.data;
                Axios.get(url)
                    .then(res=>{
                        setData(res.data);
                        setUnickname(res.data.unickname);
                        setUemail(res.data.uemail);
                        console.log(res.data)
                    })
            });
    }
    useEffect(() => {
        unumchk()
    }, [])

    useEffect(() => {
    // 채팅방 초기화 및 목록 가져오는 함수
    const initializeChatAndFetchChannels = async () => {
        try {
            const chat = new ncloudchat.Chat();
            await chat.initialize('08c17789-2174-4cf4-a9c5-f305431cc506');
            setNc(chat);

            await chat.connect({
                id: uemail,
                name: unickname,
                profile: 'https://image_url',
                customField: 'json',
            });

            const channels = await chat.getChannels({}, { created_at: -1 }, { offset: 0, per_page: 100 });

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


        initializeChatAndFetchChannels()
    }, [])

    // 마지막 메시지 가져오는 함수
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

    const handleChannelSelect = async (channelId) => {
        setSelectedChannel(channelId);
        if (nc) {
            await nc.disconnect();
        }
        navigate(`/chating/room/${channelId}`);
    };

    const handleCreateChannel = async () => {
        if (nc) {
            try {
                const channel = await nc.createChannel({ type: 'PUBLIC', name: 'New Channel', customField: 'customField' });
                await channel.subscribe(channel.id);
                setChannels([...channels, { node: channel }]);
            } catch (error) {
                console.error('Error creating and subscribing channel:', error);
            }
        }
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
            <button type={"button"} onClick={handleCreateChannel}>채널생성</button>
        </div>
    );
};

export default NCloudChatRoomList;