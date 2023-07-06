import React, {useEffect} from 'react';
import {Await, Router, useLocation} from "react-router-dom";
import axios from "axios";

function NaverCallBack(props) {
    const location = useLocation();

    const getNaverToken = () => {
        const {naver} = window
        // const naverLogin = new naver.LoginWithNaverId
        // if (!location.hash) return;
        const token = location.hash.split('=')[1].split('&')[0]; //token 출력
        console.log(token);
        // naverLogin.getLoginStatus((status: any) => {
        //     if(status) { // 로그인 상태 값이 있을 경우
        //         console.log(naverLogin.user); // 사용자 정보 조회
        //     }
        // });
        // axios.get('https://openapi.naver.com/v1/nid/me', {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     }
        // })
        //     .then(response => {
        //         const userInfo = response.data;
        //         // 사용자 정보를 이용하여 필요한 작업 수행
        //         console.log(userInfo);
        //     })
        //     .catch(error => {
        //         // 에러 처리
        //         console.error(error);
        //     });
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

// import React, {useEffect} from 'react';
// import {useLocation} from "react-router-dom";
// import axios from "axios";
//
// function NaverCallBack(props) {
//     const initializeNaverLogin = () => {
//         const naverLogin = new naver.LoginWithNaverId({
//
//         })
//     }
//     naverLogin.init()
//     naverLogin.getLoginStatus(async function (status) {
//         if (status) {
//             // 아래처럼 선택하여 추출이 가능하고,
//             const userid = naverLogin.user.getEmail()
//             const username = naverLogin.user.getName()
//             // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다.
//             // setUserInfo(naverLogin.user)
//         }
//     })
// }
//
// const userAccessToken = () => {
//     window.location.href.includes('access_token') && getToken()
// }
//
// const getToken = () => {
//     const token = window.location.href.split('=')[1].split('&')[0]
//     // console.log, alert 창을 통해 어스코드가 잘 추출 되는지 확인하자!
//
//     // 이후 로컬 스토리지 또는 state에 저장하여 사용하자!
//     // localStorage.setItem('access_token', token)
//     // setGetToken(token)
// }
//
//
// useEffect(() => {
//     getNaverToken();
// }, []);
//
// return (
//     <div>
//         navercall
//     </div>
// )
// }
//
