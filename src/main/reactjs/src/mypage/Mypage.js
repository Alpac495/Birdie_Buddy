import React from 'react';

function Mypage(props) {
    return (
        <div className="mypageprofile">
            <div className="MPdiv">
                <div className="MPchild" />
            </div>

            <div className="MPbackprofile" />
            <div className="MPinfobox" />
            <div className="MPmainprofile" />
            <div className="MPdiv2">
        <span className="MPtxt">
          <p className="MPp">1992.09.07. 서울 강남구</p>
          <p className="MPp">골프경력 1년 평균타수 89타</p>
        </span>
            </div>
            <div className="MPdiv3">안녕하세요~</div>
            <div className="MPdiv4">닉네임</div>
            <div className="MPwrapper">
                <div className="MPdiv5">프로필수정</div>
            </div>
            <div className="MPicon-camera-parent">
                <img className="MPicon-camera" alt="" src="/-icon-camera.svg" />
                <div className="MPdiv5">내 스토리</div>
            </div>
            <div className="MPgroup-parent">
                <div className="MPcontainer">
                    <div className="MPdiv5">내 정보</div>
                </div>
                <img
                    className="MPicon-profile-circle1"
                    alt=""
                    src="/-icon-profile-circle1.svg"
                />
            </div>


        </div>
    );
}

export default Mypage;