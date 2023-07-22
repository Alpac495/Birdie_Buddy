import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './PassChange.css';

function PassChange(props) {
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
    const passChk = () => {
        axios.get('/login/passChk?upass='+upass)
            .then(res => {
                if (res.data) {
                    alert("인증 성공")
                    setChk(true);
                } else {
                    alert("현재 비밀번호가 일치하지 않습니다")
                }
            })
    }
    return (
        <div className='SearchID_div1'>
            현재비밀번호<br/>
            <input type="text" className="SearchID_textbox" placeholder="현재 비밀번호" required
                   onChange={(e) => {
                       setUpass(e.target.value)
                   }}/><br/>
            <button type="button" onClick={passChk}>인증확인</button>
            <br/>
            비밀번호<br/>
                    <input type={"password"} className={'SearchID_textbox'} required onChange={(e) => setUpass(e.target.value)}
                           value={upass}/><br/><br/>

                    비밀번호 확인<br/>
                    <input type={"password"} className={'SearchID_textbox'} required onChange={(e) => setUpassok(e.target.value)}
                           value={upassok}/>
                    {
                        upass == '' ? <div></div> : upass != '' && upass != upassok ? <div>비밀번호가 일치하지 않습니다</div> :
                            <div>비밀번호가 일치합니다</div>
                    }
            <button>탈퇴</button>
        </div>
    );
}

export default PassChange;