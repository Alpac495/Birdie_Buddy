import React, {useEffect, useState} from 'react';
import Axios from "axios";
import "./Friend.css";
import {Link, NavLink, useNavigate} from 'react-router-dom';
import Profile from "../image/user60.png";
import * as ncloudchat from 'ncloudchat';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../header/Header';

function Friend(props) {
    const url = process.env.REACT_APP_PROFILE;
    const [unum, setUnum]=useState('');
    const [data,setData]=useState('');
    const [userdata,setUserData]=useState('');
    const now = new Date();
    const year = now.getFullYear();
    const [unickname, setUnickname] = useState('');
    const [uemail, setUemail] = useState('');
    const [nc, setNc] = useState('');
    const navi=useNavigate();
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const fetchMoreData = async () => {
        try {
            // Step 1: Get data from "/login/unumChk" endpoint
            const res1 = await Axios.get("/login/unumChk");
            const unum = res1.data;
            setUnum(unum);
    
            // Step 2: Get data from "/friend/list" endpoint using the unum
            setLoading(true);
                Axios
                    .get(`/friend/paginglist?unum=${res1.data}&page=${page}&size=7`) // size=페이지 당 n개의 아이템을 요청하도록 수정
                    .then((res) => {
                        setItems((prevItems) => [...prevItems, ...res.data]);
                        console.log(items);
                        console.log(res.data);
                        setPage((prevPage) => prevPage + 1);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("데이터를 더 가져오는 중 오류 발생:", error);
                        setLoading(false);
                    });
            // const friendListUrl = `/friend/list?unum=${unum}`;
            // const res2 = await Axios.get(friendListUrl);
            // setData(res2.data);
            // console.log(res2.data);
    
            // Step 3: Get user info from "/chating/getuserinfo" using the unum
            const getUserInfoUrl = `/chating/getuserinfo?unum=${unum}`;
            const res3 = await Axios.get(getUserInfoUrl);
            const userInfo = res3.data;
            setUserData(userInfo);
            setUnickname(userInfo.unickname);
            setUemail(userInfo.uemail);
    
            // Step 4: Initialize and connect to ncloudchat.Chat
            const chat = new ncloudchat.Chat();
            chat.initialize('08c17789-2174-4cf4-a9c5-f305431cc506');
            setNc(chat);
    
            await chat.connect({
                id: res3.data.uemail,
                name: res3.data.unickname,
                profile: 'https://image_url',
                customField: 'json',
            });
    
            // Step 5: Get channels using user's email and other filters
            const filter = { state: true, members: res3.data.uemail };
            const sort = { created_at: -1 };
            const option = { offset: 0, per_page: 100 };
            const channels = await chat.getChannels(filter, sort, option);
        } catch (error) {
            // Handle any errors that might occur during the process
            console.error(error);
        }
    };
    
    useEffect(() => {
        fetchMoreData();
    }, []);
    
    
    console.log(unum)

    const getChatInfo = async (unum, cunum) => {
        try {
            console.log("getChatInfo");
            console.log("unum1: "+unum);
            console.log("unum2: "+cunum);
            const response = await Axios.get(`/chating/getchatinfo?unum1=${unum}&unum2=${cunum}`);
            return response.data;
        } catch (error) {
            console.error(error);
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

    const onChatEvent = async (cunum) => {
        if (nc) {
            try {
                const chatid = await getChatInfo(unum, cunum);
                console.log("chatid:"+chatid);
                if (chatid) {
                    // chatid != null 일 경우
                    await nc.disconnect();
                    navi(`/chating/room/${chatid}/${unum}`);
                } else {
                    // chatid == null 일 경우
                    const newchannel = await nc.createChannel({ type: 'PUBLIC', name: String(unum) + " " + String(cunum)});
                    const newChatId = newchannel.id;
                    await Axios.post("/chating/insertchatid", {unum, cunum, chatid: newChatId});

                    alert("정상적으로 생성되었습니다");
                    // 채팅방으로 이동
                    await nc.disconnect();
                    navi(`/chating/room/${newChatId}/${cunum}`);
                }
            } catch (error) {
                console.error('Error creating and subscribing channel:', error);
            }
        }
    };

    return (
        <div className="friend">            
            <div className="header"><Header/></div>
            <div className="FLtab">
                <NavLink to={`/friend/list`}>
                    <div className="flframe">
                        <div className="FLdiv">버디 리스트</div>
                    </div>
                </NavLink>
                <NavLink to={`/friend/requestlist`}>
                    <div className="FLframe">
                        <div className="FLdiv">버디 요청</div>
                    </div>
                </NavLink>
            </div>
            <div className='friendlist'>
            <InfiniteScroll
                    dataLength={items.length}
                    next={fetchMoreData}
                    hasMore={items.length>0}
                    loader={<h4>마지막</h4>}
                    endMessage={null}
                >
            {
                items.map &&
                items.map((item,idx)=>

                    <div className="flist">
                                <div className="flistprofile1">
                                    <Link to={`/friend/detail/${item.funum}`} className="FDMoveLink">
                                    {item.uphoto == null ? <img className="FLphoto-icon" alt="" src={Profile} /> :
                                    <img className="FLphoto-icon" src={`${url}${item.uphoto}`} alt={''}/>}
                                    </Link>
                                    <div className="FLdiv3">
                                      <span className="FLtxt">
                                        <p className="FLp">{item.unickname}</p>
                                        <p className="FLp1">{item.ugender} / {year - (parseInt(item.uage.substring(0, 4), 10))}세</p>
                                      </span>
                                    </div>

                                    <div className="FLrectangle-parent">
                                        <div className="FLgroup-child" />
                                        <div className="FLdiv4" onClick={onChatEvent.bind(null, item.funum)}>채팅하기</div>
                                    </div>
                                </div>                        
                    </div>
                 )
            }
        </InfiniteScroll>
        </div>
        </div>
    );
}

export default Friend;