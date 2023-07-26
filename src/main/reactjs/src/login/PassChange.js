import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './PassChange.css';
import { useNavigate } from 'react-router-dom';

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


    const passChk = () => {
        axios.get('/login/passChk?upass=' + upass)
            .then(res => {
                console.log(res.data);
                if (res.data) {
                    alert("인증 성공")
                    setChk(true);
                } else {
                    alert("현재 비밀번호가 일치하지 않습니다")
                }
            })
    }
    const passChnage = () => {
        if (newpass != imsipass) {
            alert("새로운 비밀번호가 일치하지 않습니다")
            return;
        } else if (!regex.test(upass)) {
            alert("비밀번호는 8자리 이상, 16자리 이하로 영어/숫자/특수문자를 포함해야 합니다.");
            return;
        } else {
            if (!chk) {
                alert("현재 비밀번호 인증을 진행해주세요")
                return;
            }
        }
        axios.get('/login/passChange?upass=' + newpass)
            .then(res => {
                alert("비밀번호가 변경 완료되었습니다. 새로운 비밀번호로 로그인 해주세요")
                axios.get('/login/logout')
                    .then(res => {
                        navi('/')
                    })
            })
    }




    return (
        <div className='PassChange_div1'>
            현재비밀번호<br />
            <input type="text" className="PassChange_textbox" placeholder="현재 비밀번호" required
                onChange={(e) => {
                    setUpass(e.target.value)
                }} />
            <button type="button" onClick={passChk}>비밀번호확인</button>
            <br />
            새로운 비밀번호<br />
            <input type={"password"} className={'PassChange_textbox'} required onChange={(e) => setNewpass(e.target.value)}
                value={newpass} /><br /><br />

            비밀번호 확인<br />
            <input type={"password"} className={'PassChange_textbox'} required onChange={(e) => setImsipass(e.target.value)}
                value={imsipass} />
            {
                newpass == '' ? <div>16자리 이하로 영어/숫자를 포함해야 합니다</div> : newpass != '' && newpass != imsipass ? <div>비밀번호가 일치하지 않습니다</div> :
                    <div>비밀번호가 일치합니다</div>
            }
            <button onClick={passChnage}>비밀번호변경</button>
        </div>
    );
}

export default PassChange;