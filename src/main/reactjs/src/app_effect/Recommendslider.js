import React, {Component} from 'react';
import Slider from "react-slick";
import no from "../images/nooooo.jpg"

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
                        <div>1</div>
                    </div>
                    <div>
                        <div>2</div>
                    </div>
                    <div>
                        <div>3</div>
                    </div>
                    <div>
                        <div>4</div>
                    </div>
                    <div>
                        <div>5</div>
                    </div>
                    <div>
                        <div>6</div>
                    </div>
                </Slider>
            </div>
        );
    }
}
