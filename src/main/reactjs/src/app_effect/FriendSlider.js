import React, { Component } from 'react';
import Slider from 'react-slick';
import no from '../images/person1.jpg';
import './FriendSlider.css';
import AddIcon from '@mui/icons-material/Add';

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
                                <div className={`friend_modal`}></div>
                                <div className={'friend_plus'}><AddIcon/></div>
                                <div className={'friend_footer'}>
                                    <div>#1.16타 #1년</div>
                                    <div>박복자</div>
                                </div>
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