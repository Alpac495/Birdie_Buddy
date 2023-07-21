import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NoticeList(props) {
    const navi=useNavigate();
    const [data,setData]=useState([]);
    const noticeList=()=>{
        axios.get("/admin/noticeList")
        .then(res=>{
            console.log(res.data)
            setData(res.data);
        })
    }
    const noticeDetail =(nnum)=>{
        navi(`/admin/noticedetail/${nnum}`)
    }
    useEffect(()=>{
        noticeList();
    },[])
    return (
        <div>
            {
                data && 
                data.map((item,idx)=>
                <div key={idx}>
                <h1 onClick={()=>noticeDetail(item.nnum)}>{item.nsubject}</h1>
                <div>{item.nwriteday}</div>
                <br/>
                </div>
                )
            }
        </div>
    );
}

export default NoticeList;