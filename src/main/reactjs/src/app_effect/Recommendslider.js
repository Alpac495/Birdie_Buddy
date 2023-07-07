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
            <div className={'test1'}>
                <Slider {...settings}>
                    <div className={'rec_slider'}>
                        <img alt={''} src={no}/>
                        <b className="b">{`07.02(월) `}</b>
                        <div className="xx-0-container">
                            <p className="xx">필리핀 세부 XX클럽</p>
                            <p className="xx">그린피 0원</p>
                            <p className="xx">2명 모집</p>
                            <p className="xx">{` `}</p>
                        </div>
                    </div>
                    <div className={'rec_slider'}>
                        <img alt={''} src={no}/>
                        <span>2</span>
                    </div>
                    <div className={'rec_slider'}>
                        <img alt={''} src={no}/>
                        <span>3</span>
                    </div>
                    <div className={'rec_slider'}>
                        <img alt={''} src={no}/>
                        <span>4</span>
                    </div>
                    <div className={'rec_slider'}>
                        <img alt={''} src={no}/>
                        <span>5</span>
                    </div>
                    <div className={'rec_slider'}>
                        <img alt={''} src={no}/>
                        <span>6</span>
                    </div>
                </Slider>
            </div>
        );
    }
}
