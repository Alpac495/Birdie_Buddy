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
    const [chk2, setChk2] = useState(false);
    const navi = useNavigate();

    const sms = () => {
        if (uhp.length != 11) {
            alert("휴대폰 번호 11자리를 입력해 주세요.")
            setUhp('');
        } else {
            axios.get("/apilogin/getUserUhp?uhp=" + uhp)
                .then(res => {
                    console.log(res.data.length)
                    if (res.data == '') {
                        alert("입력한 휴대폰 번호로 가입된 아이디가 없습니다.")
                        setUhp('');
                    } else {
                        axios.get('/apilogin/smsSend?uhp=' + uhp)
                            .then(response => {
                                alert("인증 번호를 발송했습니다.")
                                axios.get("/apilogin/getUserUhp?uhp=" + uhp)
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
        axios.get('/apilogin/codechk?uhp=' + uhp + '&code=' + code)
            .then(res => {
                if (res.data) {
                    alert("인증 되었습니다.")
                    setChk2(true);
                } else {
                    alert("인증 번호가 일치하지 않습니다.")
                }
            })
    }
    const nextbtn=()=>{
        if(chk2){
            setChk(true);
        } else {
            alert("인증을 먼저 진행해 주세요.")
        }
        
    }
    if (!chk) {
        return (
            <SID1 uhp={uhp} setUhp={setUhp} code={code} setCode={setCode} sms={sms} codeChk={codeChk} navi={navi} nextbtn={nextbtn}/>
        )
    } else {
        return (
            <SID2 data={data} navi={navi} />
        )
    }

}

export default SearchID;