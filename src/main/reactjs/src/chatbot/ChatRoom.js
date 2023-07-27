import React, { useEffect, useState } from 'react';
import * as ncloudchat from 'ncloudchat';
import {useParams} from "react-router-dom";
import Axios from 'axios';
import './ChatRoom.css';
import SendIcon from "../image/icon_yangdo.svg";
function ChatRoom() {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [nc, setNc] = useState(null);
    const { cunum, channelId } = useParams();
    const [unum, setUnum]=useState('');
    const [data, setData] = useState('');
    const [data2, setData2] = useState('');
    
    const unumchk = async () => {
        try {
            const res1 = await Axios.get("/login/unumChk");
            setUnum(res1.data);
    
            const url = "/chating/getuserinfo?unum=" + res1.data;
            const res2 = await Axios.get(url);
            setData(res2.data);

            const url2 = "/chating/getuserinfo?unum=" + cunum;
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
                    return [message, ...prevMessages];
                });
            });
    
            await chat.connect({
                id: res2.data.uemail,
                name: res2.data.unickname,
                profile: 'https://image_url',
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
            const sort = { created_at: -1 };
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
    console.log(messages)

    const handleLeaveChat = async () => {
        if (!nc) {
            console.error('Chat is not initialized');
            return;
        }
        try {
            await nc.unsubscribe(channelId);
            // 여기서 필요한 다른 처리를 할 수 있습니다.
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
      <div className="chatdetail">
        <div className="parent">
          <div className="div3"><div>
            <div className="chat-messages" id="chat-messages" style={{ width: '360px', height: '500px', border: '1px solid #ccc', borderRadius: '4px', overflow: 'auto' }}>
                {messages.map &&
                messages.slice().reverse().map((message) => (
                    <div key={message.id} style={{ textAlign: message.sender.name == data.unickname ? 'right' : 'left', margin: '10px' }}>
                        <div style={{ backgroundColor: message.sender.name == data.unickname ? 'lightblue' : 'lightgreen', padding: '5px', borderRadius: '4px', display: 'inline-block' }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{message.sender.name}</div>
                            <div>{message.content}</div>
                            <div style={{ fontSize: '12px', color: 'gray' }}>{new Date(message.created_at).toLocaleString()}</div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Type your message"
                    value={userInput}
                    onChange={handleUserInput}
                />
                <button type="submit">Send</button>
                <button onClick={handleLeaveChat}>채팅방 나가기</button>

            </form> */}
        </div></div>
          <div className="flist-line" />
        </div>
        <input className="email" type="text" placeholder="Enter your name" />
        <div className="cta-button-1">
          <div className="round-button-icon" >
            <div className="centered">
              <div className="label">채팅방 종료하기</div>
            </div>
          </div>
        </div>
        <div className="logo-end">
          <div className="newlogo">
            <div className="newlogo">
              <div className="instance-child" />
              <img className="icon" alt="" src="/icon.svg" />
            </div>
          </div>
          <img className="icon1" alt="" src={SendIcon} />
        </div>
      </div>
      {/* {isPopupModalOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closePopupModal}
        >
          <PopupModal onClose={closePopupModal} />
        </PortalPopup>
      )} */}
    </>


        
    );
}
export default ChatRoom;