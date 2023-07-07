import React, {Component} from 'react';
import Slider from "react-slick";
import "./Review.css";
import no from "../images/nooooo.jpg";



export default class SimpleSlider extends Component {
    render() {
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            swipeToSlide: true
        };


        return (
            <div className={'review_sliderwrap'}>
                <Slider {...settings}>
                    <div className={'review_slider'}>
                        <img className={'review_main'} alt={''} src={no}/>
                        <img className={'review_profile'} alt={''} src={no}/><span className={'review_writer'}>김똘똘</span>
                        <div className={'review_footer'}><div>빵빵골프장</div><div>하트이십억개</div></div>

                    </div>
                    <div className={'review_slider'}>
                        <img className={'review_main'} alt={''} src={no}/>
                        <img className={'review_profile'} alt={''} src={no}/><span className={'review_writer'}>김똘똘</span>
                        <div><div>빵빵골프장</div><div>하트이십억개</div></div>
                    </div>
                    <div className={'review_slider'}>
                        <img className={'review_main'} alt={''} src={no}/>
                        <img className={'review_profile'} alt={''} src={no}/><span className={'review_writer'}>김똘똘</span>
                        <div><div>빵빵골프장</div><div>하트이십억개</div></div>
                    </div>
                    <div className={'review_slider'}>
                        <img className={'review_main'} alt={''} src={no}/>
                        <img className={'review_profile'} alt={''} src={no}/><span className={'review_writer'}>김똘똘</span>
                        <div><div>빵빵골프장</div><div>하트이십억개</div></div>
                    </div>
                    <div className={'review_slider'}>
                        <img className={'review_main'} alt={''} src={no}/>
                        <img className={'review_profile'} alt={''} src={no}/><span className={'review_writer'}>김똘똘</span>
                        <div><div>빵빵골프장</div><div>하트이십억개</div></div>
                    </div>
                    <div className={'review_slider'}>
                        <img className={'review_main'} alt={''} src={no}/>
                        <img className={'review_profile'} alt={''} src={no}/><span className={'review_writer'}>김똘똘</span>
                        <div><div>빵빵골프장</div><div>하트이십억개</div></div>
                    </div>
                </Slider>
            </div>
        );
    }
}
