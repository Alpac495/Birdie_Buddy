import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";

function Naver(props) {
    const location = useLocation();
    const NaverLogin = () => {
        const {naver} = window
        const naverLogin = new naver.LoginWithNaverId(
            {
                clientId: "AmX1zvlO8VFKoSiQZoaz",
                callbackUrl: "http://localhost:3000/login/ncallback",
                isPopup: false, /* 팝업을 통한 연동처리 여부, true 면 팝업 */
                loginButton: {color: "green", type: 3, height: 47}, /* 로그인 버튼의 타입을 지정 */
                //callbackHandle: true,
            }
        );
        naverLogin.init();
        console.log(naverLogin);
        if (!location.hash) return;
        const token = location.hash.split('=')[1].split('&')[0]; //token 출력
        console.log(token);
    }

    useEffect(() => {
        NaverLogin()
    }, []);
    return (
        <div className={'grid-naver'} id={'naverIdLogin'}>
            네이버로그인2
        </div>
    );
}

export default Naver;