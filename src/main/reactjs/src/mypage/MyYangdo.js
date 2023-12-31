import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import _ from "lodash"
import "../yangdo/YangdoList.css";
import profile from "../image/User-circle.png";
import searchCon from "../image/search.svg";
import pen from "../image/pen.svg";
import Header from '../header/Header';

function MyYangdo(props) {
    const image1 = process.env.REACT_APP_IMAGE1PROFILE;
    const image2 = process.env.REACT_APP_IMAGE87;
    const [unum, setUnum] = useState('');
    const [keyword, setKeyword] = useState('');
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navi = useNavigate();
    const fetchMoreData = () => {//수정
        axios.get("/apilogin/unumChk")
            .then(res => {
                setUnum(res.data);
                setLoading(true);
                axios
                    .get(`/apiyangdo/myyangdoList?unum=${res.data}&page=${page}&size=7`) // size=페이지 당 n개의 아이템을 요청하도록 수정
                    .then((res) => {
                        const newData = _.uniqBy([...items, ...res.data], 'ynum');
                        setItems(newData);
                        console.log(items)
                        setPage((prevPage) => prevPage + 1);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("데이터를 더 가져오는 중 오류 발생:", error);
                        setLoading(false);
                    });
            })
    }


    useEffect(() => {
        fetchMoreData()
    }, []);

    const onDetailEvent = (ynum) => {
        navi(`/mypage/myyangdodetail/${ynum}`);
    }
    const search = () => {
        axios.get("/apiyangdo/myyangdoListSearch?unum="+unum+"&keyword=" + keyword)
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
    const allList = () => {
        navi(`/yangdo/list`)
    }
    const onWriteButtonEvent = () => {
        navi("/yangdo/form");
    }
    let prevMonthYear = "";
    let prevDay = "";

    function formatDate(dateString) {
        const dateObj = new Date(dateString); // 입력된 문자열을 Date 객체로 변환
        const year = dateObj.getFullYear(); // 연도
        const month = `0${dateObj.getMonth() + 1}`.slice(-2); // 월 (0부터 시작하므로 1을 더해줌)
        const day = `0${dateObj.getDate()}`.slice(-2); // 일
        const hours = `0${dateObj.getHours()}`.slice(-2); // 시간
        const minutes = `0${dateObj.getMinutes()}`.slice(-2); // 분
    
        // 형식에 맞게 조합하여 반환
        return `${year}.${month}.${day} ${hours}:${minutes}`;
    }

    return (
        <div className="Ylyangdolist">
            <Header/>
            <div className="Ylyangdolist-child" />
            <div className="Ylrectangle-parent">
                <div className="Ylgroup-child" onClick={allList} />
                <div className="Yldiv" onClick={allList}>전체 양도</div>
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
                    loader={null}
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
                                        <div className="Yldiv5">작성일 : {formatDate(row.ywriteday)}</div>
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
export default MyYangdo;