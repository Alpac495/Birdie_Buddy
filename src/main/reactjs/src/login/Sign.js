import React, {useRef, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "./Sign.css";
import Sms from "./Sms";

function Sign(props) {
    const [uemail, setUemail]=useState('');
    const [upass,setUpass]=useState('');
    const [upassok,setUpassok]=useState('');
    const [uname,setUname]=useState('');
    const [unickname,setUnickname]=useState('');
    const [uage,setUage]=useState('');
    const [uhp,setUhp]=useState('');
    const [ugender,setUgender]=useState("남");
    const navi=useNavigate();
    const emailRef = useRef(null);
    const [code,setCode]=useState('');

    const ouSubmitEvent =(e)=>{
        e.preventDefault();
        axios.post("/login/sign",{uemail,upass,uname,unickname,uage,ugender})
            .then(res=>{
                alert("회원가입 성공. 메인페이지로 이동");
                navi("/")
            })
    }
    const emailchk=()=>{
        if(uemail==''){
            alert("양식지켜");
            return;
        } else {
            axios.get(`/login/emailchk?uemail=${uemail}`)
                .then(res=>{
                    const chk = res.data
                    if(chk==1){
                        alert("이메일 중복")
                        setUemail('');
                    } else {
                        alert("인증완료")
                        emailRef.current.disabled = true;
                    }
                })
        }

    }
    const sms = () => {
        axios.get('/login/smsSend?uhp='+uhp)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }
    const codeChk=()=>{
        axios.get('/login/codechk?uhp='+uhp+'&code='+code)
            .then(res=>{
                if(res.data){
                    alert("인증 성공")
                } else {
                    alert("인증 실패")
                }
            })
    }


    return (
        <div className={''} style={{width:'360px'}}>
            <div style={{textAlign:'center'}}>
            <form onSubmit={ouSubmitEvent}>
                이메일<br/>
                <input type={"text"} required ref={emailRef} onChange={(e)=>setUemail(e.target.value)} value={uemail} /><br/>
                <button type='button' onClick={emailchk}>중복확인</button><br/><br/>

                비밀번호<br/>
                <input type={"password"} required onChange={(e)=>setUpass(e.target.value)} value={upass} /><br/><br/>
                
                비밀번호 확인<br/>
                <input type={"password"} required onChange={(e)=>setUpassok(e.target.value)} value={upassok}/>
                {
                    upass==''?<div></div>:upass!='' && upass!=upassok?<div>비밀번호가 일치하지 않습니다</div>:<div>비밀번호가 일치합니다</div>
                }
                <br/>

                
                
                이름<br/>
                <input type={"text"} required onChange={(e)=>setUname(e.target.value)} value={uname} /><br/><br/>

                휴대전화<br/>
                <input type={"text"} placeholder={''} onChange={(e)=>setUhp(e.target.value)}/><br/>
                <button type={'button'} onClick={sms}>전화 인증</button>
                <br/>
                <input type={"text"} placeholder={'인증코드쓰는곳'} onChange={(e)=>setCode(e.target.value)}/><br/>
                <button type={'button'} onClick={codeChk}>인증확인</button>
                <br/>
                <br/>
                닉네임<br/>
                <input type={"text"} required onChange={(e)=>setUnickname(e.target.value)} value={unickname} /><br/><br/>
                
                생년월일<br/>
                <input type={"date"} required onChange={(e)=>setUage(e.target.value)} value={uage} /><br/><br/>

                성별<br/>
                <select required onChange={(e)=>setUgender(e.target.value)} value={ugender}>
                    <option value={"남"}>남</option>
                    <option value={"여"}>여</option>
                </select><br/><br/>

                <button type={'submit'}>가입</button>
            </form>
            </div>

        </div>
    );
}

export default Sign;