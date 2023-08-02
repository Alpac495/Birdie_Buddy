import React, { Component } from 'react';
import Slider from 'react-slick';
import "./NoticeSlider.css";
import ad1 from "../images/ad1.png";
import ad2 from "../images/ad2.png";
import ad3 from "../images/ad3.png";
import ad4 from "../images/ad4.png";
import "../app_effect/AdSlider.css";
import { Link, NavLink } from 'react-router-dom';



export default class Fade extends Component {
    render() {
      const settings = {
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:3000,
      };
      return (
        <div className='ad_slider'>
          <Slider {...settings}>
            <div className='ad_slidercom'>
              <img alt='' src={ad1} />
            </div>
            <div className='ad_slidercom'>
              <img alt='' src={ad3} />
            </div>
            <div className='ad_slidercom'>
              <img alt='' src={ad4} />
            </div>
            <div className='ad_slidercom'>
              <img alt='' src={ad2} />
            </div>
          </Slider>
        </div>
      );
    }
  }