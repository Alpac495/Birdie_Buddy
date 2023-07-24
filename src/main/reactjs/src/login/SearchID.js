import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchID.css';

function SearchID(props) {
    const [uhp, setUhp] = useState('');
    const [code, setCode] = useState('');
    const [unum, setUnum] = useState('');
    const [uemail, setUemail] = useState('');
    const [chk, setChk] = useState(false);
    const navi = useNavigate();
    
    const sms = () => {
        if (uhp.length != 11) {
            alert("휴대폰번호 11자리를 입력해 주세요")
            setUhp('');
        } else {
            axios.get("/login/getUserUhp?uhp="+uhp)
                .then(res=>{
                    if(res.data=="no"){
                        alert("휴대폰번호와 일치하는 ID가 없습니다")
                        setUhp('');
                    } else {
                       setUemail(res.data);
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
    const SearchID =()=>{
        if(chk==false){
            alert("인증을 먼저 진행해주세요")
        } else {
            alert("휴대폰번호로 등록된 ID는 "+uemail+" 입니다")
        }
    }
    return (
        <div className='SearchID_div1'>
            휴대전화<br/>
            <input type="text" className="SearchID_textbox" placeholder="휴대폰번호" required value={uhp}
                   onChange={(e) => {
                       setUhp(e.target.value)
                   }}/><br/>
            <button type="button" onClick={sms}>전화 인증</button>
            <br/>
            <input type="text" className="SearchID_textbox" placeholder="인증코드"
                   onChange={(e) => setCode(e.target.value)}/><br/>
            <button type="button" onClick={codeChk}>인증확인</button>
            <br/>
            <button onClick={SearchID}>ID조회</button>
        </div>
    );
}

export default SearchID;