import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login(props) {
    const [test1,setTest1] = useState('');
    const NaverLogin = () => {
        const {naver} = window
        const naverLogin = new naver.LoginWithNaverId(
            {
                clientId: "AmX1zvlO8VFKoSiQZoaz",
                callbackUrl: "http://localhost:3000/login/test",
                isPopup: false, /* 팝업을 통한 연동처리 여부, true 면 팝업 */
                loginButton: {color: "green", type: 3, height: 47} /* 로그인 버튼의 타입을 지정 */
            }
        );
        naverLogin.init();
    }

    useEffect(() => {
        NaverLogin()
    }, []);

    const ouSubmitEvent = (e) => {
        e.preventDefault();
        axios.get(`/login/login?uemail=${uemail}&upass=${upass}&saveemail=${saveemail}`)
            .then(res => {
                console.log(res.data)
                if (res.data!==0) {
                    alert("로그인 성공. 세션에 unum ")
                    sessionStorage.setItem("unum",`${res.data}`)
                } else {
                    alert("로그인 실패")
                }
            })
    }
    const [uemail, setUemail] = useState('');
    const [upass, setUpass] = useState('');
    const [saveemail, setSaveemail] = useState('');
    const navi = useNavigate();
    return (
        <div className={''} style={{width: '360px'}}>
            <div style={{textAlign: 'center'}}>
                <form onSubmit={ouSubmitEvent}>
                    <input type={'text'} required onChange={(e) => setUemail(e.target.value)} value={uemail}/><br/><br/>
                    <input type={'password'} required onChange={(e) => setUpass(e.target.value)}
                           value={upass}/><br/><br/>
                    <input type={'checkbox'} onClick={(e) => setSaveemail("true")}/>이메일저장<br/>
                    <button>로그인</button>
                </form>
                <div className={'grid-naver'} id={'naverIdLogin'} onClick={NaverLogin}>네이버로그인</div>
            </div>

        </div>
    );
}

// function Login (props) {
//     const { naver } = window;
//
//     const Login = () => {
//         Naver();
//         UserProfile();
//     }
//
//     useEffect(Login, []);
//
//     const Naver = () => {
//         const naverLogin = new naver.LoginWithNaverId({
//             clientId: "AmX1zvlO8VFKoSiQZoaz",
//             callbackUrl: "http://localhost:3000/",
//             isPopup: false,
//             loginButton: {color: "green", type: 1, height: 30} ,
//             //callbackHandle: true
//         });
//         naverLogin.init();
//     }
//
//     const UserProfile = () => {
//         window.location.href.includes('access_token') && GetUser();
//         function GetUser() {
//             const location = window.location.href.split('=')[1];
//             const token = location.split('&')[0];
//             console.log("token: ", token);
//             axios(`${API}/account/sign-in` , {
//                 method: "GET",
//                 headers : {
//                     "Content-type" : "application/json",
//                     "Authorization": token
//                 },
//             })
//                 .then(res => res.json())
//                 .then(res => {
//                     localStorage.setItem("access_token", res.token);
//                     setUserData({
//                         nickname : res.nickname,
//                         image : res.image
//                     })
//                 })
//                 .catch(err => console.log("err : ", err));
//         }
//     };
//
//     return (
//         <SideLogin className="login">
//             <UserInfo>
//                 <SideText>로그인</SideText>
//             </UserInfo>
//             <LoginLink onClick={Login} id="naverIdLogin" />
//         </SideLogin>
//     )
// };
export default Login;