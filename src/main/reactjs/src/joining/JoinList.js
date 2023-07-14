import "./JoinList.css";
import {JoinFullRounded} from "@mui/icons-material";
import iconFlag from "../image/icon_flaghole.svg"
import Header from "../header/Header";
import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import {NavLink} from "react-router-dom";

const JoinList = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const list = useCallback(() => {
        const url = "/joining/list";
        Axios.get(url)
            .then(res => {
                setData(res.data);
                console.log(res.data);
            });
    }, []);

    useEffect(() => {
        list();
    }, [list]);

    // D-day 계산 함수
    const calculateDday = jjoinday => {
        const today = new Date();
        const jJoinDay = new Date(jjoinday);
        const timeDiff = jJoinDay.getTime() - today.getTime();
        const dDay = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return dDay;
    };

    return (
        <div className="joinlist">
            <Header />
            <div className="btn1_wrapper">
                <NavLink to={'/joining/form'} className='nav-style'><b className="JLb">조인만들기</b></NavLink>
            </div>
            <div className="btn2_wrapper">
                <b className="JLb1">내조인</b>
            </div>
            <input className="joinlist-child"
                   type="text"
                   placeholder="검색"
                   onChange={(e) => {
                       setSearchTerm(e.target.value);
                   }}/>
            <div className="jlist">
                <div>
                    {data.map && data.map((item, idx) => (
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
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JoinList;


