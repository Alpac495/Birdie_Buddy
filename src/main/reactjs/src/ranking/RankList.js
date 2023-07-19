import React, { useEffect, useState } from 'react';
import Header from "../header/Header";
import Axios from "axios";
import "./RankingList.css";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";

function RankList(props) {

    const [unum, setUnum] = useState(0);
    const [data, setData] = useState([]);
    const unumchk = () => {
        Axios.get("/login/unumChk?unum=" + unum)
            .then(res => {
                setUnum(res.data);
            })
    }
    useEffect(() => {
        unumchk()
        getList()
    }, [])
    const getList = () => {
        Axios.get("/score/list")
            .then(res => {
                setData(res.data)
                console.log(res.data)
                Axios.get("/score/getuser?unum"+(res.data.unum))
                .then(res=>{
                    console.log(res.data);
                })
            })
    }


    return (
        <div>
            <Header />
            <div>
                <Link to="/score/form">스코어 입력</Link>
            </div>

            <div>
                {
                    data &&
                    data.map((item, idx) => (
                        <div className={`ranking_list rank${idx+1}`} key={idx}>
                            <div>{idx+1} / {item.unum} / {item.rtasu}</div>
                        </div>
                    ))
                }
            </div>
        </div>

    );
}

export default RankList;