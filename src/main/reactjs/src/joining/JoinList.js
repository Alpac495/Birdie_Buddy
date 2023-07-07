import "./JoinList.css";
import {JoinFullRounded} from "@mui/icons-material";
import iconFlag from "../image/icon_flaghole.svg"
import Header from "../header/Header";
const JoinList = () => {
    return (
        <div className="joinlist">
            <Header/>
            <div className="btn1_wrapper">
                <b className="JLb">조인만들기</b>
            </div>
            <div className="btn2_wrapper">
                <b className="JLb1">내조인</b>
            </div>
            <input className="joinlist-child" type={"text"} />
            <div className="jlist">
                <div className="jlist1">
                    <div className="jlist-inner">
                        <div className="instance-child" />
                    </div>
                    <div className="JLdiv1">
                        <p className="JLp">{`07.15(토) 14:10 `}</p>
                        <p className="JLp1">골프장이름</p>
                        <p className="JLp1">가격대</p>
                    </div>
                    <div className="emoji-flag-in-hole-parent">
                        <img
                            className="emoji-flag-in-hole"
                            alt=""
                            src={iconFlag}/>
                        <div className="JLdiv2">1자리 비었어요!</div>
                    </div>
                    <div className="avatar-user-60">
                        <div className="rectangle" />
                        <div className="rectangle1" />
                    </div>
                    <div className="rectangle-parent">
                        <div className="group-child" />
                        <div className="d-16">D-16</div>
                    </div>
                    <div className="jlist-child" />
                </div>
            </div>
            <div className="jlist">
                <div className="jlist1">
                    <div className="jlist-inner">
                        <div className="instance-child" />
                    </div>
                    <div className="JLdiv1">
                        <p className="JLp">{`07.15(토) 14:10 `}</p>
                        <p className="JLp1">골프장이름</p>
                        <p className="JLp1">가격대</p>
                    </div>
                    <div className="emoji-flag-in-hole-parent">
                        <img
                            className="emoji-flag-in-hole"
                            alt=""
                            src={iconFlag}/>
                        <div className="JLdiv2">1자리 비었어요!</div>
                    </div>
                    <div className="avatar-user-60">
                        <div className="rectangle" />
                        <div className="rectangle1" />
                    </div>
                    <div className="rectangle-parent">
                        <div className="group-child" />
                        <div className="d-16">D-16</div>
                    </div>
                    <div className="jlist-child" />
                </div>
            </div>

        </div>
    );
};

export default JoinList;
