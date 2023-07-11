import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

function YangdoList(props) {

    const [data, setData] = useState('');
    const navi = useNavigate();

    const onWriteButtonEvent=()=>{
        if(sessionStorage.unum == null){
            alert("로그인을 해주세요");
            navi("/login/login");
        }else{
            navi("/yangdo/form");
        }
    }

    return (
        <div>
            <button type='button' onClick={onWriteButtonEvent}>글쓰기</button>
            <br/>

            <h2>양도 리스트</h2>
        </div>
    );
}

export default YangdoList;
