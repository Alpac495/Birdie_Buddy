import "./MypagePay.css";
import Header from "../header/Header";
import Profile from "../image/user60.png";
const AllFriendList = () => {
    return (
        <div className="AFallfriendlist">
            <Header/>
            <div className="AFmobile-steps">
                <div className="AFicon-buttons-text-button-i">
                    <img className="AFchevron-left-icon" alt="" src="/chevron-left.svg" />
                    <div className="AFlabel">BACK</div>
                </div>
                <div className="AFicon-buttons-text-button-i1">
                    <div className="AFlabel1">NEXT</div>
                    <img className="AFchevron-left-icon" alt="" src="/icon.svg" />
                </div>
                <img className="AFstep-dots-icon" alt="" src="/step-dots.svg" />
            </div>
            <div className="AFdiv">골프버디를 찾아보세요!</div>
            <input className="AFyou" placeholder="골프버디를 찾아보세요"/>
            <div className="AFitem-grid-tiles-3x3">
                <div className="AFrow-1">
                    <div className="AFitem-2">
                        <div className="AFdiv1">타수/성별</div>
                        <div className="AFdiv2">닉네임</div>
                        <img className="AFjduphoto-icon" alt="" src={Profile} />
                    </div>
                    <div className="AFitem-2">
                        <div className="AFdiv1">타수/성별</div>
                        <div className="AFdiv2">닉네임</div>
                        <img className="AFjduphoto-icon" alt="" src={Profile} />
                    </div>
                    <div className="AFitem-2">
                        <div className="AFdiv1">타수/성별</div>
                        <div className="AFdiv2">닉네임</div>
                        <img className="AFjduphoto-icon" alt="" src={Profile} />
                    </div>
                </div>
                <div className="AFrow-1">
                    <div className="AFitem-2">
                        <div className="AFdiv1">타수/성별</div>
                        <div className="AFdiv2">닉네임</div>
                        <img className="AFjduphoto-icon" alt="" src={Profile} />
                    </div>
                    <div className="AFitem-2">
                        <div className="AFdiv1">타수/성별</div>
                        <div className="AFdiv2">닉네임</div>
                        <img className="AFjduphoto-icon" alt="" src={Profile} />
                    </div>
                    <div className="AFitem-2">
                        <div className="AFdiv1">타수/성별</div>
                        <div className="AFdiv2">닉네임</div>
                        <img className="AFjduphoto-icon" alt="" src={Profile} />
                    </div>
                </div>
                <div className="AFrow-1">
                    <div className="AFitem-2">
                        <div className="AFdiv1">타수/성별</div>
                        <div className="AFdiv2">닉네임</div>
                        <img className="AFjduphoto-icon" alt="" src={Profile} />
                    </div>
                    <div className="AFitem-2">
                        <div className="AFdiv1">타수/성별</div>
                        <div className="AFdiv2">닉네임</div>
                        <img className="AFjduphoto-icon" alt="" src={Profile} />
                    </div>
                    <div className="AFitem-2">
                        <div className="AFdiv1">타수/성별</div>
                        <div className="AFdiv2">닉네임</div>
                        <img className="AFjduphoto-icon" alt="" src={Profile} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllFriendList;
