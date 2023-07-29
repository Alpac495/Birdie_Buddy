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
        <div className="Ylyangdolist">
      <div className="Ylyangdolist-child" />
      <div className="Ylrectangle-parent">
        <div className="Ylgroup-child" />
        <div className="Yldiv">마이 양도</div>
      </div>
      <div className="Ylrectangle-group">
        <div className="Ylgroup-item" />
        <img className="Ylicon-pencil-thin" alt="" src={pen} />
      </div>
      <div className="Yldiv1">검색</div>
      <img className="Ylicon-search" alt="" src={search} />
      <div className="Ylblacklistmodalveticalframe">
        <div className="Ylgroup-parent">
          <div className="Ylrectangle-container">
            <div className="Ylgroup-inner" />
            <div className="Yldiv2">건설공제조합 세종필드 골프 클럽</div>
            <div className="Yldiv3">그린피 : 8,000원</div>
            <div className="Ylam">09:00 AM</div>
          </div>
          <div className="Ylgroup-div">
            <div className="Ylrectangle-div" />
            <img className="Ylgroup-icon" alt="" src={''} />
            <div className="Yldiv4">닉네임</div>
            <div className="Yldiv5">{`작성일 : `}</div>
          </div>
          <div className="Ylrectangle-parent1">
            <div className="Ylgroup-child1" />
            <div className="Yldiv6">23.07</div>
            <div className="Yldiv7">27</div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default YangdoList;