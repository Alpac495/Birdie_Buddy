import React, {useEffect} from 'react';
import './Login.css';
import nbtn from '../image/naverbtn.png';

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
            <img src={nbtn} alt={''} className={'naverbtn'} onClick={handleNaverLogin}/>
        </div>
    );
}

export default Naver;
