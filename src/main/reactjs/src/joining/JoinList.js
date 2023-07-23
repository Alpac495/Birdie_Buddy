import "./JoinList.css";
import {JoinFullRounded} from "@mui/icons-material";
import iconFlag from "../image/icon_flaghole.svg"
import Header from "../header/Header";
import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import {NavLink, useParams} from "react-router-dom";
import JoinAllList from "./JoinAllList";


const JoinList = () => {
    const [unum, setUnum]=useState('');
    const unumchk=()=>{
        Axios.get("/login/unumChk")
        .then(res=> {
            setUnum(res.data);
        });
    }
    useEffect(() => {
        unumchk()
    }, [])
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

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

    // D-day 계산 함수
    const calculateDday = jjoinday => {
        const today = new Date();
        const jJoinDay = new Date(jjoinday);
        const timeDiff = jJoinDay.getTime() - today.getTime();
        const dDay = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return dDay;
    };
    const myjoinClick = () => {
        window.location.replace(`/joining/mylist/${unum}`)
    };
    const joinformClick = () =>{
        window.location.replace(`/joining/form`)
    }

    return (
        <JoinAllList/>
    );
};

export default JoinList;
