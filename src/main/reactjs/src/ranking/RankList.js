/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import "../header/Header.css";
import Header from "../header/Header";
import Axios from "axios";
import "./RankingList.css";
import gold from "../images/gold-medal.png";
import silver from "../images/silver-medal.png";
import bronze from "../images/bronze-medal.png";
import user from "../images/default_golf.png";

function RankList(props) {
    const [unum, setUnum] = useState(0);
    const [newList, setNewList] = useState([]); // 업데이트된 리스트를 저장하기 위해 useState를 사용합니다.
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
            <div className='header'>
                <Header />
            </div>
            {/* <div>
                <Link to="/score/form">스코어 입력</Link>
            </div> */}

            <div className='ranking_List'>
                
                {newList.map((item, idx) => (
                    <div className='ranking_wrap'> 
                        <div className={`ranking_mem rank${idx + 1}`} key={idx}  style={{ backgroundImage: item.uphoto != null ? `url(${image1}${item.uphoto}${image2})` : `url(../images/default_golf.png)`, backgroundSize:'cover'}}>
                            
                        <div
                            className="overlay"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.7)', // 배경 색상과 투명도 조절
                            }}
                        />
                            
                            {item.uphoto != null ? (
                                <div className='ranking_profile'>
                                <img alt='프로필 사진' src={`${image1}${item.uphoto}${image2}`} />
                                </div>
                            ) : (
                                <div className='ranking_profile'>
                                <img alt='프로필 사진' src={user} />
                                </div>
                            )}


                            <div className='ranking_mid'>
                                <div className='ranking_nickname'>{item.unickname} 님</div> 

                                <div className='ranking_tasu'>{item.rtasu} 타</div>
                            </div>


                            <div>
                            <div className='ranking_place'>
                                {idx + 1 === 1 ? <img alt='' src={gold}/> :
                                idx + 1 === 2 ? <img alt='' src={silver}/> :
                                idx + 1 === 3 ? <img alt='' src={bronze}/> :
                                <span>{`${idx + 1}th`}</span>}
                            </div>
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
