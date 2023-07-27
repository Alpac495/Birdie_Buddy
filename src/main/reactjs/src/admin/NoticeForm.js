import React, { useState } from 'react';
import './NoticeForm.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function NoticeForm(props) {
    const [nsubject, setNsubject]=useState('');
    const [ncontent, setNcontent]=useState('');
    const [nphoto, setNphoto]=useState('');
    const [ncate, setNcate]=useState('');
    const navi = useNavigate();


    const handleSelectChange = (e) => {
        setNcate(e.target.value); // 선택한 값으로 ncate 상태 업데이트
    };

    const submit=()=>{
        axios.post('/admin/noticeWrite',{nsubject, ncontent, nphoto, ncate})
        .then(res=>{
            navi("/admin/noticelist")
        })
    }



    return (
        <div className='nform_wrap'>

            <select value={ncate} onChange={handleSelectChange}>
                <option disabled selected value="">선택하세요</option>
                <option value="이벤트">이벤트</option>
                <option value="공지사항">공지사항</option>
                <option value="블랙리스트">블랙리스트</option>
            </select>
            
            <input className='nform_subject' type='text' placeholder='제목' onChange={(e)=>setNsubject(e.target.value)} />
            <br/>
            <textarea className='nform_txt' placeholder='내용' onChange={(e) => setNcontent(e.target.value)}>
            </textarea>
            <input type='file' onChange={(e)=>setNphoto(e.target.value)}/>
            
            <button type='button' onClick={submit}>작성</button>
        </div>
    );
}

export default NoticeForm;