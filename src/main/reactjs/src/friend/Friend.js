import React, {useCallback, useEffect, useState} from 'react';
import Axios from "axios";
import "./Friend.css";
import {Link, NavLink} from 'react-router-dom';
import Profile from "../image/user60.png";

function Friend(props) {
    const url = process.env.REACT_APP_PROFILE;
    const [unum, setUnum]=useState('');
    const [data,setData]=useState('');
    const now = new Date();
    const year = now.getFullYear();

    const unumchk=()=>{
        Axios.get("/login/unumChk")
        .then(res=> {
            setUnum(res.data);
            const url="/friend/list?unum="+(res.data);
                Axios.get(url)
                    .then(res=>{
                        setData(res.data);
                        console.log(res.data)
                    })
        });
    }
    useEffect(() => {
        unumchk()
    }, [])
    
    console.log(unum)

    return (
        <div className="friend">
            <h4>마이 버디 : {data.length}명</h4>

            <div className="FLtab">
                <NavLink to={`/friend/list`}>
                    <div className="flframe">
                        <div className="FLdiv">버디 리스트</div>
                    </div>
                </NavLink>
                <NavLink to={`/friend/requestlist`}>
                    <div className="FLframe">
                        <div className="FLdiv">버디 요청</div>
                    </div>
                </NavLink>
            </div>

            {
                data.map &&
                data.map((item,idx)=>

                    <div className="flist">
                        <div className="flist-child" />
                        <div className="flistprofile">
                                <div className="flistprofile1">
                                    <Link to={`/friend/detail/${item.funum}`} className="FDMoveLink">
                                    {item.uphoto == null ? <img className="FLphoto-icon" alt="" src={Profile} /> :
                                    <img className="FLphoto-icon" src={`${url}${item.uphoto}`} alt={''}/>}
                                    </Link>
                                    <div className="FLdiv3">
                                      <span className="FLtxt">
                                        <p className="FLp">{item.unickname}</p>
                                        <p className="FLp1">{item.ugender} /{year - (parseInt(item.uage.substring(0, 4), 10))}세</p>
                                      </span>
                                    </div>

                                    <div className="FLrectangle-parent">
                                        <div className="FLgroup-child" />
                                        <div className="FLdiv4">채팅하기</div>
                                    </div>
                                </div>
                        </div>
                    </div>
                 )
            }

        </div>
    );
}

export default Friend;