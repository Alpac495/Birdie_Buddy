import React, { useEffect, useState } from 'react';
import './HpChange.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HpChange(props) {
    const [uhp, setUhp] = useState('');
    const [code, setCode] = useState('');
    const [unum, setUnum] = useState('');
    const [data, setData]=useState([]);
    const [chk, setChk] = useState(false);
    const navi = useNavigate();
    const getUserInfo=()=>{
        axios.get("/login/getUserInfo")
        .then(res=>{
            setData(res.data)
        })
    }
    useEffect(()=>{
        getUserInfo();
    },[])
    const sms = () => {
        if (uhp.length != 11) {
            alert("휴대폰번호 11자리를 입력해 주세요")
            setUhp('');
        } else {
            axios.get('/login/hpchk?uhp=' + uhp)
                .then(res => {
                    if (res.data == 1) {
                        alert("이미 등록된 번호입니다")
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
    const hpChange=()=>{
        axios.get('/login/hpChange?uhp='+uhp)
        .then(res=>{
            alert("휴대폰번호가 변경되었습니다")
            navi('/')
        })
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
    
    return (
        <div className='Taltae_div1'>
            새로운 휴대전화<br/>
            <input type="text" className="Taltae_textbox" placeholder="휴대폰번호" value={uhp} required
                   onChange={(e) =>{
                    setUhp(e.target.value)
                    }}/><br/>
            <button type="button" onClick={sms}>전화 인증</button>
            <br/>
            <input type="text" className="Taltae_textbox" placeholder="인증코드"
                   onChange={(e) => setCode(e.target.value)}/><br/>
            <button type="button" onClick={codeChk}>인증확인</button>
            <br/>
            <button onClick={hpChange}>번호변경</button>
        </div>
    );
}

export default HpChange;