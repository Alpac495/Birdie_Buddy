import React, {Component} from 'react';
import Slider from "react-slick";
import no from "../images/nooooo.jpg"


export default class SimpleSlider extends Component {
    render() {
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay:true,
            autoplaySpeed:3000
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
            </div>
        );
    }
}
