import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import "./Sign.css";
import Sms from "./Sms";
import logo from "../image/logo_main.svg"

function Sign(props) {
    const location = useLocation();
    const [uemail, setUemail] = useState('');
    const [upass, setUpass] = useState('');
    const [upassok, setUpassok] = useState('');
    const [uname, setUname] = useState('');
    const [unickname, setUnickname] = useState('');
    const [uage, setUage] = useState('');
    const [uhp, setUhp] = useState('');
    const [ugender, setUgender] = useState("남");
    const navi = useNavigate();
    const emailRef = useRef(null);
    const hpRef = useRef(null);
    const codeRef = useRef(null);
    const [code, setCode] = useState('');

    const [imsiEmail, setImsiEmail] = useState('0');
    const [imsihp, setImsihp] = useState('0');

    // const userinfo=()=>{
    //     if(location.state!=null){
    //         setUemail(location.state.uemail);
    //     }
    // }


    // useEffect(()=>{
    //     userinfo()
    // },[])

    const ouSubmitEvent = (e) => {
        e.preventDefault();
        if (imsiEmail != 1) {
            alert("이메일 중복 확인을 진행해주세요");
            return;
        } else {
            if (upass != upassok) {
                alert("비밀번호가 일치하지 않습니다")
                return;
            } else {
                if (imsihp != 1) {
                    alert("휴대폰 인증을 진행해주세요");
                } else {
                    axios.post("/login/sign", {uemail, upass, uname, unickname, uage, ugender, uhp})
                        .then(res => {
                            alert("회원가입 성공. 메인페이지로 이동");
                            navi("/")
                        })
                }
            }
        }

    }
    const emailchk = () => {
        if (uemail == '') {
            alert("양식지켜");
            return;
        } else {
            axios.get(`/login/emailchk?uemail=${uemail}`)
                .then(res => {
                    if (res.data == 1) {
                        alert("이메일 중복")
                        setUemail('');
                    } else {
                        alert("중복체크완료")
                        emailRef.current.disabled = true
                        setImsiEmail('1')
                    }
                })
        }

    }
    const sms = () => {
        if (uhp.length != 11) {
            alert("양식지켜")
            setUhp('');
        } else {
            axios.get('/login/hpchk?uhp=' + uhp)
                .then(res => {
                    if (res.data == 1) {
                        alert("이미 등록된 번호")
                        setUhp('');
                    } else {
                        alert("코드발송")
                        axios.get('/login/smsSend?uhp=' + uhp)
                            .then(response => {
                                console.log(response.data);
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    }

                })

        }

    }


    const codeChk = () => {
        axios.get('/login/codechk?uhp=' + uhp + '&code=' + code)
            .then(res => {
                if (res.data) {
                    alert("인증 성공")
                    hpRef.current.disabled = true;
                    codeRef.current.disabled = true;
                    setImsihp('1');
                } else {
                    alert("인증 실패")
                }
            })
    }


    return (
        <div className={'div1'}>
            <div className={'div2'}>
                <img src={logo} alt={''} />
                <form onSubmit={ouSubmitEvent}>
                    이메일<br/>
                    <input type={"text"} className={'textbox'} required ref={emailRef} onChange={(e) => setUemail(e.target.value)}
                           value={uemail}/><br/>
                    <button type='button' onClick={emailchk}>중복확인</button>
                    <br/><br/>

                    비밀번호<br/>
                    <input type={"password"} className={'textbox'} required onChange={(e) => setUpass(e.target.value)}
                           value={upass}/><br/><br/>

                    비밀번호 확인<br/>
                    <input type={"password"} className={'textbox'} required onChange={(e) => setUpassok(e.target.value)} value={upassok}/>
                    {
                        upass == '' ? <div></div> : upass != '' && upass != upassok ? <div>비밀번호가 일치하지 않습니다</div> :
                            <div>비밀번호가 일치합니다</div>
                    }
                    <br/>


                    이름<br/>
                    <input type={"text"} className={'textbox'} required onChange={(e) => setUname(e.target.value)} value={uname}/><br/><br/>

                    휴대전화<br/>
                    <input type={"text"} className={'textbox'} placeholder={''} required ref={hpRef} value={uhp}
                           onChange={(e) => setUhp(e.target.value)}/><br/>
                    <button type={'button'} onClick={sms}>전화 인증</button>
                    <br/>
                    <input type={"text"} className={'textbox'} placeholder={'인증코드쓰는곳'} ref={codeRef}
                           onChange={(e) => setCode(e.target.value)}/><br/>
                    <button type={'button'} onClick={codeChk}>인증확인</button>
                    <br/>
                    <br/>
                    닉네임<br/>
                    <input type={"text"} className={'textbox'} required onChange={(e) => setUnickname(e.target.value)}
                           value={unickname}/><br/><br/>

                    <input type={"date"} required onChange={(e) => setUage(e.target.value)} value={uage}/>&nbsp;

                    <select required onChange={(e) => setUgender(e.target.value)} value={ugender}>
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