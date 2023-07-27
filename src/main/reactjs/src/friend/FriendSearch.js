import "./FriendSearch.css";
import Header from "../header/Header";
import Profile from "../image/user60.png";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const FriendSearch = () => {
    const url = process.env.REACT_APP_PROFILE;
    const [searchTerm, setSearchTerm] = useState("");
    const now = new Date();
    const year = now.getFullYear();
    const [unum, setUnum]=useState('');
    const [data,setData]=useState('');
    const [myfrienddata,setMyfriendData]=useState([]);
    const [requestcheck,setRequestCheck]=useState([]);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState('');
    
    const fetchMoreData=()=>{
        Axios.get("/login/unumChk")
        .then(res=> {
            setUnum(res.data);
            setLoading(true);
                Axios
                    .get(`/friend/friendsearch?unum=${res.data}&page=${page}&size=12`) // size=페이지 당 n개의 아이템을 요청하도록 수정
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
            // const url="/friend/friendsearch?unum="+res.data;
            // Axios.get(url)
            // .then(res=>{
            //     setData(res.data);
            // })
            const furl="/friend/list?unum="+res.data;
            Axios.get(furl)
            .then(res=>{
                setMyfriendData(res.data);
            })
            const frurl="/friend/requestcheck?unum="+res.data;
            Axios.get(frurl)
            .then(res=>{
                setRequestCheck(res.data)
            })
        });
    }
    useEffect(() => {
        fetchMoreData()
    }, [])    

    const search = () => {
        Axios.get("/friend/friendsearchlist?unum="+unum+"&keyword=" + keyword)
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

    const onRequestFriendEvent=(funum)=>{
        const confirmed = window.confirm('버디 요청을 하시겠습니까?');
            if (confirmed) {
                Axios.post("/friend/requestfriend1", {unum, funum})
                    .then(res => {

                    })
                    .catch(err => {
                        console.log(err.message);
                    })
                Axios.post("/friend/requestfriend2", {unum, funum})
                    .then(res => {
                        alert("버디 요청이 되었습니다. 상대방이 수락시 버디리스트에서 확인 가능합니다.")
                        window.location.replace(`/friend/search`)
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
            }
        }

    const alreadyfriend = ()=> {
        alert("이미 친구인 사용자입니다");
    }

    const alreadyrequest1 = () => {
        alert("요청 중입니다. 수락을 기다려 주세요.");
    }

    const alreadyrequest2 = () => {
        alert("이미 친구 요청을 받았습니다. 요청 목록 또는 해당 사용자 프로필에서 확인해주세요.");
    }
    
    return (
        <div className="AFallfriendlist">
            <Header/>
            {/* <div className="AFdiv">골프버디를 찾아보세요!</div> */}
            <input className="AFyou"
                   type="text"
                   placeholder="골프버디를 찾아보세요!"
                   value={keyword}
                    onChange={(e) => {
                        setKeyword(e.target.value);
                    }}/><button className="AFsearch btn btn-sm btn-outline-success" onClick={search}>검색</button>
                    <InfiniteScroll
                    dataLength={items.length}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={<h4>마지막</h4>}
                    endMessage={null}
                >
            <div className="AFitem-grid-tiles-3x3">
            {
                items.map &&
                items.filter((val) => {
                    if (searchTerm === "") {
                    return val;
                    } else if (val.ugender.includes(searchTerm) || val.unickname.includes(searchTerm)) {
                    return val;
                    }
                }).map((item, idx) => (
                    <div className="AFitem-2" key={idx}>
                    <Link to={`/friend/detail/${item.unum}`} style={{ color: 'black' }}>
                        {item.uphoto == null ? <img className="AFjduphoto-icon" alt="" src={Profile} /> :
                        <img className="AFjduphoto-icon" src={`${url}${item.uphoto}`} alt={''}/>}                        
                    </Link>
                    <div className="AFdiv1">{item.ugender} / {year - (parseInt(item.uage.substring(0, 4), 10))}세</div>
                    <div className="AFdiv2">{item.unickname}</div>
                    {myfrienddata.some((friend) => friend.funum === item.unum) ? (
                        <button className="AFdiv3 btn btn-sm btn-outline-success" onClick={alreadyfriend}>마이버디</button>
                    ) : requestcheck.some((friend) => friend.funum == item.unum && friend.frequest == 2) ? (
                        <button className="AFdiv3 btn btn-sm btn-outline-success" onClick={alreadyrequest2}>요청받음</button>
                    ) : requestcheck.some((friend) => friend.funum == item.unum && friend.frequest == 1) ? (
                        <button className="AFdiv3 btn btn-sm btn-outline-success" onClick={alreadyrequest1}>요청중</button>
                    ) : (
                        <button className="AFdiv3 btn btn-sm btn-outline-success" onClick={onRequestFriendEvent.bind(null, item.unum)}>버디요청</button>
                    )}
                    </div>
                ))
                }

            </div></InfiniteScroll>
        </div>
    );
};

export default FriendSearch;
