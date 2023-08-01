import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import "./FriendDetail.css";
import * as ncloudchat from 'ncloudchat';

import FDicon1 from "../image/icon_addbuddy.svg";
import FDicon2 from "../image/icon_buddychat.svg";
import FDicon3 from "../image/icon_buddystory.svg";
import ModalReport from "./ModalReport";
import SingoBtn from "../image/btn_singo.svg";
import Header from "../header/Header";
import { Button } from '@mui/base';
import profile3 from "../image/profile90x90.png";
import back from "../image/bgphoto.png";

function FriendDetail(props) {
    const image1 = process.env.REACT_APP_IMAGE1PROFILE;
    const image2 = process.env.REACT_APP_IMAGE87;
    const url2 = process.env.REACT_APP_BGPHOTO;
    const [unum, setUnum] = useState('');
    const [dto, setDto] = useState('');
    const { funum } = useParams('');
    const [checkbuddy, setCheckbuddy] = useState('');
    const [requestcheck, setRequestCheck] = useState([]);
    const [stasu, setStasu] = useState('');
    const [nc, setNc] = useState('');
    const navi = useNavigate();
    const [reportModalOpen, setReportModalOpen] = useState(false);
    const [reportReason, setReportReason] = useState('');

    const unumchk = async () => {
        const res1 = await Axios.get("/apilogin/unumChk");
        const unum = res1.data;
        setUnum(res1.data);

        const url = `/apifriend/checkbuddy?unum=${res1.data}&funum=${funum}`;
        const res2 = await Axios.get(url);
        setCheckbuddy(res2.data);

        const frurl = `/apifriend/requestcheck?unum=${res1.data}`;
        const res3 = await Axios.get(frurl);
        setRequestCheck(res3.data);

        const res4 = await Axios.get(`/apilogin/getRtasu?unum=${funum}`);
        setStasu(res4.data);

        const getUserInfourl = `/apichating/getuserinfo?unum=${unum}`;
        const res5 = await Axios.get(getUserInfourl);
        const userInfo = res5.data;

        const chat = new ncloudchat.Chat();
        chat.initialize('08c17789-2174-4cf4-a9c5-f305431cc506');
        setNc(chat);

        await chat.connect({
            id: res5.data.uemail,
            name: res5.data.unickname,
            profile: 'https://image_url',
            customField: 'json',
        });
    };

    useEffect(() => {
        unumchk();
    }, []);

    const getChatInfo = async (unum, cunum) => {
        try {
            console.log("getChatInfo");
            console.log("unum1: " + unum);
            console.log("unum2: " + cunum);
            const response = await Axios.get(`/apichating/getchatinfo?unum1=${unum}&unum2=${cunum}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const onMyStory = () => {
        navi(`/hugi/list/${funum}`);
    }

    const onChatEvent = async (cunum) => {
        if (nc) {
            try {
                const chatid = await getChatInfo(unum, cunum);
                console.log("chatid:" + chatid);
                if (chatid) {
                    // chatid != null 일 경우
                    await nc.disconnect();
                    navi(`/chating/room/${chatid}/${cunum}`);
                } else {
                    // chatid == null 일 경우
                    const newchannel = await nc.createChannel({ type: 'PUBLIC', name: String(unum) + " " + String(cunum) });
                    const newChatId = newchannel.id;
                    await nc.subscribe(newChatId);

                    await Axios.post("/apichating/insertchatid", { unum, cunum, chatid: newChatId });

                    alert("정상적으로 생성되었습니다");
                    // 채팅방으로 이동
                    await nc.disconnect();
                    navi(`/chating/room/${newChatId}/${cunum}`);
                }
            } catch (error) {
                console.error('Error creating and subscribing channel:', error);
            }
        }
    };

    const selectData = useCallback(() => {
        const url = `/apifriend/detail?funum=${funum}`;
        Axios({
            type: 'get',
            url,
            // headers: {Authorization:`Bearer ${sessionStorage.token}`},
        }).then(res => {
            setDto(res.data);
            console.log(res.data)
        })
    }, [])

    useEffect(() => {
        selectData();
    }, [selectData]);

    const onRequestFriendEvent = (e) => {
        e.preventDefault();
        const confirmed = window.confirm('버디 요청을 하시겠습니까?');
        if (confirmed) {
            Axios.post("/apifriend/requestfriend1", { unum, funum })
                .then(res => {

                })
                .catch(err => {
                    console.log(err.message);
                })
            Axios.post("/apifriend/requestfriend2", { unum, funum })
                .then(res => {
                    alert("버디 요청이 되었습니다. 상대방이 수락시 버디리스트에서 확인 가능합니다.")
                    window.location.replace(`/friend/detail/${funum}`)
                })
                .catch(err => {
                    console.log(err.message);
                })
        }
    }

    const onFriendCancelEvent = () => {
        const confirmed = window.confirm('정말 취소하시겠습니까?');
        if (confirmed) {
            Axios.delete(`/apifriend/friendcancel/${unum}&${funum}`)
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
            Axios.get(`/apifriend/acceptfriend/${unum}&${funum}`)
                .then(res => {
                    alert("버디 추가 완료. 버디 리스트에서 확인하세요.");
                    window.location.replace(`/friend/detail/${funum}`);
                })
                .catch(err => {
                    console.log(err.message);
                });
        }
    };

    useEffect(() => {
        const disconnectChat = async () => {
            if (nc) {
                await nc.disconnect();
            }
        };

        window.addEventListener('beforeunload', disconnectChat);

        // When component unmounts, disconnect
        return () => {
            window.removeEventListener('beforeunload', disconnectChat);
            disconnectChat();
        };
    }, [nc]);

    const handleReportSubmit = async () => {
        // axios를 사용하여 신고 사유를 서버에 전송합니다.
        try {
            console.log("신고자 : " + unum);
            console.log("피 신고자 : " + dto.unum);

            const response = await Axios.post('/apireport/newReport', {
                unum: unum,
                runum: dto.unum,
                reason: reportReason
            });
            console.log("신고 응답" + response.data);  // 서버로부터의 응답 확인

            handleClose();  // 신고가 완료되면 모달을 닫습니다.
        } catch (error) {
            console.error(error);  // 에러 처리
        }
    };

    const handleReportClick = () => {
        setReportModalOpen(true);
    };

    const handleClose = () => {
        setReportModalOpen(false);
        setReportReason('');  // 모달을 닫을 때 신고 사유 초기화
    };
    if (dto == '') {
        return (
            <>
            </>
        )
    } else {
        return (
            <div className="FD3profile">
                <Header />
                {/* <div className="FD3backprofile" /> */}
                {
                    dto.ubgphoto == null || '' ?
                        <img alt='error' className="FD3backprofile" src={back} />
                        :
                        <img alt='error' className="FD3backprofile" src={`${url2}${dto.ubgphoto}`} />
                }

                <div className="FD3div" />
                <div className="FD3myinfo">
                    <div className="FD3infobox" />
                </div>
                <div className="FD3about">
                    <span className="FD3about-txt">
                        <p className="FD3p">{dto.uage} {dto.ugender === "남" ? "남자" : "여자"}</p>
                        <p className="FD3p">골프경력 {dto.ucareer} /&nbsp;
                            {
                                stasu == null || stasu == '' || stasu == 0 ?
                                    <span> 타수 정보가 없습니다</span> :
                                    <span>
                                        평균타수 {stasu}타
                                    </span>
                            }
                        </p>
                    </span>
                </div>
                <div className="FD3buddystory" onClick={onMyStory}>
                    <img className="FD3icon-buddystory" alt="" src={FDicon3} />
                    <div className="FD3div2">버디스토리</div>
                </div>
                <div className="FD3buddystory1" onClick={onChatEvent.bind(null, funum)}>
                    <img className="FD3icon-buddystory1" alt="" src={FDicon2} />
                    <div className="FD3div2">버디채팅</div>
                </div>
                {checkbuddy === 1 ? (
                    <div className="FD3addbuddy" onClick={onFriendCancelEvent}>
                        <div className="FD3div3">버디 취소</div>
                        <img
                            className="FD3icon-addbuddy"
                            alt="" src={FDicon1} />
                    </div>
                ) : requestcheck.some((friend) => friend.funum == funum && friend.frequest == 2) ? (
                    <div className="FD3addbuddy" onClick={onAcceptEvent}>
                        <div className="FD3div3">버디 요청 수락</div>
                        <img
                            className="FD3icon-addbuddy"
                            alt="" src={FDicon1} />
                    </div>
                ) : requestcheck.some((friend) => friend.funum == funum && friend.frequest == 1) ? (
                    <div className="FD3addbuddy" onClick={onFriendCancelEvent}>
                        <div className="FD3div3">버디 요청 취소</div>
                        <img
                            className="FD3icon-addbuddy"
                            alt="" src={FDicon1} />
                    </div>
                ) : (
                    <div className="FD3addbuddy" onClick={onRequestFriendEvent}>
                        <div className="FD3div3">버디 요청</div>
                        <img
                            className="FD3icon-addbuddy"
                            alt="" src={FDicon1} />
                    </div>
                )}
                <div className="FD3nick">
                    <div className="FD3div4">{dto.unickname}</div>

                </div>
                <div className="FD3text">
                    <div className="FD3div5">
                        {dto.ucontent}
                    </div>

                </div>
                <div className="FD3photogroup">
                    {/* <div className="FD3mainprofile" /> */}
                    {
                        dto.uphoto == null || '' ?
                            <img alt='error' className="FD3mainprofile" style={{}} src={profile3} />
                            :
                            <img alt='error' className="FD3mainprofile" style={{ borderRadius: '11%' }} src={`${image1}${dto.uphoto}${image2}`} />
                    }
                </div>
                <img className="FD3backimgicon" alt="" src={SingoBtn} onClick={handleReportClick} />
                {reportModalOpen &&
                    <ModalReport
                        reporterNickname={unum}
                        reportedNickname={dto.unum}
                        reportReason={reportReason}
                        setReportReason={setReportReason}
                        reportUser={handleReportSubmit}
                        handleClose={handleClose}
                    />
                }

            </div>




        );
    }
}

export default FriendDetail;