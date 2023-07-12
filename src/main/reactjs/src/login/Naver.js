import React, {useEffect} from 'react';
import naverbtn from '../image/naver_btn.png'
import './Login.css';

function Naver(props) {
    useEffect(() => {
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: 'AmX1zvlO8VFKoSiQZoaz',
            callbackUrl: 'http://localhost:3000/login/ncallback',
            isPopup: false,
            loginButton: {color: 'green', type: 3, height: 40},
        });
        naverLogin.init();
    }, []);

    const handleNaverLogin =()=> {
            if (document &&
                document?.querySelector("#naverIdLogin")?.firstChild &&
                window !== undefined) {
                const loginBtn = document.getElementById("naverIdLogin")?.firstChild;
                loginBtn.click();
            }
        }

    return (
        <div>
            <div id="naverIdLogin" style={{display:'none'}}></div>
            <img src={naverbtn} className={'naverbtn'} alt={''} onClick={handleNaverLogin}/>
        </div>
    );
}

export default Naver;
