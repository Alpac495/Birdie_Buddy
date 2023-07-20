import React, { useEffect, useState } from 'react';
import Header from "../header/Header";
import Axios from "axios";
import "./RankingList.css";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import gold from "../images/gold-medal.png";
import silver from "../images/silver-medal.png";
import bronze from "../images/bronze-medal.png";

function RankList(props) {
    const [unum, setUnum] = useState(0);
    const [data, setData] = useState([]);
    const [newList, setNewList] = useState([]); // 업데이트된 리스트를 저장하기 위해 useState를 사용합니다.
    const url = process.env.REACT_APP_PROFILE;
    const image1 = process.env.REACT_APP_IMAGE1PROFILE;
    const image2 = process.env.REACT_APP_IMAGE87;

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
                            let uphoto = res.data.uphoto;
                            
                            return { ...item, unickname, uphoto };
                        })
                );
                Promise.all(fetchUserPromises)
                    .then(updatedList => {
                        setNewList(updatedList); // newList 상태를 업데이트합니다.
                    })
            })
    }

    return (
        <div className='rankingList_wrap'>
            <Header />
            {/* <div>
                <Link to="/score/form">스코어 입력</Link>
            </div> */}

            <div className='ranking_List'>
                
                {newList.map((item, idx) => (
                    <div className='ranking_wrap'> 
                        <div className={`ranking_mem rank${idx + 1}`} key={idx}>
                            
                            
                            <div className='ranking_profile'><img alt='없네' src={`${image1}${item.uphoto}${image2}`} onError={(e) => e.target.style.display = 'none'}/></div>
                            <div className='ranking_mid'>
                                <div className='ranking_nickname'>{item.unickname} 님</div> 

                                <div className='ranking_tasu'>{item.rtasu}</div>
                            </div>

                            <div className='ranking_place'>
                                {idx + 1 === 1 ? <img alt='' src={gold}/> :
                                idx + 1 === 2 ? <img alt='' src={silver}/> :
                                idx + 1 === 3 ? <img alt='' src={bronze}/> :
                                <span>{`${idx + 1}th`}</span>}
                            </div>


                            <div className='ranking_neck'></div> 
                            
                            
                            
                            
                        </div>
                    </div>    
                ))}
             
            </div>
        </div>
    );
}

export default RankList;
