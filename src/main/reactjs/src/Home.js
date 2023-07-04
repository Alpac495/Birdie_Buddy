import React, {useState} from 'react';
import "./App.css";
import "./Home.css";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Axios from "axios";
import {Login, Sign} from "./login";
import {NavLink} from "react-router-dom";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ScreenSize from "./app_effect/ScreenSize";
import Recommendslider from "./app_effect/Recommendslider";
import Reviewslider from "./app_effect/Reviewslider";





function Home(props) {
    const [photo, setPhoto]=useState('');
    const photourl = `${process.env.REACT_APP_BOARDURL}`

    const onUploadEvent = (e) => {
        const uploadFile=new FormData();
        uploadFile.append("upload",e.target.files[0]);
        Axios({
            method:'post',
            url:'/upload',
            data:uploadFile,
            headers:{'Content-Type':'multipart/form-data'}
        }).then(res=>{
            setPhoto(res.data);
        })
    }



    return (
        <div className="homeBg">
            <ScreenSize/>
            <h2>여기는 몰루입니다.</h2>
            <input type='file' onChange={onUploadEvent}/>


            <img style={{width:'300px'}} alt={'testimg'} src={`${photourl}${photo}`} />
            <img style={{width:'300px'}} alt={'test2img'} src={`http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy/${photo}`} />


            <ul> Chat
                <li>
                    <NavLink to={''}></NavLink>
                </li>
            </ul>

            <ul> friend
                <li>
                    <NavLink to={''}></NavLink>
                </li>
            </ul>

            <ul> hugi
                <li>
                    <NavLink to={''}></NavLink>
                </li>
            </ul>

            <ul> joining
                <li>
                    <NavLink to={''}></NavLink>
                </li>
            </ul>

            <ul>
                Login
                <li>
                    <NavLink to={"/login/login"}>로그인</NavLink>
                </li>
                <li>
                    <NavLink to={"/login/sign"}>회원가입</NavLink>
                </li>
            </ul>

            <ul> mypage
                <li>
                    <NavLink to={''}></NavLink>
                </li>
            </ul>

            <ul> score
                <li>
                    <NavLink to={''}></NavLink>
                </li>
            </ul>


            <br/>
            <br/>
            <button type='button' className={'btn_long'}>긴버튼</button>
            <br/>
            <br/>
            <button type='button' className={'btn_mid'}>중버튼</button>
            <br/>
            <br/>
            <button type='button' className={'btn_short'}>소버튼</button>
            <br/>
            <br/>
            <br/>
            <br/><br/>
            <br/><br/>
            <br/>


            <hr/>


            <div className={'main_headwrap'}>
                <div className={'main_logo'}>BirdieBuddy</div>
                <div className={'main_menu'}> <NotificationsNoneOutlinedIcon/> <img alt={'imsi'} src={''}/></div>
            </div>
            <div className={'main_banner'}>
                <img alt={''} src={''}/>
            </div>
            <div className={'main_gobtn'}>
                <div className={'main_btnwrap'}>
                    <div className={'main_bgbtn'}>
                        <button type={'button'}>임시</button>
                    </div>
                    <div className={'main_smbtn'}>
                        <div><button type={'button'}>임시</button></div>
                        <div><button type={'button'}>임시</button></div>
                    </div>
                </div>
            </div>
            <div>당신을 위한 조인 추천</div>
            <div className={'main_joinreco'}>
                <Recommendslider/>
            </div>
            <div>후기</div>
            <div className={'main_review'}>
                <Reviewslider/>
            </div>

        </div>
    );
}

export default Home;