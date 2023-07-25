import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import _ from "lodash"
import Axios from "axios";
import "./YangdoList.css";

function YangdoList(props) {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState("");
    const fetchMoreData = () => {
        setLoading(true);
        Axios
            .get(`/yangdo/list2?page=${page}&size=5`) // size=페이지 당 n개의 아이템을 요청하도록 수정
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
    const [unum, setUnum] = useState(0);
    const unumchk = () => {
        Axios.get("/login/unumChk?unum=" + unum)
            .then(res => {
                setUnum(res.data);
            })
    }

    useEffect(() => {
        fetchMoreData();
        unumchk()
    }, []);

    const { currentPage } = useParams();
    console.log({ currentPage });

    

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
            navi(`/yangdo/detail/${ynum}/${currentPage}`);
        }
    }

    return (
        <div>
            <button type='button' onClick={onWriteButtonEvent}>글쓰기</button>
            <br/>

            <div>
                <input
                    type="text"
                    placeholder="검색"
                    value={keyword}
                    onChange={(e) => {
                        setKeyword(e.target.value);
                    }} />
                <br /><br />
                <InfiniteScroll
                    dataLength={items.length}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={<h4>마지막</h4>}
                    endMessage={null}
                >
                    {
                    items &&
                    items.map((row, idx) =>
                        <div style={{border:'2px solid black', width:'200px'}}>
                            <b onClick={(e) => {
                                e.preventDefault();
                                onDetailEvent(row.ynum);
                            }}>{row.yplace}
                            </b><br />

                            <b>{row.yday}</b><br />
                            <b>{row.ysubject}</b><br />
                            <b>{row.yprice}원</b><br />
                            <b>{row.unickname}</b><br />
                        </div>
                    )
                }
                </InfiniteScroll>
           
            </div>
        </div>
    );
}

export default YangdoList;