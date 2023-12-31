import "./JoinList.css";
import Flagicon from "../image/icon_joinflag.svg"
import Header from "../header/Header";
import React, { useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import {NavLink} from "react-router-dom";
import Profile from "../image/user60.png";
import InfiniteScroll from "react-infinite-scroll-component";
import Footer from "../footer/Footer";
import _ from "lodash";
import searchCon from "../image/search.svg";
import ToTopbtn from "../image/Popupbtn.svg";



const JoinAllList = () => {
    const image1 = process.env.REACT_APP_IMAGE1PROFILE;
    const image2 = process.env.REACT_APP_IMAGE87;
    const url = process.env.REACT_APP_PROFILE;
    const [keyword, setKeyword] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [unum, setUnum]=useState('');
    const unumchk=()=>{
        Axios.get("/apilogin/unumChk")
        .then(res=> {
            setUnum(res.data);
        });
    }
    useEffect(() => {
        unumchk()
    }, [])
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const list =() => {
        setLoading(true);
        const url = `/apijoining/list?page=${page}&size=10`;
        Axios.get(url)
            .then(res => {
                const newData = _.uniqBy([...data, ...res.data], 'jnum');
                setData(newData);
                setPage((prevPage) => prevPage + 1);
                setLoading(false);
                // console.log(res.data);
            })
            .catch((error) => {
                console.error("데이터를 더 가져오는 중 오류 발생:", error);
                setLoading(false);
            });
    }

    useEffect(() => {
        list();
    }, []);

    const search = () => {
        Axios.get("/apijoining/searchlist?keyword=" + keyword)
            .then(res => {
                setData(res.data);
                setPage((prevPage) => prevPage + 1);
                setLoading(false);
            })
            .catch((error) => {
                console.error("데이터를 더 가져오는 중 오류 발생:", error);
                setLoading(false);
            });
    }

    // D-day 계산 함수
    const calculateDday = jjoinday => {
        const today = new Date();
        const jJoinDay = new Date(jjoinday);
        const timeDiff = jJoinDay.getTime() - today.getTime();
        const dDay = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return dDay;
    };
    const alljoinClick = () => {
        window.location.replace(`/joining/alllist`)
    };
    const myjoinClick = () => {
        window.location.replace(`/joining/makelist`)
    };
    const requestjoinClick = () => {
        window.location.replace(`/joining/requestlist`)
    };
    const joinformClick = () =>{
        window.location.replace(`/joining/form`)
    }
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div className="JEjoinlistreact">

            <div className="JEjoinheader">
                <div className="header"><Header/></div>
                <div className="JEjtap">
                    <div className="JEyangdo-bar">
                        <div className="JEapp-bar-top">
                            <div className="JEactions">
                                <div className="btn1_wrapper">

                                    <button type='button' className="JLbtn" onClick={joinformClick}>
                                        조인 만들기
                                    </button>
                                </div>
                            </div>
                            <input className="JEtitle"
                                   type="text"
                                   placeholder="골프장명 또는 날짜로 검색"
                                   value={keyword}
                                    onChange={(e) => {
                                        setKeyword(e.target.value);
                                    }}/>
                            <img className="JEtitle1 btn btn-sm btn-outline" alt="" src={searchCon} onClick={search} />
                        </div>
                    </div>
                    <div className="JEsegmented-control">
                        <div className="JEsegmented-control1">
                            <div className="JEframe">
                                <div className="JEdiv1" onClick={alljoinClick}>전체</div>
                            </div>
                            <div className="JEframe1">
                                <div className="JEdiv1" onClick={myjoinClick}>모집</div>
                            </div>
                            <div className="JEframe1">
                                <div className="JEdiv1" onClick={requestjoinClick}>신청</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
                    <div className="JEjlist-parent">
                        <div className="JEjlist">
                            <InfiniteScroll
                                dataLength={data.length}
                                next={list}
                                hasMore={true}
                                loader={loading ? ( // 로딩 상태에 따른 메시지 표시
                                    <div className="spinner-border text-primary" style={{marginLeft: "140px", overflow: "none"}}></div>
                                ) : (
                                    null
                                )}
                                endMessage={<div style={{height:'50px',padding:'10px',textAlign:'center',fontSize:'15px'}}  onClick={scrollToTop}>
                                    Scroll to Top
                                </div>} // Display Footer when the end is reached
                            >
                            <div className="JEjlist-wrapper">
                                {
                                    data.map &&
                                    // eslint-disable-next-line array-callback-return
                                    data.filter((val)=>{
                                        // eslint-disable-next-line eqeqeq
                                        if(searchTerm == ""){
                                            return val
                                        }else if(val.gname.includes(searchTerm)){
                                            return val
                                        }else if(val.jjoinday.includes(searchTerm)){
                                            return val
                                        }
                                    }).map((item,idx) =>
                                        <NavLink to={`/joining/detail/${item.jnum}`} className='nav-style'>
                                            {calculateDday(item.jjoinday) < 0 ? null :
                                                <div className="JEjlist" key={idx}>
                                                    <div className="JEjlist-inner">
                                                        <div className="JEinstance-child" />
                                                    </div>
                                                    <div className="JEdiv4">
                                                        <p className="JEp">{item.jjoinday} {item.jtime}</p>
                                                        {/* {item.jaccept===0?(<p className="JLp2">#신청 중</p>) : item.jaccept===1?(<p className="JLp2">#조인 확정</p>) : item.jaccept===2?(<p className="JLp2">#모집 중</p>) : null} */}
                                                        <p className="JEp1"><span className="JEspan">{item.gname}</span></p>
                                                        <p className="JEp1"><span className="JEspan1">
                                                            그린피 : {item.jprice? item.jprice.toLocaleString() : '가격 정보 없음'}원</span></p>
                                                    </div>
                                                    <div className="JEemoji-flag-in-hole-parent">
                                                        <img
                                                            className="emoji-flag-in-hole"
                                                            alt=""
                                                            src={Flagicon} />
                                                        <div className="JEdiv5">{4-item.jmcount-item.jucount === 0 ? "꽉 찼어요!" : `${4-item.jmcount-item.jucount}자리 비었어요!`}</div>
                                                    </div>
                                                    <div>
                                                        {item.uphoto == null ? <img className="JEavatar-user-60" alt="" src={Profile} /> :
                                                            <img className="JEavatar-user-60" src={`${image1}${item.uphoto}${image2}`} alt={''}/>}
                                                    </div>
                                                    <div className="JErectangle-parent">
                                                        <div className="JEgroup-child" />
                                                        <div className="JEd-16">{calculateDday(item.jjoinday) === 0 ? "D-DAY" : calculateDday(item.jjoinday) < 0 ? `D+${Math.abs(calculateDday(item.jjoinday))}` : `D-${calculateDday(item.jjoinday)}`}</div>
                                                    </div>

                                                </div>

                                            }</NavLink>
                                    )}
                            </div>
                                {data.length > 0 && !loading && (
                                    <img alt='' src={ToTopbtn} className="ToTop" onClick={scrollToTop}/>
                                )}
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            
    );
};

export default JoinAllList;