import React, { useCallback, useEffect, useState } from 'react';
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
    const [admin,setAdmin] = useState('1');
    const [lastMessages, setLastMessages] = useState({});  // Add state for last messages

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

            const channelRes = await Axios.get(`/chating/getchatroom?unum=${res2.data.unum}`);
            const channelIds = channelRes.data;

            // Add fetching of last messages for channels
            const messages = {};

            for (const channel of channelIds) {
                const lastMessage = await getLastMessage(chat, channel);
                messages[channel.chatid] = lastMessage;
            }

            setLastMessages(messages);
            setChannels(channelIds);
        } catch (error) {
            console.error("Error occurred: ", error);
        }
    }

    useEffect(() => {
        unumchk()
    }, [])

    useEffect(() => {
        const disconnectChat = async () => {
            if (nc) {
                await nc.disconnect();
            }
        };

        window.addEventListener('beforeunload', disconnectChat);

        return () => {
            window.removeEventListener('beforeunload', disconnectChat);
            disconnectChat();
        };
    }, [nc]);

    const getLastMessage = async (chat, channel) => {
        try {
            const filter = { channel_id: channel.chatid };
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
            await nc.subscribe(channelId);
            await nc.disconnect();
            navigate(`/chating/room/${channelId}/${unum}`);
        }
    };

    const handleCreateChannel = async () => {
        if (nc) {
            try {
                const chatid = await Axios.get(`/chating/getchatinfo?unum1=${unum}&unum2=1`)
                if(chatid){
                    await nc.disconnect();
                    navigate(`/chating/room/${chatid}/${unum}`);
                }else {
                    const newchannel = await nc.createChannel({ type: 'PUBLIC', name: "관리자 채팅방"});
                    setChannels([...channels, { node: newchannel }]);
                    await Axios.post("/chating/insertchatid",{unum,cunum: "1",chatid: newchannel.id});
                    await navigate(`/chating/room/${newchannel.id}/${unum}`);
                }
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
                        <li  >
                            <div style={{width:'300px',height:'80px',border:'1px solid black'}}>
                                <div onClick={() => handleChannelSelect(channel.chatid)}>
                                    {channel.unum === 0 || channel.cunum === 0
                                        ?"(상대방이 나간 채팅방입니다)":
                                        channel.unum === 1 || channel.cunum === 1
                                            ?"관리자 채팅방"
                                            :`${channel.unum}&${channel.cunum} 님의 채팅방`
                                    }
                                    {lastMessages[channel.chatid] && (
                                        <>
                                            <p>마지막 메시지: {lastMessages[channel.chatid].content}</p>
                                            <p>보낸 사람: {lastMessages[channel.chatid].sender.name}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
            </ul>
            <button type={"button"} onClick={handleCreateChannel}>관리자와의 채팅</button>
        </div>
    );
};

export default NCloudChatRoomList;
