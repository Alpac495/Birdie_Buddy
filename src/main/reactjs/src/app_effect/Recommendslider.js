import React, {Component} from 'react';
import Slider from "react-slick";
import no from "../images/golf_place.jpg"
import user from "../images/default_golf.png";
import Axios from 'axios';
import { Link } from 'react-router-dom';




export default class SimpleSlider extends Component {
    

    constructor(props) {
        super(props);
        this.state = {
            joinReco: []
        };
    }

    componentDidMount() {
        Axios.get('/main/reco')
            .then(res => {
                // 서버에서 받아온 데이터로 상태 업데이트
                this.setState({ joinReco: res.data });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    
    render() {
        const { joinReco } = this.state; 
        const image1 = process.env.REACT_APP_IMAGE1PROFILE;
        const image2 = process.env.REACT_APP_IMAGE87;


        const settings = {
            infinite: true,
            speed: 1000,
            slidesToShow: 3,
            slidesToScroll: 1,
            swipeToSlide: true,
            autoplay:true,
            autoplaySpeed:3000,
        };

        return (
            <div className="test1">
            <Slider {...settings}>
              {joinReco.map((item, idx) => (
                <Link key={idx} to={`/joining/detail/${item.jnum}`} className="rec_slider">
                  {item.uphoto != null ? (
                    <img alt="프로필 사진" src={`${image1}${item.uphoto}${image2}`} />
                  ) : (
                    <img alt="프로필 사진" src={user} />
                  )}
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
                </Link>
              ))}
            </Slider>
          </div>
        );
    }
}
