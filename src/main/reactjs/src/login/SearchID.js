import axios from 'axios';
import React, { useEffect, useState } from 'react';

function SearchID(props) {
    const [data, setData]=useState([]);
    const [unum, setUnum]=useState('');
    const [uhp, setUhp]=useState('');
    const [code, setCode] = useState('');
    const [chk, setChk] = useState(false);
    const [upass, setUpass]=useState('');
    const [upassok, setUpassok]=useState('');
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
    return (
        <div className='Taltae_div1'>
            휴대전화<br/>
            <input type="text" className="Taltae_textbox" placeholder="휴대폰번호" required
                   onChange={(e) => {
                       setUhp(e.target.value)
                   }}/><br/>
            <button type="button" onClick={sms}>전화 인증</button>
            <br/>
            <input type="text" className="Taltae_textbox" placeholder="인증코드"
                   onChange={(e) => setCode(e.target.value)}/><br/>
            <button type="button" onClick={codeChk}>인증확인</button>
            <br/>
            비밀번호<br/>
                    <input type={"password"} className={'Sign_textbox'} required onChange={(e) => setUpass(e.target.value)}
                           value={upass}/><br/><br/>

                    비밀번호 확인<br/>
                    <input type={"password"} className={'Sign_textbox'} required onChange={(e) => setUpassok(e.target.value)}
                           value={upassok}/>
                    {
                        upass == '' ? <div></div> : upass != '' && upass != upassok ? <div>비밀번호가 일치하지 않습니다</div> :
                            <div>비밀번호가 일치합니다</div>
                    }
            <button>탈퇴</button>
        </div>
    );
}

export default SearchID;