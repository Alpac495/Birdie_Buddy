import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './FriendSlider.css';
import AddIcon from '@mui/icons-material/Add';
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import profile120 from "../image/profile90x120.png";

const SimpleSlider = () => {
    const [unum, setUnum] = useState(0);
    const image1 = process.env.REACT_APP_IMAGE1PROFILE;
    const image2 = process.env.REACT_APP_IMAGE87;
    const [data,setData]=useState('');
    const [fdata,setFdata]=useState('');
    const navi = useNavigate();
    
    const unumchk=()=>{
        Axios.get("/apilogin/unumChk")
        .then(res=> {
            setUnum(res.data);
            const url="/apifriend/recommandfriend?unum="+res.data;
            Axios.get(url)
            .then(res=>{
                setData(res.data);
            })
            const url2=`/apifriend/list?unum=`+res.data;
            Axios.get(url2)
            .then(res=>{
                setFdata(res.data);
            })
        })}

    useEffect(() => {
        unumchk();
    }, []);

    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const onClickFriend = (item) => {
        if (unum === 0) {
            navi("/");
        } else {
            navi(`/friend/detail/${item.unum}`);
        }
    }

    return (
        <div className="friend_slider">
            <Slider {...settings}>
                {data.map &&
                    data.map((item, idx) =>
                        Array.isArray(fdata) && fdata.some((fitem) => fitem.funum === item.unum) ? null : (
                            <div key={idx} className={'friend_slide'}>
                                {item.uphoto != null ? (
                                    <img alt='프로필 사진' src={`${image1}${item.uphoto}${image2}`} />
                                ) : (
                                    <img alt='프로필 사진' src={`${profile120}`} />
                                )}
                                <div className="FDMoveLink" onClick={() => onClickFriend(item)}>
                                    <div className='FDBack'></div>
                                    <div className={`friend_modal`}></div>
                                    <div className={'friend_plus'}><AddIcon /></div>
                                    <div className={'friend_footer'}>
                                        <div>{item.unickname}</div>
                                        <div># {item.rtasu != 0 ? `${item.rtasu} 타` : '기록없음'}</div>
                                        <div># 경력{item.ucareer}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
            </Slider>
        </div>
    );
}

export default SimpleSlider;