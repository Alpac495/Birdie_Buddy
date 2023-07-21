import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Taltae(props) {
    const [uhp, setUhp] = useState('');
    const [code, setCode] = useState('');
    const [unum, setUnum] = useState(0);
    const [chk, setChk] = useState(false);
    const navi = useNavigate();

    const unumchk= async ()=>{
        await axios.get("/login/unumChk?unum=" + unum)
            .then(res=>{
                console.log(res.data)
                setUnum(res.data)
            })
    }

    useEffect(() => {
        const fetchUnum = async () => {
            await unumchk();
        };
        fetchUnum();
    }, []);

    const sms = () => {
        if (uhp.length != 11) {
            alert("휴대폰번호 11자리를 입력해 주세요")
            setUhp('');
        } else {
            axios.get("/login/hpchk?unum="+unum+"&uhp="+uhp)
                .then(res=>{
                    if(res.data==0){
                        alert("회원정보와 휴대폰번호가 일치하지 않습니다")
                    } else {
                        axios.get("/login/smsSend?uhp="+uhp)
                            .then(res=>{
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
    const taltae =()=>{
        if(chk==false){
            alert("인증을 먼저 진행해주세요")
        } else {
            if(window.confirm("회원탈퇴를 진행하시겠습니까?")){
                axios.get('/login/taltae?unum='+unum)
                    .then(res=>{
                        alert("탈퇴완료")
                        navi("/")
                    })
            } else {
                alert("취소")
            }
        }
    }
    return (
        <div>
            휴대전화<br/>
            <input type="text" className="textbox" placeholder="휴대폰번호" required
                   onChange={(e) => {
                       setUhp(e.target.value)
                   }}/><br/>
            <button type="button" onClick={sms}>전화 인증</button>
            <br/>
            <input type="text" className="textbox" placeholder="인증코드"
                   onChange={(e) => setCode(e.target.value)}/><br/>
            <button type="button" onClick={codeChk}>인증확인</button>
            <br/>
            <button onClick={taltae}>탈퇴</button>
        </div>
    );
}

export default Taltae;