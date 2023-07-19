import React, { useEffect, useState } from 'react';
import Header from "../header/Header";
import Axios from "axios";
import "./RankingList.css";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";

function RankList(props) {
    const [unum, setUnum] = useState(0);
    const [data, setData] = useState([]);
    const [newList, setNewList] = useState([]); // 업데이트된 리스트를 저장하기 위해 useState를 사용합니다.

    const unumchk = () => {
        Axios.get("/login/unumChk?unum=" + unum)
            .then(res => {
                setUnum(res.data);
            })
    }
    
    useEffect(() => {
        unumchk();
        getList();
    }, []);

    const getList = () => {
        Axios.get("/score/list")
            .then(res => {
                const list = res.data;
                const fetchUserPromises = list.map(item =>
                    Axios.get('/score/getuser?unum=' + item.unum)
                        .then(res => {
                            const unickname = res.data.unickname;
                            return { ...item, unickname };
                        })
                );
                Promise.all(fetchUserPromises)
                    .then(updatedList => {
                        setNewList(updatedList); // newList 상태를 업데이트합니다.
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
                {newList.map((item, idx) => (
                    <div className={`ranking_list rank${idx + 1}`} key={idx}>
                        <div>{idx + 1} / {item.unum} / {item.rtasu} / {item.unickname}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RankList;
