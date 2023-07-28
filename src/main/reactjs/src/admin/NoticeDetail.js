import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../header/Header";
import "./NoticeDetail.css";

function NoticeDetail(props) {
    const [data,setData]=useState([]);
    const {nnum}=useParams();
    const url = process.env.REACT_APP_NOTICE;

    const noticeDetail=()=>{
        axios.get("/admin/noticeDetail?nnum="+nnum)
        .then(res=>{
            console.log(res.data);
            setData(res.data);
        })
    }
    useEffect(()=>{
        noticeDetail();
    },[])

    
    return (
        <div className='nform_wrap'>
            <div className='header'>
                <Header/>
            </div>
            <div className='nform_title'>{data.nsubject}</div>
                {data.nwriteday}{data.ncate}
                <img alt='' src={`${url}${data.nphoto}`}/>
            <pre className='nform_content'>{data.ncontent}</pre>
        </div>
    );
}

export default NoticeDetail;