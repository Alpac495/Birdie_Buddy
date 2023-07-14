import React, { Component } from 'react';
import Slider from 'react-slick';
import no from '../images/nooooo.jpg';
import "./Review.css";
import CloseIcon from '@mui/icons-material/Close';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

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
            slidesToShow: 2,
            slidesToScroll: 1,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 3000,
        };

        return (
            <div className="reivew_slider">
                <Slider {...settings}>
                    <div className={'review_slide'}>
                        <img className={'review_img'} onClick={this.handleTouchStart} alt={''} src={no} />
                        {isClicked && (
                            <div onClick={this.handleClickClose}>
                                <div className={`review_modal`}>
                                    <img className={'review_profile'} alt={''} src={no}/><span className={'review_writer'}>김똘똘</span>
                                    <div className={'review_footer'}><FavoriteOutlinedIcon/> 100</div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="review_slide">
                        <img className={'review_img'} alt={''} src={no} />
                    </div>
                    <div className="review_slide">
                        <img className={'review_img'} alt={''} src={no} />
                    </div>
                    <div className="review_slide">
                        <img className={'review_img'} alt={''} src={no} />
                    </div>
                    <div className="review_slide">
                        <img className={'review_img'} alt={''} src={no} />
                    </div>
                    <div className="review_slide">
                        <img className={'review_img'} alt={''} src={no} />
                    </div>
                </Slider>
            </div>
        );
    }
}