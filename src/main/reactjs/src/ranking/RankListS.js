/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
function RankListS(props) {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const fetchMoreData = () => {
        setLoading(true);
        axios
            .get(`/score/listUser?page=${page}&size=10`) // 페이지 당 10개의 아이템을 요청하도록 수정
            .then((res) => {
                setItems((prevItems) => [...prevItems, ...res.data]);
                setPage((prevPage) => prevPage + 1);
                setLoading(false);
            })
            .catch((error) => {
                console.error("데이터를 더 가져오는 중 오류 발생:", error);
                setLoading(false);
            });
    };
    useEffect(() => {
        fetchMoreData();
    }, []);
    
    return (
        <div>
            <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={true}
                loader={<h4>마지막</h4>}
                endMessage={null}
            >
                {items.map((item, idx) => (
                    <div
                        style={{ border: "3px solid black", height: "100px" }}
                        key={item.unum}
                    >
                        {item.unum}
                    </div>
                ))}
                {/* {items.length > 0 && !loading && (
                    <div style={{ border: "3px solid black", height: "100px" }}>
                        끝
                    </div>
                )} */}
            </InfiniteScroll>
        </div>
    );
}
export default RankListS;
