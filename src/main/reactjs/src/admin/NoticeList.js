import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../header/Header";
import "./NoticeList.css";

function NoticeList(props) {
    const navi = useNavigate();
    const [data, setData] = useState([]);

    const noticeList = () => {
        axios.get("/admin/noticeList")
        .then(res => {
            console.log(res.data);
            setData(res.data);
        })
        .catch(error => {
            console.error(error);
        });
    }

    const noticeDetail = (nnum) => {
        navi(`/admin/noticedetail/${nnum}`);
    }

    // Function to format the date based on the condition
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
        noticeList();
    }, []);

    return (
        <div className='notice_wrap'>
            <div className='header'>
                <Header/>
            </div>
            <div className='notice_list'>
                {data && 
                    data.map((item, idx) => (
                        <div key={idx} className='notice_bucket'>
                            <div className='notice_head'>
                                <div className='notice_num'>{idx+1}</div>
                                <div
                                    className='notice_subject'
                                    onClick={() => noticeDetail(item.nnum)}
                                >
                                    {item.nsubject}
                                </div>
                            </div>
                            <div className='notice_foot'>
                                <div className='notice_writeday'>{formatDate(item.nwriteday)}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default NoticeList;