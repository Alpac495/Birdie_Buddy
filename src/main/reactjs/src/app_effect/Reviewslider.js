import React, {Component} from 'react';
import Slider from "react-slick";
import "./Review.css";
import no from "../images/nooooo.jpg";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';



export default class SimpleSlider extends Component {
    render() {
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            swipeToSlide: true,
            autoplay:true,
            autoplaySpeed:3000,
        };


        return (
            <div className={'review_sliderwrap'}>
                <Slider {...settings}>
                    <div className={'review_slider'}>
                        <img className={'review_main'} alt={''} src={no}/>
                        <img className={'review_profile'} alt={''} src={no}/><span className={'review_writer'}>김똘똘</span>
                        <div className={'review_footer'}><FavoriteOutlinedIcon/></div>

                    </div>
                    <div className={'review_slider'}>
                        <img className={'review_main'} alt={''} src={no}/>
                        <img className={'review_profile'} alt={''} src={no}/><span className={'review_writer'}>김똘똘</span>
                        <div className={'review_footer'}><FavoriteOutlinedIcon/></div>
                    </div>
                    <div className={'review_slider'}>
                        <img className={'review_main'} alt={''} src={no}/>
                        <img className={'review_profile'} alt={''} src={no}/><span className={'review_writer'}>김똘똘</span>
                        <div className={'review_footer'}><FavoriteOutlinedIcon/></div>
                    </div>
                    <div className={'review_slider'}>
                        <img className={'review_main'} alt={''} src={no}/>
                        <img className={'review_profile'} alt={''} src={no}/><span className={'review_writer'}>김똘똘</span>
                        <div className={'review_footer'}><FavoriteOutlinedIcon/> 100 &nbsp;</div>
                    </div>
                    <div className={'review_slider'}>
                        <img className={'review_main'} alt={''} src={no}/>
                        <img className={'review_profile'} alt={''} src={no}/><span className={'review_writer'}>김똘똘</span>
                        <div className={'review_footer'}><FavoriteOutlinedIcon/></div>
                    </div>
                    <div className={'review_slider'}>
                        <img className={'review_main'} alt={''} src={no}/>
                        <img className={'review_profile'} alt={''} src={no}/><span className={'review_writer'}>김똘똘</span>
                        <div className={'review_footer'}><FavoriteOutlinedIcon/></div>
                    </div>
                </Slider>
            </div>
        );
    }
}
