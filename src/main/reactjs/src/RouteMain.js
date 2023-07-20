import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import {KaKaoCallBack, Login, NaverCallBack, Sign} from "./login";
import {Friend, FriendRequest} from "./friend";
import FriendDetail from "./friend/FriendDetail";
import JoinForm from "./joining/JoinForm";
import JoinList from "./joining/JoinList";
import Mypage from "./mypage/Mypage";
import Bot from "./chatbot/Bot";
import ChatBot from "./chatbot/ChatApp";
import Main from "./Main";
import RankForm from "./ranking/RankForm";
import RankList from "./ranking/RankList";
import JoinDetail from "./joining/JoinDetail";
import MypageUpdate from "./mypage/MypageUpdate";
import MypageSetting from "./mypage/MypageSetting";
import {YangdoDetail, YangdoForm, YangdoList, YangdoUpdate} from "./yangdo";
import {HugiList, HugiModify} from "./hugi";
import HugiRowList from "./hugi/HugiRowList";
import {JoinListMine} from "./joining";
import MypagePay from "./mypage/MypagePay";
import { MyYangdo, MyYangdoDetail, MyYangdoUpdate } from './mypage';
import Test from './yangdo/Test';
import HugiDetail from "./hugi/HugiDetail";



function RouteMain(props) {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>

                <Route path={'yangdo'}>
                    <Route path="list" element={<YangdoList/>}/>
                    <Route path="list/:currentPage" element={<YangdoList/>}/>
                    <Route path="detail" element={<YangdoDetail/>}/>
                    <Route path="detail/:ynum/:currentPage" element={<YangdoDetail/>}/>
                    <Route path="form" element={<YangdoForm/>}/>
                    <Route path="update/:ynum/:currentPage" element={<YangdoUpdate/>}/>
                    <Route path="test" element={<Test/>}/>
                </Route>

                <Route path={'/friend'} >
                    <Route path="list" element={<Friend/>}/>
                    <Route path="list/:unum" element={<Friend/>}/>
                    <Route path="requestlist/:unum" element={<FriendRequest/>}/>
                    <Route path="detail" element={<FriendDetail/>}/>
                    <Route path="detail/:funum" element={<FriendDetail/>}/>
                </Route>

                <Route path={'/hugi'} >
                    <Route path="list" element={<HugiList/>}/>
                    <Route path="hugilist" element={<HugiRowList/>}/>
                    <Route path="detail/:hnum" element={<HugiDetail/>}/>
                    <Route path="modify/:hnum" element={<HugiModify/>}/>
                </Route>

                <Route path={'/joining'} >
                    <Route path={"list/:unum"} element={<JoinList/>}/>
                    <Route path={"mylist/:unum"} element={<JoinListMine/>}/>
                    <Route path={"form"} element={<JoinForm/>}/>
                    <Route path={"detail"} element={<JoinDetail/>}/>
                    <Route path={"detail/:jnum/:unum"} element={<JoinDetail/>}/>
                </Route>

                <Route path={'/login'} >
                    <Route path="login" element={<Login/>}/>
                    <Route path="sign" element={<Sign {...props}/>}/>
                    <Route path="kcallback" element={<KaKaoCallBack/>}/>
                    <Route path="ncallback" element={<NaverCallBack/>}/>
                </Route>

                <Route path={'/mypage'} >
                    <Route path="mypage/:unum" element={<Mypage/>}/>
                    <Route path="update" element={<MypageUpdate/>}/>
                    <Route path="setting/:unum" element={<MypageSetting/>}/>
                    <Route path="myyangdo/:unum/:currentPage" element={<MyYangdo/>}/>
                    <Route path="myyangdodetail/:ynum/:currentPage" element={<MyYangdoDetail/>}/>
                    <Route path="update/:ynum/:currentPage" element={<MyYangdoUpdate/>}/>
                </Route>

                <Route path={'/score'} >
                    <Route path="form" element={<RankForm/>}/>
                    <Route path="list" element={<RankList/>}/>
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