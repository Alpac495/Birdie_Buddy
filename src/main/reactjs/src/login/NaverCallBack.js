import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import axios from "axios";

function NaverCallBack(props) {
    const location = useLocation();

    const getNaverToken = () => {
        const { naver } = window;
        const naverLogin = new naver.LoginWithNaverId({
            clientId: "AmX1zvlO8VFKoSiQZoaz",
            callbackUrl: "http://localhost:3000/login/ncallback",
        });

        naverLogin.init();
        if (!location.hash) return;
        const token = location.hash.split('=')[1].split('&')[0]; //token 출력
        console.log("token:" + token);

        naverLogin.getLoginStatus((status) => {
            if (status) { // 로그인 상태 값이 있을 경우
                console.log("naverLogin.user:", naverLogin.user); // 사용자 정보 조회
            }
        });

        axios.get('https://openapi.naver.com/v1/nid/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {
                const userInfo = response.data;
                // 사용자 정보를 이용하여 필요한 작업 수행
                console.log(userInfo);
            })
            .catch(error => {
                // 에러 처리
                console.error(error);
            });
    };

    useEffect(() => {
        getNaverToken();
    }, []);

    return (
        <div>
            navercall
        </div>
    );
}

export default NaverCallBack;