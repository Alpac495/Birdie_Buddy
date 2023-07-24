import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Axios from "axios";
import "./FriendDetail.css";
import FDicon1 from "../image/icon_addbuddy.svg";
import FDicon2 from "../image/icon_buddychat.svg";
import FDicon3 from "../image/icon_buddystory.svg";

function FriendDetail(props) {
    const [unum, setUnum]=useState('');
    const [dto,setDto]=useState('');
    const {funum}=useParams('');
    const [checkbuddy, setCheckbuddy]=useState('');
    const [requestcheck,setRequestCheck]=useState([]);
    const unumchk=()=>{
        Axios.get("/login/unumChk")
        .then(res=> {
            setUnum(res.data);
            const url = "/friend/checkbuddy?unum="+(res.data)+"&funum="+(funum);
            console.log(res.data)
            Axios.get(url)
                .then(res=>{
                    setCheckbuddy(res.data)
                });
            const frurl="/friend/requestcheck?unum="+res.data;
            Axios.get(frurl)
            .then(res=>{
                setRequestCheck(res.data)
            })
        });
    }
    useEffect(() => {
        unumchk()
    }, [])
    

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

    const onRequestFriendEvent=(e)=>{
        e.preventDefault();
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
                        window.location.replace(`/friend/detail/${funum}`)
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
            }
        }

    const onFriendCancelEvent=()=> {
        const confirmed = window.confirm('정말 취소하시겠습니까?');
        if (confirmed) {
            Axios.delete(`/friend/friendcancel/${unum}&${funum}`)
                .then(res => {
                    alert("정상적으로 취소되었습니다");
                    window.location.replace(`/friend/detail/${funum}`)
                })
                .catch(err => {
                    console.log(err.message);
                })
        }
    };

    const onAcceptEvent = () => {
        const confirmed = window.confirm('신청을 수락하시겠습니까?');
            if (confirmed) {
                Axios.get(`/friend/acceptfriend/${unum}&${funum}`)
                    .then(res => {
                        alert("버디 추가 완료. 버디 리스트에서 확인하세요.");
                        window.location.replace(`/friend/detail/${funum}`);
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            }
    };


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
            {checkbuddy === 1 ? (
            <div className="FDparent" onClick={onFriendCancelEvent}>
                <div className="FDdiv5">버디 취소</div>
                <img
                    className="FDicon-user-cirlce-add"
                    alt="" src={FDicon1} />
            </div>
            ) : requestcheck.some((friend) => friend.funum == funum && friend.frequest == 2) ? (
                <div className="FDparent" onClick={onAcceptEvent}>
                <div className="FDdiv5">버디 요청 수락</div>
                <img
                    className="FDicon-user-cirlce-add"
                    alt="" src={FDicon1} />
                </div>
            ) : requestcheck.some((friend) => friend.funum == funum && friend.frequest == 1) ? (
                <div className="FDparent" onClick={onFriendCancelEvent}>
                <div className="FDdiv5">버디 요청 취소</div>
                <img
                    className="FDicon-user-cirlce-add"
                    alt="" src={FDicon1} />
                </div>
            ) : (
                <div className="FDparent" onClick={onRequestFriendEvent}>
            <div className="FDdiv5">버디 요청</div>
            <img
                className="FDicon-user-cirlce-add"
                alt="" src={FDicon1} />
        </div>
            )}
        </div>
            

    );
}

export default FriendDetail;