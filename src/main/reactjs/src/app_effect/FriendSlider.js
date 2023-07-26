import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import no from '../images/person1.jpg';
import user from "../images/default_golf.png";
import './FriendSlider.css';
import AddIcon from '@mui/icons-material/Add';
import Axios from 'axios';

const SimpleSlider = () => {
    const [friendReco, setFriendReco] = useState([]);
    const [unum, setUnum] = useState(0);
    const image1 = process.env.REACT_APP_IMAGE1PROFILE;
    const image2 = process.env.REACT_APP_IMAGE87;

    useEffect(() => {
        unumchk();
        Axios.get('/main/combine?unum=' + unum)
            .then(res => {
                setFriendReco(res.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [unum]);

  

    const unumchk = () => {
        Axios.get("/login/unumChk?unum=" + unum)
            .then(res => {
                setUnum(res.data);

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    
    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="friend_slider">
            
            <Slider {...settings}>
            {
                friendReco.map((item, idx)=>(
                    <div key={idx} className={'friend_slide'}>
                    {item.uphoto != null ? (
                                <img alt='프로필 사진' src={`${image1}${item.uphoto}${image2}`} />
                            ) : (
                                <img alt='프로필 사진' src={user} />  
                            )}
                    <div className={`friend_modal`}></div>
                    <div className={'friend_plus'}><AddIcon /></div>
                    <div className={'friend_footer'}>
                        <div># {item.rtasu === 0 ? '기록없음' : `${item.rtasu} 타`}  
                        </div>
                        <div># 경력{item.ucareer} </div>
                        <div># {item.uname}</div>
                    </div>
                </div>
                ))
            }
               
            </Slider>
        </div>
    );
}

export default SimpleSlider;