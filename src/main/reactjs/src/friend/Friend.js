import React, {useCallback, useEffect, useState} from 'react';
import {NavLink, Route} from "react-router-dom";
import Axios from "axios";
import "./FriendList.css";
import YangdoForm from "../yangdo/YangdoForm";

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
        <div className="friendlist">
            <h4>총 친구수 : {data.length}</h4>

            <div className="flist-line" />
            <div className="flframe">
                <div className="FLdiv2">친구 목록</div>
            </div>
            <div className="flframe1">
                <div className="FLdiv2">채팅</div>
            </div>

            {
                data.map &&
                data.map((item,idx)=>
                    <NavLink to={`/friend/detail/${item.funum}`}>
                        <div className="flist">
                            <div className="flist-child">
                            <div className="flist-item" />
                            <b className="FLb">{item.uname}({item.unickname})</b>
                            <div className="FLdiv">{item.ugender} /{item.uage}</div>
                            <div className="FLdiv1">{item.ucontent}</div>

                            </div>
                    </div>
                    </NavLink>)
            }

        </div>
    );
}

export default Friend;