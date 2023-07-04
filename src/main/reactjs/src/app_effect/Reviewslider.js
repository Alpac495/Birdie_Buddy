import React, {Component} from 'react';
import Slider from "react-slick";
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
            <div>
                <Slider {...settings}>
                    <div>
                        <img style={{width:'100px'}} alt={''} src={no}/>
                    </div>
                    <div>
                        <img style={{width:'100px'}} alt={''} src={no}/>
                    </div>
                    <div>
                        <img style={{width:'100px'}} alt={''} src={no}/>
                    </div>
                    <div>
                        <img style={{width:'100px'}} alt={''} src={no}/>
                    </div>
                    <div>
                        <img style={{width:'100px'}} alt={''} src={no}/>
                    </div>
                    <div>
                        <img style={{width:'100px'}} alt={''} src={no}/>
                    </div>
                </Slider>
            </div>
        );
    }
}
