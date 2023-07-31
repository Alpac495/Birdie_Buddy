import "./MypageSetting.css";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import JoinIcon from "../image/icon_flaghole.svg";
import BuddyIcon from "../image/icon_mybuddy.svg";
import YangdoIcon from "../image/icon_yangdo.svg";
import BuddyStory from "../image/icon_buddystory.svg";
import phonechange from "../image/phonechange.svg";
import passchange from "../image/passchange.svg";
import mypro from "../image/mypro.svg";
import rang from "../image/rang.svg";
import out from "../image/out.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../header/Header";
import axios from "axios";

const MypageSetting = () => {

    const [unum, setUnum] = useState('');
    const navi = useNavigate();
    const unumchk = () => {
        axios.get("/login/unumChk")
            .then(res => {
                axios.get("/login/getuser?unum=" + res.data)
                    .then(res => {
                        console.log(res.data);
                        setUnum(res.data.unum);
                    })
            })

    }
    useEffect(()=>{
        unumchk();
    },[])

    const onMyYangdo = () => {
        navi(`/mypage/myyangdo/${unum}`);
    }
    const onMyProfile = () => {
        navi(`/mypage/mypage/${unum}`);
    }
    const onMyBuddy = () => {
        navi(`/friend/list`);
    }
    const onMyJoin = () => {
        navi(`/joining/makelist`);
    }
    const onMyRank = () => {
        navi(`/score/list`);
    }
    const onMyStory = () => {
        navi(`/hugi/list/${unum}`);
    }

    return (
        <div className="mypagesetting">
            <Header />
            <div className="MPScontent-area">

                <div className="MPSlist-item-group-subtitle">
                    <div className="MPSsubtitle">
                        <div className="MPSlabel">General</div>
                    </div>
                </div>

                <div className="MPSsingle-line-item" onClick={onMyProfile}>
                    <img className="account-icon" alt="" src={mypro} />
                    <div className="MPSlabel1">마이 프로필</div>
                </div>
                <div className="MPSsingle-line-item" onClick={onMyBuddy}>
                    <img className="account-icon" alt="" src={BuddyIcon} />
                    <div className="MPSlabel1">마이 버디</div>
                </div>
                <div className="MPSsingle-line-item1" />
                
                <div className="MPSlist-item-group-subtitle">
                    <div className="MPSsubtitle">
                        <div className="MPSlabel">Features</div>
                    </div>
                </div>
                <div className="MPSsingle-line-item2" onClick={onMyJoin}>
                    <img className="account-icon" alt="" src={JoinIcon} />
                    <div className="MPSlabel1">마이 조인</div>
                </div>
                <div className="MPSsingle-line-item" onClick={onMyYangdo}>
                    <img className="account-icon" alt="" src={YangdoIcon} />
                    <div className="MPSlabel1">마이 양도</div>
                </div>
                <div className="MPSsingle-line-item" onClick={onMyRank}>
                    <img className="account-icon" alt="" src={rang} />
                    <div className="MPSlabel1">마이 랭킹</div>
                </div>
                <div className="MPSsingle-line-item" onClick={onMyStory}>
                    <img className="account-icon" alt="" src={BuddyStory} />
                    <div className="MPSlabel1">마이 스토리</div>
                </div>
                
                <div className="MPSlist-item-group-subtitle">
                    <div className="MPSsubtitle">
                        <div className="MPSlabel">Services</div>
                    </div>
                </div>

                <div className="MPSsingle-line-item">
                    <img className="account-icon" alt="" src={phonechange} />
                    <div className="MPSlabel1" onClick={() => navi('/login/hpchange')}>휴대폰 번호 변경</div>
                </div>
                <div className="MPSsingle-line-item">
                    <img className="account-icon" alt="" src={passchange} />
                    <div className="MPSlabel1" onClick={() => navi('/login/passchange')} >비밀번호 변경</div>
                </div>
                <div className="MPSsingle-line-item">
                    <img className="account-icon" alt="" src={out} />
                    <div className="MPSlabel1" onClick={() => navi('/login/taltae')}>회원탈퇴</div>
                </div>
                <div className="MPSlist-item-group-subtitle3">
                    <div className="MPSsubtitle">
                        <div className="MPSlabel" onClick={()=>
                            axios.get("/login/logout")
                            .then(res=>{
                                navi('/birdie_buddy')
                            })
                            }>로그아웃</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MypageSetting;