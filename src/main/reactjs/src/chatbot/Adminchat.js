import Axios from 'axios';
import * as ncloudchat from 'ncloudchat';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';

function Adminchat(props) {
    const [unum, setUnum] = useState(0);
    const [nc,setNc] = useState('');
    const navi = useNavigate();

    useEffect(() => {
        unumchk();
    }, []);

    const buttonRef = useRef(null);

    useEffect(() => {
        // 여기서 setTimeout을 사용하여 일정 시간 후에 버튼을 클릭합니다.
        const delayTimeInMilliseconds = 1000; // 5초 후에 클릭하려면 5000ms로 설정합니다.
        setTimeout(() => {
            buttonRef.current.click();
        }, delayTimeInMilliseconds);
    }, []);

    const unumchk= async ()=>{
        try {
            const res = await Axios.get("/apilogin/unumChk")
            setUnum(res.data);
            const url = "/apichating/getuserinfo?unum=" + res.data;
            const res2 = await Axios.get(url);
            const chat = new ncloudchat.Chat();
            chat.initialize('08c17789-2174-4cf4-a9c5-f305431cc506');
            setNc(chat);
            await chat.connect({
                id: res2.data.uemail,
                name: res2.data.unickname,
                profile: res2.data.uemail,
                customField: 'json',
            });
        } catch (error) {
            console.error("Error occurred: ", error)
        }
    }
    

    const getChatInfo = async () => {
        try {
            console.log("getChatInfo");
            console.log("unum1: "+unum);
            const response = await Axios.get(`/apichating/getchatinfo?unum1=${unum}&unum2=1`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const adminChat = async () => {
        if(nc){
            try {
                const chatid = await getChatInfo();
                if(chatid){
                    await nc.disconnect();
                    navi(`/chating/room/${chatid}/1`);
                }else {
                    // chatid == null 일 경우
                    const newchannel = await nc.createChannel({ type: 'PUBLIC', name: "관리자 채팅방"});
                    const newChatId = newchannel.id;
                    await Axios.post("/apichating/insertchatid", {unum, cunum: "1", chatid: newChatId});
                    await nc.subscribe(newChatId);
                    // 채팅방으로 이동
                    await nc.disconnect();
                    navi(`/chating/room/${newChatId}/1`);
                }
            }catch (error) {
                console.error('Error creating and subscribing channel:', error);
            }
        }
    }

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

    return (
        <div style={{textAlign:'center', fontSize:'50px'}}>
            <button ref={buttonRef} type='button' onClick={adminChat}> 
                관리자와 채팅방으로 이동 중..
            </button>
        </div>
    );
}

export default Adminchat;