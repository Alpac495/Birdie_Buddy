import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import {HpChange, KaKaoCallBack, Login, NaverCallBack, PassChange, SearchID, SearchPass, Sign, Taltae} from "./login";
import {Friend, FriendRequest} from "./friend";
import FriendDetail from "./friend/FriendDetail";
import JoinForm from "./joining/JoinForm";
import Mypage from "./mypage/Mypage";
import Main from "./Main";
import RankForm from "./ranking/RankForm";
import RankList from "./ranking/RankList";
import JoinDetail from "./joining/JoinDetail";
import MypageUpdate from "./mypage/MypageUpdate";
import MypageSetting from "./mypage/MypageSetting";
import {YangdoDetail, YangdoForm, YangdoList, YangdoUpdate} from "./yangdo";
import {HugiList, HugiModify} from "./hugi";
import HugiRowList from "./hugi/HugiRowList";
import {JoinAllList, JoinMakeList, JoinRequestList, JoinUpdateForm} from "./joining";
import MypagePay from "./mypage/MypagePay";
import { MyYangdo, MyYangdoDetail, MyYangdoUpdate } from './mypage';
import Test from './yangdo/Test';
import HugiDetail from "./hugi/HugiDetail";
import { Blacklist, NoticeDetail, NoticeForm, NoticeList, UserList } from './admin';
import NCloudChatRoomList from "./chatbot/NCloudChatRoomList";
import ChatRoom from "./chatbot/ChatRoom";
import MyHugiList from "./hugi/MyHugiList";
import MyHugiRowList from "./hugi/MyHugiRowList";
import FriendSearch from './friend/FriendSearch';
import NCloudChatRoomAdmin from "./chatbot/NCloudChatRoomAdmin";
import RankListS from './ranking/RankListS';
import Report from "./admin/Report";
import NoticeEditForm from "./admin/NoticeEditForm";


function RouteMain(props) {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>

                <Route path={'/admin'} >
                    <Route path="userlist" element={<UserList/>}/>
                    <Route path="blacklist" element={<Blacklist/>}/>
                    <Route path="NoticeForm" element={<NoticeForm/>}/>
                    <Route path="NoticeList" element={<NoticeList/>}/>
                    <Route path="NoticeDetail/:nnum" element={<NoticeDetail/>}/>
                    <Route path="NoticeEditForm/:nnum" element={<NoticeEditForm/>}/>
                    <Route path="Report" element={<Report/>}/>
                </Route>

                <Route path={'yangdo'}>
                    <Route path="list" element={<YangdoList/>}/>
                    <Route path="detail" element={<YangdoDetail/>}/>
                    <Route path="detail/:ynum" element={<YangdoDetail/>}/>
                    <Route path="form" element={<YangdoForm/>}/>
                    <Route path="update/:ynum" element={<YangdoUpdate/>}/>
                    <Route path="test" element={<Test/>}/>
                </Route>

                <Route path={'/friend'} >
                    <Route path="list" element={<Friend/>}/>
                    <Route path="requestlist" element={<FriendRequest/>}/>
                    <Route path="detail" element={<FriendDetail/>}/>
                    <Route path="detail/:funum" element={<FriendDetail/>}/>
                    <Route path="search" element={<FriendSearch/>}/>
                </Route>

                <Route path={'/hugi'} >
                    <Route path="list" element={<HugiList/>}/>
                    <Route path="detail/:hnum" element={<HugiDetail/>}/>
                    <Route path="modify/:hnum" element={<HugiModify/>}/>
                    <Route path="list/:unum" element={<MyHugiList/>}/>
                </Route>

                <Route path={'/joining'} >
                    <Route path={"alllist"} element={<JoinAllList/>}/>
                    <Route path={"makelist"} element={<JoinMakeList/>}/>
                    <Route path={"requestlist"} element={<JoinRequestList/>}/>
                    <Route path={"form"} element={<JoinForm/>}/>
                    <Route path={"updateform/:jnum/:unum"} element={<JoinUpdateForm/>}/>
                    <Route path={"detail/:jnum"} element={<JoinDetail/>}/>
                </Route>

                <Route path={'/login'} >
                    <Route path="login" element={<Login/>}/>
                    <Route path="sign" element={<Sign {...props}/>}/>
                    <Route path="kcallback" element={<KaKaoCallBack/>}/>
                    <Route path="ncallback" element={<NaverCallBack/>}/>
                    <Route path="taltae" element={<Taltae/>}/>
                    <Route path="passchange" element={<PassChange/>}/>
                    <Route path="hpchange" element={<HpChange/>}/>
                    <Route path="searchID" element={<SearchID/>}/>
                    <Route path="searchPass" element={<SearchPass/>}/>
                </Route>

                <Route path={'/mypage'} >
                    <Route path="mypage/:unum" element={<Mypage/>}/>
                    <Route path="update" element={<MypageUpdate/>}/>
                    <Route path="setting" element={<MypageSetting/>}/>
                    <Route path="myyangdo/:unum" element={<MyYangdo/>}/>
                    <Route path="myyangdodetail/:ynum/" element={<MyYangdoDetail/>}/>
                    <Route path="update/:ynum/" element={<MyYangdoUpdate/>}/>
                </Route>

                <Route path={'/score'} >
                    <Route path="form" element={<RankForm/>}/>
                    <Route path="list" element={<RankList/>}/>
                    <Route path="listS" element={<RankListS/>}/>
                </Route>

                <Route path={'/chating'} >
                    <Route path="/chating/:unum" element={<NCloudChatRoomList />} />
                    <Route path="/chating/0" element={<NCloudChatRoomAdmin />} />
                    <Route path="/chating/room/:channelId/:cunum" element={<ChatRoom />} />
                </Route>

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