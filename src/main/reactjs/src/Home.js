import React, {useEffect, useState} from 'react';
import "./App.css";
import Axios from "axios";
import {Login, Sign} from "./login";
import {HugiList} from "./hugi";
import {NavLink, useNavigate} from "react-router-dom";
import axios from 'axios';


function Home(props) {
    const [unum, setUnum]=useState('');
    const unumchk=()=>{
        axios.get("/login/unumChk")
        .then(res=> {
            setUnum(res.data);
        });
    }
    useEffect(() => {
        unumchk()
    }, [])

    const navi=useNavigate();

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

    const logout =()=>{
        axios.get("/login/logout")
        .then(res=>{
            setUnum('');
        })
    }

    return (
        <div className="homeBg">
            {
                unum==0?
                    <h2>여기는 몰루입니다.</h2>:
                    <h2>로그인중<br/>unum : {unum}</h2>
            }
            <input type='file' onChange={onUploadEvent}/>


            <img style={{width: '300px'}} alt={'testimg'} src={`${photourl}${photo}`}/>
            <img style={{width: '300px'}} alt={'test2img'}
                 src={`http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy/${photo}`}/>


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
                    <NavLink to={`/joining/list/${unum}`}>조인list</NavLink>
                </li>
                <li>
                    <NavLink to={'/joining/form'}>조인폼</NavLink>
                </li>


            </ul>

            <ul>
                Login

                <li>
                    {
                        unum==0?
                            <NavLink to={"/login/login"}>로그인</NavLink>:
                            <div onClick={logout}>로그아웃</div>
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
                <li>
                    <NavLink to={`/mypage/setting/${unum}`}>마이페이지 세팅</NavLink>
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
            <ul>admin
                <li>
                    <NavLink to={'/admin/userlist'}>전체사용자</NavLink>
                </li>
                <li>
                    <NavLink to={'/admin/blacklist'}>블랙리스트</NavLink>
                </li>
                <li>
                    <NavLink to={'/admin/noticeform'}>공지작성폼</NavLink>
                </li>
                <li>
                    <NavLink to={'/admin/noticeList'}>공지리스트</NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Home;