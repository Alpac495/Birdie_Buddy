import "./Sign.css";
import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import memberlogo from "../image/memberlogo.svg";

function Sign(props) {
    const [uemail, setUemail] = useState('');
    const [upass, setUpass] = useState('');
    const [upassok, setUpassok] = useState('');
    const [uname, setUname] = useState('');
    const [unickname, setUnickname] = useState('');
    const [uage, setUage] = useState('');
    const [uhp, setUhp] = useState('');
    const [ugender, setUgender] = useState('');
    const [ucareer, setUcareer] = useState('');
    const [code, setCode] = useState('');
    const [chk, setChk] = useState(false);
    const [chk2, setChk2] = useState(false);
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
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    const location = useLocation();
    const userInfo = { ...location.state };
    useEffect(() => {
        if (userInfo.unickname) {
            console.log("sdf:", userInfo)
            const { uemail, uname, unickname, ugender, uhp, uage } = userInfo;
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
            if (ugender == "M" || "Male") {
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
            alert("이메일 중복 확인해 주세요.");
            return;
        } else if (!regex.test(upass)) {
            alert("비밀번호는 8자리 이상, 16자리 이하로 영어/숫자/특수문자를 포함해야 합니다.");
            return;
        } else if (upass != upassok) {
            alert("비밀번호가 일치하지 않습니다.")
            return;
        } else if (imsihp != 1) {
            alert("휴대폰 인증을 진행해 주세요.");
            return;
        } else if (imsinick != 1) {
            alert("닉네임 중복 확인을 진행해 주세요.")
            return;
        }
        axios.post("/login/sign", { uemail, upass, uname, unickname, uage, ugender, uhp, ucareer })
            .then(res => {
                alert("환영합니다! 가입이 완료되었습니다.");
                navi("/")
            })
    }
    const emailchk = () => {
        setChk(true);
        setChk2(false);
        if (uemail == '') {
            alert("아이디를 입력해 주세요.");
            return;
        } else if(uemail.length<5){
            //alert("아이디는 5자 이상이어야 합니다.");
            return;
        } else {
            axios.get(`/login/emailchk?uemail=${uemail}`)
                .then(res => {
                    if (res.data == 1) {
                        //alert("아이디 중복")
                        setChk2(true);
                        setUemail('');
                    } else {
                        //alert("중복체크완료")
                        // emailRef.current.disabled = true
                        setImsiEmail('1')
                    }
                })
        }
    }
    const nickchk = () => {
        if (unickname == '') {
            alert("닉네임을 입력해 주세요.");
            return;
        } else {
            axios.get(`/login/nickchk?unickname=${unickname}`)
                .then(res => {
                    if (res.data == 1) {
                        //alert("닉네임 중복")
                        setUnickname('');
                    } else {
                        //alert("중복체크완료")
                        //nicknameRef.current.disabled = true
                        setImsinick('1')
                    }
                })
        }
    }
    const sms = () => {
        if (uhp.length != 11) {
            alert("휴대폰 번호 11자리를 입력해 주세요.")
            setUhp('');
        } else {
            axios.get('/login/hpchk?uhp=' + uhp)
                .then(res => {
                    if (res.data == 1) {
                        alert("이미 등록된 번호입니다.")
                        hpRef.current.disabled = null
                        setUhp('');
                    } else {
                        alert("인증 번호를 발송했습니다.")
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
                    alert("인증되었습니다.")
                    hpRef.current.disabled = true;
                    codeRef.current.disabled = true;
                    setImsihp('1');
                } else {
                    alert("인증 번호가 다릅니다.")
                }
            })
    }
    return (
        <form onSubmit={ouSubmitEvent}>
            <div className="MSmember">
                <div className="MSrectangle-parent">
                    <div className="MSgroup-child" onClick={ouSubmitEvent} />
                    <button className="MSgroup-child" style={{ color: 'white' }} type={'submit'}>가입하기</button>
                </div>
                <div className="MSgroup-parent">
                    <div className="MSparent">
                        <div className="MSdiv1">이름</div>
                        <div className="MSname-wrapper">
                            <input type={"text"} className="MSname" placeholder="이름을 입력해 주세요." required onChange={(e) => setUname(e.target.value)}
                                value={uname} ref={nameRef} />
                        </div>
                    </div>
                    <div className="MSgroup">
                        <div className="MSdiv1">생년월일</div>
                        <div className="MSname-wrapper">
                            <input className="MSname" type={"date"} required onChange={(e) => setUage(e.target.value)} value={uage} />
                        </div>
                    </div>
                    <div className="MScontainer">
                        <div className="MSdiv1">성별</div>
                        <div className="MSname-wrapper">
                            <select className="MSname" required onChange={(e) => setUgender(e.target.value)} value={ugender}>
                                <option value={''} hidden>성별</option>
                                <option value={"남"}>남</option>
                                <option value={"여"}>여</option>
                            </select>
                        </div>
                    </div>
                    <div className="MSgroup-div">
                        <div className="MSdiv1">골프 경력</div>
                        <div className="MSname-wrapper">
                            <select className="MSname" required onChange={(e) => setUcareer(e.target.value)} value={ucareer}>
                                <option hidden value={''}>경력</option>
                                <option value={"1년 미만"}>1년 미만</option>
                                <option value={"1~3년"}>1~3년</option>
                                <option value={"4~6년"}>4~6년</option>
                                <option value={"7~9년"}>7~9년</option>
                                <option value={"10년 이상"}>10년이상</option>
                            </select>
                        </div>
                    </div>
                    <div className="MSparent1">
                        <div className="MSdiv7">휴대폰 인증</div>
                        <div className="MSframe-parent">
                            <div className="MSframe-div">
                                <input type="number" oninput="this.value = this.value.replace(/[^0-9]/g, '')" className="MSnick-name" placeholder="숫자로만 입력해 주세요." 
                                    required ref={hpRef} value={uhp}
                                    onChange={(e) => {
                                        setUhp(e.target.value)
                                        setImsihp('0');
                                    }} />
                            </div>
                            <button className="MSgroup-item" type="button" onClick={sms}></button>
                            <div className="MSdiv9" onClick={sms}>발송</div>
                        </div>
                        <div className="MSframe-group">
                            <div className="MSframe-div">
                                <input type="text" className="MSnick-name" placeholder="인증 번호를 입력하세요." ref={codeRef}
                                    onChange={(e) => setCode(e.target.value)} />
                            </div>
                            <button type="button" className="MSgroup-item" onClick={codeChk}></button>
                            <div className="MSdiv9" onClick={codeChk}>확인</div>
                        </div>
                    </div>
                    <div className="MSparent2">
                        <div className="MSdiv1">닉네임</div>
                        <div className="MSframe-container">
                            <div className="MSframe-div">
                                <input className="MSnick-name" type={"text"} ref={nicknameRef} placeholder="닉네임을 입력해 주세요." 
                                required onChange={(e) => {
                                    setUnickname(e.target.value);
                                    setImsinick('0');
                                }}
                                    value={unickname} />
                            </div>
                            <div className="MSgroup-item" />
                            <div className="MSdiv9" onClick={nickchk}>중복 확인</div>
                        </div>
                        <div className="MSrectangle-group">
                            <div className="MSgroup-child1" />
                            {
                                imsinick==0?<div className="MSdiv14" style={{color:'#ED4C5C'}}></div>
                                :
                                <div className="MSdiv14" style={{color:'#449714'}}>사용 가능한 닉네임입니다.</div>
                            }
                            
                        </div>
                    </div>
                    <div className="MSparent3">
                        <div className="MSdiv1">비밀번호 재확인</div>
                        <div className="MSname-wrapper">
                            <input type={"password"} className="MSname" placeholder="비밀번호를 한 번 더 입력해 주세요." 
                            required onChange={(e) => setUpassok(e.target.value)} value={upassok} />
                        </div>
                        <div className="MSrectangle-container">
                            <div className="MSgroup-child1" />
                            {
                                upassok == ''?<div></div>:
                                upass != upassok ?
                                    <div className="MSdiv14" style={{color:'#ED4C5C'}}>비밀번호가 일치하지 않습니다.</div>
                                    :
                                    <div className="MSdiv14" style={{color:'#449714'}}>비밀번호가 일치합니다.</div>
                            }
                        </div>
                    </div>
                    <div className="MSparent4">
                        <div className="MSdiv1">비밀번호</div>
                        <div className="MSname-wrapper">
                            <input type={"password"} className="MSname" 
                            placeholder="비밀번호를 입력해 주세요." required onChange={(e) => setUpass(e.target.value)} value={upass} />
                        </div>
                        <div className="MSrectangle-parent1">
                            <div className="MSgroup-child3" />
                            <div className="MSdiv18">
                                {
                                    upass==''?
                                    <span></span>
                                    :!regex.test(upass)?
                                    <span style={{color:'#ED4C5C'}}>영문/숫자/특수문자 조합으로 8~16자, 대소문자 구분</span>
                                    :
                                    <span></span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="MSparent5">
                        <div className="MSdiv1">아이디</div>
                        <div className="MSframe-container">
                            <div className="MSframe-div">
                                <input type={"text"} className="MSnick-name" placeholder="아이디를 입력해 주세요." 
                                required ref={emailRef}
                                    onChange={(e) => {
                                        setUemail(e.target.value)
                                        setImsiEmail('0');
                                    }}
                                    value={uemail} />
                                </div>
                            <button className="MSgroup-item" type='button' onClick={emailchk}></button>
                            <div className="MSdiv9" onClick={emailchk}>중복 확인</div>
                        </div>
                        <div className="MSrectangle-group">
                            <div className="MSgroup-child1" />
                            {
                                !chk?<div></div>:
                                chk2?<div className="MSdiv14" style={{color:'#ED4C5C'}}>중복된 아이디 입니다</div>:
                                imsiEmail==0?<div className="MSdiv14" style={{color:'#ED4C5C'}}>아이디는 최소 5자리 이상이어야 합니다.</div>
                                :
                                <div className="MSdiv14" style={{color:'#449714'}}>사용 가능한 아이디입니다.</div>
                            }
                            
                        </div>
                    </div>
                </div>
                <img className="MSicon" alt="" onClick={()=>navi('/')}src={memberlogo} />
            </div>
        </form>
    );
};

export default Sign;