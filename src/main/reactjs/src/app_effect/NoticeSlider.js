import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "./NoticeSlider.css";
import Axios from 'axios';

const SimpleSlider = () => {
    const [noticeList, setNoticeList] = useState([]);
    const navi = useNavigate();
    const [unum, setUnum]=useState('');

    useEffect(() => {
        Axios.get('/main/notice')
            .then(res => {
                setNoticeList(res.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        vertical: true,
    };
    const unumchk=()=>{
        Axios.get("/login/unumChk")
            .then(res=> {
                setUnum(res.data);
            });
    }
    // 초기 로딩 시에 unumchk 함수 호출
    useEffect(() => {
        unumchk()
    }, [])
    const onClickNotice = (item) => {
        if (unum === 0) {
            navi("/");
        } else {
            navi(`/admin/noticeDetail/${item.nnum}`);
        }
    }
    return (
        <div className="notice_slider">
            <Slider {...settings}>
                {noticeList.map((item, idx) => (
                    item.ncate === '공지사항' ? (
                        <div key={idx} className="noticeList_go" onClick={() => onClickNotice(item)}>
                            {item.nsubject}
                        </div>
                    ) : null
                ))}
            </Slider>
        </div>
    );
}

export default SimpleSlider;
