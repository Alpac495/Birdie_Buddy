import "./JoinDetail.css";
const JoinDetail = () => {
    return (
        <div className="joindetail">
            <div className="JDdiv">
        <span className="JDtxt">
          <p className="JDp">닉네임(이름)</p>
          <p className="JDp1">성별, 나이</p>
        </span>
            </div>
            <img className="jduphoto-icon" alt="" src="/jduphoto@2x.png" />
            <div className="confirmgroup">
                <div className="JDframe">
                    <div className="JDuser">
                        <div className="JDavatar">
                            <div className="JDlw">LW</div>
                        </div>
                        <div className="esther-howard">닉네임 (여/45세)</div>
                    </div>
                    <div className="JDuser1">
                        <div className="JDavatar1">
                            <div className="JDlw">EH</div>
                        </div>
                        <div className="esther-howard">Esther Howard</div>
                    </div>
                    <div className="JDuser2">
                        <div className="JDavatar2">
                            <div className="JDlw">GW</div>
                        </div>
                        <div className="esther-howard">Guy Walkings</div>
                    </div>
                </div>
            </div>
            <div className="JDparent">
                <div className="JDdiv2">
          <span className="JDtxt">
            <span>{`확정인원( 총 멤버 `}</span>
            <span className="JDspan">1</span>
            <span>{`명 /확정 `}</span>
            <span className="JDspan">0</span>
            <span>명 )</span>
          </span>
                </div>
                <div className="JDdiv3">
          <span className="JDtxt">
            <span>{`빈자리 `}</span>
            <span className="JDspan">2</span>
          </span>
                </div>
            </div>
            <div className="JDapplygroup">
                <div className="JDdiv4">
                    <span>{`신청인원( `}</span>
                    <span className="JDspan">1</span>
                    <span> 명 )</span>
                </div>
                <div className="JDframe1">
                    <div className="JDuser">
                        <div className="JDavatar">
                            <div className="JDlw">LW</div>
                        </div>
                        <div className="esther-howard">Leslie Warren</div>
                    </div>
                    <div className="JDuser1">
                        <div className="JDavatar1">
                            <div className="JDlw">EH</div>
                        </div>
                        <div className="esther-howard">Esther Howard</div>
                    </div>
                    <div className="JDuser2">
                        <div className="JDavatar2">
                            <div className="JDlw">GW</div>
                        </div>
                        <div className="esther-howard">Guy Walkings</div>
                    </div>
                </div>
            </div>
            <div className="jdinfo">
                <div className="JDcontent">
                    <div className="JDvalue">
                        <div className="JDdiv5">#포레스트힐</div>
                        <img className="JDicon" alt="" src="/icon.svg" />
                    </div>
                </div>
                <div className="JDdefault">
                    <b className="JDb">07월 11일(화)/ 시간대</b>
                </div>
                <div className="JDdiv6">
                    <p className="JDp">그린피 0원</p>
                    <p className="JDp1">희망하는 연령대</p>
                    <p className="JDp1">내용~~~~</p>
                </div>
            </div>

            <div className="joindetail-child" />
            <div className="JDdiv8">채팅하기</div>
        </div>
    );
};

export default JoinDetail;
