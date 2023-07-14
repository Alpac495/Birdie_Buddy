import React, { Component } from 'react';
import Slider from 'react-slick';
import no from '../images/person1.jpg';
import './FriendSlider.css';
import CloseIcon from '@mui/icons-material/Close';

export default class SimpleSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
        };
    }

    handleTouchStart = () => {
        this.setState({ isClicked: true });
    };

    handleClickClose = () => {
        this.setState({ isClicked: false });
    };

    render() {
        const { isClicked } = this.state;

        const settings = {
            infinite: true,
            speed: 1000,
            slidesToShow: 3,
            slidesToScroll: 1,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 3000,
        };

        return (
            <div className="friend_slider">
                <Slider {...settings}>
                    <div className={'friend_slide'}>
                        <img onClick={this.handleTouchStart} alt={''} src={no} />
                        {isClicked && (
                            <div onClick={this.handleClickClose}>
                                <div className={`friend_modal`}></div>
                            </div>
                        )}
                    </div>
                    <div className="friend_slide">
                        <img alt={''} src={no} />
                    </div>
                    <div className="friend_slide">
                        <img alt={''} src={no} />
                    </div>
                    <div className="friend_slide">
                        <img alt={''} src={no} />
                    </div>
                    <div className="friend_slide">
                        <img alt={''} src={no} />
                    </div>
                    <div className="friend_slide">
                        <img alt={''} src={no} />
                    </div>
                </Slider>
            </div>
        );
    }
}