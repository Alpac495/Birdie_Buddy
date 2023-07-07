import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import './Login.css';
import Naver from "./Naver";

function Login(props) {

    //kakao
    const CLIENT_ID = "e1c40d8c3604fc88b3261a8776aa4d52";
    const REDIRECT_URI = "http://localhost:3000/login/kcallback";
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`
    const kakaoLogin=()=> window.location.href = kakaoURL;
    const ouSubmitEvent = (e) => {
        e.preventDefault();
        axios.get(`/login/login?uemail=${uemail}&upass=${upass}&saveemail=${saveemail}`)
            .then(res => {
                console.log(res.data)
                if (res.data !== 0) {
                    alert("로그인 성공. 세션에 unum ")
                    sessionStorage.setItem("unum", `${res.data}`)
                    navi("/");
                } else {
                    alert("로그인 실패")
                }
            })
    }
    const sign = () => {
        navi("/login/sign")
    }
    const [uemail, setUemail] = useState('');
    const [upass, setUpass] = useState('');
    const [saveemail, setSaveemail] = useState('');
    const navi = useNavigate();
    return (
        <div className={'div1'} style={{width: '360px'}}>
            <div className={'div2'}>
                <form onSubmit={ouSubmitEvent}>
                    <input className={'greenbox'} type={'text'} required placeholder='Email' onChange={(e) => setUemail(e.target.value)}
                           value={uemail}/><br/><br/>
                    <input className={'greenbox'} type={'password'} required placeholder='Pass' onChange={(e) => setUpass(e.target.value)}
                           value={upass}/><br/><br/>
                    <input type={'checkbox'} className={'savechk'} onClick={(e) => setSaveemail("true")}></input>
                    <span className={'emailtext'}>이메일저장</span>
                    <div className={'signbtn'} type={'button'} onClick={sign}>회원가입</div>
                    <button className={'greenbox'} type={'submit'} onClick={ouSubmitEvent}>로그인</button>
                </form>
                <button onClick={kakaoLogin}>카카오 로그인</button>
                <Naver/>
            </div>
        </div>
    );
}
export default Login;