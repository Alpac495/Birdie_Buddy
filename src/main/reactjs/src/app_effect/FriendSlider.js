import React, {Component} from 'react';
import Slider from "react-slick";
import no from "../images/nooooo.jpg"
import "./FriendSlider.css";


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
            slidesToShow: 4,
            slidesToScroll: 4,
            autoplay:true,
            autoplaySpeed:3000
        };

        return (
            <div className={'friend_slider'}>
                <Slider {...settings}>
                    <div className={'friend_slide'}>
                        <img alt={''} src={no}/>
                    </div>
                    <div className={'friend_slide'}>
                        <img alt={''} src={no}/>
                    </div>
                    <div className={'friend_slide'}>
                        <img alt={''} src={no}/>
                    </div>
                    <div className={'friend_slide'}>
                        <img alt={''} src={no}/>
                    </div>
                    <div className={'friend_slide'}>
                        <img alt={''} src={no}/>
                    </div>
                    <div className={'friend_slide'}>
                        <img alt={''} src={no}/>
                    </div>
                </Slider>
            </div>
        );
    }
}
