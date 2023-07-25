import React, { useEffect, useState } from 'react';
import * as ncloudchat from 'ncloudchat';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";

const NCloudChatRoomList = () => {
    const [channels, setChannels] = useState([]);
    const [data, setData] = useState('');
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [nc, setNc] = useState('');
    const navigate = useNavigate();
    const [unum, setUnum] = useState('');
    const [unickname, setUnickname] = useState('');
    const [uemail, setUemail] = useState('');
    
    const unumchk = async () => {
        try {
            const res1 = await Axios.get("/login/unumChk");
            setUnum(res1.data);
    
            const url = "/chating/getuserinfo?unum=" + res1.data;
            const res2 = await Axios.get(url);
            setData(res2.data);
            setUnickname(res2.data.unickname);
            setUemail(res2.data.uemail);
            
            const chat = new ncloudchat.Chat();
            chat.initialize('08c17789-2174-4cf4-a9c5-f305431cc506');
            setNc(chat);
            
            await chat.connect({
                id: res2.data.uemail,
                name: res2.data.unickname,
                profile: 'https://image_url',
                customField: 'json',
            });
            
            const filter = { state: true};
            const sort = { created_at: -1 };
            const option = { offset: 0, per_page: 100 };
            const channels = await chat.getChannels(filter, sort, option);
            console.log(res2.data.uemail)
            // 각 채팅방의 마지막 메시지 가져오기
            const updatedChannels = await Promise.all(
                channels.edges.map(async (channel) => {
                    const lastMessage = await getLastMessage(chat, channel.node.id);
                    return { ...channel, node: { ...channel.node, lastMessage } };
                })
            );
            
            setChannels(updatedChannels);
        } catch (error) {
            // Handle any errors that might occur during the asynchronous operations
            console.error("Error occurred: ", error);
        }
    }
    
    useEffect(() => {
        unumchk()
    }, [])
    console.log("uemail:"+uemail);
    console.log("unickname:"+unickname);
   

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
        navigate(`/chating/room/${channelId}/${unum}`);
        }
    };

    const handleCreateChannel = async () => {
        if (nc) {
            try {
                const newchannel = await nc.createChannel({ type: 'PRIVATE', name: unickname});                
                setChannels([...channels, { node: newchannel }]);
                // await nc.subscribe(newchannel.node.id);
                // await nc.addUsers(newchannel.node.id, ['1234','1234']);
                await navigate(`/chating/room/${newchannel.id}/${unum}`);
            } catch (error) {
                console.error('Error creating and subscribing channel:', error);
            }
        }
    };

    return (
        <div>
            <h2>Chat Room List</h2>
            <ul>
                {channels.map &&
                channels.map((channel) => (
                    <li key={channel.node.id} >
                        <div style={{width:'300px',height:'80px',border:'1px solid black'}}>
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