import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './SearchPass.css';

function SearchPass(props) {
    const [uhp, setUhp] = useState('');
    const [code, setCode] = useState('');
    const [unum, setUnum] = useState('');
    const [uemail, setUemail] = useState('');
    const [chk, setChk] = useState(false);
    const [chk2, setChk2] = useState(false);
    const [newpass, setNewpass] = useState('');
    const [newpass2, setNewpass2] = useState('');
    const navi = useNavigate();
    const uemailRef = useRef(null);
    const hpRef = useRef(null);
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{1,16}$/;

    const sms = () => {
        if (uhp.length != 11) {
            alert("휴대폰번호 11자리를 입력해 주세요")
            setUhp('');
        } else {
            axios.get("/login/getUserUhp?uhp=" + uhp)
                .then(res => {
                    if (res.data == "no") {
                        alert("가입된 정보가 없습니다")
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
                    setChk(true);
                } else {
                    alert("코드가 일치하지 않습니다")
                }
            })
    }
    const SearchPass = () => {
        if (chk == false || uemail == '') {
            alert("인증을 먼저 진행해주세요")
        } else {
            axios.get("/login/searchPass?uhp=" + uhp + "&uemail=" + uemail)
                .then(res => {
                    if (res.data) {
                        alert("새로운 비밀번호를 입력해 주세요")
                        setChk2(true);
                        uemailRef.current.disabled = true
                        hpRef.current.disable = true

                    } else {
                        alert("입력하신 휴대폰번호에 등록된 ID와 입력하신 ID가 일치하지 않습니다")
                    }
                })
        }
    }
    const passChnage = () => {
        if (newpass != newpass2) {
            alert("새로운 비밀번호가 일치하지 않습니다")
            return;
        } else if (!regex.test(newpass)) {
            alert("비밀번호는 16자리 이하로 영어/숫자를 포함해야 합니다.");
            return;
        }
        axios.get('/login/passChange2?upass=' + newpass + "&uemail=" + uemail)
            .then(res => {
                alert("비밀번호가 변경 완료되었습니다. 새로운 비밀번호로 로그인 해주세요")
                axios.get('/login/logout')
                    .then(res => {
                        navi('/')
                    })
            })
    }


    return (
        <div className='SearchPass_div1'>
            휴대전화<br />
            <input type="text" className="SearchPass_textbox" ref={hpRef} placeholder="휴대폰번호" required value={uhp}
                onChange={(e) => {
                    setUhp(e.target.value)
                }} /><br />
            <button type="button" onClick={sms}>전화 인증</button>
            <br />
            <input type="text" className="SearchPass_textbox" placeholder="인증코드"
                onChange={(e) => setCode(e.target.value)} /><br />
            <button type="button" onClick={codeChk}>인증확인</button>
            <br />
            <input type="text" className="SearchPass_textbox" placeholder="ID입력" ref={uemailRef} value={uemail}
                onChange={(e) => {
                    setUemail(e.target.value)
                }} /><br />
            <button onClick={SearchPass}>새로운 Pass 발급</button>
            <br />
            {
                chk2 ?
                    <>
                        <input type="password" className="SearchPass_textbox" placeholder="새로운 비밀번호"
                            onChange={(e) => {
                                setNewpass(e.target.value)
                            }}
                            value={newpass} />
                        <br />
                        <input type={"password"} className={'SearchPass_textbox'} placeholder="비밀번호 확인"
                            onChange={(e) => {
                                setNewpass2(e.target.value)
                            }}
                            value={newpass2} />
                        {
                            newpass == '' ? <div>16자리 이하로 영어/숫자를 포함해야 합니다</div> : newpass != '' && newpass != newpass2 ?
                                <div>비밀번호가 일치하지 않습니다</div> :
                                <>
                                    <div>비밀번호가 일치합니다</div>
                                    <br />
                                </>
                        }
                        <button onClick={passChnage}>비밀번호 변경</button>


                    </>
                    :
                    <div></div>
            }
        </div>
    );
}

export default SearchPass;