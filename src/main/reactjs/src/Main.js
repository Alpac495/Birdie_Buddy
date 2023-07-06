import React from 'react';
import "./App.css";
import "./Main.css";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Recommendslider from "./app_effect/Recommendslider";
import Reviewslider from "./app_effect/Reviewslider";
import Bannerslider from "./app_effect/BannerSlider";
import no from "./images/nooooo.jpg";
import Footer from "./footer/Footer";
import Header from "./header/Header";





function Main(props) {
    return (
        <div>
            <div>
                <Header/>
            </div>
            <div className={'main_banner'}>
                <Bannerslider/>
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
                <div className={'main_joinrecotxt'}>당신을 위한 조인 추천</div>
                <div className={'main_joinreco'}>
                    <Recommendslider/>
                </div>
            </div>
            <div className={'main_reviewwrap'}>
                <div className={'main_reviewtxt'}>후기</div>
                <div className={'main_review'}>
                    <Reviewslider/>
                </div>
            </div>
            <div>
                <Footer/>
            </div>
        </div>

    );
}

export default Main;