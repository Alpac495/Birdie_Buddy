import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import _ from "lodash"
import Axios from "axios";
import "./YangdoList.css";
import axios from 'axios';
import pen from "../image/pen.svg";
import search from "../image/search.svg";

function YangdoList(props) {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState("");
    const fetchMoreData = () => {
        setLoading(true);
        Axios
            .get(`/yangdo/list2?page=${page}&size=7`) // size=페이지 당 n개의 아이템을 요청하도록 수정
            .then((res) => {
                setItems((prevItems) => [...prevItems, ...res.data]);
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


    return (
        <div className="YLyangdolist">
            <div className="YLyangdolist-child" />
            <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={true}
                loader={null}
                endMessage={null}
            >
                {
                    items &&
                    items.map((row, idx) =>
                            <div className="YLgroup-parent">
                                <div className="YLrectangle-parent">
                                    <div className="YLgroup-child" />
                                    <div className="YLdiv" onClick={(e) => {
                                        e.preventDefault();
                                        onDetailEvent(row.ynum);
                                    }}>{row.yplace}</div>
                                    <div className="YLdiv1">{row.yprice}원</div>
                                    <div className="YLam">{row.ysubject}</div>
                                </div>
                                <div className="YLrectangle-group">
                                    <div className="YLgroup-item" />
                                    <img className="YLgroup-inner" alt="" src="/group-154.svg" />
                                    <div className="YLdiv2">{row.unickname}</div>
                                    <div className="YLdiv3">작성일 : {row.yday}</div>
                                </div>
                                <div className="YLrectangle-container">
                                    <div className="YLrectangle-div" />
                                    <div className="YLdiv4">23.07</div>
                                    <div className="YLdiv5">27</div>
                                </div>
                            </div>
                    )
                }
            </InfiniteScroll>

            <div className="YLgroup-div">
                <div className="YLgroup-child1" onClick={mylist} />
                <div className="YLdiv6" onClick={mylist}>마이 양도</div>
            </div>
            <div className="YLrectangle-parent1">
                <div className="YLgroup-child2" onClick={onWriteButtonEvent} />
                <img className="YLicon-pencil-thin" onClick={onWriteButtonEvent} alt="" src={pen} />
            </div>
            <input
                type="text"
                placeholder="검색"
                value={keyword}
                onChange={(e) => {
                    setKeyword(e.target.value);
                }}
                className="YLdiv7" />
            <img className="YLicon-search" onClick={search} alt="" src={search} />
        </div>
    );
}

export default YangdoList;