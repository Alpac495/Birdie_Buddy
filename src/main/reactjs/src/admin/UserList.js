import React, {useCallback, useEffect, useState} from 'react';
import "./UserList.css";
import {Link, NavLink} from 'react-router-dom';
import axios from 'axios';
function UserList(props) {
    const [searchTerm, setSearchTerm] = useState("");
    
    const [data,setData]=useState('');
    const list=useCallback(()=>{
        const url="/admin/userlist";
        axios.get(url)
            .then(res=>{
                setData(res.data);
            })
    },[]);
    const  addBlackList=(unum)=>{
        axios.get('/admin/addBlackList?unum='+unum)
        
    }
    useEffect(()=>{
        list();
    },[list, addBlackList])





    return (
        <div className="friend">
            <h4>전체 사용자 : {data.length}명</h4>
            <input className="usersearch"
                   type="text"
                   placeholder="이름 또는 닉네임으로 검색"
                   onChange={(e) => {
                       setSearchTerm(e.target.value);
                   }}/>

            <div className="FLtab">
                <NavLink to={`/admin/userlist`}>
                    <div className="flframe">
                        <div className="FLdiv">전체 사용자 리스트</div>
                    </div>
                </NavLink>
                <NavLink to={`/admin/blacklist`}>
                    <div className="FLframe">
                        <div className="FLdiv">블랙리스트</div>
                    </div>
                </NavLink>
            </div>

            {
                data.map &&
                data.filter((val)=>{
                    if(searchTerm == ""){
                        return val
                    }else if(val.uname.includes(searchTerm)){
                        return val
                    }else if(val.unickname.includes(searchTerm)){
                        return val
                    }
                }).map((item,idx)=>

                    <div className="flist">
                        <div className="flist-child" />
                        <div className="flistprofile">
                                <div className="flistprofile1">
                                    <Link to={`/friend/detail/${item.funum}`} className="FDMoveLink">
                                    <img className="FLphoto-icon" alt="" src="/jduphoto@2x.png" />
                                    </Link>
                                    <div className="FLdiv3">
                                      <span className="FLtxt">
                                        <p className="FLp">{item.uname}({item.unickname})</p>
                                        <p className="FLp1">{item.ugender} / {item.uage}</p>
                                      </span>
                                    </div>

                                    <div className="FLrectangle-parent">
                                        <div className="FLgroup-child" />
                                            <div className="FLdiv4" onClick={(e)=>addBlackList(item.unum)}>차단하기</div>                                        
                                    </div>
                                </div>
                        </div>
                    </div>
                 )
            }

        </div>
    );
}

export default UserList;