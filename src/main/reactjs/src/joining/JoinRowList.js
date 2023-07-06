import "./JoinList.css";
const JoinList = () => {
    return (
        <div className="joinlist">
            <div className="register" />
            <div className="segmented-control">
                <div className="frame">
                    <b className="b">인기순</b>
                </div>
                <div className="frame1">
                    <b className="b">추천순</b>
                </div>
                <div className="frame1">
                    <b className="b">거리순</b>
                </div>
            </div>
            <div className="joinlist-child" />
            <div className="button-open-links-navigate" />
            <div className="register-parent">
                <div className="register1">
                    <div className="div">BirdieBuddy</div>
                </div>
                <img className="icon-menu" alt="" src="/-icon-menu.svg" />
                <img
                    className="icon-notification"
                    alt=""
                    src="/-icon-notification.svg"
                />
                <img
                    className="icon-profile-circle"
                    alt=""
                    src="/-icon-profile-circle.svg"
                />
            </div>
            <div className="avatar-user-60">
                <div className="rectangle" />
                <div className="rectangle1" />
            </div>
            <div className="div1">
                <p className="p">{`날짜, 시간대, `}</p>
                <p className="p">골프장이름</p>
                <p className="p">가격대</p>
            </div>
            <div className="div2">남은 자리 : 1</div>
            <div className="button-open-links-navigate1" />
        </div>
    );
};

export default JoinList;