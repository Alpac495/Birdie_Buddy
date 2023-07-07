import React, {useCallback, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import Axios from "axios";
import "./FriendList.css";
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
            <h4>총 친구수 : {data.length}</h4>
            <div className="flframe">
                <div className="div2">친구 목록</div>
            </div>
            <div className="flframe1">
                <div className="div2">채팅</div>
            </div>
            <div className="friend-child" />
            <div className="frldiv">친구 목록</div>
            <div className="frldiv1">채팅</div>
            <div className="friend-item" />

            {
                data.map &&
                data.map((item,idx)=>
                    <div className="friendlist">
                        <div className="friendlist-child" />
                        <div className="friendlist-item" />
                        <div className="flist">
                            <div className="flist-child" />
                            <div className="flist-item" />
                            <b className="b">{item.uname}</b>
                            <div className="div">여 30</div>
                            <div className="div1">평균타수 : 8.0</div>
                        </div>
                        <div className="flist-line" />

                    </div>)
            }

        </div>
    );
}

export default Friend;