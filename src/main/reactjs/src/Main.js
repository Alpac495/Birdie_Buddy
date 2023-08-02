import React, {useState, useEffect} from 'react';
import "./Main.css";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Recommendslider from "./app_effect/Recommendslider";
import no from "./images/main_footad.png";
import Reviewslider from "./app_effect/Reviewslider";
import Bannerslider from "./app_effect/BannerSlider";
import FriendSlider from "./app_effect/FriendSlider";
import NoticeSlider from "./app_effect/NoticeSlider";
import AdSlider from "./app_effect/AdSlider";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import * as ncloudchat from 'ncloudchat';
import Axios from "axios";

function Main(props) {
    const [unum, setUnum] = useState(0);
    const [nc,setNc] = useState('');
    const navi = useNavigate();

    useEffect(() => {
        unumchk();
    }, []);

    const unumchk= async ()=>{
        try {
            const res = await axios.get("/login/unumChk")
            setUnum(res.data);
            const url = "/chating/getuserinfo?unum=" + res.data;
            const res2 = await axios.get(url);
            const chat = new ncloudchat.Chat();
            chat.initialize('08c17789-2174-4cf4-a9c5-f305431cc506');
            setNc(chat);
            await chat.connect({
                id: res2.data.uemail,
                name: res2.data.unickname,
                profile: 'https://image_url',
                customField: 'json',
            });
        } catch (error) {
            console.error("Error occurred: ", error)
        }
    }

    const chkLogin=()=>{
        if(unum===0){
            alert("먼저 로그인해 주세요");
            navi("/login/login");
        }
    }

    const getChatInfo = async () => {
        try {
            console.log("getChatInfo");
            console.log("unum1: "+unum);
            const response = await Axios.get(`/chating/getchatinfo?unum1=${unum}&unum2=1`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const adminChat = async () => {
        chkLogin();
        if(nc){
            try {
                const chatid = await getChatInfo();
                if(chatid){
                    await nc.disconnect();
                    navi(`/chating/room/${chatid}/${unum}`);
                }else {
                    // chatid == null 일 경우
                    const newchannel = await nc.createChannel({ type: 'PUBLIC', name: "관리자 채팅방"});
                    const newChatId = newchannel.id;
                    await Axios.post("/chating/insertchatid", {unum, cunum: "1", chatid: newChatId});
                    alert("정상적으로 생성되었습니다");
                    await nc.subscribe(newChatId);
                    // 채팅방으로 이동
                    await nc.disconnect();
                    navi(`/chating/room/${newChatId}/${unum}`);
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
        <div className={'mainpage'}>
            <div className='header'>
                <Header/>
            </div>

            <div className={'main_banner'} onClick={chkLogin}>
                
                <Bannerslider/>       
                
            </div>

            <div className={'main_notice'} onClick={chkLogin}>
                <NoticeSlider/>
            </div>



            {/* <hr style={{height:'3px', backgroundColor:'lightgray'}}/> */}
            <div className={'main_friendtxt'}>
                <div>친구 추천</div>
                <div style={{fontSize:'12px', fontWeight:'500'}} 
                onClick={()=>{
                    navi("/friend/search")
                }}>더보기</div>
            </div>
            <div style={{width:'100vw',overflow:'hidden'}}>
                <div className={'main_friendrec'} style={{marginTop:'10px'}} onClick={chkLogin} >
                    <FriendSlider/>
                </div>
            </div>

            {/* <hr style={{height:'3px', backgroundColor:'lightgray'}}/> */}


                    <div className={'main_joinrecotxt'}>
                        <div>당신을 위한 조인 추천</div>
                        <div style={{fontSize:'12px', fontWeight:'500'}}
                        onClick={()=>{
                            navi("/joining/alllist")
                        }}>더보기</div>
                    </div>
            <div style={{width:'100vw',overflow:'hidden'}}>
                <div className={'main_join'}>
                    <div className={'main_joinreco'} onClick={chkLogin}>
                        <Recommendslider/>
                    </div>
                </div>
            </div>

            {/* <hr style={{height:'3px', backgroundColor:'lightgray'}}/> */}


            {/* <hr style={{height:'3px', backgroundColor:'lightgray'}}/> */}

            <div className='adslider'>
                <AdSlider/>
            </div>

            <div style={{width:'100vw',overflow:'hidden'}}>
                <div className={'main_reviewtxt'}>
                    <div>Best 후기</div>
                    <div style={{fontSize:'12px', fontWeight:'500'}}
                    onClick={()=>{
                        navi("/hugi/list")
                    }}>더보기</div>
                    
                </div>

                <div className={'main_reviewwrap'} onClick={chkLogin}>
                    <Reviewslider/>
                </div>

                <div className={'main_ad'}>
                    <img alt={''} src={no}/>
                </div>
                
                <button className='main_chat' type='button' onClick={adminChat}> 
                    <HeadsetMicOutlinedIcon/>
                </button>
            </div>
                <Footer/>
        </div>

    );
}

export default Main;