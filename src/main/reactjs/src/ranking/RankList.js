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
import MyRank from './MyRank';
import AllRank from './AllRank';

function RankList(props) {
    const [unum, setUnum] = useState(0);
    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [myRanking, setMyRanking] = useState(true);
    const medal = process.env.REACT_APP_RANKING;
    const image1 = process.env.REACT_APP_IMAGE1PROFILE;
    const image2 = process.env.REACT_APP_IMAGE87;
    const isUnumFound = list.some(item => item.unum === unum);

    

    useEffect(() => {
        unumchk();
        getList();
    }, []);

    const unumchk = () => {
        Axios.get("/login/unumChk?unum=" + unum)
            .then(res => {
                setUnum(res.data);
            })
    }

    function switchList() {
        setMyRanking(prevMyRanking => !prevMyRanking);
        if (!isUnumFound) {
            alert("스코어 등록이 필요합니다");
            window.location.replace("/score/form");        
        }
    }

    const getList = () => {
        Axios.get(`/score/list?page=${page}&size=7`)
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
            <div className='header'>
                <Header />
            </div>

            <div className='ranking_List'  style={{ backgroundImage: 'url(http://kr.object.ncloudstorage.com/bit701-bucket-111/birdiebuddy/ranking/golf_ranking.jpg)' }}>
                <div className='ranking_search'>
                    <div style={{ visibility: 'hidden' }} >dd</div>
                    <div>
                        <button type='button' onClick={() => switchList()}>
                            내 순위
                        </button>
                    </div>
                </div>
                {myRanking?(<AllRank/>) : (<MyRank unum={unum}/>)}
           </div>
        </div>
    );
}

export default RankList;