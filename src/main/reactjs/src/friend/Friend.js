import React, {useCallback, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import Axios from "axios";
import "./Friend.css";
import FriendList from "./FriendList";

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
        <div className="friend">
            <div className="friend-child" />
            <div className="frldiv">친구 목록</div>
            <div className="frldiv1">채팅</div>
            <div className="friend-item" />

            {
                data.map &&
                data.map((item,idx)=> <FriendList key={idx} item={item} idx={idx}/>)
            }

        </div>
    );
}

export default Friend;