import React from 'react';

import "./Main.css";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Recommendslider from "./app_effect/Recommendslider";
import Reviewslider from "./app_effect/Reviewslider";
import Bannerslider from "./app_effect/BannerSlider";
import Footer from "./footer/Footer";
import Header from "./header/Header";





function Main(props) {
    return (
        <div className={'mainpage'}>

            <div>
                <Header/>
            </div>

            <div className={'main_banner'}>
                <Bannerslider/>
            </div>
            <div className={'main_btnwrap'}>
                <div className={'main_bgbtn'}>
                    <button className="mainbutton_child">조인</button>
                </div>
                <div className={'main_smbtn'}>

                        <button className="mainbutton_item">친구</button>

                        <button className="mainbutton_item">예약</button>

                </div>
            </div>
            <hr style={{height:'3px', backgroundColor:'lightgray'}}/>
            <div className={'main_join'}>
                <div className={'main_joinrecotxt'}>당신을 위한 조인 추천</div>
                <div className={'main_joinreco'}>
                    <Recommendslider/>
                </div>
            </div>
            <hr style={{height:'3px', backgroundColor:'lightgray', marginTop:'50px'}}/>
            <div className={'main_reviewwrap'}>
                <div className={'main_reviewtxt'}>Best 후기</div>
                <Reviewslider/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>

    );
}

export default Main;