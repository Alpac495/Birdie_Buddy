import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

function MyYangdo(props) {
    const [unum, setUnum] = useState('');
    const [keyword, setKeyword] = useState('');
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const navi = useNavigate();
    const fetchMoreData = () => {//수정
        axios.get("/login/unumChk")
            .then(res => {
                setUnum(res.data);
                setLoading(true);
                axios
                    .get(`/yangdo/myyangdoList?unum=${res.data}&page=${page}&size=3`) // size=페이지 당 n개의 아이템을 요청하도록 수정
                    .then((res) => {
                        setItems((prevItems) => [...prevItems, ...res.data]);
                        console.log(items);
                        console.log(res.data);
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
        axios.get("/yangdo/myyangdoListSearch?unum="+unum+"&keyword=" + keyword)
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
    return (
        <div>
            <button type='button' onClick={onWriteButtonEvent}>글쓰기</button>&nbsp;
            <button type='button' onClick={allList}>양도 전체</button>
            <br />
            <div>
                <input
                    type="text"
                    placeholder="검색"
                    value={keyword}
                    onChange={(e) => {
                        setKeyword(e.target.value);
                    }} /><button onClick={search}>검색</button>

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
                            <div style={{ border: '2px solid black', width: '200px' }}>
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
export default MyYangdo;