import React from 'react';
import kakaobtn from '../image/kakao_btn.png'
import './Login.css';

function Kakao(props) {
    //kakao
    const CLIENT_ID = "e1c40d8c3604fc88b3261a8776aa4d52";
    const REDIRECT_URI = "http://localhost:3000/login/kcallback";
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`
    const kakaoLogin = () => window.location.href = kakaoURL;

    return (
        <div>
            <img src={kakaobtn} className={'kakaobtn'} onClick={kakaoLogin}/>
        </div>
    );
}

export default Kakao;