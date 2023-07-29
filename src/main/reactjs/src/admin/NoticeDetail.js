import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from "../header/Header";
import "./NoticeDetail.css";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function NoticeDetail(props) {
    const [data,setData]=useState([]);
    const {nnum}=useParams();
    const url = process.env.REACT_APP_NOTICE;
    const [unum, setUnum] = useState(0);

    const unumchk=()=>{
        axios.get("/login/unumChk")
        .then(res=> {
            setUnum(res.data);
        });
    }

    const noticeDetail=()=>{
        axios.get("/admin/noticeDetail?nnum="+nnum)
        .then(res=>{
            console.log(res.data);
            setData(res.data);
        })
    }
    useEffect(()=>{
        unumchk();
        noticeDetail();
    },[])
    
    return (
        <div className='nform_wrap'>
            <div className='header'>
                <Header/>
            </div>           
            <div className='notice_header'>
                    Notice    
            </div>
            <div className='nform_head'>
                <div className='nform_title'>{data.nsubject}</div>

                <div className='nform_headbtnwrap'>
                    {data.ncate} | {data.nwriteday}
                </div>
            </div>
            <hr style={{backgroundColor:'lightgray', width:'100%',height:'2px', margin:'10px 0 50px 0'}}/>
            <div className='nform_foot'>
                <img alt='' src={`${url}${data.nphoto}`}/>
                <br/>
                <pre className='nform_content'>{data.ncontent}</pre>
            </div>
            <div className='nform_ground'>
                <div className='nform_goback' >
                <Link to="/admin/noticeList">
                    <button type='button'>목록</button>
                </Link>
                </div>
                {
                    unum === 1 ? 
                    (
                        <div className='nformBtn_wrap'>
                        <DeleteOutlineOutlinedIcon style={{ color: '#1F4337' }} />
                        </div>
                    ) : null
                }
            </div>

        </div>
    );
}

export default NoticeDetail;