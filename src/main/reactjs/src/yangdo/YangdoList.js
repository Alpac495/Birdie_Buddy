import React, {useEffect, useState} from 'react';
import {Link, NavLink, useNavigate, useParams} from "react-router-dom";
import YangdoRowList from "./YangdoRowList";
import Axios from "axios";

function YangdoList(props) {

    const [data, setData] = useState('');

    const {currentPage} = useParams();
    console.log({currentPage});

    const navi = useNavigate();

    // 페이징 처리에 필요한 데이터 가져오기
    const list=()=>{
        const url = "/yangdo/list?currentPage="+(currentPage==null?1:currentPage);
        Axios.get(url)
            .then(res=>{
                setData(res.data);
            })
    }

    useEffect(()=>{
        list();
    },[currentPage]);   // currentPage가 변경될 때 마다 호출

    const onWriteButtonEvent=()=>{
        if(sessionStorage.unum == null){
            alert("로그인을 해주세요");
            navi("/login/login");
        }else{
            navi("/yangdo/form");
        }
    }

    return (
        <div>
            <button type='button' onClick={onWriteButtonEvent}>글쓰기</button>
            <br/>

            <h2>총 {data.totalCount}개</h2>

            {
                data.list &&
                data.list.map((row,idx)=>
                <YangdoRowList key={idx} row={row} no={data.no} idx={idx}
                currentPage={currentPage}/>)
            }


            <div style={{width:'800px',textAlign:'center'}}>
                {/* 페이징 처리 */}
                {
                    // 이전
                    data.startPage>1?
                        <Link to={`/yangdo/list/${data.startPage-1}`}
                              style={{textDecoration:'none',marginRight:'10px', cursor:'pointer'}}>이전</Link>:''
                }

                {
                    data.parr &&
                    data.parr.map((pno,i)=>

                        <NavLink to={`/yangdo/list/${pno}`} style={{textDecoration:'none'}}>
                            <b style={{marginRight:'10px',
                                color:pno == currentPage?'red':'black'}}>{pno}</b>
                        </NavLink>)
                }

                {
                    // 다음
                    data.endPage<data.totalPage?
                        <Link to={`/yangdo/list/${data.endPage+1}`}
                              style={{textDecoration:'none', cursor:'pointer'}}>다음</Link>:''
                }
            </div>
        </div>
    );
}

export default YangdoList;
