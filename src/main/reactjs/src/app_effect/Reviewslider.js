import React, { useState } from 'react';
import Slider from 'react-slick';
import no from '../images/golf_hugi.jpg';
import "./Review.css";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import Axios from 'axios';
import user from "../images/default_golf.png";

const SimpleSlider = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [reviewList, setReviewList]=useState([]);
    const image1 = process.env.REACT_APP_IMAGE1PROFILE;
    const image2 = process.env.REACT_APP_IMAGE87;

    const handleTouchStart = () => {
        setIsClicked(true);
    };

    const handleClickClose = () => {
        setIsClicked(false);
    };

    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    Axios.get("/main/hugi")
    .then(res=>(
        setReviewList(res.data)
        
    ))

    return (
        <div className="reivew_slider">
            <Slider {...settings}>
                {
                    reviewList.map((item,idx)=>(
                        <div className={'review_slide'}>
                        {isClicked && (
                            <div onClick={handleClickClose}>
                                <div className={`review_modal`}>
                                {item.hphoto != null ? (
                                <img className='review_profile' alt='프로필 사진' src={`${image1}${item.hphoto}${image2}`} />
                            ) : (
                                <img className='review_profile' alt='프로필 사진' src={user} />  
                            )}
                                    
                                    <span className={'review_writer'}>{item.unickname}</span>
                                    <div className={'review_footer'}><FavoriteOutlinedIcon/> {item.hlike}</div>
                                </div>
                            </div>
                        )}
                    </div>
                    ))
                }
               
            </Slider>
        </div>
    );
};

export default SimpleSlider;