import React, {useEffect, useState} from 'react';
import "./App.css";
import Axios from "axios";
import {Login, Sign} from "./login";
import {HugiList} from "./hugi";
import {NavLink} from "react-router-dom";
import ScreenSize from "./app_effect/ScreenSize";






function Home(props) {
    useEffect(() => {

    }, [])
    const [photo, setPhoto] = useState('');
    const photourl = `${process.env.REACT_APP_BOARDURL}`



    const onUploadEvent = (e) => {
        const uploadFile = new FormData();
        uploadFile.append("upload", e.target.files[0]);
        Axios({
            method: 'post',
            url: '/upload',
            data: uploadFile,
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
            setPhoto(res.data);
        })
    }

    return (
        <div className="homeBg">
            <ScreenSize/>
            <h2>여기는 몰루입니다.</h2>
            <input type='file' onChange={onUploadEvent}/>


            <img style={{width: '300px'}} alt={'testimg'} src={`${photourl}${photo}`}/>
            <img style={{width: '300px'}} alt={'test2img'}
                 src={`http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy/${photo}`}/>


            <ul> Chat
                <li>
                    <NavLink to={'/chat/lobby'}>채팅방 리스트</NavLink>
                </li>
            </ul>

            <ul> friend
                <li>
                    <NavLink to={'/friend/friend'}>친구목록</NavLink>
                </li>
            </ul>

            <ul> hugi
                <li>
                    <NavLink to={'/hugi/list'}>후기</NavLink>
                </li>
            </ul>

            <ul> joining
                <li>
                    <NavLink to={'/joining/list'}>조인list</NavLink>
                </li>
                <li>
                    <NavLink to={'/joining/form'}>조인폼</NavLink>
                </li>


            </ul>

            <ul>
                Login
                <li>
                    <NavLink to={"/login/login"}>로그인</NavLink>
                </li>
                <li>
                    <NavLink to={"/login/sign"}>회원가입</NavLink>
                </li>
            </ul>

            <ul> mypage
                <li>
                    <NavLink to={''}></NavLink>
                </li>
            </ul>

            <ul> score
                <li>
                    <NavLink to={''}></NavLink>
                </li>
            </ul>
            <ul>chatbot
                <li>
                    <NavLink to={'/chatbot'}>chatbot</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Home;