import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { FormControlLabel, Switch } from "@mui/material";
import kakaoicon from "../image/kakao.svg";
import navericon from "../image/naver.svg";
import mainlogo from "../image/mainlogo.svg";


function Login(props) {
    const [uemail, setUemail] = useState('');
    const [upass, setUpass] = useState('');
    const [saveemail, setSaveemail] = useState(false);
    const navi = useNavigate();
    const emailRef = useRef();


    //kakao
    const CLIENT_ID = "e1c40d8c3604fc88b3261a8776aa4d52";
    const REDIRECT_URI = "http://localhost:3000/login/kcallback";
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`
    const kakaoLogin = () => window.location.href = kakaoURL;

    //naver
    useEffect(() => {
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: 'AmX1zvlO8VFKoSiQZoaz',
            callbackUrl: 'http://localhost:3000/login/ncallback',
            isPopup: false,
            loginButton: { color: 'green', type: 3, height: 40 },
        });
        naverLogin.init();
    }, []);

    const handleNaverLogin = () => {
        if (document &&
            document?.querySelector("#naverIdLogin")?.firstChild &&
            window !== undefined) {
            const loginBtn = document.getElementById("naverIdLogin")?.firstChild;
            loginBtn.click();
        }
    }

    const ouSubmitEvent = (e) => {
        e.preventDefault();
        axios.get(`/apilogin/login?uemail=${uemail}&upass=${upass}&saveemail=${saveemail}`)
        .then(res => {
            // console.log(res.data)
            if (res.data === 0) {
                alert("등록되지 않은 아이디이거나, 아이디 또는 비밀번호를 잘못 입력하셨습니다.")
                setUpass('');
            } else if (res.data===-1){
                alert("활동 정지를 당한 회원입니다. 관리자에게 문의해 주세요.")
                setUpass('');
            } else {
                    localStorage.removeItem("uemail");
                    if (saveemail === true) {
                        localStorage.setItem("uemail", uemail)
                    }
                    navi("/birdie_buddy")
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
        <div className="LGlogin">
            <div className="LGyour-id-wrapper">
                <input className={'LGyour-id'} type={'text'} required placeholder='ID'
                    onChange={(e) => setUemail(e.target.value)}
                    value={uemail} />
            </div>
            <div className="LGyour-password-wrapper">
                <input className={'LGyour-password'} type={'password'} required placeholder='Password'
                    onChange={(e) => setUpass(e.target.value)}
                    value={upass} />
            </div>
            <FormControlLabel
                className="LGlogin-child"
                control={
                    localStorage.uemail != null ?
                        <Switch ref={emailRef} onChange={toggle} defaultChecked />
                        :
                        <Switch ref={emailRef} onChange={toggle} />
                }
            /><div className="LGdiv">아이디 저장</div>
            <div className="LGwrapper" onClick={ouSubmitEvent}>
                <div className="LGdiv1">로그인</div>
            </div>
            <div className="LGlogin-inner">
                <div className="LGparent" onClick={handleNaverLogin}>
                    <div id="naverIdLogin" style={{ display: 'none' }}></div>
                    <div className="LGdiv2">네이버 로그인</div>
                    <img className="LGicon-naver" alt="" src={navericon} />
                </div>
            </div>
            <img className="LGicon" alt="" src={mainlogo} onClick={() => navi('/')} />
            <div className="LGgroup">
                <div onClick={searchPass} className="LGdiv3">비밀번호 찾기</div>
                <div onClick={searchID} className="LGdiv4">아이디 찾기</div>
                <div onClick={sign} className="LGdiv5">회원가입</div>
                <div className="LGgroup-child" />
                <div className="LGgroup-item" />
            </div>
            <div className="LGgroup-div">
                <div className="LGcontainer" onClick={kakaoLogin}>
                    <div className="LGdiv2" >카카오 로그인</div>
                    <img className="LGicon-kakao" alt="" src={kakaoicon} />
                </div>
            </div>
        </div>
    );
};

export default Login;