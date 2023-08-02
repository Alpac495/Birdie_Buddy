import React, { useCallback, useEffect, useState } from 'react';
import * as ncloudchat from 'ncloudchat';
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import "./NCloudChatRoomList.css";
import Header from '../header/Header';
import profile3 from "../image/profile90x90.png";


const NCloudChatRoomList = () => {
    const image1 = process.env.REACT_APP_IMAGE1PROFILE;
    const image2 = process.env.REACT_APP_IMAGE87;
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
            const res1 = await Axios.get("/apilogin/unumChk");
            setUnum(res1.data);

            const url = "/apichating/getuserinfo?unum=" + res1.data;
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

            const channelRes = await Axios.get(`/apichating/getchatroom?unum=${res2.data.unum}`);
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

    const handleChannelSelect = async (channelId, cunum, pramunum) => {
        setSelectedChannel(channelId);

        if (nc) {
            await nc.subscribe(channelId);
            await nc.disconnect();
            if (unum == pramunum){
            navigate(`/chating/room/${channelId}/${cunum}`);
            }else{
            navigate(`/chating/room/${channelId}/${pramunum}`);   
            }
        }
    };


    const handleCreateChannel = async () => {
        if (nc) {
            try {
                const response = await Axios.get(`/apichating/getchatinfo?unum1=${unum}&unum2=1`);
                const chatid = response.data.chatid;
                if(chatid){
                    await nc.disconnect();
                    navigate(`/chating/room/${chatid}/1`);
                }else {
                    const newchannel = await nc.createChannel({ type: 'PUBLIC', name: "관리자 채팅방"});
                    setChannels([...channels, { node: newchannel }]);
                    await Axios.post("/apichating/insertchatid",{unum: unum,cunum: "1",chatid: newchannel.id});
                    await nc.subscribe(newchannel.id);
                    await navigate(`/chating/room/${newchannel.id}/1`);
                }
            } catch (error) {
                console.error('Error creating and subscribing channel:', error);
            }
        }
    };

    return (
        <div className="CLchatlist">
            <div className="CLstacked-content">
                <div className="CLnewlogo"><Header /></div>
                <div className="CLsubtitle">
                    <div className="CLtitle">채팅목록</div>
                    <button className='CDcta-button-3' type={"button"} onClick={handleCreateChannel}>관리자와의 채팅</button>
                </div>
                {channels.length > 0 ? (
                    channels.map((channel) => (
                        <div className="CLtwo-lines-list-avatar" onClick={() => handleChannelSelect(channel.chatid, channel.cunum, channel.unum)}>
                            <div className="CLtwo-line-item">
                                <div className="CLtext">
                                    {lastMessages[channel.chatid] && (
                                        <>
                                            <p>{lastMessages[channel.chatid].sender.name}의 메세지 : {lastMessages[channel.chatid].content}</p>
                                        </>
                                    )}
                                </div>
                                <div className="CLlabel">{channel.unum === 0 || channel.cunum === 0
                                    ?"(상대방이 나간 채팅방입니다)":
                                    channel.unum === 1 || channel.cunum === 1
                                        ?"관리자 채팅방"
                                        : channel.unum === channel.cunum ? "나와의 채팅"
                                            : channel.unum == unum ? channel.cunickname : channel.unickname
                                }</div>
                                {channel.cunum === 0 || channel.cunum === 1 ?
                                    <img className={"CLavatar-icon"} alt="" src={profile3}/>
                                    :channel.unum == unum ?
                                        <img className="CLavatar-icon" alt="" src={`${image1}${channel.cuphoto}${image2}`} />
                                        :<img className="CLavatar-icon" alt="" src={`${image1}${channel.uphoto}${image2}`} />}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="CLtwo-nolist-avatar">채팅방이 없습니다</div>
                )}
            </div>
        </div>
    );

};

export default NCloudChatRoomList;
