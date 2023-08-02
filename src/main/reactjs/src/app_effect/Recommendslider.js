import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import Axios from 'axios';
import { Link,useNavigate  } from 'react-router-dom';

const SimpleSlider = () => {
    const [joinReco, setJoinReco] = useState([]);
    const image1 = process.env.REACT_APP_IMAGE1PROFILE;
    const image2 = process.env.REACT_APP_IMAGE87;
    const user = process.env.REACT_APP_MAIN;
    const navi = useNavigate();
    const [unum, setUnum] = useState('0');
    useEffect(() => {
        Axios.get('/apimain/reco')
            .then(res => {
                setJoinReco(res.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
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
    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    const onClickJoinReco = (item) => {
        if (unum === 0) {
            navi("/");
        } else {
            navi(`/joining/detail/${item.jnum}`);
        }
    }
    return (
        <div className="test1">
            <Slider {...settings}>
                {joinReco.map((item, idx) => (
                    <div key={idx} className="rec_slider" onClick={() => onClickJoinReco(item)}>
                        <div>
                        {item.uphoto != null ? (
                            <img alt="프로필 사진" src={`${image1}${item.uphoto}${image2}`} />
                        ) : (
                            <img alt="프로필 사진" src={`${user}profile3.png`} />
                        )}
                        </div>
                        <div className="rec_info">
                            <span className="b">{item.jjoinday}</span>
                            <br />
                            <span className="xx">
                                {item.gname.length > 10
                                    ? item.gname.substring(0, 10) + '...'
                                    : item.gname}
                            </span>
                            <br />
                            <span className="xx">그린피 {item.jprice} 원</span>
                            <br />
                            {4 - item.jmcount - item.jucount === 0 ? null : (
                                <span className="xx">{`${4 - item.jmcount - item.jucount} 자리`}</span>
                            )}
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default SimpleSlider;