import React from 'react';
import "./App.css";
import "./Main.css";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ScreenSize from "./app_effect/ScreenSize";
import Recommendslider from "./app_effect/Recommendslider";
import Reviewslider from "./app_effect/Reviewslider";

function Main(props) {

    return (
        <div>
            <ScreenSize/>
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
            <div className={'main_join'}>
                <div>당신을 위한 조인 추천</div>
                <div className={'main_joinreco'}>
                    <Recommendslider/>
                </div>
            </div>
            <div className={'main_reviewwrap'}>
                <div>후기</div>
                <div className={'main_review'}>
                    <Reviewslider/>
                </div>
            </div>
        </div>
    );
}

export default Main;