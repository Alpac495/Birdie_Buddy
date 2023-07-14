import React, { Component } from 'react';
import Slider from 'react-slick';
import "./NoticeSlider.css";


export default class SimpleSlider extends Component {
    render() {
        const settings = {
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            vertical: true, // 수직 슬라이드로 설정
        };
        return (
            <div className="notice_slider">
                <Slider {...settings}>
                    <div>스타크래프트 1.16.1 다운로드</div>
                    <div>워크래프트3 1.16.1 다운로드</div>
                    <div>에이지오브미쏠로지 1.16.1 다운로드</div>
                    <div>라이즈오브네이션즈 1.16.1 다운로드</div>
                    <div>라이즈오브레전드 1.16.1 다운로드</div>
                </Slider>
            </div>
        );
    }
}