import React from 'react';
import "./Footer.css";
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import InstagramIcon from '@mui/icons-material/Instagram';
import GolfCourseIcon from '@mui/icons-material/GolfCourse';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';

function Footer(props) {
    return (
        <div className={'buddy_footer'}>
                <div className={'buddy_footmenu'}>
                    <HomeIcon/>
                    <p>홈</p>
                </div>
                <div className={'buddy_footmenu'}>
                    <GroupIcon/>
                    <p>골프친구</p>
                </div>
                <div className={'buddy_footmenu'}>
                    <GolfCourseIcon/>
                    <p>조인/양도</p>
                </div>
                <div className={'buddy_footmenu'}>
                    <SmsOutlinedIcon/>
                    <p>채팅</p>
                </div>
                <div className={'buddy_footmenu'}>
                    <InstagramIcon/>
                    <p>후기</p>
                </div>
        </div>
    );
}

export default Footer;