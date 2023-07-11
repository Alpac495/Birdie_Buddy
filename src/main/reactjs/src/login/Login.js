import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import './Login.css';
import Naver from "./Naver";
import Kakao from "./Kakao"
import logo from "../image/logo_main.svg"

function Login(props) {

    const [uemail, setUemail] = useState('');
    const [upass, setUpass] = useState('');
    const [saveemail, setSaveemail] = useState(false);
    const navi = useNavigate();

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
    console.log(saveemail)

    const toggle=()=>{
        setSaveemail(prevsaveemail=>(prevsaveemail===true?false:true));
    }

    return (
        <div className={'div1'}>
            <img src={logo} alt={''} />
            <div className={'div2'}>
                <form onSubmit={ouSubmitEvent}>
                    <input className={'greenbox'} type={'text'} required placeholder='Email'
                           onChange={(e) => setUemail(e.target.value)}
                           value={uemail}/><br/><br/>
                    <input className={'greenbox'} type={'password'} required placeholder='Pass'
                           onChange={(e) => setUpass(e.target.value)}
                           value={upass}/><br/>
                    <input type={'checkbox'} className={''} onClick={toggle}></input>
                    <span className={''}>이메일저장</span>
                    <div className={''} type={'button'} onClick={sign}>회원가입</div>
                    <button className={'greenbox'} type={'submit'} onClick={ouSubmitEvent}>로그인</button>
                </form>
                <Kakao/>
                <Naver/>
            </div>
        </div>
    );
}

export default Login;