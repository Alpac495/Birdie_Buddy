import React, {Component, useState} from 'react';
import Slider from "react-slick";
import "./Bannerslider.css";
import Axios  from 'axios';
import { Link } from 'react-router-dom';

const totalSlides = 6; // 전체 슬라이드 수
export default class SimpleSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            bannerList:[],
        };
    }

    componentDidMount() {
        Axios.get('/main/notice')
            .then(res => {
                // 서버에서 받아온 데이터로 상태 업데이트
                this.setState({ bannerList: res.data });
                
                
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    handleSlideChange = (current) => {
        this.setState({ currentPage: current });
    };

    render() {
        const { currentPage } = this.state;
        const { bannerList } = this.state;
        const banners = process.env.REACT_APP_NOTICE;

        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay:true,
            autoplaySpeed:3000,
            afterChange: this.handleSlideChange,
            prevArrow: null, // 이전 화살표를 감춥니다.
            nextArrow: null, // 다음 화살표를 감춥니다.
        };

        return (
            <div>

                <Slider {...settings}>
                    {
                    
                    bannerList.map((item, idx) => (
                        item.ncate === '이벤트' ? (
                        <Link className='noticeList_go' key={idx} to={`/admin/noticeDetail/${item.nnum}`}>
                            <div key={idx}>
                                <img className='banner_size' alt={''} src={`${banners}${item.nphoto}`}/>
                            </div>
                        </Link>
                        ) : null
                    ))
                    }
                   
                </Slider>
                <div className="current-page-indicator">
                    {currentPage + 1} / {totalSlides}
                </div>
            </div>
        );
    }
}
