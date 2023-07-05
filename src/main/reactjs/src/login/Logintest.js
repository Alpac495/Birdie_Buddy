import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useLocation} from "react-router-dom";

function Logintest(props) {
    const {naver} = window
    const naverLogin = new naver.LoginWithNaverId();

    const [user, setUser] = useState(null);

    const getUser = async () => {
        await naverLogin.getLoginStatus((status) => {
            console.log(`로그인?: ${status}`);
            if (status) {
                setUser({ ...naverLogin.user });
            }
        });
    };


    const location = useLocation();

    const getNaverToken = () => {
        if (!location.hash) return;
        const token = location.hash.split('=')[1].split('&')[0];
        console.log(token);
        }



    useEffect(() => {
        getNaverToken();
        getUser();
    }, []);

    return (
        <div>
            test
        </div>
    );
}

export default Logintest;