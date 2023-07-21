import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function NoticeDetail(props) {
    const [data,setData]=useState([]);
    const {nnum}=useParams();
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
        <div className='NForm_div1'>
            <div className='NForm_textbox'>{data.nsubject}</div>
                {data.nwriteday}
            <pre className='NForm_textarea'>{data.ncontent}</pre>
        </div>
    );
}

export default NoticeDetail;