import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import {KaKaoCallBack, Login, NaverCallBack, Sign} from "./login";
import {Friend} from "./friend";
import FriendDetail from "./friend/FriendDetail";
import JoinForm from "./joining/JoinForm";
import JoinList from "./joining/JoinList";
import {HugiDetailPage, HugiList} from "./hugi";
import Mypage from "./mypage/Mypage";
import Bot from "./chatbot/Bot";
import ChatBot from "./chatbot/ChatBot";
import Main from "./Main";
import Lobby from "./chat/Lobby";
import {Room} from "./chat";


function RouteMain(props) {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>

                <Route path={'/chat'}>
                    <Route path="lobby" element={<Lobby/>}/>
                    <Route path="room/:roomId" element={<Room/>}></Route>
                </Route>

                <Route path={'/friend'} >
                    <Route path="list" element={<Friend/>}/>
                    <Route path="list/:unum" element={<Friend/>}/>
                    <Route path="detail" element={<FriendDetail/>}/>
                    <Route path="detail/:funum" element={<FriendDetail/>}/>
                </Route>

                <Route path={'/hugi'} >
                    <Route path="list" element={<HugiList/>}/>

                </Route>

                <Route path={'/joining'} >
                    <Route path={"list"} element={<JoinList/>}/>
                    <Route path={"form"} element={<JoinForm/>}/>

                </Route>

                <Route path={'/login'} >
                    <Route path="login" element={<Login/>}/>
                    <Route path="sign" element={<Sign/>}/>
                    <Route path="kcallback" element={<KaKaoCallBack/>}/>
                    <Route path="ncallback" element={<NaverCallBack/>}/>
                </Route>

                <Route path={'/mypage'} >
                    <Route path="main" element={<Mypage/>}/>
                    <Route path="main/:unum" element={<Mypage/>}/>
                </Route>

                <Route path={'/score'} >

                </Route>


                <Route path="/chatbot" element={<ChatBot />} />

                <Route path={'/main'}>
                    <Route path='main' element={<Main/>}/>
                </Route>

                <Route path="*" element={
                    <div className="error404">
                        잘못된주소
                    </div>
                }/>
            </Routes>
        </div>
    );
}

export default RouteMain;