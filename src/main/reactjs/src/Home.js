import React, {useEffect, useState} from 'react';
import "./App.css";
import Axios from "axios";
import {Login, Sign} from "./login";
import {HugiList} from "./hugi";
import {NavLink, useNavigate} from "react-router-dom";






function Home(props) {
    const unum=sessionStorage.unum;
    const navi=useNavigate();
    console.log(unum)
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
            {
                sessionStorage.unum==null?
                    <h2>여기는 몰루입니다.</h2>:
                    <h2>로그인중<br/>unum : {unum}</h2>
            }
            <input type='file' onChange={onUploadEvent}/>


            <img style={{width: '300px'}} alt={'testimg'} src={`${photourl}${photo}`}/>
            <img style={{width: '300px'}} alt={'test2img'}
                 src={`http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy/${photo}`}/>


            <ul> Chat
                <li>
                    <NavLink to={'/chat/lobby'}>채팅방 리스트</NavLink>
                </li>
            </ul>

            <ul> Yangdo
                <li>
                    <NavLink to={'/yangdo/list/1'}>양도 리스트</NavLink>
                </li>
            </ul>

            <ul> friend
                <li>
                    <NavLink to={`/friend/list/${unum}`}>친구목록</NavLink>
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
                    {
                        sessionStorage.unum==null?
                            <NavLink to={"/login/login"}>로그인</NavLink>:
                            <div onClick={()=>{
                                sessionStorage.clear();
                                navi('/');
                            }}>로그아웃</div>
                    }
                </li>

                <li>
                    <NavLink to={"/login/sign"}>회원가입</NavLink>
                </li>
            </ul>

            <ul> mypage
                <li>
                    <NavLink to={`/mypage/mypage/${unum}`}>마이페이지</NavLink>
                </li>
                <li>
                    <NavLink to={`/mypage/update`}>마이페이지/수정</NavLink>
                </li>
            </ul>

            <ul> score
                <li>
                    <NavLink to={'/score/form'}>랭킹폼</NavLink>
                </li>
                <li>
                    <NavLink to={'/score/list'}>랭킹리스트</NavLink>
                </li>
            </ul>
            <ul>chatbot
                <li>
                    <NavLink to={'/chatbot'}>chatbot</NavLink>
                </li>
            </ul>
            <ul>main
                <li>
                    <NavLink to={'/main/main'}>main</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Home;