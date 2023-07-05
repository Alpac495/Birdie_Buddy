import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./Home";
import {Login, Sign} from "./login";
import {Friend} from "./friend";
import FriendDetail from "./friend/FriendDetail";
import JoinForm from "./joining/JoinForm";
import JoinList from "./joining/JoinList";
import {HugiDetailPage, HugiList} from "./hugi";
import Mypage from "./mypage/Mypage";

function RouteMain(props) {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>


                <Route path={'/friend'} >
                    <Route path="list" element={<Friend/>}/>
                    <Route path="detail" element={<FriendDetail/>}/>
                    <Route path="detail/:funum" element={<FriendDetail/>}/>
                </Route>

                <Route path={'/hugi'} >
                    <Route path="list" element={<HugiList/>}/>
                    <Route path="detail" element={<HugiDetailPage/>}/>
                </Route>

                <Route path={'/joining'} >
                    <Route path={"list"} element={<JoinList/>}/>
                    <Route path={"form"} element={<JoinForm/>}/>

                </Route>

                <Route path={'/login'} >
                    <Route path="login" element={<Login/>}/>
                    <Route path="sign" element={<Sign/>}/>
                </Route>

                <Route path={'/mypage'} >
                    <Route path="main" element={<Mypage/>}/>
                    <Route path="main/:unum" element={<Mypage/>}/>
                </Route>

                <Route path={'/score'} >

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