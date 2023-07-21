import React, {Component} from 'react';
import Slider from "react-slick";
import no from "../images/golf_place.jpg"
import Axios from 'axios';


export default class SimpleSlider extends Component {

    /*componentDidMount() {
        Axios.get('/api/data') // 예시로 '/api/data' 경로에 GET 요청을 보냅니다.
            .then(response => {
                // 응답 데이터를 처리합니다.
                console.log(response.data);
            })
    }*/
    
    render() {



        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            swipeToSlide: true,
            autoplay:true,
            autoplaySpeed:3000,
        };

        return (
            <div className={'test1'}>
                <Slider {...settings}>
                    <div className={'rec_slider'}>
                        <img alt={''} src={no}/>
                        <div className="rec_info">
                            <span className="b">{`07.02(월) `}</span><br/>
                            <span className="xx">필리핀 세부 XX클럽</span><br/>
                            <span className="xx">그린피 0원</span><br/>
                            <span className="xx">2명 모집</span>
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
