import React, {useCallback, useEffect, useState} from 'react';
import Axios from "axios";
import "./Friend.css";
import { Link } from 'react-router-dom';
function Friend(props) {
    const unum=sessionStorage.unum;
    const [data,setData]=useState('');
    const list=useCallback(()=>{
        const url="/friend/list?unum="+(unum);
        Axios.get(url)
            .then(res=>{
                setData(res.data);
                console.log(res.data)
            })
    },[]);

    useEffect(()=>{
        list();
    },[list])



    return (
        <div className="friend">
            <h4>마이 버디 : {data.length}명</h4>

            <div className="FLtab">
                <div className="flframe">
                    <div className="FLdiv">버디 리스트</div>
                </div>
                <div className="FLframe">
                    <div className="FLdiv">버디 요청</div>
                </div>
            </div>

            {
                data.map &&
                data.map((item,idx)=>

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
                                        <p className="FLp1">{item.ugender} /{item.uage}</p>
                                      </span>
                                    </div>

                                    <div className="FLrectangle-parent">
                                        <div className="FLgroup-child" />
                                        <div className="FLdiv4">채팅하기</div>
                                    </div>
                                </div>
                        </div>
                    </div>
                 )
            }

        </div>
    );
}

export default Friend;