/* eslint-disable eqeqeq */
import "./JoinDetail.css";
import {useCallback, useEffect, useState} from "react";
import Axios from "axios";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import PartnerForm from "../components/PartnerForm";
import PortalPopup from "../components/PortalPopup";
import Profile from "../image/User-32.png";
import TimeIcon from "../image/icon_time.svg";
import CardIcon from "../image/icon_card.svg";
import TextIcon from "../image/icon_text.svg";
import * as ncloudchat from 'ncloudchat';
import Header from "../header/Header";

const JoinDetail = () => {
    const url = process.env.REACT_APP_PROFILE;
    const image1 = process.env.REACT_APP_IMAGE1PROFILE;
    const image2 = process.env.REACT_APP_IMAGE87;
    const [unum, setUnum]=useState('');
    const {jnum} = useParams('');
    const [dto,setDto]=useState({});
    const now = new Date();
    const year = now.getFullYear();
    const [confirm, setConfirm] = useState([]);
    const [sub, setSub] = useState([]);
    const [check, setCheck]=useState('');
    const [jp1gender, setJp1gender] = useState("");
    const [jp1age, setJp1age] = useState("");
    const [jp1tasu, setJp1tasu] = useState("");
    const [jcount, setJcount] = useState(1);
    const [stasu, setStasu] = useState('');
    const writerunum=unum;
    const [nc,setNc] = useState('');
    const navi=useNavigate();


    const unumchk = async () => {
        Axios.get("/login/unumChk")
            .then(async res => {
                setUnum(res.data);
                Axios.get("/login/getRtasu?unum=" + res.data)
                    .then(res => {
                        setStasu(res.data);
                    });

                // 여기서 UserInfo를 가져오고 채팅을 초기화합니다.
                const getUserInfourl = `/chating/getuserinfo?unum=${res.data}`;
                const res2 = await Axios.get(getUserInfourl);

                const chat = new ncloudchat.Chat();
                chat.initialize('08c17789-2174-4cf4-a9c5-f305431cc506');
                setNc(chat);

                await chat.connect({
                    id: res2.data.uemail,
                    name: res2.data.unickname,
                    profile: 'https://image_url',
                    customField: 'json',
                });
            })
    }

    useEffect(() => {
        unumchk()
    }, []);

    //동반자 모달
    const [isPartnerFormOpen, setPartnerFormOpen] = useState(false);

    // eslint-disable-next-line no-unused-vars
    const openPartnerForm = useCallback(() => {
        setPartnerFormOpen(true);
    }, []);

    const closePartnerForm = useCallback(() => {
        setPartnerFormOpen(false);
    }, []);

    const partnerone = (jp1gender,jp1age,jp1tasu) => {
        setJp1gender(jp1gender);
        setJp1age(jp1age);
        setJp1tasu(jp1tasu);        
        setPartnerFormOpen(false);
        Axios.post("/joinmember/joinGaip", {unum, jnum, jp1gender, jp1age, jp1tasu, jcount})
                .then(res => {
                    window.location.replace(`/joining/detail/${jnum}`)
                })
                .catch(err => {
                    console.log(err.message);
                })
    }

    const confirmlist = useCallback(() => {
        const url = "/joinmember/confirmlist?jnum="+(jnum);
        Axios.get(url)
            .then(res => {
                setConfirm(res.data);
                console.log(res.data);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        confirmlist();
    }, [confirmlist]);

    const sublist = useCallback(() => {
        const url = "/joinmember/sublist?jnum="+(jnum);
        Axios.get(url)
            .then(res => {
                setSub(res.data);
                console.log(res.data);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        sublist();
    }, [sublist]);

    const selectData=useCallback(()=>{
        const url="/joining/detail?jnum="+(jnum);
        Axios({
            type:'get',
            url,
        }).then(res=>{
            setDto(res.data);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(()=>{
        selectData();
    },[selectData]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const checkmember = useCallback(()=>{
        const url=`/joinmember/checkmember/${unum}&${jnum}`;        
        Axios.get(url)
            .then(res=>{
                setCheck(res.data)
                console.log(res.data)
            })
            .catch(error => {
                // 오류 발생 시 처리할 로직
                console.error('오류 발생:', error)});
    }, );

    useEffect(()=>{
        checkmember();
    },[checkmember]);

    const onGaipEvent=(e)=>{
        e.preventDefault();
        if(4 - dto.jmcount - dto.jucount === 0){
            alert("빈자리가 없습니다")
        }else{
        const confirmed = window.confirm('동반자가 있습니까? 있을경우 확인을, 없을경우 취소를 눌러주세요');
        if (confirmed) {
            setJcount(2);
            setPartnerFormOpen(true);   
        }else{
            Axios.post("/joinmember/joinGaip", {unum, jnum, jcount})
                .then(res => {
                    window.location.replace(`/joining/detail/${jnum}`)
                })
                .catch(err => {
                    console.log(err.message);
                })
        }
        }
    }

    const onGaipCancelEvent=()=> {
        const confirmed = window.confirm('정말 취소하시겠습니까?');
        if (confirmed) {
            Axios.delete(`/joinmember/joinCancel/${unum}&${jnum}`)
                .then(res => {
                    alert("정상적으로 취소되었습니다");
                    window.location.replace(`/joining/detail/${jnum}`)
                })
                .catch(err => {
                    console.log(err.message);
                })
             }
         };

    const onJoinCancelEvent=()=> {
        const confirmed = window.confirm('모집을 취소하시겠습니까?');
        if (confirmed) {
            Axios.delete(`/joining/joinCancel/${jnum}`)
                .then(res => {
                    alert("정상적으로 취소되었습니다");
                    window.location.replace(`/joining/alllist`)
                })
                .catch(err => {
                    console.log(err.message);
                })
        }
    };

    const onAcceptEvent = (unum) => {
        // eslint-disable-next-line eqeqeq
        if (4 - dto.jucount - dto.jmcount == 0) {
            alert("빈자리가 없습니다")
        }else {
            const confirmed = window.confirm('신청을 수락하시겠습니까?');
            if (confirmed) {
                Axios.get(`/joinmember/acceptJoin/${unum}&${jnum}`)
                    .then(res => {
                        window.location.replace(`/joining/detail/${jnum}/${writerunum}`);
                    })
                    .catch(err => {
                        console.log(err.message);
                    });
            }
        }
    };
    console.log(dto.jmcount)
    const onJoinUpdateEvent = () => {
        window.location.replace(`/joining/updateform/${jnum}/${unum}`);
    }

    const getChatInfo = async (unum, cunum) => {
        try {
            console.log("getChatInfo");
            console.log("unum1: "+unum);
            console.log("unum2: "+cunum);
            const response = await Axios.get(`/chating/getchatinfo?unum1=${unum}&unum2=${cunum}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const onChatEvent = async (cunum) => {
        if (nc) {
            try {
                const chatid = await getChatInfo(unum, cunum);
                console.log("chatid:"+chatid);
                if (chatid) {
                    // chatid != null 일 경우
                    await nc.disconnect();
                    navi(`/chating/room/${chatid}/${unum}`);
                } else {
                    // chatid == null 일 경우
                    const newchannel = await nc.createChannel({ type: 'PUBLIC', name: String(unum) + " " + String(cunum)});
                    const newChatId = newchannel.id;
                    await nc.subscribe(newChatId);

                    await Axios.post("/chating/insertchatid", {unum, cunum, chatid: newChatId});

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
    const handleDivClick =() =>{
        if(dto.unum==unum){
            navi(`/mypage/mypage/${dto.unum}`);
        } else{
            navi(`/friend/detail/${dto.unum}`);
        }
    }
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

    return (
        <div className="joindetail">
            <Header/>
            <div className="JDdiv">
            </div>
            <div className="JDdongbangroup">
                <div className="JDframe2">
                {dto.jucount == 1 ? <div className="JDuser">
                        <div className="JDavatar">
                            <div className="JDlw">동</div>
                        </div>
                        <div className="esther-howard"><b>모집자 동반인 없음</b>
                        </div>
                    </div> : (
                    <div className="JDuser">
                        <div className="JDavatar">
                            <div className="JDlw">동</div>
                        </div>
                        <div className="esther-howard"><b>모집자 동반인1</b><br/>
                            {dto.jp1gender} / {dto.jp1age}세 / {dto.jp1tasu}타
                        </div>
                    </div>)}
                    {dto.jucount != 3 ? null : (<div className="JDuser">
                        <div className="JDavatar">
                            <div className="JDlw">동</div>
                        </div>
                        <div className="esther-howard"><b>모집자 동반인2</b><br/>
                            {dto.jp2gender} / {dto.jp2age}세 / {dto.jp2tasu}타
                        </div>
                    </div>)}                                        
                </div>
            </div>
            <div className="JDconfirmgroup">
                <div className="JDframe">
                    {confirm.map && confirm.map((item, idx) => (
                        <div className="JDuser">
                            <NavLink to={`/friend/detail/${item.unum}`} className='nav-style'>
                            <div className="JDavatar">
                                {/* <div className="JDlw">LW</div> */}
                                {item.uphoto == null ? <img className="JDlw" alt="" src={Profile} /> :
                                <img className="JDlw" src={`${image1}${item.uphoto}${image2}`} alt={''}/>}
                            </div></NavLink>
                            {item.jcount == 1 ? <div className="esther-howard"><b>{item.unickname}</b>
                                <div style={{display:'none'}}>{item.unum}</div>
                                <br/>
                                {year - (parseInt(item.uage.substring(0, 4), 10))}세 / {item.ugender} / {item.rtasu}타
                            </div> : (                                 
                            <div className="esther-howard"><b>{item.unickname}</b>&nbsp;(동반인/{item.jp1gender}/{item.jp1age}세/{item.jp1tasu}타)
                                <div style={{display:'none'}}>{item.unum}</div>
                                <br/>
                                {year - (parseInt(item.uage.substring(0, 4), 10))}세 / {item.ugender} / {item.rtasu}타
                            </div>)}
                        </div>
                    ))}
                </div>
            </div>

            <div className="JDparent">
            <div className="JDdiv0">
          <div className="JDtxt">
            <span>{`모집자 동반인( 총 `}</span>
            <span className="JDspan1">{dto.jucount-1}</span>
            <span>{` 명) `}</span>
          </div>
                </div>
                <div className="JDdiv1">
          <div className="JDtxt">
            <span>{`확정인원( 총 `}</span>
            <span className="JDspan1">{dto.jmcount+dto.jucount}</span>
            <span>{` 명) `}</span>
          </div>
                </div>
                <div className="JDdiv2">
          <span className="JDtxt">
            <span>{`빈자리 `}</span>
            <span className="JDspan1">{4-dto.jmcount-dto.jucount}</span>
          </span>
                </div>
            </div>
            <div className="JDapplygroup">
                <div className="JDdiv3">
                    <span>{`신청인원( 총 `}</span>
                    <span className="JDspan1">{dto.smcount}</span>
                    <span> 명)</span>
                </div>
                <div className="JDframe1">
                    {sub.map && sub.map((item, idx) => (
                        <div className="JDuser">
                            <NavLink to={`/friend/detail/${item.unum}`} className='nav-style'>
                            <div className="JDavatar">
                                {item.uphoto == null ? <img className="JDlw" alt="" src={Profile} /> :
                                <img className="JDlw" src={`${image1}${item.uphoto}${image2}`} alt={''}/>}
                            </div> </NavLink>
                            {item.jp1gender == null ? <div className="esther-howard"><b>{item.unickname}</b>
                                <div style={{display:'none'}}>{item.unum}</div>&nbsp;&nbsp;
                                {dto.unum == unum ? (
                                    <button type='button' value={item.unum} className='btn btn-sm btn-success' onClick={onAcceptEvent.bind(null, item.unum)}>수락</button>
                                ) : (
                                    null
                                )}

                                <br/>
                                {year - (parseInt(item.uage.substring(0, 4), 10))}세 / {item.ugender} / {item.rtasu}타
                            </div> : (                                 
                            <div className="esther-howard"><b>{item.unickname}</b>&nbsp;(동반인/{item.jp1gender}/{item.jp1age}세/{item.jp1tasu}타)
                                <div style={{display:'none'}}>{item.unum}</div>&nbsp;&nbsp;
                                {dto.unum == unum ? (
                                    <button type='button' value={item.unum} className='btn btn-sm btn-success' onClick={onAcceptEvent.bind(null, item.unum)}>수락</button>
                                ) : (
                                    null
                                )}

                                <br/>
                                {year - (parseInt(item.uage.substring(0, 4), 10))}세 / {item.ugender} / 타수
                            </div>)}
                        </div>
                    ))}
                    <br/><br/><br/><br/>
                    <div className="joindetail-child" />

                    <div className="JDdiv10">
                        {dto.unum == unum || unum==1? (
                            <div className="JDdiv10btn" onClick={onJoinCancelEvent}>모집 취소</div>
                        ) : check === 1 ? (
                            <div className="JDdiv10btn" onClick={onGaipCancelEvent}>신청 취소</div>
                        ) : (
                            <form onClick={onGaipEvent}>
                                <input type='hidden' value={unum}/>
                                <input type='hidden' value={jnum}/>
                                <input type='hidden' value={jp1gender}/>
                                <input type='hidden' value={jp1age}/>
                                <input type='hidden' value={jp1tasu}/>
                                <input type='hidden' value={jcount}/>
                                <div className="JDdiv10btn">신청 하기</div>
                            </form>
                        )}
                    </div>
                    <br/><br/>
                    {dto.unum == unum ? (
                            <div className="joindetail-child2" />
                        ) : (
                            null
                        )}
                        {dto.unum == unum ?
                        (<div className="JDdiv20">
                            <div className="JDdiv10btn" onClick={onJoinUpdateEvent}>수정하기</div>
                            </div>
                        ) : (
                            null
                        )}
                    </div>                
            </div>

            <div className="jdinfo">
                <div className="JDcontent">
                    <div className="JDvalue">
                        <div className="JDdiv4">{dto.gname}</div>
                    </div>
                </div>
                <div className="JDdefault">
                    <img className="JDvector-icon" alt="" src={TimeIcon} />
                    <div className="JDdiv5">{dto.jjoinday} / {dto.jtime}</div>
                </div>
                <div className="JDinfobox-group">
                    <div className="JDcheckbox-with-label">
                        <img className="JDvector-icon" alt="" src={CardIcon} />
                        <div className="JDdiv6">그린피 {dto.jprice}원</div>
                    </div>
                    <div className="JDcheckbox-with-label1">
                        <img className="JDvector-icon" alt="" src={TextIcon} />
                        <div className="JDdiv7">{dto.jage}</div>
                    </div>
                    <div className="JDcheckbox-with-label">
                        <img className="JDicon-file" alt="" src={TextIcon} />
                        <div className="JDdiv7">
                            <p className="JDp">{dto.jcontent}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="JDflistprofile">
                {/*<NavLink to={`/friend/detail/${dto.unum}`} className='nav-style'>*/}
                <div className="nav-style" onClick={handleDivClick}>
                    <div className="JDflistprofile1">
                        {dto.uphoto == null ? <img className="jduphoto-icon" alt="" src={Profile} /> :
                        <img className="jduphoto-icon" src={`${image1}${dto.uphoto}${image2}`} alt={''}/>}
                        <div className="JDdiv11">
                            <span className="JDtxt">
                                <p className="JDp4">{dto.unickname} (모집자)</p>
                                <p className="JDp5">{dto.ugender} / {year - (dto.uage && parseInt(dto.uage.substring(0, 4), 10))}세 / {stasu}타</p>
                            </span>
                        </div>
                    </div>
                </div>
                {/*</NavLink>*/}
                <div className="JDrectangle-parent">
                    <div className="JDgroup-child" />
                    <div className="JDdiv12" onClick={onChatEvent.bind(null, dto.unum)}>채팅하기</div>
                </div>
            </div>            
            {isPartnerFormOpen && (
                <PortalPopup
                    overlayColor="rgba(113, 113, 113, 0.3)"
                    placement="Centered"
                    onOutsideClick={closePartnerForm}
                >
                    <PartnerForm props={closePartnerForm} propFunction={partnerone} />
                </PortalPopup>
            )}
        </div>
    );
};

export default JoinDetail;
