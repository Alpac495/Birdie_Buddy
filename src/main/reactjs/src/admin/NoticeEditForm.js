import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './NoticeForm.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Header from "../header/Header";

function NoticeForm(props) {
    const [nsubject, setNsubject]=useState('');
    const [ncontent, setNcontent] = useState('');
    const [nphoto, setNphoto]=useState(null);
    const [ncate, setNcate]=useState('');
    const [nwriteday , setNwriteday]=useState('');
    const {nnum}=useParams();
    const navi = useNavigate();
    const url = process.env.REACT_APP_NOTICE;
    

    const handleSelectChange = (e) => {
        setNcate(e.target.value); // 선택한 값으로 ncate 상태 업데이트
    };

    const onUploadEvent = (e) => {
        const uploadFile = new FormData();
        uploadFile.append('upload', e.target.files[0]);
        axios.post('/admin/upload', uploadFile)
            .then((res) => {
                console.log(res.data);
                setNphoto(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const submit=()=>{
        axios.post('/admin/noticeUpdate',{nsubject, ncontent, nphoto, ncate})
        .then(res=>{
            navi("/admin/noticelist")
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("nnum =" +nnum);
                const response = await axios.get("/admin/noticeDetail?nnum"+nnum);
                const data = response.data; // 서버로부터 받은 데이터

                console.log("data = " +data);
                setNsubject(data.nsubject);
                setNphoto(data.nphoto);
                setNcontent(data.ncontent);
                setNcate(data.ncate);
                setNwriteday(data.nwriteday);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [nnum]);

    return (
        <div className='nform_wrap'>
            <div className='header'>
                <Header/>
            </div>
            <div className='notice_header'>
                    Notice    
            </div>
            <h5 style={{marginTop:'25px'}}>제목</h5>
            <input className='nform_subject' type='text' placeholder='제목' onChange={(e)=>setNsubject(e.target.value)} value={nsubject} />
            
            <h5>카테고리</h5>
            <div className='nform_sel'>
                <select value={ncate} onChange={handleSelectChange}>
                    <option selected value="선택하세요">선택하세요</option>
                    <option value="이벤트">이벤트</option>
                    <option value="공지사항">공지사항</option>
                    <option value="블랙리스트">블랙리스트</option>
                </select>
            </div>
            
            <h5>사진</h5>
            <input className='nform_file' type='file' onChange={onUploadEvent} value={nphoto}/>

            <h5>내용</h5>
            <div className='nform_txt'>
            
                {nphoto != null ? <img alt='' src={`${url}${nphoto}`}/> : null}
                <textarea  placeholder='내용' onChange={(e) => setNcontent(e.target.value)}> 
                {ncontent}
                </textarea> 
            </div>
            
            <div>
                <button type='button' onClick={submit}>작성</button>
                <button type='button'>닫기</button>
            </div>
        </div>
    );
}

export default NoticeForm;