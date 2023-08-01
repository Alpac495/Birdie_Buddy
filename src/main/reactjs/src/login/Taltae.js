import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Taltae.css';
import xxx from "../image/xxx.svg";
import checknomal from "../image/check.svg";
import checkok from "../image/checkok.svg";
import hidelogo from "../image/hidelogo.svg";
import Header from '../header/Header';

function Taltae(props) {
    const [uhp, setUhp] = useState('');
    const [code, setCode] = useState('');
    const [unum, setUnum] = useState('');
    const [chk, setChk] = useState(false);
    const [chk2, setChk2] = useState(false);
    const navi = useNavigate();

    const chkClick = () => {
        setChk2((prevChk2) => !prevChk2);
    };

    const unumchk = () => {
        axios.get("/login/unumChk")
            .then(res => {
                console.log(res.data)
                setUnum(res.data)
            })
    }

    useEffect(() => {
        unumchk();
    }, []);

    const sms = () => {
        if (uhp.length != 11) {
            alert("휴대폰번호 11자리를 입력해 주세요")
            setUhp('');
        } else {
            axios.get("/login/unumHpchk?unum=" + unum + "&uhp=" + uhp)
                .then(res => {
                    if (res.data == 0) {
                        alert("회원정보와 휴대폰번호가 일치하지 않습니다")
                        setUhp('');
                    } else {
                        axios.get("/login/smsSend?uhp=" + uhp)
                            .then(res => {
                                alert("번호로 코드 전송")
                            })
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
    const taltae = () => {
        if (chk == false) {
            alert("인증을 먼저 진행해주세요")
            return;
        } else if (!chk2) {
            alert("약관에 동의해 주세요")
        } else if (window.confirm("회원탈퇴를 진행하시겠습니까?")) {
            axios.get('/login/taltae?unum=' + unum)
                .then(res => {
                    alert("탈퇴완료")
                    navi("/birdie_buddy")
                })
        } else {
            alert("취소")
        }
    }
    return (
        <>
            <div className="TTmemberdelete">
            <Header />
                <div className="TTdiv">
                    <ul className="TTul">
                        <li className="TTli">
                            <span className="TTspan">{`회원 탈퇴와 동시에 `}</span>
                            <span className="TTspan1">
                                개인정보 및 모든 이용정보가 초기화되어 삭제
                            </span>
                            <span>되므로 절대 복구 불가합니다.</span>
                        </li>
                        <li className="TTli">
                            <span>
                                가입 시 기제한 모든 개인정보 및 서비스 이용 내역 (조인, 양도,
                                스토리 게시글 등)
                            </span>
                        </li>
                        <li className="TTli">
                            <span>
                                탈퇴한 개인정보는 관련 법령에 따라 즉시 파기되며, 전자 상거래법에
                                의거하여 결제 내역이 있을 경우 결제 내역은 5년간 별도 보환합니다.
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="TTrectangle-parent">
                    <div className="TTgroup-child" />
                    <div className="TTdiv1">회원 탈퇴</div>
                </div>
                <b className="TTb">회원 탈퇴 주의 사항</b>
                <div className="TTrectangle-group">
                    <div className="TTgroup-item" onClick={taltae} />
                    <div className="TTdiv2" onClick={taltae}>탈퇴하기</div>
                </div>
                <img
                    className="TTicon-close-outline"
                    alt=""
                    src={xxx}
                    onClick={() => navi('/mypage/setting')}
                />
                <div className="TTparent">
                    <div className="TTdiv3">인증 휴대폰 번호</div>
                    <div className="TTrectangle-container">
                        <div className="TTgroup-inner" />
                        <input type="text" className="TTdiv4" placeholder="공백 또는 ‘-’ 없이 숫자로 입력해주세요." required
                            onChange={(e) => {
                                setUhp(e.target.value)
                            }} />
                        <div className="TTrectangle-div" onClick={sms} />
                        <div className="TTdiv5" onClick={sms}>발송</div>
                    </div>
                </div>
                <div className="TTgroup">
                    <div className="TTdiv6"></div>
                    <div className="TTrectangle-container">
                        <div className="TTgroup-inner" />
                        <input type="text" className="TTdiv4" placeholder="인증코드인증 번호를 입력하세요."
                            onChange={(e) => setCode(e.target.value)} />
                        <div className="TTrectangle-div" onClick={codeChk} />
                        <div className="TTdiv5" onClick={codeChk}>확인</div>
                    </div>
                </div>
                <img
                    className="TTbirdie-buddy"
                    alt=""
                    src={hidelogo}
                />
                <div className="TTcontainer">
                    <div className="TTdiv9">
                        위 내용을 모두 확인하였으며, 이에 동의합니다.
                    </div>
                    {
                        !chk2 ?
                            <img
                                className="TTicon-check-circle"
                                alt=""
                                src={checknomal}
                                onClick={chkClick}
                            />
                            :
                            <img
                                className="TTicon-check-circle"
                                alt=""
                                src={checkok}
                                onClick={chkClick}
                            />
                    }

                </div>
            </div>
        </>
    );
}

export default Taltae;