import React, { useState } from 'react';
import './NoticeForm.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function NoticeForm(props) {
    const [nsubject, setNsubject]=useState('');
    const [ncontent, setNcontent]=useState('');
    const navi = useNavigate();
    const submit=()=>{
        axios.post('/admin/noticeWrite',{nsubject, ncontent})
        .then(res=>{
            navi("/admin/noticelist")
        })
    }



    return (
        <div className='nform_wrap'>
            <input className='nform_subject' type='text' placeholder='제목' onChange={(e)=>setNsubject(e.target.value)} />
            <br/>
            <textarea className='nform_txt' placeholder='내용' onChange={(e) => setNcontent(e.target.value)}>
            </textarea>
            
            <button type='button' onClick={submit}>작성</button>
        </div>
    );
}

export default NoticeForm;