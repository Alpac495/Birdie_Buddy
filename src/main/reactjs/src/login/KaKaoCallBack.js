import {useEffect} from "react";
import axios from "axios"
import {useNavigate} from "react-router-dom";

const KakaoCallback = () => {

    const navi = useNavigate();


    useEffect(() => {
        const params = new URL(document.location.toString()).searchParams;
        const code = params.get('code');
        const grantType = "authorization_code";
        const REST_API_KEY = "e1c40d8c3604fc88b3261a8776aa4d52";
        // const REDIRECT_URI = "http://localhost:3000/login/kcallback";
        const REDIRECT_URI = "http://http://223.130.137.128/login/kcallback";


        axios.post(
            `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
            {},
            {headers: {"Content-type": "application/x-www-form-urlencoded;charset=utf-8"}}
        )
            .then((res) => {
                console.log(res);
                const {access_token} = res.data;
                axios.post(
                    `https://kapi.kakao.com/v2/user/me`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                        }
                    }
                )
                    .then((res) => {
                        const {kakao_account} = res.data;
                        if (kakao_account.profile.nickname) {
                            console.log('전체', res.data);
                            console.log('이메일' + kakao_account.email);
                            console.log('성별' + kakao_account.gender);
                            console.log('닉네임' + kakao_account.profile.nickname);
                            axios.get(`/apilogin/signchk?uemail=${kakao_account.email}`)
                                .then(res => {
                                    if (res.data == 0) { //회원가입해야함
                                        console.log("email:" + kakao_account.email);
                                        navi("/login/sign", {
                                            state: {
                                                uemail: kakao_account.email,
                                                unickname: kakao_account.profile.nickname,
                                                ugender: kakao_account.gender == "male" ? "남" : "여"
                                            }
                                        })
                                    } else {
                                        axios.get('/apilogin/socialLogin?unum=' + res.data)
                                            .then((res => {
                                                navi("/")
                                            }))
                                    }
                                })
                        }
                    })
            })
            .catch((Error) => {
                console.log(Error)
            })
    }, [])

    return (
        <div>
            kakaocall
        </div>
    )
}
export default KakaoCallback;