import React, {useCallback, useEffect, useState} from 'react';
import "./UserList.css";
import {Link, NavLink, useNavigate} from 'react-router-dom';
import Axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import Profile from "../image/user60.png";
import Header from '../header/Header';
import _ from "lodash"
function UserList(props) {
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
                    .get(`/admin/getuserlist?page=${page}&size=20`) // size=페이지 당 n개의 아이템을 요청하도록 수정
                    .then((res) => {
                        const newData = _.uniqBy([...items, ...res.data], 'unum');
                        setItems(newData);
                        setPage((prevPage) => prevPage + 1);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("데이터를 더 가져오는 중 오류 발생:", error);
                        setLoading(false);
                    });
    };
    const  addBlackList=(unum)=>{
        Axios.get('/admin/addBlackList?unum='+unum)
        
    }
    useEffect(()=>{
        fetchMoreData();
    },[])

    const search = () => {
        Axios.get("/admin/usersearchlist?keyword=" + keyword)
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

    const navigate = useNavigate();

    const handleReportCheckClick = (unum) => {
        navigate(`/admin/report/${unum}`);
    };

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
                    <div className="uflframe">
                        <div className="ULdiv">전체 사용자 리스트</div>
                    </div>
                </NavLink>
                <NavLink to={`/admin/blacklist`} style={{color:'black'}}>
                    <div className="uFLframe">
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
                                    <img className="FLphoto-icon" src={`${url}${item.uphoto}`} alt={''}/>}
                                    </Link>
                                    <div className="ULdiv3">
                                      <span className="ULtxt">
                                        <p className="ULp">{item.uname}({item.unickname}) </p>
                                        <p className="ULp1">신고 : {item.ureport}회</p>
                                      </span>
                                    </div>

                                    <div className="ULrectangle-parent">
                                        <div className="ULgroup-child" />
                                        <div className="ULdiv4" onClick={() => handleReportCheckClick(item.unum)}>신고 내역 확인</div>                                    </div>
                                </div>
                        </div>
                    </div>
                 )
            }
            </InfiniteScroll>
            </div>
        </div>
    );
}

export default UserList;