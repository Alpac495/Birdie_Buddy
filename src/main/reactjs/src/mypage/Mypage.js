/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import './Mypage.css'
import EditIcon from '@mui/icons-material/Edit';
import FDicon2 from "../image/icon_buddychat.svg";
import FDicon3 from "../image/icon_buddystory.svg";
import FDicon1 from "../image/icon_addbuddy.svg";
import ModalNick from "./MypageUpdateNickname"
import ModalCon from "./MypageUpdateContent"
import ModalPhoto from "./MypageUpdatePhoto"
import Axios from "axios";

function Mypage(props) {
    const url = process.env.REACT_APP_PROFILE;
    const image1 = process.env.REACT_APP_IMAGE1PROFILE;
    const image2 = process.env.REACT_APP_IMAGE87;
    const [dto, setDto] = useState([]);
    const [ucontent, setUcontent] = useState('');
    const [imsiCon, setImsiCon] = useState('');
    const [unickname, setUnickname] = useState('');
    const [imsiNick, setImsiNick] = useState('');
    const [unum, setUnum]=useState('');
    const [uphoto, setUphoto] = useState('');
    const [imsiphoto, setImsiphoto] = useState('');
    const [ubgphoto, setUbgphoto] = useState('');
    const [imsibgphoto, setImsibgphoto] = useState('');
    const [stasu, setStasu] = useState('');
    const conRef = useRef();
    const nickRef = useRef();
    const photoRef = useRef();

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
                        setUbgphoto(res.data.ubgphoto);
                        setImsibgphoto(res.data.ubgphoto);
                        setImsiphoto(res.data.uphoto);
                        setUnum(res.data.unum);
                        axios.get("/login/getRtasu?unum=" + res.data.unum)
                            .then(res => {
                                setStasu(res.data);
                            })
                    })
            })
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
    const chnageNick = () => {
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

    const onUploadEvent = (e) => {
        const uploadFile = new FormData();
        uploadFile.append('upload', e.target.files[0]);
        Axios.post('/login/upload', uploadFile)
            .then((res) => {
                console.log(res.data);
                setImsiphoto(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        unumchk()
    }, [])
    return (

        <div className="FDprofile">
            <div className="FDdiv">
                <div className="FDchild"/>
            </div>
            <div className="FDbackprofile"></div>
            <div className="FDinfobox"/>
            <div className="FDmainprofile"><img alt='error' style={{borderRadius:'11%'}} src={`${image1}${uphoto}${image2}`} />

                <EditIcon className={'photoIcon'} fontSize="small" onClick={openPhoto}/>
                <ModalPhoto open={photoOpen} close={closePhoto} changePhoto={changePhoto}  header="사진 변경">
                    <img className={'imsiphoto'} src={`${url}${imsiphoto}`} alt={''}/>
                    <input className={'inputfile'} type={'file'}  ref={photoRef} onChange={onUploadEvent}/>
                </ModalPhoto>
            </div>


            <div className="FDdiv2">
        <span className="FDtxt">
          <p className="FDp">{dto.uage} {dto.ugender === "남" ? "남자" : "여자"}</p>
          <p className="FDp">골프경력 {dto.ucareer} / 
          {
            stasu == null || stasu == '' || stasu == 0?
            <span> 입력된 타수 정보가 없습니다</span>:
            <span>
              평균타수 {stasu}타
            </span>
          }
          </p>
        </span>
            </div>
            <div className="FDdiv3">
                {
                    ucontent===null?<div>자기소개를 입력해 주세요.</div>
                        :
                        ucontent
                }
                &nbsp;
                <EditIcon fontSize="small" onClick={openCon}/>
                <ModalCon open={conOpen} close={closeCon} changeCon={changeCon}  header="자기소개 변경">
                    <input className={'inputtext'} type={'text'}  value={imsiCon} onChange={(e) =>
                      setImsiCon(e.target.value)
                    } ref={conRef}/>
                </ModalCon>
            </div>
            <div className="FDdiv4">{unickname}&nbsp;
                <EditIcon fontSize="small" onClick={openNick}/>
                <ModalNick open={nickOpen} close={closeNick} chnageNick={chnageNick} header="닉네임 변경">
                    <input className={'inputtext'} type={'text'}  value={imsiNick} onChange={(e) =>
                        setImsiNick(e.target.value)
                    } ref={nickRef}/>
                </ModalNick>
            </div>
            <div className="FDicon-message-parent">
                <img className="FDicon-message" alt="" src={FDicon2}/>
                <div className="FDdiv5">TEXT2</div>
            </div>
            <div className="FDicon-camera-parent">
                <img className="FDicon-camera" alt="" src={FDicon3}/>
                <div className="FDdiv5">TEXT3</div>
            </div>

            <div className="FDparent" >
                <div className="FDdiv5">TEXT1</div>
                <img
                    className="FDicon-user-cirlce-add"
                    alt="" src={FDicon1}/>
            </div>

        </div >
    );
}

export default Mypage;