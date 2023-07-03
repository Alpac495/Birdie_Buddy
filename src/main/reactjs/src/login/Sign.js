import React from 'react';
import axios from "axios";

function Sign(props) {
    const ouSubmitEvent =()=>{

    }
    return (
        <div className={'container-fluid'}>
            <form>
                이메일 입력<br/>
                <input type={"text"} /><br/>
                
                비밀번호 입력<br/>
                <input type={"password"} /><br/>
                
                비밀번호 확인<br/>
                <input type={"password"} /><br/>
                
                이름<br/>
                <input type={"text"} /><br/>
                
                닉네임<br/>
                <input type={"text"} /><br/>
                
                이메일 입력<br/>
                <input type={"text"} /><br/>

            </form>

        </div>
    );
}

export default Sign;