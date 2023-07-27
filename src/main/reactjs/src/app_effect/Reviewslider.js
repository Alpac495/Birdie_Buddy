import React, {Component, useState} from 'react';
import Slider from 'react-slick';
import "./Review.css";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import Axios from 'axios';
import de_hugi from "../images/default_hugi.png";
import user from "../images/default_golf.png"

export default class SimpleSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reviewList : [],
            isClickedList: [],
        };
    }

    componentDidMount() {
        Axios.get('/main/hugi')
            .then(res => {
                // 서버에서 받아온 데이터로 상태 업데이트
                this.setState({ reviewList: res.data });
                // 각 항목의 클릭 여부를 초기화
                this.setState({ isClickedList: new Array(res.data.length).fill(false) });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    handleTouchStart = (idx) => {
        const { isClickedList } = this.state;
        const updatedIsClickedList = [...isClickedList];
        updatedIsClickedList[idx] = true;
        this.setState({ isClickedList: updatedIsClickedList });
    };

    handleClickClose = (idx) => {
        const { isClickedList } = this.state;
        const updatedIsClickedList = [...isClickedList];
        updatedIsClickedList[idx] = false;
        this.setState({ isClickedList: updatedIsClickedList });
    };

    render() {
        const { reviewList, isClickedList } = this.state;
        const image1 = process.env.REACT_APP_IMAGE1PROFILE;
        const image2 = process.env.REACT_APP_IMAGE87;
        const hugipic = process.env.REACT_APP_HUGI;
        


        const settings = {
            infinite: true,
            speed: 1000,
            slidesToShow: 2,
            slidesToScroll: 1,
            swipeToSlide: true,
            autoplay: true,
            autoplaySpeed: 3000,
            prevArrow: null, // 이전 화살표를 감춥니다.
            nextArrow: null, // 다음 화살표를 감춥니다.
        };

        return (
            <div className="reivew_slider">
                <Slider {...settings}>
                    {
                        reviewList.map((item, idx) => (
                            <div key={idx} className={'review_slide'}>


                                {item.hphoto !== '' ? (
                                <img className={'review_img'} alt="프로필 사진" src={`${hugipic}${item.hphoto}`} onClick={() => this.handleTouchStart(idx)} />
                            ) : (
                                <img className={'review_img'} alt="프로필 사진" src={de_hugi} onClick={() => this.handleTouchStart(idx)} />
                            )}

                               
                                {isClickedList[idx] && (
                                    <div onClick={() => this.handleClickClose(idx)}> {/* 클릭 핸들러 수정 */}
                                        <div className={`review_modal`}>
                                            {item.uphoto != null ? (
                                            <img className={'review_profile'} alt="프로필 사진" src={`${image1}${item.uphoto}${image2}`} />
                                            ) : (
                                            <img className={'review_profile'} alt="프로필 사진" src={user} />
                                            )}
                                            <span className={'review_writer'}>{item.unickname}</span>
                                            <div className={'review_footer'}><FavoriteOutlinedIcon /> {item.hlike}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    }
                </Slider>
            </div>
        );
    }
}