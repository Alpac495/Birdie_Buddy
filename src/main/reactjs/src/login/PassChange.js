import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './PassChange.css';
import { useNavigate } from 'react-router-dom';
import Back from "../image/Back.svg";
import hidelogo from "../image/hidelogo.svg";
import Header from '../header/Header';

function PassChange(props) {
    const [data, setData] = useState([]);
    const [unum, setUnum] = useState('');
    const [uhp, setUhp] = useState('');
    const [code, setCode] = useState('');
    const [chk, setChk] = useState(false);
    const [upass, setUpass] = useState('');
    const [newpass, setNewpass] = useState('');
    const [imsipass, setImsipass] = useState('');
    const [upassok, setUpassok] = useState('');
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    const navi = useNavigate();
    const getUserInfo = () => {
        axios.get("/login/getUserInfo")
            .then(res => {
                setData(res.data)
            })
    }
    useEffect(() => {
        getUserInfo();
    }, [])

    const passChnage = () => {
        axios.get('/login/passChk?upass=' + upass)
            .then(res => {
                console.log(res.data);
                if (!res.data) {
                    alert("현재 비밀번호가 일치하지 않습니다.")
                    return;
                } else if (newpass != imsipass) {
                    alert("새로운 비밀번호가 일치하지 않습니다.")
                    return;
                } else if (!regex.test(newpass)) {
                    alert("비밀번호는 8자리 이상, 16자리 이하로 영어/숫자/특수문자를 포함해야 합니다.");
                    return;
                } else {
                    axios.get('/login/passChange?upass=' + newpass)
                        .then(res => {
                            alert("비밀번호가 변경되었습니다. \n새로운 비밀번호로 로그인해 주세요.")
                            axios.get('/login/logout')
                                .then(res => {
                                    navi('/login/login')
                                })
                        })
                }

            })

    }




    return (
        <div className="PCpasswordchange">
            <Header/>
            <div className="PCdiv">
                <ul className="PCul">
                    <li className="PCli">
                        회원님의 비밀번호는 운영자도 알 수 없도록 암호화 되어 있습니다
                    </li>
                    <li className="PCli">따라서 새로운 비밀번호를 등록하셔야 합니다</li>
                    <li className="PCli">영문/숫자/특수문자 조합으로 8~16자, 대소문자 구분</li>
                </ul>
            </div>
            <div className="PCrectangle-parent">
                <div className="PCgroup-child" onClick={passChnage} />
                <div className="PCdiv1" onClick={passChnage}>비밀번호 변경하기</div>
            </div>
            <div className="PCgroup-parent">
                <div className="PCrectangle-group">
                    <div className="PCgroup-item" />
                    <input type={"password"} className="PCdiv2" required 
                    placeholder='새로운 비밀번호를 입력하세요.' onChange={(e) => setNewpass(e.target.value)}
                        value={newpass} />
                </div>
                <div className="PCdiv3">새로운 비밀번호</div>
            </div>
            <div className="PCparent">
                <div className="PCdiv4">현재 비밀번호</div>
                <div className="PCrectangle-container">
                    <div className="PCgroup-item" />
                    <input type={"password"} className="PCdiv2" placeholder="현재 비밀번호를 입력하세요." required
                        onChange={(e) => {
                            setUpass(e.target.value)
                        }} />
                </div>
            </div>
            <div className="PCgroup">
                <div className="PCdiv4">비밀번호 재확인</div>
                <div className="PCrectangle-container">
                    <div className="PCgroup-item" />
                    <input type={"password"} className="PCdiv2" placeholder="새로운 비밀번호를 한번 더 입력하세요." required onChange={(e) => setImsipass(e.target.value)}
                        value={imsipass} />
                </div>
            </div>
            <img className="PCbirdie-buddy" alt="" src={hidelogo} />
            <div className="PCpasswordchange-child" />
            <div className="PCcontainer">
                <div className="PCdiv8">비밀번호 변경</div>
                <img className="PCicon-arrow-left" onClick={()=>navi("/mypage/setting/")}alt="" src={Back} />
            </div>
        </div>
    );
}

export default PassChange;