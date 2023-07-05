import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Axios from "axios";

function FriendDetail(props) {
    const [dto,setDto]=useState('');
    const {funum}=useParams('');

    const selectData=useCallback(()=>{
        const url=`/friend/detail?funum=${funum}`;
        Axios({
            type:'get',
            url,
            // headers: {Authorization:`Bearer ${sessionStorage.token}`},
        }).then(res=>{
            setDto(res.data);
            console.log(res.data)
        })
    },[])

    useEffect(()=>{
            selectData();
    },[selectData]);

    return (
        <div>
            닉네임 : {dto.unickname} <br/>
            생년월일 : {dto.uage} <br/>
            성별 : {dto.ugender==="1"?"남자":"여자"}

        </div>
    );
}

export default FriendDetail;