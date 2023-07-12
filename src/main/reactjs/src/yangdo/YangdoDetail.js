import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate, useParams} from "react-router-dom";
import Axios from "axios";

function YangdoDetail(props) {

    const [dto,setDto] = useState({});
    const {ynum, currentPage} = useParams();

    const navi = useNavigate();

    const photourl=process.env.REACT_APP_YANGDOURL;
    const unum = sessionStorage.unum;

    const selectData=()=>{
        const url = `/yangdo/detail?num=${ynum}`;
        Axios.get(url)
            .then(res=>{
                setDto(res.data);
            })
    }

    useEffect(()=>{
        selectData();
    },[]);


    return (
        <div>
            <b>제목 : {dto.ysubject}</b><br/>
            <b>작성자 : {dto.unum}</b><br/>
            <b>작성일 : {dto.ywriteday}</b><br/>

            {
                dto.yphoto==null?'': <img alt='' src={`${photourl}${dto.yphoto}`}
                                         style={{maxWidth:'500px'}}/>
            }
            <br/>
            <b>골프장 : {dto.yplace}</b><br/>
            <b>가격 : {dto.yprice}</b><br/>
            <b>예약 일정 : {dto.yday}</b><br/>
            <b>상세 내용 : {dto.ycontent}</b><br/>

            <button type='button' onClick={()=>navi(`/yangdo/form`)}>글쓰기</button>
            <br/>
            <button type='button' onClick={()=>navi(`/yangdo/list/${currentPage}`)}>목록</button>
            <br/>

            {
                unum !=null && unum==dto.unum?
                <button type='button' onClick={()=>{
                    const url=`/yangdo/delete?num=${dto.ynum}`;
                    Axios.delete(url)
                        .then(res=>{
                            // 목록으로 이동
                            navi(`/yangdo/list/${currentPage}`);
                        })
                }}>삭제</button>:''
            }
            <br/>

            {

            }
        </div>
    );
}

export default YangdoDetail;