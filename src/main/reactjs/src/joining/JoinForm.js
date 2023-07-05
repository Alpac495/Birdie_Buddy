import "./Joining.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
const JoinForm = (props) => {

    const [jcontent,setJcontent]=useState('');
    const [jjoinday,setJoinday]=useState('');
    const [gnum,setGnum]=useState('');
    const [jprice,setJprice]=useState('');
    const [jtime,setJtime]=useState('');
    const [jage,setJage]=useState('');



    const navi=useNavigate();



    const onSubmitEvent=(e)=>{
        e.preventDefault();
        Axios.post("/joining/insert",{jcontent,jjoinday,gnum,jprice, jtime, jage})
            .then(res=>{
                alert("신청되었습니다")
                //목록으로 이동
                navi("/joining/list/")
            })
    }




    return (
        <div className="joinform">
            <form onSubmit={onSubmitEvent}>
            <div className="register" />
            <div className="frame-parent">
                <div className="frame-group">
                    <div className="jparent">
                        <div className="jdiv">
                           골프장검색</div>
                        <input className="jforminput" type="text" placeholder="골프장을 검색하세요"
                               value={gnum} onChange={(e)=>setGnum(e.target.value)} required maxLength minLength />
                    </div>
                    <div className="jparent">
                        <div className="jdiv">날짜</div>
                        <input className="jforminput1" type="date" placeholder="조인 날짜를 입력하세요"
                               value={jjoinday} onChange={(e)=>setJoinday(e.target.value)} required maxLength minLength />
                    </div>
                    <div className="jparent">
                        <div className="jdiv">시간</div>
                        <input className="jforminput1" type="text" placeholder={"조인 시간을 입력하세요"}
                               value={jtime} onChange={(e)=>setJtime(e.target.value)} required maxLength minLength />
                    </div>
                </div>
                <div className="frame-container">
                    <div className="jparent">
                        <div className="jdiv">연령대</div>
                        <input className="jforminput" type="text"  required placeholder="원하는 조인 멤버의 연령대를 입력하세요"
                               value={jage} onChange={(e)=>setJage(e.target.value)} maxLength minLength />
                    </div>
                    <div className="jparent1">
                        <div className="jdiv">금액</div>
                        <input className="jforminput1" type="text"  required placeholder="그린피 예상금액을 입력하세요"
                               value={jprice} onChange={(e)=>setJprice(e.target.value)} maxLength minLength />
                    </div>
                    <div className="jparent2">
                        <div className="jdiv">조인설명</div>
                        <input className="jforminput5" type="text"  required placeholder="조인에 대한 간단한 설명을 입력하세요"
                               value={jcontent} onChange={(e)=>setJcontent(e.target.value)} maxLength minLength />
                    </div>
                </div>
            </div>
            <div className="register-parent">
                <div className="jregister1">
                    <div className="jdiv6">BirdieBuddy</div>
                </div>
                <img className="icon-menu" alt="" src={`🦆 icon "menu".svg`} />
                <img className="icon-notification" alt="" src={`🦆 icon "notification".svg`} />
                <img className="icon-profile-circle" alt="" src={`🦆 icon "profile circle".svg`} />
            </div>
            <div className="joinform-child" />
            <div className="jdiv7">조인 만들기</div>
            </form>
        </div>);
};


export default JoinForm;
