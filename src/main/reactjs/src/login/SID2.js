import React from 'react';
import './SID2.css';
import Back from "../image/Back.svg";
import hidelogo from "../image/hidelogo.svg";

function SID2({data, navi}) {
    return (
        <div className="IS2idsearch2">
            <div className="IS2idsearch2-child" />
            <div className="IS2parent">
                <div className="IS2div">아이디 찾기</div>
                <img className="IS2icon-arrow-left" alt="" src={Back} />
            </div>
            <div className="IS2idsearch2-item" />
            <img className="IS2birdie-buddy" alt="" src={hidelogo} />
            <div className="IS2rectangle-parent">
                <div className="IS2group-child" onClick={()=>{navi('/login/login')}}/>
                <div className="IS2div1" onClick={()=>{navi('/login/login')}}>로그인 하기</div>
            </div>
            <div className="IS2rectangle-group">
                <div className="IS2group-item" onClick={()=>{navi('/login/searchPass')}}/>
                <div className="IS2div2" onClick={()=>{navi('/login/searchPass')}}>비밀번호 찾기</div>
            </div>
            <div className="IS2div3">
                회원님의 정보로 아래와 같은 가입내역이 있습니다.
            </div>
            <div className="IS2id">버디버디 ID</div>
            <div className="IS2div4">아이디 : {data.uemail}</div>
            <div className="IS2div5">가입일자 : {data.ugaipday}</div>
        </div>
    );
}

export default SID2;