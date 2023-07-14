import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Axios from "axios";
import "./FriendDetail.css";
import FDicon1 from "../image/icon_addbuddy.svg";
import FDicon2 from "../image/icon_buddychat.svg";
import FDicon3 from "../image/icon_buddystory.svg";

function FriendDetail(props) {
    const [dto,setDto]=useState('');
    const {funum}=useParams('');

    const selectData=useCallback(()=>{
        const url=`/friend/detail?funum=${funum}`;
        Axios({
            type:'get',
            url,
            // headers: {Authorization:`Bearer ${sessionStorage.token}`},
        }).then(res=>{
            setDto(res.data);
            console.log(res.data)
        })
    },[])

    useEffect(()=>{
            selectData();
    },[selectData]);

    return (
        <div className="FDprofile">
            <div className="FDdiv">
                <div className="FDchild" />
            </div>
            <div className="FDbackprofile" />
            <div className="FDinfobox" />
            <div className="FDmainprofile" />
            <div className="FDdiv2">
        <span className="FDtxt">
          <p className="FDp">{dto.uage} {dto.ugender==="1"?"남자":"여자"}</p>
          <p className="FDp">골프경력 1년 평균타수 89타</p>
        </span>
            </div>
            <div className="FDdiv3">{dto.ucontent}</div>
            <div className="FDdiv4">{dto.unickname}</div>
            <div className="FDicon-message-parent">
                <img className="FDicon-message" alt="" src={FDicon2} />
                <div className="FDdiv5">버디채팅</div>
            </div>
            <div className="FDicon-camera-parent">
                <img className="FDicon-camera" alt="" src={FDicon3} />
                <div className="FDdiv5">버디스토리</div>
            </div>
            <div className="FDparent">
                <div className="FDdiv5">버디추가</div>
                <img
                    className="FDicon-user-cirlce-add"
                    alt="" src={FDicon1} />
            </div>
        </div>
    );
}

export default FriendDetail;