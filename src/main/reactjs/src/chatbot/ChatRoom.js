import iconSend from "../image/icon_yangdo.svg";
import "./ChatRoom.css";
import React, { useEffect, useState } from 'react';
import * as ncloudchat from 'ncloudchat';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Axios from 'axios';
import Header from "../header/Header";
import ChatListIcon from '@mui/icons-material/ForumOutlined';
import ChatOutIcon from "../image/out.svg";


const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [nc, setNc] = useState(null);
    const { cunum, channelId } = useParams();
    const [unum, setUnum] = useState('');
    const [data, setData] = useState('');
    const [data2, setData2] = useState('');
    const [ublacklist, setUblacklist] = useState('');
    const navi = useNavigate();

    const unumchk = async () => {
        try {
            const res1 = await Axios.get("/apilogin/getUserInfo");
            console.log("unum" + res1.data.unum)
            console.log("ublacklist" + res1.data.ublacklist)
            setUnum(res1.data.unum);
            setUblacklist(res1.data.ublacklist);

            const url = "/apichating/getuserinfo?unum=" + res1.data.unum;
            const res2 = await Axios.get(url);
            setData(res2.data);

            const url2 = "/apichating/getuserinfo?unum=" + cunum;
            const res3 = await Axios.get(url2);
            setData2(res3.data);

            const chat = new ncloudchat.Chat();
            await chat.initialize('08c17789-2174-4cf4-a9c5-f305431cc506');
            setNc(chat);

            chat.bind('onMessageReceived', async function (channel, message) {
                setMessages((prevMessages) => {
                    const isDuplicate = prevMessages.some((prevMessage) => prevMessage.message_id === message.message_id);
                    if (isDuplicate) {
                        return prevMessages;
                    }
                    return [...prevMessages, message];
                });
            });

            await chat.connect({
                id: res2.data.uemail,
                name: res2.data.unickname,
                profile: res2.data.uemail,
                customField: 'json',
            });

            await chat.subscribe(channelId);
            // await chat.addUsers(channelId, [res2.data.uemail, res3.data.uemail]);
            // const existingChannelId = channelId;

            const fetchedMessages = await fetchChannelMessages(chat, channelId);
            setMessages(fetchedMessages);
        } catch (error) {
            // Handle any errors that might occur during the asynchronous operations
            console.error("Error occurred: ", error);
        }
    };

    useEffect(() => {
        unumchk();
    }, []);

    useEffect(() => {
        const disconnectChat = async () => {
            if (nc) {
                await nc.disconnect();
            }
        };

        window.addEventListener('beforeunload', disconnectChat);

        // When component unmounts, disconnect
        return () => {
            window.removeEventListener('beforeunload', disconnectChat);
            disconnectChat();
        };
    }, [nc]);

    const fetchChannelMessages = async (chat, channelId) => {
        try {
            // 필터와 정렬 옵션 설정
            const filter = { channel_id: channelId };
            const sort = { created_at: 1 };
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
                // await nc.subscribe(channelId);
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

    const handleLeaveChat = async () => {
        if (!nc) {
            console.error('Chat is not initialized');
            return;
        }
        if(ublacklist!==0){
            Axios.get("/apilogin/logout")
            .then(res => {
                navi('/birdie_buddy');
                unumchk();
                alert("로그아웃 되었습니다.");
                window.location.reload();
            });

            return;
        }
        const userConfirmed = window.confirm('확인을 누를 경우 모든 채팅 내용이 삭제됩니다. \n채팅방을 유지하고 싶을 경우 취소를 눌러주세요');
        if (!userConfirmed) {
            // 사용자가 취소를 눌렀을 경우 함수를 종료합니다.
            return;
        }
        try {
            await Axios.get(`/apichating/unsubchatid?unum=${unum}&chatid=${channelId}`);
            const message = `${data.unickname} 님이 나가셨습니다`;
            await nc.sendMessage(channelId, {
                name: "Admin",
                type: "text",
                message,
            });

            navi(`/chating/${unum}`);
            await nc.unsubscribe(channelId);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleGoChatList = () => {
        if (ublacklist === 0) {
            window.location.replace(`/chating/${unum}`)
        } else {
            alert("블랙리스트로 등록된 사용자는 사이트 이용이 불가합니다. \n관리자에게 문의하여 해제 후 이용해주세요.")
            return;
        }

    };

    console.log(unum, data2.unum)
    return (
        <>
            <div className="CDchatdetail">
                <Header />
                <div className="CDparent">
                    <div className="CDdiv3" id='chat-messages'>
                        {messages.map && messages.map((message, index) => (
                            <div key={index} style={{ textAlign: message.sender.profile === data.uemail ? 'right' : 'left', margin: '10px' }}>
                                <div style={{ backgroundColor: message.sender.profile === data.uemail ? 'lightblue' : 'lightgreen', padding: '5px', borderRadius: '4px', display: 'inline-block' }}>
                                    <strong>{message.sender.name}</strong>
                                    <div>{message.content}</div>
                                    <div style={{ fontSize: '12px', color: 'gray' }}>{new Date(message.created_at).toLocaleString()}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="CDflist-line" />
            </div>
            <form onSubmit={handleSubmit}>
                <input className="CDemail" type="text" placeholder="Enter your message" value={userInput} onChange={handleUserInput} />
                <button type="submit" className="CDchatdetail-child">보내기</button>
            </form>
            <div className="CDchatbar">
                <ChatListIcon style={{ color: '#1F4337' }} className="CDicon-trash" onClick={handleGoChatList} />
                {/* <img className="CDicon-trash" alt="" src="/-icon-trash.svg" onClick={handleLeaveChat} /> */}
                <img className="CDicon-list" alt="" src={ChatOutIcon} onClick={handleLeaveChat} />
                <div className="CDrectangle-parent">
                    <div className="CDgroup-child" />
                    {unum === data.unum ?
                        <div className="CDnick1">{data2.unickname}</div>
                        :
                        <div className="CDnick1">{data.unickname}</div>
                    }
                </div>
            </div>

            {/* <button className="CDcta-button-1" onClick={handleLeaveChat}>
                    채팅 종료
                </button>
                <div className="CDchat-partner">
                    {data2.unickname}
                </div>
                <button className="CDcta-button-2" onClick={handleGoChatList}>
                    목록으로
                </button> */}

        </>
    );
};

export default ChatRoom;
