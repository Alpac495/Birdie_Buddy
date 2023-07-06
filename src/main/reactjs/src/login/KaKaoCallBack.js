import { useEffect } from "react";
import axios from "axios"

const KakaoCallback = () => {
    useEffect(() => {
        const params= new URL(document.location.toString()).searchParams;
        const code = params.get('code');
        const grantType = "authorization_code";
        const REST_API_KEY = "e1c40d8c3604fc88b3261a8776aa4d52";
        const REDIRECT_URI = "http://localhost:3000/login/kcallback";

        axios.post(
            `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
            {},
            { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } }
        )
            .then((res: any) => {
                console.log(res);
                const { access_token } = res.data;
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
                    .then((res: any) => {
                        console.log('2번쨰', res);
                        // const uemail = res.data.kakao_account.email;
                        // const uemail = res.data.kakao_account.email;
                        // const uemail = res.data.kakao_account.email;
                        // const uemail = res.data.kakao_account.email;
                        //axios.post("/login/sign",)
                    })
            })
            .catch((Error: any) => {
                console.log(Error)
            })
    }, [])

    return(
        <>
        </>
    )
}
export default KakaoCallback;