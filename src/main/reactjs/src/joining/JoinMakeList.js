/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import "./JoinList.css";
import Flagicon from "../image/icon_joinflag.svg"
import Header from "../header/Header";
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {NavLink} from "react-router-dom";
import Profile from "../image/user60.png";


const JoinMakeList = () => {
    const url = process.env.REACT_APP_PROFILE;
    const image1 = process.env.REACT_APP_IMAGE1PROFILE;
    const image2 = process.env.REACT_APP_IMAGE87;
    const [unum, setUnum]=useState('');
    const [data, setData] = useState([]);
    const unumchk=()=>{
        Axios.get("/apilogin/unumChk")
        .then(res=> {
            setUnum(res.data);
            const url = "/apijoining/makejoinlist?unum="+res.data;
            Axios.get(url)
            .then(res => {
                setData(res.data);
            });
        });
    }
    useEffect(() => {
        unumchk()
    }, [])
    
    const [searchTerm, setSearchTerm] = useState("");

    // D-day 계산 함수
    const calculateDday = jjoinday => {
        const today = new Date();
        const jJoinDay = new Date(jjoinday);
        const timeDiff = jJoinDay.getTime() - today.getTime();
        const dDay = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return dDay;
    };
    const alljoinClick = () => {
        window.location.replace(`/joining/alllist`)
    };
    const myjoinClick = () => {
        window.location.replace(`/joining/makelist`)
    };
    const requestjoinClick = () => {
        window.location.replace(`/joining/requestlist`)
    };
    const joinformClick = () =>{
        window.location.replace(`/joining/form`)
    }

    return (
        <div className="JEjoinlistreact">

            <div className="JEjoinheader">
                <div className="header"><Header/></div>
                <div className="JEjtap">
                    <div className="JEyangdo-bar">
                        <div className="JEapp-bar-top">
                            <div className="JEactions">
                                <div className="btn1_wrapper">
                                    <button type='button' className="JLbtn" onClick={joinformClick}>
                                        조인 만들기
                                    </button>
                                </div>
                            </div>
                            <input className="JEtitle"
                                   type="text"
                                   placeholder="골프장명 또는 날짜로 검색"
                                   onChange={(e) => {
                                       setSearchTerm(e.target.value);
                                   }}/>

                        </div>
                    </div>
                    <div className="JEsegmented-control">
                        <div className="JEsegmented-control1">
                            <div className="JEframe1">
                                <div className="JEdiv1" onClick={alljoinClick}>전체</div>
                            </div>
                            <div className="JEframe">
                                <div className="JEdiv1" onClick={myjoinClick}>모집</div>
                            </div>
                            <div className="JEframe1">
                                <div className="JEdiv1" onClick={requestjoinClick}>신청</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="JEjlist-parent">
                <div className="JEjlist">
                    <div className="JEjlist-wrapper">
                    {
                        data.map &&
                        data.filter((val)=>{
                            if(searchTerm == ""){
                                return val
                            }else if(val.gname.includes(searchTerm)){
                                return val
                            }else if(val.jjoinday.includes(searchTerm)){
                                return val
                            }
                        }).map((item,idx) =>
                            <NavLink to={`/joining/detail/${item.jnum}`} className='nav-style'>

                                <div className="JEjlist" key={idx}>
                                    <div className="JEjlist-inner">
                                        <div className="JEinstance-child" />
                                    </div>
                                    <div className="JEdiv4">
                                        <p className="JEp">{item.jjoinday} {item.jtime}</p>
                                        
                                        <p className="JEp1"><span className="JEspan">{item.gname}</span></p>
                                        <p className="JEp1"><span className="JEspan1">그린피 : {item.jprice? item.jprice.toLocaleString() : '가격 정보 없음'}원</span></p>
                                    </div>
                                    <div className="JEemoji-flag-in-hole-parent">
                                        <img
                                            className="emoji-flag-in-hole"
                                            alt=""
                                            src={Flagicon} />
                                        <div className="JEdiv5">{4-item.jmcount-item.jucount === 0 ? "꽉 찼어요!" : `${4-item.jmcount-item.jucount}자리 비었어요!`}</div>
                                    </div>
                                    <div>
                                        {item.uphoto == null ? <img className="JEavatar-user-60" alt="" src={Profile} /> :
                                        <img className="JEavatar-user-60" src={`${image1}${item.uphoto}${image2}`} alt={''}/>}
                                    </div>
                                    <div className="JErectangle-parent">
                                        <div className="JEgroup-child" />
                                        <div className="JEd-16">{calculateDday(item.jjoinday) === 0 ? "D-DAY" : calculateDday(item.jjoinday) < 0 ? `D+${Math.abs(calculateDday(item.jjoinday))}` : `D-${calculateDday(item.jjoinday)}`}</div>
                                    </div>

                                </div>

                            </NavLink>
                        )}
                    </div>
                </div>
            </div>
            </div>
    );
};

export default JoinMakeList;
