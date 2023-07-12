import React from 'react';

import "./Main.css";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Recommendslider from "./app_effect/Recommendslider";
import Reviewslider from "./app_effect/Reviewslider";
import Bannerslider from "./app_effect/BannerSlider";
import FriendSlider from "./app_effect/FriendSlider";
import Footer from "./footer/Footer";
import Header from "./header/Header";





function Main(props) {
    return (
        <div className={'mainpage'}>
            <Header/>


            <div className={'main_banner'}>
                <Bannerslider/>
            </div>



            <hr style={{height:'3px', backgroundColor:'lightgray'}}/>
            <div className={'main_friendtxt'} style={{marginLeft:'12px'}}>
                친구 추천
            </div>
            <div style={{width:'100vw',overflow:'hidden'}}>
                <div className={'main_friendrec'} style={{marginTop:'10px'}} >
                    <FriendSlider/>
                </div>
            </div>

            <hr style={{height:'3px', backgroundColor:'lightgray'}}/>
            <div style={{width:'100vw',overflow:'hidden'}}>
                <div className={'main_join'}>
                    <div className={'main_joinrecotxt'}>당신을 위한 조인 추천</div>
                    <div className={'main_joinreco'}>
                        <Recommendslider/>
                    </div>
                </div>
            </div>
            <hr style={{height:'3px', backgroundColor:'lightgray'}}/>
            <div style={{width:'100vw',overflow:'hidden'}}>
                <div className={'main_reviewwrap'}>
                    <div className={'main_reviewtxt'}>Best 후기</div>
                    <Reviewslider/>
                </div>

                <hr style={{height:'3px', backgroundColor:'lightgray', marginTop:'50px'}}/>


            </div>
                <Footer/>
        </div>

    );
}

export default Main;