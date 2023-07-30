import Axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, NavLink } from 'react-router-dom';
import Header from '../header/Header';
import Profile from "../image/user60.png";
import _ from "lodash"

function Blacklist(props) {
    const url = process.env.REACT_APP_PROFILE;
    const [searchTerm, setSearchTerm] = useState("");    
    const [data,setData]=useState('');
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState('');

    const fetchMoreData=()=>{
        setLoading(true);
                Axios
                    .get(`/admin/getBlackList?page=${page}&size=20`) // size=페이지 당 n개의 아이템을 요청하도록 수정
                    .then((res) => {
                        const newData = _.uniqBy([...items, ...res.data], 'unum');
                        setItems(newData);
                        console.log(items);
                        console.log(res.data);
                        setPage((prevPage) => prevPage + 1);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("데이터를 더 가져오는 중 오류 발생:", error);
                        setLoading(false);
                    });
    };

    const removeBlackList=(unum)=>{
        Axios.get('/admin/removeBlackList?unum='+unum)
    }

    useEffect(()=>{
        fetchMoreData();
    },[])

    const search = () => {
        Axios.get("/admin/blacksearchlist?keyword=" + keyword)
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

    const image1 = process.env.REACT_APP_IMAGE1PROFILE;
    const image2 = process.env.REACT_APP_IMAGE87;

    return (
        <div className="alluserlist">
            <div className="header"><Header/></div>
            <input className="usersearch"
                   type="text"
                   placeholder="이름 또는 닉네임으로 "
                   value={keyword}
                    onChange={(e) => {
                        setKeyword(e.target.value);
                    }}/>
                <button className="ULsearch btn btn-sm btn-outline" onClick={search}>🔎</button>

            <div className="ULtab">
                <NavLink to={`/admin/userlist`} style={{color:'black'}}> 
                    <div className="bflframe">
                        <div className="ULdiv">전체 사용자 리스트</div>
                    </div>
                </NavLink>
                <NavLink to={`/admin/blacklist`} style={{color:'black'}}>
                    <div className="bFLframe">
                        <div className="ULdiv">블랙리스트</div>
                    </div>
                </NavLink>
            </div>
            <div className='adminuserlist'>
            <InfiniteScroll
                    dataLength={items.length}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={<h4>마지막</h4>}
                    endMessage={null}
                >

            {
                items.map &&
                items.map((item,idx)=>
                    <div className="ulist">
                        <div className="ulistprofile">
                                <div className="ulistprofile1">
                                    <Link to={`/friend/detail/${item.unum}`} className="FDMoveLink">
                                    {item.uphoto == null ? <img className="FLphoto-icon" alt="" src={Profile} /> :
                                    <img className="FLphoto-icon" src={`${image1}${item.uphoto}${image2}`} alt={''}/>}
                                    </Link>
                                    <div className="ULdiv3">
                                      <span className="ULtxt">
                                        <p className="ULp">{item.uname}({item.unickname})</p>
                                        <p className="ULp1">신고 : {item.ureport}회</p>
                                      </span>
                                    </div>

                                    <div className="ULrectangle-parent">
                                        <div className="ULgroup-child" />
                                            <div className="ULdiv4" onClick={(e)=>removeBlackList(item.unum)}>차단해제</div>                                        
                                    </div>
                                </div>
                        </div>
                    </div>
                 )
            }
            </InfiniteScroll>
        </div></div>
    );
}

export default Blacklist;