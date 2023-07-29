import React, {Component, useState} from 'react';
import Slider from "react-slick";
import no from "../images/nooooo.jpg"
import "./Bannerslider.css";

const totalSlides = 6; // 전체 슬라이드 수
export default class SimpleSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
        };
    }

    handleSlideChange = (current) => {
        this.setState({ currentPage: current });
    };

    render() {
        const { currentPage } = this.state;

        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay:true,
            autoplaySpeed:1000,
            afterChange: this.handleSlideChange,
            prevArrow: null, // 이전 화살표를 감춥니다.
            nextArrow: null, // 다음 화살표를 감춥니다.
        };

        return (
            <div>

                <Slider {...settings}>
                    <div>
                        <img alt={''} src={no}/>
                    </div>
                    <div>
                        <img alt={''} src={no}/>
                    </div>
                    <div>
                        <img alt={''} src={no}/>
                    </div>
                    <div>
                        <img alt={''} src={no}/>
                    </div>
                    <div>
                        <img alt={''} src={no}/>
                    </div>
                    <div>
                        <img alt={''} src={no}/>
                    </div>
                </Slider>
                <div className="current-page-indicator">
                    {currentPage + 1} / {totalSlides}
                </div>
            </div>
        );
    }
}
