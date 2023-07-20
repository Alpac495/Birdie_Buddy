import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import "./Sign.css";
import logo from "../image/logo_main.svg"
import Slider from '@mui/material-next/Slider';

function Sign(props) {

    const [uemail, setUemail] = useState('');
    const [upass, setUpass] = useState('');
    const [upassok, setUpassok] = useState('');
    const [uname, setUname] = useState('');
    const [unickname, setUnickname] = useState('');
    const [uage, setUage] = useState('');
    const [uhp, setUhp] = useState('');
    const [ugender, setUgender] = useState("남");
    const [ucareer, setUcareer] = useState('');
    const [code, setCode] = useState('');

    const navi = useNavigate();

    const emailRef = useRef(null);
    const hpRef = useRef(null);
    const codeRef = useRef(null);
    const nicknameRef = useRef(null);
    const nameRef = useRef(null);
    const careerRef = useRef(null);

    const [imsiEmail, setImsiEmail] = useState('0');
    const [imsihp, setImsihp] = useState('0');
    const [imsinick, setImsinick] = useState('0');
    const [change, setChange] = useState('0');

    const location = useLocation();
    const userInfo = {...location.state};

    useEffect(() => {
        if (userInfo.unickname) {
            console.log("sdf:", userInfo)
            const {uemail, uname, unickname, ugender, uhp, uage} = userInfo;
            setChange('1');
            if (uemail) {
                setUemail(uemail)
                emailRef.current.disabled = true
                setImsiEmail('1')
                setChange('1')
            }
            ;
            if (uname) {
                setUname(uname);
                nameRef.current.disabled = true
            }
            if (unickname) {
                setUnickname(unickname);
            }
            ;
            if (ugender == "M" || "Male" ) {
                setUgender("남");
            } else {
                setUgender("여");
            }
            if (uhp) {
                setUhp(uhp.replace(/-/g, ""));
                hpRef.current.disabled = true
            }
            if (uage) setUage(uage);
        }
    }, [location.state])


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
                    return;
                } else {
                    if (imsinick != 1) {
                        alert("닉네임 중복확인을 진행해주세요")
                        return;
                    }
                    axios.post("/login/sign", {uemail, upass, uname, unickname, uage, ugender, uhp, ucareer})
                        .then(res => {
                            alert("회원가입 성공. 메인페이지로 이동");
                            navi("/")
                        })
                }
            }
        }

    }
    const emailchk = () => {
        if (uemail.length>17 || uemail=='') {
            alert("ID는 16자 이내로 설정해주세요");
            return;
        } else {
            axios.get(`/login/emailchk?uemail=${uemail}`)
                .then(res => {
                    if (res.data == 1) {
                        alert("아이디 중복")
                        setUemail('');
                    } else {
                        alert("중복체크완료")
                        // emailRef.current.disabled = true
                        setImsiEmail('1')
                    }
                })
        }

    }
    const nickchk = () => {
        if (unickname == '') {
            alert("닉네임은 비워둘수 없습니다");
            return;
        } else {
            axios.get(`/login/nickchk?unickname=${unickname}`)
                .then(res => {
                    if (res.data == 1) {
                        alert("닉네임 중복")
                        setUnickname('');
                    } else {
                        alert("중복체크완료")
                        //nicknameRef.current.disabled = true
                        setImsinick('1')
                    }
                })
        }

    }

    const sms = () => {
        if (uhp.length != 11) {
            alert("휴대폰번호 11자리를 입력해 주세요")
            setUhp('');
        } else {
            axios.get('/login/hpchk?uhp=' + uhp)
                .then(res => {
                    if (res.data == 1) {
                        alert("이미 등록된 번호입니다")
                        hpRef.current.disabled = null
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
            <img src={logo} alt={''}/>
            <div className={'div2'}>
                <form onSubmit={ouSubmitEvent}>
                    아이디<br/>
                    <input type={"text"} className={'textbox'} required ref={emailRef}
                           onChange={(e) => {
                               setUemail(e.target.value)
                               setImsiEmail('0');
                           }}
                           value={uemail}/><br/>
                    <button type='button' onClick={emailchk}>중복확인</button>
                    <br/><br/>

                    비밀번호<br/>
                    <input type={"password"} className={'textbox'} required onChange={(e) => setUpass(e.target.value)}
                           value={upass}/><br/><br/>

                    비밀번호 확인<br/>
                    <input type={"password"} className={'textbox'} required onChange={(e) => setUpassok(e.target.value)}
                           value={upassok}/>
                    {
                        upass == '' ? <div></div> : upass != '' && upass != upassok ? <div>비밀번호가 일치하지 않습니다</div> :
                            <div>비밀번호가 일치합니다</div>
                    }
                    <br/>


                    이름<br/>
                    <input type={"text"} className={'textbox'} required onChange={(e) => setUname(e.target.value)}
                           value={uname} ref={nameRef}/><br/><br/>
                    <div>
                            <div>
                                휴대전화<br/>
                                <input type="text" className="textbox" placeholder="" required ref={hpRef} value={uhp}
                                       onChange={(e) => {
                                           setUhp(e.target.value)
                                           setImsihp('0');
                                       }}/><br/>
                                <button type="button" onClick={sms}>전화 인증</button>
                                <br/>
                                <input type="text" className="textbox" placeholder="인증코드쓰는곳" ref={codeRef}
                                       onChange={(e) => setCode(e.target.value)}/><br/>
                                <button type="button" onClick={codeChk}>인증확인</button>
                            </div>
                    </div>
                    <br/>
                    <br/>
                    닉네임<br/>
                    <input type={"text"} ref={nicknameRef} className={'textbox'} required onChange={(e) => {
                        setUnickname(e.target.value);
                        setImsinick('0');

                    }}
                           value={unickname}/><br/>
                    <button type={'button'} onClick={nickchk}>닉네임 중복확인</button>
                    <br/><br/>


                    <select required onChange={(e) => setUcareer(e.target.value)} value={ucareer}>
                        <option hidden>경력</option>
                        <option value={"1년 미만"}>1년 미만</option>
                        <option value={"1~3년"}>1~3년</option>
                        <option value={"4~6년"}>4~6년</option>
                        <option value={"7~9년"}>7~9년</option>
                        <option value={"10년 이상"}>10년이상</option>
                    </select>

                    <input type={"date"} required onChange={(e) => setUage(e.target.value)} value={uage}/>

                    <select required onChange={(e) => setUgender(e.target.value)} value={ugender}>
                        <option hidden>성별</option>
                        <option value={"남"}>남</option>
                        <option value={"여"}>여</option>
                    </select><br/><br/>
                    <button type={'submit'}>가입</button>
                </form>
            </div>
        </div>
    )
        ;
}

export default Sign;