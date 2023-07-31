import React, { useEffect, useState } from 'react';
import './HpChange.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Back from "../image/Back.svg";
import hidelogo from "../image/hidelogo.svg";
import Header from "../header/Header";

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
            alert("휴대폰 번호 11자리를 입력해 주세요.")
            setUhp('');
        } else {
            axios.get('/login/hpchk?uhp=' + uhp)
                .then(res => {
                    if (res.data == 1) {
                        alert("이미 등록된 번호입니다.")
                        setUhp('');
                    } else {
                        alert("인증 번호를 발송했습니다.")
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
        if(!chk){
            alert("휴대폰 인증을 진행해 주세요.")
            return;
        }
        axios.get('/login/hpChange?uhp='+uhp)
        .then(res=>{
            alert("휴대폰 번호가 변경되었습니다.")
            navi('/birdie_buddy')
        })
    }

    const codeChk = () => {
        axios.get('/login/codechk?uhp=' + uhp + '&code=' + code)
            .then(res => {
                if (res.data) {
                    alert("인증되었습니다.")
                    setChk(true);
                } else {
                    alert("인증 번호가 다릅니다.")
                }
            })
    }
    
    return (
        <div className="CCphonenumberchange">
            <Header/>
          <div className="CCrectangle-parent">
            <div className="CCgroup-child" onClick={hpChange} />
            <div className="CCdiv" onClick={hpChange}>휴대폰 번호 변경하기</div>
          </div>
          <img className="CCbirdie-buddy" alt="" src={hidelogo} />
          <div className="CCphonenumberchange-child" />
          <div className="CCphonenumberchange-item" />
          <div className="CCparent">
            <div className="CCdiv1">휴대폰 번호 변경</div>
            <img className="CCicon-arrow-left" onClick={()=>navi('/mypage/setting')} alt="" src={Back} />
          </div>
          <div className="CCgroup">
            <div className="CCdiv2">새로운 휴대폰 번호</div>
            <div className="CCrectangle-group">
              <div className="CCgroup-item" />
              <input type="number" oninput="this.value = this.value.replace(/[^0-9]/g, '')" 
              className="CCdiv3" placeholder="공백 또는 ‘-’ 없이 숫자로 입력해주세요." value={uhp} required
                   onChange={(e) =>{
                    setUhp(e.target.value)
                    }}/>
              <div className="CCgroup-inner" onClick={sms} />
              <div className="CCdiv4" onClick={sms}>발송</div>
            </div>
          </div>
          <div className="CCcontainer">
            <div className="CCdiv5">인증 번호</div>
            <div className="CCrectangle-group">
              <div className="CCgroup-item" />
              <input type="number" oninput="this.value = this.value.replace(/[^0-9]/g, '')" className="CCdiv3" placeholder="인증 번호를 입력하세요."
                   onChange={(e) => setCode(e.target.value)}/>
              <div className="CCgroup-inner" onClick={codeChk} />
              <div className="CCdiv4" onClick={codeChk}>확인</div>
            </div>
          </div>
          <div className="CCdiv8">변경할 휴대폰 번호 인증을 해주세요.</div>
        </div>
      );
    };

export default HpChange;