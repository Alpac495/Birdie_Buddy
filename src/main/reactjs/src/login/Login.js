import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import './Login.css';

function Login(props) {
    useEffect(() => {
        NaverLogin()
    }, []);

    const CLIENT_ID = "e1c40d8c3604fc88b3261a8776aa4d52";
    const REDIRECT_URI = "http://localhost:3000/login/kcallback";
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`

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
    const logout = () => {
        sessionStorage.clear();
        navi("/")
    }
    const [uemail, setUemail] = useState('');
    const [upass, setUpass] = useState('');
    const [saveemail, setSaveemail] = useState('');
    const navi = useNavigate();
    return (
        <div className={'div1'} style={{width: '360px'}}>
            <div className={'div2'}>
                <form onSubmit={ouSubmitEvent}>
                    <input className={'greenbox'} type={'text'} required placeholder='Email' onChange={(e) => setUemail(e.target.value)}
                           value={uemail}/><br/><br/>
                    <input className={'greenbox'} type={'password'} required placeholder='Pass' onChange={(e) => setUpass(e.target.value)}
                           value={upass}/><br/><br/>
                    <input type={'checkbox'} className={'savechk'} onClick={(e) => setSaveemail("true")}></input>
                    <span className={'emailtext'}>이메일저장</span>
                    <div className={'signbtn'} type={'button'} onClick={sign}>회원가입</div>
                    <button className={'greenbox'} type={'submit'} onClick={ouSubmitEvent}>로그인</button>
                </form>
                <div className={'grid-naver'} id={'naverIdLogin'}>네이버로그인</div>
                <button onClick={() => window.location.href = kakaoURL}>카카오 로그인</button>
            </div>

        </div>
    );
}

export default Login;
// import React, {useEffect, useState} from 'react';
// import axios from "axios";
// import {useNavigate} from "react-router-dom";
//
// function Login(props) {
//     useEffect(() => {
//         initializeNaverLogin()
//         userAccessToken()
//     }, [])
//
//     const CLIENT_ID = "e1c40d8c3604fc88b3261a8776aa4d52";
//     const REDIRECT_URI = "http://localhost:3000/login/kcallback";
//     const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`
//
//     const {naver} = window
//     const NAVER_CLIENT_ID = "AmX1zvlO8VFKoSiQZoaz";
//     const NAVER_CALLBACK_URL = "http://localhost:3000/login/login";
//
//     const initializeNaverLogin = () => {
//         const naverLogin = new naver.LoginWithNaverId({
//             clientId: {NAVER_CLIENT_ID},
//             callbackUrl: {NAVER_CALLBACK_URL},
//             // 팝업창으로 로그인을 진행할 것인지?
//             isPopup: false,
//             // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
//             loginButton: {color: 'green', type: 3, height: 58},
//             callbackHandle: true
//         });
//         naverLogin.init()
//         naverLogin.getLoginStatus(async function (status) {
//             if (status) {
//                 // 아래처럼 선택하여 추출이 가능하고,
//                 const userid = naverLogin.user.getEmail()
//                 const username = naverLogin.user.getName()
//                 // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다.
//                 // setUserInfo(naverLogin.user)
//             }
//         })
//     }
//     const userAccessToken = () => {
//         window.location.href.includes('access_token') && getToken()
//     }
//
//     const getToken = () => {
//         const token = window.location.href.split('=')[1].split('&')[0]
//         // console.log, alert 창을 통해 어스코드가 잘 추출 되는지 확인하자!
//
//         // 이후 로컬 스토리지 또는 state에 저장하여 사용하자!
//         // localStorage.setItem('access_token', token)
//         // setGetToken(token)
//     }
//
//     const ouSubmitEvent = (e) => {
//         e.preventDefault();
//         axios.get(`/login/login?uemail=${uemail}&upass=${upass}&saveemail=${saveemail}`)
//             .then(res => {
//                 console.log(res.data)
//                 if (res.data !== 0) {
//                     alert("로그인 성공. 세션에 unum ")
//                     sessionStorage.setItem("unum", `${res.data}`)
//                     navi("/");
//                 } else {
//                     alert("로그인 실패")
//                 }
//             })
//     }
//     const logout = () => {
//         sessionStorage.clear();
//         navi("/")
//     }
//     const [uemail, setUemail] = useState('');
//     const [upass, setUpass] = useState('');
//     const [saveemail, setSaveemail] = useState('');
//     const navi = useNavigate();
//     return (
//         <div className={''} style={{width: '360px'}}>
//             <div style={{textAlign: 'center'}}>
//                 <form onSubmit={ouSubmitEvent}>
//                     <input type={'text'} required onChange={(e) => setUemail(e.target.value)} value={uemail}/><br/><br/>
//                     <input type={'password'} required onChange={(e) => setUpass(e.target.value)}
//                            value={upass}/><br/><br/>
//                     <input type={'checkbox'} onClick={(e) => setSaveemail("true")}/>이메일저장<br/>
//                     {
//                         sessionStorage.unum == 0 || sessionStorage.unum == null ? <button>로그인</button>
//                             : <button type={'button'} onClick={logout}>로그아웃</button>
//                     }
//                 </form>
//                 <div className={'grid-naver'} id={'naverIdLogin'} onClick={initializeNaverLogin}>네이버로그인</div>
//                 <button onClick={() => window.location.href = kakaoURL}>카카오 로그인</button>
//             </div>
//
//         </div>
//     );
// }
//
// export default Login;