import React, { Component } from 'react';
import Slider from 'react-slick';
import "./NoticeSlider.css";
import ad1 from "../image/aaa.svg";
import ad2 from "../image/we2.svg";
import ad3 from "../image/we.svg";
import ad4 from "../image/devster.svg";
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
              <img alt='' src={ad2} />
            </div>
            <div className='ad_slidercom'>
              <img alt='' src={ad4} />
            </div>
            <div className='ad_slidercom'>
              <img alt='' src={ad3} />
            </div>
          </Slider>
        </div>
      );
    }
  }