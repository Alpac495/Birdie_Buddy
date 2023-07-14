import "./JoinList.css";
import {JoinFullRounded} from "@mui/icons-material";
import iconFlag from "../image/icon_flaghole.svg"
import Header from "../header/Header";
import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import {NavLink} from "react-router-dom";

const JoinList = () => {
    const unum=sessionStorage.unum;
    const [data, setData] = useState([]);
    // const [mydata, setMydata] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [buttonText, setButtonText] = useState('내조인');

    const list = useCallback(() => {
        const url = "/joining/list";
        Axios.get(url)
            .then(res => {
                setData(res.data);
                // console.log(res.data);
            });
    }, []);

    useEffect(() => {
        list();
    }, [list]);

    // const myjoinlist = useCallback(() => {
    //     const url = `/joining/myjoinlist/${unum}`;
    //     Axios.get(url)
    //         .then(res => {
    //             setMydata(res.data);
    //             console.log(res.data);
    //         });
    // }, []);
    //
    // useEffect(() => {
    //     myjoinlist();
    // }, [myjoinlist]);

    // D-day 계산 함수
    const calculateDday = jjoinday => {
        const today = new Date();
        const jJoinDay = new Date(jjoinday);
        const timeDiff = jJoinDay.getTime() - today.getTime();
        const dDay = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return dDay;
    };
    const myjoinClick = () => {
            if (buttonText === '내조인') {
                setButtonText('전체조인');
            } else {
                setButtonText('내조인');
            }
        };
    const joinformClick = () =>{
        window.location.replace(`/joining/form`)
    }

    return (
        <div className="joinlist">
            <Header />
            <div className="btn1_wrapper">
                <button type='button' onClick={joinformClick}>
                    <b className="JLb">조인만들기</b>
                </button>
            </div>
            <div className="btn2_wrapper">
                <button type='button' onClick={myjoinClick}>
                    <b className="JLb1">{buttonText}</b>
                </button>
            </div>
            <input className="joinlist-child"
                   type="text"
                   placeholder="골프장명 또는 날짜로 검색"
                   onChange={(e) => {
                       setSearchTerm(e.target.value);
                   }}/>
            <div className="jlist">
                <div>
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
                            <div className="jlist1" key={idx}>
                                <div className="jlist-inner">
                                    <div className="instance-child" />
                                </div>
                                <div className="JLdiv1">
                                    <p className="JLp">{item.jjoinday} {item.jtime}</p>
                                    <p className="JLp1">{item.gname}</p>
                                    <p className="JLp1">그린피 ￦{item.jprice}</p>
                                </div>
                                <div className="emoji-flag-in-hole-parent">
                                    <img
                                        className="emoji-flag-in-hole"
                                        alt=""
                                        src={iconFlag} />
                                    <div className="JLdiv2">{4 - item.jmcount === 0 ? "꽉 찼어요!" : `${4 - item.jmcount}자리 비었어요!`}</div>
                                </div>
                                <div className="avatar-user-60">
                                    <div className="rectangle" />
                                    <div className="rectangle1" />
                                </div>
                                <div className="rectangle-parent">
                                    <div className="group-child" />
                                    <div className="d-16">{calculateDday(item.jjoinday) === 0 ? "D-DAY" : calculateDday(item.jjoinday) < 0 ? `D+${Math.abs(calculateDday(item.jjoinday))}` : `D-${calculateDday(item.jjoinday)}`}</div>
                                </div>
                                <div className="jlist-child" />
                            </div>
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JoinList;


