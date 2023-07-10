import React from 'react';

function Kakao(props) {
    //kakao
    const CLIENT_ID = "e1c40d8c3604fc88b3261a8776aa4d52";
    const REDIRECT_URI = "http://localhost:3000/login/kcallback";
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`
    const kakaoLogin = () => window.location.href = kakaoURL;

    return (
        <div>
            <button onClick={kakaoLogin}>카카오 로그인</button>
        </div>
    );
}

export default Kakao;