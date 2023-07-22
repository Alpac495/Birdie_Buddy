import "./MypageSetting.css";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import JoinIcon from"../image/icon_flaghole.svg";
import BuddyIcon from "../image/icon_mybuddy.svg";
import YangdoIcon from "../image/icon_yangdo.svg";
import RateReviewIcon from '@mui/icons-material/RateReview';
import PersonIcon from '@mui/icons-material/Person';
import BuddyStory from "../image/icon_buddystory.svg";
import {useNavigate, useParams} from "react-router-dom";

const MypageSetting = () => {

    const {unum} = useParams();
    const navi = useNavigate();

    const onMyYangdo=()=>{
        navi(`/mypage/myyangdo/${unum}/1`);
    }

    return (
        <div className="mypagesetting">
            <div className="MPScontent-area">
                <div className="MPSlist-item-group-subtitle">
                    <div className="MPSsubtitle">
                        <div className="MPSlabel">General</div>
                    </div>
                </div>
                <div className="MPSsingle-line-item">
                    <AccountCircleOutlinedIcon/>
                    <div className="MPSlabel1">마이 프로필</div>
                </div>
                <div className="MPSsingle-line-item">
                    <img className="account-icon" alt="" src={BuddyIcon} />
                    <div className="MPSlabel1">마이 버디</div>
                </div>
                <div className="MPSsingle-line-item1" />
                <div className="MPSdivider">
                    <div className="MPSline-separator" />
                </div>
                <div className="MPSlist-item-group-subtitle">
                    <div className="MPSsubtitle">
                        <div className="MPSlabel">Features</div>
                    </div>
                </div>
                <div className="MPSsingle-line-item2">
                    <img className="account-icon" alt="" src={JoinIcon} />
                    <div className="MPSlabel1">마이 조인</div>
                </div>
                <div className="MPSsingle-line-item"
                onClick={onMyYangdo}>
                    <img className="account-icon" alt="" src={YangdoIcon} />
                    <div className="MPSlabel1">마이 양도</div>
                </div>
                <div className="MPSsingle-line-item">
                    <TrendingUpIcon/>
                    <div className="MPSlabel1">마이 랭킹</div>
                </div>
                <div className="MPSsingle-line-item">
                    <img className="account-icon" alt="" src={BuddyStory} />
                    <div className="MPSlabel1">마이 스토리</div>
                </div>
                <div className="MPSdivider">
                    <div className="MPSline-separator" />
                </div>
                <div className="MPSlist-item-group-subtitle">
                    <div className="MPSsubtitle">
                        <div className="MPSlabel">Services</div>
                    </div>
                </div>
                <div className="MPSsingle-line-item">
                    <img className="account-icon" alt="" src="/info.svg" />
                    <div className="MPSlabel1" onClick={()=>navi('/login/taltae')}>회원탈퇴</div>
                </div>
                <div className="MPSsingle-line-item">
                    <img className="account-icon" alt="" src="/info.svg" />
                    <div className="MPSlabel1" onClick={()=>navi('/login/passchange')} >비밀번호 변경</div>
                </div>
                <div className="MPSlist-item-group-subtitle3">
                    <div className="MPSsubtitle">
                        <div className="MPSlabel">로그아웃</div>
                    </div>
                </div>

            </div>

            <img className="vector-icon" alt="" src="/vector.svg" />
            <img className="vector-icon1" alt="" src="/vector1.svg" />
            <img className="vector-icon2" alt="" src="/vector2.svg" />
            <img className="vector-icon3" alt="" src="/vector3.svg" />
            <img className="vector-icon4" alt="" src="/vector4.svg" />
            <img className="vector-icon5" alt="" src="/vector5.svg" />
            <img className="vector-icon6" alt="" src="/vector6.svg" />
            <img className="vector-icon7" alt="" src="/vector7.svg" />

        </div>
    );
};

export default MypageSetting;