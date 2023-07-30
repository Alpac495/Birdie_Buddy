import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "./NoticeSlider.css";
import Axios  from 'axios';


export default class SimpleSlider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noticeList: []
        };
    }

    componentDidMount() {
        Axios.get('/main/notice')
            .then(res => {
                // 서버에서 받아온 데이터로 상태 업데이트
                this.setState({ noticeList: res.data });
                console.log(res.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    render() {
        const {noticeList} = this.state;

        const settings = {
            infinite: true,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            vertical: true, // 수직 슬라이드로 설정
        };
        return (
            <div className="notice_slider">
                <Slider {...settings}>
                    {
                        noticeList.map((item, idx)=>(
                            <Link className='noticeList_go' key={idx} to={`/admin/noticeDetail/${item.nnum}`}>
                                <div key={idx}>{item.nsubject}</div>
                            </Link>
                        ))
                    }
                </Slider>
            </div>
        );
    }
}