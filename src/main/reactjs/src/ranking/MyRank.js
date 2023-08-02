/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import "../header/Header.css";
import Header from "../header/Header";
import Axios from "axios";
import "./RankingList.css";
import "./Score.css";
import user from "../image/profile90x90.png";
import Footer from "../footer/Footer";
import InfiniteScroll from "react-infinite-scroll-component";
import _ from "lodash"
import axios from 'axios';
import ToTopbtn from "../image/Popupbtn.svg";
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
    const [data, setData] = useState([]);


    useEffect(() => {
        getList();
        getData();
    }, []);
    const getData = () => {
        axios.get("/apilogin/unumChk")
            .then(res => {
                axios.get(`/apiscore/myScoreList?unum=${res.data}&page=${page}&size=4`)
                    .then(res => {
                        const newData = _.uniqBy([...data, ...res.data], 'snum')
                        setData(newData);
                        setPage((prevPage) => prevPage + 1);
                        setLoading(false);
                    })
            })
    }

    function switchList() {
        setMyRanking(prevMyRanking => !prevMyRanking);
    }

    const getList = () => {
        Axios.get(`/apiscore/list?page=${page}&size=100`)
            .then(res => {
                const matchedData = res.data.find(item => item.unum == unum);
                if (matchedData) {
                    setList(res.data);
                    setPage(prevPage => prevPage + 1);
                    setLoading(false);
                } else {
                    alert("스코어 등록이 필요합니다");
                    window.location.replace("/score/form");
                }
            })
            .catch(error => {
                console.error("데이터를 더 가져오는 중 오류 발생:", error);
                setLoading(false);
            });

    };
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='rankingList_wrap'>
            {
                list &&
                list.map((item, idx) =>
                    item.unum === props.unum ? (
                        <div className='ranking_wrap' key={idx}>
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
                                    <div className='ranking_nickname'>{`${item.unickname} 님`}</div>
                                    <div className='ranking_tasu'>{`${item.rtasu} 타`}</div>
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

                        </div>
                    ) : null
                )
            }
            <hr style={{ border: '2px solid black' }} />
            <InfiniteScroll
                dataLength={data.length}
                next={getData}
                hasMore={true}
                loader={loading ? ( // 로딩 상태에 따른 메시지 표시
                    <div className="spinner-border text-primary" style={{ marginLeft: "140px", overflow: "none" }}></div>
                ) : (
                    null
                )}
                endMessage={<img alt='' src={ToTopbtn} className="ToTop" onClick={scrollToTop}/>}
            >
                {
                    data && data.map((item, idx) => (
                        <div className='my_rank'>
                            <div className='my_title'>
                            &nbsp;&nbsp;&nbsp;작성일&nbsp;:&nbsp;{item.swriteday} <br />
                            &nbsp;&nbsp;&nbsp;골프장&nbsp;:&nbsp;{item.gname}
                            </div>
                            <br />
                            <table className={'my_scoretable'}>
                                <tbody>
                                    <tr>
                                        <td className={'my_my_firsttd'}>HOLE</td>
                                        {Array.from({ length: 9 }, (_, index) => (
                                            <td key={index} className={'my_numpad'}>
                                                {index + 1}
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className={'my_my_firsttd'}>PAR</td>
                                        {Array.from({ length: 9 }, (_, index) => (
                                            <td key={index} className={'my_numpad'}>
                                                {item['g' + (index + 1)]}
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className={'my_my_firsttd'}>SCORE</td>
                                        {Array.from({ length: 9 }, (_, index) => (
                                            <td key={index} className={'my_numpad'}>
                                                {item['h' + (index + 1)]}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                            <br />
                            <table className={'my_scoretable'}>
                                <tbody>
                                    <tr>
                                        <td className={'my_firsttd'}>HOLE</td>
                                        {Array.from({ length: 9 }, (_, index) => (
                                            <td key={index + 9} className={'my_numpad'}>
                                                {index + 10}
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className={'my_firsttd'}>PAR</td>
                                        {Array.from({ length: 9 }, (_, index) => (
                                            <td key={index + 9} className={'my_numpad'}>
                                                {item['g' + (index + 10)]}
                                            </td>
                                        ))}
                                    </tr>
                                    <tr>
                                        <td className={'my_firsttd'}>SCORE</td>
                                        {Array.from({ length: 9 }, (_, index) => (
                                            <td key={index + 9} className={'my_numpad'}>
                                                {item['h' + (index + 10)]}
                                            </td>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                            <hr style={{ border: '2px solid black' }} />
                        </div>
                    ))
                }
                {data.length > 2 && !loading && (
                          <img alt='' src={ToTopbtn} className="ToTop" onClick={scrollToTop}/>
                    )}
            </InfiniteScroll>
        </div>

    );
}

export default MyRank;