import React, {useState} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Sign(props) {
    const [uemail, setUemail]=useState('');
    const [upass,setUpass]=useState('');
    const [upassok,setUpassok]=useState('');
    const [uname,setUname]=useState('');
    const [unickname,setUnickname]=useState('');
    const [uage,setUage]=useState('');
    const [ugender,setUgender]=useState('1');
    const navi=useNavigate();



    const ouSubmitEvent =(e)=>{
        e.preventDefault();
        axios.post("/login/sign",{uemail,upass,uname,unickname,uage,ugender})
            .then(res=>{
                alert("회원가입 성공. 메인페이지로 이동");
                navi("/")
            })

    }
    return (
        <div className={'container-fluid'} style={{width:'360px',textAlign:'center'}}>
            <form onSubmit={ouSubmitEvent}>
                이메일<br/>
                <input type={"text"} required onChange={(e)=>setUemail(e.target.value)} value={uemail} /><br/><br/>

                비밀번호<br/>
                <input type={"password"} required onChange={(e)=>setUpass(e.target.value)} value={upass} /><br/><br/>
                
                비밀번호 확인<br/>
                <input type={"password"} required onChange={(e)=>setUpassok(e.target.value)} value={upassok}/>
                {
                    upass==''?<div></div>:upass!='' && upass!=upassok?<div>비밀번호가 일치하지 않습니다</div>:<div>비밀번호가 일치합니다</div>
                }
                
                
                
                이름<br/>
                <input type={"text"} required onChange={(e)=>setUname(e.target.value)} value={uname} /><br/><br/>
                
                닉네임<br/>
                <input type={"text"} required onChange={(e)=>setUnickname(e.target.value)} value={unickname} /><br/><br/>
                
                생년월일<br/>
                <input type={"date"} required onChange={(e)=>setUage(e.target.value)} value={uage} /><br/><br/>

                성별<br/>
                <select required onChange={(e)=>setUgender(e.target.value)} value={ugender}>
                    <option value={1}>남</option>
                    <option value={2}>여</option>
                </select><br/>

                휴대전화<br/>
                <input type={"text"} placeholder={'비워놔도됨'} /><br/>
                <button type={'submit'}>가입</button>
            </form>

        </div>
    );
}

export default Sign;