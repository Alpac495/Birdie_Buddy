import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import _ from "lodash"
import Axios from "axios";
import "./YangdoList.css";
import axios from 'axios';
import searchCon from "../image/search.svg";
import pen from "../image/pen.svg";
import profile from "../image/User-circle.png";
import Header from '../header/Header';

function YangdoList(props) {
    const url = process.env.REACT_APP_PROFILE;
    const image1 = process.env.REACT_APP_IMAGE1PROFILE;
    const image2 = process.env.REACT_APP_IMAGE87;
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState("");
    const fetchMoreData = () => {
        setLoading(true);
        Axios
            .get(`/yangdo/list2?page=${page}&size=7`)
            .then((res) => {
                // 기존 데이터 중복 방지를 위해 lodash의 uniqBy 함수를 사용하여 중복 제거
                const newData = _.uniqBy([...items, ...res.data], 'ynum');
                console.log(newData);
                setItems(newData);
                setPage((prevPage) => prevPage + 1);
                setLoading(false);
            })
            .catch((error) => {
                console.error("데이터를 더 가져오는 중 오류 발생:", error);
                setLoading(false);
            });
    }
    const [unum, setUnum] = useState('');
    const unumchk = () => {
        Axios.get("/login/unumChk")
            .then(res => {
                setUnum(res.data);
            })
    }

    useEffect(() => {
        fetchMoreData();
        unumchk()
    }, []);



    const navi = useNavigate();

    const onWriteButtonEvent = () => {
        if (unum == 0) {
            alert("로그인을 해주세요");
            return;
        } else {
            navi("/yangdo/form");
        }
    }

    const onDetailEvent = (ynum) => {

        if (unum == 0) {
            alert("로그인을 해주세요");
            return; // 이동을 막기 위해 함수 실행을 중단
        } else {
            navi(`/yangdo/detail/${ynum}`);
        }
    }
    const search = () => {
        axios.get("/yangdo/searchList?keyword=" + keyword)
            .then(res => {
                setItems(res.data);
                setPage((prevPage) => prevPage + 1);
                setLoading(false);
            })
            .catch((error) => {
                console.error("데이터를 더 가져오는 중 오류 발생:", error);
                setLoading(false);
            });
    }
    const mylist = () => {
        if (unum == 0) {
            alert("로그인을 해주세요");
            return; // 이동을 막기 위해 함수 실행을 중단
        } else {
            navi(`/mypage/myyangdo/${unum}`)
        }
    }
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    let prevMonthYear = "";
    let prevDay = "";
    return (
        <div className="Ylyangdolist">
            <Header/>
            <div className="Ylyangdolist-child" />
            <div className="Ylrectangle-parent">
                <div className="Ylgroup-child" onClick={mylist} />
                <div className="Yldiv" onClick={mylist}>마이 양도</div>
            </div>
            <div className="Ylrectangle-group">
                <div className="Ylgroup-item" onClick={onWriteButtonEvent} />
                <img className="Ylicon-pencil-thin" onClick={onWriteButtonEvent} alt="" src={pen} />
            </div>
            <input
                type="text"
                placeholder="검색"
                value={keyword}
                onChange={(e) => {
                    setKeyword(e.target.value);
                }}
                className="Yldiv1" />
            <img className="Ylicon-search" alt="" src={searchCon} onClick={search} />



            <div className="Ylblacklistmodalveticalframe">
                <InfiniteScroll
                    dataLength={items.length}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={loading ? ( // 로딩 상태에 따른 메시지 표시
                        <div className="spinner-border text-primary" style={{marginLeft: "50px"}}></div>
                    ) : (
                        null
                    )}
                    endMessage={null}
                >
                    {items &&
                        items.map((row, idx) => {
                            const monthYear = `${row.yday.split('-')[0].slice(2)}.${row.yday.split('-')[1]}`;
                            // 이전값과 같을 경우 빈 문자열로 세팅
                            const displayMonthYear = monthYear === prevMonthYear ? "" : monthYear;
                            prevMonthYear = monthYear; // 이전 monthDay 값을 업데이트

                            const day = `${row.yday.split('-')[2]}`;
                            const displayDay = day === prevDay ? "" : day;
                            prevDay = day; // 이전 monthDay 값을 업데이트



                            return (
                                <div className="Ylgroup-parent" key={idx}>
                                    <div
                                        className="Ylrectangle-container"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onDetailEvent(row.ynum);
                                        }}
                                    >
                                        <div className="Ylgroup-inner" />
                                        <div className="Yldiv2">{row.yplace}</div>
                                        <div className="Yldiv3">그린피 : {row.yprice? row.yprice.toLocaleString() : '가격 정보 없음'}원</div>
                                        <div className="Ylam">{row.ysubject}</div>
                                    </div>
                                    <div className="Ylgroup-div">
                                        <div className="Ylrectangle-div" />
                                        {
                                            row.uphoto==null?
                                            <img className="Ylgroup-icon" alt="a" src={profile} />
                                            :
                                            <img className="Ylgroup-icon" alt="a" src={`${image1}${row.uphoto}${image2}`} />
                                        }
                                        <div className="Yldiv4">{row.unickname}</div>
                                        <div className="Yldiv5">작성일 : {row.ywriteday}</div>
                                    </div>
                                    <div className="Ylrectangle-parent1">
                                        <div className="Ylgroup-child1" />
                                        <div className="Yldiv6">{displayMonthYear}</div>
                                        <div className="Yldiv7">{displayDay}</div>
                                    </div>
                                </div>
                            );
                        })}
                </InfiniteScroll>
            </div>
        </div>
    );
};
    
export default YangdoList;