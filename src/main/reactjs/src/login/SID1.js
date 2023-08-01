import React from 'react';
import './SID1.css';
import Back from "../image/Back.svg";
import hidelogo from "../image/hidelogo.svg";
import Header from '../header/Header';

function SID1(props) {
    return (
        <div className="IS1idsearch1">
            <Header/>
            <div className="IS1rectangle-parent">
                <div className="IS1group-child" onClick={props.codeChk}/>
                <div className="IS1div" onClick={props.nextbtn}>다음</div>
            </div>
            <img className="IS1birdie-buddy" alt="" src={hidelogo} />
            <div className="IS1idsearch1-child" />
            <div className="IS1parent">
                <div className="IS1div1">아이디 찾기</div>
                <img className="IS1icon-arrow-left" onClick={()=>props.navi('/login/login')} alt="" src={Back} />
            </div>
            <div className="IS1group">
                <div className="IS1div2">휴대폰 번호</div>
                <div className="IS1rectangle-group">
                    <div className="IS1group-item" />
                    <input type="number" oninput="this.value = this.value.replace(/[^0-9]/g, '')" className="IS1div3" placeholder="휴대폰번호" required value={props.uhp}
                       onChange={(e) => {
                           props.setUhp(e.target.value)
                       }}/>
                    <div className="IS1group-inner" onClick={props.sms}/>
                    <div className="IS1div4" onClick={props.sms}>발송</div>
                </div>
            </div>
            <div className="IS1container">
                <div className="IS1div5">인증 번호</div>
                <div className="IS1rectangle-group">
                    <div className="IS1group-item" />
                    <input type="text" className="IS1div3" placeholder="인증 번호를 입력하세요." value={props.code}
                       onChange={(e) => props.setCode(e.target.value)}/>
                    <div className="IS1group-inner" onClick={props.codeChk}/>
                    <div className="IS1div4" onClick={props.codeChk}>확인</div>
                </div>
            </div>
            <div className="IS1group-div">
                <div className="IS1div8" onClick={()=>props.navi('/login/searchPass')}>{`비밀번호 찾기 ->`}</div>
                <div className="IS1div9">비밀번호를 잊으셨나요?</div>
                <div className="IS1line-div" />
            </div>
            <div className="IS1div10">
                아이디 찾기 가능한 휴대폰 번호 인증을 해주세요.
            </div>
        </div>
    );
}

export default SID1;