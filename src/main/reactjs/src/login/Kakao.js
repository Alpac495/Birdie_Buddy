import React from 'react';
import './Login.css';
import kbtn from '../image/kakaobtn.png';

function Kakao(props) {
    //kakao
    const CLIENT_ID = "e1c40d8c3604fc88b3261a8776aa4d52";
    const REDIRECT_URI = "http://localhost:3000/login/kcallback";
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`
    const kakaoLogin = () => window.location.href = kakaoURL;

    return (
        <div>
            <img alt={''} src={kbtn} className={'kakaobtn'} onClick={kakaoLogin} />
        </div>
    );
}

export default Kakao;