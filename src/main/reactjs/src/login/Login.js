import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import './Login.css';
import Naver from "./Naver";
import Kakao from "./Kakao"
import logo from "../image/logo_main.svg"
import {Switch} from "@mui/material";

function Login(props) {

    const [uemail, setUemail] = useState('');
    const [upass, setUpass] = useState('');
    const [saveemail, setSaveemail] = useState(false);
    const navi = useNavigate();
    const emailRef = useRef();

    const ouSubmitEvent = (e) => {
        e.preventDefault();
        localStorage.removeItem("uemail");
        if(saveemail==true){
            localStorage.setItem("uemail",uemail)
        }
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
    useEffect(() => {
        if(localStorage.uemail!=null){
            setUemail(localStorage.uemail);
            emailRef.current.click();
            setSaveemail(true);
        }
    }, []);

    const sign = () => {
        navi("/login/sign")
    }
    console.log(saveemail)

    const toggle=()=>{
        setSaveemail(prevsaveemail=>(prevsaveemail===true?false:true));
    }

    return (
        <div className={'div1'}>
            <img src={logo} alt={''} className={'logo'}/>
            <div className={'div2'}>
                <form onSubmit={ouSubmitEvent}>
                    <input className={'greenbox'} type={'text'} required placeholder='Email'
                           onChange={(e) => setUemail(e.target.value)}
                           value={uemail}/><br/><br/>
                    <input className={'greenbox'} type={'password'} required placeholder='Pass'
                           onChange={(e) => setUpass(e.target.value)}
                           value={upass}/><br/>
                    <label><Switch ref={emailRef} className={''} onClick={toggle} />
                        이메일저장</label>&nbsp;&nbsp;&nbsp;
                    <span className={''} type={'button'} onClick={sign}>회원가입</span>
                    <button className={'greenbox loginbtn'} type={'submit'} onClick={ouSubmitEvent}><span>로그인</span></button>
                </form>
                <br/>
                <div style={{display:'flex'}}><Kakao/><Naver/></div>
            </div>
        </div>
    );
}

export default Login;