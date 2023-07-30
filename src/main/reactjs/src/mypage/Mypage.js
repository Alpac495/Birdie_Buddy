/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import './Mypage.css';
import './MypageModal.css';
import UpdateIcon from "../image/icon_update.svg";
import EditIcon from '@mui/icons-material/Edit';
import BackPhoto from "../image/icon_mybackphoto.svg";
import Photoicon from "../image/icon_myphoto.svg"
import FDicon2 from "../image/icon_buddychat.svg";
import FDicon3 from "../image/icon_buddystory.svg";
import FDicon1 from "../image/icon_addbuddy.svg";
import ModalNick from "./MypageUpdateNickname"
import ModalCon from "./MypageUpdateContent"
import ModalPhoto from "./MypageUpdatePhoto"
import ModalBgphoto from "./MypageUpdateBgphoto"
import Axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import userprofile from "../image/userprofile.svg";
import profile3 from "../image/profile3.png";
import back from "../image/bgphoto.png";
function Mypage(props) {
    const url = process.env.REACT_APP_PROFILE;
    const url2 = process.env.REACT_APP_BGPHOTO;
    const image1 = process.env.REACT_APP_IMAGE1PROFILE;
    const image2 = process.env.REACT_APP_IMAGE87;
    const navi = useNavigate();
    const [dto, setDto] = useState([]);
    const [ucontent, setUcontent] = useState('');
    const [imsiCon, setImsiCon] = useState('');
    const [unickname, setUnickname] = useState('');
    const [imsiNick, setImsiNick] = useState('');
    const [unum, setUnum] = useState('');
    const [uphoto, setUphoto] = useState('');
    const [imsiphoto, setImsiphoto] = useState('');
    const [ubgphoto, setUbgphoto] = useState('');
    const [imsibgphoto, setImsibgphoto] = useState('');
    const [stasu, setStasu] = useState('');
    const conRef = useRef();
    const nickRef = useRef();
    const photoRef = useRef();
    const bgphotoRef = useRef();
    const [reportReason, setReportReason] = useState('');
    const unumchk = () => {
        axios.get("/login/unumChk")
            .then(res => {
                axios.get("/login/getuser?unum=" + res.data)
                    .then(res => {
                        console.log(res.data);
                        setDto(res.data);
                        setUnickname(res.data.unickname);
                        setImsiNick(res.data.unickname);
                        setUcontent(res.data.ucontent);
                        setImsiCon(res.data.ucontent);
                        setUphoto(res.data.uphoto);
                        setImsiphoto(res.data.uphoto);
                        setUbgphoto(res.data.ubgphoto);
                        setImsibgphoto(res.data.ubgphoto);
                        setUnum(res.data.unum);
                        axios.get("/login/getRtasu?unum=" + res.data.unum)
                            .then(res => {
                                setStasu(res.data);
                            })
                    })
            })
    }

    const onMyStory = () => {
        navi(`/hugi/list/${unum}`);
    }
    const onMyBuddy = () => {
        navi(`/friend/list`);
    }
    const onMyChating = () => {
        navi(`/chating/${unum}`);
    }
    const changeCon = () => {
        setUcontent(conRef.current.value)
        axios.get(`/login/updateCon?ucontent=${conRef.current.value}&unum=${unum}`)
            .then(res => {
                console.log(res.data)
                setUcontent(res.data);
            })
        setConOpen(false);
    }
    const changeNick = () => {
        setUnickname(nickRef.current.value)
        axios.get(`/login/updateNick?unickname=${nickRef.current.value}&unum=${unum}`)
            .then(res => {
                console.log(res.data)
                setUnickname(res.data);
            })
        setNickOpen(false);
    }
    const changePhoto = () => {
        axios.get(`/login/updatePhoto?uphoto=${imsiphoto}&unum=${unum}`)
            .then(res => {
                console.log(res.data)
                setUphoto(res.data);
            })
        setPhotoOpen(false);
    }
    const changebgphoto = () => {
        axios.get(`/login/updateBgPhoto?ubgphoto=${imsibgphoto}&unum=${unum}`)
            .then(res => {
                console.log(res.data)
                setUbgphoto(res.data);
            })
        setBgOpen(false);
    }
    const [nickOpen, setNickOpen] = useState(false);
    const openNick = () => {
        setNickOpen(true);
    };
    const closeNick = () => {
        setNickOpen(false);
    };
    const [conOpen, setConOpen] = useState(false);
    const openCon = () => {
        setConOpen(true);
    };
    const closeCon = () => {
        setConOpen(false);
    };
    const [photoOpen, setPhotoOpen] = useState(false);
    const openPhoto = () => {
        setPhotoOpen(true);
    };
    const closePhoto = () => {
        setPhotoOpen(false);
    };
    const [bgOpen, setBgOpen] = useState(false);
    const openBg = () => {
        setBgOpen(true);
    };
    const closeBg = () => {
        setBgOpen(false);
    };
    const onUploadEvent = (e) => {
        const uploadFile = new FormData();
        uploadFile.append('upload', e.target.files[0]);
        Axios.post('/login/upload', uploadFile)
            .then((res) => {
                console.log(res.data);
                setImsiphoto(res.data);
            })
    };
    const onUploadEventBg = (e) => {
        const uploadFile = new FormData();
        uploadFile.append('upload', e.target.files[0]);
        Axios.post('/login/bgupload', uploadFile)
            .then((res) => {
                console.log(res.data);
                setImsibgphoto(res.data);
            })
    };
    useEffect(() => {
        unumchk()
    }, [])
    if (unum == '') {
        return (
            <>
            </>
        )
    } else {
        return (
            <div className="MP2profile">
                <Header />
                {
                    ubgphoto == null || '' ?
                        <img alt='error' className="MP2backprofile" src={back} />
                        :
                        <img alt='error' className="MP2backprofile" src={`${url2}${imsibgphoto}`} />
                }
                <div className="MP2div" />
                <div className="MP2infobox-wrapper">
                    <div className="MP2infobox" />
                </div>


                <div className="MP2mainprofile">
                    {
                        uphoto == null || '' ?
                            <img alt='error' style={{}} src={profile3} />
                            :
                            <img alt='error' style={{ borderRadius: '11%' }} src={`${image1}${uphoto}${image2}`} />
                    }
                    <ModalPhoto open={photoOpen} close={closePhoto} changePhoto={changePhoto} header="사진 변경">
                        {
                            imsiphoto==null||''?
                            <img className={'imsiphoto'} src={profile3} alt={''} />
                            :
                            <img className={'imsiphoto'} src={`${url}${imsiphoto}`} alt={''} />
                        }
                        <input className={'inputfile'} type={'file'} ref={photoRef} onChange={onUploadEvent} />
                    </ModalPhoto>
                </div>
                    <img className="MP2myphoto-icon" alt="" src={Photoicon} onClick={openPhoto} />
                    
                <div>
                    <img alt='' className="MP2backimg" src={BackPhoto} onClick={openBg} />
                    <ModalBgphoto open={bgOpen} close={closeBg} changebgphoto={changebgphoto} header="배경사진 변경">
                        {
                            imsibgphoto==null||''?
                            <img className="imsibgphoto" src={back} alt="error" />
                            :
                            <img className="imsibgphoto" src={`${url2}${imsibgphoto}`} alt="error" />
                        }
                        <input className="inputfile" type="file" ref={bgphotoRef} onChange={onUploadEventBg} />
                    </ModalBgphoto>
                </div>
                <img className="MP2vector-icon" alt="" src="/vector.svg" />


                <div className="MP2div1">
                    <span className="FDtxt">
                        <p className="FDp">{dto.uage} {dto.ugender === "남" ? "남자" : "여자"}</p>
                        <p className="FDp">골프경력 {dto.ucareer} /&nbsp;
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
                <div className="MP2icon-buddychat-parent" onClick={onMyChating}>
                    <img className="MP2icon-buddychat" alt="" src={FDicon2} />
                    <div className="MP2div2">버디채팅</div>
                </div>
                <div className="MP2icon-buddystory-parent" onClick={onMyStory}>
                    <img className="MP2icon-buddystory" alt="" src={FDicon3} />
                    <div className="MP2div2">버디스토리</div>
                </div>
                <div className="MP2parent" onClick={onMyBuddy}>
                    <div className="MP2div2">버디리스트</div>
                    <img className="MP2icon-addbuddy" alt="" src={FDicon1} />
                </div>
                <div className="MP2container">
                    <div className="MP2div6">{unickname}&nbsp;
                        <ModalNick open={nickOpen} close={closeNick} changeNick={changeNick} header="닉네임 변경">
                            <input className="inputtext" type="text" value={imsiNick} onChange={(e) => setImsiNick(e.target.value)} ref={nickRef} />
                        </ModalNick>
                    </div>
                    <img className="MP2update-icon" alt="" src={UpdateIcon} onClick={openNick} />
                </div>
                <div className="MP2frame-div">
                    <div className="MP2div7">
                        자기소개&nbsp;&nbsp;
                        <img className="MP2update-icon" alt="" src={UpdateIcon} onClick={openCon} />
                        <ModalCon open={conOpen} close={closeCon} changeCon={changeCon} header="자기소개 변경">
                            <input className="inputtext" type="text" value={imsiCon} onChange={(e) => setImsiCon(e.target.value)} ref={conRef} />
                        </ModalCon>
                        <div className="FDtxt2">
                            {
                                ucontent === null ? <div>자기소개를 입력해 주세요.</div>
                                    :
                                    ucontent
                            }
                        </div>
                    </div>

                    <NavLink to={`/chating/${unum}`} />
                </div>





            </div>


        );

    }
}
export default Mypage;