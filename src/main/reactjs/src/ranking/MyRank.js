/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import "../header/Header.css";
import Header from "../header/Header";
import Axios from "axios";
import "./RankingList.css";
import user from "../image/profile90x90.png";
import Footer from "../footer/Footer";
import InfiniteScroll from "react-infinite-scroll-component";
import _ from "lodash"

function MyRank(props) {
    // const [unum, setUnum] = useState(props.unum);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [myRanking, setMyRanking] = useState(false);
    const medal = process.env.REACT_APP_RANKING;
    const image1 = process.env.REACT_APP_IMAGE1PROFILE;
    const image2 = process.env.REACT_APP_IMAGE87;
    const unum = props.unum;
    useEffect(() => {
        // unumchk();
        getList();
    }, []);

    // const unumchk = () => {
    //     Axios.get("/login/unumChk?unum=" + unum)
    //         .then(res => {
    //             setUnum(res.data);
    //         })
    // }

    function switchList() {
        setMyRanking(prevMyRanking => !prevMyRanking);
    }

    const getList = () => {
        Axios.get(`/score/list?page=${page}&size=100`)
            .then(res => {
                const newData = _.uniqBy([...list, ...res.data], 'rnum');
                setList(newData);
                setPage((prevPage) => prevPage + 1);
                setLoading(false);
            })
            .catch((error) => {
                console.error("데이터를 더 가져오는 중 오류 발생:", error);
                setLoading(false);
            });
    }
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div className='rankingList_wrap'>
            
                

                    
                    {
                        list &&
                        list.map((item, idx) => (
                            <div className='ranking_wrap' key={idx}>
                            {item.unum == props.unum ? (
                                <div className={`ranking_mem rank${idx + 1}`} style={{ backgroundImage: item.uphoto != null ? `url(${image1}${item.uphoto}${image2})` : `url(../image/profile90x90.png)`, backgroundSize: 'cover' }} data-unum={item.unum}>
                                <div className="overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)' }} />

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
                                    {idx + 1 === 1 ? <img alt='' src={`${medal}gold-medal.png`} /> :
                                        idx + 1 === 2 ? <img alt='' src={`${medal}silver-medal.png`} /> :
                                        idx + 1 === 3 ? <img alt='' src={`${medal}bronze-medal.png`} /> :
                                        <span>{`${idx + 1}th`}</span>}
                                    </div>
                                </div>

                                <div className='ranking_neck'></div>
                                </div>
                            ): null}
                            </div>
                        ))}

                                    
                                </div>
                            );
                        }

export default MyRank;