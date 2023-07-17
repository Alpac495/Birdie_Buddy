import React, {useEffect, useState} from 'react';
import Header from "../header/Header";
import Axios from "axios";
import "./RankingList.css";
import Footer from "../footer/Footer";
import {Link} from "react-router-dom";

function RankList(props) {

    const [unum, setUnum]=useState(0);
    const unumchk=()=>{
        Axios.get("/login/unumChk?unum="+unum)
            .then(res=>{
                setUnum(res.data);
            })
    }
    useEffect(() => {
        unumchk()
    }, [])

    const url = "";

    Axios.get(url=>{

    })

    return (
        <div className={''}>
            <Header/>
            <div className="ranking_listwrap" >
                <div className="ranking_topper">
                    <div>랭킹 리스트</div>
                    <div>
                        <Link to="/score/form">스코어 입력</Link>
                    </div>
                </div>

                <div className="ranking_list">
                    <table>
                        <thead>
                        <tr>
                            <th>등수</th>
                            <th>이름</th>
                            <th>평균타수</th>
                            <th>골프장명</th>
                        </tr>
                        </thead>
                        <tbody>
                        {/*{Array.from({ length: repeatCount }, (_, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.name}</td>
                                <td>{data.score}</td>
                                <td>{data.golfCourse}</td>
                            </tr>
                        ))}*/}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer/>
            </div>


    );
}

export default RankList;