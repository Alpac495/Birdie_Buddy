import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchID.css';
import SID1 from './SID1.js';
import SID2 from './SID2';

function SearchID(props) {
    const [uhp, setUhp] = useState('');
    const [code, setCode] = useState('');
    const [unum, setUnum] = useState('');
    const [data, setData] = useState('');
    const [uemail, setUemail] = useState('');
    const [chk, setChk] = useState(false);
    const navi = useNavigate();

    const sms = () => {
        if (uhp.length != 11) {
            alert("휴대폰번호 11자리를 입력해 주세요")
            setUhp('');
        } else {
            axios.get("/login/getUserUhp?uhp=" + uhp)
                .then(res => {
                    console.log(res.data.length)
                    if (res.data == '') {
                        alert("휴대폰번호와 일치하는 ID가 없습니다")
                        setUhp('');
                    } else {
                        axios.get('/login/smsSend?uhp=' + uhp)
                            .then(response => {
                                alert("코드발송")
                                axios.get("/login/getUserUhp?uhp=" + uhp)
                                .then(res=>{
                                    setData(res.data);
                                    console.log(res.data)
                                })
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
    if (!chk) {
        return (
            <SID1 uhp={uhp} setUhp={setUhp} code={code} setCode={setCode} sms={sms} codeChk={codeChk} navi={navi} />
        )
    } else {
        return (
            <SID2 data={data} navi={navi} />
        )
    }

}

export default SearchID;