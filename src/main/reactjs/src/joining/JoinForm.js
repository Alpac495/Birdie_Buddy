import "./Joining.css";
const JoinForm = () => {
    return (
        <div className="search-parent">
            <div className="search">
                <div className="status-bar">
                    <img className="connections-icon" alt="" src="/connections.svg" />
                    <div className="time">
                        <div className="time1">9:27</div>
                    </div>
                </div>
                <div className="register">
                    <div className="div">로고자리</div>
                </div>
                <div className="primary-button">
                    <b className="b">참여신청하기</b>
                </div>
                <div className="frame-parent">
                    <div className="parent">
                        <div className="div1">이름</div>
                        <input
                            className="email"
                            type="text"
                            placeholder="Enter your name"
                            maxLength
                            minLength
                        />
                    </div>
                    <div className="group">
                        <div className="div1">주소</div>
                        <input
                            className="email1"
                            type="text"
                            placeholder="Enter your email address"
                            maxLength
                            minLength
                        />
                    </div>
                    <div className="parent">
                        <div className="div1">날짜</div>
                        <input className="email1" type="text" maxLength minLength />
                    </div>
                </div>
                <div className="search-inner">
                    <div className="frame-div">
                        <div className="div1">상세내용</div>
                        <textarea className="email3" placeholder="Enter your message" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JoinForm;