import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from "../header/Header";
import "./NoticeList.css";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

function NoticeList(props) {
    const navi = useNavigate();
    const [data, setData] = useState([]);
    const [unum, setUnum] = useState(0);
    const [totalPage, setTotalPage] = useState(1);
    const [page, setPage] = useState(1);

    const unumchk=()=>{
        axios.get("/apilogin/unumChk")
            .then(res=> {
                setUnum(res.data);
            });
    }

    const noticeList = () => {
        axios.get(`/apiadmin/noticeList?limit=10&offset=${(page-1) * 10}`)
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const getTotalCount = () => {
        axios.get("/apiadmin/noticeCount")
            .then(res => {
                const totalCount = res.data;
                setTotalPage(Math.ceil(totalCount/10));
            })
            .catch(error => {
                console.error(error);
            });
    }

    const noticeDetail = (nnum) => {
        navi(`/admin/noticedetail/${nnum}`);
    }

    const pageChange = (value) => {
        setPage(value);
    }

    const formatDate = (date) => {
        const postDate = new Date(date);
        const currentDate = new Date();
        const isToday =
            postDate.getFullYear() === currentDate.getFullYear() &&
            postDate.getMonth() === currentDate.getMonth() &&
            postDate.getDate() === currentDate.getDate();
        if (isToday) {
            // If the post is from today, display only the time
            const hours = postDate.getHours();
            const minutes = postDate.getMinutes();
            return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        } else {
            // If the post is from before today, display the year, month, and day
            return `${postDate.getFullYear()}-${postDate.getMonth() + 1}-${postDate.getDate()}`;
        }
    };

    useEffect(() => {
        unumchk();
        noticeList();
        getTotalCount();
    }, [page]);

    return (
        <div className='notice_wrap'>
            <div className='header'>
                <Header/>
            </div>
            <div className='notice_header'>
                Notice
            </div>
            <div className='notice_list'>
                <table className='notice_table'>
                    <thead>
                    {
                        unum === 1?
                            (
                                <Link to={"/admin/noticeForm"}>
                                    <button className='notice_writeBtn' type='button' style={{textAlign:'center'}}> <CreateOutlinedIcon style={{color:'white'}}/> </button>
                                </Link>
                            ):null
                    }
                    <tr className='noticeList_head'>
                        <th style={{ textAlign: 'left' }}>작성일</th>
                        <th style={{ textAlign: 'left' }}>카테고리</th>
                        <th style={{ textAlign: 'left' }}>제목</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data &&
                        data.map((item, idx) => (
                            <tr key={idx} onClick={() => noticeDetail(item.nnum)}>
                                <td style={{ textAlign: 'left', width:'80px' }}>{formatDate(item.nwriteday)}</td>
                                <td style={{ textAlign: 'left' }}>{item.ncate}</td>
                                <td style={{ textAlign: 'left' }}>{item.nsubject}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <div className='notice_pageNum'>
                {Array(totalPage).fill().map((_, i) => (
                    <button key={i} onClick={() => pageChange(i+1)}>{i+1}</button>
                ))}
            </div>
        </div>
    );
}

export default NoticeList;
