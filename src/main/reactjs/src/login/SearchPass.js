import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './SearchPass.css';
import Back from "../image/Back.svg";
import hidelogo from "../image/hidelogo.svg";
import Header from '../header/Header';

function SearchPass(props) {
    const [uhp, setUhp] = useState('');
    const [code, setCode] = useState('');
    const [uemail, setUemail] = useState('');
    const [chk, setChk] = useState(false);
    const [chk2, setChk2] = useState(false);
    const [chk3, setChk3] = useState(false);
    const [newpass, setNewpass] = useState('');
    const [newpass2, setNewpass2] = useState('');
    const navi = useNavigate();
    const uemailRef = useRef(null);
    const hpRef = useRef(null);
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

    const sms = () => {
        if (uhp.length != 11) {
            alert("휴대폰번호 11자리를 입력해 주세요")
            setUhp('');
        } else {
            axios.get("/login/getUserUhp?uhp=" + uhp)
                .then(res => {
                    if (res.data == "no") {
                        alert("입력한 휴대폰 번호로 가입된 아이디가 없습니다.")
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
                    alert("인증 되었습니다.")
                    setChk(true);
                } else {
                    alert("인증 번호가 일치하지 않습니다.")
                }
            })
    }
    const SearchPass = () => {
        if (chk == false || uemail == '') {
            alert("휴대폰 번호 인증을 해주세요.")
        } else {
            axios.get("/login/searchPass?uhp=" + uhp + "&uemail=" + uemail)
                .then(res => {
                    if (res.data) {
                        alert("확인되었습니다.")
                        setChk3(true);
                        uemailRef.current.disabled = true
                        hpRef.current.disable = true
                    } else {
                        alert("입력한 휴대폰 번호로 가입된 아이디가 아닙니다.")
                    }
                })
        }
    }
    const nextbtn =()=>{
        if(chk){
            setChk2(true);
        } else {
            alert("인증을 먼저 진행해주세요.")
        }
        
    }
    const passChnage = () => {
        if (newpass != newpass2) {
            alert("새로운 비밀번호가 일치하지 않습니다.")
            return;
        } else if (!regex.test(newpass)) {
            alert("비밀번호는 8자리 이상, 16자리 이하로 영어/숫자/특수문자를 포함해야 합니다.");
            return;
        }
        axios.get('/login/passChange2?upass=' + newpass + "&uemail=" + uemail)
            .then(res => {
                alert("비밀번호가 변경되었습니다. \n새로운 비밀번호로 로그인해 주세요.")
                axios.get('/login/logout')
                    .then(res => {
                        navi('/')
                    })
            })
    }
    if (!chk2) {
        return (
            <div className="PC1passwordsearch1">
                <Header/>
                <div className="PC1passwordsearch1-child" />
                <div className="PC1parent">
                    <div className="PC1div">비밀번호 찾기</div>
                    <img className="PC1icon-arrow-left" onClick={()=>navi('/login/login')} alt="" src={Back} />
                </div>
                <div className="PC1div1">
                    <span className="PC1txt">
                        <p className="PC1p">
                            <span className="PC1span">비밀번호</span>
                            <span className="PC1span1">{`를 찾고자 하는 `}</span>
                            <span className="PC1span">아이디와 휴대폰 인증</span>
                            <span>을 해주세요.</span>
                        </p>
                        <p className="PC1p1">
                            <span>{`인증 확인 후 `}</span>
                            <span className="PC1span">새로운 비밀번호</span>
                            <span className="PC1span1">를 받으실 수 있습니다.</span>
                        </p>
                    </span>
                </div>
                <div className="PC1div2">비밀번호를 잊으셨나요?</div>
                <div className="PC1rectangle-parent">
                    <div className="PC1group-child"onClick={nextbtn}/>
                    <div className="PC1div3"onClick={nextbtn}>다음</div>
                </div>
                <img className="PC1birdie-buddy" alt="" src={hidelogo} />
                <div className="PC1group">
                    <div className="PC1div4" onClick={() => { navi('/login/searchID') }}>{`아이디 찾기 ->`}</div>
                    <div className="PC1div5">아이디를 잊으셨나요?</div>
                    <div className="PC1group-item" />
                </div>
                <div className="PC1container">
                    <div className="PC1div6">휴대폰 번호</div>
                    <div className="PC1rectangle-group">
                        <div className="PC1group-inner" />
                        <input type="number" oninput="this.value = this.value.replace(/[^0-9]/g, '')" className="PC1div7" ref={hpRef} placeholder="공백 또는 ‘-’ 없이 숫자로 입력해주세요" required value={uhp}
                            onChange={(e) => {
                                setUhp(e.target.value)
                            }} />
                        <button type="button" className="PC1rectangle-div" onClick={sms}></button>
                        <div className="PC1div8" onClick={sms}>발송</div>
                    </div>
                </div>
                <div className="PC1group-div">
                    <div className="PC1div9">인증 번호</div>
                    <div className="PC1rectangle-group">
                        <div className="PC1group-inner" />
                        <input type="text" className="PC1div7" placeholder="인증 번호를 입력하세요."
                            onChange={(e) => setCode(e.target.value)} />
                        <div className="PC1rectangle-div" />
                        <button type="button" onClick={codeChk}></button>
                        <div className="PC1div8" onClick={codeChk}>확인</div>
                    </div>
                </div>
                <div className="PC1parent1">
                    <div className="PC1div9">아이디</div>
                    <div className="PC1rectangle-group">
                        <div className="PC1group-inner" />
                        <input className="PC1div7" type="text" placeholder="아이디를 입력하세요." ref={uemailRef} value={uemail}
                            onChange={(e) => {
                                setUemail(e.target.value)
                            }} />
                        <button className="PC1rectangle-div" onClick={SearchPass}></button>
                        <div className="PC1div8" onClick={SearchPass}>확인</div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="PC2passwordsearch2">
                <Header/>
                <div className="PC2div">
                    <ul className="PC2ul">
                        <li className="PC2li">
                            회원님의 비밀번호는 운영자도 알 수 없도록 암호화 되어 있습니다.
                        </li>
                        <li className="PC2li">따라서 새로운 비밀번호를 등록하셔야 합니다.</li>
                        <li className="PC2li">영문/숫자/특수문자 조합으로 8~16자, 대소문자 구분</li>
                    </ul>
                </div>
                <div className="PC2rectangle-parent">
                    <div className="PC2group-child" />
                    <div className="PC2div1" onClick={passChnage}>비밀번호 변경하기</div>
                </div>
                <div className="PC2group-parent">
                    <div className="PC2rectangle-group">
                        {/* <div className="PC2group-item" /> */}
                        {/* <div className="PC2div2">새로운 비밀번호를 입력하세요.</div> */}
                        <input type="password" className="PC2group-item" placeholder="새로운 비밀번호를 입력하세요."
                            onChange={(e) => {
                                setNewpass(e.target.value)
                            }}
                            value={newpass} />
                    </div>
                    <div className="PC2div3">새로운 비밀번호</div>
                </div>
                <div className="PC2parent">
                    <div className="PC2div4">비밀번호 재확인</div>
                    <div className="PC2rectangle-container">
                        {/* <div className="PC2group-item" />
                    <div className="PC2div2">새로운 비밀번호를 한번 더 입력하세요.</div> */}
                        <input type={"password"} className="PC2group-item" placeholder="새로운 비밀번호를 한번 더 입력하세요."
                            onChange={(e) => {
                                setNewpass2(e.target.value)
                            }}
                            value={newpass2} />
                    </div>
                </div>
                <img className="PC2birdie-buddy" alt="" src={hidelogo} />
                <div className="PC2passwordsearch2-child" />
                <div className="PC2group">
                    <div className="PC2div6">비밀번호 변경</div>
                    <img className="PC2icon-arrow-left" alt="" onClick={()=>navi('/login/login')} src={Back} />
                </div>
            </div>
        )
    }
}

export default SearchPass;