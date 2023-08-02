import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "./Bannerslider.css";
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const totalSlides = 5; // 전체 슬라이드 수

export default function SimpleSlider() {
    const [currentPage, setCurrentPage] = useState(0);
    const [bannerList, setBannerList] = useState([]);
    const navi = useNavigate();
    const [unum, setUnum]=useState('');
    const unumchk=()=>{
        Axios.get("/apilogin/unumChk")
            .then(res=> {
                setUnum(res.data);
            });
    }
    // 초기 로딩 시에 unumchk 함수 호출
    useEffect(() => {
        unumchk()
    }, [])

    useEffect(() => {
        Axios.get('/apimain/notice')
            .then(res => {
                setBannerList(res.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleSlideChange = (current) => {
        setCurrentPage(current);
    };

    const onClickBanner = (item) => {
        if (item.ncate === '이벤트') {
            if (unum === 0) {
                navi("/");
            } else {
                navi(`/admin/noticeDetail/${item.nnum}`);
            }
        }
    }

    const banners = process.env.REACT_APP_NOTICE;

    const settings = {
        infinite: true,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        afterChange: handleSlideChange,
        prevArrow: null, // 이전 화살표를 감춥니다.
        nextArrow: null, // 다음 화살표를 감춥니다.
    };

    return (
        <div>
            <Slider {...settings}>
                {bannerList
                    .filter(item => item.ncate === '이벤트') // '이벤트' 항목만 필터링
                    .slice(0, 5) // 처음 5개 항목만 자름
                    .map((item, idx) => (
                        <div key={idx} onClick={() => onClickBanner(item)}>
                            <img className='banner_size' alt={''} src={`${banners}${item.nphoto}`} />
                        </div>
                    ))}
            </Slider>
            <div className="current-page-indicator">
                {currentPage + 1} / {totalSlides}
            </div>
        </div>
    );
}