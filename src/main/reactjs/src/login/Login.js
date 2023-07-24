import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import './Login.css';
import Naver from "./Naver";
import Kakao from "./Kakao"
import logo from "../image/logo_main.svg"
import {FormControlLabel, Switch} from "@mui/material";

function Login(props) {

    const [uemail, setUemail] = useState('');
    const [upass, setUpass] = useState('');
    const [saveemail, setSaveemail] = useState(false);
    const navi = useNavigate();
    const emailRef = useRef();

    const ouSubmitEvent = (e) => {
        e.preventDefault();
        localStorage.removeItem("uemail");
        if (saveemail == true) {
            localStorage.setItem("uemail", uemail)
        }
        axios.get(`/login/login?uemail=${uemail}&upass=${upass}&saveemail=${saveemail}`)
            .then(res => {
                console.log(res.data)
                if (res.data !== 0) {
                    alert("로그인 성공")
                    navi("/");
                } else {
                    alert("로그인 실패")
                }
            })
    }
    useEffect(() => {
        if (localStorage.uemail != null) {
            setUemail(localStorage.uemail);
            setSaveemail(true);
        }
    }, []);

    const sign = () => {
        navi("/login/sign")
    }
    const searchID = () => {
        navi("/login/searchID")
    }
    const searchPass = () => {
        navi("/login/searchPass")
    }
    console.log(saveemail)

    const toggle = () => {
        setSaveemail(prevsaveemail => (prevsaveemail === false ? true : false));
    }

    return (
        <div className={'Login_div1'}>
            <img src={logo} alt={''}/>
            <div className={'Login_div2'}>
                <form onSubmit={ouSubmitEvent}>
                    <input className={'Login_greenbox'} type={'text'} required placeholder='ID'
                           onChange={(e) => setUemail(e.target.value)}
                           value={uemail}/><br/><br/>
                    <input className={'Login_greenbox'} type={'password'} required placeholder='Pass'
                           onChange={(e) => setUpass(e.target.value)}
                           value={upass}/><br/>
                    <div className={'Login_div3'}>
                        <FormControlLabel
                            control={
                                localStorage.uemail != null ? 
                                <Switch ref={emailRef} onChange={toggle} defaultChecked/>
                                :
                                <Switch ref={emailRef} onChange={toggle}/>
                            }
                            label="이메일저장"
                        />
                        <span>
                            <span className={''} type={'button'} onClick={searchID}>ID찾기</span> /
                            <span className={''} type={'button'} onClick={searchPass}>PASS찾기</span> /
                            <span className={''} type={'button'} onClick={sign}>회원가입</span>
                        </span>
                    </div>
                    <button className={'Login_greenbox Login_loginbtn'} type={'submit'} onClick={ouSubmitEvent}>
                        로그인
                    </button>
                </form>
                <br/>
                <div style={{display: 'flex'}}>
                    <Kakao/><Naver/>
                </div>
            </div>
        </div>
    );
}

export default Login;