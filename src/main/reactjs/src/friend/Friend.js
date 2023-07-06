import React, {useCallback, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import Axios from "axios";

function Friend(props) {
    const unum=sessionStorage.unum;
    const [data,setData]=useState('');
    const list=useCallback(()=>{
        const url="/friend/list?unum="+(unum);
        Axios.get(url)
            .then(res=>{
                setData(res.data);
                console.log(res.data)
            })
    },[]);

    useEffect(()=>{
        list();
    },[list])


    return (
        <div>
            <div>
                <h1>친구목록</h1>
            </div>
            <div>
                <ul>
                    {
                        data.map &&
                        data.map((item,idx)=>
                        <li>{item.uname}&nbsp;&nbsp;<NavLink to={`/friend/detail/${item.funum}`}><button type='button' className='btn btn-sm btn-success'>상세보기</button></NavLink></li>)
                    }
                </ul>
            </div>
        </div>
    );
}

export default Friend;